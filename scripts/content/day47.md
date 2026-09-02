# AI Content Repurposing Systems

## Learning Objectives

- Understand what content repurposing is and why it maximizes content ROI
- Master the "create once, publish everywhere" methodology
- Build an AI system that transforms one piece of content into many formats
- Learn format-specific adaptation rules for each platform and medium
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material, complete the self-assessment and practice problems, and ensure you can answer everything before the quiz.

## What Is Content Repurposing?

Content repurposing is the practice of taking **one** piece of content (a blog post, podcast, video, webinar, guide) and transforming it into **multiple** pieces of content across different platforms and formats.

Instead of creating 10 separate pieces of content, you create one great piece and derive 10 variations from it.

**Why it matters:**
- **Consistency** — publish everywhere regularly without burnout
- **Reach** — reach different audiences on different platforms
- **Efficiency** — drastically more output per hour of creative work
- **Reinforcement** — the same message repeated reinforces brand recall

## The "One to Many" Methodology

A single asset can become many pieces:

```
ONE CORE ASSET (e.g., a 30-min video or 1500-word article)
  │
  ├──► Blog post (the long-form version)
  ├──► Social media post (originate)
  ├──► LinkedIn article
  ├──► 5-10 tweets / a Twitter thread
  ├──► Email newsletter
  ├──► Infographic (key stats)
  ├──► Short video clips (Reels/Shorts/TikTok)
  ├──► Podcast episode (audio)
  ├──► A lead magnet / PDF download
  └──► Quote graphics / carousel posts
```

## The Repurposing Pipeline

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ SOURCE       │  │ TRANSLATE    │  │ DISTRIBUTE   │
│ one core     │──▶│ to each      │─▶│ to each      │
│ asset        │  │ format       │  │ platform     │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Stage 1: Source Asset
Any good core asset: a video transcript, article, podcast transcript, or comprehensive guide.

### Stage 2: Translation (AI transformation)
Convert to each target format. This is where AI shines — it adapts tone, length, and structure per format.

### Stage 3: Distribution
Post to each platform (often scheduled — see Day 37).

## Format-Specific Rules

Each format has different demands. The AI must know them:

| Output | Adaptations |
|---|---|
| **Twitter/X thread** | Short punchy tweets, numbered, one idea each, hook first, ~280 chars each |
| **LinkedIn post** | Professional, value-first, short paragraphs, 3-5 hashtags, asks a question |
| **Instagram caption** | Warm hook, story, CTA, 5-10 hashtags |
| **Email newsletter** | Personal greeting, clear structure, links, CTA |
| **TikTok/Reels script** | ~15-60 sec, visual, spoken language, hook in first 2 sec |
| **Infographic outline** | Key stats as visuals, minimal text, numbered facts |
| **Blog post** | Long-form, headings, structured, detailed |
| **Podcast intro/outro** | Conversational, spoken, mentions episode topic |

## Building the Repurposing System in Python

```python
from openai import OpenAI

client = OpenAI()

# Target formats and their instructions
FORMATS = {
    "linkedin": {
        "instruction": "Professional LinkedIn post. Short paragraphs, value-first, "
                       "end with a question. 3-5 relevant hashtags. Max 1300 chars."
    },
    "twitter_thread": {
        "instruction": "A Twitter/X thread as a JSON list of tweets. Tweet 1 is the "
                       "attention-grabbing hook. Each tweet under 280 chars. "
                       "Numbered logically. Return JSON {\"tweets\": [...]}."
    },
    "instagram": {
        "instruction": "Instagram caption. Warm hook in first line, then short body, "
                       "end with a call to action. 5-10 relevant hashtags."
    },
    "email": {
        "instruction": "Marketing email. Friendly greeting, clear structure with short "
                       "paragraphs or bullets, one clear call to action. Max 200 words."
    },
    "reels_script": {
        "instruction": "Short vertical video script (~30 sec). Written for spoken delivery, "
                       "hook in the first 1.5 seconds, clear storytelling, a CTA at the end."
    },
    "infographic_outline": {
        "instruction": "Infographic outline as a JSON list of sections. Each section: "
                       "title + 2-3 key stats/points. Visual and minimal text."
    },
}


def repurpose(source_text: str, target_formats: list[str]) -> dict:
    """Transform one source into multiple target formats."""
    results = {}
    for fmt in target_formats:
        if fmt not in FORMATS:
            continue
        instruction = FORMATS[fmt]["instruction"]
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"You are a content repurposing expert. {instruction}"
                },
                {
                    "role": "user",
                    "content": f"Repurpose the following source content:\n\n{source_text}"
                }
            ],
            temperature=0.7,
        )
        results[fmt] = resp.choices[0].message.content
    return results


def repurpose_thread(source_text: str) -> list[str]:
    """Extract a Twitter thread as a list of tweets."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": FORMATS["twitter_thread"]["instruction"]},
            {"role": "user", "content": f"Source:\n{source_text}"}
        ],
        response_format={"type": "json_object"},
        temperature=0.7,
    )
    import json
    data = json.loads(resp.choices[0].message.content)
    return data.get("tweets", [])
```

## Quality Control for Repurposing

### The Review Loop
AI-generated repurposed content should not go out uncritically. Build a reviewer:

```python
def review_repurposed(format_name: str, content: str, source_text: str) -> dict:
    """Check that the repurposed content is faithful and on-brand."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are an editor reviewing a repurposed piece of content.
                Check and return JSON:
                - faithfulness (0-1): does it accurately reflect the source?
                - platform_fit (0-1): does it follow the platform's conventions?
                - engagement_potential (0-1): how likely to engage?
                - issues: [list of problems found]
                - suggestion: one concrete improvement"""
            },
            {
                "role": "user",
                "content": f"Format: {format_name}\n\nSource:\n{source_text}\n\n"
                           f"Repurposed content:\n{content}"
            }
        ],
        response_format={"type": "json_object"},
        temperature=0.2,
    )
    import json
    return json.loads(resp.choices[0].message.content)
```

### Guarding Against Hallucination
The repurposed content must stay faithful to the source. Rules:
- Do NOT let the model invent statistics or quotes not in the source
- For any factual claim, it must exist in the source
- The reviewer flags "faithfulness" — if it drops below threshold, regenerate

```python
def safe_publish_pipeline(source_text, target_formats, rewrite_limit=2):
    """Repurpose with a faithful/review gate before approval."""
    final = {}
    for fmt in target_formats:
        content = repurpose(source_text, [fmt])[fmt]
        review = review_repurposed(fmt, content, source_text)
        attempts = 0
        while review["faithfulness"] < 0.8 and attempts < rewrite_limit:
            # Regenerate with a faithfulness emphasis
            content = regenerate_faithful(source_text, fmt, review["issues"])
            review = review_repurposed(fmt, content, source_text)
            attempts += 1
        final[fmt] = {"content": content, "review": review}
    return final


def regenerate_faithful(source_text, fmt, issues):
    instruction = FORMATS[fmt]["instruction"]
    instruction += " IMPORTANT: Stay strictly faithful to the source. " \
                   "Do not add statistics, quotes, or facts that are not in the source."
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": instruction},
            {"role": "user", "content": f"Source:\n{source_text}"}
        ],
        temperature=0.4,
    )
    return resp.choices[0].message.content
```

## Best Practices

1. **Always give the source as context** — never repurpose from memory
2. **Adapt, don't copy** — each format needs fresh, native content
3. **Add a human review** — especially for client brands
4. **Verify faithfulness** — don't let AI invent facts
5. **Batch and schedule** — one source → a week of content, scheduled ahead
6. **Track performance** — see which format drives the most engagement, iterate

## Self-Assessment Questions

1. What is content repurposing and why is it valuable?
2. List at least 8 output formats you can derive from one core asset.
3. What are the three stages of the repurposing pipeline?
4. Why must content be adapted per platform rather than copied verbatim?
5. What is the "faithfulness" check and why is it critical?
6. Compare a Twitter thread hook vs an Instagram caption hook — how do they differ?
7. How does AI reduce the effort of multichannel publishing?
8. What guardrails prevent the AI from inventing facts during repurposing?
9. How does repurposing fit into an agency's recurring content service?
10. Give two pieces of content that are NOT good source assets for repurposing, and why.

## Practice Problems

### Problem 1
Write the exact system prompt you'd use to turn a webinar transcript into a "value-first" LinkedIn post.

### Problem 2
Explain how you'd validate that a repurposed tweet thread is faithful to a 2000-word article without reading the whole thread manually.

### Problem 3
Design the schema for a "content calendar" database that tracks the repurposed pieces (fields: source_asset, format, platform, scheduled_for, status, performance metrics).

### Problem 4
An AI repurposing produced a "quote" attributed to your CEO that isn't in the source. Describe the detection mechanism and the remediation process.

### Problem 5
Compare repurposing a YouTube video vs repurposing a text blog post. What different outputs does each naturally produce?

## Key Takeaways

- Repurposing = create once, publish everywhere — maximizes content ROI
- The pipeline: Source asset → AI translation per format → distribution
- Each format has distinct rules (tone, length, structure, hashtags) that must be encoded in the prompt
- Faithfulness is critical — the AI must stay true to the source and not invent facts
- Build a review gate that checks faithfulness, platform fit, and engagement, regenerating when scores are low
- Repurposing is a valuable recurring content service for agencies

## Practice Challenge

**Objective:** Prepare for the quiz and build a repurposing system.

1. Answer all 10 self-assessment questions from memory, then check
2. Complete all 5 practice problems
3. Build a `repurposer.py` that:
   - Takes one source text (write a ~500-word article)
   - Repurposes it into: LinkedIn post, Twitter thread, Instagram caption, email, and Reels script
   - Runs each through a faithfulness review
   - Regenerates any that drop below the faithfulness threshold
4. Show the faithfulness scores for each format
5. Produce one final "content calendar" entry for each piece (based on the Problem 3 schema)

**Deliverable:** Written answers, a working `repurposer.py` with faithfulness review + regeneration, all 5 sample outputs, faithfulness scores, and the content calendar entries.

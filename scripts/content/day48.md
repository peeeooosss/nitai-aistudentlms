# Automated SEO Optimization

## Learning Objectives

- Understand the fundamentals of SEO and how AI automates it
- Build an AI system that generates and optimizes content for search engines
- Learn keyword research automation and content gap analysis
- Implement on-page SEO checks (titles, meta, headings, internal links)
- Prepare for the live interactive session on automated SEO

## Live Session Overview

This is a **LIVE_INTERACTIVE** day:

1. **Recap** — content repurposing + reporting foundation (15 min)
2. **Lecture/Demo** — building an AI SEO workflow (45 min)
3. **Hands-on exercises** — build your own SEO optimization tool (60 min)
4. **Discussion** — SEO automation pitfalls and ethics (15 min)
5. **Q&A** (15 min)

## Why AI + SEO Is a Powerful Agency Service

SEO is compounding, high-value work, and much of it is tedious and repetitive — perfect for automation. AI can help with:

1. **Keyword research** — finding what to target
2. **Content gap analysis** — what competitors rank for, you don't
3. **Content generation** — writing SEO-optimized articles
4. **On-page optimization** — titles, meta descriptions, headings, internal links
5. **Technical checks** — crawling sites for issues
6. **Reporting** — tracking rankings and traffic

## The SEO Automation Workflow

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ KEYWORD     │  │ CONTENT     │  │ ON-PAGE     │  │ TECHNICAL   │  │ MEASURE &   │
│ RESEARCH    │─▶│ OPTIMIZATION│─▶│ CREATION    │─▶│ AUDIT       │─▶│ REPORT      │
│ (find target)│  │ (optimize)  │  │ (generate)  │  │ (find issues)│  │ (track ROI) │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

## 1. Keyword Research Automation

Identify high-value keywords: relevant to the business, with search demand, reasonable difficulty.

```python
from openai import OpenAI

client = OpenAI()


def generate_keyword_ideas(topic: str, n: int = 15) -> list[str]:
    """Generate keyword ideas around a topic, or use a keyword API in production."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": 
             "Generate SEO keyword ideas for the given topic. Include long-tail "
             "keywords, question keywords (who/how/what/why), and buyer-intent "
             "keywords. Return a JSON list."},
            {"role": "user", "content": topic}
        ],
        response_format={"type": "json_object"},
        temperature=0.7,
    )
    import json
    return json.loads(resp.choices[0].message.content).get("keywords", [])


def classify_keyword_intent(keyword: str) -> str:
    """Classify search intent: informational, navigational, transactional, commercial."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": 
             "Classify the search intent of this keyword into one of: informational, "
             "navigational, commercial, transactional. Return a single word."},
            {"role": "user", "content": keyword}
        ],
        temperature=0,
    )
    return resp.choices[0].message.content.strip().lower()
```

In production, use keyword tools (Google Keyword Planner, Ahrefs, SEMrush, or a free API like SerpAPI's keyword data) for real volume/difficulty numbers. The AI generates ideas; the tool fills in the data.

### Keyword Scoring Model
```python
def score_keyword(keyword, volume, difficulty, intent, relevance):
    """Composite keyword attractiveness score."""
    score = 0
    # Volume (more is better, but weight moderately)
    score += min(volume / 100, 10)
    # Difficulty (lower is better for client)
    score += max(0, 10 - difficulty)
    # Commercial/transactional intent is more valuable
    intent_score = {"transactional": 10, "commercial": 8, "informational": 5, "navigational": 3}
    score += intent_score.get(intent, 5)
    # Relevance
    score += relevance * 5
    return round(score, 1)
```

## 2. On-Page SEO Generation

Generate SEO-optimized on-page elements for a target keyword:

```python
def generate_onpage(title_idea: str, keyword: str, url_topic: str) -> dict:
    """Generate SEO title, meta description, and heading outline."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """You are an expert SEO content strategist.
            Generate on-page SEO elements. Return JSON:
            - seo_title: under 60 chars, includes primary keyword, compelling
            - meta_description: under 155 chars, includes keyword, persuasive, CTA
            - url_slug: short, keyword-focused, lowercase, hyphens
            - h1: includes keyword, matches user intent, under 60 chars
            - h2_outline: list of 4-6 subtopic headings
            - internal_link_suggestions: 3 related phrases that should link to
              other relevant pages"""},
            {"role": "user", "content": 
             f"Primary keyword: {keyword}\nTopic/title idea: {title_idea}\nURL topic: {url_topic}"}
        ],
        response_format={"type": "json_object"},
        temperature=0.5,
    )
    import json
    return json.loads(resp.choices[0].message.content)


# Example
onpage = generate_onpage(
    "Complete guide to social media automation",
    "social media automation tools",
    "social-media-automation"
)
for k, v in onpage.items():
    print(f"{k}: {v}")
```

## 3. Content Gap Analysis

Find topics competitors rank for that the client doesn't cover:

```python
def find_content_gaps(competitor_topics: list[str], client_topics: list[str]) -> list[dict]:
    """Identify topics competitors cover that the client is missing."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """Compare competitor content topics vs the 
            client's content topics. Identify topics competitors cover that the client 
            does NOT adequately cover. Return JSON: {gaps: [{topic, why_valuable, 
            priority(high/med/low), suggested_angle}]}"""},
            {"role": "user", "content": 
             f"Competitor topics: {competitor_topics}\n\nClient topics: {client_topics}"}
        ],
        response_format={"type": "json_object"},
        temperature=0.4,
    )
    import json
    return json.loads(resp.choices[0].message.content).get("gaps", [])
```

## 4. SEO Article Generation

Generate a full SEO-optimized article that follows the outline and matches search intent:

```python
def generate_seo_article(keyword: str, outline: list[str], audience: str = "") -> str:
    """Write a complete SEO article from a heading outline."""
    outline_text = "\n".join(outline)
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """You are an expert SEO content writer.
            Write a complete, well-structured article using the provided heading outline.
            Follow these rules:
            - Use the primary keyword early (title, first paragraph, one H2, naturally)
            - Use 2-3 related LSI keywords naturally
            - Write for the reader first: clear, helpful, actionable, scannable
            - Use short paragraphs, bullet points, and subheadings
            - Include a conclusion and a call to action
            - DO NOT stuff keywords or write low-value filler
            - Stay factual, do not invent statistics"""},
            {"role": "user", "content": 
             f"Primary keyword: {keyword}\nAudience: {audience or 'general readers'}"
             f"\n\nHeading outline:\n{outline_text}"}
        ],
        temperature=0.7,
    )
    return resp.choices[0].message.content
```

## 5. On-Page Technical Audit

Check a page for SEO issues programmatically:

```python
import requests
from bs4 import BeautifulSoup


def audit_meta(url: str) -> dict:
    """Basic on-page SEO audit of titles and meta."""
    resp = requests.get(url, headers={"User-Agent": "SEOBot/1.0"}, timeout=15)
    soup = BeautifulSoup(resp.text, "html.parser")
    
    title = soup.title.get_text(strip=True) if soup.title else ""
    meta_desc = ""
    for m in soup.find_all("meta"):
        if m.get("name", "").lower() == "description":
            meta_desc = m.get("content", "")
    
    h1s = [h.get_text(strip=True) for h in soup.find_all("h1")]
    h2s = [h.get_text(strip=True) for h in soup.find_all("h2")]
    
    issues = []
    if not title:
        issues.append("Missing <title>")
    elif len(title) > 60:
        issues.append(f"Title too long ({len(title)} chars)")
    if not meta_desc:
        issues.append("Missing meta description")
    elif len(meta_desc) > 155:
        issues.append(f"Meta description too long ({len(meta_desc)} chars)")
    if len(h1s) == 0:
        issues.append("Missing H1")
    elif len(h1s) > 1:
        issues.append(f"Multiple H1 tags ({len(h1s)})")
    
    return {
        "url": url, "title": title, "meta_description": meta_desc,
        "h1": h1s, "h2_count": len(h2s),
        "issues": issues,
        "score": max(0, 100 - len(issues) * 20)
    }
```

### AI Fixes the Detected Issues
```python
def fix_onpage_issues(url: str, audit: dict) -> dict:
    """Generate improved title/meta from audit issues."""
    if not audit["issues"]:
        return {"message": "No issues found, page looks good."}
    
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Fix the SEO issues. Return JSON with "
                                          "improved_title (<=60 chars) and "
                                          "improved_meta (<=155 chars)."},
            {"role": "user", "content": 
             f"Current title: {audit['title']}\nCurrent meta: {audit['meta_description']}"
             f"\nPage URL/topic: {url}\nIssues: {audit['issues']}"}
        ],
        response_format={"type": "json_object"},
    )
    import json
    return json.loads(resp.choices[0].message.content)
```

## Live Session Exercises

### Exercise 1: Keyword Workflow
Generate keyword ideas for a niche you care about. Classify the intent of each. Score the top 5.

### Exercise 2: On-Page Generation
For the top keyword from Exercise 1, generate the complete on-page elements (title, meta, URL slug, H1, H2 outline, internal link suggestions).

### Exercise 3: Article Generation + Audit
Write a short SEO article using the generated outline. Then run `audit_meta` on a real page of your choosing and use the fixer to propose improvements.

### Exercise 4: Content Gap
List 5-10 competitor topics and 5-10 client topics (use real or fictional). Run `find_content_gaps` and prioritize the results.

### Exercise 5: Responsible SEO
Discuss: what are the SEO practices the AI should be prevented from doing (keyword stuffing, content spinning, generating low-quality mass pages, clickbait)? Add constraints to your generation prompts to avoid these.

## Discussion Topics

1. Where does AI-generated content help vs. hurt SEO? (Think about Google's E-E-A-T — experience, expertise, authoritativeness, trustworthiness.)
2. How do you keep AI content from sounding generic and failing to rank?
3. What's the role of human expertise in SEO content that AI can't replace?
4. How do you measure the ROI of an automated SEO content system?
5. What SEO red flags must you avoid when automating (thin content, duplicate content, keyword stuffing)?

## Key Takeaways

- SEO is repetitive, high-value work — ideal for automation
- The workflow: keyword research → content optimization → on-page generation → technical audit → reporting
- AI generates keyword ideas, on-page elements, and articles; tools fill in real volume/difficulty data
- Always generate on-page elements with proper length limits (title ≤60, meta ≤155)
- A technical audit script catches issues; AI proposes fixes
- Keep E-E-A-T in mind — human expertise, originality, and quality still matter for ranking
- Avoid black-hat automation (keyword stuffing, thin/spun content) — it damages clients

## Practice Challenge

**Objective:** Build an end-to-end SEO optimization tool.

1. Complete all five exercises
2. Build a `seo_tool.py` that chains: keyword research → on-page generation → article generation → content gap analysis
3. Add the technical audit + fixer for any URL
4. Create a report that presents: target keyword, intent, on-page elements, article, and any technical issues found
5. Write a note on how you'd prove SEO ROI to a client (rankings, organic traffic, leads)

**Deliverable:** `seo_tool.py`, outputs for all exercises (real topic of your choice), and a client ROI note. Be ready to demo in the live session.

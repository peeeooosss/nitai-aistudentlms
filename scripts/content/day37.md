# Social Media Scheduling Bots

## Learning Objectives

- Understand the architecture of automated social media content pipelines
- Build an AI content generator that produces platform-specific posts
- Learn how to schedule and publish content programmatically via APIs
- Implement content repurposing (one piece → many platform formats)
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material below, complete the self-assessment and practice problems, and ensure you can answer everything before the quiz.

## Why Social Media Automation Matters

Social media is a huge time sink for businesses. Posting consistently across multiple platforms is essential for reach, but the manual effort is enormous. This is a perfect automation opportunity because:

1. **Content is highly repetitive** once you have a system
2. **Scheduling is mechanical** — perfect for automation
3. **Each platform needs different formatting** — ideal for AI transformation
4. **The value is measurable** — engagement, reach, followers

Your agency can deliver "repurposed content at scale" — one core piece of content turned into posts across LinkedIn, Twitter/X, Instagram, TikTok, and Facebook — all scheduled automatically.

## The Content Pipeline Architecture

```
┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ SOURCE     │  │ AI CONTENT │  │ PLATFORM   │  │ SCHEDULE   │  │ PUBLISH    │
│ CONTENT    │──▶│ GEN/TRANS  │──▶│ ADAPTER    │──▶│ ENGINE     │──▶│ (APIs)     │
│ (blog,id,  │  │ FORMATION  │  │ (per-site) │  │ (queue)    │  │            │
│  script)   │  └────────────┘  └────────────┘  └────────────┘  └────────────┘
└────────────┘
```

### 1. Source Content
Any piece of source material: a blog post, video transcript, podcast show notes, or even a topic idea.

### 2. AI Content Transformation
AI converts the source into platform-appropriate posts.

### 3. Platform Adapter
Each platform has specific formatting rules (character limits, hashtags, image specs).

### 4. Schedule Queue
A datastore decides WHEN each post goes out.

### 5. Publish API
The bot programmatically publishes using platform APIs.

## Platform-Specific Best Practices

| Platform | Character Limit | Hashtags | Best Content | Tone |
|---|---|---|---|---|
| **X/Twitter** | 280 chars | 1-3 sparse | Punchy insights, threads | Direct, newsy |
| **LinkedIn** | ~3,000 chars (long-form) | 3-5 | Professional insights, thought leadership | Professional, value-first |
| **Instagram** | 2,200 caption | 5-10 | Visual + story | Warm, lifestyle |
| **Facebook** | 63,206 | 0-2 sparse | Community engagement | Conversational |
| **TikTok** | 150 caption | 3-5 | Short-form video | Entertaining, casual |
| **YouTube** | Title 100, desc 5000 | 2-3 | Video, SEO titles | Informative |

## Building the AI Content Transformation Pipeline

Here is a Python system that repurposes one source into platform-specific posts:

```python
from openai import OpenAI

client = OpenAI()

# Platform configuration
PLATFORMS = {
    "twitter": {
        "max_chars": 280,
        "hashtags": "use 1-3 relevant hashtags",
        "tone": "punchy, direct, newsy",
        "format": "short tweet, sub-150 words when thread"
    },
    "linkedin": {
        "max_chars": 1500,
        "hashtags": "use 3-5 relevant hashtags",
        "tone": "professional, value-first, thoughtful",
        "format": "break into short paragraphs, use headers/lists"
    },
    "instagram": {
        "max_chars": 2200,
        "hashtags": "use 5-10 relevant hashtags",
        "tone": "warm, approachable, visual",
        "format": "hook first line, then body, end with engagement question"
    },
    "facebook": {
        "max_chars": 2000,
        "hashtags": "use 1-2 hashtags max",
        "tone": "conversational, community-oriented",
        "format": "friendly tone, ask a question to drive comments"
    }
}


def get_social_trends(topic: str) -> list[str]:
    """Optional: AI suggests trending angles/hooks for a topic."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Suggest 3 engaging angles or hooks " 
                                          "to make this topic go viral on social media."},
            {"role": "user", "content": topic}
        ],
        temperature=0.8
    )
    return response.choices[0].message.content.split("\n")


def transform_for_platform(source_text: str, platform: str) -> str:
    """Convert source content into a platform-specific post."""
    config = PLATFORMS[platform]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": f"""You are a social media manager. Rewrite the source 
                content into a post optimized for {platform}.

                Requirements:
                - Max {config['max_chars']} characters
                - Tone: {config['tone']}
                - {config['hashtags']}
                - Format: {config['format']}
                - Keep the core message but adapt it fresh for this platform,
                  do not just copy the source verbatim"""
            },
            {"role": "user", "content": source_text}
        ],
        temperature=0.7
    )
    return response.choices[0].message.content


def repurpose_content(source_text: str) -> dict:
    """Repurpose one source into all platforms."""
    results = {}
    for platform in PLATFORMS:
        results[platform] = transform_for_platform(source_text, platform)
    return results


# Example usage
source_blog = """Task automation is transforming how agencies work. 
By using AI to handle repetitive tasks, teams save hours every week. 
We found that automating our client reporting cut our delivery time by 40%. 
The key is starting small — pick one repetitive task, automate it, measure the result."""

posts = repurpose_content(source_blog)
for platform, content in posts.items():
    print(f"=== {platform.upper()} ===")
    print(content)
    print()
```

## Scheduling & Publishing

### The Schedule Queue

Store posts in a database with planned send times:

```python
import json
from datetime import datetime, timedelta

class PostScheduler:
    def __init__(self):
        self.queue = []  # list of dicts
    
    def add_post(self, platform: str, content: str, publish_at: datetime, include_image: bool = False):
        self.queue.append({
            "platform": platform,
            "content": content,
            "publish_at": publish_at,
            "include_image": include_image,
            "status": "scheduled"
        })
    
    def get_due_posts(self, now: datetime) -> list[dict]:
        """Return posts scheduled to go out at or before `now`."""
        return [p for p in self.queue 
                if p["status"] == "scheduled" and p["publish_at"] <= now]
    
    def mark_published(self, post_id: str):
        for p in self.queue:
            if p.get("id") == post_id:
                p["status"] = "published"
    
    def generate_week_schedule(self, platforms: list[str], n_per_day: int = 3):
        """Auto-build a week of post times."""
        schedule = []
        now = datetime.now()
        for day_offset in range(7):
            for slot in range(n_per_day):
                publish_at = now + timedelta(days=day_offset, hours=9 + slot * 4)
                for platform in platforms:
                    schedule.append((platform, publish_at))
        return schedule
```

### Publishing via API

Each platform has an API. Here is the general pattern (X/Twitter v2 as example — you'll use your own tokens):

```python
import requests


def publish_to_twitter(content: str, bearer_token: str) -> dict:
    """Publish a tweet via X API v2."""
    url = "https://api.twitter.com/2/tweets"
    headers = {
        "Authorization": f"Bearer {bearer_token}",
        "Content-Type": "application/json"
    }
    # Shorten to 280 chars if needed
    tweet = content[:280] if len(content) > 280 else content
    response = requests.post(url, headers=headers, json={"text": tweet})
    return response.json()


def publish_to_linkedin(content: str, access_token: str, person_urn: str) -> dict:
    """Publish a LinkedIn post (simplified)."""
    url = "https://api.linkedin.com/v2/ugcPosts"
    headers = {"Authorization": f"Bearer {access_token}"}
    body = {
        "author": f"urn:li:person:{person_urn}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": content},
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    response = requests.post(url, headers=headers, json=body)
    return response.json()
```

**Note on API access:** Twitter/X and Meta have restricted (sometimes paid) API tiers. Many agencies use **third-party scheduling tools** (Buffer, Later, Metricool, or OpenPost) that have accessible APIs, rather than publishing directly to each platform. Your bot can generate the content, then hand it to these tools' APIs to schedule.

### Full Pipeline Runner

```python
def run_content_pipeline(source_text: str, platforms: list[str], scheduler: PostScheduler):
    """Generate and schedule posts from source content."""
    posts = repurpose_content(source_text)
    now = datetime.now()
    
    for i, platform in enumerate(platforms):
        if platform in posts:
            publish_at = now + timedelta(hours=i * 4)
            scheduler.add_post(platform, posts[platform], publish_at)
    
    return scheduler.queue
```

## Best Practices for Repurposing

1. **Never post the exact same content to every platform** — the algorithm punishes it, and it feels spammy
2. **Adapt the hook** — the first line (or first 1.5 seconds of a video) determines engagement
3. **Respect character limits** — the AI must be constrained, not freeform
4. **Vary the schedule** — post at the best time per platform, not all at once
5. **Include a scheduling buffer** — queue content ahead of time so you're never empty
6. **Always add a human review step** — especially for client accounts, QA before auto-publishing

## Self-Assessment Questions

1. What are the five stages of the content pipeline?
2. Why should content be reformatted per platform rather than posted identically?
3. List three ways AI helps with social media automation besides writing text.
4. Why do many agencies use third-party scheduling tools instead of publishing directly to platform APIs?
5. What is a "repurposing" workflow and why is it valuable to clients?
6. Which platform has the strictest character limit? Which allows the longest?
7. What is a schedule queue and what data does each post entry need?
8. Why is a human review step important even with full automation?
9. `publish_to_twitter` shortens content to 280 chars — what style of AI prompt ensures the content respects that limit in the first place?
10. How would content repurposing tie into an agency's recurring (retainer) revenue model?

## Practice Problems

### Problem 1
Repurpose one source blog post into a Twitter thread (5 tweets), a LinkedIn post, and an Instagram caption. Show the differences in tone, length, and hashtags.

### Problem 2
Design the database schema (fields) for a `posts` table that stores scheduled posts across platforms, including status tracking and analytics.

### Problem 3
Explain why posting identical content to 5 platforms is bad for reach + engagement, and give 3 specific adaptation techniques.

### Problem 4
Write the prompt you'd give an AI to convert a 30-minute podcast transcript into 10 marketing posts spread across a week, ensuring variety and no duplication.

## Key Takeaways

- A social media scheduling bot = source content → AI transformation → platform adapter → schedule queue → publish API
- Repurposing (one source → many formats) is a high-value agency service
- Platform-specific constraints (length, tone, hashtags, format) must be encoded in the AI prompt
- Publish via accessible APIs or third-party scheduling tools rather than fighting restricted platform APIs
- Always include a human QA step for client accounts
- This is a natural recurring-revenue service

## Practice Challenge

**Objective:** Prepare for the quiz and build a repurposing system.

1. Answer all 10 self-assessment questions in writing from memory, then check
2. Complete all 4 practice problems
3. Build a Python script `repurposer.py` that:
   - Takes a source text input
   - Generates posts for at least 4 platforms using AI
   - Stores them in a schedule queue (JSON file)
   - Supports a `--dry-run` mode that prints posts without publishing
4. Test it with a source blog post you write
5. Write one paragraph on how you'd price this as a retainer service (e.g., "10 posts/week across 5 platforms")

**Deliverable:** Written answers to all questions and problems, plus a working `repurposer.py` with a demo output.

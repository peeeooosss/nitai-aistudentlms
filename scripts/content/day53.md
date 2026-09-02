# Client Acquisition Playbook

## Learning Objectives

- Understand the key channels for acquiring automation agency clients
- Build a repeatable, ethical client acquisition process
- Learn how to find, qualify, and reach out to prospects
- Craft outreach and a pitch that converts
- Create a structured playbook you can execute immediately

## The Client Acquisition Funnel

Acquiring clients is a pipeline, not a single tactic. Understand the funnel:

```
┌──────────────────────────────────────────────────────────────┐
│           YOUR ENTRY POINTS (how they find you)             │
│   Content | Referrals | Outbound | Community | Marketplace  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    PROSPECTING (find + qualify)
                            │
                            ▼
                     OUTREACH (reach + pitch)
                            │
                            ▼
                      CALL / DISCOVERY
                            │
                            ▼
                       PROPOSAL (AI-assisted)
                            │
                            ▼
                           CLOSE
                            │
                            ▼
                  ONBOARDING → DELIVERY → RETAINER → REFERRALS
```

## Channel 1: Content Marketing (Inbound)

Create content that attracts prospects searching for AI automation help.

**What to create (using your repurposing system, Day 47):**
- Short "how to automate X" tutorials
- Client case studies (anonymized) with before/after results
- Comparisons of tools (Make vs n8n, etc.)
- "X automation you can build today" listicles

**Where to publish:**
- LinkedIn (primary for B2B)
- YouTube (long-form how-tos)
- A simple blog / website
- Niche communities and newsletters

**The goal:** become the obvious expert when someone realizes they need automation.

## Channel 2: Referrals & Network

The highest-converting channel for agencies.

- **Ask every happy client** for a referral — make it easy (provide a template)
- **Strategic partners:** web developers, designers, marketers, accountants who serve the same clients — they can refer automation work to you (and vice versa)
- **Past employers / colleagues** who know your work

### Referral Template
```
Subject: Know anyone who needs automation?

Hi [Name],
I'm building a practice that helps [target] automate their repetitive 
work with AI — chatbots, workflow automation, reporting. 

Do you know [1-2 examples of who might need this]? If you refer someone 
who becomes a client, I'll [reward: discount, gift, % of first month].

Thanks!
[You]
```

## Channel 3: Outbound Prospecting

For a new agency, outbound fills the pipeline faster than waiting for inbound.

### Finding Prospects
Look for businesses with obvious automation needs:
- Companies advertising repetitive job roles (data entry, scheduling, social posting)
- Businesses with active social media but inconsistent posting
- Companies with customer support job postings (they struggle with ticket volume)
- Local service businesses (they rarely automate)
- Companies hiring "analyst" or "coordinator" roles for manual reporting

### Qualification (BANT-lite)
Before spending effort, qualify:

| Criterion | Ask |
|---|---|
| **Budget** | Do they have budget for this? (You can ask poll or size) |
| **Authority** | Are you the decision-maker? |
| **Need** | Do they have a clear, painful problem? |
| **Timing** | When do they want it solved? (urgency) |

### Outreach Sequence (AI-assisted, from Day 36)
A short, value-first outreach sequence beats one cold email:

```
EMAIL 1: Personalized hook + a specific observation about their business
EMAIL 2 (day 3): A relevant example/result (proof)
EMAIL 3 (day 6): A clear, low-friction next step (book a 15-min call)
```

**Personalization is critical.** Generic blasts get ignored. Use AI to help but inject real, researched specifics about each prospect.

```python
def craft_outreach_email(prospect: dict, icebreaker: str) -> str:
    from openai import OpenAI
    client = OpenAI()
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": 
             f"Write a short, personalized cold outreach email (under 150 words) to "
             f"{prospect['role']} at {prospect['company']}. Reference a specific "
             f"icebreaker detail provided. Offer ONE clear, low-friction next step. "
             f"Be helpful, not salesy. Do not sound generic or spammy."},
            {"role": "user", "content": 
             f"Prospect: {prospect}\nIcebreaker detail: {icebreaker}"}
        ],
        temperature=0.6,
    )
    return resp.choices[0].message.content
```

## Channel 4: Communities & Marketplaces

- **Freelance marketplaces** (Upwork, Fiverr) — good early for reviews/results, though competition is high
- **Community engagement** — Reddit (r/smallbusiness, r/entrepreneur), Facebook groups, LinkedIn groups, Discord servers where your target hangs out
- **Partner ecosystems** — become a Make.com/n8n partner or join communities of no-code builders where clients look for help

Focus on being genuinely helpful in communities, not spamming.

## The Discovery Call

When someone says yes to a call, run a structured discovery that surfaces their pain and positions your solution:

```
DISCOVERY CALL AGENDA (15-30 min)
1. Intro & rapport (2 min)
2. "What's the #1 repetitive task eating your team's time?" (5 min)
   → Deep dive: how much time? how often? what's the pain/cost?
3. "What happens if this stays unsolved?" (find the consequence)
4. One relevant example/result you've achieved (2 min)
5. Propose a lightweight next step (free audit / small paid pilot) (3 min)
6. Agree on next step & book follow-up
```

**Key principle: diagnose before you prescribe.** You're discovering the problem, not pitching yet.

## The AI-Assisted Proposal

We cover proposals deeply tomorrow (Day 54). For acquisition, keep it actionable:
- Lead with the outcome, not the features
- Show clear value and ROI
- Make the next step easy (e.g., "approve to start")

## Tracking Your Pipeline

Use your own CRM (Day 38-39 skills) to track prospects:

```python
# Simple prospect tracker structure
prospects = [
    {"company": "Acme", "contact": "Sarah", "stage": "discovery",
     "value": 2000, "next_action": "Send proposal", "due": "2026-09-05"},
    # ...
]

def pipeline_summary(prospects):
    from collections import Counter
    stages = Counter(p["stage"] for p in prospects)
    total_value = sum(p["value"] for p in prospects 
                      if p["stage"] in ("proposal", "discovery"))
    return {"by_stage": dict(stages), "open_value": total_value}
```

## Key Takeaways

- Acquisition is a funnel, not a single tactic — build multiple entry points
- The best channels for a new agency: content (inbound), referrals/partners, outbound, communities
- Qualify prospects (budget, authority, need, timing) before heavy effort
- Personalize outreach; use AI but inject real researched specifics
- Run a disciplined discovery call: diagnose the problem, quantify the pain, propose a small next step
- Track your pipeline in your own CRM — sell what you use
- Deliver great work so clients refer you — retention and referrals compound growth

## Practice Challenge

**Objective:** Build your complete client acquisition playbook.

1. Define your ideal client profile (ICP): industry, size, role, pain, budget
2. List 3 concrete prospecting sources and how you'd find prospects in each
3. Write your referral ask template and a partner-referral setup
4. Build a 3-email outbound sequence for one specific prospect type (AI assist, personalized)
5. Write your discovery call agenda (questions + flow)
6. Set up a prospect tracker (spreadsheet/CRM) with stages and next actions
7. Fill in 5 realistic example prospects through your tracker

**Deliverable:** A complete Client Acquisition Playbook document covering all 6 items, with your outreach templates, discovery agenda, and a populated prospect tracker.

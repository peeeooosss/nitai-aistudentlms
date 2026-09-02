# AI CRM Integration

## Learning Objectives

- Understand how AI enhances a Customer Relationship Management (CRM) system
- Build an AI-powered CRM integration that automates data entry and enrichment
- Implement automatic lead capture, deduplication, and record enrichment
- Create activity logging and follow-up automation driven by AI
- Learn the agency value prop: CRM cleanup + AI automation
- Deliver a working AI CRM integration project

## Why CRM + AI Is a Killer Agency Service

Most small businesses have a CRM (or a spreadsheet they call one) that's messy, incomplete, and underused. Sales reps hate data entry, leads go stale, and follow-ups are forgotten. This is a **massive, recurring opportunity** for your agency because:

1. **CTRL is the system of record** for all sales activity — automating it touches money directly
2. **Data is usually messy** — AI can clean, dedupe, and enrich it
3. **Every business with sales has this problem** — huge addressable market
4. **Follow-up automation drives revenue** — easy ROI story

## The AI-Powered CRM Integration Layers

```
┌─────────────────────────────────────────────┐
│ 1. CAPTURE    — Auto-create records         │
│ 2. ENRICHMENT — AI fills missing fields     │
│ 3. CLEANING   — Dedupe, normalize, validate │
│ 4. ACTIVITY   — Auto-log calls/emails       │
│ 5. INSIGHTS   — AI summaries & next best    │
│                action                       │
└─────────────────────────────────────────────┘
```

## 1. Automatic Lead Capture

A web form, landing page, or chatbot submission should automatically create a CRM record. Use a webhook:

```python
import json
import requests
from datetime import datetime
from openai import OpenAI

client = OpenAI()

class CRMAutomator:
    def __init__(self, crm_name: str = "hubspot"):
        # Production: use the CRM's official API
        # Example with HubSpot contacts API
        self.crm_name = crm_name
        self.api_key = "YOUR_CRM_API_KEY"
    
    def capture_lead(self, form_payload: dict) -> dict:
        """Create a lead record from a web form submission."""
        # Standardize the payload into a CRM schema
        lead = {
            "firstname": form_payload.get("first_name"),
            "lastname": form_payload.get("last_name"),
            "email": form_payload.get("email").lower(),
            "phone": form_payload.get("phone"),
            "company": form_payload.get("company"),
            "source": form_payload.get("source", "web_form"),
            "created_at": datetime.utcnow().isoformat() + "Z",
        }
        
        # In production, POST to CRM API here
        # response = requests.post(CRM_ENDPOINT, headers=auth, json=lead)
        
        return {"status": "created", "lead": lead}
```

## 2. AI Enrichment: Filling in the Gaps

The highest-value AI feature: take a partial record (maybe just an email) and intelligently enrich it.

```python
def extract_details_from_email(email_text: str) -> dict:
    """Extract structured lead details from raw email/notes."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """Extract business lead details from this text. 
                Return JSON: name, email, company, role, phone, industry, 
                budget_range (if mentioned), pain_points (list), 
                intent_level (high/medium/low). Set unknown fields to null."""
            },
            {"role": "user", "content": email_text}
        ],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


def infer_company_info(company_name: str) -> dict:
    """Enrich a company with AI-inferred or web-fetched details."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """For the given company name, infer (do NOT fabricate 
                precise facts — return confident general inferences) details: 
                likely_industry, likely_size (employee range), 
                likely_location, likely_website. Label each with a confidence 
                from 0-1. Return JSON."""
            },
            {"role": "user", "content": company_name}
        ],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)
```

> **Important ethical note:** Enrichment must not fabricate facts. AI should only make **clearly-labeled inferences** or pull real data from data providers (Clearbit, Apollo, ZoomInfo). Never present a guessed phone number as a real one.

## 3. AI Cleaning: Deduplication & Normalization

CRMs are full of duplicates and inconsistent data. AI can identify near-duplicates:

```python
def normalize_email(email: str) -> str:
    """Remove common email typos/variations."""
    email = email.strip().lower()
    # Gmail ignores dots in the local part
    if email.endswith("@gmail.com"):
        local, _ = email.split("@")
        local = local.replace(".", "")
        email = f"{local}@gmail.com"
    return email


def find_duplicates(records: list[dict]) -> list[tuple[str, str]]:
    """Use AI embeddings to find records that likely refer to the same person."""
    # Create embeddings for each record's identifying text
    def record_text(r: dict) -> str:
        return f"{r.get('full_name')} {r.get('email')} {r.get('company')}"
    
    texts = [record_text(r) for r in records]
    # In production: embed all, compute similarity matrix, 
    # flag pairs above a similarity threshold.
    
    # Simplified demonstration using exact email matching first:
    from collections import defaultdict
    by_email = defaultdict(list)
    for i, r in enumerate(records):
        by_email[normalize_email(r.get("email", ""))].append(i)
    
    dupes = [tuple(v) for v in by_email.values() if len(v) > 1]
    return dupes
```

### Merging Strategy
When duplicates are found, define a merge rule — usually **keep the newest or most complete record, and append missing field values from the others**:

```python
def merge_records(primary: dict, secondary: dict) -> dict:
    """Merge two records, keeping primary's values and filling blanks."""
    merged = dict(primary)
    for key, value in secondary.items():
        if (key not in merged or not merged[key]) and value:
            merged[key] = value
    return merged
```

## 4. AI Activity Logging & Follow-Up Automation

Sales reps waste time logging activities. AI can auto-generate call/email summaries and schedule follow-ups:

```python
def summarize_call(transcript: str) -> dict:
    """Summarize a sales call and generate next steps."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """Summarize this sales call transcript. Return JSON:
                summary (2-3 sentences), key_topics (list), 
                objections_raised (list), next_steps (list, with owner), 
                overall_sentiment (positive/neutral/negative), 
                deal_stage_change (if any)."""
            },
            {"role": "user", "content": transcript}
        ],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


def suggest_next_action(lead_summary: dict) -> str:
    """AI suggests the best next action for a lead."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """Based on the lead's status and history, recommend 
                the single most valuable next action. Choose from: schedule_demo, 
                send_proposal, send_follow_up, nurture_sequence, assign_to_review, 
                disquality. Explain briefly why."""
            },
            {"role": "user", "content": json.dumps(lead_summary)}
        ]
    )
    return response.choices[0].message.content
```

## End-to-End Integration Flow

```python
class AI_CRM_Pipeline:
    """Chain of operations applied to an incoming lead."""
    
    def process_new_lead(self, raw_input: dict):
        results = {}
        
        # 1. Capture
        lead = self.capture_lead(raw_input)
        results["capture"] = lead
        
        # 2. Enrich (from email/notes if present)
        if raw_input.get("email_text"):
            details = extract_details_from_email(raw_input["email_text"])
            lead["enriched"] = details
            results["enrichment"] = details
            if leads hanging
        return results
```

## The Agency Deliverable for This Project

Today is a **PROJECT day**. Your final deliverable is a **CRM Audit + AI Automation Blueprint** for a client. Here is the structure:

### Project: AI CRM Integration for a Client

**Context:** You are onboarding a new client — a B2B service company with a messy CRM. Your job is to (a) analyze their CRM data, (b) design and implement AI automation to fix it, and (c) produce a blueprint document.

#### Part 1: CRM Audit
- Export a sample of their lead data (or create a realistic mock dataset)
- Analyze it for: duplicates, incomplete fields, inconsistent formats, stale leads
- Produce a summary: how many leads, what % missing phone/company, how many apparent duplicates, how many inactive, average age of records

#### Part 2: AI Automation Design
Design and implement these as Python functions:
1. **Auto-capture** — turn form/chat data into clean CRM records
2. **Enrichment** — fill missing fields using AI (with confidence labels)
3. **Cleaning** — dedupe + normalize (emails, phone formats, company names)
4. **Lead scoring hook** — determine follow-up priority (links to tomorrow's topic)
5. **Follow-up generation** — AI drafts a personalized follow-up email for the highest-priority lead

#### Part 3: Blueprint Document
Write a client-facing blueprint that includes:
- Current state audit findings (with numbers)
- The recommended automation (what each piece does, what it costs to run)
- Expected impact: time saved, response time improvement, lead quality
- Implementation plan (phases, timeline, what the client needs to provide)
- A simple pricing recommendation (one-time setup + monthly retainer)

#### Part 4: Demo
Build a working demo that takes 3 sample leads through the full pipeline and shows before/after records.

### Mock Data Setup
```python
mock_leads = [
    {"full_name": "John Smith", "email": "John.Smith@GMAIL.com", "company": "Acme Corp", "phone": ""},
    {"full_name": "john smith", "email": "johnsmith@gmail.com", "company": "ACME Corporation", "phone": ""},
    {"full_name": "Jane Doe", "email": "jane@widgets.io", "company": "Widgets Inc", "phone": "555-123-4567"},
    {"full_name": "Bob Johnson", "email": "", "company": "Johnson LLC", "phone": "5559876543"},
    # ... add more, including near-duplicates and incomplete records
]
```

## Key Takeaways

- CRM automation touches revenue directly — a high-value, recurring agency service
- The five integration layers: Capture, Enrich, Clean, Activity, Insights
- AI enrichment must label inferences rather than fabricate facts
- Deduplication and normalization are measurable, high-impact services
- AI-generated call summaries and next-best-actions save reps significant time
- The audit approach (show the client the mess, then fix it) is a powerful selling motion

## Practice Challenge

**Objective:** Deliver the full CRM Integration project.

1. Complete Parts 1-4 of the project above (audit mock data, build the automation functions, write the blueprint, build the demo)
2. Ensure your pipeline handles: real duplicate detection, email normalization, phone format standardization, missing-field enrichment with confidence labels
3. Test that AI-generated follow-up emails are personalized and actionable
4. Prepare a client-facing presentation of your audit findings and proposed automation (slides or a doc)

**Deliverable:** `crm_pipeline.py` with all functions, the audit report with concrete numbers from the mock data, the AI-driven cleanup/enrichment results, the blueprint document, and a 5-minute demo presenting it as if to the actual client.

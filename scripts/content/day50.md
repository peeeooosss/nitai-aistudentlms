# Client Onboarding Automation

## Learning Objectives

- Understand why client onboarding matters for agency retention and revenue
- Map the end-to-end client onboarding journey
- Build an automated onboarding system with AI personalization
- Design a professional, repeatable onboarding process for your agency
- Implement automated kickoff, document collection, and welcome flows

## Why Client Onboarding Is Critical

Client onboarding is the **first impression** of your agency's professionalism — and it directly drives retention. Key statistics:

- Poor onboarding is a major cause of early client churn
- A great first 30 days dramatically increases lifetime value
- Automated, organized onboarding frees you to focus on delivering value instead of admin

For an automation agency, onboarding is doubly important: not only do you want to onboard YOUR clients well, but **client onboarding automation is also a product you can sell to others** (which we touched on in Day 42).

## The Onboarding Journey

```
SALE CLOSED
    │
    ▼
1. CONTRACT & PAYMENT   (Docusign, Stripe, invoice)
    │
    ▼
2. WELCOME & INTAKE     (welcome kit, onboarding form, collect info)
    │
    ▼
3. KICKOFF MEETING      (align on goals, scope, success criteria)
    │
    ▼
4. ACCESS & SETUP       (logins, tools, workflows, repositories)
    │
    ▼
5. DELIVERY & MILESTONES (first deliverable, check-ins, reviews)
    │
    ▼
6. FEEDBACK & STABILIZE (feedback loop, metrics, relationship)
    │
    ▼
ONGOING RETENTION
```

## The Automation Blueprint

Automate each step where sensible, keeping humans for relationship-critical parts (kickoff call, delivery reviews).

### Step 1: Contract & Payment Automation

```python
import requests
import json
from datetime import datetime, timedelta


class OnboardingAutomator:
    def __init__(self, config: dict):
        self.config = config
    
    def on_contract_signed(self, contract: dict) -> dict:
        """Triggered when the client signs the contract (webhook)."""
        client = {
            "name": contract["client_name"],
            "email": contract["email"],
            "company": contract["company"],
            "plan": contract["plan"],
            "start_date": datetime.now().date().isoformat(),
            "status": "onboarding",
        }
        
        # 1. Create client record in CRM
        client_id = self.create_crm_record(client)
        
        # 2. Create project + onboarding tasks in project tool
        self.create_project_tasks(client, client_id)
        
        # 3. Generate welcome email + onboarding form link
        welcome = self.generate_welcome_email(client)
        
        # 4. Set up the kickoff meeting slot
        meeting = self.schedule_kickoff(client)
        
        return {
            "client_id": client_id,
            "welcome_email": welcome,
            "kickoff_meeting": meeting,
            "status": "onboarding_started"
        }
    
    def create_crm_record(self, client: dict) -> str:
        # In production, POST to your CRM (HubSpot, Airtable, etc.)
        print(f"[CRM] Created record for {client['company']} ({client['plan']})")
        return f"crm_{client['company'].lower().replace(' ', '_')}"
    
    def create_project_tasks(self, client: dict, client_id: str):
        # Task template based on plan
        tasks = [
            "Schedule kickoff meeting",
            "Collect brand assets & access",
            "Set up reporting dashboard",
            "Deliver Month 1 roadmap",
            "30-day check-in",
        ]
        for t in tasks:
            print(f"[PROJECT] Added task: {t}")
    
    def generate_welcome_email(self, client: dict) -> dict:
        from openai import OpenAI
        c = OpenAI()
        resp = c.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": 
                 "Write a warm, professional welcome email for a new agency client. "
                 "Include: confirmation of the plan, what happens next, a link to "
                 "an onboarding form, the kickoff meeting date, and how to reach support."},
                {"role": "user", "content": 
                 f"Client: {client['name']} at {client['company']}. Plan: {client['plan']}."}
            ],
            temperature=0.6,
        )
        return {"subject": f"Welcome to the team, {client['name']}!",
                "body": resp.choices[0].message.content}
    
    def schedule_kickoff(self, client: dict) -> str:
        # In production, use Calendly API or Google Calendar
        slot = (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d %H:%M")
        print(f"[CALENDAR] Booked kickoff for {client['company']} at {slot}")
        return slot
```

## AI-Powered Onboarding Questionnaire

Instead of a generic form, build an **adaptive intake questionnaire** with AI:

```python
def adaptive_onboarding_questions(business_context: dict) -> list[str]:
    """Generate targeted onboarding questions based on what the client shared."""
    from openai import OpenAI
    client = OpenAI()
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": 
             "Generate a focused list of 6-8 onboarding questions for a new automation "
             "agency client. The questions should gather exactly the info needed to "
             "start their project well: business goals, current tools, pain points, "
             "success metrics, access needs. Avoid generic or redundant questions. "
             "Return a JSON list."},
            {"role": "user", "content": 
             f"Here's what we already know:\n{business_context}"}
        ],
        response_format={"type": "json_object"},
        temperature=0.5,
    )
    import json
    return json.loads(resp.choices[0].message.content).get("questions", [])
```

### Analyzing Responses
Once the client submits answers, AI can synthesize a project brief:

```python
def synthesize_onboarding_brief(questions: list[str], answers: list[str]) -> str:
    """Turn onboarding Q&A into a clear project brief."""
    from openai import OpenAI
    client = OpenAI()
    qa = "\n".join(f"Q: {q}\nA: {a}" for q, a in zip(questions, answers))
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": 
             "Synthesize this onboarding Q&A into a concise project brief with: "
             "Client goal, Current situation, Pain points, Success metrics, "
             "Proposed first phase, Open questions. Be professional and specific."},
            {"role": "user", "content": qa}
        ],
        temperature=0.4,
    )
    return resp.choices[0].message.content
```

## The Onboarding Checklist (Your Agency's Process)

Provide this to every client during onboarding:

```markdown
## Client Onboarding Checklist

### Phase 1: Contract (completed by sales)
- [ ] Contract signed (Docusign)
- [ ] Payment / deposit received
- [ ] Client added to CRM

### Phase 2: Welcome (day 0-1) 
- [ ] Welcome email sent
- [ ] Onboarding questionnaire sent
- [ ] Client added to communication channels (Slack/email list)

### Phase 3: Kickoff (day 2-5)
- [ ] Kickoff meeting booked & held
- [ ] Goals & success criteria agreed
- [ ] Project scope confirmed
- [ ] Deliverables & timeline confirmed
- [ ] Access form collected (logins, tools, assets)

### Phase 4: Setup (day 3-7)
- [ ] All logins & access granted
- [ ] Tools/workspaces created
- [ ] Reporting dashboard set up
- [ ] Repositories & docs created

### Phase 5: First delivery (by day 14)
- [ ] First deliverable completed & reviewed
- [ ] Check-in meeting held
- [ ] Feedback collected & applied

### Phase 6: Stabilize (day 21-30)
- [ ] 30-day performance review
- [ ] Success metrics reported
- [ ] Relationship & next-phase plan
```

## Automating the Onboarding Email Sequence

A timed email sequence keeps the client engaged without you micromanaging:

```python
ONBOARDING_SEQUENCE = [
    {"day": 0, "subject": "Welcome to [Agency]! Here's what to expect",
     "content": "Welcome! Here's our onboarding process and timeline."},
    {"day": 1, "subject": "Quick question for you",
     "content": "Please complete the onboarding questionnaire."},
    {"day": 3, "subject": "Your kickoff meeting is scheduled",
     "content": "Confirm your kickoff slot and what to prepare."},
    {"day": 7, "subject": "We've started! First steps",
     "content": "Here's what we're working on first and what we need from you."},
    {"day": 14, "subject": "Your first deliverable is ready",
     "content": "Review your first deliverable; here's our check-in invite."},
    {"day": 30, "subject": "Your 30-day review",
     "content": "Let's review progress and plan the next phase."},
]
```

Use the `EmailSequencer` pattern from Day 36 to send these on schedule, with AI generating personalized bodies per client.

## Common Onboarding Mistakes to Avoid

1. **Too many generic forms** — use adaptive, targeted questions instead
2. **Access bottleneck** — gate the client's logins early; don't stall on waiting
3. **No clear owner** — designate who handles what
4. **Silence** — keep the client informed even before work starts
5. **Skipping the kickoff** — the alignment meeting is essential
6. **No feedback loop** — capture feedback at milestones, not just at the end
7. **Over-automating relationships** — humans must run kickoff and reviews

## Key Takeaways

- Great onboarding drives retention and lifetime value — it's the client's first impression
- The journey: contract/payment → welcome/intake → kickoff → access/setup → delivery → feedback/stabilize
- Automate admin (records, tasks, welcome, scheduling) with a webhook-triggered pipeline
- Use adaptive, AI-targeted questionnaires and AI-synthesized project briefs
- Send a timed onboarding email sequence to keep clients engaged
- Keep humans for the relationship-critical parts: kickoff call, deliverable reviews, feedback
- Your onboarding process is also a product you can sell to other agencies

## Practice Challenge

**Objective:** Build an automated client onboarding system.

1. Build the `OnboardingAutomator` class with at least:
   - Contract-signed trigger that creates CRM record, project tasks, welcome email, and kickoff meeting
   - Adaptive questionnaire generation
   - Brief synthesis from Q&A
2. Implement the onboarding email sequence (reuse/simplify the Day 36 sequencer) so emails go out on days 0, 1, 3, 7, 14, 30
3. Design YOUR agency's onboarding checklist (the 6 phases above, tailored to you)
4. Simulate a full onboarding for a fictional client: trigger the pipeline, generate the welcome email and brief, and show the schedule of emails
5. Write a short note on which steps MUST remain human and why

**Deliverable:** `onboarding.py` (the full system), your personalized onboarding checklist, a simulated full onboarding run for one client, and the human-in-the-loop note.

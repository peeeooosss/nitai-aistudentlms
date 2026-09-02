# Email Automation Sequences

## Learning Objectives

- Understand the anatomy of automated email sequences (drip campaigns, lifecycle emails)
- Apply personalization at scale using AI and dynamic data
- Build a complete AI-powered email sequence system in Python
- Segment audiences and design relevant email paths
- Measure email performance with analytics and A/B testing
- Design sequences that generate revenue (leads, onboarding, reactivation)

## Why Email Automation Is an Agency Goldmine

Email marketing remains one of the highest-ROI channels in digital marketing — around **$36-$40 return for every $1 spent**. But most small businesses either don't send email at all or send generic blast emails to everyone. The opportunity for your agency is to build **intelligent, personalized, automated email sequences** that feel like one-to-one communication.

## The Email Sequence Architecture

An automated email system has four components:

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  AUDIENCE   │   │  SEGMENT    │   │  SEQUENCE   │   │  TRIGGER    │
│  DATA       │──▶│  & PERSONAL │──▶│  ENGINE     │──▶│  & TRACKING │
│  (CRM/DB)   │   │  IZATION    │   │  (AI)       │   │             │
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
```

1. **Audience Data** — who the emails go to (CRM, subscriber list, customer DB)
2. **Segmentation & Personalization** — AI groups and personalizes content
3. **Sequence Engine** — the orchestration of when/what to send
4. **Trigger & Tracking** — what starts an email and how we measure it

## Common Sequence Types

| Sequence | Goal | Trigger | Typical Length |
|---|---|---|---|
| Welcome | Onboard & educate | New subscription | 3-5 emails |
| Lead Nurture | Move leads to sale | Lead capture | 4-7 emails |
| Abandoned Cart | Recover sales | Cart abandonment | 2-3 emails |
| Customer Onboarding | Drive activation | Purchase | 3-6 emails |
| Reactivation | Win back lapsed | Inactivity | 2-3 emails |
| Post-Purchase | Upsell & referrals | Purchase | 3-4 emails |

## The 7 Emails That Print Money (The "Money Sequence")

A classic lead-nurturing sequence structure:

```
EMAIL 1 (Day 0):  Value — share a valuable resource, no hard sell
EMAIL 2 (Day 2):  Story — share a relevant case study or story
EMAIL 3 (Day 4):  Problem — articulate the problem they face
EMAIL 4 (Day 6):  Solution — introduce your solution's benefits
EMAIL 5 (Day 8):  Proof — testimonials, social proof, data
EMAIL 6 (Day 10): Offer — present the offer with urgency
EMAIL 7 (Day 12): Last chance — scarcity, clear CTA
```

The principle: **give value first, never lead with the pitch, and build a relationship before asking.**

## Personalization at Scale with AI

Generic emails get deleted. Personalized emails get opened and clicked. AI enables personalization at scale through three techniques:

### 1. Dynamic Field Insertion
Insert personal data: name, company, industry, behavior.

```python
def personalize_subject(name, company, latest_behavior):
    templates = [
        f"{name}, quick idea for {company}",
        f"Just for {name} — a {latest_behavior} tip",
        f"{name}, is {company} facing this too?"
    ]
    # AI picks the best variant
    return templates

def personalize_body(template: str, ctx: dict) -> str:
    """Insert personalization tokens into an email body."""
    return template.format(
        name=ctx.get("name", "there"),
        company=ctx.get("company", "your company"),
        industry=ctx.get("industry", "your industry")
    )
```

### 2. AI Content Generation
Generate the email copy itself, varied per segment.

```python
from openai import OpenAI
client = OpenAI()

def generate_email(subject_line: str, preferences: str, industry: str, tone: str) -> str:
    """Generate a personalized email body with AI."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": f"Write a professional marketing email. Tone: {tone}. "
                           f"Industry: {industry}."
            },
            {
                "role": "user",
                "content": f"Write an email body about this subject: '{subject_line}'. "
                           f"Personalize it for someone who prefers {preferences}. "
                           f"Include a clear call to action and keep it under 150 words."
            }
        ],
        temperature=0.7
    )
    return response.choices[0].message.content
```

### 3. AI Segmentation
AI can automatically cluster your audience into behavioral segments:

```python
def segment_users(user_data: list[dict]) -> dict:
    """AI-powered segment assignment. Returns user_id -> segment label."""
    # In production, use an embedding + clustering approach
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are a customer segmentation engine. For each user, 
                assign a segment label from: [new_lead, active_user, at_risk, churned, 
                power_user, high_value]. Base it on the provided behavioral data. 
                Return a JSON object mapping user_id to segment label."""
            },
            {"role": "user", "content": str(user_data)}
        ],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)
```

## Building a Full Email Sequence in Python

Here is a complete, runnable email automation sequence system:

```python
import json
import smtplib
import time
from email.message import EmailMessage
from openai import OpenAI

client = OpenAI()


# ----- SEQUENCE DEFINITION -----
# A sequence is a list of steps with timing and content.
NURTURE_SEQUENCE = [
    {"day": 0, "subject": "Welcome! Here's your free guide", "purpose": "value"},
    {"day": 2, "subject": "How [Company] solved [problem]", "purpose": "story"},
    {"day": 4, "subject": "Is this costing you?", "purpose": "problem"},
    {"day": 6, "subject": "Meet the solution", "purpose": "solution"},
    {"day": 8, "subject": "What our clients say", "purpose": "proof"},
    {"day": 10, "subject": "A special offer for you", "purpose": "offer"},
    {"day": 12, "subject": "Last chance — closing soon", "purpose": "urgency"},
]


# ----- EMAIL CONTENT GENERATION -----
def generate_email_body(purpose: str, ctx: dict) -> str:
    """Generate the body of an email for a given purpose and context."""
    purposes_desc = {
        "value": "Share a genuinely useful resource or tip. No selling.",
        "story": "Share a relatable customer story or case study.",
        "problem": "Articulate a problem the reader likely faces.",
        "solution": "Introduce your product as a solution to that problem.",
        "proof": "Show testimonials, results, social proof.",
        "offer": "Present a compelling offer with a clear call to action.",
        "urgency": "Create gentle urgency to act before the offer expires.",
    }
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": f"You are an expert email marketer. Write the email body "
                           f"for this step: {purposes_desc[purpose]}. "
                           f"Personalize using the context. Keep it under 150 words. "
                           f"Include a single clear call to action."
            },
            {
                "role": "user",
                "content": json.dumps(ctx)
            }
        ],
        temperature=0.7
    )
    return response.choices[0].message.content


# ----- SENDING -----
class EmailSequencer:
    def __init__(self, sender_email: str):
        self.sender_email = sender_email
        self.subscribers = {}   # email -> {name, signup_date, ctx, seq_step}
    
    def subscribe(self, email: str, name: str, ctx: dict):
        """Add someone to the nurture sequence."""
        from datetime import datetime
        self.subscribers[email] = {
            "name": name,
            "signup_date": datetime.now(),
            "ctx": ctx,
            "seq_step": 0,
        }
    
    def process_due_emails(self):
        """Send any emails whose day has arrived."""
        from datetime import datetime
        now = datetime.now()
        
        for email, sub in list(self.subscribers.items()):
            day_index = sub["seq_step"]
            if day_index >= len(NURTURE_SEQUENCE):
                continue  # sequence complete
            
            step = NURTURE_SEQUENCE[day_index]
            days_since_signup = (now - sub["signup_date"]).days
            
            if days_since_signup >= step["day"]:
                # Personalize context
                ctx = {**sub["ctx"], "name": sub["name"], "email": email}
                
                # Generate personalized subject + body
                subject = step["subject"].replace("[Company]", ctx.get("company", "your company")) \
                                         .replace("[problem]", ctx.get("problem", "this issue"))
                body = generate_email_body(step["purpose"], ctx)
                
                self._send(email, subject, body)
                sub["seq_step"] += 1
                print(f"[SENT] Day {step['day']} to {email}: {subject}")
    
    def _send(self, to_email: str, subject: str, body: str):
        """Send email (production uses your ESP's API)."""
        # Example with SMTP (comment out credentials)
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = self.sender_email
        msg["To"] = to_email
        msg.set_content(body)
        
        # with smtplib.SMTP("smtp.host.com") as s:
        #     s.starttls()
        #     s.login(USER, PASS)
        #     s.send_message(msg)
        
        # For demo, just save to a file
        with open("sent_emails.log", "a") as f:
            f.write(json.dumps({"to": to_email, "subject": subject, "body": body}) + "\n")


# ----- USAGE -----
sequencer = EmailSequencer("hello@agency.com")
sequencer.subscribe(
    "sarah@example.com", 
    "Sarah", 
    {"company": "Acme Corp", "industry": "logistics", "problem": "manual tracking"}
)

# Simulate checking daily
for _ in range(14):
    sequencer.process_due_emails()
    time.sleep(0.1)
```

## Segmentation & Pathing (Conditional Sequences)

Not every subscriber should get the same emails. Use **branching based on behavior**:

```python
def choose_next_email(user_profile: dict, engagement: dict) -> str:
    """Route a user down the best sequence path based on engagement."""
    # If they clicked a link, send them to a warmer sequence
    if engagement.get("clicked_link"):
        return "promote_sequence"
    # If they opened but didn't click, send educational
    elif engagement.get("opened"):
        return "educate_sequence"
    # If inactive, move toward re-engagement
    elif engagement.get("days_inactive", 0) > 30:
        return "reactivation_sequence"
    else:
        return "standard_nurture"
```

## Email Analytics & A/B Testing

Track these metrics:

| Metric | Definition | Benchmark |
|---|---|---|
| Open rate | % who opened | 20-30% |
| Click-through rate (CTR) | % who clicked | 2-5% |
| Response/reply rate | % who replied | 1-2% |
| Conversion rate | % who took desired action | 1-3% |
| Bounce rate | % undeliverable | < 2% |
| Unsubscribe rate | % who left | < 0.5% |

A/B test subject lines, send times, and CTAs. AI can help generate and predict winning variants:

```python
def ab_test_subjects(messages, traits):
    """AI predicts which subject line will perform best per user."""
    prompt = f"Given these subject lines: {messages}. " \
             f"For a user who {traits}, rank them best to worst."
    # ... AI generates ranking
```

## Key Takeaways

- Email automation is a high-ROI deliverable with four components: audience data, segmentation/personalization, sequence engine, and tracking
- The "7 emails that print money" structure (value → story → problem → solution → proof → offer → urgency) is a proven pattern
- AI enables personalization at scale: dynamic fields, AI-generated copy, and behavioral segmentation
- Design branched/conditional sequences based on user behavior, not just linear drips
- Measure with open rate, CTR, conversion rate, bounce rate, and unsubscribe rate

## Practice Challenge

**Objective:** Build a complete automated email sequence for a fictional (or real) business.

1. Choose a business and define its product and avatar (ideal customer)
2. Design a full nurture sequence with at least 5 emails, writing out the subject line and purpose of each
3. Implement the `EmailSequencer` class in Python that:
   - Adds subscribers with context (name, company, industry, problem)
   - Sends the correct email on the correct day
   - Personalizes subject and body using AI
   - Logs every send to a JSONL file for analytics
4. Add a behavioral branch: if a subscriber clicks a link, route them to a different (promotion) sequence
5. Write a short A/B testing plan — define what you'd test and how you'd measure significance
6. Produce a sample of 3 personalized emails generated for one specific subscriber

**Deliverable:** The sequence design doc, working `EmailSequencer` with branching, JSONL send logs (3+ emails), generated sample emails, and the A/B testing plan.

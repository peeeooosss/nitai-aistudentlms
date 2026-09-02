# Customer Support Automation

## Learning Objectives

- Understand the end-to-end architecture of an AI-powered customer support system
- Implement automatic ticket classification, triage, and first-response
- Design escalation logic that routes the right cases to human agents
- Build a support deflection system that resolves common issues automatically
- Prepare for the live interactive session on customer support automation

## Live Session Overview

This is a **LIVE_INTERACTIVE** day:

1. **Recap** — chatbot fundamentals and how they extend to support (15 min)
2. **Lecture/Demo** — building a support triage system (40 min)
3. **Hands-on exercises** — build your own support automation (60 min)
4. **Discussion** — real-world support automation challenges (20 min)
5. **Q&A** (15 min)

## Recap: From Chatbot to Support System

Yesterday you built a chatbot. Customer support automation takes that one step further: instead of just chatting, the system must **route, resolve, and escalate**. A full support automation system combines:

1. **Ingestion** — collect tickets from email, chat, web forms, social media
2. **Classification** — determine topic, urgency, and sentiment
3. **Triage** — route to the right queue or auto-resolve
4. **Resolution** — answer common questions automatically
5. **Escalation** — hand off to humans with full context
6. **Feedback loop** — learn from outcomes to improve

This is where the "return on investment" hits hard. Support is expensive; every ticket you resolve automatically saves the client money.

## The Support Ticket Lifecycle

```
        INCOMING TICKET (email, chat, form, social)
                    │
                    ▼
        ┌───────────────────────┐
        │ 1. CLASSIFICATION     │  AI: topic, urgency, sentiment
        └───────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │ 2. TRIAGE             │  Route based on rules + AI
        └───────────────────────┘
                    │
                    ▼
   ┌───────────────────────────────────┐
   │ Can AI resolve it?                │
   └────────┬────────────────────┬─────┘
            │ YES                │ NO
            ▼                    ▼
   ┌────────────────┐   ┌─────────────────┐
   │ 3. AUTO-RESOLVE│   │ 4. ESCALATE     │
   │  (generate      │   │  to human agent│
   │   + send answer)│   │  with context   │
   └────────────────┘   └─────────────────┘
            │                    │
            ▼                    ▼
   Log outcome + user feedback → Route/assign, add to queue
```

## Building the Support System in Python

Here is a modular implementation of the core components:

### 1. Ticket Classification

```python
import json
from openai import OpenAI

client = OpenAI()

CLASSIFICATION_PROMPT = """
Classify this customer support ticket. Return JSON with:
- category: one of [billing, technical, account, feature_request, bug_report, other]
- urgency: one of [low, normal, high, critical]
- sentiment: one of [negative, neutral, positive]
- is_resolvable_by_ai: boolean (true if this is a common/simple question)
- suggested_response: a short draft answer (if resolvable by AI)

A ticket is resolvable by AI if it is a factual question about a known topic,
a simple instruction, or a common troubleshooting step.
"""


def classify_ticket(subject: str, body: str) -> dict:
    content = f"Subject: {subject}\nBody: {body}"
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": CLASSIFICATION_PROMPT},
            {"role": "user", "content": content}
        ],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


# Example
ticket = {
    "subject": "Cannot reset my password",
    "body": "I've tried resetting my password three times but never receive the email. Please help."
}
result = classify_ticket(ticket["subject"], ticket["body"])
print(json.dumps(result, indent=2))
```

### 2. Smart Routing & Escalation

```python
import smtplib
from email.message import EmailMessage


def route_ticket(ticket: dict, classification: dict) -> str:
    """Determine where the ticket goes based on classification + rules."""
    # Critical/negative always goes to a human immediately
    if classification["urgency"] == "critical":
        return "escalate_immediately"
    
    # High urgency goes to human queue
    if classification["urgency"] == "high":
        return "human_queue_priority"
    
    # Billing issues always need a human (financial sensitivity)
    if classification["category"] == "billing":
        return "human_queue_billing"
    
    # Everything else that's AI-resolvable gets auto-answered
    if classification["is_resolvable_by_ai"]:
        return "auto_resolve"
    
    # Remaining go to normal human queue
    return "human_queue_normal"


def send_auto_response(to_email: str, response_text: str):
    """Send an automated reply (pseudo-code; use your SMTP/API in production)."""
    msg = EmailMessage()
    msg["Subject"] = "Re: Customer Support Inquiry"
    msg["From"] = "support@brighttech.com"
    msg["To"] = to_email
    msg.set_content(response_text)
    
    # with smtplib.SMTP("smtp.yourhost.com") as server:
    #     server.login(USERNAME, PASSWORD)
    #     server.send_message(msg)
    print(f"[SENT] Auto-response to {to_email}:\n{response_text}\n")


def process_ticket(ticket: dict):
    """Main entry point for handling an incoming ticket."""
    classification = classify_ticket(ticket["subject"], ticket["body"])
    destination = route_ticket(ticket, classification)
    
    print(f"Category: {classification['category']}")
    print(f"Urgency:   {classification['urgency']}")
    print(f"Sentiment: {classification['sentiment']}")
    print(f"Route:     {destination}")
    
    if destination == "auto_resolve":
        response = classification["suggested_response"]
        send_auto_response(ticket["email"], response)
        # Mark as resolved
        return {"status": "resolved", "method": "ai"}
    elif destination == "escalate_immediately":
        # Create critical alert, page on-call agent
        return {"status": "escalated", "method": "critical", "alert": True}
    else:
        # Add to human queue with classification context
        return {"status": "queued_for_human", "destination": destination}
```

### 3. Knowledge Base Grounding (Reducing Hallucination)

The single most important technique for support AI is **grounding responses in a real knowledge base**. Never let the AI answer from memory alone — give it the actual knowledge to ground its answer.

```python
import numpy as np
from openai import OpenAI

client = OpenAI()

# Knowledge base as a list of (id, title, content) entries
def build_knowledge_base():
    return [
        ("KB001", "Reset Password", 
         "To reset your password: go to the login page, click 'Forgot password', "
         "enter your email, and check your inbox for a reset link. Ensure you check "
         "spam. Links expire in 24 hours."),
        ("KB002", "Shared Invoices",
         "To share an invoice with your accountant, go to Billing > Invoices, "
         "click 'Share', and enter their email. They get a view-only link."),
        ("KB003", "Billing Cancellation",
         "You can cancel anytime. Your plan stays active until the end of the "
         "current billing period. Refunds are not issued for partial periods."),
    ]


def embed(text: str) -> list[float]:
    """Get a vector embedding for semantic search."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def cosine_similarity(a: list[float], b: list[float]) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


def search_knowledge_base(query: str, k: int = 2) -> list[tuple[str, str, str, float]]:
    """Return top-k most semantically relevant articles."""
    kb = build_knowledge_base()
    query_vec = embed(query)
    kb_vecs = []
    for kb_id, title, content in kb:
        kb_vecs.append(embed(f"{title}\n{content}"))
    
    scored = []
    for (kb_id, title, content), vec in zip(kb, kb_vecs):
        sim = cosine_similarity(query_vec, vec)
        scored.append((kb_id, title, content, sim))
    
    scored.sort(key=lambda x: x[3], reverse=True)
    return scored[:k]


def grounded_support_response(question: str) -> str:
    """Answer using only knowledge base excerpts, reducing hallucination."""
    top_results = search_knowledge_base(question)
    
    context = "\n\n---\n\n".join(
        f"[Article {kb_id}] {title}\n{content}" 
        for kb_id, title, content, score in top_results
    )
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": f"""Answer the customer's question using ONLY the 
                knowledge base articles provided. If the answer is not in the 
                articles, say you don't have that information and offer to 
                escalate. Do not invent facts.

                Knowledge base:
                {context}"""
            },
            {"role": "user", "content": question}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content
```

This retrieval-augmented generation (RAG) approach is the professional standard for support automation. We go deeper into agents, memory, and RAG later this phase.

### 4. Sentiment & Priority Scoring

```python
def score_ticket_priority(subject: str, body: str, customer_plan: str) -> int:
    """Composite priority score combining AI signals + business rules."""
    classification = classify_ticket(subject, body)
    
    # Base from AI classification
    urgency_base = {
        "low": 10, "normal": 30, "high": 60, "critical": 100
    }[classification["urgency"]]
    
    # Sentiment modifier
    sentiment_mod = {
        "negative": +20, "neutral": 0, "positive": -10
    }[classification["sentiment"]]
    
    # Enterprise customers get priority
    plan_mod = 15 if customer_plan == "enterprise" else 0
    
    score = urgency_base + sentiment_mod + plan_mod
    return min(100, max(0, score))
```

## KPIs for Support Automation

When delivering to a client, you must measure success. Track these:

| KPI | Definition | Target |
|---|---|---|
| Deflection rate | % of tickets fully resolved without human | 30-50%+ |
| First response time | Time to first meaningful response | < 1 min (AI) |
| Resolution time | Time to complete resolution | Down 40%+ |
| CSAT | Customer satisfaction score | Maintain/improve |
| Human load | Tickets reaching human agents | Reduced 40%+ |
| Escalation rate | % escalated to human | Monitor for QA |

## Live Session Exercises

### Exercise 1: Classification Accuracy
Build a test set of 15 sample tickets across all categories. Run your classifier and measure its accuracy. Identify which categories it gets wrong and why.

### Exercise 2: Routing Logic
Implement `route_ticket` with more granular rules. Add handling for:
- Refund requests (always human, high priority)
- Legal/compliance topics
- Non-English tickets
- Duplicate tickets (same user, same topic, recent)

### Exercise 3: RAG Grounding
Build a small knowledge base (5-10 articles) about a fictional product. Write 10 customer questions. Verify the grounded assistant answers correctly and REFUSES to answer when the answer is not in the knowledge base (rather than hallucinating).

### Exercise 4: Escalation Handoff
Design a "handoff summary" that the AI produces when escalating a ticket to a human. It should include: customer summary, full conversation, attempted auto-resolutions, and suggested next step. Write a function that generates this.

## Discussion Topics

1. How do you prevent a frustrated customer from feeling trapped by AI? What triggers instant human handoff?
2. What are the risks of a billing ticket being auto-resolved? Should financial topics ever be fully automated?
3. How do you handle multilingual support? Should you translate automatically?
4. What happens in the "gray zone" where the AI is fairly confident but not certain?
5. How do you build trust when AI is resolving a customer's problem?

## Key Takeaways

- Customer support automation is an end-to-end pipeline: ingestion → classification → triage → resolution → escalation → feedback
- The core technical pattern is classification + routing + grounded (RAG) response generation
- Never let the AI answer from memory alone — ground answers in a real knowledge base to reduce hallucination
- Critical/billing/legal topics should route to humans with full context
- Measure your system with KPIs: deflection rate, response time, resolution time, CSAT

## Practice Challenge

**Objective:** Build a configurable support automation system.

1. Complete all four exercises above
2. Combine them into a single `SupportAutoResponder` class that:
   - Takes a ticket (email, subject, body, customer plan)
   - Classifies it
   - Routes it (auto-resolve, human queue, escalate)
   - If auto-resolving, grounds the answer in the knowledge base
   - If escalating, generates a handoff summary
   - Logs every ticket and outcome to a CIV file or JSONL for analytics
3. Test it with 10 realistic tickets and record the results
4. Prepare a 10-ticket demo scenario for the live session, including at least one critical escalation and one multilingual ticket

**Deliverable:** The full `SupportAutoResponder` system, test results log, and a demo scenario ready for the live session.

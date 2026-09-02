# Proposal Writing with AI

## Learning Objectives

- Understand the structure of a high-converting service proposal
- Learn how AI accelerates proposal creation while keeping it personalized
- Build an AI proposal generator that anchors on the client's specific problem
- Master pricing presentation and risk reversal
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material, complete the self-assessment and practice problems, and ensure you can answer everything before the quiz.

## Why Proposals Are Decisive

The proposal is where your conversation either converts to a client or dies. A great proposal:

1. **Recaps the client's problem** in their own words (proof you listened)
2. **Presents your solution** clearly (what, how, when)
3. **Shows value & ROI** (why it's worth it)
4. **Prices with confidence** (clear scope, no ambiguity)
5. **Makes it easy to say yes** (clear next steps, risk reversal)

A generic proposal template is fine as a starting skeleton — but the content must be **specific to the client** or it reads as copy-paste and kills trust.

## The Anatomy of a Winning Proposal

```
1. COVER / EXECUTIVE SUMMARY
   - Their problem + your promise (2-3 sentences)

2. SITUATION / THE PROBLEM
   - Restate their issue in detail (show you listened)
   - The cost of NOT solving it (the pain/consequence)

3. THE SOLUTION / SCOPE
   - What you'll build/do (itemized)
   - In-scope vs out-of-scope

4. DELIVERABLES & TIMELINE
   - Exactly what they get, and when

5. VALUE & ROI
   - Time/money saved, revenue potential

6. INVESTMENT (PRICING)
   - Clear price + what it includes
   - Payment terms

7. WHY US / DIFFERENTIATION
   - Your relevant experience/approach

8. RISK REVERSAL & NEXT STEPS
   - Guarantee, free audit, what happens if they approve
```

## How AI Helps (and Doesn't)

AI is excellent at the **mechanical** parts:
- Drafting each section from structured inputs
- Rewriting for clarity/persuasion
- Summarizing your discovery notes into a "situation" section
- Generating ROI language from numbers you provide

AI is NOT a substitute for:
- The client-specific insights you got from the discovery call
- The actual scope and price decisions
- Personal, human trust

**Always inject the specific details yourself.** Use AI to draft, then verify and personalize.

## Building an AI Proposal Generator

Here's a Python system that drafts a proposal from structured inputs — capturing the best of both.

```python
from openai import OpenAI

client = OpenAI()


class ProposalGenerator:
    def __init__(self, agency_name="My Agency"):
        self.agency = agency_name
    
    def generate_situation(self, discovery_notes: str) -> str:
        """Turn discovery notes into a 'situation / problem' section."""
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": 
                 "Draft the 'Situation' section of a service proposal. Restate the "
                 "client's problem clearly and empathetically, then state the cost of "
                 "NOT solving it. Use the client's own words/context. Professional, "
                 "confident, 100-150 words."},
                {"role": "user", "content": f"Discovery notes:\n{discovery_notes}"}
            ],
            temperature=0.5,
        )
        return resp.choices[0].message.content
    
    def generate_solution(self, scope_items: list[str]) -> str:
        """Turn a scope list into a clean solution/scope section."""
        items = "\n".join(f"- {i}" for i in scope_items)
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": 
                 "Write the 'Solution & Scope' section of a proposal. Organize the "
                 "provided items logically, group related ones under short headers, "
                 "and add a confident 1-2 sentence intro. Do not add items that "
                 "aren't provided."},
                {"role": "user", "content": f"Scope items:\n{items}"}
            ],
            temperature=0.4,
        )
        return resp.choices[0].message.content
    
    def generate_value_roi(self, metrics: dict) -> str:
        """Generate a value/ROI section from numbers the user provides."""
        import json
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": 
                 "Write a persuasive 'Value & ROI' section. Use ONLY the metrics "
                 "provided; do not invent numbers. Show the business impact clearly "
                 "and simply. Max 120 words."},
                {"role": "user", "content": json.dumps(metrics)}
            ],
            temperature=0.4,
        )
        return resp.choices[0].message.content
    
    def assemble(self, data: dict) -> str:
        """Assemble the full proposal markdown from structured inputs."""
        sections = []
        sections.append(f"# Proposal: {data['client_name']}\n")
        sections.append(f"## Executive Summary\n{data['exec_summary']}")
        sections.append(f"## Situation\n{data['situation']}")
        sections.append(f"## Solution & Scope\n{data['solution']}")
        sections.append(f"## Deliverables & Timeline\n{self._timeline(data['timeline'])}")
        sections.append(f"## Value & ROI\n{data['value_roi']}")
        sections.append(f"## Investment\n{data['price']}")
        sections.append(f"## Why Us\n{data['why_us']}")
        sections.append(f"## Next Steps\n{data['next_steps']}")
        return "\n\n---\n\n".join(sections)
    
    def _timeline(self, items):
        return "\n".join(f"- {i}" for i in items)
```

## Pricing Presentation

How you present price matters as much as the number.

**Present pricing:**
- As an investment, not a cost
- Tied to the value it delivers
- With clear payment terms
- Optionally with tiers (from Day 52)

```python
def price_tiers(starter, growth, scale):
    return f"""
**Option A — Starter:** ${starter}/mo
Best for testing with a single workflow.

**Option B — Growth:** ${growth}/mo  *(most popular)*
Covers the full deliverable plus ongoing support.

**Option C — Scale:** ${scale}/mo
For teams wanting the complete system + priority SLA.
"""
```

## Risk Reversal & Guarantees

Reduce the client's fear of saying yes:

- **Free audit** — "We'll assess your workflows at no charge"
- **Pilot/scoped first phase** — start small, prove value
- **Satisfaction guarantee** — "If the first deliverable doesn't meet the agreed spec, we'll fix it or refund"
- **Clear SLA** — define response/resolution times

```python
def risk_reversal_block(guarantee_text):
    return f"""**Our commitment to you:**
{guarantee_text}

**Next step to move forward:**
We'll start with a structured kickoff, deliver your first milestone 
within [X], and check in weekly until we confirm the results meet 
your goals. If the first deliverable doesn't meet the agreed scope, 
we'll fix it at no additional cost.
"""
```

## Common Proposal Mistakes

1. **Too long / feature-dump** — focus on outcomes, not feature lists
2. **Generic** — no client-specific detail = lost trust
3. **Vague scope** — leads to disputes; be specific about in/out
4. **No ROI story** — client can't justify the price
5. **Price hidden or buried** — present it confidently and clearly
6. **No call to action** — always give a clear, easy next step
7. **No risk reversal** — client has nothing reducing the perceived risk

## Self-Assessment Questions

1. List the 8 sections of a winning proposal.
2. Why must a proposal restate the client's problem in their own words?
3. What is AI good at in proposal writing? What should a human always do?
4. Why is "present price as investment, not cost" an important framing?
5. What is the purpose of a price anchor / tiered pricing?
6. Give three examples of risk reversal.
7. Why is scope clarity (in/out) critical for profitability and client trust?
8. What is the difference between features and outcomes, and why does it matter?
9. Why should "next steps" be specific and easy rather than vague?
10. What's the risk of using a generic template without personalization?

## Practice Problems

### Problem 1
Write the "Executive Summary" for a proposal to a small business that wants to automate their customer support. (They get 300 tickets/month, currently 2 staff answering manually.)

### Problem 2
Given the metrics {tickets_per_month: 300, cost_per_ticket: 5, staff_hours_saved_per_month: 80}, write the "Value & ROI" section using ONLY these numbers.

### Problem 3
Convert these features into outcome-oriented language: "chatbot with FAQ integration, email auto-responder, CRM integration, daily report." Frame them as client outcomes.

### Problem 4
Write a risk-reversal + next-steps section that reduces a client's hesitation for a $2,500 chatbot project.

## Key Takeaways

- The proposal converts your conversation into a client — get the structure right
- Always personalize to the client's specific problem; generic kills trust
- AI accelerates drafting the mechanical sections; humans provide the specifics and judgment
- Restate the problem in their words, show value/ROI, price confidently, add risk reversal
- Present price as investment tied to value, with clear terms and (optionally) tiers
- Include a clear, easy next step — make it simple to say yes

## Practice Challenge

**Objective:** Prepare for the quiz and build your proposal generator.

1. Answer all 10 self-assessment questions from memory, then check
2. Complete all 4 practice problems
3. Build the `ProposalGenerator` class in Python
4. Use it to generate a full proposal for a realistic fictional client, filling in the discovery notes, scope, metrics, timeline, price, why-us, and next steps
5. Review the output to check for hallucinations or generic content — fix anything that's not specific enough
6. Produce the final proposal as a clean markdown document

**Deliverable:** Written answers, the working `ProposalGenerator`, and one complete, high-quality, personalized proposal for a realistic client.

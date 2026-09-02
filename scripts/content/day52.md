# Service Packaging for Clients

## Learning Objectives

- Understand how to turn your automation skills into sellable service packages
- Master service packaging concepts: scope, deliverables, pricing models, tiers
- Design your own service packages with clear scope and value
- Learn how to price services profitably
- Deliver a complete service packaging project

## Turning Skills into Products

After 20 days of building automation capabilities, you have a portfolio of skills. But skills aren't revenue — **packages are**. A service package turns your capabilities into a clear, sellable offering with:

- Defined **scope** (what's included / excluded)
- Clear **deliverables** (what the client actually receives)
- A clear **price** (with a value story)
- A defined **timeline** (when they get it)

Packaging transforms you from "someone who does AI stuff" into "an agency with a product catalogue." This makes you easier to sell to, easier to trust, and sets up scalable recurring revenue.

## The Service Packaging Framework

Build each package around this structure:

```
NAME — a memorable, descriptive name
──────────────
TARGET CUSTOMER — who needs this
PAIN POINT — what problem it solves (the hook)
DELIVERABLES — exactly what they get (itemized)
SCOPE — what's in / what's out (avoid scope creep)
TIMELINE — how long to deliver
PRICE — the number + the value story
INCLUDED ONGOING — what sustains recurring revenue
```

## Categorizing Your Services

Classify your deliverables into two fundamental types:

### 1. Project-Based Services (one-time)
Fixed scope, fixed price, delivered once.

**Examples:**
- Set up a support chatbot + knowledge base
- Build a CRM cleanup + integration
- Build a custom lead-scoring system
- Automate a single business workflow

### 2. Retainer/Managed Services (recurring)
Ongoing deliverables, monthly fee.

**Examples:**
- Monthly content repurposing + scheduling (X posts/week)
- Managed chatbot + improvement (monitoring, tuning)
- Automated reporting delivered monthly
- Ongoing agent maintenance and optimization

**The key to agency economics: convert project work into retainers.** A project gets you in the door; a retainer keeps the revenue flowing.

## Defining Deliverables & Scope

Scope discipline is the #1 way to stay profitable. Define boundaries explicitly:

### In-Scope vs Out-of-Scope Example

```
IN SCOPE (Chatbot Setup Package):
- Analysis of top 20 FAQs / support topics
- Build a knowledge-base-grounded chatbot
- Integrate with website chat widget
- Integration with your support email triage
- 2 rounds of revision
- Training doc for your team

OUT OF SCOPE (extra cost or separate):
- Custom integration with third-party ERP
- Multi-language support
- Ongoing 24/7 monitoring (→ retainer)
- Content writing for the knowledge base (→ content package)
- Changes after 2 revision rounds (→ hourly)
```

## Pricing Strategies

### Common Pricing Models

| Model | When to Use | Pros | Cons |
|---|---|---|---|
| **Fixed-price project** | Clear scope, predictable | Easy to sell, predictable | Risk if scope grows |
| **Value-based** | Strong ROI story | Higher profit | Harder to justify |
| **Hourly** | Vague scope, small tasks | Safe | Caps income, low perceived value |
| **Monthly retainer** | Ongoing work | Recurring revenue | Need consistent scope |
| **Tiered packages** | Standard offerings | Upsell path | Must clearly differentiate |

### Anchoring & Tiers (Goldilocks Pricing)

Offer 3 tiers so the middle looks reasonable and the high tier captures premium:

```
STARTER      $997 /mo   1 workflow automated, 1 chat agent, basic support
GROWTH       $1,997/mo  3 workflows, 2 agents, reporting, priority support ⭐ most popular
SCALE        $3,997/mo  everything + multi-agent system, custom integrations, SLA, strategy
```

Anchoring principle: the middle tier looks like the "safe" choice, and some clients pick the top tier — your margin improves.

## Costing a Service Package

To price profitably, estimate your real cost then add margin:

```python
def price_package(
    setup_hours: float,
    monthly_hours: float,
    hourly_rate: float = 50,
    tool_cost_monthly: float = 50,
    target_margin: float = 0.7,   # 70% gross margin target
    months: int = 12,
) -> dict:
    """Estimate a profitable package price."""
    # Setup cost (one-time) 
    setup_cost = setup_hours * hourly_rate
    
    # Monthly delivery cost
    monthly_cost = monthly_hours * hourly_rate + tool_cost_monthly
    
    # Monthly retainer must cover monthly cost at target margin
    monthly_revenue = monthly_cost / (1 - target_margin)
    
    # One-time setup price suggestion
    setup_price = setup_cost
    
    return {
        "setup_price": round(setup_price, 0),
        "monthly_retainer": round(monthly_revenue, 0),
        "annual_revenue": round(setup_price + monthly_revenue * months, 0),
        "monthly_cost": round(monthly_cost, 2),
        "monthly_margin": f"{target_margin:.0%}",
    }


# Example: chatbot package
p = price_package(
    setup_hours=20,
    monthly_hours=8,        # monitoring, tuning, improvements
    hourly_rate=50,
    tool_cost_monthly=30,
    target_margin=0.7,
)
print(p)
```

## Case Study: The Chatbot Package

Here's a concrete example of a well-packaged service:

```
PACKAGE: "SupportBot Pro"
TARGET: SaaS companies with >100 support tickets/month
PAIN: Support team overwhelmed, slow response, high cost per ticket

DELIVERABLES (one-time setup):
- Discovery & FAQ analysis (top 25 support themes)
- Knowledge-base-grounded AI chatbot
- Website widget integration
- Email triage: auto-classify + auto-respond to common tickets
- Human escalation with full context
- 2 revision rounds + team training

INCLUDED ONGOING (monthly retainer):
- 2 hours/month of tuning & improvements
- Monthly performance report (deflection rate, CSAT, cost saved)
- Knowledge base maintenance

TIMELINE: 2-3 weeks setup

PRICING:
- Setup: $2,500
- Monthly retainer: $500/mo
- VALUE STORY: if the bot resolves 300 tickets/mo at a $5 saved cost 
  per ticket (agent time), it pays for itself in 1 month.
```

## Building Your Package Catalogue

Group your skills into 3-5 core packages that build on each other:

```
1. "Chatbot & Support" — entry point, quick win
2. "Pipeline Automation" — connect tools, remove manual work
3. "Intelligence & Reporting" — dashboards, insights, lead scoring
4. "Content & Growth" — repurposing, SEO, social scheduling
5. "Custom AI Agency" — multi-agent systems, RAG, advanced build
```

Each package should have an **upsell path** to the next, turning one-time projects into long-term retainers.

## The Project for Today

Today is a **PROJECT day**. Deliver your own service packaging.

### Project: Your Service Package Catalogue

**Context:** You're launching your AI automation agency. You need a professional catalogue of services that a prospect can understand and buy from.

#### Part 1: Define 3 Core Packages
Create 3 distinct packages (e.g., SupportBot, Pipeline Automation, Intelligence/Reporting — or your own). For each:
- Name + tagline
- Target customer + pain point
- Itemized deliverables (in-scope)
- Out-of-scope list
- Timeline
- Pricing (using the costing formula, with a value-based rationale)

#### Part 2: Tier the Flagship Package
Take your most sellable package and create a **3-tier version** (Starter / Growth / Scale) with clear differentiation and an anchoring strategy. Explain which tier you expect most clients to choose and why.

#### Part 3: Build the Retainer Model
For at least one package, build the monthly retainer model with:
- What ongoing work the retainer covers (itemized monthly hours)
- What the client gets monthly (report, improvements, monitoring)
- The price and the "value story"

#### Part 4: Create a One-Page Sell Sheet
Produce a clean, client-facing one-page document (markdown is fine) for EACH package:
- Header: name + tagline
- "Your problem" hook
- What you get (deliverables)
- Timeline
- Price
- "Why us" + risk reversal (guarantee, free audit, etc.)

#### Part 5: Upsell Map
Show how a client moves from Package 1 → 2 → 3 (upgrade path), and how each project converts into a retainer.

## Key Takeaways

- Packages transform skills into sellable, trustworthy products
- Every package needs: name, target customer, pain point, deliverables, scope, timeline, price, value story
- Distinguish project-based (one-time) from retainer (recurring) services
- Scope discipline (in/out lists) prevents profit-draining scope creep
- Use tiered pricing with anchoring to increase average deal size and margin
- Price from real cost + target margin, then frame with a value-based story
- Design upsell paths and convert projects into retainers for sustainable revenue

## Practice Challenge

**Objective:** Complete your service package catalogue.

1. Complete all 5 project parts
2. Cost each package with the pricing function and verify margin
3. Write a one-paragraph "brand positioning" statement: what type of agency you are, who you serve, and why they should choose you
4. Prepare to present ONE of your packages (the flagship) as if pitching to a client

**Deliverable:** Your complete 3-package catalogue with tiers, retainer model, sell sheets, upsell map, pricing calculations, and the positioning statement.

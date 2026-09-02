# Building Your Agency Stack

## Learning Objectives

- Understand what an "agency stack" is and why it determines scalability
- Choose the right tools for running an AI automation agency
- Configure a stack for client delivery, project management, billing, and communication
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material, complete the self-assessment and practice problems, and ensure you can answer everything before the quiz.

## What Is an Agency Stack?

Your **agency stack** is the complete set of tools, platforms, and systems you use to run your business and deliver services. A well-chosen stack is the difference between an agency that scales smoothly and one that collapses under manual admin.

The stack has two sides:
1. **Operations stack** — running the business (CRM, billing, project management, communication)
2. **Delivery stack** — the tools you use to build and ship client work (the automation/AI tools from this whole phase)

## The Operations Stack

### 1. Client Relationship Management (CRM)

You need a system to track prospects, leads, and clients through the sales lifecycle.

| Tool | Best For | Notes |
|---|---|---|
| HubSpot CRM | All-in-one, free tier | Marketing + sales + service |
| Airtable | Flexible/custom | Treat as a database, build views |
| Pipedrive | Pipeline-focused | Sales pipeline visualization |
| Notion CRM | Lightweight, docs-integrated | Good for solo/small |

**Your CRM should track:** prospects, stage, deal value, next action, client status, and history.

### 2. Project Management (PM)

Track deliverables, deadlines, and tasks across all active client projects.

| Tool | Best For | Notes |
|---|---|---|
| Asana | Team collaboration | Task dependencies, timelines |
| ClickUp | All-in-one | Docs, tasks, goals in one |
| Linear | Engineering-focused | Fast, minimal |
| Notion | Customizable databases | Flexible boards + docs |
| Basecamp | Client communication + PM | Clear client-facing to-dos |

### 3. Communication

Where you and your clients talk.

| Tool | Use |
|---|---|
| Slack / Discord | Internal team + shared client channels |
| Zoom / Google Meet | Kickoff calls and reviews |
| Email | Formal comms, contracts, reports |
| Loom | Async video updates for clients |

### 4. Billing & Invoicing

Get paid reliably. Set up recurring billing for retainers.

| Tool | Best For |
|---|---|
| Stripe | Payments + subscriptions |
| FreshBooks | Simple invoicing for freelancers/agencies |
| QuickBooks | Full accounting |
| HoneyBook | Agency-specific proposals + invoicing |
| Payouts via Stripe | International clients |

### 5. File & Asset Management

| Tool | Use |
|---|---|
| Google Drive / Dropbox | Client file storage |
| GitHub | Code + version control for automations |
| A single "client portal" folder | Keep everything per-client in one place |

## The Delivery Stack (by service)

Here's how the tools you've learned map to deliverable service lines:

| Service | Core Tools | Skills |
|---|---|---|
| Chatbots & support | Voiceflow, Botpress, OpenAI API | Day 34-35 |
| Email automation | Make/n8n + Email API | Day 36 |
| Social scheduling | Make/n8n + scheduling API | Day 37 |
| CRM integration | Make/n8n + CRM API + OpenAI | Day 38-39 |
| Reporting/dashboards | Python + Streamlit/Looker + AI | Day 40, 49 |
| Agents & multi-agent | LangChain, CrewAI, LangGraph | Day 41-45 |
| Data extraction | Python + OCR + OpenAI | Day 46 |
| Content/SEO | OpenAI + Make + SEO tools | Day 47-48 |

## Designing Your Stack: Principles

1. **Don't over-engineer.** Start with fewer tools, master them, add only when needed.
2. **Keep it integrated.** Prefer tools that connect (via API/webhooks) so data flows between them.
3. **Client-facing vs internal.** Decide what clients see (portals/dashboards) vs internal (PM, CRM).
4. **Automate the glue.** Use Make/n8n to connect your own CRM → PM → billing (eat your own dogfood — your stack is your best testimonial).
5. **Document it.** Write down your stack and processes (an agency SOP) so you can hire/scale.

## Connecting Your Stack: The Agency's Own Automation

Your agency should AUTOMATE itself using the very tools you sell. Example — a lead → client pipeline:

```python
# Pseudo-flow: how your own systems should talk to each other
def agency_lead_pipeline(lead_signup: dict):
    # 1. Lead captured on website
    # 2. CRM record auto-created (HubSpot/Airtable)
    # 3. Welcome/nurture email added to sequence
    # 4. Slack notification to you
    # 5. When deal closes: PM project + tasks created
    # 6. Billing subscription created (Stripe)
    # 7. Onboarding triggered (Day 50 system)
    # 8. Reporting dashboard provisioned
    return {"status": "fully_automated_pipeline"}
```

## Building a Client Portal

A great differentiator: give each client a simple portal/dashboard showing their deliverables, tasks, and progress. This can be:
- A Notion page per client
- An Airtable interface per client
- A simple web app (Bubble/Streamlit)
- A folder in Google Drive with clear structure

A well-built portal makes your agency look bigger and more professional than it is — powerful for a new agency.

## Agency SOP (Standard Operating Procedure)

Combine your stack with documented processes:

```
## Client Delivery SOP
1. Lead signs up
   → Auto: CRM record, welcome email, Slack notify
2. Discovery call (HUMAN)
   → Doc: discovery notes in Notion
3. Proposal sent (AI-assisted)
   → Doc: proposal template in Drive
4. Deal closed
   → Auto: contract (Docusign), Stripe sub, project + tasks, onboarding
5. Onboarding (Day 50 system)
6. Delivery (per service SOP)
7. Monthly report (Day 40/49 system)
8. Renewal/upsell
```

## Self-Assessment Questions

1. What are the two sides of an agency stack?
2. List the five core areas of the operations stack and one tool for each.
3. Why should your stack be "integrated"?
4. What is "eating your own dogfood" in this context?
5. Name three tools you'd use for the delivery stack and which service each supports.
6. What is a client portal and why is it a differentiator?
7. Why is documenting your stack/SOP important for scaling?
8. What principle prevents you from over-engineering your tool stack?
9. Give an example of an automation between two stack tools (e.g., CRM → PM).
10. Why might a solo founder benefit from tools that make the agency look bigger?

## Practice Problems

### Problem 1
Design your ideal agency stack as a table: Category, Tool, Purpose, Monthly Cost (roughly), and whether it's shared with clients.

### Problem 2
Draw (write out) the "agency's own automation" flow: website lead → paid client, listing every tool involved at each step.

### Problem 3
Compare two PM tools (e.g., Asana vs Notion) for running a 5-client agency. Which would you choose and why?

### Problem 4
Design a client portal structure (what folders/views/docs each client sees) using Notion or Airtable as a base.

### Problem 5
List the 10 most important "automations" your own agency should run to free up your time (e.g., auto-send invoices, auto-generate kickoff notes).

## Key Takeaways

- Your agency stack = operations (running the business) + delivery (building client work)
- Operations: CRM, PM, communication, billing, file management
- Choose few, integrated tools; don't over-engineer
- Automate YOUR OWN business with the same tools you sell (best testimonial)
- A client portal makes a small agency look professional and scalable
- Document your stack and processes in an SOP so you can delegate and scale
- Get set up to bill recurring retainers as early as possible

## Practice Challenge

**Objective:** Prepare for the quiz and design your own agency stack.

1. Answer all 10 self-assessment questions from memory, then check
2. Complete all 5 practice problems
3. Create a one-page "Agency Stack Blueprint" document that includes:
   - Your operations stack (tool per category, with costs)
   - Your delivery stack (tool per service line)
   - Your "agency's own automation" pipeline (lead to client)
   - Your client portal design
   - Your top 10 internal automations
4. Justify at least 3 tool choices (why this over alternatives)

**Deliverable:** Written answers to all questions/problems, plus the Agency Stack Blueprint document.

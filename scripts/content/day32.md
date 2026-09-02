# Workflow Mapping & Design

## Learning Objectives

- Master the process of mapping existing business workflows before automating them
- Learn standardized notation for documenting workflows visually
- Identify automation opportunities within complex business processes
- Design AI-enhanced workflows that outperform manual processes
- Create reusable workflow templates for common client scenarios

## Why Workflow Mapping Comes First

The biggest mistake in AI automation is jumping straight to building. Clients come to you with pain points — "our support is too slow," "we spend too much time on data entry," "we are losing leads" — and the temptation is to immediately start wiring up AI tools.

Resist that temptation. The real value you provide as an automation agency is **understanding the business process deeply enough to automate it correctly**. An automation built on a flawed workflow understanding will produce flawed results.

## The Workflow Mapping Process

### Step 1: Process Discovery Interview

Before touching any tools, interview the client (or the person who does the work) using these questions:

1. **What is the trigger?** What starts this process? (e.g., "A new lead fills out the contact form")
2. **What are the exact steps?** Walk through every action in order.
3. **Who is involved?** Which roles touch this process?
4. **What decisions are made?** Where does someone need to think or choose?
5. **What data moves between steps?** What information is passed, and in what format?
6. **Where are the bottlenecks?** What slows things down?
7. **What goes wrong?** What are the common errors or exceptions?
8. **How do you measure success?** What KPIs matter for this process?

Document everything. Record the conversation (with permission). Do not assume you understand the process after one meeting.

### Step 2: Visual Workflow Documentation

Use a standardized notation to map the workflow. You do not need formal BPMN for most client work — a clear flowchart notation works well.

**Standard Symbols:**

| Symbol | Meaning |
|---|---|
| Rounded rectangle | Process step / action |
| Diamond | Decision point (yes/no, if/else) |
| Rectangle with wavy bottom | Document or data artifact |
| Circle | Connector (link between pages) |
| Double-bordered rectangle | Sub-process (expandable) |
| Arrow | Flow direction |

### Step 3: The As-Is Workflow Template

Here is a reusable template for documenting a client's current workflow:

```markdown
## Workflow: [Process Name]
**Trigger:** [What starts the process]
**Owner:** [Primary role responsible]
**Duration:** [How long the full process takes]
**Frequency:** [How often this happens]

### Steps:
1. [Action] → [Person/System] → [Output]
2. [Decision] → [Criteria] → [Branch A / Branch B]
3. [Action] → [Person/System] → [Output]
...

### Pain Points:
- [Specific issue 1]
- [Specific issue 2]

### Data Flow:
[Input data] → [Processing] → [Output data]
```

### Step 4: Identify Automation Opportunities

Once you have the as-is workflow documented, evaluate each step against the **automation potential matrix**:

| Criteria | Score (1-5) | Weight |
|---|---|---|
| Repetitiveness (how often?) | | 2x |
| Rule-based (is it predictable?) | | 2x |
| Data availability (is data digital?) | | 1.5x |
| Volume (is it worth automating?) | | 1.5x |
| Error rate (how often do humans err?) | | 1x |
| Time value (how much time is saved?) | | 2x |

**Score each step, multiply by weight, and rank.** The highest-scoring steps are your automation candidates.

## Designing AI-Enhanced Workflows

### The To-Be Workflow

After identifying automation opportunities, design the improved workflow. This is your "to-be" version.

Key principles:

**1. Keep humans in the loop for judgment calls.** AI handles classification, extraction, and routing. Humans handle complex exceptions and relationship-sensitive decisions.

**2. Build feedback loops.** Every AI decision should be logged and periodically reviewed. This creates training data for improvement.

**3. Design for failure.** Every automated step should have a fallback — what happens when the AI is uncertain? Route to a human, flag for review, or use a default.

### Example: Automated Client Onboarding Workflow

```markdown
## To-Be Workflow: Client Onboarding

TRIGGER: New client signs contract (Stripe webhook)

1. [AI] Extract client details from contract PDF
   → Confidence check: if < 85%, flag for manual review
   
2. [AUTO] Create client record in CRM (Airtable)
   → Populate: name, email, company, plan, start_date
   
3. [AI] Generate personalized onboarding email sequence
   → Use client industry + plan to customize messaging
   
4. [AUTO] Send welcome email (via SendGrid)
   → Include: login credentials, onboarding checklist, schedule link
   
5. [AI] Score lead readiness (0-100)
   → Factors: company size, response time, engagement
   
6. [DECISION] Score >= 70?
   → YES: Auto-schedule kickoff call (Calendly API)
   → NO: Add to nurture sequence, alert account manager
   
7. [AUTO] Create project in PM tool (Linear/Asana)
   → Template based on service package
   
8. [MONITOR] Track onboarding completion
   → If incomplete after 72 hours, send reminder
   → If incomplete after 7 days, escalate to account manager
```

### Connecting Steps with Automation Tools

Here is how you might implement steps 1-3 using Python and APIs:

```python
import json
import requests
from openai import OpenAI

openai_client = OpenAI()

def extract_contract_data(pdf_text: str) -> dict:
    """Extract structured data from contract text using AI."""
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """Extract the following fields from this contract text.
                Return valid JSON with keys: client_name, email, company_name,
                service_plan (basic/standard/premium), start_date, monthly_value.
                If a field cannot be determined, set it to null."""
            },
            {"role": "user", "content": pdf_text}
        ],
        response_format={"type": "json_object"}
    )
    
    result = json.loads(response.choices[0].message.content)
    confidence = calculate_confidence(result)
    return {"data": result, "confidence": confidence}


def calculate_confidence(extracted: dict) -> float:
    """Simple confidence score based on completeness."""
    fields = ["client_name", "email", "company_name", "service_plan", "start_date"]
    filled = sum(1 for f in fields if extracted.get(f) is not None)
    return filled / len(fields)


def create_crm_record(client_data: dict) -> str:
    """Create a client record in Airtable via API."""
    AIRTABLE_BASE_ID = "your_base_id"
    AIRTABLE_TOKEN = "your_token"
    
    response = requests.post(
        f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Clients",
        headers={
            "Authorization": f"Bearer {AIRTABLE_TOKEN}",
            "Content-Type": "application/json"
        },
        json={
            "fields": {
                "Name": client_data["client_name"],
                "Email": client_data["email"],
                "Company": client_data["company_name"],
                "Plan": client_data["service_plan"],
                "Start Date": client_data["start_date"],
                "Monthly Value": client_data["monthly_value"],
                "Status": "Onboarding"
            }
        }
    )
    return response.json().get("id", "error")


def generate_onboarding_email(client_data: dict) -> str:
    """Generate personalized onboarding email content."""
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Write a warm, professional welcome email for a new client."
            },
            {
                "role": "user",
                "content": f"""Client: {client_data['client_name']} from {client_data['company_name']}.
                Plan: {client_data['service_plan']}. Write a welcome email that includes:
                1. Personal greeting using their name
                2. Confirmation of their plan details
                3. Next steps (login credentials, kickoff call scheduling)
                4. Support contact information
                Keep it concise and friendly."""
            }
        ]
    )
    return response.choices[0].message.content


# Full pipeline
def onboard_new_client(contract_text: str):
    extraction = extract_contract_data(contract_text)
    
    if extraction["confidence"] < 0.85:
        return {"status": "needs_review", "data": extraction}
    
    client_id = create_crm_record(extraction["data"])
    email_content = generate_onboarding_email(extraction["data"])
    
    return {
        "status": "onboarded",
        "client_id": client_id,
        "email": email_content
    }
```

## Common Workflow Patterns You Will Reuse

| Pattern | Description | When to Use |
|---|---|---|
| Intake → Classify → Route | Process incoming items by type and send to the right handler | Support tickets, emails, form submissions |
| Extract → Validate → Store | Pull data from unstructured sources, verify accuracy, save to database | Document processing, invoice handling |
| Monitor → Detect → Alert | Watch for conditions and notify when thresholds are hit | System monitoring, SLA tracking |
| Collect → Analyze → Report | Gather data from multiple sources, generate insights | Reporting dashboards, analytics |
| Receive → Generate → Review | Take input, produce AI output, have human approve before sending | Content creation, email drafting |

## Key Takeaways

- Always map the current workflow ("as-is") before designing the automated version ("to-be")
- Use the automation potential matrix to prioritize which steps to automate first
- Design for failure — every AI step needs a confidence threshold and fallback
- Keep humans in the loop for judgment-heavy decisions and exceptions
- Build reusable workflow templates for common patterns (intake-classify-route, extract-validate-store, etc.)
- The workflow mapping skill is your primary differentiator as an agency — it is what separates you from someone who just knows tools

## Practice Challenge

**Objective:** Map and redesign a real workflow.

1. Choose a business process you are familiar with (e.g., processing a job application, handling a customer return, managing a project request)
2. Document the **as-is** workflow using the template above — include every step, decision point, and data flow
3. Score each step using the automation potential matrix
4. Design the **to-be** workflow with AI automation opportunities identified
5. For at least one AI-powered step, write a Python function using OpenAI's API that implements it
6. Create a simple diagram (ASCII art, draw.io, or Excalidraw) showing both the as-is and to-be workflows side by side

**Deliverable:** A complete workflow analysis document with as-is mapping, automation scoring, to-be design, and a working code prototype for at least one automated step.

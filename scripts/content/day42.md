# Building Multi-Agent Systems

## Learning Objectives

- Understand why and when to use multiple agents instead of one
- Learn the core multi-agent patterns: orchestrator, pipeline, debate, and collaboration
- Build a working multi-agent system in Python using CrewAI or LangGraph
- Manage communication and handoffs between agents
- Design role-based agents (researcher, writer, reviewer, etc.)
- Prepare for the live interactive session on multi-agent systems

## Live Session Overview

This is a **LIVE_INTERACTIVE** day:

1. **Recap** — single-agent architecture from Day 41 (15 min)
2. **Lecture/Demo** — multi-agent patterns + building with CrewAI (45 min)
3. **Hands-on exercises** — build a multi-agent team (60 min)
4. **Discussion** — orchestration and reliability (15 min)
5. **Q&A** (15 min)

## Why Multiple Agents?

A single agent can do a lot, but complex tasks benefit from **specialization**. Just as a business hires a researcher, a writer, and an editor rather than one person doing everything, a multi-agent system assigns each agent a focused role.

Advantages:
1. **Specialization** — each agent can have a strong, narrow system prompt and toolset
2. **Quality** — a reviewer agent catches mistakes a generator agent makes
3. **Parallelism** — agents can work on independent subtasks simultaneously
4. **Clarity** — each agent's responsibility is explicit, easier to debug and audit
5. **Scalability** — add or swap agents as needs grow

Disadvantages (be honest):
1. **Complexity** — more moving parts, more failure modes
2. **Cost** — many LLM calls
3. **Latency** — sequential handoffs add time
4. **Over-engineering** — sometimes one agent is fine

**Rule of thumb:** Start with ONE agent. Only add agents when the task genuinely benefits from specialization or a review step.

## Core Multi-Agent Patterns

### 1. Orchestrator / Supervisor Pattern
A lead ("orchestrator") agent delegates tasks to worker agents and combines their results.

```
        ┌──────────────┐
        │ ORCHESTRATOR │  decides who does what
        └──────┬───────┘
               │
     ┌─────────┼─────────┐
     ▼         ▼         ▼
  [Worker A] [Worker B] [Worker C]
     │         │         │
     └─────────┼─────────┘
               ▼
        FINAL RESULT (combined)
```

### 2. Pipeline Pattern
Agents work in sequence, each passing its output to the next.

```
RESEARCHER ──► WRITER ──► EDITOR ──► PUBLISHER
(rough notes)  (draft)     (polish)    (final)
```

### 3. Debate / Critique Pattern
Two agents review each other's work to improve quality.

```
GENERATOR ◄──► CRITIC  (iterate until converge)
```

### 4. Hierarchical / Team Pattern
Agents can have sub-agents. A project manager agent breaks work into subtasks, delegates to specialist agents, and reviews their output. This is a generalization of the orchestrator pattern.

## Building a Multi-Agent System with CrewAI

CrewAI is a Python framework that makes multi-agent teams easy. Each agent is a "crewmate" with a role, goal, and backstory.

### Install
```bash
pip install crewai
```
(You'll also need `crewai-tools` for certain tools.)

### The Content Team Example

Let's build a 3-agent content team: Researcher → Writer → Editor.

```python
from crewai import Agent, Task, Crew, Process

# ---- AGENT 1: RESEARCHER ----
researcher = Agent(
    role="Senior Market Researcher",
    goal="Find the most relevant, credible facts and data about a topic",
    backstory=(
        "You are an experienced market researcher who digs up accurate, "
        "well-sourced information. You provide clear, factual bullet points."
    ),
    # In production you'd add tool: SearchTool()
    tools=[],
    verbose=True,
    allow_delegation=False,
)

# ---- AGENT 2: WRITER ----
writer = Agent(
    role="Content Writer",
    goal="Turn research into a clear, engaging, well-structured article",
    backstory=(
        "You are a professional content writer who turns research into "
        "compelling, readable articles with a strong structure and clear "
        "headings."
    ),
    tools=[],
    verbose=True,
    allow_delegation=False,
)

# ---- AGENT 3: EDITOR ----
editor = Agent(
    role="Senior Editor",
    goal="Review and polish content to ensure quality, accuracy, and consistency",
    backstory=(
        "You are a meticulous senior editor. You catch factual errors, "
        "improve clarity, fix awkward phrasing, and ensure the piece meets "
        "a high editorial standard before publication."
    ),
    tools=[],
    verbose=True,
    allow_delegation=False,
)


# ---- TASKS (each assigned to an agent) ----
research_task = Task(
    description=(
        "Research the topic: 'How AI is transforming small business "
        "customer service in 2026'. Gather at least 5 key facts with "
        "reasonable confidence, and summarize them as bullet points."
    ),
    expected_output="A list of 5+ factual bullet points with sources noted.",
    agent=researcher,
)

writing_task = Task(
    description=(
        "Using the researcher's findings, write a 500-word article with "
        "an introduction, 3 body sections with headings, and a conclusion."
    ),
    expected_output="A complete 500-word article with clean headings.",
    agent=writer,
)

editing_task = Task(
    description=(
        "Review the article for factual accuracy, clarity, and flow. "
        "Fix any issues and return the final polished version."
    ),
    expected_output="A polished, publication-ready final article.",
    agent=editor,
)


# ---- CREW: orchestrate the tasks in a pipeline ----
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.sequential,   # pipeline: one after another
    verbose=True,
)

# ---- Run it ----
result = crew.kickoff()
print("\n=== FINAL ARTICLE ===\n")
print(result)
```

This is a **sequential pipeline crew**: researcher completes first, hands to writer, who hands to editor.

## Building the Same System with LangGraph (Orchestrator)

LangGraph gives you more control over the graph/states. Here's a lightweight orchestrator pattern:

```python
from typing import TypedDict
from langgraph.graph import StateGraph, END
from openai import OpenAI

client = OpenAI()


class State(TypedDict):
    user_request: str
    research_notes: str
    draft: str
    final: str
    route: str


def research_node(state: State):
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a researcher. Produce factual bullet points."},
            {"role": "user", "content": state["user_request"]}
        ]
    )
    return {"research_notes": resp.choices[0].message.content}


def writer_node(state: State):
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a writer. Turn research into a draft article."},
            {"role": "user", "content": state["research_notes"]}
        ]
    )
    return {"draft": resp.choices[0].message.content}


def editor_node(state: State):
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an editor. Polish and finalize the draft."},
            {"role": "user", "content": state["draft"]}
        ]
    )
    return {"final": resp.choices[0].message.content}


# Build the graph
graph = StateGraph(State)
graph.add_node("research", research_node)
graph.add_node("write", writer_node)
graph.add_node("edit", editor_node)

graph.set_entry_point("research")
graph.add_edge("research", "write")
graph.add_edge("write", "edit")
graph.add_edge("edit", END)

app = graph.compile()

# Run
init_state = {"user_request": "Explain how to build an AI automation agency."}
out = app.invoke(init_state)
print(out["final"])
```

## Designing Role-Based Agents

The quality of a multi-agent system depends on well-designed roles. For each agent define:

| Element | Purpose | Example |
|---|---|---|
| **Role** | What specialist is this | "Market Researcher" |
| **Goal** | What is it trying to achieve | "Find accurate data" |
| **Backstory** | Personality + context | "10 years in research..." |
| **Tools** | What it can access | Search, database, calculator |
| **Constraints** | What it must NOT do | "Do not invent facts" |
| **Handoff** | What it passes to the next agent | "Bullet points" |

## Common Multi-Agent Teams You'll Build

| Team | Agents | Output |
|---|---|---|
| Content | Researcher → Writer → Editor | Polished article |
| Marketing | Strategist → Copywriter → Designer-assist → Reviewer | Campaign assets |
| Support | Triage → FAQ-Router → Escalation-Drafter | Support resolution |
| Sales | Prospector → Researcher → Email-Drafter → Reviewer | Outreach emails |
| Data | Extractor → Analyst → Report-Writer | Analytical report |

## Live Session Exercises

### Exercise 1: Run the CrewAI Content Team
Set up CrewAI with the Researcher → Writer → Editor crew. Run it on a topic of your choice and inspect the intermediate outputs.

### Exercise 2: Add a Reviewer with a Checklist
Add a 4th "Quality Reviewer" agent that checks the final article against a rubric (factual accuracy, structure, tone, length) and either approves or sends it back for fixes.

### Exercise 3: Orchestrator Pattern
Build an orchestrator agent that decides, based on the user request, which specialist agents to dispatch (researcher, calculator, translator). Test it routes correctly.

### Exercise 4: Compare Frameworks
Build a simple 2-agent pipeline in BOTH CrewAI and LangGraph. Note the differences in setup, control, and debugging between them.

## Discussion Topics

1. What are the reliability risks of multi-agent systems, and how do you add error handling between handoffs?
2. When does a multi-agent system become over-engineered compared to a single agent?
3. How do you ensure one agent's mistakes don't silently propagate downstream (e.g., a hallucinated fact goes into the final published article)?
4. How would you add a human-approval step inside a multi-agent workflow?
5. What's the cost/latency tradeoff of 3 sequential LLM calls versus one comprehensive agent?

## Key Takeaways

- Multi-agent systems assign specialized roles to improve quality and clarity
- Common patterns: orchestrator/supervisor, pipeline, debate/critique, hierarchical team
- CrewAI makes role-based crews (Agent/Task/Crew) easy; LangGraph gives fine-grained control over state and routing
- Each agent needs a clear role, goal, backstory, tools, constraints, and handoff format
- Start with one agent; only add more when specialization or review genuinely helps
- Add review/quality gates between agents to catch errors before they propagate
- Human approval breaks are essential for high-stakes actions

## Practice Challenge

**Objective:** Build a production-style multi-agent system.

1. Complete all four exercises
2. Build a **client onboarding assistant** multi-agent team:
   - Agent 1 "Intake" — extracts client requirements from a brief
   - Agent 2 "QCA/Planner" — turns requirements into a task plan
   - Agent 3 "Reviewer" — checks the plan for completeness and flags missing info
   - Orchestrator — coordinates and produces the final onboarding plan document
3. Use either CrewAI or LangGraph (your choice)
4. Add a "human approval" gate on the final plan before it's considered complete
5. Run it on a realistic client brief and print all agent outputs
6. Prepare a live demo and one question about orchestration pitfalls

**Deliverable:** The working multi-agent onboarding system, a full run on a realistic brief showing each agent's output, and a one-page comparison of CrewAI vs LangGraph for this use case.

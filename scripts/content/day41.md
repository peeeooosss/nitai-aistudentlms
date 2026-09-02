# AI Agent Architecture

## Learning Objectives

- Understand what an AI agent is and how it differs from a simple chatbot
- Learn the core agent loop: perceive → think → act → observe
- Master the key components: tools, memory, planning, and reasoning
- Explore agentic frameworks (LangChain, OpenAI function calling, etc.)
- Prepare for the live interactive session on agent architecture

## Live Session Overview

This is a **LIVE_INTERACTIVE** day:

1. **Recap** — support automation and reporting foundation (15 min)
2. **Lecture/Demo** — the agent loop and tool use (40 min)
3. **Hands-on exercises** — build your first agent (60 min)
4. **Discussion** — when to use agents vs. rigid automation (20 min)
5. **Q&A** (15 min)

## From Chatbot to Agent: What Changed

So far you've built chatbots and automations that follow fixed flows. An **AI agent** is fundamentally different: it is an AI that can **decide what to do next** by using tools, and it can iterate over multiple steps to accomplish a goal.

```
CHATBOT:  User -> AI -> Response
          (single step, no action)

AGENT:    Goal -> AI thinks -> uses TOOL -> observes result 
          -> thinks again -> ... until goal accomplished
          (multi-step, action-taking, goal-directed)
```

The defining characteristics of an agent:
1. **Autonomy** — it decides the sequence of actions, not a fixed script
2. **Tool use** — it can call functions/APIs to interact with the world
3. **Iteration** — it loops, re-evaluating after each action
4. **Goal-orientation** — it keeps going until the objective is met

## The Agent Loop (ReAct Pattern)

The most influential agent architecture is **ReAct** (Reason + Act). The agent alternates between reasoning and acting:

```
┌─────────────────────────────────────────┐
│              AGENT LOOP                 │
│                                         │
│  1. THINK (Reasoning)                   │
│     "What is the user's goal?"          │
│     "What do I need to find out?"       │
│  2. DECIDE (Which tool? What input?)    │
│  3. ACT (Call the tool / take action)   │
│  4. OBSERVE (Read the tool's output)    │
│     "Now what do I know?"               │
│  └──→ repeat until goal met             │
│                                         │
│  When goal met: produce final answer    │
└─────────────────────────────────────────┘
```

### A Minimal Agent in Python

Here's the simplest possible agent that can call tools, using OpenAI function calling:

```python
import json
from openai import OpenAI

client = OpenAI()

# ---- Define the tools the agent can use ----
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"}
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calc",
            "description": "Perform a basic arithmetic calculation",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "Math expression like '2+2*3'"}
                },
                "required": ["expression"]
            }
        }
    },
]


# ---- The actual tool implementations ----
def get_weather(city: str) -> str:
    # Mock implementation; in production call a weather API
    return f"The weather in {city} is 18°C and sunny."


def calc(expression: str) -> str:
    # SAFE evaluation (never use eval on untrusted input in production)
    import ast
    try:
        # Simple safe evaluator for arithmetic
        return str(eval(expression, {"__builtins__": {}}, {}))
    except Exception as e:
        return f"Error: {e}"


TOOL_IMPL = {
    "get_weather": lambda args: get_weather(args["city"]),
    "calc": lambda args: calc(args["expression"]),
}


# ---- The agent loop ----
def run_agent(user_query: str, max_steps: int = 5) -> str:
    messages = [{"role": "user", "content": user_query}]
    
    for step in range(max_steps):
        # 1. Ask the model what to do (THINK + DECIDE)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        
        msg = response.choices[0].message
        
        # If the model wants to call tools (ACT + OBSERVE)
        if msg.tool_calls:
            messages.append(msg)  # remember the decision
            
            for tool_call in msg.tool_calls:
                fn_name = tool_call.function.name
                fn_args = json.loads(tool_call.function.arguments)
                print(f"  [AGENT] calling {fn_name}{fn_args}")
                
                # Execute the tool
                result = TOOL_IMPL[fn_name](fn_args)
                print(f"  [TOOL] -> {result}")
                
                # Feed the observation back to the model
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": result,
                })
            continue  # loop again to let the model react to observations
        
        # No tool calls -> the agent is done, return final answer
        return msg.content
    
    return "I couldn't complete the task within the step limit."


# ---- Test the agent ----
print("Agent asks: What's the weather in Paris and what is 15% of 240?")
answer = run_agent("What's the weather in Paris and what is 15% of 240?")
print(f"\nFinal answer: {answer}")
```

This is the fundamental pattern. The model reasons, decides to call a tool, observes the result, and keeps going until it can answer.

## Building Blocks of Agent Architecture

### 1. Tools (Function Calling)
Tools are the agent's "hands." Each tool has:
- A **name**
- A **description** (tells the model when to use it)
- A **parameter schema** (what inputs it needs)

The model chooses tools based on the description. Good tool descriptions dramatically improve agent reliability.

### 2. Memory
Agents need to remember across steps and conversations:
- **Working memory:** the current conversation history in context
- **Long-term memory:** stored facts or vector search over past interactions
- **Scratchpad:** notes the agent writes to itself during a complex task

### 3. Planning
Complex goals need planning. Agents can:
- Decompose a goal into sub-steps
- Re-plan when things go wrong
- Use structured reasoning (think-then-act)

### 4. Reasoning & the System Prompt
The system prompt shapes how the agent thinks. A well-crafted agent prompt includes its **persona, goal, constraints, available tools, and operating rules**.

```python
AGENT_SYSTEM_PROMPT = """
You are an operations assistant that helps a small business run smoothly.
You can use tools to look up information and perform tasks.

Operating rules:
- Always confirm your understanding of the goal before acting
- Use tools to get real data rather than guessing
- If a tool returns an error, try an alternative approach
- If you cannot complete the goal, clearly state what you could do and
  what you're missing
- After completing the goal, give a concise summary of what you did
"""
```

## Agent Frameworks

You don't have to build agents from scratch. Here are the main frameworks:

| Framework | Language | Style | Best For |
|---|---|---|---|
| **LangChain / LangGraph** | Python | Graph-based orchestration | Complex, stateful multi-step agents |
| **OpenAI Function Calling** | Any | Native API | Simple to moderate agents |
| **Claude (Anthropic) tool use** | Python/TypeScript | Native API | Careful, long-context agents |
| **AutoGen** | Python | Multi-agent conversation | Multi-agent systems (Day 42) |
| **CrewAI** | Python | Role-based crews | Multi-agent role-play tasks |
| **n8n/No-code agents** | Visual | Node-based | Client-friendly, maintainable agents |

## When to Use an Agent vs. Fixed Automation

This is a crucial judgment call as an agency builder:

| Use Fixed Automation | Use an Agent |
|---|---|
| Well-defined, repeatable steps | Variable, unpredictable tasks |
| Deterministic output required | Multiple valid approaches to goal |
| Compliance/audit needs exact steps | Tasks need adaptation |
| Small scope | Complex, multi-step goals |
| Cost sensitivity | Willing to pay for flexibility |

**Rule of thumb:** If you can describe the exact steps, automate deterministically. If the "how" is unknown and requires judgment, use an agent.

## Live Session Exercises

### Exercise 1: Build Your First Agent
Implement the minimal agent above with at least 3 tools (e.g., `get_weather`, `get_stock_price`, `calc`, `translate_text`, `current_datetime`).

### Exercise 2: Add a Tool
Write an implementation for a realistic business tool — e.g., `lookup_customer(email) -> order_history` from a mock database. Add it to your agent and test that the agent calls it correctly.

### Exercise 3: Constrain the Agent
Modify the system prompt to enforce a rule: "You must use the `lookup_customer` tool before answering any question about a customer." Test whether the agent honors the constraint.

### Exercise 4: Handle the Not-Sure Case
Design a tool `get_manual_confirmation(action_details)` that returns "requires_human_approval". Make the agent use it for high-risk actions (e.g., deleting data), and observe how the agent responds.

## Discussion Topics

1. When would you recommend a client use a full agent vs. a fixed-workflow automation? Give a concrete real example of each.
2. What are the risks of letting an agent act autonomously (e.g., posting, emailing, deleting)? Where must you put guardrails?
3. How do you keep an agent from going in circles or burning API budget on endless loops?
4. What's the difference between "tool use" and "true agency"? At what point is something an agent?
5. How would you architect an agent that must combine data from multiple tools (e.g., CRM + billing + calendar) to answer "what should I do next?"

## Key Takeaways

- An agent differs from a chatbot by being goal-directed, tool-using, and iterative
- The ReAct loop (Think → Decide → Act → Observe) is the core agent pattern
- Tools are defined with name, description, and parameter schema so the model knows when/how to use them
- Function calling lets you feed tool observations back into the conversation
- Always set a max step limit to prevent runaway loops
- Choose agents for flexible, goal-oriented tasks; fixed automation for deterministic ones
- Set hard constraints (system prompt rules + approval tools) around high-risk agent actions

## Practice Challenge

**Objective:** Build a reusable agent with multiple tools and guardrails.

1. Complete all four exercises
2. Build an "operations agent" that can complete a multi-step task end-to-end, e.g.: "Check how many open invoices are over 30 days, identify the oldest one, and draft a reminder email to that customer."
3. Give it the tools it needs (customer DB lookup, invoice status, email drafting)
4. Add a guardrail: any action that sends an email must first call `get_manual_confirmation` (returns "pending approval")
5. Test the full flow and print the agent's tool-call trace so you can see each Think/Act/Observe step
6. Prepare to demo this in the live session, and bring one question about agent architecture to discuss

**Deliverable:** `agent.py` (the operations agent with tools + guardrails), a printed trace of a successful run, and one discussion question.

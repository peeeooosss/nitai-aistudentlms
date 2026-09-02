# Tool-Using AI Agents

## Learning Objectives

- Understand how AI agents use tools to interact with the world and external systems
- Master function calling / tool use API patterns
- Build agents that chain multiple tools to complete complex tasks
- Design robust tool schemas and handle errors gracefully
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material below, complete the self-assessment and practice problems, and ensure you can answer everything before the quiz.

## Recap: Tools Are the Agent's Interface to the World

From Day 41, an agent's "hands" are its **tools** — functions it can call to access databases, APIs, perform calculations, send messages, or read files. Without tools, an agent is just a text predictor. With tools, it can take real actions.

Tool use is the single most important capability that turns a chatbot into an agent, so it deserves a thorough quiz day.

## The Tool-Use API Pattern (Function Calling)

Modern LLM APIs (OpenAI, Anthropic, Gemini) support **function calling**. Here's the mental model:

```
1. You define tools (name, description, parameter schema)
2. The model reads the user query + tool definitions
3. The model decides if it needs a tool and, if so, WHICH one with WHAT arguments
4. The model returns a "tool call request" (name + JSON arguments) — NOT the result
5. YOUR CODE executes the actual tool
6. You feed the tool's result back to the model
7. The model produces the final answer
```

**Key insight: The model does NOT execute tools — it only decides to request them. Your code does the execution.** This is important for security and control.

## Anatomy of a Tool Definition

```python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_documents",          # unique, snake_case
            "description": "Search an internal knowledge base for documents matching a query. Use this when the user asks about company policies, FAQ, or documentation.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query text"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Max number of results",
                        "default": 5
                    }
                },
                "required": ["query"]           # which params are mandatory
            }
        }
    }
]
```

### Writing Good Tool Definitions
- **Name:** descriptive, unique, snake_case
- **Description:** tells the model WHEN to use it ("Use this when...") — this is what drives correct selection
- **Parameter descriptions:** the model generates these args, so be specific about format and units
- **required:** only list params that are truly required; give defaults for the rest

## Example: A Multi-Tool Agent

Let's build an agent with several realistic business tools to review the full pattern:

```python
import json
from openai import OpenAI

client = OpenAI()


def search_kb(query: str, limit: int = 3) -> str:
    """Mock knowledge-base search."""
    kb = {
        "refund": "Refunds are issued within 5-7 business days to the original payment method.",
        "trial": "Free trial is 14 days with all features enabled.",
        "cancel": "You can cancel anytime; access continues to end of billing period.",
        "invoice": "Invoices are available under Billing > Invoices.",
    }
    results = [v for k, v in kb.items() if query.lower() in k.lower()]
    return json.dumps(results[:limit]) if results else "No matching documents."


def get_customer_plan(email: str) -> str:
    """Look up a customer's subscription plan from a mock database."""
    db = {
        "sarah@acme.com": {"plan": "enterprise", "seats": 25, "status": "active"},
        "bob@widgets.io": {"plan": "starter", "seats": 5, "status": "active"},
    }
    return json.dumps(db.get(email, {"error": "customer not found"}))


def get_current_time() -> str:
    from datetime import datetime
    return datetime.now().isoformat()


TOOLS = [
    {"type": "function", "function": {
        "name": "search_kb",
        "description": "Search the company knowledge base (refunds, trials, cancellation, invoices).",
        "parameters": {"type": "object", "properties": {
            "query": {"type": "string", "description": "Search text"},
            "limit": {"type": "integer", "default": 3}
        }, "required": ["query"]}
    }},
    {"type": "function", "function": {
        "name": "get_customer_plan",
        "description": "Look up a customer's subscription plan by email.",
        "parameters": {"type": "object", "properties": {
            "email": {"type": "string", "description": "Customer email"}
        }, "required": ["email"]}
    }},
    {"type": "function", "function": {
        "name": "get_current_time",
        "description": "Get the current date and time.",
        "parameters": {"type": "object", "properties": {}}
    }},
]


TOOL_IMPL = {
    "search_kb": lambda args: search_kb(args.get("query", ""), args.get("limit", 3)),
    "get_customer_plan": lambda args: get_customer_plan(args["email"]),
    "get_current_time": lambda args: get_current_time(),
}


def run_agent(user_query: str, max_steps=6):
    messages = [{"role": "user", "content": user_query}]
    for _ in range(max_steps):
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        msg = resp.choices[0].message
        
        if msg.tool_calls:
            messages.append(msg)
            for tc in msg.tool_calls:
                name = tc.function.name
                args = json.loads(tc.function.arguments or "{}")
                print(f"  [AGENT] -> {name}({args})")
                result = TOOL_IMPL[name](args)
                print(f"  [TOOL]  <- {result}")
                messages.append({
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": result,
                })
            continue
        return msg.content
    return "Reached step limit."
```

## Multi-Tool Chaining: The Real Power

The true power is when the agent chains tools to solve a composite problem that requires multiple pieces of information:

```python
# The agent might need BOTH the KB answer AND the customer plan:
query = "What's the refund policy, and what plan is sarah@acme.com on?"
answer = run_agent(query)
print(answer)
```

Trace shows the agent calling `search_kb` and `get_customer_plan`, then combining results. That's tool chaining.

## Robust Tool Design & Error Handling

Production agents fail. Design tools defensively:

1. **Never trust the model's arguments** — validate types and bounds
2. **Return errors as structured results**, not exceptions that crash the loop
3. **Handle the "not found" case** — return a clear message the agent can reason about
4. **Time out** external calls — don't hang the agent forever
5. **Log everything** for debugging

```python
def safe_tool_call(func, args: dict) -> str:
    """Wrap a tool in validation + error handling."""
    try:
        if not isinstance(args, dict):
            return json.dumps({"error": "arguments must be an object"})
        result = func(args)
        return json.dumps(result) if not isinstance(result, str) else result
    except KeyError as e:
        return json.dumps({"error": f"missing required argument: {e}"})
    except Exception as e:
        return json.dumps({"error": f"tool failed: {str(e)}"})
```

## When Tools Are Dangerous: Guardrails

Some tools have side effects (send email, delete records, post content). You must gate them:

1. **Approval tools** — high-risk actions call a `request_approval` tool instead of executing directly
2. **Whitelist** — only allow tools to touch safe, scoped resources
3. **Read-only by default** — expose destructive capabilities only when explicitly needed
4. **Rate limiting** — prevent abuse or runaway loops
5. **Audit logging** — record every tool invocation

```python
def send_email_tool(recipient, body):
    # In production this would need approval gate
    if not recipient.endswith("@client.com"):
        return json.dumps({"error": "recipient domain not authorized"})
    # ... send
    return json.dumps({"status": "sent"})
```

## Self-Assessment Questions

1. What is the fundamental difference between a chatbot and a tool-using agent?
2. In function calling, does the model execute the tool or just request it? Who executes it?
3. List the four parts of a tool definition (name, description, parameters, required).
4. Why is the tool's `description` so important for correct tool selection?
5. What is "tool chaining" and why is it powerful? Give an example.
6. What does `tool_choice="auto"` do? What other values can it take?
7. Why must you validate/trust none of the model's tool arguments blindly?
8. How should a tool communicate "not found" or failure to the agent?
9. What three guardrails would you put around a tool that sends emails?
10. What is the "tool loop" and why do you need a max-step limit?

## Practice Problems

### Problem 1
Write the full tool definition for a `get_order_status(order_id)` tool, including a good description and parameter schema.

### Problem 2
Given a tool that can `book_meeting(participants, time_range)`, describe three guardrails you'd add and how you'd implement them.

### Problem 3
Design a tool that returns errors gracefully. Show the JSON it would return for: (a) a missing required arg, (b) a not-found record, (c) an unhandled exception.

### Problem 4
Explain the flow of a single function-call round trip in the `run_agent` loop: what messages are appended, in what order, and why.

### Problem 5
You need an agent to "Summarize the current state of the deal with Bob from Widgets and draft a follow-up email." Which 3 tools would you give it, and in what order would it likely call them?

## Key Takeaways

- Tools are the agent's interface to the world; function calling is the standard pattern
- The model requests tool calls; your code executes them and returns results
- A tool definition = name + description + parameter schema (+ required)
- Write descriptions that tell the model WHEN/hOW to use each tool
- Tool chaining lets agents solve multi-step, composite problems
- Handle errors gracefully — return structured errors, validate args, never trust the model blindly
- Add guardrails (approval, whitelist, read-only, rate limits, audit logging) around side-effect tools

## Practice Challenge

**Objective:** Prepare for the quiz and build a guarded multi-tool agent.

1. Answer all 10 self-assessment questions from memory, then check
2. Complete all 5 practice problems
3. Build a `tools_agent.py` that:
   - Has at least 4 tools (search, plan lookup, current time, and one side-effect tool)
   - Uses robust error handling (safe_tool_call wrapper)
   - Has a guardrail on the side-effect tool (e.g., email requires domain whitelist OR approval)
   - Logs every tool call to a JSONL file
4. Demonstrate tool chaining with a multi-part query requiring 2+ tools
5. Test the error paths: missing arg, not-found, and unhandled exception

**Deliverable:** Written answers to all questions/problems, plus a working `tools_agent.py` with tool chaining, error handling, guardrails, and logging.

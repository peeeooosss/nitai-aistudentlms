# Building AI Chatbots

## Learning Objectives

- Understand the architecture of modern AI chatbots (LLM + prompt + memory + tools)
- Choose between visual chatbot builders and programmatic chatbots
- Design conversational flows that handle real user intents
- Implement a working AI chatbot in Python
- Prepare for the live interactive session on chatbots

## Live Session Overview

This is a **LIVE_INTERACTIVE** day. The structure for today:

1. **Recap** — review fundamentals (15 min)
2. **Lecture/Demo** — build a chatbot live (40 min)
3. **Hands-on exercises** — build your own chatbot (60 min)
4. **Discussion topics** — chat about real-world applications (20 min)
5. **Q&A and next steps** (15 min)

Come prepared having read this material and having your OpenAI API key ready.

## Recap: Where We Are

In Days 31-32 you learned what AI automation is and how to map workflows. Today we apply those skills to the most common automation deliverable: **an AI chatbot**. Chatbots are the gateway product for most automation agencies because:

- They solve a visible, painful problem (support volume, lead hours)
- The value is easy to demonstrate to clients
- They are relatively quick to build and deploy
- They naturally lead to larger automation contracts

## Chatbot Architecture

A modern LLM-powered chatbot is not a decision tree. It is built from four core components:

```
        USER MESSAGE
             │
             ▼
     ┌─────────────┐
     │ PROMPTS     │  System prompt (persona, rules, constraints)
     │ & PERSONA   │
     └─────────────┘
             │
             ▼
     ┌─────────────┐
     │ LLM ENGINE  │  GPT-4o / Claude / Gemini
     └─────────────┘
             │
             ▼
     ┌─────────────┐
     │ MEMORY      │  Conversation history, vector memory
     └─────────────┘
             │
             ▼
     ┌─────────────┐
     │ TOOLS       │  API calls, database lookups, actions
     └─────────────┘
             │
             ▼
        RESPONSE
```

### 1. The System Prompt (Persona)

This defines who the bot is and how it behaves. It is the most important part you control.

```python
SYSTEM_PROMPT = """
You are "Ava," the friendly AI assistant for BrightTech Solutions.
You help customers with:
- Product information and features
- Troubleshooting common issues
- Billing and account questions
- Finding relevant help articles

Rules:
- Always be helpful, concise, and professional
- If you don't know something, say so honestly and offer to connect
  the customer with a human agent
- Ask clarifying questions when the request is ambiguous
- Never invent product features — stick to what you know
- Match the customer's language; if they write in Spanish, respond in Spanish

Escalation: If the customer is frustrated or requests a human, 
politely offer to transfer them to a support representative.
"""
```

### 2. The LLM Engine

Choose your model based on the tradeoff between cost, speed, and capability:

| Model | Strengths | Ideal Use |
|---|---|---|
| GPT-4o | Strong reasoning, multimodal | Complex support, general purpose |
| GPT-4o-mini | Cheap, fast, good quality | High-volume basic support |
| Claude (Haiku/Sonnet) | Long context, careful reasoning | Document-heavy conversations |
| Gemini | Multimodal, Google ecosystem | Media-heavy interactions |

### 3. Memory

Chatbots need context. There are three types of memory:

- **Short-term memory:** The conversation history included in each request
- **Long-term memory:** Stored facts about the user (their plan, preferences)
- **Vector memory:** Semantic search over a knowledge base

```python
def build_conversation_context(history: list[dict]) -> list[dict]:
    """Convert stored history into the messages format the API expects."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    # Include last N turns to stay under token limits
    for turn in history[-10:]:
        messages.append({
            "role": turn["role"],   # "user" or "assistant"
            "content": turn["content"]
        })
    return messages
```

### 4. Tools

Tools let the chatbot perform actions — query a database, book an appointment, look up tracking info. This is the "agent" capability we will expand in later days. For a simple chatbot, tools are optional but powerful.

## Programmatic Chatbot: Complete Example

Here is a working single-file chatbot you can run:

```python
import json
import time
from openai import OpenAI

client = OpenAI()

SYSTEM_PROMPT = """
You are "Ava," the support assistant for BrightTech Solutions, 
a SaaS company selling team collaboration software.

Products:
- BrightChat (team messaging) — $12/user/month
- BrightBoard (project management) — $8/user/month
- BrightMeet (video conferencing) — included with any plan

FAQ knowledge:
- Free trial: 14 days, full features
- Billing: automatic monthly billing, cancel anytime
- Security: SOC 2 Type II certified
- Support hours: 24/7 for enterprise, 9-5 EST for others
"""

# Simple in-memory knowledge base for lookups
KNOWLEDGE_BASE = {
    "trial": "Our free trial lasts 14 days and includes all features.",
    "cancel": "You can cancel anytime from Settings > Billing. Your access continues until the end of the billing period.",
    "security": "We are SOC 2 Type II certified and encrypt data at rest and in transit.",
    "support": "Enterprise customers get 24/7 support. Others get support 9-5 EST."
}


def retrieve_knowledge(query: str) -> str:
    """Basic keyword-based retrieval. In production, use vector search."""
    query_lower = query.lower()
    for keyword, answer in KNOWLEDGE_BASE.items():
        if keyword in query_lower:
            return answer
    return "I don't have a specific article on that, but I can help further."


def chat():
    history = []
    print("Ava: Hi! I'm Ava from BrightTech. How can I help you today?")
    
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ("quit", "exit", "bye"):
            print("Ava: Thanks for chatting! Have a great day.")
            break
        
        # Retrieve knowledge to inject as context
        knowledge = retrieve_knowledge(user_input)
        
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": f"Relevant knowledge: {knowledge}"}
        ]
        # Include conversation history (last 6 turns)
        messages.extend(history[-6:])
        messages.append({"role": "user", "content": user_input})
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.4
        )
        
        reply = response.choices[0].message.content
        print(f"Ava: {reply}")
        
        # Update history
        history.append({"role": "user", "content": user_input})
        history.append({"role": "assistant", "content": reply})


if __name__ == "__main__":
    chat()
```

## Visual Chatbot Builders

For client work, you will often use visual builders instead of coding:

### Voiceflow
- Drag-and-drop conversation designer
- Built-in LLM steps for AI-powered responses
- Channels: website widget, WhatsApp, Facebook Messenger, SMS, etc.
- Versioning and analytics built in

### Botpress
- Open-source, self-hostable
- More developer-friendly with code actions
- Good for enterprise clients wanting data control

### When to Choose Which

```
Need a client-facing website widget fast?
  ├─ YES → Voiceflow
  └─ NO → Need to self-host for data privacy?
              ├─ YES → Botpress
              └─ NO → Need full customization/programmatic control?
                          ├─ YES → Code (Python + API)
                          └─ NO → Voiceflow
```

## Live Session Exercises

### Exercise 1: Build Your First Chatbot
Build the Python chatbot above (or set up Voiceflow) with a system prompt for a business you care about. Make it answer at least 3 distinct types of questions correctly.

### Exercise 2: Add Memory
Modify the chatbot to remember the user's name across turns and use it in responses. Add a `remember_user(name)` feature.

### Exercise 3: Add a Tool
Add one "tool" capability — for example, a function that looks up order status from a mock database given an order ID, triggered when the user asks about their order.

### Exercise 4: Improve the Prompt
Write a system prompt that includes:
- A clear persona
- Voice and tone guidelines
- Boundaries (what the bot will NOT do)
- Escalation logic
- Fact-accuracy rules to prevent hallucination

## Discussion Topics

1. What are the most common ways chatbots fail in production? (Think about hallucination, ambiguity, user frustration, and graceful escalation.)
2. When is a simple FAQ bot better than an AI bot?
3. How do you measure chatbot success? (Deflection rate, CSAT, resolution rate, cost per conversation)
4. What are the ethical considerations of a chatbot pretending to be human?
5. Where does the "human in the loop" belong in a support chatbot?

## Key Takeaways

- A modern AI chatbot = system prompt (persona) + LLM engine + memory + optional tools
- The system prompt is your primary design tool — invest time in it
- Inject relevant knowledge into the context to reduce hallucination
- Choose between visual builders (Voiceflow) and code based on client needs (speed vs. control vs. privacy)
- Chatbots are the natural entry point product for an automation agency

## Practice Challenge

**Objective:** Deploy a usable chatbot.

1. Complete all four exercises above
2. Pick one of the following to finish:
   - Deploy the chatbot as a simple web page using Gradio (`pip install gradio`) so you can share a URL
   - Or set up a Voiceflow agent and test it in the preview chat
3. Write a short "handoff plan": how you would hand this chatbot to a non-technical client, including how to update the knowledge base and monitor performance
4. Prepare one real-world scenario (with sample user messages) to demo in the live session

**Deliverable:** A working chatbot you can demo, plus exercises 2-4 completed and a client handoff plan.

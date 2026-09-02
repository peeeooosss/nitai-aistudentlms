# Agent Memory & Context

## Learning Objectives

- Understand the different types of memory in AI agents: short-term, long-term, and working memory
- Learn how context windows and token limits constrain agent memory
- Implement vector databases for semantic (long-term) memory
- Design memory systems that persist facts, conversations, and state across sessions
- Understand the tradeoffs between context length, cost, and relevance

## Why Memory Is the Key to Useful Agents

A major limitation of LLMs is that they are **stateless** — each request is independent. Without memory, an agent forgets everything between calls, cannot recall past conversations, and cannot build on previous work.

Memory is what makes an agent feel coherent and useful. It allows an agent to:
- Remember the user's name, preferences, and history
- Reference earlier parts of a long task or conversation
- Retrieve relevant knowledge on demand
- Maintain state across multiple sessions or days

## The Three Types of Memory

### 1. Short-Term (Working) Memory
The conversation history included in the current context window. This is the most immediate and is typically handled by passing the recent message history with each API call.

**Limitations:** bounded by the context window (tokens); old turns get truncated.

```python
# Working memory = recent conversation turns in context
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    # ... past turns ...
    {"role": "user", "content": "current question"}
]

# Keep only the last N turns to fit in the context window
def trim_history(history: list[dict], max_turns: int = 15):
    return history[-max_turns:]
```

### 2. Long-Term (Semantic) Memory
Permanent storage of facts and accumulated knowledge, usually in a vector database. It persists across sessions. When the agent needs relevant info, it **retrieves** the most relevant memories via semantic search.

### 3. Episodic / Working State Memory
Recall of specific past events or the current state of a task — "I already emailed this customer last Tuesday", "we are on step 3 of 5".

## Vector Databases for Memory

Vector databases store embeddings (numbers) and enable **semantic search** — finding content similar in meaning, not just matching keywords.

### The Retrieval Pipeline

```
1. SPLIT text into chunks
2. EMBED each chunk (convert to vector)
3. STORE vectors in a vector DB
4. On query: embed the query
5. SEARCH for the closest vectors (similarity)
6. INJECT top results into the prompt as context
```

### Popular Vector Databases

| DB | Hosting | Best For |
|---|---|---|
| **ChromaDB** | Local/embedded | Quick prototyping, learning |
| **Pinecone** | Cloud/managed | Production, large scale |
| **Weaviate** | Self-host or cloud | Advanced features |
| **Qdrant** | Self-host or cloud | High performance |
| **FAISS** | Local library | Fast similarity search |
| **pgvector** | PostgreSQL extension | When you already use Postgres |

## Hands-On: Long-Term Memory with ChromaDB

```python
import chromadb
from openai import OpenAI

client = OpenAI()
chroma = chromadb.Client()


# ---- Create a persistent collection (memory store) ----
collection = chroma.get_or_create_collection("agent_memory")


def embed_text(text: str) -> list[float]:
    resp = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return resp.data[0].embedding


def store_memory(text: str, memory_id: str, metadata: dict = None):
    """Save a fact/insight into long-term memory."""
    collection.upsert(
        ids=[memory_id],
        documents=[text],
        metadatas=[metadata or {}],
        embeddings=[embed_text(text)],
    )


def recall(query: str, n: int = 3) -> list[dict]:
    """Retrieve the n most relevant memories."""
    results = collection.query(
        query_embeddings=[embed_text(query)],
        n_results=n,
    )
    # Return documents + metadata
    return [
        {"text": doc, "metadata": meta}
        for doc, meta in zip(results["documents"][0], results["metadatas"][0])
    ]


# ---- Example usage ----
# Agent learns facts about various customers
store_memory(
    "Sarah from Acme Corp prefers email over phone. She is the decision-maker. Budget around $5k.",
    "mem_customer_sarah",
    metadata={"type": "customer", "key": "sarah"},
)
store_memory(
    "The client's Q3 launch was delayed to October due to supply chain issues.",
    "mem_q3_launch",
    metadata={"type": "project", "key": "q3"},
)
store_memory(
    "Our support SLA is 4 business hours for standard tickets.",
    "mem_sla",
    metadata={"type": "policy", "key": "sla"},
)

# Later, a new session: the agent recalls relevant memory
hits = recall("How should I communicate with Sarah?")
for h in hits:
    print(f"  - {h['text']}  [{h['metadata']}]")
```

## Injecting Memory into Agent Prompts

The key skill is combining **recalled memory** with the current task:

```python
def build_prompt_with_memory(user_message: str) -> list[dict]:
    # 1. Recall relevant long-term memory
    relevant = recall(user_message)
    
    # 2. Format memories as context
    memory_block = "\n\n".join(f"[REMEMBERED] {m['text']}" for m in relevant)
    
    # 3. Build the full message with system + memory + user
    return [
        {
            "role": "system",
            "content": "You are an assistant with access to remembered context. "
                       "Use it to give better, more consistent answers. "
                       f"Remembered context:\n{memory_block or 'No relevant memory found.'}"
        },
        {"role": "user", "content": user_message}
    ]


def chat_with_memory(user_message: str) -> str:
    msgs = build_prompt_with_memory(user_message)
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=msgs,
        temperature=0.4,
    )
    return resp.choices[0].message.content


# Test
print(chat_with_memory("What is our standard support response time?"))
```

## Context Window Optimization

The context window is finite. You must decide **what to include** to maximize relevance while controlling cost and latency.

### Techniques

1. **Trimming** — keep only recent turns, drop old ones
2. **Summarization** — compress old turns into a short summary
3. **Retrieval** — instead of injecting everything, fetch only relevant chunks (RAG)
4. **Token budgeting** — reserve tokens for the new question and the response

```python
def manage_context(history, new_message, model_max_tokens, reserve=500):
    """Rough token budgeting: keep history but cap it."""
    # Estimate tokens (rough: ~4 chars per token)
    available = model_max_tokens - reserve
    budget_chars = available * 4
    kept = []
    used = len(new_message)
    for turn in reversed(history):
        size = len(turn["content"])
        if used + size > budget_chars:
            break
        kept.insert(0, turn)
        used += size
    return kept
```

## RAG (Retrieval-Augmented Generation)

RAG is the combination of retrieval + generation that we touched on in Day 35. With a vector memory store, RAG becomes your primary technique for grounding agents in knowledge:

```
User question
     │
     ▼
[Query] ──► [Vector search] ──► top-k relevant chunks
     │                              │
     └──────────┬───────────────────┘
                ▼
        [Build grounded prompt]
                ▼
           [LLM generation]
                ▼
           Grounded answer
```

### Practical Memory Design

```python
class AgentMemory:
    """A practical memory system combining types."""
    
    def __init__(self, collection_name="agent_memory"):
        self.collection = chroma.get_or_create_collection(collection_name)
        self.working_memory: list[dict] = []   # current session turns
        self.session_summary: str = ""          # compressed summary
    
    def add_interaction(self, role: str, content: str):
        self.working_memory.append({"role": role, "content": content})
    
    def store_fact(self, fact: str, key: str):
        store_memory(fact, key)
    
    def build_context(self, user_msg: str, include_recent: int = 10) -> list[dict]:
        # Long-term recall
        relevant = recall(user_msg)
        memory_block = "\n".join(f"[MEM] {m['text']}" for m in relevant)
        
        # Short-term (recent turns) + session summary
        recent_turns = self.working_memory[-include_recent:]
        
        system = {
            "role": "system",
            "content": f"You are an assistant.\nSession context: {self.session_summary}\n"
                       f"Remembered facts:\n{memory_block or 'None'}"
        }
        return [system] + recent_turns + [{"role": "user", "content": user_msg}]
```

## Memory Best Practices

1. **Store full facts, not just recaps** — when something notable happens, persist it
2. **Add metadata & keys** — so you can find/update specific memories
3. **Deduplicate** — avoid storing contradictory or repeated facts; update by key
4. **Set a retention policy** — decide what to forget (and when)
5. **Never store sensitive PII you don't need** — memory is a data-compromise surface
6. **Prune working memory** — keep context tight to control cost and relevance
7. **Refresh stale memories** — a fact from 2 years ago may be outdated

## Key Takeaways

- LLMs are stateless; memory is what makes agents coherent and useful
- Three types: short-term (context), long-term (vector store), episodic/state
- Vector databases enable semantic retrieval of relevant memories on demand
- Inject recalled memory into the prompt grounded in real stored content (RAG)
- Optimize context with trimming, summarization, retrieval, and token budgeting
- Design memory carefully: metadata, deduplication, retention, and privacy

## Practice Challenge

**Objective:** Build an agent with a working memory system.

1. Install ChromaDB: `pip install chromadb`
2. Build an `AgentMemory` class implementing working memory + long-term vector memory
3. Create a "personal assistant" agent that:
   - Remembers the user's name, preferences, and past topics across sessions
   - Recalls relevant memories when asked
   - Maintains a running session summary
4. Demonstrate memory persistence: run it, store facts, close, reopen, and confirm it recalls correctly
5. Add a metadata + retrieval filter (e.g., only recall customer-related memories)
6. Write a short comparison: when to use exact-keyword lookup vs vector semantic search
7. Test that the agent uses stored context to answer better than without memory

**Deliverable:** `agent_memory.py` (AgentMemory + agent), a demonstration that memory persists across sessions, and the written comparison of retrieval approaches.

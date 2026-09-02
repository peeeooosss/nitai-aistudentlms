# Getting Started with Prompt Engineering

## Learning Objectives
- Understand what prompt engineering is and why it matters
- Learn the difference between zero-shot and few-shot prompting
- Master temperature, top-p, and other generation parameters
- Practice writing structured prompts with system instructions

---

## What Is Prompt Engineering?

Prompt engineering is the practice of crafting inputs to AI language models to get desired outputs. It is the most immediately practical AI skill — you can start using it today with no setup, no coding, and free tools.

Why does it matter? The same model can produce wildly different outputs depending on how you ask:

```
Weak prompt:  "Write about dogs"
Better prompt: "Write a 200-word informative paragraph about the history
                of dog domestication, targeting a general audience,
                with a friendly tone"
```

The second prompt specifies length, format, topic scope, audience, and tone. The model has clear constraints to work within.

## Prompt Structure

A well-structured prompt typically has these components:

### 1. Role / Context
Tell the model who it should be and the situation.

```
You are a senior data analyst at a mid-size e-commerce company.
You are presenting quarterly findings to the marketing team.
```

### 2. Task
State exactly what you want, using action verbs.

```
Analyze the following sales data and identify:
- Top 3 product categories by revenue growth
- Any seasonal patterns
- Three actionable recommendations
```

### 3. Input Data
Provide the data or context the model needs.

```
Here is the Q1-Q2 data:
| Month | Electronics | Clothing | Home | Beauty |
|-------|------------|----------|------|--------|
| Jan   | $120k      | $80k     | $45k | $30k   |
| Feb   | $115k      | $75k     | $48k | $35k   |
| Mar   | $140k      | $90k     | $52k | $32k   |
| Apr   | $155k      | $110k    | $55k | $40k   |
| May   | $160k      | $125k    | $50k | $45k   |
| Jun   | $180k      | $130k    | $48k | $42k   |
```

### 4. Output Format
Specify exactly how you want the response structured.

```
Respond in this format:
1. **Growth Leaders:** [category] — [growth %] — [brief reason]
2. **Seasonal Patterns:** [pattern description]
3. **Recommendations:** [3 numbered actionable items]
```

### 5. Constraints and Guardrails
Set boundaries for what the model should and should not do.

```
- Do not make up data points not present in the table
- Use conservative estimates when uncertain
- Keep total response under 300 words
```

## Zero-Shot vs. Few-Shot Prompting

### Zero-Shot
You give the model a task with no examples. The model relies entirely on its pre-trained knowledge.

```
Classify the sentiment of this review as positive, negative, or neutral:

"The battery life is great but the screen is too dim outdoors."

Sentiment:
```

Model output: `Mixed/Neutral`

### Few-Shot
You provide examples of the input-output pattern you want. This dramatically improves consistency and accuracy.

```
Classify the sentiment of each review as positive, negative, or neutral.

Review: "Absolutely love this product! Best purchase I've made all year."
Sentiment: Positive

Review: "Terrible customer service. Took 3 weeks to get a response."
Sentiment: Negative

Review: "It works fine. Nothing special but gets the job done."
Sentiment: Neutral

Review: "The battery life is great but the screen is too dim outdoors."
Sentiment:
```

Model output: `Mixed/Neutral` (but more reliably consistent across similar examples)

### When to Use Which
- **Zero-shot:** Simple, common tasks; when you want quick results
- **Few-shot:** Complex tasks; when you need consistent formatting; when accuracy matters
- **Golden rule:** 3-5 examples is usually the sweet spot. More examples use more tokens (cost) but improve consistency.

## Temperature and Top-P

These parameters control the randomness and creativity of the model's output.

### Temperature (0.0 – 2.0)
Controls how random the output is. Lower = more deterministic, higher = more creative.

```
Temperature 0.0:  "The capital of France is Paris." (always this answer)
Temperature 0.7:  "The capital of France is Paris, a city known for..." (balanced)
Temperature 1.2:  "Paris! The City of Light beckons with..." (creative, varied)
```

**Practical guidelines:**
| Task | Recommended Temperature |
|------|------------------------|
| Code generation | 0.0 – 0.3 |
| Factual Q&A | 0.0 – 0.2 |
| Summarization | 0.3 – 0.5 |
| Creative writing | 0.7 – 1.0 |
| Brainstorming | 0.8 – 1.2 |

### Top-P (Nucleus Sampling)
Controls vocabulary diversity by limiting which tokens are considered. Top-P = 0.9 means only the top 90% most probable tokens are considered.

- **Top-P = 0.1:** Only the most likely tokens (very conservative)
- **Top-P = 0.9:** Broad selection (more diverse)
- **Top-P = 1.0:** All tokens considered (maximum randomness)

**Rule of thumb:** Adjust either temperature or top-p, not both. Changing both can produce unpredictable results.

## System Prompts

System prompts set the model's behavior, personality, and constraints for the entire conversation.

```
System: You are a helpful coding assistant. You write clean, well-commented
Python code. You explain your reasoning before writing code. You always
consider edge cases and error handling. You prefer simplicity over cleverness.

User: Write a function to validate email addresses.

Assistant: I'll write a robust email validator that handles common formats
and edge cases.

import re

def validate_email(email: str) -> dict:
    """Validate an email address and return detailed results."""
    # Basic pattern matching
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    ...
```

System prompts are powerful for:
- Setting consistent tone and style
- Defining boundaries (what not to do)
- Establishing expertise areas
- Enforcing output formats

## Prompt Templates

As you use prompts repeatedly, you will want to templatize them:

```python
def create_analysis_prompt(data, analysis_type, output_format):
    return f"""You are a senior analyst specializing in {analysis_type}.

    Analyze the following data and provide insights:
    {data}

    Respond in this exact format:
    {output_format}

    Rules:
    - Only use data provided, do not fabricate numbers
    - Be specific and actionable
    - Keep response under 400 words"""

# Usage
prompt = create_analysis_prompt(
    data=sales_table,
    analysis_type="e-commerce sales",
    output_format="1. Key Finding\n2. Trend\n3. Recommendation"
)
```

## Common Prompting Mistakes

1. **Too vague:** "Write something about AI" — model has no direction
2. **Too many instructions at once:** Pile 10 requirements into one prompt — model misses things
3. **Assuming the model remembers:** LLMs are stateless — each request starts fresh (unless using conversation history)
4. **Ignoring token limits:** Longer prompts cost more and may get truncated
5. **Not iterating:** Your first prompt is rarely your best — refine based on outputs

## Key Takeaways

- Prompt engineering is the highest-ROI AI skill — immediate results, no coding required
- Structure prompts with: Role, Task, Input, Output Format, Constraints
- Few-shot prompting (3-5 examples) dramatically improves consistency over zero-shot
- Temperature controls randomness: low for precision, high for creativity
- System prompts set long-term behavior and constraints
- Iterate on prompts — treat them like code that you version and improve

## Practice Challenge

Convert this weak prompt into a well-structured one using all 5 components:

Weak prompt: "Help me write an email"

Your improved prompt should include: role, specific task, context data, output format, and constraints. Write at least 3 different versions for different scenarios (job application, client follow-up, team update).

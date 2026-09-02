# Crafting Effective Prompts

## Learning Objectives
- Master chain-of-thought reasoning in prompts
- Use role prompting to shape model behavior
- Apply delimiters and structure for complex inputs
- Identify and fix the most common prompting failures

---

## Chain-of-Thought Prompting

Chain-of-thought (CoT) prompting asks the model to show its reasoning step by step before giving a final answer. This dramatically improves accuracy on complex tasks.

### Without CoT
```
Question: A store has 3 boxes. Each box has 4 bags. Each bag has 5 apples.
How many apples are there in total?

Answer: 60
```
The model might get this right, but for harder problems, skipping the reasoning leads to errors.

### With CoT
```
Question: A store has 3 boxes. Each box has 4 bags. Each bag has 5 apples.
How many apples are there in total?

Let me think through this step by step:
- There are 3 boxes
- Each box has 4 bags, so total bags = 3 x 4 = 12 bags
- Each bag has 5 apples, so total apples = 12 x 5 = 60 apples

Answer: 60
```

The model is far more likely to arrive at the correct answer when it explains its reasoning.

### When to Use CoT
- Math and logic problems
- Multi-step analysis (comparing options, evaluating trade-offs)
- Complex classification (when the answer depends on multiple factors)
- Code debugging (trace through the logic)

### Zero-Shot CoT
Simply add "Let's think step by step" to your prompt. This single phrase has been shown to improve accuracy by 10-40% on reasoning tasks.

```
Q: If it takes 5 machines 5 minutes to make 5 widgets,
how long would it take 100 machines to make 100 widgets?

Let's think step by step.
```

## Role Prompting

Assigning a specific role shapes the model's expertise, tone, and approach.

### Basic Role
```
You are a senior Python developer with 15 years of experience.
Review this code for bugs and performance issues.
```

### Expert Role with Domain
```
You are a financial analyst at a Fortune 500 company specializing
in SaaS metrics. You think in terms of ARR, churn, LTV, and CAC.
Analyze this startup's financials and identify red flags.
```

### Contrarian Role
```
You are a skeptic reviewing a business proposal. Your job is to
identify weaknesses, assumptions, and risks that the proposer
might have overlooked. Be constructive but thorough.
```

### Multi-Persona (Advanced)
```
You are two people debating this topic:
- Person A: A startup founder excited about the opportunity
- Person B: A venture capitalist cautious about the market size

Present both perspectives with specific arguments.
```

## Delimiters and Structure

Delimiters prevent confusion between instructions and content, especially when the content contains text that could be interpreted as instructions.

### Triple Quotes
```
Summarize the following article:

"""
Artificial intelligence is reshaping industries at an unprecedented pace.
According to McKinsey, AI could add $13 trillion to the global economy
by 2030. However, adoption remains uneven, with only 25% of companies
having implemented AI at scale.
"""

Provide a one-sentence summary.
```

### XML Tags (Recommended for Complex Prompts)
```
<instructions>
Analyze the customer feedback below and categorize each item.
</instructions>

<feedback>
"The delivery was fast but the packaging was damaged."
"Great product, will buy again. Slightly overpriced though."
"Customer service was unhelpful and rude."
</feedback>

<output_format>
For each feedback item, provide:
- Category: [Delivery|Product|Service|Price]
- Sentiment: [Positive|Negative|Mixed]
- Priority: [High|Medium|Low]
</output_format>
```

### Markdown Structure
```
# Task: Code Review

## Context
This is a Flask API endpoint for user registration.

## Code
(see code block below)

## Review Criteria
1. Security (SQL injection, input validation, authentication)
2. Error handling
3. Code style and best practices

## Output Format
For each issue found:
- Line number(s)
- Severity: [Critical|Warning|Info]
- Description
- Suggested fix
```

## Handling Hallucinations

Hallucination is when the model generates plausible-sounding but incorrect or fabricated information.

### Prevention Techniques
1. **Ground in provided data:** "Using ONLY the information provided below..."
2. **Ask for sources:** "Cite specific data points from the document..."
3. **Confidence calibration:** "Rate your confidence (1-5) for each claim..."
4. **Verification prompt:** "Now review your previous answer for any claims not supported by the provided data."

```
Using ONLY the information in the document below, answer the question.
If the document does not contain enough information to answer, say
"I don't have enough information to answer this question."

Document: [your document here]
Question: [your question here]
```

## Output Formatting Control

### JSON Output
```
Extract the following information from the job posting and return
as valid JSON:

{
  "title": "job title",
  "company": "company name",
  "location": "city, state",
  "salary_min": null,
  "salary_max": null,
  "remote": true/false,
  "required_skills": ["skill1", "skill2"]
}

Job posting: [paste job posting here]

Return only valid JSON, no explanation text.
```

### Table Output
```
Compare these three hosting providers:

| Provider | Uptime SLA | Price/mo | Support | Best For |
|----------|-----------|----------|---------|----------|
| [fill]   | [fill]    | [fill]   | [fill]  | [fill]   |

Fill in the table with factual information.
```

### Numbered Steps
```
Create an onboarding checklist for new remote employees.
Return as a numbered list with checkboxes:
1. Step 1: Description
2. Step 2: Description
...
```

## Iterative Prompt Refinement

Treat prompts like code — version them, test them, improve them.

### The Refinement Loop
1. **Write** initial prompt
2. **Test** with 5-10 diverse inputs
3. **Identify** failure modes (wrong format, hallucinations, missing info)
4. **Refine** prompt to address failures
5. **Re-test** and compare

### Prompt Versioning
```
## Prompt v1 (Initial)
Write a product description for [product].

## Prompt v2 (Added structure)
Write a product description for [product] in this format:
- Headline (10 words max)
- Feature bullets (3-5 items, 15 words each)
- CTA (8 words max)

## Prompt v3 (Added constraints)
Write a product description for [product] in this format:
- Headline (10 words max, include main benefit)
- Feature bullets (3-5 items, 15 words each, focus on outcomes not specs)
- CTA (8 words max, create urgency)
Tone: [professional/casual/luxury]
Avoid: [jargon/technical terms/cliches]
```

## Key Takeaways

- Chain-of-thought prompting improves accuracy on complex reasoning tasks — "think step by step"
- Role prompting shapes expertise, tone, and perspective
- Delimiters (XML tags, markdown, triple quotes) separate instructions from content
- Hallucinations are prevented by grounding in provided data and asking for confidence levels
- Output formatting control ensures consistent, machine-parseable responses
- Iterate on prompts systematically — version, test, refine

## Practice Challenge

Take this prompt and improve it through 3 iterations:

V1 (starting point): "Write a social media post about our new product"

V2 (add structure): Add format, platform, audience, and tone.

V3 (add constraints): Add character limits, hashtags, CTA, and a rule against making specific claims.

Write all three versions in your notebook and explain what each improvement addresses.

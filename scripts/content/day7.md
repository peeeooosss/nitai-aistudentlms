# Prompt Engineering Mastery & Week 1 Quiz

## Learning Objectives
- Consolidate all Week 1 prompt engineering techniques
- Apply advanced techniques to real-world scenarios
- Self-assess your understanding of Week 1 concepts
- Prepare for Phase 2 of the program

---

## The Prompt Engineering Framework

By now you have a toolkit of techniques. Here is how they fit together into a complete framework:

### The PRIME Framework
**P**urpose — What is the goal?
**R**ole — Who should the model be?
**I**nput — What data/context does it need?
**M**ethod — Which technique to use (CoT, few-shot, etc.)?
**E**xpectation — What format and constraints?

### Applying PRIME to Real Tasks

**Task: Draft a project proposal**
```
P: Create a 1-page project proposal for an AI chatbot
R: You are a senior technical project manager
I: Client: small e-commerce store, 500 orders/month, needs 24/7 support
M: Use chain-of-thought to outline scope, timeline, and budget before writing
E: Output as markdown with: Overview, Timeline, Budget, Risks, Success Metrics
```

**Task: Debug a Python error**
```
P: Fix the TypeError in this code
R: You are a Python debugging expert who explains root causes clearly
I: [code and error message]
M: First explain why the error occurs, then show the fix
E: Show the corrected code with comments explaining each change
```

## Advanced Technique: Iterative Refinement

The most powerful prompting skill is not any single technique — it is the ability to iteratively improve prompts based on outputs.

### The Refinement Cycle
1. **Baseline:** Write initial prompt, get output
2. **Diagnose:** What is wrong? (format, content, tone, accuracy, completeness)
3. **Target:** Which specific issue to fix first?
4. **Refine:** Add or modify one instruction at a time
5. **Validate:** Re-test with the same input

```
V1: "Write a product description"
Output: Generic, too long, no CTA

V2: "Write a 50-word product description for wireless earbuds"
Output: Better length but still generic

V3: "Write a 50-word product description for wireless earbuds.
     Focus on noise cancellation. End with a call to action."
Output: Good but too technical

V4: "Write a 50-word product description for wireless earbuds.
     Focus on noise cancellation in plain language.
     End with a call to action.
     Tone: friendly, not corporate."
Output: Nailed it
```

### When to Stop Refining
- Output meets 80% of requirements
- Further changes introduce new problems
- The prompt is reusable across similar inputs

## Real-World Prompt Patterns

### Pattern 1: Template with Variables
```
You are a {role} analyzing {topic}.

Context: {context}

Task: {task}

Format: {format}

Constraints: {constraints}
```

### Pattern 2: Chain of Verification
```
Step 1: Answer this question: {question}
Step 2: Now verify your answer. List any assumptions you made.
Step 3: For each assumption, explain whether it is justified.
Step 4: Provide your final answer with confidence level (1-5).
```

### Pattern 3: Comparative Analysis
```
Analyze these two options: {option_a} and {option_b}

For each option, evaluate:
1. Pros (3-5 points)
2. Cons (3-5 points)
3. Best use case
4. Risk level

Then recommend one with a 2-sentence justification.
```

### Pattern 4: Content Transformation
```
Transform the following {input_type} into {output_type}.

Input: {content}

Rules:
- Preserve all factual information
- {format_specific_rules}
- Target audience: {audience}
- Tone: {tone}
```

## Week 1 Self-Assessment

Rate yourself (1-5) on each topic:

1. **I can explain the difference between narrow AI and general AI.** ___/5
2. **I can identify which AI type (supervised, unsupervised, RL, generative) fits a given problem.** ___/5
3. **I can explain how neural networks learn through backpropagation.** ___/5
4. **I can choose appropriate evaluation metrics (precision vs recall vs F1) for a problem.** ___/5
5. **I can write a well-structured prompt using all 5 components (Purpose, Role, Input, Method, Expectation).** ___/5
6. **I can use few-shot prompting to get consistent output formats.** ___/5
7. **I can use chain-of-thought prompting to improve reasoning accuracy.** ___/5
8. **I can set temperature and top-p appropriately for different tasks.** ___/5
9. **I can use system prompts to set long-term model behavior.** ___/5
10. **I can design a multi-step AI workflow for a complex task.** ___/5

**Scoring:**
- 40-50: Excellent foundation — ready for Phase 2
- 30-39: Good progress — review weak areas before moving on
- 20-29: Needs work — revisit specific lessons
- Below 20: Consider re-doing Week 1 with more hands-on practice

## Preview of Week 2

Next week, you move from using AI tools to building AI-powered systems:
- Building content creation pipelines
- Automating repetitive tasks with AI
- Creating client-ready deliverables
- Developing your first AI service offering

The foundation you built this week — understanding AI capabilities and mastering prompting — is what makes everything in Week 2 possible.

## Key Takeaways

- The PRIME framework (Purpose, Role, Input, Method, Expectation) structures any prompt
- Iterative refinement is the most powerful prompting skill — treat prompts like versioned code
- Real-world patterns include: templates, chain of verification, comparative analysis, and content transformation
- Self-assessment reveals gaps — address them before moving forward
- Week 1 built the foundation; Week 2 starts building systems

## Practice Challenge

Complete the self-assessment honestly. For any topic where you scored yourself below 3:
1. Re-read the relevant day's lesson
2. Complete that day's practice challenge
3. Write 2 more examples of that technique in your notebook
4. Re-assess after practice

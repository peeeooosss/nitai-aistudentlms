# Building AI-Powered Workflows — Live Session Prep

## Learning Objectives
- Review and consolidate Week 1 learning
- Prepare questions and topics for live discussion
- Understand how AI workflows combine multiple tools
- Practice hands-on exercises that combine prompting skills

---

## Week 1 Recap

Over the past five days, you have built a foundation in:

- **Day 1:** What AI is, the 90-day roadmap, and setting up your environment
- **Day 2:** AI types (supervised, unsupervised, reinforcement), NLP, computer vision, and generative AI
- **Day 3:** Neural networks, the ML pipeline, evaluation metrics, and bias
- **Day 4:** Prompt engineering fundamentals — structure, zero-shot vs few-shot, temperature, system prompts
- **Day 5:** Advanced prompting — chain-of-thought, role prompting, delimiters, hallucination prevention

Today is a live interactive session. Use this preparation guide to get the most out of it.

## What Is an AI Workflow?

An AI workflow chains multiple AI operations together to accomplish a complex task. Instead of a single prompt-response, you build a pipeline where each step feeds into the next.

### Example: Content Research Workflow
```
Step 1: Gather raw information (web search, API call, file read)
Step 2: Summarize key points (LLM summarization prompt)
Step 3: Identify gaps (LLM analysis prompt)
Step 4: Fill gaps (LLM generation prompt)
Step 5: Format output (structured output prompt)
Step 6: Review and edit (human or automated QA)
```

### Why Workflows Beat Single Prompts
- **Reliability:** Breaking complex tasks into steps reduces errors at each stage
- **Debugging:** When something goes wrong, you know which step failed
- **Quality:** Each step can be optimized independently
- **Cost:** Smaller, focused prompts use fewer tokens than one massive prompt
- **Reusability:** Individual steps can be reused across different workflows

## Hands-On Exercises for Today

### Exercise 1: Research and Summarize
Build a 3-step workflow:
1. **Input:** Paste any article (1000+ words)
2. **Step 1 prompt:** "List the 5 most important claims in this article"
3. **Step 2 prompt:** "For each claim, rate the evidence quality (strong/moderate/weak) and explain why"
4. **Step 3 prompt:** "Write a 150-word executive summary highlighting only the well-supported claims"

Try it with 2 different articles. Compare your workflow output to asking the model to "summarize this article" in a single prompt.

### Exercise 2: Multi-Persona Analysis
Build a workflow that gets multiple perspectives:
1. **Step 1:** Paste a business idea or proposal
2. **Step 2 prompt:** "Act as an enthusiastic investor. List 5 reasons this will succeed."
3. **Step 3 prompt:** "Act as a skeptical investor. List 5 reasons this might fail."
4. **Step 4 prompt:** "Act as a neutral advisor. Based on both perspectives, give a balanced assessment with 3 recommendations."

### Exercise 3: Code Review Pipeline
If you write code, try this workflow:
1. **Step 1:** Paste a function you wrote
2. **Step 2 prompt:** "Review this code for bugs. List each issue with line numbers."
3. **Step 3 prompt:** "For each bug found, write the corrected code."
4. **Step 4 prompt:** "Now write 3 test cases that would catch these bugs."

## Preparing for the Live Session

Write down answers to these questions before the session:

1. **Biggest win:** What was the most useful thing you learned this week?
2. **Biggest confusion:** What concept or technique do you still struggle with?
3. **Use case:** Describe one specific task in your work/life where you could apply prompt engineering.
4. **Workflow idea:** Describe a 2-3 step AI workflow for a real task you do regularly.

## Live Session Agenda

The session will cover:
- Week 1 concept review (15 min)
- Q&A on confusing topics (20 min)
- Live prompt engineering demonstrations (15 min)
- Workflow building exercise — everyone builds one together (20 min)
- Preview of Week 2 and Q&A (10 min)

## Key Takeaways

- AI workflows chain multiple prompt-response steps for better reliability and quality
- Each step in a workflow should have a single, clear responsibility
- Debugging workflows is easier than debugging single large prompts
- Today is about consolidation — review, practice, and prepare questions
- The best way to learn prompting is to do it repeatedly with different scenarios

## Practice Challenge

Before the live session, build and test one complete AI workflow using any AI tool. Document:
1. The workflow steps and prompts you used
2. What worked well
3. What you would change
4. The final output quality compared to a single-prompt approach

Bring your workflow to the live session to share with the group.

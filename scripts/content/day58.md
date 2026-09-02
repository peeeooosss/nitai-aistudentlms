# Quality Assurance with AI

## Learning Objectives

- Understand how AI improves, accelerates, and validates quality assurance
- Learn to build automated QA checks for AI-generated content and code
- Master human-in-the-loop review workflows that catch AI errors
- Apply QA principles to AI deliverables (chatbots, agents, content, automation)
- Prepare thoroughly for the quiz on this topic

## What This Session Covers

This is a **QUIZ day**. Review the material, complete the self-assessment and practice problems, and ensure you can answer everything before the quiz.

## Why QA Matters for AI Work

AI produces impressive output — but it also makes mistakes. Hallucinations, factual errors, off-brand language, security gaps, and broken automations are all real risks. If you ship unvalidated AI work to clients, you damage trust and reputation.

QA with AI has two complementary directions:
1. **QA on AI** — checking that AI output is correct and safe
2. **QA with AI** — using AI to do quality checking (of anything)

This dual role makes QA a critical skill for any AI agency.

## The QA Layers for AI Deliverables

```
┌──────────────────────────────────────────────┐
│ LAYER 1: INPUT QUALITY   (good in → good out)│
│ LAYER 2: OUTPUT VALIDATION (check the result)│
│ LAYER 3: HUMAN REVIEW    (judgment + sign-off)│
│ LAYER 4: MONITORING      (catch regressions)  │
└──────────────────────────────────────────────┘
```

## Layer 1: Input Quality

Garbage in, garbage out. QA starts before the AI runs.

```python
def check_input_quality(text: str, min_len: int = 50) -> list[str]:
    """Flag poor-quality input before it reaches the model."""
    issues = []
    if len(text.strip()) < min_len:
        issues.append(f"Input too short ({len(text)} chars).")
    if text.isupper():
        issues.append("Input is all caps (may indicate bulk/untargeted content).")
    if len(set(text)) < 10:
        issues.append("Input appears repetitive/low-entropy.")
    return issues
```

## Layer 2: Output Validation

### Automated Fact/Consistency Checks
Verify the output stays grounded and doesn't contradict the source.

```python
from openai import OpenAI

client = OpenAI()


def validate_output_grounding(source: str, generated: str) -> dict:
    """Check that generated content is faithful to its source."""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """You are a QA reviewer. Compare the 
            generated output against the source. Return JSON:
            - factual_accuracy (0-1): does output stay true to source facts?
            - hallucination_risk (0-1): does it add content not in source?
            - issues: list of specific inaccuracies or fabrications found
            - verdict: pass / review / fail"""},
            {"role": "user", "content": 
             f"SOURCE:\n{source}\n\nGENERATED:\n{generated}"}
        ],
        response_format={"type": "json_object"},
        temperature=0,
    )
    import json
    return json.loads(resp.choices[0].message.content)
```

### Rule-Based Checks (deterministic)
Some checks don't need AI — regex and simple rules are faster and deterministic:

```python
import re

def rule_based_checks(text: str, config: dict) -> list[str]:
    """Deterministic checks for common issues."""
    errors = []
    
    if config.get("no_urls") and re.search(r"https?://\S+", text):
        errors.append("Contains a URL (should not).")
    if config.get("no_emails") and re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", text):
        errors.append("Contains an email address (should not).")
    if config.get("max_words"):
        words = len(text.split())
        if words > config["max_words"]:
            errors.append(f"Too long: {words} words (max {config['max_words']}).")
    if "TODO" in text or "PLACEHOLDER" in text:
        errors.append("Contains placeholder text.")
    return errors
```

## Layer 3: Human Review (Red Teaming)

Automated checks catch patterns, but **human judgment** catches nuance. Use a structured review:

### The Review Rubric
Define clear criteria so reviews are consistent:

```markdown
## Content Review Rubric
Rate each attribute 1-5:
1. Accuracy — is it factually correct? (no hallucinations)
2. Relevance — does it answer the actual question/task?
3. Tone — does it match the brand/audience?
4. Structure — is it clear and well-organized?
5. Completeness — does it cover what was asked?
6. Safety — no harmful, biased, or private content?

Auto-fail: factual error, fabricated stat, or PII leakage.
```

### Human-in-the-Loop Approval Workflow

```python
def review_gate(item, automated_review: dict, rubric_criteria=6) -> dict:
    """Combine automated + human review into a decision."""
    # Automated pre-check blocks obvious failures
    if automated_review.get("verdict") == "fail":
        return {"status": "rejected", "reason": "Automated check failed"}
    
    # Present to a human reviewer with the rubric
    print("=== HUMAN REVIEW REQUIRED ===")
    print(f"Item: {item}")
    print("Automated checks:", automated_review)
    
    # Simulate human scoring (1-5 on each criterion)
    human_scores = []
    for c in ["Accuracy", "Relevance", "Tone", "Structure", "Completeness", "Safety"]:
        score = input(f"  {c} (1-5): ")
        human_scores.append(int(score))
    
    avg = sum(human_scores) / len(human_scores)
    if avg >= 4.0:
        return {"status": "approved", "avg_score": round(avg, 2)}
    elif avg >= 2.5:
        return {"status": "needs_revision", "avg_score": round(avg, 2)}
    else:
        return {"status": "rejected", "avg_score": round(avg, 2)}
```

## Layer 4: Monitoring & Regression Testing

AI systems degrade and regress. Set up monitoring:

### Test Suites for AI (Prompt/Behavior Regression)
Maintain a set of "golden" test cases that must keep passing:

```python
def build_test_suite(cases: list[tuple[dict, str]]) -> list[dict]:
    """Run a suite of (input, expected_behavior) test cases."""
    results = []
    for input_msg, expected in cases:
        output = run_system(input_msg)           # your agent/chatbot
        check = grade_output(output, expected)   # passes? matches?
        results.append({
            "input": input_msg, "output": output,
            "expected": expected, "passed": check["pass"],
            "notes": check["notes"],
        })
    return results

def grade_output(output: str, expected: str) -> dict:
    """Simple comparison or AI-graded check."""
    # Heuristic: does output contain expected keyword/behavior?
    passed = expected.lower() in output.lower()
    return {"pass": passed, "notes": "contains expected element" if passed else "missing expected element"}
```

### Monitoring in Production
Track error rates, confidence scores, and escalation rates over time. A drop in confidence or a spike in escalations signals a problem.

```python
def track_metrics(history):
    """Detect quality regressions over time."""
    avg_confidence = sum(h["confidence"] for h in history) / len(history)
    escalation_rate = sum(1 for h in history if h["escalated"]) / len(history)
    return {
        "avg_confidence": round(avg_confidence, 2),
        "escalation_rate": round(escalation_rate, 2),
        "worrying": avg_confidence < 0.7 or escalation_rate > 0.3,
    }
```

## QA for Each Deliverable Type

| Deliverable | Key QA Checks |
|---|---|
| **Chatbots** | Intent handling, edge cases, escalation, hallucination, persona consistency |
| **Content** | Factuality (grounding), tone, length, placeholder text, off-brand language |
| **Automation/workflows** | Correct routing, error handling, no infinite loops, input edge cases |
| **Agents** | Tool selection accuracy, safe execution, no runaway loops, guardrails |
| **Data extraction** | Field accuracy, confidence, cross-field consistency, missing data |
| **Reports** | Numbers match source, no invented metrics, clear narrative |

## The QA Checklist (Your Agency Standard)

```markdown
## Pre-Shipment QA Checklist
- [ ] Automated checks passed (factuality/grounding, rules)
- [ ] Test suite passed (golden cases still green)
- [ ] Edge cases tested (empty, very long, ambiguous, unusual inputs)
- [ ] Human review completed with rubric (auto-fail criteria checked)
- [ ] No PII / secrets / private data leaked
- [ ] Error handling works (graceful, not crashes)
- [ ] No placeholder or template text remaining
- [ ] Documented in the client delivery (Day 55 checklist)
```

## Self-Assessment Questions

1. What are the two directions of "QA with AI"?
2. Name the four QA layers for AI deliverables.
3. Why is a deterministic (rule-based) check sometimes better than an AI check?
4. What is "grounding" and why does it matter for QA?
5. What are three auto-fail criteria for content QA?
6. Why is human review still necessary even with automated checks?
7. What is a "golden test suite" and what does regression testing catch?
8. Give two metrics you'd monitor in production to catch AI degradation.
9. Why must you test edge cases (empty, very long, ambiguous inputs)?
10. How does QA protect an agency's reputation and client trust?

## Practice Problems

### Problem 1
Write a rule-based check function that catches: text containing PII patterns (email, phone), text over N words, and placeholder markers. Provide the regex/conditions.

### Problem 2
Design a chatbot QA prompt that grades an AI support response on accuracy, tone, and helpfulness (1-5 each), returning a verdict.

### Problem 3
List 5 edge-case inputs you'd test for a customer-support chatbot (e.g., empty message, all-caps frustration, non-English, requests for a refund, unclear pronoun).

### Problem 4
Explain how you'd detect that an AI content system has started hallucinating more than before (monitoring approach).

## Key Takeaways

- AI work must be validated — hallucinations, errors, and safety issues are real risks
- QA doubles as "QA on AI" (checking AI output) and "QA with AI" (using AI to check anything)
- Four layers: input quality, output validation, human review, monitoring
- Combine AI checks (grounding, factuality) with deterministic rule checks for best coverage
- Human review with a rubric catches nuance automated checks miss
- Monitor confidence, escalation rate, and golden test suites to catch regressions
- Ship nothing without passing your QA checklist — it protects your reputation

## Practice Challenge

**Objective:** Prepare for the quiz and build a QA wrapper.

1. Answer all 10 self-assessment questions from memory, then check
2. Complete all 4 practice problems
3. Build a `qa.py` module that:
   - Has a rule-based check class (PII, length, placeholders)
   - Has an AI grounding/factuality validator
   - Implements a golden test suite with regression checking
   - Implements the review-gate workflow (automated + human rubric)
   - Has a production metrics tracker (confidence, escalation)
4. Test it on: (a) an AI-generated article (check grounding), (b) a chatbot response, (c) an extracted invoice record
5. Produce a QA report showing which passed/failed and why

**Deliverable:** Written answers, a working `qa.py`, and QA reports for 3 different deliverable types.

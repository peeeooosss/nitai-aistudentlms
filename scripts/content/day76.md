# Agile for AI Projects

> **Day 76 | LIVE INTERACTIVE | Phase 3: Enterprise**

---

## Learning Objectives

By the end of this session, you should be able to:

- Adapt Agile methodologies specifically for AI/ML project workflows
- Design sprint structures that accommodate AI experimentation
- Manage AI backlogs that balance research and delivery
- Implement continuous integration for ML systems
- Run effective AI retrospectives and planning sessions

---

## Session Preparation: Why Standard Agile Doesn't Work for AI

Standard Scrum assumes:
- Stories can be estimated in story points
- Sprints produce potentially shippable increments
- Requirements are relatively stable within a sprint
- Velocity is predictable after a few sprints

AI projects violate all of these assumptions:
- You can't estimate "figure out if this approach works" in story points
- A sprint might produce an experiment with negative results (which is valuable but not shippable)
- New data discoveries constantly reshape understanding
- Velocity fluctuates wildly depending on data and problem complexity

### The AI-Adapted Agile Framework

**Modified Sprint Structure:**

```
Standard Scrum Sprint (2 weeks)
├── Planning (2 hours)
├── Daily Standups (15 min × 10)
├── Development (varies)
├── Review (1 hour)
└── Retrospective (1 hour)

AI-Adapted Sprint (2 weeks)
├── Sprint Planning with Confidence Levels (2-3 hours)
│   ├── Commit stories (things we WILL deliver)
│   ├── Target stories (things we AIM to deliver)
│   └── Explore stories (experiments with uncertain outcomes)
├── Daily Standups with Experiment Updates (15 min × 10)
│   ├── What we learned yesterday
│   ├── What we're testing today
│   └── Blockers (especially data blockers)
├── Experiment Reviews (mid-sprint, 1 hour)
│   ├── Quick demos of experiments in progress
│   ├── Go/kill/pivot decisions on approaches
│   └── Adjust sprint scope based on learnings
├── Sprint Review with Experiment Outcomes (1-2 hours)
│   ├── Demo delivered features
│   ├── Present experiment results (positive AND negative)
│   ├── Review model performance metrics
│   └── Update stakeholders on timeline confidence
└── Retrospective with ML-Specific Focus (1-1.5 hours)
    ├── What did we learn about the problem?
    ├── What did we learn about the data?
    ├── What's slowing down our experimentation velocity?
    └── What technical debt are we accumulating?
```

### AI Backlog Management

**Backlog Categories:**

| Category | Description | Priority Framework |
|---|---|---|
| **Delivery** | Features that ship to users | Business value × technical feasibility |
| **Data** | Data preparation, quality, integration | Unblocks delivery work |
| **Infrastructure** | MLOps, monitoring, tooling | Enables scale and reliability |
| **Experimentation** | Research, exploration, prototyping | Potential for breakthrough improvement |
| **Technical Debt** | Refactoring, optimization, documentation | Prevents future slowdown |

**The ICE Scoring Model for AI:**

```
Impact × Confidence × Ease = Priority Score

Impact (1-10): How much business value if this succeeds?
Confidence (1-10): How confident are we this will work?
Ease (1-10): How easy is this to implement?

Example:
- Experiment with new feature engineering approach: 
  Impact: 8, Confidence: 4, Ease: 6 → Score: 192
- Deploy current model to production:
  Impact: 7, Confidence: 9, Ease: 5 → Score: 315
- Refactor data pipeline:
  Impact: 5, Confidence: 8, Ease: 7 → Score: 280
```

---

## Live Exercises

### Exercise 1: AI Sprint Planning

**Scenario:** You're the Scrum Master for an AI team building a demand forecasting system for a retail chain. Current state:
- Data pipeline is 70% complete
- Baseline model (simple moving average) is deployed
- ML model (XGBoost) achieves 15% better accuracy than baseline in experiments
- Feature store is being built
- Stakeholders want production deployment in 6 weeks

**Sprint Backlog Items:**

| ID | Story | Category | Estimate | Confidence |
|---|---|---|---|---|
| D-1 | Add promotion calendar features to training data | Data | 5 pts | High |
| D-2 | Implement real-time weather data integration | Data | 8 pts | Medium |
| E-1 | Experiment with LSTM for time series forecasting | Experiment | 13 pts | Low |
| E-2 | Test external holiday data API | Experiment | 3 pts | High |
| P-1 | Set up A/B testing framework for model comparison | Infrastructure | 5 pts | High |
| P-2 | Implement automated model retraining pipeline | Infrastructure | 8 pts | Medium |
| T-1 | Optimize feature computation pipeline (slow) | Tech Debt | 5 pts | High |
| S-1 | Add explanation feature to forecast output | Delivery | 8 pts | Medium |

**Your task (groups of 4-5):**
1. Plan a 2-week sprint with the above items
2. Categorize each as commit/target/explore
3. Create a mid-sprint checkpoint plan for the explore items
4. Define what "done" means for each item
5. Identify risks and dependencies

### Exercise 2: AI Retrospective

Run a simulated retrospective for the sprint you just planned. Assume:
- D-1 completed successfully
- D-2 partially complete (API access delayed by vendor)
- E-1 showed LSTM performs worse than XGBoost (negative result)
- E-2 completed — holiday data shows 5% improvement
- P-1 completed
- P-2 partially complete (infrastructure team overloaded)
- T-1 completed — pipeline now runs 3x faster
- S-1 not started (blocked by P-2)

**Discussion questions:**
- How do you handle the negative result from E-1?
- What do you communicate to stakeholders about S-1 being blocked?
- How do you adjust the next sprint based on what you learned?

### Exercise 3: Estimation Workshop

**Estimate the following AI project tasks as a team:**

1. "Build a customer segmentation model using clustering"
2. "Clean and normalize 2 years of transaction data from 3 legacy systems"
3. "Deploy a real-time fraud scoring API that handles 1000 requests/second"
4. "Create a dashboard showing model performance metrics to business stakeholders"
5. "Implement bias testing for our hiring recommendation model"

For each, provide:
- Story point estimate (1, 2, 3, 5, 8, 13, 21)
- Confidence level (High/Medium/Low)
- Key assumptions behind your estimate
- What could make it take 3x longer

---

## Discussion Topics

### Topic 1: Managing Stakeholder Expectations

Your CEO wants a monthly demo of AI progress. How do you show value when the team is in a data preparation phase? How do you prevent stakeholders from interpreting "we learned that approach X doesn't work" as failure?

### Topic 2: Documentation in Agile AI Projects

AI projects need extensive documentation (data dictionaries, model cards, experiment logs) but Agile teams often resist documentation. How do you balance documentation needs with Agile's preference for working software?

### Topic 3: Cross-Team Dependencies

Your AI team depends on the data engineering team for pipeline work, the platform team for infrastructure, and the security team for access approvals. How do you manage these dependencies in an Agile framework?

---

## Key Takeaways

1. Standard Agile needs significant adaptation for AI projects due to inherent uncertainty
2. Sprint planning should distinguish between commit, target, and explore stories
3. Experiment reviews mid-sprint allow for course correction based on learnings
4. AI retrospectives should explicitly address learning about the problem and data
5. ICE scoring helps prioritize across delivery, data, infrastructure, experimentation, and technical debt
6. Negative experiment results are valuable learning, not failures

---

## Practice Challenge

**Post-Session Assignment:**

Design a complete Agile framework for an AI team of 6 people building 3 concurrent AI products. Include:

1. **Sprint cadence** — Length, ceremony schedule, time allocation
2. **Backlog structure** — Categories, prioritization method, refinement process
3. **Estimation approach** — How to estimate uncertain AI work
4. **Definition of Done** — For experiments, data work, model development, and deployment
5. **Stakeholder communication** — Sprint review format, status reporting, escalation paths
6. **Metrics** — How to track team velocity, experiment success rate, and delivery progress
7. **Tool recommendations** — Specific tools for tracking AI projects (Jira adaptations, MLflow, etc.)

Present your framework as a practical guide that a newly formed AI team could adopt immediately.

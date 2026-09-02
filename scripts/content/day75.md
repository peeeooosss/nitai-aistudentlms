# AI Project Management

> **Day 75 | QUIZ PREP | Phase 3: Enterprise**

---

## Learning Objectives

By the end of this session, you should be able to:

- Apply project management frameworks specifically designed for AI/ML projects
- Estimate timelines and budgets for AI initiatives with appropriate uncertainty ranges
- Manage AI project risks that don't exist in traditional software projects
- Communicate AI project status to non-technical stakeholders
- Know when to kill, pivot, or double down on an AI project

---

## Study Material: AI Project Management

### Why Traditional Project Management Fails for AI

Traditional software project management assumes predictability: you can define requirements, estimate effort, and deliver against a plan. AI projects violate these assumptions because:

1. **You don't know if it will work** — Unlike traditional software where requirements are known, AI projects explore whether a solution is possible
2. **Data determines timelines** — Data quality issues discovered mid-project can double the timeline
3. **Performance plateaus are unpredictable** — Getting from 80% to 95% accuracy might take longer than getting from 0% to 80%
4. **Deployment is harder than development** — Monitoring, drift, and feedback loops add ongoing complexity

### AI Project Lifecycle

```
Phase 1: DISCOVERY (10-15% of timeline)
├── Business problem definition
├── Data landscape assessment
├── Feasibility analysis
├── Success criteria and metrics
├── Stakeholder alignment
└── Deliverable: Project charter with go/no-go criteria

Phase 2: DATA PREPARATION (30-40% of timeline)
├── Data collection and integration
├── Data cleaning and validation
├── Feature engineering
├── Exploratory data analysis
├── Data quality assessment
└── Deliverable: Feature-ready dataset with documentation

Phase 3: MODEL DEVELOPMENT (20-30% of timeline)
├── Baseline model establishment
├── Iterative model improvement
├── Experiment tracking
├── Hyperparameter tuning
├── Model evaluation against success criteria
└── Deliverable: Trained model meeting performance thresholds

Phase 4: DEPLOYMENT (15-20% of timeline)
├── Model serving infrastructure
├── Integration with existing systems
├── A/B testing setup
├── Monitoring and alerting
├── Rollback procedures
└── Deliverable: Production-deployed model with monitoring

Phase 5: OPERATIONS (Ongoing)
├── Model monitoring and drift detection
├── Periodic retraining
├── Performance reporting
├── User feedback incorporation
├── Version management
└── Deliverable: Sustained model performance with documented learnings
```

### Estimation Framework for AI Projects

Since AI projects have inherent uncertainty, estimation should use ranges rather than point estimates.

**Three-Point Estimation for AI Tasks:**

| Task Type | Optimistic | Most Likely | Pessimistic | Typical Range |
|---|---|---|---|---|
| Data exploration | 1 week | 2 weeks | 4 weeks | 1-4 weeks |
| Data cleaning (per source) | 1 week | 2 weeks | 6 weeks | 1-6 weeks |
| Feature engineering | 1 week | 3 weeks | 6 weeks | 1-6 weeks |
| Baseline model | 1 week | 2 weeks | 3 weeks | 1-3 weeks |
| Model improvement iterations | 2 weeks | 4 weeks | 12 weeks | 2-12 weeks |
| Production deployment | 2 weeks | 4 weeks | 8 weeks | 2-8 weeks |
| Integration with existing systems | 1 week | 3 weeks | 8 weeks | 1-8 weeks |

**PERT Estimation Formula:**
```
Expected Duration = (Optimistic + 4 × Most Likely + Pessimistic) / 6
Standard Deviation = (Pessimistic - Optimistic) / 6
```

**Budget Estimation Template:**

| Cost Category | Year 1 | Year 2 | Ongoing/Year |
|---|---|---|---|
| Personnel (team of 4-6) | $600K-900K | $650K-950K | $700K-1M |
| Cloud infrastructure | $50K-150K | $80K-200K | $100K-250K |
| Data (licensing, storage) | $20K-100K | $30K-80K | $30K-80K |
| Tools and software | $30K-60K | $30K-60K | $30K-60K |
| Training and development | $10K-20K | $10K-20K | $10K-20K |
| Contingency (20-30%) | $140K-360K | $160K-420K | $170K-440K |
| **Total** | **$850K-1.6M** | **$960K-1.7M** | **$1M-1.9M** |

### AI-Specific Risk Management

| Risk Category | Specific Risks | Mitigation Strategies |
|---|---|---|
| **Data Risk** | Data quality worse than expected, data unavailable, regulatory restrictions | Early data assessment, alternative data sources, synthetic data |
| **Technical Risk** | Model doesn't reach required performance, technology doesn't exist | Baseline models early, time-box experiments, have fallback approaches |
| **Integration Risk** | Existing systems can't support AI, API limitations | Proof-of-concept integration early, engage IT early |
| **Business Risk** | Requirements change, stakeholder loses support, ROI doesn't materialize | Regular stakeholder check-ins, incremental value delivery |
| **Ethical Risk** | Bias discovered, privacy concerns, public backlash | Ethics review at project start, bias testing throughout |
| **Talent Risk** | Key person leaves, skills gap | Cross-training, documentation, competitive retention |

### Communicating AI Project Status

**The AI Project Status Dashboard:**

```
┌────────────────────────────────────────────────────┐
│           AI PROJECT STATUS: CHURN PREDICTION       │
├──────────────┬─────────────────────────────────────┤
│ Phase        │ Data Preparation ████████░░ 80%     │
│ Timeline     │ On track (3 weeks remaining)        │
│ Data Quality │ Score: 72/100 (needs improvement)   │
│ Model Perf   │ Baseline AUC: 0.78 (target: 0.85)  │
│ Key Risk     │ Missing features from billing system │
│ Blockers     │ IT access to billing API delayed     │
│ Next Milestone│ Feature engineering complete by Mar 15│
└──────────────┴─────────────────────────────────────┘
```

**Key Metrics to Report:**
- Phase progress (with confidence level)
- Data quality score
- Model performance vs. target
- Timeline status (ahead/behind/on track with confidence)
- Budget status
- Top risks and mitigation status
- Decisions needed from leadership

### Kill/Pivot/Continue Decisions

**Kill Criteria (Stop the project if):**
- Data quality is fundamentally insufficient and cannot be remediated
- Required performance level is technically infeasible with available data
- Business requirements have changed, making the use case obsolete
- Cost is projected to exceed 3x the business case

**Pivot Criteria (Change approach if):**
- One approach isn't working but alternative approaches show promise
- Data reveals a different, more valuable use case
- Scope needs adjustment (simpler model, narrower use case)
- Integration requirements need redesign

**Continue Criteria (Keep going if):**
- Progressing toward performance targets (even if behind timeline)
- Data quality is improving with clear path to sufficiency
- Stakeholder support remains strong
- Business case remains valid

---

## Key Takeaways

1. AI projects require different management approaches than traditional software projects
2. The AI lifecycle has five phases, with data preparation typically taking the longest
3. Estimation should use ranges and account for inherent uncertainty
4. AI-specific risk management must address data, technical, integration, business, ethical, and talent risks
5. Status reporting must communicate AI-specific metrics (data quality, model performance) in business terms
6. Clear kill/pivot/continue criteria prevent AI projects from becoming zombie projects

---

## Practice Challenge

**Self-Assessment Questions:**

1. Your CEO asks: "How long will it take to build an AI system that predicts customer churn?" Using the estimation framework, provide a three-point estimate and explain your reasoning.

2. You are 6 weeks into an AI project. The data preparation phase is taking twice as long as estimated because the data is much messier than expected. What do you do?

3. Design a project charter template specifically for an AI project. What sections would it include that a traditional software project charter would not?

4. Create a risk register for an AI project that processes medical images for preliminary screening. Identify 10 risks with probability, impact, and mitigation strategies.

5. You need to present the status of an AI project to a board that includes no technical members. What metrics would you show? What language would you use?

# AI for HR & Talent Management

> **Day 68 | QUIZ PREP | Phase 3: Enterprise**

---

## Learning Objectives

By the end of this session, you should be able to:

- Identify high-impact AI applications across the HR lifecycle
- Navigate the ethical and legal risks of AI in hiring and talent management
- Evaluate AI HR tools against bias, fairness, and compliance requirements
- Design responsible AI processes for talent management
- Build business cases for AI-powered HR initiatives

---

## Study Material: AI in Human Resources

### The AI-Transformed HR Function

AI is transforming every stage of the employee lifecycle. Understanding these applications is essential for enterprise AI practitioners — both as builders of these systems and as leaders who must ensure they are implemented responsibly.

### AI Applications Across the HR Lifecycle

| Lifecycle Stage | AI Application | Business Value | Risk Level |
|---|---|---|---|
| **Attraction** | Job description optimization | 30% more qualified applicants | Low |
| | Predictive sourcing | Target passive candidates | Medium |
| | Employer brand analytics | Optimize recruitment marketing | Low |
| **Screening** | Resume parsing and matching | 75% faster shortlisting | High |
| | Video interview analysis | Standardized initial assessment | Very High |
| | Skills assessment AI | Objective skills evaluation | Medium |
| **Selection** | Interview scheduling automation | 90% reduction in scheduling time | Low |
| | Offer optimization | Competitive yet cost-effective offers | Low |
| | Onboarding personalization | Faster time to productivity | Low |
| **Development** | Learning path recommendations | Personalized upskilling | Low |
| | Performance analytics | Data-driven performance reviews | Medium |
| | Skills gap analysis | Workforce planning accuracy | Medium |
| **Retention** | Attrition prediction | 85% accuracy in identifying flight risk | High |
| | Engagement sentiment analysis | Early warning for disengagement | Medium |
| | Compensation optimization | Competitive yet sustainable pay | Medium |
| **Separation** | Exit interview analysis | Pattern identification | Low |
| | Knowledge transfer automation | Institutional knowledge preservation | Low |

### Legal and Ethical Landscape

**EEOC Guidance on AI in Employment:**
The Equal Employment Opportunity Commission has clarified that employers are liable for the discriminatory effects of AI tools, even if the tool was developed by a third party. Key principles:

- Disparate impact liability applies to AI screening tools
- Employers must be able to explain how AI reaches its decisions
- Reasonable accommodations must be provided for AI-assisted processes
- Regular audits for adverse impact are expected

**NYC Local Law 144 (Bias Audit Law):**
Requires annual bias audits for automated employment decision tools. The audit must:
- Assess disparate impact across protected categories
- Be conducted by an independent auditor
- Results must be published on the employer's website

**EU AI Act — Employment as High-Risk:**
AI systems used for employment decisions (recruitment, promotion, termination) are classified as high-risk and require:
- Conformity assessment
- Human oversight mechanisms
- Transparency obligations
- Data governance standards
- Bias monitoring and mitigation

### Bias Detection and Mitigation

**Types of Bias in AI Hiring:**

1. **Historical bias**: Training data reflects past discrimination
2. **Representation bias**: Underrepresented groups in training data
3. **Measurement bias**: Inconsistent or subjective evaluation criteria
4. **Aggregation bias**: One model applied to different populations without adjustment
5. **Deployment bias**: Tool used in ways not intended by designers

**Bias Audit Framework:**

```
Step 1: Define Protected Categories
├── Race/Ethnicity
├── Gender
├── Age
├── Disability status
└── Other applicable categories

Step 2: Disparate Impact Analysis
For each protected category:
├── Calculate selection rate for category
├── Compare to most-selected category
├── Apply 4/5ths rule (if ratio < 0.8, potential disparate impact)
└── Statistical significance testing

Step 3: Root Cause Analysis
├── Identify which features drive disparities
├── Analyze training data representation
├── Evaluate proxy variables (zip code → race)
└── Assess feedback loop risks

Step 4: Mitigation
├── Feature selection adjustments
├── Training data rebalancing
├── Threshold optimization by group
├── Adversarial debiasing
└── Human review of flagged cases

Step 5: Ongoing Monitoring
├── Monthly disparate impact reports
├── Automated alerts for threshold violations
├── Regular model retraining with fresh data
└── Annual independent audit
```

### Responsible AI Hiring Framework

**Transparency Principles:**
- Tell candidates when AI is used in the evaluation process
- Explain what the AI assesses and how results are used
- Provide alternative processes for candidates who request them
- Share audit results publicly

**Human-in-the-Loop Requirements:**
- AI assists but does not make final hiring decisions
- Human reviewers evaluate AI recommendations
- Clear escalation paths for edge cases
- Regular calibration between human and AI assessments

**Data Governance for HR AI:**
- Minimize personal data collected and retained
- Anonymize data used for model training
- Define clear retention periods for applicant data
- Ensure candidates can request data deletion

### Building Business Cases for HR AI

**ROI Calculation Template:**

```
HR AI ROI = (Cost Savings + Revenue Impact - Total Investment) / Total Investment

Components:
  Cost Savings:
    - Time saved per hire × number of hires × average hourly rate
    - Reduced turnover cost (cost-per-turnover × reduction in turnover rate)
    - Reduced agency fees
    - Reduced bias-related legal risk (estimated liability reduction)
  
  Revenue Impact:
    - Better hires → higher productivity (estimate 10-20% improvement)
    - Faster time-to-fill → reduced vacancy cost
    - Better retention → institutional knowledge preserved
  
  Total Investment:
    - Tool licensing or development cost
    - Implementation and integration
    - Training and change management
    - Ongoing maintenance and monitoring
    - Bias audit costs
```

---

## Key Takeaways

1. AI applications span the entire HR lifecycle, from attraction to separation
2. AI in hiring carries the highest legal and ethical risk — requires careful implementation
3. Bias audits are legally required in some jurisdictions and best practice everywhere
4. The 4/5ths rule provides a simple test for disparate impact
5. Human-in-the-loop design is non-negotiable for employment decisions
6. Transparency with candidates about AI use is both ethical and increasingly legally required
7. Business cases for HR AI should quantify both cost savings and quality-of-hire improvements

---

## Practice Challenge

**Self-Assessment Questions:**

1. Your company's AI resume screening tool selects 70% of white male applicants but only 45% of Black female applicants. Apply the 4/5ths rule. Is there potential disparate impact? What steps would you take?

2. Design an AI-powered employee attrition prediction system. What features would you use? What ethical considerations apply? How would you handle a manager who wants to preemptively replace employees flagged as high flight risk?

3. A candidate discovers during an interview that an AI system analyzed their social media as part of the screening process. They were not informed. Draft a response and outline how you would prevent this in the future.

4. Calculate the ROI of an AI interview scheduling tool for a company that makes 200 hires per year, where scheduling currently takes 3 hours per hire at $45/hour, and the AI tool costs $24,000/year.

5. Compare the regulatory requirements for AI in hiring across NYC Local Law 144, EU AI Act, and general EEOC guidance. What are the common requirements?

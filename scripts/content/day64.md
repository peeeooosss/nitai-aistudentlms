# AI Security & Compliance

> **Day 64 | THEORY | Phase 3: Enterprise**

---

## Learning Objectives

By the end of this session, you should be able to:

- Identify the unique security risks introduced by AI systems
- Implement security controls across the AI lifecycle
- Navigate major compliance frameworks relevant to enterprise AI
- Design privacy-preserving AI architectures
- Establish incident response procedures for AI-specific failures

---

## The Unique Security Landscape of AI

Traditional cybersecurity focuses on confidentiality, integrity, and availability (the CIA triad). AI introduces new attack surfaces that didn't exist before. An AI system can be compromised even when the underlying infrastructure is perfectly secure.

### AI-Specific Threat Categories

**1. Data Poisoning**

Attackers manipulate training data to corrupt the model's learning process. Unlike traditional data breaches, the damage may not be visible until the model produces systematically wrong predictions.

- **Targeted poisoning**: Manipulate data to cause misclassification of specific inputs (e.g., making a spam filter allow specific phishing emails)
- **Backdoor attacks**: Embed triggers that cause incorrect behavior when a specific pattern appears in inputs
- **Label flipping**: Change labels in training data to degrade model accuracy

Real-world impact: A 2024 study demonstrated that poisoning just 0.1% of training data could reduce image classification accuracy by 20%.

**2. Adversarial Attacks**

Crafted inputs designed to fool deployed models. These are particularly dangerous because they don't require access to the model's internals.

- **Evasion attacks**: Slightly modified inputs that cause misclassification (e.g., adding imperceptible noise to an image to change its classification)
- **Model extraction**: Repeatedly querying a model to reconstruct its behavior, then creating a stolen copy
- **Model inversion**: Using model outputs to reconstruct sensitive training data

Example: An attacker modifies a stop sign image with tiny perturbations that are invisible to humans but cause an autonomous vehicle's vision system to read it as a speed limit sign.

**3. Prompt Injection & Model Manipulation (LLM-Specific)**

Large language models introduce entirely new attack vectors:

- **Prompt injection**: Overriding system instructions through crafted user inputs
- **Jailbreaking**: Circumventing safety guardrails to extract harmful content
- **Data exfiltration via prompts**: Using prompts to extract training data or system prompts
- **Indirect prompt injection**: Embedding malicious instructions in documents or websites that the AI processes

**4. Supply Chain Attacks**

- Compromised pre-trained models with backdoors
- Malicious packages in ML libraries
- Tampered training data from third-party sources

### Defense-in-Depth for AI Systems

```
Layer 1: Data Security
├── Data encryption at rest and in transit
├── Access controls and data segmentation
├── Data validation and anomaly detection
├── Lineage tracking and integrity verification
└── Differential privacy mechanisms

Layer 2: Model Security
├── Model signing and verification
├── Secure model storage (encrypted)
├── Access control for model artifacts
├── Adversarial robustness testing
└── Model watermarking

Layer 3: Infrastructure Security
├── Network segmentation for training environments
├── Secrets management for API keys and credentials
├── Container security for ML workloads
├── GPU/TPU access controls
└── Audit logging for all infrastructure access

Layer 4: Application Security
├── Input validation and sanitization
├── Rate limiting for inference endpoints
├── Output filtering and safety checks
├── API authentication and authorization
└── Request/response logging

Layer 5: Monitoring & Response
├── Anomaly detection on inference patterns
├── Model performance monitoring (drift detection)
├── Security information and event management (SIEM) integration
├── Automated alerting for suspicious activity
└── Incident response playbooks
```

---

## Compliance Frameworks for Enterprise AI

### General Data Protection Regulation (GDPR)

GDPR applies to any organization processing personal data of EU residents. Key AI-relevant provisions:

**Right to Explanation (Article 22):**
Automated decision-making that significantly affects individuals must be explainable. This doesn't necessarily mean explaining the model's internals, but providing meaningful information about the logic involved.

**Data Protection Impact Assessment (DPIA):**
Required before processing that is likely to result in high risk. AI systems that profile individuals or make consequential decisions typically trigger DPIA requirements.

**Right to Erasure:**
When an individual requests deletion of their data, the organization must ensure the data is removed from training datasets and, where feasible, retrain models without that data.

**Practical implications:**
- Maintain training data lineage
- Implement model explainability (SHAP, LIME, or inherently interpretable models)
- Build mechanisms to retrain models on request
- Document automated decision-making processes

### Health Insurance Portability and Accountability Act (HIPAA)

For AI systems in healthcare:

- **Protected Health Information (PHI)** must be encrypted and access-controlled
- **Business Associate Agreements (BAA)** required with AI vendors
- **Minimum necessary standard**: AI systems should access only the data needed for their function
- **Audit trails**: All access to PHI through AI systems must be logged
- **De-identification**: Training data should be de-identified per HIPAA Safe Harbor or Expert Determination methods

### SOC 2 Type II

SOC 2's Trust Service Criteria apply to AI systems:

- **Security**: Controls to protect against unauthorized access
- **Availability**: Uptime and disaster recovery for AI services
- **Processing Integrity**: AI outputs are accurate and complete
- **Confidentiality**: Sensitive data in AI systems is protected
- **Privacy**: Personal information is handled per stated policies

### Industry-Specific Regulations

**Financial Services:**
- SR 11-7 (Model Risk Management): Requires independent validation of AI models, ongoing monitoring, and documentation
- Fair Lending Laws (ECOA, Fair Housing Act): AI models for credit decisions must not discriminate
- Bank Secrecy Act: AI for transaction monitoring must meet regulatory expectations

**Automotive:**
- ISO 26262 (Functional Safety): AI in autonomous vehicles must meet safety integrity levels
- UNECE WP.29: Cybersecurity management systems for vehicles

**AI-Specific Regulations (Emerging):**
- EU AI Act: Risk-based classification (unacceptable, high, limited, minimal risk) with specific requirements per category
- China's AI regulations: Content generation, deepfake, and algorithm registration requirements
- US Executive Order on AI: Federal agency requirements for AI safety

---

## Privacy-Preserving AI Techniques

### Federated Learning

Train models across multiple data sources without centralizing the data. Each organization trains locally and shares only model updates (gradients), not raw data.

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Hospital A  │  │ Hospital B  │  │ Hospital C  │
│ Local Data  │  │ Local Data  │  │ Local Data  │
│ Local Train │  │ Local Train │  │ Local Train │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
              ┌─────────┴─────────┐
              │ Central Server    │
              │ Aggregate Gradients│
              │ Update Global Model│
              └───────────────────┘
```

### Differential Privacy

Adds calibrated noise to data or model updates to provide mathematical guarantees that individual records cannot be identified.

- **Local differential privacy**: Each data point is perturbed before collection
- **Global differential privacy**: Noise added during aggregation or training
- **Privacy budget (epsilon)**: Lower values = more privacy, less utility; higher values = more utility, less privacy

### Homomorphic Encryption

Allows computation on encrypted data without decrypting it first. AI models can make predictions on encrypted inputs, protecting sensitive data.

Current limitations: Computationally expensive, limited to specific operations, not yet practical for large-scale training.

### Secure Multi-Party Computation

Multiple parties jointly compute a function over their inputs while keeping those inputs private. Useful for scenarios where multiple organizations want to collaborate on AI without sharing raw data.

---

## AI Incident Response

### AI-Specific Incident Categories

| Incident Type | Severity | Example | Response Time |
|---|---|---|---|
| Model degradation | Medium | Accuracy drops below threshold | 24 hours |
| Adversarial attack | High | Successful evasion attack detected | 2 hours |
| Data breach via model | Critical | Model leaking training data | Immediate |
| Bias discovery | High | Model systematically discriminating | 4 hours |
| Model poisoning | Critical | Training data confirmed compromised | Immediate |
| Hallucination/misinformation | Medium | LLM generating false information in production | 8 hours |
| Prompt injection | High | System instructions extracted or bypassed | 4 hours |

### Incident Response Procedure for AI

1. **Detection**: Monitor model outputs, user complaints, adversarial detection systems
2. **Triage**: Classify incident by severity and type
3. **Containment**: Rate limit or disable affected model endpoints; switch to fallback systems
4. **Investigation**: Analyze attack vectors, affected data, impact scope
5. **Eradication**: Remove compromised data/models, patch vulnerabilities
6. **Recovery**: Retrain models, validate integrity, gradually restore service
7. **Post-mortem**: Document lessons learned, update defenses, report to regulators if required

---

## Key Takeaways

1. AI systems have unique attack surfaces including data poisoning, adversarial inputs, and prompt injection
2. Defense-in-depth requires security controls at every layer: data, model, infrastructure, application, and monitoring
3. Major compliance frameworks (GDPR, HIPAA, SOC 2) all have AI-specific implications
4. Privacy-preserving techniques (federated learning, differential privacy) enable AI while protecting data
5. AI incident response procedures must be tailored to AI-specific failure modes
6. The EU AI Act establishes the first comprehensive risk-based regulatory framework for AI

---

## Practice Challenge

**Self-Assessment Questions:**

1. Your company deploys a customer service chatbot powered by an LLM. A user reports that they were able to make the chatbot reveal its system prompt. Classify this incident, determine its severity, and outline the first three steps of your response.

2. Design a data validation pipeline that detects potential data poisoning attacks on incoming training data. What signals would you monitor?

3. Your healthcare AI project requires training data from three hospitals. Which privacy-preserving technique would you recommend and why? What are the tradeoffs?

4. Under GDPR, a customer requests that your recommendation model "forget" them. Describe the technical steps required to fulfill this request and the practical challenges.

5. Create a checklist of 10 security controls that should be verified before deploying an AI model to production in a financial services environment.

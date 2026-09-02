export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const phase3Quizzes: Record<number, QuizQuestion[]> = {
  // Day 61 — Enterprise AI Strategy
  61: [
    {
      question: "What is the primary difference between an AI strategy and a digital transformation strategy?",
      options: [
        "They are the same thing — AI is just a buzzword for digital transformation",
        "AI strategy focuses specifically on leveraging machine learning and intelligent automation, while digital transformation broadly covers digitizing business processes",
        "Digital transformation is only about moving to the cloud, while AI strategy covers everything else",
        "AI strategy is a subset of marketing strategy, not technology strategy",
      ],
      correctIndex: 1,
      explanation:
        "Digital transformation encompasses broad changes like moving paper processes online, adopting cloud infrastructure, and digitizing workflows. An AI strategy is more specific — it defines how an organization will use machine learning, NLP, computer vision, and intelligent automation to create competitive advantage. A strong enterprise AI strategy must align with and support the broader digital transformation roadmap.",
    },
    {
      question: "When building an enterprise AI roadmap, which framework ensures AI initiatives directly support business outcomes?",
      options: [
        "Technology-first: pick the most advanced model and find a use case for it",
        "Value mapping: identify business KPIs, then determine which AI capabilities can move those KPIs",
        "Vendor-driven: let your AI vendor choose the initiatives based on their product roadmap",
        "Random experimentation: run as many pilots as possible and hope something works",
      ],
      correctIndex: 1,
      explanation:
        "Value mapping works backward from business outcomes. You start with strategic KPIs (revenue growth, cost reduction, customer retention), identify bottlenecks or opportunities, then determine what AI capabilities — predictive analytics, NLP, recommendation engines — can address them. This ensures every AI dollar spent ties back to measurable business value, which is critical for executive buy-in and sustained investment.",
    },
    {
      question: "What is the 'AI Maturity Model' primarily used for in enterprise strategy?",
      options: [
        "Rating how intelligent an AI model is on a scale of 1-10",
        "Assessing an organization's current AI capabilities and charting a progression path toward more advanced implementations",
        "Benchmarking your AI models against competitors' models in published leaderboards",
        "Determining how much GPU compute your company needs to purchase",
      ],
      correctIndex: 1,
      explanation:
        "An AI Maturity Model evaluates where an organization stands across dimensions like data readiness, talent, infrastructure, governance, and use-case sophistication. Typical levels range from 'Ad Hoc' (isolated experiments) to 'Operationalized' (AI embedded in core business processes). It provides a structured progression path so leadership can set realistic milestones and allocate resources to close gaps between current and target maturity levels.",
    },
    {
      question: "Why is executive sponsorship critical for enterprise AI strategy success?",
      options: [
        "Because executives are the only ones who can write Python code",
        "Because AI initiatives require cross-functional resource allocation, cultural change, and long-term investment that only leadership authority can sustain",
        "Because without a CEO's name on the project, vendors won't give discounts",
        "Because AI projects always fail without a famous person endorsing them",
      ],
      correctIndex: 1,
      explanation:
        "Enterprise AI cuts across departments — data engineering, IT, business units, legal, and compliance. Only executive sponsors have the authority to break down silos, allocate budget, resolve competing priorities, and champion cultural shifts like data-driven decision-making. Without visible top-down commitment, AI initiatives typically stall at the pilot stage and never achieve production-scale impact.",
    },
    {
      question: "What is the biggest risk of an 'AI-first' corporate strategy without proper governance?",
      options: [
        "The company will become too efficient",
        "Regulatory non-compliance, biased decision-making, reputational damage, and strategic misalignment where AI is deployed for its own sake rather than business value",
        "Competitors will copy the strategy too quickly",
        "The IT team will become overwhelmed with praise",
      ],
      correctIndex: 1,
      explanation:
        "An aggressive AI-first stance without governance frameworks can lead to deploying AI in contexts where it causes harm (biased hiring, discriminatory lending), violates regulations (GDPR, EU AI Act), or simply wastes resources on low-value use cases. Strong AI governance includes model risk management, ethical review boards, regulatory compliance checks, and alignment with business strategy to ensure AI amplifies value rather than creates liability.",
    },
    {
      question: "Which of the following is the most effective way to communicate AI strategy to a non-technical board of directors?",
      options: [
        "Show them the model architecture diagrams and loss curves",
        "Frame AI investments in terms of revenue impact, cost savings, risk reduction, and competitive positioning using business language",
        "Tell them AI will replace most employees within two years",
        "Present a 200-page technical whitepaper and ask them to study it before the next meeting",
      ],
      correctIndex: 1,
      explanation:
        "Board members care about fiduciary outcomes: revenue, margin, risk, and competitive moat. The most effective AI strategy communication translates technical capabilities into business outcomes — 'Our predictive maintenance model will reduce unplanned downtime by 30%, saving $4.2M annually' rather than 'We're deploying a gradient-boosted ensemble with 94% AUC.' Technical depth comes later in diligence; the initial conversation must connect AI to business value.",
    },
  ],

  // Day 65 — Enterprise Data Strategy
  65: [
    {
      question: "What is a 'data mesh' architecture, and why is it gaining traction in enterprises?",
      options: [
        "A single centralized data warehouse that stores all company data in one place",
        "A decentralized approach where domain teams own, produce, and serve their own data as products, governed by universal standards",
        "A networking protocol for transferring data between data centers",
        "A mesh network of IoT sensors that collect enterprise data",
      ],
      correctIndex: 1,
      explanation:
        "Data mesh addresses the bottleneck of centralized data teams becoming overwhelmed. In a data mesh, each business domain (sales, marketing, operations) owns its data, defines its schemas, and exposes it via standardized interfaces. Cross-cutting concerns like security, governance, and discoverability are handled by a platform team. This scales data ownership, improves data quality (owners have domain expertise), and reduces time-to-insight for downstream consumers.",
    },
    {
      question: "Why is data quality considered the single biggest bottleneck for enterprise AI initiatives?",
      options: [
        "Because AI models are too sensitive to minor data variations",
        "Because ML models trained on inaccurate, incomplete, or biased data produce unreliable predictions, making the 'garbage in, garbage out' problem amplified at scale",
        "Because data storage is expensive and high-quality data requires more storage",
        "Because data scientists prefer working with messy data for the challenge",
      ],
      correctIndex: 1,
      explanation:
        "A model's output is fundamentally bounded by its input data quality. Enterprise data often suffers from duplication, missing values, inconsistent formats across systems, stale records, and hidden biases. Without systematic data quality management — profiling, cleansing, validation pipelines, and ongoing monitoring — AI models will learn from corrupted signals, producing predictions that erode trust and create business risk. Research consistently shows data quality issues are the #1 cause of AI project failures.",
    },
    {
      question: "What is a 'feature store' in the context of enterprise ML infrastructure?",
      options: [
        "A database that stores the final predictions of deployed models",
        "A centralized repository for storing, sharing, and serving engineered ML features consistently across training and inference pipelines",
        "An online store where companies purchase pre-built AI features from vendors",
        "A cloud storage bucket dedicated to storing raw, unprocessed data",
      ],
      correctIndex: 1,
      explanation:
        "Feature stores solve the 'feature engineering duplication' problem. In enterprises with dozens of ML models, teams often recompute the same features (e.g., 'customer 30-day rolling spend') independently. A feature store provides a shared layer where features are defined once, computed consistently, and served with low latency to both training jobs and real-time inference endpoints. This ensures training-serving consistency (preventing skew) and accelerates model development.",
    },
    {
      question: "What role does a Chief Data Officer (CDO) play in enterprise data strategy?",
      options: [
        "Writing SQL queries for the data team",
        "Setting enterprise-wide data governance policies, championing data literacy, overseeing data architecture, and ensuring data assets drive business value",
        "Managing the company's social media accounts",
        "Only handling data privacy compliance paperwork",
      ],
      correctIndex: 1,
      explanation:
        "The CDO is a strategic executive role responsible for the organization's overall data vision. They establish governance frameworks (access controls, quality standards, lifecycle management), drive data literacy across the organization, align data initiatives with business strategy, and ensure regulatory compliance. The CDO bridges business leadership and technical teams, making data a recognized enterprise asset rather than a byproduct of operations.",
    },
    {
      question: "What is 'data lineage' and why does it matter for enterprise AI governance?",
      options: [
        "The geographic origin of where data was physically stored",
        "A documented record of data's origins, transformations, movements, and usage across systems, enabling traceability and auditability",
        "A lineage of data scientists who contributed to a dataset",
        "The chronological order in which databases were created",
      ],
      correctIndex: 1,
      explanation:
        "Data lineage tracks the complete lifecycle of data — where it originated, what transformations were applied, which systems it passed through, and who consumed it. For AI governance, this is critical: when a model produces a biased or incorrect output, lineage allows you to trace back through the data pipeline to identify the root cause (a bad upstream source, a transformation error, or an aggregation bug). It's also essential for regulatory compliance like GDPR's right to explanation.",
    },
    {
      question: "Which approach best addresses the challenge of data silos in large enterprises?",
      options: [
        "Prohibit any department from creating their own databases",
        "Implement a unified data platform with API-based access, shared data catalogs, and cross-functional data governance while respecting domain ownership",
        "Merge all departments into a single team so they share the same database",
        "Ignore silos since cloud storage has eliminated the problem",
      ],
      correctIndex: 1,
      explanation:
        "Data silos emerge because different departments adopt different tools and develop data independently. A unified data platform doesn't force everyone into one tool — it provides shared infrastructure (a data catalog for discoverability, APIs for access, governance policies for quality) while allowing domains to maintain ownership. Technologies like data virtualization, metadata catalogs (e.g., DataHub, Amundsen), and federated governance models address silos without disrupting existing workflows.",
    },
  ],

  // Day 68 — AI for HR & Talent Management
  68: [
    {
      question: "What is the primary risk of using AI-powered resume screening without proper safeguards?",
      options: [
        "The AI will be too slow to process large volumes of applications",
        "The system may perpetuate or amplify historical hiring biases present in training data, leading to discriminatory outcomes against protected groups",
        "The AI will hire unqualified candidates because it cannot verify credentials",
        "Resume screening AI is always 100% fair and objective",
      ],
      correctIndex: 1,
      explanation:
        "Amazon's discontinued hiring tool is the canonical example: trained on 10 years of hiring data that skewed male, it penalized resumes containing the word 'women's' and downgraded graduates of all-women's colleges. AI resume screeners learn patterns from historical data, which encodes past biases. Without bias auditing, disparate impact analysis, and human oversight, these systems can systematically disadvantage candidates based on gender, ethnicity, age, or disability — creating legal liability and ethical harm.",
    },
    {
      question: "How can AI improve employee retention prediction models?",
      options: [
        "By tracking employee keystrokes and mouse movements to detect disengagement",
        "By analyzing patterns across engagement surveys, performance metrics, compensation data, tenure, manager relationships, and career progression signals to identify flight-risk employees early",
        "By automatically sending resignation letters to employees predicted to leave",
        "By monitoring employees' personal social media accounts for dissatisfaction",
      ],
      correctIndex: 1,
      explanation:
        "Effective retention models synthesize multiple signals: declining engagement survey scores, reduced participation in optional activities, performance trend changes, compensation compression relative to market, tenure milestones, and even organizational changes like manager turnover. Machine learning identifies non-obvious correlations (e.g., an employee whose peers have all been promoted while they haven't is at higher risk). This enables proactive interventions — career conversations, compensation adjustments, or role changes — before the employee starts job searching.",
    },
    {
      question: "What is 'skills-based hiring' and how does AI enable it?",
      options: [
        "Hiring people based solely on their personality and cultural fit",
        "A hiring approach that prioritizes demonstrated skills and competencies over traditional proxies like degrees and job titles, enabled by AI assessments that evaluate actual capability",
        "Hiring only people with PhDs in computer science",
        "Using AI to replace all human judgment in the hiring process",
      ],
      correctIndex: 1,
      explanation:
        "Skills-based hiring removes degree requirements and focuses on what candidates can actually do. AI enables this through adaptive assessments, coding challenges, situational judgment tests, and simulations that evaluate real competencies. This expands the talent pool (many skilled workers lack traditional credentials), reduces bias (first-generation college graduates, career changers), and produces better hiring outcomes — research shows skills assessments are 2-3x more predictive of job performance than educational background.",
    },
    {
      question: "Why should AI-generated interview questions be validated by HR professionals before use?",
      options: [
        "Because AI cannot generate interview questions at all",
        "Because AI may generate questions that are culturally biased, legally problematic, or irrelevant to job requirements, and HR professionals ensure compliance and job-relatedness",
        "Because AI-generated questions are always too easy",
        "Because HR professionals need to take credit for the AI's work",
      ],
      correctIndex: 1,
      explanation:
        "AI can draft structured interview questions, but HR validation is essential because: (1) questions may inadvertently probe protected characteristics (marital status, religion, plans for children), (2) they may not align with the specific competency framework for the role, (3) they may contain cultural assumptions that disadvantage certain candidates, and (4) legal standards vary by jurisdiction. Human review ensures questions are legally compliant, job-related, consistently applied across candidates, and aligned with structured interviewing best practices.",
    },
    {
      question: "What is 'organizational network analysis' (ONA) and how can AI enhance it?",
      options: [
        "Analyzing the company's IT network infrastructure for security vulnerabilities",
        "Mapping communication patterns, collaboration networks, and influence structures within an organization, enhanced by AI's ability to detect hidden patterns, key connectors, and emerging silos from email, meeting, and messaging data",
        "Conducting employee satisfaction surveys using AI chatbots",
        "Analyzing the organizational chart to determine reporting lines",
      ],
      correctIndex: 1,
      explanation:
        "ONA maps how work actually happens — who collaborates with whom, who the informal leaders are, and where communication bottlenecks exist. This is distinct from the org chart, which shows formal reporting. AI analyzes metadata from communication tools (email frequency, Slack interactions, meeting co-attendance) to reveal: key influencers who aren't in leadership roles, teams that are siloed from the rest of the organization, new hires who haven't integrated into networks, and the impact of reorganizations on collaboration patterns.",
    },
    {
      question: "What legal consideration is most important when deploying AI in employee performance management?",
      options: [
        "Ensuring the AI runs fast enough to process all reviews before the deadline",
        "Ensuring the AI system does not discriminate based on protected characteristics, that employees are informed about AI use, and that meaningful human review of AI-generated recommendations is maintained",
        "Making sure the AI system has a user-friendly interface for managers",
        "Ensuring the AI only generates positive reviews to boost morale",
      ],
      correctIndex: 1,
      explanation:
        "Several jurisdictions (EU AI Act, NYC Local Law 144, Illinois AIPA) impose specific requirements on AI in employment: transparency about AI use, bias audits by independent auditors, human-in-the-loop requirements, and employee right to challenge automated decisions. Even where not legally required, best practice mandates that AI assists rather than replaces human judgment in performance decisions, and that employees understand how AI factors into evaluations. Failure to comply creates significant legal and reputational risk.",
    },
  ],

  // Day 72 — AI-Driven Decision Systems
  72: [
    {
      question: "What is the difference between 'decision automation' and 'decision augmentation' in AI systems?",
      options: [
        "They are synonyms — both mean AI makes all decisions without human input",
        "Decision automation replaces human judgment entirely for specific decisions, while decision augmentation provides AI-generated recommendations that humans use to make the final decision",
        "Decision augmentation is a more advanced form of decision automation",
        "Decision automation is only for small decisions, while augmentation is only for large ones",
      ],
      correctIndex: 1,
      explanation:
        "Decision automation (e.g., approving a credit card transaction below $50 for a customer in good standing) removes the human from the loop for high-volume, low-risk, rules-based decisions. Decision augmentation (e.g., a clinical decision support system recommending treatment options) keeps the human as the final authority, using AI to surface patterns and probabilities the human might miss. The choice between them depends on risk tolerance, regulatory requirements, decision complexity, and the cost of errors.",
    },
    {
      question: "What is 'model explainability' and why is it critical for high-stakes AI decisions?",
      options: [
        "The process of explaining to executives why AI projects are over budget",
        "The ability to understand and articulate why an AI model made a specific prediction or decision, critical for trust, regulatory compliance, debugging, and accountability",
        "Simplifying the model's user interface so non-technical people can use it",
        "Documenting the model's training cost and runtime performance",
      ],
      correctIndex: 1,
      explanation:
        "When AI denies a loan, recommends a medical treatment, or flags an employee for termination, stakeholders need to understand why. Explainability methods (SHAP values, LIME, attention visualization, counterfactual explanations) illuminate which features drove a specific prediction. This is critical for: regulatory compliance (ECOA requires specific reasons for credit denials), debugging (identifying when the model relies on spurious correlations), trust-building (users adopt systems they understand), and accountability (someone must be able to justify AI-assisted decisions).",
    },
    {
      question: "What is a 'decision intelligence' platform and how does it differ from traditional BI?",
      options: [
        "It's just a rebranded version of Tableau or Power BI",
        "It integrates data engineering, ML modeling, simulation, and human judgment into a unified framework for making complex decisions, going beyond BI's descriptive analytics to prescriptive and causal analysis",
        "It's a tool that makes decisions automatically so humans never need to think",
        "It's a dashboard that shows more charts than traditional BI tools",
      ],
      correctIndex: 1,
      explanation:
        "Traditional BI answers 'what happened?' (descriptive) and 'what will happen?' (predictive). Decision intelligence adds 'what should we do?' (prescriptive) and 'why did this happen?' (causal). It combines causal inference, simulation, optimization, and human judgment frameworks to support complex decisions. For example, instead of just showing last quarter's sales (BI), a DI platform might simulate the impact of three different pricing strategies, account for competitive reactions, and recommend the optimal approach with quantified uncertainty.",
    },
    {
      question: "What is 'algorithmic accountability' in the context of AI-driven organizational decisions?",
      options: [
        "The algorithm's ability to account for its own computational costs",
        "The principle that organizations must be able to explain, audit, and take responsibility for the outcomes of AI-driven decisions, including identifying who is liable when decisions cause harm",
        "The algorithm's capability to balance its own budget",
        "The requirement that algorithms must be written in open-source programming languages",
      ],
      correctIndex: 1,
      explanation:
        "Algorithmic accountability establishes that deploying AI doesn't transfer responsibility — the organization remains accountable for outcomes. This means: maintaining audit trails of AI decisions, being able to explain why specific outcomes occurred, having humans who can override AI recommendations, establishing clear governance on who authorizes AI deployment, and creating remediation processes when AI causes harm. The EU AI Act and emerging US regulations formalize these requirements for high-risk AI applications.",
    },
    {
      question: "Why is it dangerous to optimize a single metric with AI decision systems?",
      options: [
        "Because single-metric optimization is always computationally expensive",
        "Because AI will find perverse ways to maximize the metric that conflict with broader business goals (Goodhart's Law), creating unintended consequences and gaming behavior",
        "Because single metrics are too simple for AI to learn from",
        "Because stakeholders prefer dashboards with many metrics",
      ],
      correctIndex: 1,
      explanation:
        "Goodhart's Law states: 'When a measure becomes a target, it ceases to be a good measure.' If you optimize AI solely for click-through rate, you get clickbait. If you optimize solely for call handle time, agents rush through calls. If you optimize solely for code deployment frequency, quality suffers. Robust AI decision systems use multi-objective optimization with balanced KPIs, guardrails preventing gaming, and periodic human review to ensure the system's behavior aligns with genuine business value.",
    },
    {
      question: "What is 'human-in-the-loop' (HITL) and when should it be required for AI decision systems?",
      options: [
        "A situation where a human physically plugs cables into the AI server",
        "A design pattern where AI generates recommendations but a qualified human reviews and approves decisions before they are executed, required for high-stakes, irreversible, or legally regulated decisions",
        "A training technique where humans label data for the AI",
        "An IT support model where humans troubleshoot AI system outages",
      ],
      correctIndex: 1,
      explanation:
        "HITL is essential when decisions are high-stakes (medical diagnosis, hiring, credit approval), irreversible (terminating employee access, revoking licenses), legally regulated (EU AI Act mandates it for high-risk systems), or where AI confidence is low. The human brings contextual judgment, ethical reasoning, and accountability that AI lacks. Design effective HITL by: defining clear escalation criteria, setting response time SLAs, training humans to critically evaluate AI output (not just rubber-stamp), and measuring override rates to improve the system over time.",
    },
  ],

  // Day 75 — AI Project Management
  75: [
    {
      question: "Why do traditional waterfall project management methodologies often fail for AI/ML projects?",
      options: [
        "Because AI projects don't need any planning or structure",
        "Because AI projects involve inherent uncertainty — you don't know if the model will achieve target performance until you experiment, requiring iterative discovery rather than fixed sequential phases",
        "Because waterfall is only used by government projects, which don't use AI",
        "Because AI projects are always small enough to complete in a single sprint",
      ],
      correctIndex: 1,
      explanation:
        "Waterfall assumes requirements are well-understood and the path to completion is predictable. AI projects involve fundamental uncertainty: Will the data be sufficient quality? Can the model achieve acceptable accuracy? Will stakeholders accept the tradeoffs? These questions can only be answered through experimentation. Agile and iterative approaches (sprints, experiment-driven development) allow teams to fail fast, validate assumptions early, pivot based on results, and progressively converge on viable solutions rather than committing to a fixed plan that may prove invalid.",
    },
    {
      question: "What is an AI project 'proof of concept' (PoC) and how should success criteria be defined?",
      options: [
        "A fully deployed production system that processes real customer data",
        "A time-boxed experiment that validates technical feasibility and business value on a representative data subset, with predefined success criteria like minimum accuracy thresholds, latency benchmarks, and business impact estimates",
        "A written proposal describing what the AI system might do someday",
        "A demo using synthetic data that looks impressive but hasn't been tested on real data",
      ],
      correctIndex: 1,
      explanation:
        "A well-scoped PoC answers: 'Can this work in our environment with our data?' Success criteria should be defined before the PoC begins and include both technical metrics (e.g., 'model achieves >85% precision on our test set, <200ms inference latency') and business metrics (e.g., 'demonstrates >15% improvement over current process'). This prevents scope creep, provides objective go/no-go decision points, and ensures the PoC is designed to answer the specific questions leadership needs answered before committing to full investment.",
    },
    {
      question: "What is the most common reason AI projects fail after successful PoCs?",
      options: [
        "The AI model stops working after 6 months for no reason",
        "The 'last mile' challenges of productionization — data pipeline reliability, integration with existing systems, model monitoring, scaling infrastructure, and organizational change management are underestimated",
        "Stakeholders lose interest because AI is no longer trendy",
        "The data scientists leave to join competing companies",
      ],
      correctIndex: 1,
      explanation:
        "Research shows ~85% of AI projects fail to reach production. The PoC proves the model works in a controlled setting, but production requires: robust data pipelines that handle edge cases, integration with legacy systems, monitoring for model drift and data quality, infrastructure that scales, user training and adoption, and ongoing governance. Organizations that treat the PoC as the finish line rather than a checkpoint in a longer journey consistently underestimate the engineering, change management, and operational investment required to deliver sustained value.",
    },
    {
      question: "How should AI project success metrics differ from traditional software project metrics?",
      options: [
        "They shouldn't differ — use the same on-time, on-budget metrics as any IT project",
        "AI projects need dual metrics: delivery metrics (timeline, budget) plus performance metrics (model accuracy, data quality, business impact, fairness) that evolve as the model encounters real-world data",
        "AI projects only need to track model accuracy — budget and timeline don't matter",
        "AI projects should only be measured by the number of experiments run",
      ],
      correctIndex: 1,
      explanation:
        "Traditional software either works or doesn't — binary success criteria. AI systems operate on a spectrum of quality and degrade over time as data distributions shift. Effective AI project metrics include: delivery metrics (scope, schedule, budget), model performance metrics (accuracy, precision, recall, latency), business impact metrics (revenue uplift, cost reduction, time saved), operational metrics (uptime, drift detection, retraining frequency), and fairness metrics (demographic parity, equalized odds). This multi-dimensional view captures the full health of an AI initiative.",
    },
    {
      question: "What is 'technical debt' in AI/ML systems and why is it particularly dangerous?",
      options: [
        "The cost of purchasing GPU hardware for model training",
        "Accumulated shortcuts in data pipelines, model code, experimentation artifacts, and infrastructure that make the system increasingly difficult to maintain, modify, and debug — exacerbated by the experimental, iterative nature of ML development",
        "The salary owed to data scientists who work on the project",
        "The electricity costs of running model inference at scale",
      ],
      correctIndex: 1,
      explanation:
        "ML systems accumulate unique forms of technical debt: undocumented feature engineering logic, 'dead' experiment code branches, untested data transformations, model dependency chains, and pipelines that nobody fully understands. Google's landmark paper 'Hidden Technical Debt in Machine Learning Systems' found that ML code is a tiny fraction of the overall system — the surrounding infrastructure, data management, and monitoring create massive debt. Unlike traditional code, ML debt compounds silently because models can degrade without triggering obvious errors.",
    },
    {
      question: "What role does a Product Owner play differently in AI projects versus traditional software projects?",
      options: [
        "The role is identical — write user stories and prioritize the backlog",
        "In AI projects, the Product Owner must manage probabilistic outcomes, communicate uncertainty to stakeholders, balance experimentation with delivery, and make scope decisions based on model performance signals rather than binary feature completeness",
        "AI projects don't need Product Owners because data scientists make all decisions",
        "The Product Owner in AI projects only handles documentation",
      ],
      correctIndex: 1,
      explanation:
        "AI POs face unique challenges: they must translate business requirements into ML objectives (what does 'good enough' mean for a prediction model?), manage stakeholder expectations about probabilistic outcomes ('the model is 87% accurate' vs. 'the feature is done'), decide when to iterate vs. ship, and prioritize between model improvement and operational readiness. They need enough technical literacy to understand model limitations and enough business acumen to ensure the AI delivers measurable value rather than becoming a perpetual research project.",
    },
  ],

  // Day 79 — Revenue Operations with AI
  79: [
    {
      question: "How does AI transform traditional sales forecasting?",
      options: [
        "AI replaces the need for any forecasting since it can predict the future perfectly",
        "AI augments human forecasting by analyzing pipeline data, deal velocity, historical patterns, and external signals to produce probabilistic forecasts with quantified confidence intervals, replacing gut-feel estimates",
        "AI only makes forecasting more complicated without improving accuracy",
        "AI forecasting only works for B2C companies, not B2B",
      ],
      correctIndex: 1,
      explanation:
        "Traditional sales forecasting relies on rep intuition ('I think this deal is 80% likely') which research shows is consistently over-optimistic. AI models analyze objective signals: how many stakeholders are engaged, deal progression velocity compared to similar won deals, email sentiment, competitive mentions, and historical conversion rates by segment. The output is a probabilistic forecast (65% chance of closing this quarter, with a $180K-$240K range) that gives RevOps teams more accurate pipeline visibility and enables better resource allocation.",
    },
    {
      question: "What is 'lead scoring' and how does AI improve upon rule-based scoring?",
      options: [
        "Assigning random scores to leads to make the sales team feel productive",
        "Ranking prospects by their likelihood to convert, improved by AI through analyzing hundreds of behavioral and firmographic signals simultaneously, detecting non-obvious patterns, and continuously learning from outcomes — whereas rule-based scoring uses simple static criteria",
        "Counting how many times a lead appears in the CRM database",
        "Asking leads to self-report their interest level on a scale of 1-10",
      ],
      correctIndex: 1,
      explanation:
        "Rule-based lead scoring uses simple heuristics: 'Downloaded whitepaper = +5 points, VP title = +10 points, visited pricing page = +15 points.' This ignores complex interactions and signal decay. AI lead scoring analyzes hundreds of features simultaneously: content engagement patterns, firmographic fit, technographic data, engagement recency and frequency, buying committee composition, and comparison to historical conversion profiles. It continuously retrains as new data comes in, capturing shifting buyer behavior that static rules miss.",
    },
    {
      question: "What is 'revenue intelligence' and how does it differ from traditional CRM reporting?",
      options: [
        "Revenue intelligence is just a fancy name for CRM dashboards with more charts",
        "Revenue intelligence uses AI to automatically capture, analyze, and surface actionable insights from sales interactions (calls, emails, meetings) to identify deal risks, coaching opportunities, and pipeline trends invisible in manual CRM entry",
        "Revenue intelligence replaces the need for a CRM system entirely",
        "Revenue intelligence only analyzes financial accounting data",
      ],
      correctIndex: 1,
      explanation:
        "Traditional CRM data depends on reps manually logging activity, which is incomplete, biased, and retrospective. Revenue intelligence platforms use AI to automatically analyze call recordings (sentiment, talk-to-listen ratio, competitor mentions), email threads (response patterns, stakeholder engagement), and meeting transcripts to surface insights like: a deal stalled because the economic buyer disengaged, a rep is discounting more than peers, or a key champion left the company. This provides real-time, evidence-based intelligence that manual CRM data cannot.",
    },
    {
      question: "How can AI optimize pricing strategies in revenue operations?",
      options: [
        "By always recommending the lowest possible price to maximize volume",
        "By analyzing willingness-to-pay signals, competitive positioning, deal context, customer segmentation, and historical win rates to recommend optimal price points that maximize revenue per deal while maintaining competitive win rates",
        "By letting sales reps set whatever price they think is best",
        "AI cannot help with pricing — pricing should only be determined by finance teams",
      ],
      correctIndex: 1,
      explanation:
        "AI pricing optimization considers: customer segment (enterprise vs. SMB willingness to pay), deal context (urgency, competitive pressure, budget cycle), product configuration (which features drive value for this buyer), historical data (what price points won similar deals), and market signals (competitor pricing, industry benchmarks). Dynamic pricing models recommend the optimal price-point and discount range for each specific deal, helping reps maximize revenue without the systematic over-discounting that occurs when reps prioritize close probability over margin.",
    },
    {
      question: "What is the 'churn prediction' use case in revenue operations and how does AI drive retention value?",
      options: [
        "Predicting which customers will upgrade their subscriptions",
        "Identifying customers at risk of cancelling or not renewing by analyzing engagement patterns, support ticket trends, usage decline signals, and satisfaction scores — enabling proactive retention interventions before the renewal conversation",
        "Counting how many customers the company has lost in the past year",
        "Sending automated cancellation emails to customers AI predicts will leave",
      ],
      correctIndex: 1,
      explanation:
        "Churn prediction models analyze leading indicators of customer dissatisfaction: declining product usage, increased support ticket frequency or severity, reduced engagement with onboarding content, delayed payments, and negative sentiment in communications. Early identification enables Customer Success to intervene with targeted retention plays: executive business reviews, additional training, product feature requests, or pricing adjustments. Companies using AI-driven churn prediction typically reduce churn by 10-25% because they act months before traditional health score dashboards flag the risk.",
    },
  ],

  // Day 82 — Franchise Operating Model
  82: [
    {
      question: "How can AI standardize operations across franchise locations while allowing local adaptation?",
      options: [
        "AI forces all locations to follow identical procedures with zero flexibility",
        "AI provides a centralized intelligence layer (demand forecasting, pricing optimization, inventory management) with configurable parameters that local operators can adjust based on regional preferences, while maintaining brand standards",
        "AI only works at the corporate level and has no relevance to individual franchise locations",
        "AI eliminates the need for local franchise operators entirely",
      ],
      correctIndex: 1,
      explanation:
        "The franchise model balances brand consistency with local market responsiveness. AI enables this through: centralized models for demand forecasting and inventory optimization that incorporate local variables (weather, events, demographics), standardized dashboards for operational KPIs with location-specific benchmarks, AI-driven training and compliance monitoring, and pricing engines that allow local operators to set prices within corporate-approved ranges based on local demand elasticity. This gives franchisees data-driven decision support while preserving the autonomy that makes franchising effective.",
    },
    {
      question: "What is the biggest operational challenge AI can solve for franchise networks?",
      options: [
        "Making all franchise locations look identical aesthetically",
        "Inventory management — AI can predict demand at each location to optimize stock levels, reduce waste (critical for food franchises), and minimize stockouts across hundreds or thousands of locations simultaneously",
        "Replacing franchisees with fully automated stores",
        "Designing better logos for franchise branding",
      ],
      correctIndex: 1,
      explanation:
        "Inventory is one of the largest controllable costs for franchise networks, especially in food and beverage. AI demand forecasting at the location level considers: historical sales patterns, day-of-week and time-of-day seasonality, local weather, nearby events, promotional calendars, and even social media trends. For a 500-location franchise, even a 5% reduction in food waste translates to millions in annual savings. AI enables location-specific ordering recommendations while allowing corporate to monitor compliance and aggregate purchasing for volume discounts.",
    },
    {
      question: "How should franchisors approach AI adoption governance across their network?",
      options: [
        "Force all franchisees to adopt whatever AI tools the franchisor selects with no input",
        "Establish a franchise technology advisory council, provide vetted AI tool options, create shared data standards, and offer tiered support (basic analytics for smaller operators, advanced ML for larger multi-unit owners)",
        "Leave each franchisee entirely on their own to find and implement AI tools",
        "Prohibit AI use at the franchisee level to maintain control",
      ],
      correctIndex: 1,
      explanation:
        "Effective franchise AI governance balances standardization with flexibility. A franchise technology advisory council (with franchisee representation) builds buy-in and surfaces practical needs. Providing vetted options (preferred vendor lists, co-developed tools) ensures quality while allowing choice. Shared data standards enable network-wide analytics without mandating specific implementations. Tiered support recognizes that a single-unit operator and a 50-unit multi-unit franchisee have different needs, budgets, and technical capabilities.",
    },
    {
      question: "What role does AI play in franchise site selection for new locations?",
      options: [
        "AI randomly selects locations to ensure geographic diversity",
        "AI analyzes demographic data, traffic patterns, competitive density, real estate costs, local economic indicators, and comparable location performance to predict revenue potential and optimal placement for new franchise sites",
        "Site selection is purely a real estate decision with no data input needed",
        "AI only recommends locations in major metropolitan areas",
      ],
      correctIndex: 1,
      explanation:
        "AI-powered site selection dramatically improves franchise success rates by analyzing: foot traffic and drive-time demographics, competitor proximity and market saturation, local income levels and spending patterns, parking accessibility, visibility scores, proximity to complementary businesses, and historical performance of existing locations with similar profiles. This data-driven approach reduces the failure rate of new franchise locations (traditionally ~20% fail within 5 years) and helps both franchisors and franchisees make more confident investment decisions.",
    },
    {
      question: "How does AI help franchise networks maintain quality and compliance across locations?",
      options: [
        "By sending corporate inspectors to visit each location annually",
        "By analyzing point-of-sale data, customer reviews, operational metrics, and even computer vision on store conditions to automatically flag deviations from brand standards and predict quality issues before they impact customers",
        "By reducing quality standards to make compliance easier",
        "By leaving quality management entirely to individual franchisees",
      ],
      correctIndex: 1,
      explanation:
        "AI-powered quality monitoring aggregates signals from multiple sources: POS transaction data (speed of service anomalies), customer review sentiment analysis (detecting emerging complaints about cleanliness or service), employee scheduling patterns (understaffing risks), food safety temperature logs (IoT sensor data), and computer vision (checking menu board compliance, store cleanliness from security cameras). This creates a continuous, data-driven quality assurance system that flags issues in real-time rather than relying on periodic inspections that franchisees can prepare for in advance.",
    },
  ],

  // Day 86 — Hiring & Building AI Teams
  86: [
    {
      question: "What is the ideal team composition for a production-grade AI initiative?",
      options: [
        "One data scientist who can do everything",
        "A cross-functional team including data engineers, ML engineers, data scientists, product managers, domain experts, and DevOps/MLOps — each bringing specialized skills to different stages of the AI lifecycle",
        "A team of ten data scientists with no engineers or product managers",
        "Only software engineers, since AI is just another software feature",
      ],
      correctIndex: 1,
      explanation:
        "Production AI requires diverse skills across the lifecycle: domain experts define the problem, product managers prioritize use cases, data engineers build reliable pipelines, data scientists develop and validate models, ML engineers productionize and optimize, DevOps/MLOps handles deployment and monitoring, and ethicists ensure responsible AI. A team of only data scientists produces great notebooks that never reach production. A team of only engineers builds systems without analytical rigor. The cross-functional model ensures every stage from problem definition to monitoring is expertly handled.",
    },
    {
      question: "How should companies evaluate AI talent beyond traditional technical interviews?",
      options: [
        "Only look at the number of GitHub contributions and Kaggle rankings",
        "Assess end-to-end thinking: can the candidate scope a business problem, evaluate data quality, select appropriate methods, communicate results to stakeholders, and consider ethical implications — not just implement an algorithm",
        "Only evaluate candidates based on their degree from a top university",
        "Focus solely on whether they can implement transformer architectures from scratch",
      ],
      correctIndex: 1,
      explanation:
        "The best AI practitioners aren't just technical — they can translate business problems into ML formulations, recognize when data quality makes a problem unsolvable with current methods, choose appropriate (not just sophisticated) approaches, communicate uncertainty to non-technical stakeholders, and consider fairness and ethical implications. Evaluation should include: a business problem framing exercise, a data quality assessment task, a model selection discussion, a stakeholder communication simulation, and yes, some technical implementation. This holistic assessment identifies people who create business value, not just technical artifacts.",
    },
    {
      question: "What is the 'build vs. buy vs. partner' decision framework for AI capabilities?",
      options: [
        "Always build everything in-house to maintain full control",
        "Evaluate each AI capability based on: strategic importance (core differentiator vs. commodity), available talent, time-to-market requirements, and total cost of ownership — build strategic differentiators, buy commodity capabilities, partner for emerging areas",
        "Always buy AI solutions since building is too expensive",
        "Always partner with startups since they are more innovative than internal teams",
      ],
      correctIndex: 1,
      explanation:
        "The framework requires evaluating each AI capability on two dimensions: strategic value (does it differentiate us?) and feasibility (can we realistically build it?). Core differentiators with available talent → build in-house. Commodity capabilities (OCR, sentiment analysis, fraud detection) → buy from vendors who have specialized expertise. Emerging or complex capabilities → partner with startups or research institutions. This approach optimizes for competitive advantage while minimizing waste on undifferentiated work and reducing time-to-market.",
    },
    {
      question: "Why is 'AI literacy' training important for non-technical employees in an AI-forward organization?",
      options: [
        "So they can start writing Python code and replace the data science team",
        "So they can productively collaborate with AI teams, understand AI outputs and limitations, identify AI opportunities in their domain, and avoid common pitfalls like misinterpreting model outputs or over-trusting AI recommendations",
        "It's not important — only AI engineers need to understand AI",
        "So they can impress their friends at dinner parties with AI terminology",
      ],
      correctIndex: 1,
      explanation:
        "AI literacy for non-technical staff serves multiple critical purposes: domain experts who understand AI can identify high-value use cases and specify requirements effectively, managers who understand probabilistic outputs can make better decisions about when to trust AI recommendations, sales teams who understand AI can communicate its value to customers, and all employees who understand AI's limitations are less likely to be misled by hype or make dangerous assumptions about AI capabilities. AI literacy isn't about making everyone a practitioner — it's about making everyone an effective collaborator.",
    },
    {
      question: "What is the most effective retention strategy for AI talent?",
      options: [
        "Offer the highest salary possible — AI talent is purely motivated by compensation",
        "Provide a combination of competitive compensation, meaningful problems to solve, access to modern tools and compute, learning opportunities, publication-friendly culture, and clear career progression paths for both technical and management tracks",
        "Restrict access to job postings so employees can't see opportunities elsewhere",
        "Assign AI talent to maintenance tasks on legacy systems to keep them busy",
      ],
      correctIndex: 1,
      explanation:
        "AI talent retention requires addressing what makes this talent unique: they are intellectually motivated by challenging problems and will leave if doing 'glamour ML' work becomes data janitoring. Key retention levers: competitive compensation (table stakes, not sufficient alone), access to interesting problems at scale, modern infrastructure (nothing frustrates ML engineers more than slow GPUs and ancient tooling), learning budgets and conference attendance, a culture that values experimentation and tolerates intelligent failure, and dual career tracks (Individual Contributor path to Principal/Staff level, plus management path).",
    },
    {
      question: "How should an organization structure its AI Center of Excellence (CoE)?",
      options: [
        "As a siloed team that does all AI work for the entire company",
        "As a hub-and-spoke model where the CoE sets standards, builds shared infrastructure, and develops talent, while embedded 'spoke' teams within business units develop domain-specific AI solutions using CoE-provided platforms",
        "As a temporary consulting engagement that is dissolved after 6 months",
        "As a research lab focused only on publishing papers",
      ],
      correctIndex: 1,
      explanation:
        "The hub-and-spoke CoE model balances centralization and decentralization. The central hub provides: shared ML infrastructure (feature stores, model registries, monitoring), governance standards (responsible AI guidelines, model approval processes), talent development (training programs, hiring standards), and reusable assets (common libraries, templates). Spoke teams embedded in business units develop solutions with deep domain context. This avoids the bottleneck of a centralized team that becomes a queue, and the chaos of fully decentralized teams that duplicate work and create inconsistent governance.",
    },
  ],

  // Day 89 — Final Milestone: Launch Ready
  89: [
    {
      question: "What does 'launch ready' mean for an enterprise AI system, and what distinguishes it from a successful PoC?",
      options: [
        "Launch ready means the PoC demo impressed the CEO",
        "Launch ready means the system handles production-scale data, has robust monitoring and alerting, includes rollback procedures, has passed security and compliance reviews, has trained operational staff, and has defined SLAs — going far beyond PoC's proof of technical feasibility",
        "Launch ready means the model accuracy reached 99% on test data",
        "Launch ready simply means the code has been committed to the main branch",
      ],
      correctIndex: 1,
      explanation:
        "A successful PoC proves 'this can work.' Launch ready means 'this will reliably work in production at scale.' The gap includes: infrastructure that handles peak load, data pipelines with error handling and retry logic, model monitoring for drift and performance degradation, automated retraining pipelines, security hardening and penetration testing, privacy compliance verification (GDPR, CCPA), operational runbooks and incident response procedures, SLA definitions with uptime and latency commitments, user training and change management completion, and rollback procedures for when things go wrong.",
    },
    {
      question: "What is the most critical post-launch activity for AI systems?",
      options: [
        "Immediately starting to build the next AI project and forgetting about this one",
        "Continuous monitoring of model performance, data quality, and business impact — detecting drift, degradation, and unintended consequences — combined with a structured retraining and improvement cycle",
        "Disabling the system if any single prediction is incorrect",
        "Publishing a press release about the successful launch and moving on",
      ],
      correctIndex: 1,
      explanation:
        "AI systems are unique in that they degrade over time — data distributions shift, user behavior changes, new edge cases emerge, and models that performed well initially can silently deteriorate. Continuous monitoring must track: model performance metrics (accuracy, latency), data quality metrics (completeness, schema adherence, distribution shifts), business impact metrics (are we actually achieving the expected outcomes?), and fairness metrics. Without this, organizations often discover performance problems months after they began, when significant business damage has already occurred.",
    },
    {
      question: "How should organizations measure the ROI of their AI investments?",
      options: [
        "AI ROI cannot be measured — it's purely a technology experiment",
        "Compare total investment (talent, infrastructure, data, time) against quantified business outcomes (revenue generated, costs avoided, time saved, risk reduced) using both direct measurement and controlled experiments to establish causal attribution",
        "Only count the revenue generated by AI models directly",
        "Measure ROI quarterly and shut down any project that doesn't show immediate returns",
      ],
      correctIndex: 1,
      explanation:
        "AI ROI requires accounting for the full cost structure (data engineering, model development, infrastructure, monitoring, ongoing retraining, opportunity cost of talent) against both direct and indirect benefits. Direct benefits include measurable revenue increase or cost reduction. Indirect benefits include improved decision quality, risk mitigation, employee productivity gains, and customer experience improvements. Controlled experiments (A/B testing, holdout groups) help establish causal attribution. ROI timelines should account for AI's investment curve — initial costs precede returns, and value compounds over time.",
    },
    {
      question: "What is an 'AI operating model' and why does every enterprise need one?",
      options: [
        "An AI operating model is simply the cloud provider you choose for hosting",
        "A comprehensive framework defining how the organization develops, deploys, monitors, and governs AI systems — including roles and responsibilities, processes, technology stack, governance policies, and performance management — ensuring AI scales sustainably beyond individual projects",
        "An AI operating model is a theoretical research framework with no practical application",
        "An AI operating model is the same as a traditional IT operating model with AI tools added",
      ],
      correctIndex: 1,
      explanation:
        "Without an operating model, AI exists as isolated experiments that never scale. An AI operating model defines: organizational structure (CoE vs. embedded vs. hybrid), roles and responsibilities (who owns model performance, data quality, governance), processes (experiment tracking, model approval, production deployment, incident response), technology platform (ML infrastructure, tools, standards), governance (ethics review, regulatory compliance, risk management), and performance management (how AI initiatives are measured and held accountable). This transforms AI from ad-hoc projects into a sustained organizational capability.",
    },
    {
      question: "What is the single most important factor in ensuring AI initiatives deliver sustained business value?",
      options: [
        "Using the most advanced deep learning architecture available",
        "Deep integration with business processes and change management — AI only creates value when it changes how people make decisions or do their work, which requires organizational adoption, not just technical deployment",
        "Having the largest data science team in the industry",
        "Choosing the cloud provider with the most GPUs",
      ],
      correctIndex: 1,
      explanation:
        "The graveyard of AI initiatives is full of technically excellent models that nobody used. Sustained value requires: identifying problems that matter to the business (not 'cool' AI for its own sake), designing AI as part of workflows (not separate dashboards people ignore), investing in user training and trust-building, iterating based on user feedback, and continuously measuring and communicating business impact. Technology is necessary but not sufficient — the organization must change how it operates to capture AI's value, and that change management is where most AI initiatives underinvest.",
    },
    {
      question: "After launching an AI system, what governance process should be established for ongoing model updates?",
      options: [
        "Data scientists can update models whenever they want without any approval process",
        "A structured model lifecycle management process including version control, change documentation, impact assessment, testing against validation datasets, staged rollout, and monitoring — similar to software release management but adapted for probabilistic systems",
        "No updates should ever be made after the initial launch to avoid disrupting the system",
        "All model updates must be approved by the legal team only",
      ],
      correctIndex: 1,
      explanation:
        "AI model updates are fundamentally different from software patches — they can change the system's behavior in unpredictable ways. A robust model lifecycle process includes: version control for models and training data, documentation of what changed and why, offline evaluation against holdout datasets and fairness metrics, A/B testing or shadow deployment for impact assessment, staged rollout with monitoring for degradation, and rollback procedures if problems emerge. This balances the need for continuous improvement with the risk of introducing regressions or bias into production decisions.",
    },
  ],
}

// ─── ASSIGNMENTS ────────────────────────────────────────────────────────────

export const phase3Assignments: Record<number, string> = {
  // Day 66 — Building Internal AI Tools
  66: `## Building Internal AI Tools

### Overview

Design and prototype an internal AI-powered tool that addresses a real operational pain point within your organization. This assignment focuses on identifying high-value internal use cases, building a minimum viable product (MVP), and developing a deployment plan that accounts for organizational readiness.

### Requirements

1. **Problem Identification**: Document a specific operational inefficiency or decision-making bottleneck in your organization. Quantify the current cost (time, money, error rate) and define what success looks like.

2. **Solution Design**: Propose an AI-powered tool that addresses this problem. Your design must include:
   - What AI technique(s) you would use and why (e.g., NLP for document processing, classification for routing, generative AI for content creation)
   - What data sources the tool would consume and how data would be sourced
   - The user interface concept — how would employees interact with the tool?
   - Integration points with existing systems (CRM, ERP, Slack, etc.)

3. **MVP Prototype**: Build a working prototype using Streamlit, Gradio, or a simple web framework. The prototype should demonstrate core functionality with sample or synthetic data, even if it cannot yet connect to production data sources.

4. **Deployment Strategy**: Write a deployment plan that covers:
   - Phased rollout approach (pilot group → department → organization-wide)
   - Data security and access control considerations
   - Monitoring and feedback collection mechanisms
   - Rollback plan if the tool underperforms

### Deliverables

- A written problem assessment with quantified impact
- Architecture diagram showing data flow, AI components, and integration points
- Working prototype (code + deployment instructions)
- Deployment and change management plan
- 5-minute internal pitch deck for stakeholder buy-in

### Evaluation Criteria

- **Problem Relevance** (25%): Does the tool solve a genuine, quantified business problem?
- **Technical Feasibility** (25%): Is the AI approach realistic given available data and skills?
- **Prototype Quality** (25%): Does the MVP demonstrate core functionality convincingly?
- **Deployment Thinking** (25%): Does the plan account for real-world organizational constraints?`,

  // Day 73 — Team Leadership in AI Era
  73: `## Team Leadership in the AI Era

### Overview

Develop a comprehensive team leadership plan for managing a cross-functional AI team. This assignment focuses on the unique leadership challenges posed by AI projects — managing uncertainty, bridging technical and business communication, fostering experimentation, and delivering value iteratively.

### Requirements

1. **Team Design**: Design an AI team structure for a mid-size organization (500-2000 employees) launching its first enterprise AI initiative. Define:
   - Roles needed (and rationale for each)
   - Reporting structure and dotted-line relationships
   - Whether to use a Center of Excellence, embedded, or hybrid model — and justify your choice
   - Budget estimates for team composition

2. **Communication Framework**: Create a communication plan that addresses:
   - How you will translate AI uncertainty into business language for executive stakeholders
   - How you will manage expectations when experiments fail or models underperform
   - Cadence and format for progress reporting (what gets reported, how often, to whom)
   - How you will build AI literacy across the broader organization

3. **Delivery Methodology**: Define how your team will deliver AI projects:
   - Sprint cadence and ceremony structure adapted for AI work
   - How you will balance experimentation with delivery pressure
   - Definition of done criteria for AI deliverables (distinct from traditional software)
   - How you will prioritize between model improvement and operational excellence

4. **Career Development**: Design a career framework for AI team members:
   - Dual career tracks (individual contributor and management)
   - Skills progression ladder with specific milestones
   - How you will retain talent (compensation, culture, growth opportunities)
   - Knowledge sharing and learning mechanisms

### Deliverables

- Team org chart with role descriptions and justifications
- Communication plan template (including executive dashboard mockup)
- Sprint framework document adapted for AI projects
- Career ladder document with progression criteria
- 90-day onboarding plan for the team

### Evaluation Criteria

- **Organizational Awareness** (25%): Does the plan reflect real organizational dynamics and constraints?
- **Leadership Depth** (25%): Does it address the unique challenges of leading AI teams (uncertainty, experimentation, cross-functional complexity)?
- **Practical Applicability** (25%): Could this plan be implemented starting next week?
- **People Focus** (25%): Does it prioritize team growth, retention, and well-being alongside delivery?`,

  // Day 80 — Enterprise Sales Playbook
  80: `## Enterprise Sales Playbook for AI Solutions

### Overview

Create a comprehensive enterprise sales playbook for selling AI-powered solutions to B2B customers. This assignment focuses on understanding the unique challenges of selling AI — longer sales cycles, need for proof-of-concept, managing skepticism, navigating technical evaluations, and building trust with both technical and executive buyers.

### Requirements

1. **Buyer Persona Development**: Define at least three distinct buyer personas for your AI solution:
   - Technical buyer (CTO, VP Engineering, Data Lead)
   - Business buyer (COO, VP Operations, Line-of-Business Leader)
   - Economic buyer (CFO, CEO, Board member)
   For each persona, document their primary concerns, decision criteria, objections, and the metrics they care about.

2. **Sales Process Design**: Map a complete enterprise AI sales process:
   - Lead qualification criteria (what makes a prospect a good fit?)
   - Discovery questions specific to AI (data readiness, use case clarity, organizational maturity)
   - Demo strategy (what to show, what to avoid, how to handle technical deep-dives)
   - Proof-of-concept scoping and success criteria definition
   - Pricing and packaging strategy (subscription, usage-based, value-based)
   - Contract and procurement navigation for AI-specific terms (data ownership, model IP, SLAs)

3. **Objection Handling Guide**: Develop responses to the 10 most common enterprise objections to AI:
   - "Our data isn't good enough"
   - "AI is just a black box — we can't trust it"
   - "We tried AI before and it didn't work"
   - "We don't have the talent to maintain this"
   - At least 6 additional objections with detailed responses

4. **Competitive Positioning**: Create a competitive analysis framework:
   - How to position against "build in-house" alternatives
   - How to differentiate from other AI vendors
   - How to handle "we're waiting for the technology to mature" objections
   - ROI calculator framework for customer business cases

### Deliverables

- Complete buyer persona cards with selling strategies
- End-to-end sales process flowchart with stage gates
- Objection handling playbook (minimum 10 objections)
- Competitive positioning battlecard
- Sample demo script with talk tracks for different buyer personas
- ROI calculator template with customizable inputs

### Evaluation Criteria

- **Buyer Understanding** (25%): Do personas reflect real enterprise buying dynamics?
- **Process Rigor** (25%): Is the sales process realistic for complex AI sales cycles?
- **Sales Readiness** (25%): Could a new AE use this playbook to start selling within 30 days?
- **Competitive Awareness** (25%): Does the positioning demonstrate deep understanding of the competitive landscape and common AI adoption barriers?`,

  // Day 87 — AI Innovation Roadmap
  87: `## AI Innovation Roadmap

### Overview

Develop a three-year AI innovation roadmap for a real or realistic organization, covering technology evolution, capability building, use case progression, and organizational maturity. This capstone assignment synthesizes everything from Phase 3 into a strategic planning document that a leadership team could act on.

### Requirements

1. **Current State Assessment**: Using an AI maturity model framework, assess the organization's current state across these dimensions:
   - Data infrastructure and quality
   - AI/ML talent and capabilities
   - Technology stack and tools
   - Governance and ethical frameworks
   - Business process integration
   - Executive sponsorship and culture
   Assign a maturity level (1-5) for each dimension with justification.

2. **Three-Year Vision**: Define what "AI-competitive" looks like for this organization in three years:
   - Strategic AI use cases ranked by business impact and feasibility
   - Target maturity levels for each dimension
   - Competitive advantages AI will enable
   - Key milestones and checkpoints (quarterly)

3. **Technology Roadmap**: Detail the technical evolution required:
   - Infrastructure evolution (cloud strategy, compute needs, data platform)
   - Model capability progression (from simple analytics to advanced ML to generative AI)
   - MLOps maturity (manual → automated → self-service → autonomous)
   - Integration architecture evolution

4. **Organizational Roadmap**: Plan the people and process evolution:
   - Hiring plan aligned with use case progression
   - Training and upskilling program for existing employees
   - Governance framework development timeline
   - Change management milestones

5. **Investment and ROI Projection**: Provide financial projections:
   - Year-by-year investment requirements (talent, infrastructure, tools, training)
   - Expected ROI timeline and quantified business value
   - Risk-adjusted scenarios (optimistic, realistic, conservative)
   - Funding model recommendations

### Deliverables

- Current state maturity assessment with scored dimensions
- Three-year roadmap document with quarterly milestones
- Technology architecture evolution diagram
- Organizational change management plan
- Financial model with three scenarios
- Executive summary (2-page max) suitable for board presentation
- Risk register with mitigation strategies

### Evaluation Criteria

- **Strategic Vision** (25%): Is the roadmap ambitious yet realistic, with clear rationale for prioritization?
- **Technical Depth** (20%): Does the technology roadmap reflect understanding of AI infrastructure and capability evolution?
- **Organizational Awareness** (20%): Does the plan account for real organizational constraints, politics, and change management?
- **Financial Rigor** (20%): Are projections reasonable with appropriate assumptions and scenarios?
- **Executive Communication** (15%): Could the summary document drive a board-level conversation about AI investment?`,
}

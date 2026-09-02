import { PrismaClient, SessionType, SessionStatus } from '@prisma/client'
import { getWeek1Theory, getWeek1Quiz, getWeek1AIContext, getWeek1Assignment } from './seed-week1-content'

const prisma = new PrismaClient()

const phase1Titles = [
  "Welcome to Nitai — Your AI Journey Begins",
  "What is AI? Foundations & Core Concepts",
  "Setting Up Your AI Workspace",
  "Introduction to Prompt Engineering",
  "Crafting Effective Prompts",
  "Advanced Prompt Patterns",
  "Prompt Chaining & Sequencing",
  "AI Content Creation Basics",
  "Blog Writing with AI Assistants",
  "Social Media Content Strategy",
  "Email Marketing with AI",
  "AI Image Generation Fundamentals",
  "Midjourney & DALL·E Prompting",
  "Creating Visual Brand Assets",
  "AI Video Script Writing",
  "Voiceovers & AI Audio Production",
  "Editing with AI Tools",
  "AI for Research & Analysis",
  "Data Interpretation with AI",
  "AI Spreadsheet Automation",
  "Building a Personal Brand with AI",
  "AI-Driven Lead Generation",
  "Client Communication with AI",
  "Freelancing with AI Tools",
  "Pricing Your AI Services",
  "Building Your First AI Offer",
  "Portfolio Building with AI",
  "AI Ethics & Responsible Use",
  "First Credit Payout Milestone",
  "Phase 1 Review & Certification"
]

const phase2Titles = [
  "Introduction to AI Automation",
  "Workflow Mapping & Design",
  "No-Code Automation Tools",
  "Building AI Chatbots",
  "Customer Support Automation",
  "Email Automation Sequences",
  "Social Media Scheduling Bots",
  "AI CRM Integration",
  "Lead Scoring with AI",
  "Automated Reporting Systems",
  "AI Agent Architecture",
  "Building Multi-Agent Systems",
  "Agent Memory & Context",
  "Tool-Using AI Agents",
  "Web Research Agents",
  "Data Extraction Pipelines",
  "AI Content Repurposing Systems",
  "Automated SEO Optimization",
  "AI Analytics Dashboards",
  "Client Onboarding Automation",
  "Building Your Agency Stack",
  "Service Packaging for Clients",
  "Client Acquisition Playbook",
  "Proposal Writing with AI",
  "Delivering AI Projects",
  "Scaling Client Deliverables",
  "Team Workflow Automation",
  "Quality Assurance with AI",
  "Revenue Milestone: First $1K",
  "Phase 2 Review & Certification"
]

const phase3Titles = [
  "Enterprise AI Strategy",
  "AI Transformation Roadmap",
  "Enterprise Architecture Planning",
  "AI Security & Compliance",
  "Enterprise Data Strategy",
  "Building Internal AI Tools",
  "Enterprise Chatbot Deployment",
  "AI for HR & Talent Management",
  "AI-Powered Financial Analysis",
  "Supply Chain AI Optimization",
  "Enterprise Content Management",
  "AI-Driven Decision Systems",
  "Team Leadership in AI Era",
  "Managing AI Development Teams",
  "AI Project Management",
  "Agile for AI Projects",
  "Stakeholder Communication",
  "ROI Measurement for AI",
  "Revenue Operations with AI",
  "Enterprise Sales Playbook",
  "Partnership Development",
  "Franchise Operating Model",
  "White-Label Platform Strategy",
  "Building Recurring Revenue",
  "Scaling to Enterprise Clients",
  "Hiring & Building AI Teams",
  "AI Innovation Roadmap",
  "Exit Strategy & Beyond",
  "Final Milestone: Launch Ready",
  "Graduation & Franchise Access"
]

const sessionTypePerDayInWeek: Record<number, SessionType> = {
  1: SessionType.THEORY,
  2: SessionType.QUIZ,
  3: SessionType.PROJECT,
  4: SessionType.THEORY,
  5: SessionType.QUIZ,
  6: SessionType.LIVE_INTERACTIVE,
  7: SessionType.LIVE_INTERACTIVE,
}

function getPhase(day: number): { phase: number; phaseName: string } {
  if (day <= 30) return { phase: 1, phaseName: "Hustler" }
  if (day <= 60) return { phase: 2, phaseName: "Automation Agency" }
  return { phase: 3, phaseName: "Enterprise" }
}

function getWeekNumber(day: number): number {
  return Math.ceil(day / 7)
}

function getDayInWeek(day: number): number {
  const d = day % 7
  return d === 0 ? 7 : d
}

function getDayInPhase(day: number): number {
  if (day <= 30) return day
  if (day <= 60) return day - 30
  return day - 60
}

function getCredits(dayInWeek: number, phase: number): number {
  const idx = dayInWeek - 1
  if (phase === 1) return 25 + (idx % 3) * 10
  if (phase === 2) return 35 + (idx % 3) * 15
  return 50 + (idx % 3) * 25
}

function getTitle(day: number): string {
  if (day <= 30) return phase1Titles[day - 1]
  if (day <= 60) return phase2Titles[day - 31]
  return phase3Titles[day - 61]
}

function getPhaseStartDate(phase: number): Date {
  if (phase === 1) return new Date("2025-01-06")
  if (phase === 2) return new Date("2025-02-03")
  return new Date("2025-03-03")
}

function getPhaseEndDate(phase: number): Date {
  if (phase === 1) return new Date("2025-02-02")
  if (phase === 2) return new Date("2025-03-02")
  return new Date("2025-04-01")
}

// --- Content Generators ---

function generateContentMarkdown(day: number, title: string, sessionType: SessionType): string {
  const week1Content = getWeek1Theory(day)
  if (week1Content) return week1Content

  const phase = getPhase(day)
  const dw = getDayInWeek(day)
  const ip = getDayInPhase(day)

  if (phase.phase === 1) {
    return generatePhase1Content(day, title, dw, ip, sessionType)
  } else if (phase.phase === 2) {
    return generatePhase2Content(day, title, dw, ip, sessionType)
  } else {
    return generatePhase3Content(day, title, dw, ip, sessionType)
  }
}

function generatePhase1Content(day: number, title: string, dw: number, ip: number, st: SessionType): string {
  const base = `# ${title}

## Learning Objectives
- Understand the core concepts covered in today's session
- Apply practical techniques to real-world scenarios
- Build foundational skills for your AI career

## Key Concepts

Today we explore **${title}** in depth. This is a critical skill that forms the backbone of modern AI-assisted work. By mastering these concepts, you will be able to leverage AI tools more effectively in professional settings.

The key principles to internalize are:
1. **Consistency** — Apply the same structured approach every time
2. **Iteration** — Refine your outputs through multiple passes
3. **Context Awareness** — Always provide relevant background information
4. **Quality Control** — Never publish AI output without human review

Understanding how AI models process information helps you craft better inputs. Large Language Models (LLMs) work by predicting the next token based on context, which means the structure and clarity of your prompts directly impact output quality.

When working with AI tools, consider the following workflow:
- Define your goal clearly before starting
- Break complex tasks into smaller, manageable steps
- Use system prompts to set the AI's role and behavior
- Validate outputs against your requirements

`
  if (st === SessionType.THEORY && dw === 1) {
    return base + `## Code Example

Here is a Python example demonstrating today's concept:

\`\`\`python
# Basic AI interaction pattern
from openai import OpenAI

client = OpenAI()

def generate_content(topic: str, style: str = "professional") -> str:
    """Generate content on a given topic with a specified style."""
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": f"You are an expert writer. Write in a {style} tone."},
            {"role": "user", "content": f"Write about {topic}"}
        ],
        temperature=0.7,
        max_tokens=1000
    )
    return response.choices[0].message.content

# Example usage
blog_post = generate_content("the benefits of AI in small business", "conversational")
print(blog_post)
\`\`\`

## Best Practices
- Always review AI-generated content before publishing
- Keep your prompts specific and actionable
- Use temperature settings appropriate for your task (lower = more focused)
- Save successful prompts as templates for reuse

## Summary
Today's lesson established the foundation for ${title.toLowerCase()}. Practice these techniques daily and you will see rapid improvement in your AI-assisted workflow.`
  }

  if (dw === 2) {
    return base + `## Code Example

\`\`\`python
# Structured prompt template system
class PromptTemplate:
    def __init__(self, template: str):
        self.template = template

    def render(self, **kwargs) -> str:
        return self.template.format(**kwargs)

blog_template = PromptTemplate("""
Role: {role}
Audience: {audience}
Topic: {topic}
Tone: {tone}
Length: {length} words

Write a comprehensive blog post on the topic above.
Include:
- An engaging introduction
- {num_sections} main sections with subheadings
- Practical examples
- A compelling conclusion with call to action
""")

prompt = blog_template.render(
    role="AI Content Strategist",
    audience="small business owners",
    topic="automating customer support with AI",
    tone="friendly and professional",
    length=1500,
    num_sections=4
)
print(prompt)
\`\`\`

## Best Practices
- Create reusable templates for common tasks
- Always specify the target audience in prompts
- Include output format requirements
- Test templates with multiple inputs

## Summary
Understanding how AI models process information enables you to craft more effective prompts. Use the structured template approach to ensure consistent, high-quality outputs.`
  }

  return base + `## Code Example

\`\`\`python
# Practical application of today's concepts
import json

def analyze_prompt_quality(prompt: str) -> dict:
    """Analyze a prompt for key quality indicators."""
    indicators = {
        "has_role": "you are" in prompt.lower() or "act as" in prompt.lower(),
        "has_context": len(prompt.split()) > 20,
        "has_constraints": any(w in prompt.lower() for w in ["format", "style", "tone", "length"]),
        "has_examples": "example" in prompt.lower(),
        "word_count": len(prompt.split())
    }
    indicators["score"] = sum([
        indicators["has_role"] * 25,
        indicators["has_context"] * 25,
        indicators["has_constraints"] * 25,
        indicators["has_examples"] * 25
    ])
    return indicators

result = analyze_prompt_quality("You are a marketing expert. Write a professional email.")
print(json.dumps(result, indent=2))
\`\`\`

## Best Practices
- Apply the quality analysis framework to your own prompts
- Continuously refine based on output quality
- Build a personal library of proven prompt patterns

## Summary
Practice applying today's techniques consistently. The skills learned here compound over time and form the foundation for advanced topics ahead.`
}

function generatePhase2Content(day: number, title: string, dw: number, ip: number, st: SessionType): string {
  const base = `# ${title}

## Learning Objectives
- Master AI automation workflows and their practical applications
- Build and deploy automated systems that save time and money
- Understand multi-agent architectures and their business value

## Key Concepts

In the automation agency phase, you transition from using AI tools individually to building integrated systems. **${title}** is essential for creating scalable AI solutions that deliver real business value.

Modern AI automation relies on several pillars:
1. **Workflow Orchestration** — Chaining multiple AI steps into coherent pipelines
2. **Event-Driven Architecture** — Triggering automation based on real-world events
3. **State Management** — Maintaining context across multi-step processes
4. **Error Handling** — Graceful degradation and retry mechanisms
5. **Monitoring & Observability** — Tracking automation performance

The difference between a hobbyist and a professional lies in building reliable, maintainable systems. Every automation you build should handle edge cases, log its actions, and be easy to debug.

`
  if (dw === 1) {
    return base + `## Code Example

\`\`\`python
# AI Automation Pipeline
from dataclasses import dataclass
from typing import List, Callable
import json

@dataclass
class PipelineStep:
    name: str
    func: Callable
    retries: int = 3

class AIAutomationPipeline:
    def __init__(self, name: str):
        self.name = name
        self.steps: List[PipelineStep] = []

    def add_step(self, name: str, func: Callable, retries: int = 3):
        self.steps.append(PipelineStep(name, func, retries))
        return self

    def execute(self, initial_data: dict) -> dict:
        data = initial_data
        results = {"pipeline": self.name, "steps": []}

        for step in self.steps:
            for attempt in range(step.retries):
                try:
                    data = step.func(data)
                    results["steps"].append({
                        "step": step.name,
                        "status": "success",
                        "attempt": attempt + 1
                    })
                    break
                except Exception as e:
                    if attempt == step.retries - 1:
                        results["steps"].append({
                            "step": step.name,
                            "status": "failed",
                            "error": str(e)
                        })
                        raise
        results["output"] = data
        return results

# Usage example
def extract_topics(data: dict) -> dict:
    data["topics"] = ["AI automation", "workflow design"]
    return data

def generate_content(data: dict) -> dict:
    data["content"] = [f"Content about {t}" for t in data["topics"]]
    return data

pipeline = AIAutomationPipeline("content-generation")
pipeline.add_step("extract_topics", extract_topics)
pipeline.add_step("generate_content", generate_content)

result = pipeline.execute({"source": "blog_writing"})
print(json.dumps(result, indent=2))
\`\`\`

## Best Practices
- Design pipelines to be idempotent (safe to retry)
- Log every step for debugging and monitoring
- Use typed data structures to catch errors early

## Summary
Building reliable automation pipelines is the core skill of an AI agency. Start with simple two-step pipelines and progressively add complexity as you gain confidence.`
  }

  if (dw === 6 || dw === 7) {
    return base + `## Live Session Materials

In today's live interactive session, we will:

- Review automation workflows built this week
- Debug common issues in AI pipelines
- Discuss real-world client scenarios
- Q&A on implementation challenges

## Preparation
1. Have your automation code ready for review
2. Prepare 2-3 questions about challenges you've faced
3. Review the session notes from this week

## Key Discussion Points
- How to structure multi-agent systems for client projects
- Cost optimization strategies for API calls
- Scaling automation from prototype to production

## Summary
Participate actively in the live session. The interactive format allows you to get personalized feedback on your automation work.`
  }

  return base + `## Code Example

\`\`\`python
# Building a client-ready automation module
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class ClientAutomation:
    """Reusable automation module for client projects."""

    def __init__(self, client_id: str, api_key: str):
        self.client_id = client_id
        self.api_key = api_key
        self._validate_config()

    def _validate_config(self):
        if not self.api_key:
            raise ValueError("API key is required")
        logger.info(f"Initialized automation for client {self.client_id}")

    def process_data(self, input_data: dict, template: str) -> dict:
        """Process input data through an AI pipeline."""
        logger.info(f"Processing data for {self.client_id}")
        return {
            "client_id": self.client_id,
            "status": "completed",
            "output": f"Processed with template: {template}",
            "input_summary": list(input_data.keys())
        }

# Client deployment example
automation = ClientAutomation("client_001", "sk-demo-key")
result = automation.process_data(
    {"topic": "email marketing", "audience": "SMBs"},
    "professional_email"
)
print(result)
\`\`\`

## Best Practices
- Build modular, reusable components for client work
- Always validate configuration before deployment
- Use logging to track automation execution

## Summary
The ability to build professional automation modules distinguishes agency-grade work from hobby projects. Focus on reliability and maintainability.`
}

function generatePhase3Content(day: number, title: string, dw: number, ip: number, st: SessionType): string {
  const base = `# ${title}

## Learning Objectives
- Understand enterprise-level AI strategy and implementation
- Design scalable AI solutions for large organizations
- Lead AI transformation initiatives with measurable ROI

## Key Concepts

Enterprise AI requires a fundamentally different approach than small business implementations. **${title}** is about building systems that serve hundreds or thousands of users, comply with strict regulations, and deliver measurable business outcomes.

Enterprise AI considerations:
1. **Governance & Compliance** — Meeting regulatory requirements across industries
2. **Scalability Architecture** — Designing for growth without rewrites
3. **Security First** — Protecting sensitive data at every layer
4. **Change Management** — Helping organizations adopt AI successfully
5. **ROI Measurement** — Proving business value with concrete metrics

The franchise model we teach enables you to replicate proven enterprise solutions across multiple clients, creating leverage and recurring revenue.

`
  if (dw === 1) {
    return base + `## Code Example

\`\`\`python
# Enterprise AI deployment configuration
from dataclasses import dataclass, field
from typing import List, Dict
import json

@dataclass
class EnterpriseConfig:
    organization: str
    industry: str
    compliance_requirements: List[str] = field(default_factory=list)
    data_retention_days: int = 90
    max_concurrent_users: int = 1000
    audit_logging: bool = True

    def to_deployment_spec(self) -> dict:
        return {
            "org": self.organization,
            "industry": self.industry,
            "infrastructure": {
                "max_users": self.max_concurrent_users,
                "retention_days": self.data_retention_days,
                "encryption": "AES-256",
                "audit_log": self.audit_logging
            },
            "compliance": self.compliance_requirements,
            "monitoring": {
                "alert_threshold_ms": 500,
                "error_rate_threshold": 0.01,
                "uptime_sla": 99.9
            }
        }

config = EnterpriseConfig(
    organization="Fortune 500 Corp",
    industry="Healthcare",
    compliance_requirements=["HIPAA", "SOC2", "GDPR"],
    max_concurrent_users=5000,
    data_retention_days=365
)

spec = config.to_deployment_spec()
print(json.dumps(spec, indent=2))
\`\`\`

## Best Practices
- Start with compliance requirements before designing architecture
- Build for 10x your expected load from day one
- Implement comprehensive audit logging

## Summary
Enterprise AI is where the highest value and largest contracts live. Master these concepts and you will be positioned to serve the most valuable clients in the market.`
  }

  return base + `## Code Example

\`\`\`python
# Enterprise pattern: ROI tracking system
from datetime import datetime
from typing import List
import json

class ROITracker:
    """Track ROI metrics for enterprise AI deployments."""

    def __init__(self, project_id: str):
        self.project_id = project_id
        self.metrics = []

    def record_metric(self, category: str, value: float, unit: str = "usd"):
        self.metrics.append({
            "timestamp": datetime.now().isoformat(),
            "category": category,
            "value": value,
            "unit": unit
        })

    def calculate_roi(self) -> dict:
        total_savings = sum(m["value"] for m in self.metrics if m["category"] == "savings")
        total_investment = sum(m["value"] for m in self.metrics if m["category"] == "investment")
        roi = ((total_savings - total_investment) / max(total_investment, 1)) * 100
        return {
            "project_id": self.project_id,
            "total_savings": total_savings,
            "total_investment": total_investment,
            "roi_percentage": round(roi, 2),
            "data_points": len(self.metrics)
        }

tracker = ROITracker("enterprise_project_01")
tracker.record_metric("savings", 150000, "usd")
tracker.record_metric("investment", 50000, "usd")
tracker.record_metric("savings", 75000, "usd")

print(json.dumps(tracker.calculate_roi(), indent=2))
\`\`\`

## Best Practices
- Track ROI from project inception
- Present metrics in business terms, not technical terms
- Use dashboards to provide real-time visibility

## Summary
Mastering enterprise AI positions you for the highest-value work in the industry. Focus on measurable outcomes and build repeatable frameworks.`
}

function generateQuiz(day: number, title: string, content: string): any {
  const week1Quiz = getWeek1Quiz(day)
  if (week1Quiz) {
    return {
      questions: week1Quiz,
      passScore: day <= 5 ? 75 : 80,
      timeLimit: day <= 5 ? 20 : 25
    }
  }

  const phase = getPhase(day)

  if (phase.phase === 1) {
    return generatePhase1Quiz(day, title)
  } else if (phase.phase === 2) {
    return generatePhase2Quiz(day, title)
  }
  return generatePhase3Quiz(day, title)
}

function generatePhase1Quiz(day: number, title: string): any {
  const questions = [
    {
      question: `What is the primary goal of ${title.toLowerCase()}?`,
      options: [
        "To replace human workers entirely",
        "To enhance human capabilities and productivity",
        "To make processes more complicated",
        "To eliminate the need for training"
      ],
      correctIndex: 1,
      explanation: "AI tools are designed to augment human capabilities, not replace them. The goal is to make workers more productive and effective."
    },
    {
      question: "Which best describes an effective AI workflow?",
      options: [
        "Copy-pasting the same prompt repeatedly",
        "Iterating and refining prompts based on output quality",
        "Using the longest possible prompts always",
        "Never reviewing AI output before publishing"
      ],
      correctIndex: 1,
      explanation: "Iteration is key to effective AI usage. Reviewing and refining your approach leads to better results over time."
    },
    {
      question: "What should you always do before publishing AI-generated content?",
      options: [
        "Nothing, AI output is always perfect",
        "Have a human review it for accuracy and quality",
        "Run it through three different AI tools",
        "Delete it and start over"
      ],
      correctIndex: 1,
      explanation: "Human review is essential. AI can make mistakes, produce biased content, or miss context-specific requirements."
    },
    {
      question: "What is the recommended approach to learning AI skills?",
      options: [
        "Learn everything at once without practice",
        "Practice daily with small, focused exercises",
        "Only learn theory, never apply it",
        "Copy other people's work exactly"
      ],
      correctIndex: 1,
      explanation: "Daily practice with focused exercises builds skills effectively. Theory without practice does not build competence."
    }
  ]
  return { questions, passScore: 75, timeLimit: 20 }
}

function generatePhase2Quiz(day: number, title: string): any {
  const questions = [
    {
      question: `In the context of ${title.toLowerCase()}, what is the most critical factor?`,
      options: [
        "Using the most expensive tools available",
        "Reliability and graceful error handling",
        "Writing the longest code possible",
        "Ignoring edge cases for speed"
      ],
      correctIndex: 1,
      explanation: "Professional automation must be reliable. Error handling and graceful degradation are essential for production systems."
    },
    {
      question: "What makes an automation pipeline 'production-ready'?",
      options: [
        "It works on your local machine",
        "It has logging, error handling, and monitoring",
        "It uses the latest experimental AI models",
        "It requires no documentation"
      ],
      correctIndex: 1,
      explanation: "Production readiness requires observability, error handling, and documentation to operate reliably at scale."
    },
    {
      question: "How should you handle API rate limits in an automation pipeline?",
      options: [
        "Ignore them and hope for the best",
        "Implement exponential backoff and retry logic",
        "Always use the fastest API available",
        "Never use more than one API call"
      ],
      correctIndex: 1,
      explanation: "Exponential backoff with retry logic is the industry standard for handling transient failures like rate limits."
    },
    {
      question: "What is the primary benefit of modular automation design?",
      options: [
        "Makes code look impressive",
        "Enables reuse and easier maintenance",
        "Increases complexity for job security",
        "Eliminates the need for testing"
      ],
      correctIndex: 1,
      explanation: "Modularity enables reuse across clients and makes systems easier to debug, update, and maintain over time."
    }
  ]
  return { questions, passScore: 75, timeLimit: 20 }
}

function generatePhase3Quiz(day: number, title: string): any {
  const questions = [
    {
      question: `When implementing ${title.toLowerCase()} in an enterprise, what comes first?`,
      options: [
        "Writing code immediately",
        "Understanding compliance and governance requirements",
        "Choosing the newest AI model",
        "Hiring more developers"
      ],
      correctIndex: 1,
      explanation: "Enterprise implementations must start with understanding regulatory requirements. Compliance is non-negotiable."
    },
    {
      question: "How should enterprise AI ROI be measured?",
      options: [
        "By number of lines of code written",
        "By concrete business outcomes and cost savings",
        "By the sophistication of the technology used",
        "By the size of the development team"
      ],
      correctIndex: 1,
      explanation: "Enterprise stakeholders care about business outcomes. ROI must be expressed in terms of cost savings, revenue, or efficiency gains."
    },
    {
      question: "What is the biggest challenge in enterprise AI adoption?",
      options: [
        "Technical limitations of AI models",
        "Change management and organizational culture",
        "Lack of AI tools in the market",
        "Hardware costs only"
      ],
      correctIndex: 1,
      explanation: "Organizational culture and change management are typically the biggest barriers to AI adoption, not technology."
    },
    {
      question: "What should enterprise AI dashboards prioritize?",
      options: [
        "Technical metrics only",
        "Business-relevant metrics accessible to stakeholders",
        "Raw data dumps",
        "Abstract ML performance metrics"
      ],
      correctIndex: 1,
      explanation: "Dashboards must communicate business value in terms stakeholders understand, not just technical metrics."
    }
  ]
  return { questions, passScore: 75, timeLimit: 25 }
}

function generateAssignment(day: number, title: string): any {
  const week1Assignment = getWeek1Assignment(day)
  if (week1Assignment) {
    return {
      prompt: week1Assignment,
      type: "TEXT",
      maxCredits: 50,
      dueDate: null
    }
  }

  const phase = getPhase(day)

  if (phase.phase === 1) {
    return {
      prompt: `**Project: ${title}**

Complete this hands-on project to reinforce today's learning. You will create a practical deliverable that demonstrates your understanding of the concepts covered.

**Requirements:**
1. Create a document or code file that applies the techniques from today's lesson
2. Include real-world examples (not placeholder text)
3. Test your work with at least 3 different inputs
4. Write a brief reflection (100 words) on what you learned

**Deliverables:**
- Your completed work file
- Screenshots or output showing it working
- Brief reflection paragraph

**Grading Criteria:**
- Completeness: All requirements met
- Quality: Thoughtful application, not just copying examples
- Creativity: Your own unique approach to the task`,
      type: "TEXT",
      maxCredits: 50,
      dueDate: null
    }
  }

  if (phase.phase === 2) {
    return {
      prompt: `**Automation Project: ${title}**

Build a working automation prototype that solves a real business problem using the concepts from this lesson.

**Requirements:**
1. Design a workflow that automates at least 3 steps
2. Implement error handling for common failure scenarios
3. Add logging to track execution
4. Create a brief README explaining how to run it

**Deliverables:**
- Working code (Python or no-code tool equivalent)
- Documentation (README.md)
- Error handling demonstration

**Grading Criteria:**
- Functionality: Does it work reliably?
- Architecture: Is it modular and maintainable?
- Error Handling: Does it gracefully handle failures?`,
      type: "TEXT",
      maxCredits: 75,
      dueDate: null
    }
  }

  return {
    prompt: `**Enterprise Project: ${title}**

Design and present an enterprise-level AI solution architecture for the given business scenario.

**Requirements:**
1. Create a comprehensive solution architecture document
2. Include compliance and security considerations
3. Design for scale (1000+ concurrent users)
4. Provide ROI projections with methodology

**Deliverables:**
- Architecture document (3-5 pages)
- ROI projection spreadsheet
- Executive summary (1 page)

**Grading Criteria:**
- Architecture quality and scalability
- Compliance coverage
- Business value and ROI clarity
- Professional presentation`,
    type: "TEXT",
    maxCredits: 100,
    dueDate: null
  }
}

function generateLiveSession(day: number, title: string): any {
  const dw = getDayInWeek(day)
  return {
    scheduledAt: new Date("2025-01-06T18:00:00Z"),
    duration: 90,
    meetLink: `https://meet.google.com/lookup/nitai-${day}-${dw}`,
    recordingUrl: null,
    platform: "Google Meet",
    topic: `${title} — Live Workshop`,
    description: `Interactive session on ${title.toLowerCase()}. Bring your questions and project work for review.`,
    hostName: "Nitai AI Academy Instructor",
    status: SessionStatus.SCHEDULED,
    isPublic: true,
    resources: JSON.stringify([
      { type: "link", title: "Session Slides", url: `https://nitai.academy/slides/day-${day}` },
      { type: "link", title: "Session Recording", url: `https://nitai.academy/recordings/day-${day}`, availableAfter: "session" }
    ])
  }
}

function generateAIContext(day: number, title: string, content: string): any {
  const week1Context = getWeek1AIContext(day, content)
  if (week1Context) {
    return {
      systemPrompt: week1Context.systemPrompt,
      ragChunks: JSON.stringify(week1Context.ragChunks)
    }
  }

  const chunks = content.split("\n\n").filter(c => c.trim().length > 50).slice(0, 8)

  return {
    systemPrompt: `You are an AI tutor for the Nitai AI Academy. You are helping a student who is on Day ${day} of their 90-day AI learning journey. Today's lesson is about "${title}". 

Your role is to:
1. Explain concepts clearly and concisely
2. Provide practical examples relevant to the student's current skill level
3. Encourage the student and celebrate their progress
4. Connect today's content to previous lessons when relevant
5. Be encouraging but honest about areas needing improvement

Keep responses focused and actionable. Use bullet points for clarity when explaining multiple concepts.`,
    ragChunks: JSON.stringify(chunks.map((chunk, i) => ({
      id: `day${day}_chunk${i}`,
      content: chunk.substring(0, 500),
      source: `day_${day}_content`,
      day: day,
      relevance: 1.0 - (i * 0.1)
    })))
  }
}

// --- Main Seed Function ---

async function main() {
  console.log("Starting database seed...\n")

  // Delete all existing data
  console.log("Clearing existing data...")
  await prisma.resource.deleteMany()
  await prisma.moduleAIContext.deleteMany()
  await prisma.liveSession.deleteMany()
  await prisma.assignment.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.module.deleteMany()
  await prisma.week.deleteMany()
  console.log("Existing data cleared.\n")

  // Reset sequences
  console.log("Resetting sequences...")
  await prisma.$executeRaw`ALTER SEQUENCE "Week_id_seq" RESTART WITH 1`
  await prisma.$executeRaw`ALTER SEQUENCE "Module_id_seq" RESTART WITH 1`
  console.log("Sequences reset.\n")

  // Seed Weeks
  console.log("Seeding weeks...")
  const weeksData = []
  const baseDate = new Date("2025-01-06")
  for (let w = 1; w <= 13; w++) {
    const weekStart = new Date(baseDate)
    weekStart.setDate(baseDate.getDate() + (w - 1) * 7)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const { phase, phaseName } = getPhase((w - 1) * 7 + 1)

    weeksData.push({
      weekNumber: w,
      title: `Week ${w}: ${phaseName} Phase — Days ${(w - 1) * 7 + 1}–${w * 7}`,
      phase,
      phaseName,
      startDate: weekStart,
      endDate: weekEnd
    })
  }
  await prisma.week.createMany({ data: weeksData })
  console.log("  ✓ 13 weeks created.\n")

  // Seed Modules
  console.log("Seeding modules...")
  const modulesData = []
  for (let day = 1; day <= 90; day++) {
    const weekNum = getWeekNumber(day)
    const dw = getDayInWeek(day)
    const { phase, phaseName } = getPhase(day)
    const title = getTitle(day)
    const st = sessionTypePerDayInWeek[dw]
    const credits = getCredits(dw, phase)

    modulesData.push({
      weekId: weekNum,
      dayNumber: day,
      dayInWeek: dw,
      weekNumber: weekNum,
      sessionType: st,
      title,
      description: `${title} — ${phaseName} Phase, Day ${day}`,
      contentMarkdown: "", // Will be populated separately
      videoUrl: `https://nitai.academy/videos/day-${day}`,
      creditsReward: credits
    })
  }
  await prisma.module.createMany({ data: modulesData })
  console.log("  ✓ 90 modules created.\n")

  // Now update each module with its content (createMany doesn't support large text well)
  console.log("Generating module content...")
  for (let day = 1; day <= 90; day++) {
    const title = getTitle(day)
    const content = generateContentMarkdown(day, title, sessionTypePerDayInWeek[getDayInWeek(day)])

    await prisma.module.update({
      where: { dayNumber: day },
      data: { contentMarkdown: content }
    })

    if (day % 15 === 0) {
      process.stdout.write(`  Progress: ${day}/90 modules\n`)
    }
  }
  console.log("  ✓ All module content generated.\n")

  // Seed Quizzes
  console.log("Seeding quizzes...")
  const quizzesData = []
  for (let day = 1; day <= 90; day++) {
    const title = getTitle(day)
    const quiz = generateQuiz(day, title)
    quizzesData.push({
      moduleId: day,
      questions: quiz.questions,
      passScore: quiz.passScore,
      timeLimit: quiz.timeLimit
    })
  }
  await prisma.quiz.createMany({ data: quizzesData })
  console.log("  ✓ 90 quizzes created.\n")

  // Seed Assignments (PROJECT days — dayInWeek === 3)
  console.log("Seeding assignments...")
  const assignmentsData = []
  for (let day = 1; day <= 90; day++) {
    const dw = getDayInWeek(day)
    if (dw === 3) {
      const title = getTitle(day)
      const assignment = generateAssignment(day, title)
      assignmentsData.push({
        moduleId: day,
        prompt: assignment.prompt,
        type: assignment.type,
        maxCredits: assignment.maxCredits,
        dueDate: assignment.dueDate
      })
    }
  }
  await prisma.assignment.createMany({ data: assignmentsData })
  console.log(`  ✓ ${assignmentsData.length} assignments created (PROJECT days).\n`)

  // Seed Live Sessions (dayInWeek 6 or 7)
  console.log("Seeding live sessions...")
  const liveSessionsData = []
  for (let day = 1; day <= 90; day++) {
    const dw = getDayInWeek(day)
    if (dw === 6 || dw === 7) {
      const title = getTitle(day)
      const liveSession = generateLiveSession(day, title)
      liveSessionsData.push({
        moduleId: day,
        scheduledAt: liveSession.scheduledAt,
        duration: liveSession.duration,
        meetLink: liveSession.meetLink,
        recordingUrl: liveSession.recordingUrl,
        platform: liveSession.platform,
        topic: liveSession.topic,
        description: liveSession.description,
        hostName: liveSession.hostName,
        status: liveSession.status,
        isPublic: liveSession.isPublic,
        resources: liveSession.resources
      })
    }
  }
  await prisma.liveSession.createMany({ data: liveSessionsData })
  console.log(`  ✓ ${liveSessionsData.length} live sessions created.\n`)

  // Seed Module AI Contexts
  console.log("Seeding module AI contexts...")
  const aiContextsData = []
  for (let day = 1; day <= 90; day++) {
    const title = getTitle(day)
    const content = generateContentMarkdown(day, title, sessionTypePerDayInWeek[getDayInWeek(day)])
    const aiCtx = generateAIContext(day, title, content)
    aiContextsData.push({
      moduleId: day,
      systemPrompt: aiCtx.systemPrompt,
      ragChunks: aiCtx.ragChunks
    })
  }
  await prisma.moduleAIContext.createMany({ data: aiContextsData })
  console.log("  ✓ 90 AI contexts created.\n")

  // Seed Resources
  console.log("Seeding resources...")
  const resourcesData = [
    {
      type: "VIDEO",
      title: "Getting Started with OpenAI API",
      description: "Step-by-step tutorial on setting up your OpenAI API key and making your first API call.",
      url: "https://nitai.academy/resources/video-openai-setup",
      platform: "YouTube",
      scope: "GLOBAL",
      weekNumber: null,
      dayNumber: null,
      phase: null,
      visibility: "PUBLIC",
      isFeatured: true,
      tags: ["api", "openai", "setup", "tutorial"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "DRIVE",
      title: "Prompt Engineering Cheat Sheet",
      description: "Comprehensive cheat sheet covering 50+ prompt patterns for various use cases.",
      url: "https://docs.google.com/document/d/1prompt-engineering-cheat-sheet",
      platform: "Google Docs",
      scope: "GLOBAL",
      weekNumber: null,
      dayNumber: null,
      phase: null,
      visibility: "PUBLIC",
      isFeatured: true,
      tags: ["prompt-engineering", "cheat-sheet", "reference"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "LINK",
      title: "Python for AI — Free Course",
      description: "Comprehensive Python course tailored for AI and automation work.",
      url: "https://nitai.academy/resources/python-ai-course",
      platform: "Nitai Academy",
      scope: "GLOBAL",
      weekNumber: null,
      dayNumber: null,
      phase: null,
      visibility: "PUBLIC",
      isFeatured: false,
      tags: ["python", "programming", "course"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "VIDEO",
      title: "Building Your First AI Chatbot",
      description: "Hands-on walkthrough of building a customer support chatbot from scratch.",
      url: "https://nitai.academy/resources/video-chatbot-build",
      platform: "YouTube",
      scope: "WEEK",
      weekNumber: 4,
      dayNumber: null,
      phase: null,
      visibility: "PUBLIC",
      isFeatured: true,
      tags: ["chatbot", "build", "hands-on"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "LINK",
      title: "Zapier Automation Templates",
      description: "Collection of 20+ pre-built Zapier templates for common business workflows.",
      url: "https://nitai.academy/resources/zapier-templates",
      platform: "Zapier",
      scope: "PHASE",
      weekNumber: null,
      dayNumber: null,
      phase: 2,
      visibility: "PUBLIC",
      isFeatured: false,
      tags: ["zapier", "automation", "templates", "no-code"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "DRIVE",
      title: "Client Proposal Templates",
      description: "Professional proposal templates for AI services. Includes scope, pricing, and timeline formats.",
      url: "https://docs.google.com/spreadsheets/d/client-proposal-templates",
      platform: "Google Sheets",
      scope: "PHASE",
      weekNumber: null,
      dayNumber: null,
      phase: 2,
      visibility: "PUBLIC",
      isFeatured: true,
      tags: ["proposal", "templates", "client", "business"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "VIDEO",
      title: "Enterprise AI Security Best Practices",
      description: "Deep dive into security considerations for enterprise AI deployments.",
      url: "https://nitai.academy/resources/video-ai-security",
      platform: "YouTube",
      scope: "PHASE",
      weekNumber: null,
      dayNumber: null,
      phase: 3,
      visibility: "PUBLIC",
      isFeatured: false,
      tags: ["security", "enterprise", "compliance", "best-practices"],
      createdBy: "Nitai Academy Team"
    },
    {
      type: "LINK",
      title: "ROI Calculator for AI Projects",
      description: "Interactive calculator to estimate ROI for AI automation projects with clients.",
      url: "https://nitai.academy/tools/roi-calculator",
      platform: "Nitai Academy",
      scope: "GLOBAL",
      weekNumber: null,
      dayNumber: null,
      phase: null,
      visibility: "PUBLIC",
      isFeatured: true,
      tags: ["api", "openai", "setup", "tutorial"],
      createdBy: "Nitai Academy Team"
    }
  ]

  await prisma.resource.createMany({ data: resourcesData })
  console.log(`  ✓ ${resourcesData.length} resources created.\n`)

  // Summary
  console.log("=== Seed Complete ===")
  console.log(`  Weeks:    ${weeksData.length}`)
  console.log(`  Modules:  90`)
  console.log(`  Quizzes:  90`)
  console.log(`  Assignments: ${assignmentsData.length}`)
  console.log(`  Live Sessions: ${liveSessionsData.length}`)
  console.log(`  AI Contexts: 90`)
  console.log(`  Resources: ${resourcesData.length}`)
  console.log("\nSeeding finished successfully!")
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log("\nDatabase connection closed.")
  })

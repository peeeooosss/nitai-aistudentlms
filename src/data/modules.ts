export interface Module {
  id: number
  dayNumber: number
  title: string
  phase: 1 | 2 | 3
  phaseName: string
  description: string
  creditsReward: number
  videoUrl?: string
}

const phase1Titles = [
  'Welcome to Nitai — Your AI Journey Begins',
  'What is AI? Foundations & Core Concepts',
  'Setting Up Your AI Workspace',
  'Introduction to Prompt Engineering',
  'Crafting Effective Prompts',
  'Advanced Prompt Patterns',
  'Prompt Chaining & Sequencing',
  'AI Content Creation Basics',
  'Blog Writing with AI Assistants',
  'Social Media Content Strategy',
  'Email Marketing with AI',
  'AI Image Generation Fundamentals',
  'Midjourney & DALL·E Prompting',
  'Creating Visual Brand Assets',
  'AI Video Script Writing',
  'Voiceovers & AI Audio Production',
  'Editing with AI Tools',
  'AI for Research & Analysis',
  'Data Interpretation with AI',
  'AI Spreadsheet Automation',
  'Building a Personal Brand with AI',
  'AI-Driven Lead Generation',
  'Client Communication with AI',
  'Freelancing with AI Tools',
  'Pricing Your AI Services',
  'Building Your First AI Offer',
  'Portfolio Building with AI',
  'AI Ethics & Responsible Use',
  'First Credit Payout Milestone',
  'Phase 1 Review & Certification',
]

const phase2Titles = [
  'Introduction to AI Automation',
  'Workflow Mapping & Design',
  'No-Code Automation Tools',
  'Building AI Chatbots',
  'Customer Support Automation',
  'Email Automation Sequences',
  'Social Media Scheduling Bots',
  'AI CRM Integration',
  'Lead Scoring with AI',
  'Automated Reporting Systems',
  'AI Agent Architecture',
  'Building Multi-Agent Systems',
  'Agent Memory & Context',
  'Tool-Using AI Agents',
  'Web Research Agents',
  'Data Extraction Pipelines',
  'AI Content Repurposing Systems',
  'Automated SEO Optimization',
  'AI Analytics Dashboards',
  'Client Onboarding Automation',
  'Building Your Agency Stack',
  'Service Packaging for Clients',
  'Client Acquisition Playbook',
  'Proposal Writing with AI',
  'Delivering AI Projects',
  'Scaling Client Deliverables',
  'Team Workflow Automation',
  'Quality Assurance with AI',
  'Revenue Milestone: First $1K',
  'Phase 2 Review & Certification',
]

const phase3Titles = [
  'Enterprise AI Strategy',
  'AI Transformation Roadmap',
  'Enterprise Architecture Planning',
  'AI Security & Compliance',
  'Enterprise Data Strategy',
  'Building Internal AI Tools',
  'Enterprise Chatbot Deployment',
  'AI for HR & Talent Management',
  'AI-Powered Financial Analysis',
  'Supply Chain AI Optimization',
  'Enterprise Content Management',
  'AI-Driven Decision Systems',
  'Team Leadership in AI Era',
  'Managing AI Development Teams',
  'AI Project Management',
  'Agile for AI Projects',
  'Stakeholder Communication',
  'ROI Measurement for AI',
  'Revenue Operations with AI',
  'Enterprise Sales Playbook',
  'Partnership Development',
  'Franchise Operating Model',
  'White-Label Platform Strategy',
  'Building Recurring Revenue',
  'Scaling to Enterprise Clients',
  'Hiring & Building AI Teams',
  'AI Innovation Roadmap',
  'Exit Strategy & Beyond',
  'Final Milestone: Launch Ready',
  'Graduation & Franchise Access',
]

export const modules: Module[] = [
  ...phase1Titles.map((title, i) => ({
    id: i + 1,
    dayNumber: i + 1,
    title,
    phase: 1 as const,
    phaseName: 'Hustler',
    description: `Master the fundamentals of AI literacy, prompt engineering, and content creation. Day ${i + 1} of your journey to financial freedom.`,
    creditsReward: 25 + (i % 3) * 10,
    videoUrl: i === 0 ? 'https://drive.google.com/file/d/1zMPXdiptDF6oiM-NlJ4rmmbVUMS40s_-/view?usp=share_link' : undefined,
  })),
  ...phase2Titles.map((title, i) => ({
    id: 31 + i,
    dayNumber: 31 + i,
    title,
    phase: 2 as const,
    phaseName: 'Automation Agency',
    description: `Build and scale your automation agency. Day ${31 + i} focuses on advanced AI systems and client delivery.`,
    creditsReward: 35 + (i % 3) * 15,
  })),
  ...phase3Titles.map((title, i) => ({
    id: 61 + i,
    dayNumber: 61 + i,
    title,
    phase: 3 as const,
    phaseName: 'Enterprise',
    description: `Enterprise-level AI strategy and scaling. Day ${61 + i} prepares you for franchise access and exit readiness.`,
    creditsReward: 50 + (i % 3) * 25,
  })),
]

export function getModuleByDay(dayNumber: number): Module | undefined {
  return modules.find((m) => m.dayNumber === dayNumber)
}

export function getPhaseGradient(phase: number): string {
  switch (phase) {
    case 1: return 'from-cyan-400 to-blue-500'
    case 2: return 'from-purple-400 to-pink-500'
    case 3: return 'from-amber-400 to-orange-500'
    default: return 'from-cyan-400 to-blue-500'
  }
}
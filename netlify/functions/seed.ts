import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'

const WEEKS = [
  { weekNumber: 1, title: 'Week 1: AI Foundations', phase: 1, phaseName: 'Hustler', startDate: new Date('2025-01-06'), endDate: new Date('2025-01-12') },
  { weekNumber: 2, title: 'Week 2: Prompt Engineering', phase: 1, phaseName: 'Hustler', startDate: new Date('2025-01-13'), endDate: new Date('2025-01-19') },
  { weekNumber: 3, title: 'Week 3: Advanced Prompting', phase: 1, phaseName: 'Hustler', startDate: new Date('2025-01-20'), endDate: new Date('2025-01-26') },
  { weekNumber: 4, title: 'Week 4: AI Content Creation', phase: 1, phaseName: 'Hustler', startDate: new Date('2025-01-27'), endDate: new Date('2025-02-02') },
  { weekNumber: 5, title: 'Week 5: AI Automation Basics', phase: 2, phaseName: 'Automation Agency', startDate: new Date('2025-02-03'), endDate: new Date('2025-02-09') },
  { weekNumber: 6, title: 'Week 6: No-Code Automation', phase: 2, phaseName: 'Automation Agency', startDate: new Date('2025-02-10'), endDate: new Date('2025-02-16') },
  { weekNumber: 7, title: 'Week 7: AI Agents & Chatbots', phase: 2, phaseName: 'Automation Agency', startDate: new Date('2025-02-17'), endDate: new Date('2025-02-23') },
  { weekNumber: 8, title: 'Week 8: Agency Systems', phase: 2, phaseName: 'Automation Agency', startDate: new Date('2025-02-24'), endDate: new Date('2025-03-02') },
  { weekNumber: 9, title: 'Week 9: Client Acquisition', phase: 2, phaseName: 'Automation Agency', startDate: new Date('2025-03-03'), endDate: new Date('2025-03-09') },
  { weekNumber: 10, title: 'Week 10: Enterprise AI Strategy', phase: 3, phaseName: 'Enterprise', startDate: new Date('2025-03-10'), endDate: new Date('2025-03-16') },
  { weekNumber: 11, title: 'Week 11: AI Security & Compliance', phase: 3, phaseName: 'Enterprise', startDate: new Date('2025-03-17'), endDate: new Date('2025-03-23') },
  { weekNumber: 12, title: 'Week 12: Scaling & Operations', phase: 3, phaseName: 'Enterprise', startDate: new Date('2025-03-24'), endDate: new Date('2025-03-30') },
  { weekNumber: 13, title: 'Week 13: Graduation & Launch', phase: 3, phaseName: 'Enterprise', startDate: new Date('2025-03-31'), endDate: new Date('2025-04-06') },
]

const SESSION_TYPES: ('THEORY' | 'QUIZ' | 'PROJECT' | 'LIVE_INTERACTIVE')[] = [
  'THEORY', 'QUIZ', 'PROJECT', 'THEORY', 'QUIZ', 'LIVE_INTERACTIVE', 'LIVE_INTERACTIVE'
]

const PHASE_1_TITLES = [
  'Introduction to AI & The Nitai Platform',
  'Understanding LLMs & How They Work',
  'Setting Up Your AI Workspace',
  'Prompt Engineering Fundamentals',
  'Crafting Effective Prompts',
  'Advanced Prompt Patterns',
  'Prompt Chaining & Sequencing',
  'AI Content Creation Basics',
  'Blog Writing with AI',
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
  'Phase 1 Review & Certification',
  'First Credit Payout Milestone',
]

const PHASE_2_TITLES = [
  'Introduction to AI Automation',
  'Workflow Mapping & Design',
  'No-Code Automation Tools (Zapier, Make)',
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

const PHASE_3_TITLES = [
  'Enterprise AI Strategy & Roadmap',
  'Enterprise Architecture Planning',
  'AI Security & Compliance Frameworks',
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
  'Capstone Project Presentation',
]

function getTitle(dayNumber: number): string {
  if (dayNumber <= 30) return PHASE_1_TITLES[dayNumber - 1]
  if (dayNumber <= 60) return PHASE_2_TITLES[dayNumber - 31]
  return PHASE_3_TITLES[dayNumber - 61]
}

function getPhase(dayNumber: number): number {
  if (dayNumber <= 30) return 1
  if (dayNumber <= 60) return 2
  return 3
}

function getPhaseName(dayNumber: number): string {
  if (dayNumber <= 30) return 'Hustler'
  if (dayNumber <= 60) return 'Automation Agency'
  return 'Enterprise'
}

function getCreditsReward(dayNumber: number): number {
  const phase = getPhase(dayNumber)
  const dayInPhase = dayNumber <= 30 ? dayNumber : dayNumber <= 60 ? dayNumber - 30 : dayNumber - 60
  if (phase === 1) return 25 + (dayInPhase % 3) * 10
  if (phase === 2) return 35 + (dayInPhase % 3) * 15
  return 50 + (dayInPhase % 3) * 25
}

function getSessionType(dayInWeek: number): 'THEORY' | 'QUIZ' | 'PROJECT' | 'LIVE_INTERACTIVE' {
  return SESSION_TYPES[dayInWeek - 1]
}

function generateQuizQuestions(dayNumber: number, title: string) {
  const baseQuestions = [
    {
      question: `What is the main focus of ${title}?`,
      options: ['Practical application', 'Theory only', 'Memorization', 'Assessment'],
      correctIndex: 0,
      explanation: 'Each module focuses on practical, applicable skills you can use immediately.'
    },
    {
      question: `Which phase does Day ${dayNumber} belong to?`,
      options: [getPhaseName(dayNumber), 'Phase 1', 'Phase 2', 'Phase 3'],
      correctIndex: 0,
      explanation: `Day ${dayNumber} is part of the ${getPhaseName(dayNumber)} phase.`
    },
    {
      question: `How many credits can you earn on Day ${dayNumber}?`,
      options: [`${getCreditsReward(dayNumber)} credits`, '10 credits', '100 credits', '500 credits'],
      correctIndex: 0,
      explanation: `Completing Day ${dayNumber} rewards ${getCreditsReward(dayNumber)} Nitai Credits.`
    },
    {
      question: `What session type is Day ${dayNumber}?`,
      options: [getSessionType(((dayNumber - 1) % 7) + 1), 'THEORY', 'QUIZ', 'PROJECT'],
      correctIndex: 0,
      explanation: `Day ${dayNumber} is a ${getSessionType(((dayNumber - 1) % 7) + 1).toLowerCase().replace('_', ' ')} session.`
    },
  ]
  return baseQuestions
}

function generateAssignmentPrompt(dayNumber: number, title: string) {
  return `Project for Day ${dayNumber}: ${title}\n\nApply what you learned today to create a practical deliverable.\n\nRequirements:\n- Demonstrate the key concept from today's theory\n- Include real-world example or use case\n- Document your process and results\n- Minimum 200 words\n\nSubmit as text, a link to your work, or upload a file.`
}

function generateAIContext(dayNumber: number, title: string, content: string) {
  const chunks = content.split('\n\n').filter(c => c.trim().length > 50).slice(0, 10)
  return {
    systemPrompt: `You are an AI tutor for Day ${dayNumber}: ${title}. 
You ONLY answer questions using the content from this specific day's module.
If a question is outside this module's scope, politely decline and redirect to the relevant day.
Be encouraging, concise, and use examples from the module content.`,
    ragChunks: chunks.map((chunk, i) => ({
      id: `${dayNumber}-${i}`,
      content: chunk.trim(),
      metadata: { dayNumber, title, chunkIndex: i }
    }))
  }
}

function generateModuleContent(dayNumber: number, title: string): string {
  const phase = getPhase(dayNumber)
  const sessionType = getSessionType(((dayNumber - 1) % 7) + 1)
  
  const theoryTemplate = `# ${title}

## Learning Objectives
By the end of this module, you will:
- Understand the core concepts of ${title.toLowerCase()}
- Apply ${title.toLowerCase()} techniques in real scenarios
- Build a foundation for the next module

## Key Concepts

### 1. Introduction
${title} is a critical skill in your AI journey. This module covers the fundamentals and practical applications.

### 2. Core Principles
- **Principle 1**: Understanding the basics
- **Principle 2**: Practical application
- **Principle 3**: Iterative improvement

### 3. Step-by-Step Guide
1. **Setup**: Prepare your environment
2. **Execute**: Apply the technique
3. **Review**: Analyze results
4. **Iterate**: Improve based on feedback

### 4. Best Practices
- Start simple and increase complexity
- Document your process
- Test with real data
- Get feedback from peers

## Practical Exercise
Complete the hands-on exercise in the Examples section to reinforce your learning.

## Summary
${title} provides the foundation for advancing to more complex topics. Master these concepts before moving forward.`

  const examplesTemplate = `# Real-World Examples: ${title}

## Example 1: Beginner Application
**Scenario**: Applying ${title.toLowerCase()} to a simple use case
**Steps**: 
1. Define the problem
2. Apply the technique
3. Review the output
**Result**: Clear understanding of basic application

## Example 2: Intermediate Use Case
**Scenario**: Real-world project scenario
**Steps**:
1. Analyze requirements
2. Design the approach
3. Implement with AI assistance
4. Validate results
**Result**: Production-ready deliverable

## Example 3: Advanced Implementation
**Scenario**: Complex, multi-step problem
**Steps**:
1. Break down into components
2. Apply chaining techniques
3. Integrate multiple AI tools
4. Optimize for efficiency
**Result**: Scalable solution template

## Templates & Snippets
\`\`\`
# Copy-paste templates for immediate use
[Template 1: Basic prompt structure]
[Template 2: Advanced chain]
[Template 3: Output formatting]
\`\`\`

## Try It Yourself
Use the "Try in Playground" buttons to experiment with these examples.`

  if (sessionType === 'THEORY') return theoryTemplate
  if (sessionType === 'PROJECT') return examplesTemplate
  return theoryTemplate // QUIZ days also have theory content
}

export const handler: NetlifyHandler = async (event) => {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: getCorsHeaders(origin), body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return errorResponse('Method not allowed', 405, origin)
  }

  try {
    const existingWeeks = await prisma.week.count()
    if (existingWeeks > 0) {
      return successResponse({ message: `Database already seeded with ${existingWeeks} weeks` }, 200, origin)
    }

    // Create Weeks
    for (const w of WEEKS) {
      await prisma.week.create({ data: w })
    }

    const weeks = await prisma.week.findMany({ orderBy: { weekNumber: 'asc' } })

    // Create Modules (90 days)
    for (let dayNumber = 1; dayNumber <= 90; dayNumber++) {
      const weekIndex = Math.floor((dayNumber - 1) / 7)
      const dayInWeek = ((dayNumber - 1) % 7) + 1
      const week = weeks[weekIndex]
      const title = getTitle(dayNumber)
      const phase = getPhase(dayNumber)
      const phaseName = getPhaseName(dayNumber)
      const sessionType = getSessionType(dayInWeek)
      const creditsReward = getCreditsReward(dayNumber)
      const contentMarkdown = generateModuleContent(dayNumber, title)
      const videoUrl = dayNumber === 1 ? 'https://drive.google.com/file/d/1zMPXdiptDF6oiM-NlJ4rmmbVUMS40s_-/view?usp=share_link' 
        : dayNumber === 2 ? 'https://drive.google.com/file/d/1t_hrdKRtTQXiTlSNAix51QDcJtvvHU3R/view?usp=share_link' 
        : null

      const module = await prisma.module.create({
        data: {
          weekId: week.id,
          dayNumber,
          dayInWeek,
          weekNumber: week.weekNumber,
          sessionType,
          title: `Day ${dayNumber}: ${title}`,
          description: `Day ${dayNumber} of your 90-day journey. ${sessionType === 'LIVE_INTERACTIVE' ? 'Live interactive session' : 'Self-paced learning with theory, examples, and assessment.'}`,
          contentMarkdown,
          videoUrl,
          creditsReward,
        }
      })

      // Create Quiz for every module (THEORY, QUIZ, PROJECT days have quizzes; LIVE days have light quiz)
      await prisma.quiz.create({
        data: {
          moduleId: module.id,
          questions: generateQuizQuestions(dayNumber, title),
          passScore: 75,
          timeLimit: sessionType === 'QUIZ' ? 30 : 15,
        }
      })

      // Create Assignment for PROJECT days
      if (sessionType === 'PROJECT') {
        await prisma.assignment.create({
          data: {
            moduleId: module.id,
            prompt: generateAssignmentPrompt(dayNumber, title),
            type: 'TEXT',
            maxCredits: 50,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        })
      }

      // Create LiveSession for LIVE_INTERACTIVE days
      if (sessionType === 'LIVE_INTERACTIVE') {
        const sessionDate = new Date(week.startDate)
        sessionDate.setDate(sessionDate.getDate() + dayInWeek - 1)
        sessionDate.setHours(10, 0, 0, 0) // 10 AM IST

        await prisma.liveSession.create({
          data: {
            moduleId: module.id,
            scheduledAt: sessionDate,
            duration: 90,
            timezone: 'Asia/Kolkata',
            platform: 'Zoom',
            meetLink: `https://zoom.us/j/${100000000 + dayNumber}`,
            topic: `Live Session: ${title}`,
            description: `Interactive live session covering ${title}. Join for Q&A, live demos, and peer discussion.`,
            hostName: phase === 1 ? 'Priya Sharma' : phase === 2 ? 'Rahul N.' : 'Amit K.',
            status: dayNumber <= 7 ? 'SCHEDULED' : 'DRAFT',
            isPublic: true,
            resources: [
              { type: 'SLIDES', title: 'Session Slides', url: `https://drive.google.com/dummy/slides-${dayNumber}` },
              { type: 'CODE', title: 'Code Repository', url: `https://github.com/nitai/day-${dayNumber}` },
            ],
          }
        })
      }

      // Create ModuleAIContext
      const aiContext = generateAIContext(dayNumber, title, contentMarkdown)
      await prisma.moduleAIContext.create({
        data: {
          moduleId: module.id,
          systemPrompt: aiContext.systemPrompt,
          ragChunks: aiContext.ragChunks,
        }
      })
    }

    // Create sample Resources
    const sampleResources = [
      { type: 'VIDEO', title: 'Complete Prompt Engineering Course', description: 'Full 4-hour course on prompt engineering', url: 'https://youtube.com/watch?v=prompt-engineering', platform: 'youtube', scope: 'GLOBAL', tags: ['prompting', 'fundamentals'], isFeatured: true, duration: 14400 },
      { type: 'VIDEO', title: 'Chain-of-Thought Deep Dive', description: 'Advanced CoT techniques', url: 'https://youtube.com/watch?v=cot-deep-dive', platform: 'youtube', scope: 'WEEK', weekNumber: 2, tags: ['cot', 'reasoning'], duration: 2700 },
      { type: 'DRIVE', title: 'Prompt Engineering Cheatsheet', description: 'Quick reference PDF', url: 'https://drive.google.com/file/d/cheatsheet', platform: 'drive', scope: 'WEEK', weekNumber: 1, tags: ['reference', 'pdf'] },
      { type: 'DRIVE', title: 'AI Automation Templates', description: 'Ready-to-use Make/Zapier templates', url: 'https://drive.google.com/drive/folders/templates', platform: 'drive', scope: 'PHASE', phase: 2, tags: ['automation', 'templates'] },
      { type: 'LINK', title: 'OpenAI Prompt Guide', description: 'Official OpenAI prompting documentation', url: 'https://platform.openai.com/docs/guides/prompt-engineering', platform: 'openai', scope: 'GLOBAL', tags: ['reference', 'official'] },
      { type: 'LINK', title: 'Anthropic Prompt Library', description: 'Claude prompt examples', url: 'https://docs.anthropic.com/en/prompt-library', platform: 'anthropic', scope: 'GLOBAL', tags: ['reference', 'claude'] },
      { type: 'UPLOAD', title: 'Project Template: AI Agent', description: 'Starter template for AI agent projects', filePath: '/uploads/ai-agent-template.zip', mimeType: 'application/zip', fileSize: 2048000, scope: 'DAY', dayNumber: 15, visibility: 'STUDENTS', tags: ['template', 'project'] },
      { type: 'NOTE', title: 'Week 3 Study Notes', description: 'Compiled notes from Week 3 live sessions', scope: 'WEEK', weekNumber: 3, visibility: 'STUDENTS', tags: ['notes', 'week-3'] },
    ]

    for (const res of sampleResources) {
      await prisma.resource.create({
        data: {
          ...res,
          createdBy: 'admin-seed',
        }
      })
    }

    return successResponse({
      message: 'Database seeded successfully',
      weeks: WEEKS.length,
      modules: 90,
      resources: sampleResources.length,
    }, 201, origin)
  } catch (error) {
    console.error('Seed error:', error)
    return errorResponse('Internal server error', 500, origin)
  }
}
import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'

function generateModules() {
  const modules = []

  for (let i = 0; i < 30; i++) {
    modules.push({
      dayNumber: i + 1,
      title: `Day ${i + 1}: ${['Getting Started', 'Foundation Building', 'Skill Development', 'Practical Application', 'Growth Hacking', 'Market Research', 'Client Acquisition', 'Value Creation', 'Revenue Streams', 'Automation Setup'][i % 10]}`,
      phase: 1,
      phaseName: 'Hustler',
      description: `Day ${i + 1} of your journey. Build the foundation for your AI-powered income stream with hands-on exercises and real-world projects.`,
      creditsReward: 25 + (i % 3) * 10,
      videoUrl: i === 0 ? '/videos/day1.mp4' : null,
    })
  }

  for (let i = 0; i < 30; i++) {
    modules.push({
      dayNumber: i + 31,
      title: `Day ${i + 31}: ${['Agency Model', 'Client Management', 'Service Delivery', 'Team Building', 'Process Automation', 'Scaling Operations', 'Revenue Optimization', 'Market Expansion', 'Brand Building', 'Strategic Planning'][i % 10]}`,
      phase: 2,
      phaseName: 'Automation Agency',
      description: `Day ${i + 31} of your journey. Scale your AI skills into an automation agency with systems and processes.`,
      creditsReward: 35 + (i % 3) * 15,
    })
  }

  for (let i = 0; i < 30; i++) {
    modules.push({
      dayNumber: i + 61,
      title: `Day ${i + 61}: ${['Enterprise Sales', 'Partnership Strategy', 'Global Operations', 'Innovation Lab', 'AI Research', 'Market Leadership', 'Exit Strategy', 'Wealth Management', 'Legacy Building', 'Future Vision'][i % 10]}`,
      phase: 3,
      phaseName: 'Enterprise',
      description: `Day ${i + 61} of your journey. Build an enterprise-level AI business with global reach and lasting impact.`,
      creditsReward: 50 + (i % 3) * 25,
    })
  }

  return modules.sort((a, b) => a.dayNumber - b.dayNumber)
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
    const existingCount = await prisma.module.count()
    if (existingCount > 0) {
      return successResponse({ message: `Database already seeded with ${existingCount} modules` }, 200, origin)
    }

    const modules = generateModules()
    await prisma.module.createMany({ data: modules })

    return successResponse({
      message: 'Database seeded successfully',
      modules: modules.length,
    }, 201, origin)
  } catch (error) {
    console.error('Seed error:', error)
    return errorResponse('Internal server error', 500, origin)
  }
}

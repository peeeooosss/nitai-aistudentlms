import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'

export const handler: NetlifyHandler = async (event) => {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: getCorsHeaders(origin), body: '' }
  }

  const params = event.queryStringParameters || {}

  if (event.httpMethod === 'GET') {
    try {
      const where: any = { isPublic: true }

      if (params.status === 'upcoming') {
        where.scheduledAt = { gte: new Date() }
        where.status = { in: ['SCHEDULED', 'LIVE'] }
      } else if (params.status === 'past') {
        where.status = 'COMPLETED'
      }

      if (params.week) {
        const weekNum = parseInt(params.week)
        where.module = { weekNumber: weekNum }
      }

      const sessions = await prisma.liveSession.findMany({
        where,
        include: { module: { select: { title: true, dayNumber: true, weekNumber: true } } },
        orderBy: { scheduledAt: params.status === 'past' ? 'desc' : 'asc' },
      })

      return successResponse({ sessions }, 200, origin)
    } catch (error) {
      console.error('Get live sessions error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}
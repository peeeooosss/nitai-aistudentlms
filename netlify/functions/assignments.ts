import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { verifyToken, extractToken } from './lib/auth'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'

export const handler: NetlifyHandler = async (event) => {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: getCorsHeaders(origin), body: '' }
  }

  const token = extractToken(event.headers.authorization)
  if (!token) {
    return errorResponse('Unauthorized', 401, origin)
  }

  const payload = verifyToken(token)
  if (!payload) {
    return errorResponse('Invalid token', 401, origin)
  }

  if (event.httpMethod === 'GET') {
    try {
      const assignments = await prisma.assignment.findMany({
        where: { userId: payload.userId },
        include: { module: true },
        orderBy: { submittedAt: 'desc' },
      })

      return successResponse({
        assignments: assignments.map(a => ({
          id: a.id,
          moduleId: a.moduleId,
          moduleTitle: a.module.title,
          status: a.status,
          submittedAt: a.submittedAt,
        })),
      }, 200, origin)
    } catch (error) {
      console.error('Get assignments error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}')
      const { moduleId, content } = body

      if (!moduleId || !content) {
        return errorResponse('moduleId and content are required', 400, origin)
      }

      if (content.length < 20) {
        return errorResponse('Assignment must be at least 20 characters', 400, origin)
      }

      const module = await prisma.module.findUnique({ where: { id: moduleId } })
      if (!module) {
        return errorResponse('Module not found', 404, origin)
      }

      const existing = await prisma.assignment.findUnique({
        where: { userId_moduleId: { userId: payload.userId, moduleId } },
      })

      if (existing) {
        return errorResponse('You have already submitted an assignment for this module', 409, origin)
      }

      const assignment = await prisma.assignment.create({
        data: {
          userId: payload.userId,
          moduleId,
          content,
        },
      })

      return successResponse({
        assignment: {
          id: assignment.id,
          status: assignment.status,
          submittedAt: assignment.submittedAt,
        },
      }, 201, origin)
    } catch (error) {
      console.error('Submit assignment error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}

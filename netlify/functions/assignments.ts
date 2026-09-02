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
      const submissions = await prisma.assignmentSubmission.findMany({
        where: { userId: payload.userId },
        include: { assignment: { include: { module: true } } },
        orderBy: { submittedAt: 'desc' },
      })

      return successResponse({
        submissions: submissions.map(s => ({
          id: s.id,
          assignmentId: s.assignmentId,
          moduleId: s.assignment.moduleId,
          moduleTitle: s.assignment.module.title,
          status: s.status,
          submittedAt: s.submittedAt,
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

      const assignment = await prisma.assignment.findUnique({
        where: { moduleId },
      })
      if (!assignment) {
        return errorResponse('No assignment found for this module', 404, origin)
      }

      const existing = await prisma.assignmentSubmission.findUnique({
        where: { userId_assignmentId: { userId: payload.userId, assignmentId: assignment.id } },
      })

      if (existing) {
        return errorResponse('You have already submitted an assignment for this module', 409, origin)
      }

      const submission = await prisma.assignmentSubmission.create({
        data: {
          userId: payload.userId,
          assignmentId: assignment.id,
          content,
        },
      })

      return successResponse({
        submission: {
          id: submission.id,
          status: submission.status,
          submittedAt: submission.submittedAt,
        },
      }, 201, origin)
    } catch (error) {
      console.error('Submit assignment error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}
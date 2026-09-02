import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { verifyToken, extractToken } from './lib/auth'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'

export const handler: NetlifyHandler = async (event) => {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: getCorsHeaders(origin), body: '' }
  }

  const params = event.queryStringParameters || {}

  if (event.httpMethod === 'GET' && event.path.endsWith('/resources/saved')) {
    const token = extractToken(event.headers.authorization)
    if (!token) return errorResponse('Unauthorized', 401, origin)
    const payload = verifyToken(token)
    if (!payload) return errorResponse('Invalid token', 401, origin)

    try {
      const saved = await prisma.userSavedResource.findMany({
        where: { userId: payload.userId },
        include: { resource: true },
        orderBy: { createdAt: 'desc' },
      })
      return successResponse({ resources: saved.map(s => s.resource) }, 200, origin)
    } catch (error) {
      console.error('Get saved resources error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'GET' && event.path.endsWith('/resources')) {
    try {
      const where: any = { visibility: 'PUBLIC' }

      if (params.type) where.type = params.type
      if (params.scope) where.scope = params.scope
      if (params.week) where.weekNumber = parseInt(params.week)
      if (params.day) where.dayNumber = parseInt(params.day)
      if (params.search) {
        where.OR = [
          { title: { contains: params.search, mode: 'insensitive' } },
          { description: { contains: params.search, mode: 'insensitive' } },
        ]
      }

      const page = parseInt(params.page || '1')
      const limit = parseInt(params.limit || '20')
      const skip = (page - 1) * limit

      const [resources, total] = await Promise.all([
        prisma.resource.findMany({
          where,
          orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
          skip,
          take: limit,
        }),
        prisma.resource.count({ where }),
      ])

      return successResponse({ resources, total, page, limit }, 200, origin)
    } catch (error) {
      console.error('Get resources error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && event.path.match(/\/resources\/[^/]+\/view/)) {
    try {
      const id = event.path.split('/')[2]
      await prisma.resource.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      })
      return successResponse({ message: 'View counted' }, 200, origin)
    } catch (error) {
      console.error('Resource view error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && event.path.match(/\/resources\/[^/]+\/save/)) {
    const token = extractToken(event.headers.authorization)
    if (!token) return errorResponse('Unauthorized', 401, origin)
    const payload = verifyToken(token)
    if (!payload) return errorResponse('Invalid token', 401, origin)

    try {
      const id = event.path.split('/')[2]
      await prisma.userSavedResource.upsert({
        where: { userId_resourceId: { userId: payload.userId, resourceId: id } },
        update: {},
        create: { userId: payload.userId, resourceId: id },
      })
      await prisma.resource.update({
        where: { id },
        data: { saveCount: { increment: 1 } },
      })
      return successResponse({ message: 'Resource saved' }, 200, origin)
    } catch (error) {
      console.error('Save resource error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'DELETE' && event.path.match(/\/resources\/[^/]+\/save/)) {
    const token = extractToken(event.headers.authorization)
    if (!token) return errorResponse('Unauthorized', 401, origin)
    const payload = verifyToken(token)
    if (!payload) return errorResponse('Invalid token', 401, origin)

    try {
      const id = event.path.split('/')[2]
      await prisma.userSavedResource.deleteMany({
        where: { userId: payload.userId, resourceId: id },
      })
      return successResponse({ message: 'Resource unsaved' }, 200, origin)
    } catch (error) {
      console.error('Unsave resource error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Not found', 404, origin)
}
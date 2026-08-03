import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { verifyToken, extractToken, isAdmin } from './lib/auth'
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
      const where = isAdmin(payload.role) ? {} : { active: true }

      const items = await prisma.storeItem.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })

      const userPurchases = await prisma.userStorePurchase.findMany({
        where: { userId: payload.userId },
      })

      return successResponse({
        items: items.map(item => ({
          ...item,
          purchased: userPurchases.some(p => p.itemId === item.id),
        })),
      }, 200, origin)
    } catch (error) {
      console.error('Get store error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST') {
    if (!isAdmin(payload.role)) {
      return errorResponse('Admin access required', 403, origin)
    }

    try {
      const body = JSON.parse(event.body || '{}')
      const { title, category, cost, active, imageUrl } = body

      if (!title || !category || cost === undefined) {
        return errorResponse('title, category, and cost are required', 400, origin)
      }

      const item = await prisma.storeItem.create({
        data: { title, category, cost, active: active !== false, imageUrl },
      })

      return successResponse({ item }, 201, origin)
    } catch (error) {
      console.error('Create store item error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT') {
    if (!isAdmin(payload.role)) {
      return errorResponse('Admin access required', 403, origin)
    }

    try {
      const body = JSON.parse(event.body || '{}')
      const { itemId, title, category, cost, active, imageUrl } = body

      if (!itemId) {
        return errorResponse('itemId is required', 400, origin)
      }

      const item = await prisma.storeItem.update({
        where: { id: itemId },
        data: {
          ...(title !== undefined && { title }),
          ...(category !== undefined && { category }),
          ...(cost !== undefined && { cost }),
          ...(active !== undefined && { active }),
          ...(imageUrl !== undefined && { imageUrl }),
        },
      })

      return successResponse({ item }, 200, origin)
    } catch (error) {
      console.error('Update store item error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}

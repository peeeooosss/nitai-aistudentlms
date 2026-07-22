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
      const notifications = await prisma.userNotification.findMany({
        where: { userId: payload.userId },
        include: { notification: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })

      const unreadCount = await prisma.userNotification.count({
        where: { userId: payload.userId, read: false },
      })

      return successResponse({
        notifications: notifications.map(n => ({
          id: n.id,
          title: n.notification.title,
          message: n.notification.message,
          read: n.read,
          createdAt: n.createdAt,
        })),
        unreadCount,
      }, 200, origin)
    } catch (error) {
      console.error('Get notifications error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT') {
    try {
      const body = JSON.parse(event.body || '{}')
      const { notificationId, markAllRead } = body

      if (markAllRead) {
        await prisma.userNotification.updateMany({
          where: { userId: payload.userId, read: false },
          data: { read: true },
        })
        return successResponse({ message: 'All marked as read' }, 200, origin)
      }

      if (notificationId) {
        await prisma.userNotification.update({
          where: { id: notificationId },
          data: { read: true },
        })
        return successResponse({ message: 'Marked as read' }, 200, origin)
      }

      return errorResponse('notificationId or markAllRead required', 400, origin)
    } catch (error) {
      console.error('Update notification error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}

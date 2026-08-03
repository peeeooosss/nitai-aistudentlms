import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { verifyToken, extractToken, comparePassword, hashPassword } from './lib/auth'
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

  if (event.httpMethod === 'PUT' && event.path.endsWith('/settings/profile')) {
    try {
      const body = JSON.parse(event.body || '{}')
      const { name, bio, emailNotifications, language } = body

      const updatedUser = await prisma.user.update({
        where: { id: payload.userId },
        data: { ...(name !== undefined && { name }) },
      })

      await prisma.userSetting.upsert({
        where: { userId: payload.userId },
        update: {
          ...(bio !== undefined && { bio }),
          ...(emailNotifications !== undefined && { emailNotifications }),
          ...(language !== undefined && { language }),
        },
        create: {
          userId: payload.userId,
          bio: bio || null,
          emailNotifications: emailNotifications !== false,
          language: language || 'en',
        },
      })

      return successResponse({
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      }, 200, origin)
    } catch (error) {
      console.error('Update profile error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT' && event.path.endsWith('/settings/password')) {
    try {
      const body = JSON.parse(event.body || '{}')
      const { currentPassword, newPassword } = body

      if (!currentPassword || !newPassword) {
        return errorResponse('Current and new password required', 400, origin)
      }

      if (newPassword.length < 8) {
        return errorResponse('New password must be at least 8 characters', 400, origin)
      }

      const user = await prisma.user.findUnique({ where: { id: payload.userId } })
      if (!user || !user.password) {
        return errorResponse('No password set for this account', 400, origin)
      }

      const isValid = await comparePassword(currentPassword, user.password)
      if (!isValid) {
        return errorResponse('Current password is incorrect', 401, origin)
      }

      const hashedPassword = await hashPassword(newPassword)
      await prisma.user.update({
        where: { id: payload.userId },
        data: { password: hashedPassword },
      })

      return successResponse({ message: 'Password updated' }, 200, origin)
    } catch (error) {
      console.error('Update password error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}

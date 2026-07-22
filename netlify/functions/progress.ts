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
      const progress = await prisma.userProgress.findMany({
        where: { userId: payload.userId },
        include: { module: true },
      })

      const completedModuleIds = progress
        .filter(p => p.completed)
        .map(p => p.moduleId)

      const moduleEdits: Record<number, { title?: string; videoUrl?: string; creditsReward?: number }> = {}
      for (const dayNum of completedModuleIds) {
        const module = progress.find(p => p.moduleId === dayNum)?.module
        if (module) {
          moduleEdits[dayNum] = {
            title: module.title,
            videoUrl: module.videoUrl || undefined,
            creditsReward: module.creditsReward,
          }
        }
      }

      return successResponse({
        completedModules: completedModuleIds,
        totalCompleted: completedModuleIds.length,
      }, 200, origin)
    } catch (error) {
      console.error('Get progress error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}')
      const { moduleId } = body

      if (!moduleId) {
        return errorResponse('moduleId is required', 400, origin)
      }

      const module = await prisma.module.findUnique({ where: { id: moduleId } })
      if (!module) {
        return errorResponse('Module not found', 404, origin)
      }

      const existing = await prisma.userProgress.findUnique({
        where: { userId_moduleId: { userId: payload.userId, moduleId } },
      })

      if (existing && existing.completed) {
        return successResponse({ message: 'Already completed', completed: true }, 200, origin)
      }

      await prisma.userProgress.upsert({
        where: { userId_moduleId: { userId: payload.userId, moduleId } },
        update: { completed: true, completedAt: new Date() },
        create: { userId: payload.userId, moduleId, completed: true, completedAt: new Date() },
      })

      await prisma.userCredit.upsert({
        where: { userId: payload.userId },
        update: {
          balance: { increment: module.creditsReward },
          totalEarned: { increment: module.creditsReward },
        },
        create: {
          userId: payload.userId,
          balance: module.creditsReward,
          totalEarned: module.creditsReward,
        },
      })

      return successResponse({
        message: 'Module completed',
        creditsEarned: module.creditsReward,
      }, 200, origin)
    } catch (error) {
      console.error('Complete module error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Method not allowed', 405, origin)
}

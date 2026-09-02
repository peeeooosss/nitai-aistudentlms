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

  try {
    const [user, progress, credits] = await Promise.all([
      prisma.user.findUnique({ where: { id: payload.userId } }),
      prisma.userProgress.findMany({
        where: { userId: payload.userId, completed: true },
        include: { module: true },
      }),
      prisma.userCredit.findUnique({ where: { userId: payload.userId } }),
    ])

    if (!user) {
      return errorResponse('User not found', 404, origin)
    }

    const completedDays = progress.map(p => p.module.dayNumber).sort((a, b) => a - b)
    const totalCompleted = completedDays.length
    const currentDay = totalCompleted > 0 ? Math.max(...completedDays) : 0
    const nextDay = currentDay < 90 ? currentDay + 1 : null
    const currentWeek = Math.ceil((currentDay || 1) / 7)

    // Calculate streak (simplified: count consecutive completed days from today backwards)
    let streak = 0
    for (let d = currentDay; d >= 1; d--) {
      if (completedDays.includes(d)) {
        streak++
      } else {
        break
      }
    }

    // Get current module info
    let currentModule = null
    if (nextDay) {
      const mod = await prisma.module.findUnique({
        where: { dayNumber: nextDay },
        include: { week: true },
      })
      if (mod) {
        currentModule = {
          dayNumber: mod.dayNumber,
          title: mod.title,
          sessionType: mod.sessionType,
          weekNumber: mod.weekNumber,
          weekTitle: mod.week.title,
          phase: mod.week.phase,
          phaseName: mod.week.phaseName,
        }
      }
    }

    // Get upcoming live sessions
    const upcomingSessions = await prisma.liveSession.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: { gte: new Date() },
      },
      include: { module: true },
      orderBy: { scheduledAt: 'asc' },
      take: 3,
    })

    // Get recent activity
    const recentActivity = await prisma.userProgress.findMany({
      where: { userId: payload.userId, completed: true },
      include: { module: true },
      orderBy: { completedAt: 'desc' },
      take: 5,
    })

    return successResponse({
      stats: {
        totalCredits: credits?.balance || 0,
        currentStreak: streak,
        completedDays: totalCompleted,
        totalHours: Math.round(totalCompleted * 0.5 * 10) / 10,
        currentWeek,
        currentDay: currentDay || 1,
        nextDay,
      },
      currentModule,
      upcomingSessions: upcomingSessions.map(s => ({
        id: s.id,
        scheduledAt: s.scheduledAt,
        topic: s.topic,
        platform: s.platform,
        meetLink: s.meetLink,
        moduleTitle: s.module.title,
        dayNumber: s.module.dayNumber,
      })),
      recentActivity: recentActivity.map(a => ({
        dayNumber: a.module.dayNumber,
        title: a.module.title,
        completedAt: a.completedAt,
      })),
    }, 200, origin)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return errorResponse('Internal server error', 500, origin)
  }
}
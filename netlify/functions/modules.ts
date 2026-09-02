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

  const params = event.queryStringParameters || {}
  const dayNumber = parseInt(params.dayNumber || '0')

  // Roadmap view: all weeks + modules + user progress
  if (!dayNumber && event.httpMethod === 'GET') {
    try {
      const [weeks, modules, progress] = await Promise.all([
        prisma.week.findMany({ orderBy: { weekNumber: 'asc' } }),
        prisma.module.findMany({ orderBy: { dayNumber: 'asc' } }),
        prisma.userProgress.findMany({
          where: { userId: payload.userId, completed: true },
          select: { module: { select: { dayNumber: true } } },
        }),
      ])

      const completedDays = progress.map(p => p.module.dayNumber).sort((a, b) => a - b)
      const currentDay = completedDays.length > 0 ? Math.max(...completedDays) : 0
      const currentWeek = Math.ceil((currentDay || 1) / 7)

      return successResponse({
        weeks: weeks.map(w => ({
          id: w.id,
          weekNumber: w.weekNumber,
          title: w.title,
          phase: w.phase,
          phaseName: w.phaseName,
          startDate: w.startDate,
          endDate: w.endDate,
        })),
        modules: modules.map(m => ({
          id: m.id,
          weekId: m.weekId,
          dayNumber: m.dayNumber,
          dayInWeek: m.dayInWeek,
          weekNumber: m.weekNumber,
          sessionType: m.sessionType,
          title: m.title,
          description: m.description,
          contentMarkdown: m.contentMarkdown,
          videoUrl: m.videoUrl,
          creditsReward: m.creditsReward,
        })),
        completedDays,
        currentWeek,
        currentDay: currentDay || 1,
      }, 200, origin)
    } catch (error) {
      console.error('Get roadmap error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (!dayNumber || dayNumber < 1 || dayNumber > 90) {
    return errorResponse('Valid dayNumber (1-90) required', 400, origin)
  }

  try {
    const module = await prisma.module.findUnique({
      where: { dayNumber },
      include: {
        quiz: true,
        assignment: true,
        liveSession: true,
        aiContext: true,
        week: true,
      },
    })

    if (!module) {
      return errorResponse('Module not found', 404, origin)
    }

    return successResponse({
      module: {
        id: module.id,
        weekId: module.weekId,
        dayNumber: module.dayNumber,
        dayInWeek: module.dayInWeek,
        weekNumber: module.weekNumber,
        sessionType: module.sessionType,
        title: module.title,
        description: module.description,
        contentMarkdown: module.contentMarkdown,
        videoUrl: module.videoUrl,
        creditsReward: module.creditsReward,
        week: {
          id: module.week.id,
          weekNumber: module.week.weekNumber,
          title: module.week.title,
          phase: module.week.phase,
          phaseName: module.week.phaseName,
        },
        quiz: module.quiz ? {
          id: module.quiz.id,
          moduleId: module.quiz.moduleId,
          questions: module.quiz.questions,
          passScore: module.quiz.passScore,
          timeLimit: module.quiz.timeLimit,
        } : null,
        assignment: module.assignment ? {
          id: module.assignment.id,
          prompt: module.assignment.prompt,
          type: module.assignment.type,
          maxCredits: module.assignment.maxCredits,
        } : null,
        liveSession: module.liveSession ? {
          id: module.liveSession.id,
          scheduledAt: module.liveSession.scheduledAt,
          duration: module.liveSession.duration,
          meetLink: module.liveSession.meetLink,
          recordingUrl: module.liveSession.recordingUrl,
          platform: module.liveSession.platform,
          topic: module.liveSession.topic,
          description: module.liveSession.description,
          hostName: module.liveSession.hostName,
          status: module.liveSession.status,
        } : null,
      },
    }, 200, origin)
  } catch (error) {
    console.error('Get module error:', error)
    return errorResponse('Internal server error', 500, origin)
  }
}
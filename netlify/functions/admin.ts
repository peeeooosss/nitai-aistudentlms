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

  if (!isAdmin(payload.role)) {
    return errorResponse('Admin access required', 403, origin)
  }

  const path = event.path

  if (event.httpMethod === 'GET' && path.endsWith('/admin/stats')) {
    try {
      const [totalUsers, totalCredits, completedModules, activeStreaks] = await Promise.all([
        prisma.user.count(),
        prisma.userCredit.aggregate({ _sum: { balance: true, totalEarned: true } }),
        prisma.userProgress.count({ where: { completed: true } }),
        prisma.userProgress.groupBy({
          by: ['userId'],
          where: { completed: true, completedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
        }),
      ])

      const recentActivity = await prisma.userProgress.findMany({
        where: { completed: true },
        include: { user: { select: { name: true } }, module: { select: { title: true, dayNumber: true } } },
        orderBy: { completedAt: 'desc' },
        take: 10,
      })

      return successResponse({
        stats: {
          totalUsers,
          totalCredits: totalCredits._sum.totalEarned || 0,
          activeStreaks: activeStreaks.length,
          completionRate: totalUsers > 0 ? Math.round((completedModules / (totalUsers * 90)) * 100) : 0,
        },
        recentActivity: recentActivity.map(a => ({
          userName: a.user.name,
          moduleTitle: a.module.title,
          dayNumber: a.module.dayNumber,
          completedAt: a.completedAt,
        })),
      }, 200, origin)
    } catch (error) {
      console.error('Admin stats error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'GET' && path.endsWith('/admin/modules')) {
    try {
      const modules = await prisma.module.findMany({ orderBy: { dayNumber: 'asc' } })
      return successResponse({ modules }, 200, origin)
    } catch (error) {
      console.error('Admin modules error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT' && path.includes('/admin/modules/')) {
    try {
      const moduleId = parseInt(path.split('/').pop() || '0')
      if (!moduleId) return errorResponse('Invalid module ID', 400, origin)

      const body = JSON.parse(event.body || '{}')
      const module = await prisma.module.update({
        where: { id: moduleId },
        data: {
          ...(body.title !== undefined && { title: body.title }),
          ...(body.videoUrl !== undefined && { videoUrl: body.videoUrl }),
          ...(body.creditsReward !== undefined && { creditsReward: body.creditsReward }),
          ...(body.contentMarkdown !== undefined && { contentMarkdown: body.contentMarkdown }),
          ...(body.description !== undefined && { description: body.description }),
        },
      })

      return successResponse({ module }, 200, origin)
    } catch (error) {
      console.error('Admin update module error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'GET' && path.endsWith('/admin/live-sessions')) {
    try {
      const qp = event.queryStringParameters || {}
      const where: any = {}
      if (qp.status) where.status = qp.status

      const sessions = await prisma.liveSession.findMany({
        where,
        include: { module: { select: { id: true, title: true, dayNumber: true, weekNumber: true } } },
        orderBy: { scheduledAt: 'desc' },
      })

      return successResponse({ sessions }, 200, origin)
    } catch (error) {
      console.error('Admin live sessions error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && path.endsWith('/admin/live-sessions')) {
    try {
      const body = JSON.parse(event.body || '{}')
      const { moduleId, scheduledAt, duration, meetLink, topic, description, hostName, platform, status, resources, isPublic } = body

      if (!moduleId || !scheduledAt || !topic) {
        return errorResponse('moduleId, scheduledAt, and topic required', 400, origin)
      }

      const lookup = await prisma.module.findUnique({ where: { id: parseInt(moduleId) } })
      if (!lookup) return errorResponse('Module not found', 404, origin)

      const session = await prisma.liveSession.create({
        data: {
          moduleId: lookup.id,
          scheduledAt: new Date(scheduledAt),
          duration: duration || 90,
          meetLink,
          topic,
          description,
          hostName,
          platform: platform || 'Zoom',
          status: status || 'SCHEDULED',
          isPublic: isPublic !== undefined ? isPublic : true,
          resources: resources || [],
        },
      })

      return successResponse({ session }, 201, origin)
    } catch (error) {
      console.error('Admin create live session error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT' && path.includes('/admin/live-sessions/') && !path.endsWith('/publish') && !path.endsWith('/recording')) {
    try {
      const id = path.split('/').pop() || ''
      const body = JSON.parse(event.body || '{}')

      if (body.moduleId) {
        const lookup = await prisma.module.findUnique({ where: { id: parseInt(body.moduleId) } })
        if (!lookup) return errorResponse('Module not found', 404, origin)
      }

      const session = await prisma.liveSession.update({
        where: { id },
        data: {
          ...(body.scheduledAt !== undefined && { scheduledAt: new Date(body.scheduledAt) }),
          ...(body.duration !== undefined && { duration: body.duration }),
          ...(body.meetLink !== undefined && { meetLink: body.meetLink }),
          ...(body.topic !== undefined && { topic: body.topic }),
          ...(body.description !== undefined && { description: body.description }),
          ...(body.hostName !== undefined && { hostName: body.hostName }),
          ...(body.platform !== undefined && { platform: body.platform }),
          ...(body.status !== undefined && { status: body.status }),
          ...(body.isPublic !== undefined && { isPublic: body.isPublic }),
          ...(body.resources !== undefined && { resources: body.resources }),
        },
      })

      return successResponse({ session }, 200, origin)
    } catch (error) {
      console.error('Admin update live session error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'DELETE' && path.includes('/admin/live-sessions/')) {
    try {
      const id = path.split('/').pop() || ''
      await prisma.liveSession.delete({ where: { id } })
      return successResponse({ message: 'Session deleted' }, 200, origin)
    } catch (error) {
      console.error('Admin delete live session error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && path.endsWith('/publish') && path.includes('/admin/live-sessions/')) {
    try {
      const segments = path.split('/').filter(Boolean)
      const id = segments[segments.length - 2]
      const session = await prisma.liveSession.update({
        where: { id },
        data: { status: 'SCHEDULED' },
      })
      return successResponse({ session }, 200, origin)
    } catch (error) {
      console.error('Admin publish session error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && path.endsWith('/recording') && path.includes('/admin/live-sessions/')) {
    try {
      const segments = path.split('/').filter(Boolean)
      const id = segments[segments.length - 2]
      const body = JSON.parse(event.body || '{}')
      const session = await prisma.liveSession.update({
        where: { id },
        data: {
          recordingUrl: body.recordingUrl,
          status: body.status || 'COMPLETED',
        },
      })
      return successResponse({ session }, 200, origin)
    } catch (error) {
      console.error('Admin add recording error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'GET' && path.endsWith('/admin/resources')) {
    try {
      const qp = event.queryStringParameters || {}
      const where: any = {}
      if (qp.type) where.type = qp.type
      if (qp.scope) where.scope = qp.scope
      if (qp.search) {
        where.OR = [
          { title: { contains: qp.search, mode: 'insensitive' } },
          { description: { contains: qp.search, mode: 'insensitive' } },
        ]
      }

      const resources = await prisma.resource.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })

      return successResponse({ resources }, 200, origin)
    } catch (error) {
      console.error('Admin resources error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && path.endsWith('/admin/resources')) {
    try {
      const body = JSON.parse(event.body || '{}')
      const { type, title, description, url, platform, filePath, mimeType, scope, weekNumber, dayNumber, phase, visibility, isFeatured, tags } = body

      if (!type || !title) {
        return errorResponse('type and title required', 400, origin)
      }

      const resource = await prisma.resource.create({
        data: {
          type,
          title,
          description,
          url,
          platform,
          filePath,
          mimeType,
          scope: scope || 'GLOBAL',
          weekNumber,
          dayNumber,
          phase,
          visibility: visibility || 'PUBLIC',
          isFeatured: isFeatured || false,
          tags: tags || [],
          createdBy: payload.userId,
        },
      })

      return successResponse({ resource }, 201, origin)
    } catch (error) {
      console.error('Admin create resource error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT' && path.includes('/admin/resources/')) {
    try {
      const id = path.split('/').pop() || ''
      const body = JSON.parse(event.body || '{}')

      const resource = await prisma.resource.update({
        where: { id },
        data: {
          ...(body.type !== undefined && { type: body.type }),
          ...(body.title !== undefined && { title: body.title }),
          ...(body.description !== undefined && { description: body.description }),
          ...(body.url !== undefined && { url: body.url }),
          ...(body.platform !== undefined && { platform: body.platform }),
          ...(body.filePath !== undefined && { filePath: body.filePath }),
          ...(body.mimeType !== undefined && { mimeType: body.mimeType }),
          ...(body.scope !== undefined && { scope: body.scope }),
          ...(body.weekNumber !== undefined && { weekNumber: body.weekNumber }),
          ...(body.dayNumber !== undefined && { dayNumber: body.dayNumber }),
          ...(body.phase !== undefined && { phase: body.phase }),
          ...(body.visibility !== undefined && { visibility: body.visibility }),
          ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
          ...(body.tags !== undefined && { tags: body.tags }),
        },
      })

      return successResponse({ resource }, 200, origin)
    } catch (error) {
      console.error('Admin update resource error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'DELETE' && path.includes('/admin/resources/')) {
    try {
      const id = path.split('/').pop() || ''
      await prisma.resource.delete({ where: { id } })
      return successResponse({ message: 'Resource deleted' }, 200, origin)
    } catch (error) {
      console.error('Admin delete resource error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'GET' && path.endsWith('/admin/submissions')) {
    try {
      const submissions = await prisma.assignmentSubmission.findMany({
        include: {
          user: { select: { id: true, name: true, email: true } },
          assignment: { include: { module: { select: { title: true, dayNumber: true } } } },
        },
        orderBy: { submittedAt: 'desc' },
      })

      return successResponse({
        submissions: submissions.map(s => ({
          id: s.id,
          userName: s.user.name,
          userEmail: s.user.email,
          moduleTitle: s.assignment.module.title,
          dayNumber: s.assignment.module.dayNumber,
          content: s.content,
          status: s.status,
          submittedAt: s.submittedAt,
        })),
      }, 200, origin)
    } catch (error) {
      console.error('Admin submissions error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'PUT' && path.includes('/admin/submissions/')) {
    try {
      const submissionId = path.split('/').pop() || ''
      const body = JSON.parse(event.body || '{}')
      const { status } = body

      if (!status || !['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
        return errorResponse('Invalid status', 400, origin)
      }

      const submission = await prisma.assignmentSubmission.update({
        where: { id: submissionId },
        data: { status, reviewedAt: new Date() },
      })

      return successResponse({ submission }, 200, origin)
    } catch (error) {
      console.error('Admin review submission error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && path.endsWith('/admin/notifications')) {
    try {
      const body = JSON.parse(event.body || '{}')
      const { title, message, targetAudience } = body

      if (!title || !message) {
        return errorResponse('title and message required', 400, origin)
      }

      const notification = await prisma.notification.create({
        data: { title, message, targetAudience: targetAudience || 'ALL' },
      })

      const users = await prisma.user.findMany({
        where: targetAudience === 'ACTIVE'
          ? { progress: { some: { completed: true, completedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } } }
          : targetAudience === 'INACTIVE'
            ? { NOT: { progress: { some: { completed: true, completedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } } } }
            : {},
        select: { id: true },
      })

      await prisma.userNotification.createMany({
        data: users.map(u => ({ userId: u.id, notificationId: notification.id })),
      })

      return successResponse({ message: 'Notification sent', recipients: users.length }, 201, origin)
    } catch (error) {
      console.error('Admin send notification error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  if (event.httpMethod === 'POST' && path.endsWith('/admin/seed-quizzes')) {
    try {
      const modules = await prisma.module.findMany()
      let seeded = 0

      for (const mod of modules) {
        const existing = await prisma.quiz.findUnique({ where: { moduleId: mod.id } })
        if (!existing) {
          await prisma.quiz.create({
            data: {
              moduleId: mod.id,
              questions: [
                {
                  question: `What is the main focus of Day ${mod.dayNumber}?`,
                  options: ['Practical skills', 'Theory knowledge', 'Networking', 'Assessment'],
                  correctIndex: 0,
                },
                {
                  question: `Which phase does Day ${mod.dayNumber} belong to?`,
                  options: [mod.phaseName, 'Phase 1', 'Phase 2', 'Phase 3'],
                  correctIndex: 0,
                },
                {
                  question: `How many credits can you earn on Day ${mod.dayNumber}?`,
                  options: [`${mod.creditsReward} credits`, '10 credits', '100 credits', '500 credits'],
                  correctIndex: 0,
                },
                {
                  question: `What should you complete before moving to Day ${mod.dayNumber + 1}?`,
                  options: ['Day ' + mod.dayNumber + ' tasks', 'Day 1 only', 'Nothing', 'All quizzes'],
                  correctIndex: 0,
                },
              ],
            },
          })
          seeded++
        }
      }

      return successResponse({ message: `Seeded ${seeded} quizzes`, total: modules.length }, 201, origin)
    } catch (error) {
      console.error('Seed quizzes error:', error)
      return errorResponse('Internal server error', 500, origin)
    }
  }

  return errorResponse('Not found', 404, origin)
}

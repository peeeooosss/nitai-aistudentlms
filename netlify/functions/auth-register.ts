import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { hashPassword, generateToken, getAdminEmails } from './lib/auth'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'

export const handler: NetlifyHandler = async (event) => {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: getCorsHeaders(origin), body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return errorResponse('Method not allowed', 405, origin)
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { name, email, password } = body

    if (!name || !email || !password) {
      return errorResponse('Name, email, and password are required', 400, origin)
    }

    if (password.length < 8) {
      return errorResponse('Password must be at least 8 characters', 400, origin)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return errorResponse('Invalid email format', 400, origin)
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existingUser) {
      return errorResponse('An account with this email already exists', 409, origin)
    }

    const hashedPassword = await hashPassword(password)
    const adminEmails = getAdminEmails()
    const isAdminUser = adminEmails.includes(email.toLowerCase())

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: isAdminUser ? 'ADMIN' : 'STUDENT',
        credits: {
          create: { balance: 0, totalEarned: 0 },
        },
        settings: {
          create: {},
        },
      },
      include: {
        credits: true,
      },
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return successResponse({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        credits: user.credits?.balance || 0,
      },
    }, 201, origin)
  } catch (error) {
    console.error('Register error:', error)
    return errorResponse('Internal server error', 500, origin)
  }
}

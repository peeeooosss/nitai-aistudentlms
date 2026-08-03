import type { NetlifyHandler } from './lib/types'
import prisma from './lib/prisma'
import { generateToken, getAdminEmails } from './lib/auth'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://aistudent.nitaigroup.com'

async function getGoogleUserInfo(code: string): Promise<{ email: string; name: string; picture?: string; id: string } | null> {
  const callbackUrl = `${FRONTEND_URL}/api/auth/google/callback`

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: GOOGLE_CLIENT_SECRET!,
      redirect_uri: callbackUrl,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenResponse.ok) return null
  const tokenData = await tokenResponse.json()

  const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })

  if (!userInfoResponse.ok) return null
  return userInfoResponse.json()
}

export const handler: NetlifyHandler = async (event) => {
  try {
    const params = event.queryStringParameters || {}
    const code = params.code
    const error = params.error

    if (error) {
      return {
        statusCode: 302,
        headers: { Location: `${FRONTEND_URL}/auth/login?error=google_denied` },
        body: '',
      }
    }

    if (!code) {
      return {
        statusCode: 302,
        headers: { Location: `${FRONTEND_URL}/auth/login?error=no_code` },
        body: '',
      }
    }

    const googleUser = await getGoogleUserInfo(code)
    if (!googleUser || !googleUser.email) {
      return {
        statusCode: 302,
        headers: { Location: `${FRONTEND_URL}/auth/login?error=google_failed` },
        body: '',
      }
    }

    const adminEmails = getAdminEmails()
    const isAdminUser = adminEmails.includes(googleUser.email.toLowerCase())

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: googleUser.email.toLowerCase() },
          { provider: 'GOOGLE', providerId: googleUser.id },
        ],
      },
      include: { credits: true },
    })

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          providerId: googleUser.id,
          avatar: googleUser.picture || user.avatar,
          name: user.name || googleUser.name,
        },
        include: { credits: true },
      })
    } else {
      user = await prisma.user.create({
        data: {
          email: googleUser.email.toLowerCase(),
          name: googleUser.name,
          provider: 'GOOGLE',
          providerId: googleUser.id,
          avatar: googleUser.picture,
          role: isAdminUser ? 'ADMIN' : 'STUDENT',
          credits: {
            create: { balance: 0, totalEarned: 0 },
          },
          settings: {
            create: {},
          },
        },
        include: { credits: true },
      })
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      statusCode: 302,
      headers: {
        Location: `${FRONTEND_URL}/auth/callback?token=${token}`,
      },
      body: '',
    }
  } catch (error) {
    console.error('Google callback error:', error)
    return {
      statusCode: 302,
      headers: { Location: `${FRONTEND_URL}/auth/login?error=server_error` },
      body: '',
    }
  }
}

import type { NetlifyHandler } from './lib/types'
import { getCorsHeaders } from './lib/cors'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://aistudent.nitaigroup.com'

export const handler: NetlifyHandler = async (event) => {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: getCorsHeaders(origin), body: '' }
  }

  if (!GOOGLE_CLIENT_ID) {
    return {
      statusCode: 500,
      headers: getCorsHeaders(origin),
      body: JSON.stringify({ error: 'Google Client ID not configured' }),
    }
  }

  const callbackUrl = `${FRONTEND_URL}/api/auth/google/callback`

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID)
  googleAuthUrl.searchParams.set('redirect_uri', callbackUrl)
  googleAuthUrl.searchParams.set('response_type', 'code')
  googleAuthUrl.searchParams.set('scope', 'openid email profile')
  googleAuthUrl.searchParams.set('access_type', 'offline')
  googleAuthUrl.searchParams.set('prompt', 'consent')

  return {
    statusCode: 302,
    headers: {
      ...getCorsHeaders(origin),
      Location: googleAuthUrl.toString(),
    },
    body: '',
  }
}

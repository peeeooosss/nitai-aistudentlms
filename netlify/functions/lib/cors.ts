const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL || 'https://aistudent.nitaigroup.com',
  'http://localhost:5173',
  'http://localhost:5179',
  'http://localhost:8888',
]

export function getCorsHeaders(origin: string | undefined): Record<string, string> {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || '') ? origin : ALLOWED_ORIGINS[0]

  return {
    'Access-Control-Allow-Origin': allowedOrigin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  }
}

export function successResponse(data: unknown, statusCode = 200, origin?: string) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(origin),
    },
    body: JSON.stringify(data),
  }
}

export function errorResponse(message: string, statusCode = 400, origin?: string) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(origin),
    },
    body: JSON.stringify({ error: message }),
  }
}

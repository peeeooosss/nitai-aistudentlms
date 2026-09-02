import { prisma } from './lib/prisma'
import { verifyToken, extractToken } from './lib/auth'
import { successResponse, errorResponse, getCorsHeaders } from './lib/cors'
import type { NetlifyFunctionEvent, NetlifyFunctionContext, NetlifyFunctionResponse } from './lib/types'

export const config = {
  path: '/ai',
}

interface RagChunk {
  id: string
  content: string
  source?: string
  relevance?: number
}

// Words that signal the user is asking about something OTHER than the current module
// or about personal/general subjects not covered by the day's lesson.
const OFF_TOPIC_HINTS = [
  'day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7', 'day 8',
  'day 9', 'day 10', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10',
  'resume', 'interview', 'dating', 'recipe', 'weather', 'stock', 'crypto',
  'my relationship', 'my life', 'my health', 'my gf', 'my bf', 'my wife', 'my husband',
  'sing me', 'write a story', 'write a poem', 'tell me a joke', 'horoscope',
]

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function extractKeywords(source: string): string[] {
  return normalize(source)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3)
    .filter((w) => !['what', 'which', 'where', 'when', 'with', 'from', 'that', 'this', 'have', 'your', 'about', 'would', 'could', 'should', 'their', 'there', 'these', 'those', 'being', 'than', 'then', 'some', 'they', 'them'].includes(w))
}

function looksOffTopic(question: string, moduleTitle: string): { offTopic: boolean; reason?: string } {
  const q = normalize(question)
  const text = ` ${q} `

  for (const hint of OFF_TOPIC_HINTS) {
    if (text.includes(` ${hint} `) || text.includes(hint)) {
      return { offTopic: true, reason: `The question refers to "${hint}", which is outside today's module.` }
    }
  }

  // If the user explicitly names another day number (not this module's day), it's off-topic.
  const otherDay = q.match(/day\s+(\d{1,2})/)
  if (otherDay) {
    return { offTopic: true, reason: `Day ${otherDay[1]} is a different module — I'm only trained on today's module.` }
  }

  return { offTopic: false }
}

function findBestChunk(question: string, chunks: RagChunk[]): RagChunk | null {
  const qWords = extractKeywords(question)
  if (qWords.length === 0) return chunks[0] || null

  let best: RagChunk | null = null
  let bestScore = 0

  for (const chunk of chunks) {
    const cWords = extractKeywords(chunk.content)
    let score = 0
    for (const w of qWords) {
      if (cWords.includes(w)) score += 1
    }
    const relevance = typeof chunk.relevance === 'number' ? chunk.relevance : 1
    score = score + relevance * 0.5
    if (score > bestScore) {
      bestScore = score
      best = chunk
    }
  }

  return best
}

function extractObjectives(content: string): string[] {
  const lines = content.split('\n')
  const objectives: string[] = []
  let capture = false
  for (const line of lines) {
    if (/learning objectives/i.test(line)) {
      capture = true
      continue
    }
    if (capture) {
      if (/^#{1,3}\s/.test(line) && !/learning objectives/i.test(line)) break
      const trimmed = line.trim().replace(/^[-*•]\s*/, '').trim()
      if (trimmed && !/^#{1,3}\s/.test(line)) {
        objectives.push(trimmed)
      }
    }
    if (objectives.length >= 5) break
  }
  return objectives
}

function buildScopedPrompt(dayNumber: number, title: string, systemPrompt: string, content: string): string {
  return [
    `You are a trained AI tutor for the Nitai 90-Day AI program.`,
    ``,
    `You are TRAINED ONLY on Day ${dayNumber}: "${title}".`,
    ``,
    `You may ONLY discuss content from this specific module: its theory, key concepts, quiz questions, and assignment.`,
    ``,
    `Rules:`,
    `1. Never discuss other days, other modules, or general topics outside this module.`,
    `2. Never give personal, lifestyle, or career advice beyond the module.`,
    `3. If a question is not about this module, reply: "I'm trained only on ${title} (Day ${dayNumber}). Ask me something about this module."`,
    `4. Answer strictly from the module material. If the answer is not in the material, say you don't know instead of guessing.`,
    ``,
    `Recommended system context for this module:`,
    systemPrompt,
  ].join('\n')
}

export default async function handler(event: NetlifyFunctionEvent, _context: NetlifyFunctionContext): Promise<NetlifyFunctionResponse> {
  const origin = event.headers.origin

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: getCorsHeaders(origin),
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return errorResponse('Method not allowed', 405, origin)
  }

  const token = extractToken(event.headers.authorization)
  if (!token) return errorResponse('Authentication required', 401, origin)

  const user = verifyToken(token)
  if (!user) return errorResponse('Invalid token', 401, origin)

  try {
    const pathSegments = event.path.replace(/^\/ai/, '').split('/').filter(Boolean)
    const action = pathSegments[0]

    if (action === 'doubt') {
      const body = JSON.parse(event.body || '{}')
      const { dayNumber, question } = body

      if (!dayNumber || !question) {
        return errorResponse('dayNumber and question are required', 400, origin)
      }

      const day = parseInt(dayNumber)
      const moduleRecord = await prisma.module.findUnique({
        where: { dayNumber: day },
        include: { aiContext: true, week: true, quiz: true },
      })

      if (!moduleRecord) {
        return errorResponse('Module not found for this day number', 404, origin)
      }

      const aiContext = moduleRecord.aiContext
      const title = moduleRecord.title
      const content = moduleRecord.contentMarkdown || ''

      // Topic gate: refuse clearly off-module questions.
      const gate = looksOffTopic(question, title)
      if (gate.offTopic) {
        return successResponse({
          dayNumber: day,
          moduleTitle: title,
          question,
          answer: `I'm a trained AI tutor for this module only.\n\nI can only help with Day ${day}: "${title}". I can answer questions about this module's theory, quiz, or assignment — but not other topics.\n\nTry asking something like:\n- What are the key concepts in this module?\n- Explain [concept from the lesson]\n- Help me prepare for today's quiz.`,
          scope: 'off_topic',
        }, 200, origin)
      }

      if (!aiContext) {
        return successResponse({
          dayNumber: day,
          moduleTitle: title,
          question,
          answer: `[AI Tutor - No Context Available]\n\nNo AI context has been configured for Day ${day} ("${title}"). An admin needs to create a ModuleAIContext entry for this module before the AI tutor can answer questions.`,
          scope: 'no_context',
        }, 200, origin)
      }

      let chunks: RagChunk[] = []
      try {
        chunks = Array.isArray(aiContext.ragChunks) ? (aiContext.ragChunks as unknown as RagChunk[]) : []
      } catch {
        chunks = []
      }

      const bestChunk = findBestChunk(question, chunks)
      const objectives = extractObjectives(content)
      const scopedPrompt = buildScopedPrompt(day, title, aiContext.systemPrompt, content)

      const excerpt = bestChunk
        ? bestChunk.content.substring(0, 600)
        : (content.split('\n\n').find((p) => p.trim().length > 60) || content).substring(0, 600)

      const objectiveLines =
        objectives.length > 0
          ? objectives.slice(0, 5).map((o) => `• ${o}`).join('\n')
          : '• Understand and apply the core concepts of this module.'

      const answer = [
        `I'm your trained AI tutor for Day ${day}: "${title}". Here's what the module material says:`,
        ``,
        `**Module context (from the lesson):**`,
        excerpt.replace(/^#+\s*/gm, '').trim(),
        ``,
        `**Learning objectives for this module:**`,
        objectiveLines,
        ``,
        `**Scoped to this module, I can help you with:**`,
        `• Explaining any concept from today's lesson`,
        `• Preparing for today's quiz (${moduleRecord.quiz ? 'quiz is available' : 'no quiz on this day'})`,
        `• The assignment for this day, if applicable`,
        `• Practicing the key ideas covered above`,
      ].join('\n')

      return successResponse({
        dayNumber: day,
        moduleTitle: title,
        question,
        answer,
        scope: 'on_topic',
        module: {
          id: moduleRecord.id,
          title,
          dayNumber: day,
          weekNumber: moduleRecord.weekNumber,
          hasAiContext: true,
        },
      }, 200, origin)
    }

    return errorResponse('Unknown AI action', 400, origin)
  } catch (error) {
    console.error('AI endpoint error:', error)
    return errorResponse('Internal server error', 500, origin)
  }
}

export interface Week {
  id: number
  weekNumber: number
  title: string
  phase: number
  phaseName: string
  startDate: string
  endDate: string
}

export interface Module {
  id: number
  weekId: number
  dayNumber: number
  dayInWeek: number
  weekNumber: number
  sessionType: 'THEORY' | 'QUIZ' | 'PROJECT' | 'LIVE_INTERACTIVE'
  title: string
  description: string
  contentMarkdown?: string | null
  videoUrl?: string | null
  creditsReward: number
}

export interface Quiz {
  id: string
  moduleId: number
  questions: QuizQuestion[]
  passScore: number
  timeLimit?: number | null
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface LiveSession {
  id: string
  moduleId: number
  scheduledAt: string
  duration: number
  meetLink?: string | null
  recordingUrl?: string | null
  platform: string
  topic: string
  description?: string | null
  hostName?: string | null
  status: 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED'
  isPublic: boolean
  resources?: any
  module?: Module
}

export interface Resource {
  id: string
  type: 'VIDEO' | 'DRIVE' | 'LINK' | 'UPLOAD' | 'NOTE'
  title: string
  description?: string | null
  url?: string | null
  platform?: string | null
  filePath?: string | null
  fileSize?: number | null
  mimeType?: string | null
  thumbnailUrl?: string | null
  duration?: number | null
  scope: 'GLOBAL' | 'PHASE' | 'WEEK' | 'DAY'
  weekNumber?: number | null
  dayNumber?: number | null
  phase?: number | null
  moduleId?: number | null
  visibility: 'PUBLIC' | 'STUDENTS' | 'ADMIN'
  isFeatured: boolean
  tags: string[]
  viewCount: number
  downloadCount: number
  saveCount: number
  createdAt: string
}

export interface DashboardStats {
  totalCredits: number
  currentStreak: number
  completedDays: number
  totalHours: number
  currentWeek: number
  currentDay: number
}

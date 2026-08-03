import { motion, AnimatePresence } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { NitaiLogo } from '../components/NitaiLogo'
import { getModuleByDay, getPhaseGradient, modules } from '../data/modules'
import { api } from '../services/api'
import {
  ArrowLeft,
  Play,
  FileQuestion,
  ClipboardList,
  CheckCircle,
  Film,
  Send,
  Upload,
  Link2,
  FileText,
  BookOpen,
  Award,
  Clock,
  LockKeyhole,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Bot,
  User,
  ExternalLink,
} from 'lucide-react'

function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com/file/d/')
}

function getGoogleDriveEmbedUrl(url: string): string {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  return url
}

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function getYouTubeEmbedUrl(url: string): string {
  let videoId = ''
  if (url.includes('youtube.com/embed/')) {
    return url
  }
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || ''
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  return url
}

type Tab = 'video' | 'quiz' | 'assignment' | 'doubt'

const quizData = {
  questions: [
    {
      id: 1,
      question: 'What is the primary goal of the Nitai Learn-to-Earn platform?',
      options: [
        'To charge students for software subscriptions',
        'To transition youth from AI literacy to active monetization',
        'To replace traditional college degrees',
        'To sell digital products only',
      ],
      correct: 1,
    },
    {
      id: 2,
      question: 'Which AI model powers the Nitai AI Engine for doubt clearing?',
      options: [
        'GPT-4o',
        'Claude 3.5 Sonnet',
        'Llama 3.3 70B (versatile) via Groq',
        'Gemini Ultra',
      ],
      correct: 2,
    },
    {
      id: 3,
      question: 'What is the "Zero-Capital AI Startup" model?',
      options: [
        'Students pay nothing upfront and earn credits to redeem assets',
        'Investors fund all student tuition',
        'The platform is completely free with no monetization',
        'Students trade services instead of paying',
      ],
      correct: 0,
    },
    {
      id: 4,
      question: 'How many digital resell assets does the Nitai Digital Storefront offer?',
      options: [
        '500+',
        '800+',
        '1,200+',
        '2,000+',
      ],
      correct: 2,
    },
  ],
}

const botResponses: Record<string, string> = {
  hello: "Hey there! 👋 I'm AI Didi, your learning assistant. Ask me anything about your course!",
  hi: "Hey there! 👋 I'm AI Didi, your learning assistant. Ask me anything about your course!",
  hey: "Hey there! 👋 I'm AI Didi, your learning assistant. Ask me anything about your course!",
  credit: 'You earn Nitai Credits by completing modules, quizzes, and assignments. Maintain your streak for bonus credits! 🪙',
  earn: 'You earn Nitai Credits by completing modules, quizzes, and assignments. Maintain your streak for bonus credits! 🪙',
  coins: 'You earn Nitai Credits by completing modules, quizzes, and assignments. Maintain your streak for bonus credits! 🪙',
  roadmap: "Your 90-day journey has 3 phases:\n1️⃣ Hustler (Days 1–30) — Foundation & Content Creation\n2️⃣ Automation Agency (Days 31–60) — Systems & Scaling\n3️⃣ Enterprise (Days 61–90) — Strategy & Franchise",
  phase: "Your 90-day journey has 3 phases:\n1️⃣ Hustler (Days 1–30) — Foundation & Content Creation\n2️⃣ Automation Agency (Days 31–60) — Systems & Scaling\n3️⃣ Enterprise (Days 61–90) — Strategy & Franchise",
  video: 'The Video tab contains your lesson with a lecture video and notes. Watch carefully before attempting the quiz! 🎬',
  quiz: 'The Quiz tab tests your understanding with 4 multiple-choice questions. You need 75%+ to pass! 📝',
  assignment: 'The Assignment tab is where you submit your work. You can write text, paste a URL, or upload a file. 📋',
  doubt: "I'm here to clear your doubts! Just type your question and I'll help you out. 💡",
  help: "I can help you with:\n• Course content & modules\n• Credits & earning\n• The 90-day roadmap\n• Video, Quiz, Assignment sections\n• General platform questions",
  thanks: "You're welcome! Keep up the great work! 🚀",
  thank: "You're welcome! Keep up the great work! 🚀",
  bye: "Goodbye! Keep learning and earning! 🚀",
  default: "Great question! For more details, check the course materials or ask your instructor. I'm here to help with general queries! 😊",
}

function getBotResponse(message: string): string {
  const lower = message.toLowerCase()
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response
  }
  return botResponses.default
}

const phaseColors = [
  { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', range: 'Days 1–30' },
  { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', range: 'Days 31–60' },
  { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', range: 'Days 61–90' },
]

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
}

export default function ModuleView() {
  const { dayNumber } = useParams()
  const day = parseInt(dayNumber || '1')
  const mod = getModuleByDay(day)
  const [activeTab, setActiveTab] = useState<Tab>('video')
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [assignmentText, setAssignmentText] = useState('')
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi! I'm AI Didi 🤖 — your personal doubt-clearing assistant. Ask me anything about your course!", isBot: true },
  ])
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [msgIdCounter, setMsgIdCounter] = useState(2)

  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [completionToast, setCompletionToast] = useState(false)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await api.get<{ completedModules: number[] }>('/progress')
        setCompletedDays(data.completedModules || [])
      } catch (err) {
        console.error('Failed to fetch progress:', err)
      }
    }
    fetchProgress()
  }, [])

  const handleVideoComplete = async (dayNumber: number) => {
    if (completedDays.includes(dayNumber)) return
    try {
      await api.post('/progress', { moduleId: getModuleByDay(dayNumber)?.id })
      const updated = [...completedDays, dayNumber].sort((a, b) => a - b)
      setCompletedDays(updated)
      setCompletionToast(true)
      setTimeout(() => setCompletionToast(false), 5000)
    } catch (err) {
      console.error('Failed to complete module:', err)
    }
  }

  const checkUnlocked = (dayNum: number) => {
    if (dayNum === 1) return true
    return completedDays.includes(dayNum - 1)
  }

  useEffect(() => {
    setActiveTab('video')
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setAssignmentText('')
    setAssignmentSubmitted(false)
    setChatMessages([
      { id: 1, text: "Hi! I'm AI Didi 🤖 — your personal doubt-clearing assistant. Ask me anything about your course!", isBot: true },
    ])
    setMsgIdCounter(2)
    setChatInput('')
    setSidebarOpen(false)
    setCompletionToast(false)
  }, [dayNumber])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  if (!mod) {
    return (
      <div className="min-h-screen bg-nitai-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white/60">Module not found</h1>
          <Link to="/dashboard/student" className="mt-4 inline-flex items-center gap-2 text-nitai-cyan hover:text-nitai-cyan-light">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const gradient = getPhaseGradient(mod.phase)

  const tabs: { id: Tab; label: string; icon: typeof Play }[] = [
    { id: 'video', label: 'Video', icon: Film },
    { id: 'quiz', label: 'Quiz', icon: FileQuestion },
    { id: 'assignment', label: 'Assignment', icon: ClipboardList },
    { id: 'doubt', label: 'Doubt Clearing', icon: MessageCircle },
  ]

  const handleQuizSubmit = async () => {
    try {
      const answersArray = quizData.questions.map((q) => quizAnswers[q.id] ?? -1)
      const data = await api.post<{ submission: { score: number; passed: boolean } }>('/quizzes', {
        quizId: 'current',
        answers: answersArray,
      })
      setQuizScore(data.submission.score)
      setQuizSubmitted(true)
    } catch (err) {
      console.error('Failed to submit quiz:', err)
      let score = 0
      quizData.questions.forEach((q) => {
        if (quizAnswers[q.id] === q.correct) score++
      })
      setQuizScore(score)
      setQuizSubmitted(true)
    }
  }

  const handleAssignmentSubmit = async () => {
    try {
      await api.post('/assignments', { moduleId: mod?.id, content: assignmentText })
      setAssignmentSubmitted(true)
    } catch (err) {
      console.error('Failed to submit assignment:', err)
      setAssignmentSubmitted(true)
    }
  }

  const handleChatSend = () => {
    const text = chatInput.trim()
    if (!text) return
    const userMsg: ChatMessage = { id: msgIdCounter, text, isBot: false }
    const botMsg: ChatMessage = { id: msgIdCounter + 1, text: getBotResponse(text), isBot: true }
    setChatMessages((prev) => [...prev, userMsg, botMsg])
    setMsgIdCounter((c) => c + 2)
    setChatInput('')
  }

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSend()
    }
  }

  const prevDay = day > 1 ? day - 1 : null
  const nextDay = day < 90 ? day + 1 : null

  return (
    <div className="min-h-screen bg-nitai-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-20 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5 text-white/40" /> : <Menu className="w-5 h-5 text-white/40" />}
              </button>
              <Link to="/dashboard/student">
                <motion.div whileHover={{ x: -3 }} className="p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white/40" />
                </motion.div>
              </Link>
              <NitaiLogo />
            </div>
            <div className="flex items-center gap-3">
              <span className={`hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-gradient-to-r ${gradient}/20 text-white/70 border border-white/10`}>
                Day {mod.dayNumber} · {mod.phaseName}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-40 lg:z-10
            w-[280px] h-[calc(100vh-64px)]
            bg-nitai-dark/95 lg:bg-nitai-dark/50 backdrop-blur-xl
            border-r border-white/5
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col
          `}
        >
          <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {modules.map((m) => {
              const isCurrent = m.dayNumber === day
              const unlocked = checkUnlocked(m.dayNumber)
              const mpc = phaseColors[m.phase - 1]
              const showPhaseHeader = m.dayNumber === 1 || modules[m.dayNumber - 2]?.phase !== m.phase

              return (
                <div key={m.dayNumber}>
                  {showPhaseHeader && (
                    <div className="flex items-center gap-2 pt-3 pb-1.5 px-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: mpc.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{mpc.range}</span>
                    </div>
                  )}
                  <Link
                    to={unlocked ? `/dashboard/student/module/${m.dayNumber}` : '#'}
                    onClick={(e) => {
                      if (!unlocked) e.preventDefault()
                      else setSidebarOpen(false)
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200
                      ${isCurrent
                        ? 'bg-white/[0.06] border border-white/10'
                        : unlocked
                          ? 'hover:bg-white/[0.03] text-white/60 hover:text-white/80'
                          : 'text-white/20 cursor-not-allowed'
                      }
                    `}
                    style={isCurrent ? { borderColor: `${mpc.color}40` } : undefined}
                  >
                    <div
                      className={`
                        flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold flex-shrink-0
                        ${isCurrent ? 'text-white' : unlocked ? 'text-white/40' : 'text-white/10'}
                      `}
                      style={{
                        backgroundColor: isCurrent ? `${mpc.color}25` : unlocked ? `${mpc.color}10` : 'transparent',
                        border: `1px solid ${isCurrent ? `${mpc.color}40` : unlocked ? `${mpc.color}20` : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      {m.dayNumber}
                    </div>
                    <span className="flex-1 truncate text-xs">{m.title}</span>
                    {!unlocked && <LockKeyhole className="w-3 h-3 flex-shrink-0 text-white/10" />}
                    {isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: mpc.color }} />
                    )}
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="border-t border-white/5 p-3 flex gap-2">
            {prevDay ? (
              <Link
                to={`/dashboard/student/module/${prevDay}`}
                onClick={() => setSidebarOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-xs font-medium transition-all duration-200 border border-white/5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev Day
              </Link>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.02] text-white/20 text-xs font-medium cursor-not-allowed border border-white/5">
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev Day
              </div>
            )}
            {nextDay ? (
              <Link
                to={`/dashboard/student/module/${nextDay}`}
                onClick={() => setSidebarOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-xs font-medium transition-all duration-200 border border-white/5"
              >
                Next Day
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.02] text-white/20 text-xs font-medium cursor-not-allowed border border-white/5">
                Next Day
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${gradient}/20 border border-white/10`}>
                <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Day {mod.dayNumber}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${gradient}/20 text-white/60`}>
                    {mod.phaseName}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-0.5">
                  {mod.title}
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/40 ml-[52px] sm:ml-[58px]">{mod.description}</p>
            <div className="flex items-center gap-4 mt-3 ml-[52px] sm:ml-[58px]">
              <div className="flex items-center gap-1.5 text-xs text-white/30">
                <Award className="w-3.5 h-3.5" />
                <span>{mod.creditsReward} credits on completion</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/30">
                <Clock className="w-3.5 h-3.5" />
                <span>~30 min</span>
              </div>
            </div>
          </motion.div>

          {completionToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-white">Day {day} Complete! 🎉</p>
                  <p className="text-xs text-emerald-400/60">Next day is now unlocked</p>
                </div>
              </div>
              {nextDay && (
                <Link
                  to={`/dashboard/student/module/${nextDay}`}
                  className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                >
                  Next Day →
                </Link>
              )}
            </motion.div>
          )}

          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 mb-6 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-nitai-accent/20 text-nitai-accent-light shadow-sm'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'video' && (
                <VideoTab
                  videoUrl={mod.videoUrl}
                  dayNumber={day}
                  nextDay={nextDay || undefined}
                  onComplete={handleVideoComplete}
                />
              )}
              {activeTab === 'quiz' && (
                <QuizTab
                  answers={quizAnswers}
                  setAnswers={setQuizAnswers}
                  submitted={quizSubmitted}
                  score={quizScore}
                  onSubmit={handleQuizSubmit}
                />
              )}
              {activeTab === 'assignment' && (
                <AssignmentTab
                  text={assignmentText}
                  setText={setAssignmentText}
                  submitted={assignmentSubmitted}
                  onSubmit={handleAssignmentSubmit}
                />
              )}
              {activeTab === 'doubt' && (
                <DoubtTab
                  messages={chatMessages}
                  input={chatInput}
                  setInput={setChatInput}
                  onSend={handleChatSend}
                  onKeyDown={handleChatKeyDown}
                  chatEndRef={chatEndRef}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function VideoTab({
  videoUrl,
  dayNumber,
  nextDay,
  onComplete,
}: {
  videoUrl?: string
  dayNumber: number
  nextDay?: number
  onComplete: (day: number) => void
}) {
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleEnded = () => {
    if (videoEnded) return
    setVideoEnded(true)
    onComplete(dayNumber)
  }

  const handleIframeLoad = () => {
    // For iframe embeds (Google Drive, YouTube), we can't detect "ended"
    // We'll rely on user clicking "Mark Complete" or track time spent
  }

  useEffect(() => {
    setVideoEnded(false)
  }, [videoUrl])

  const isGDrive = videoUrl ? isGoogleDriveUrl(videoUrl) : false
  const isYT = videoUrl ? isYouTubeUrl(videoUrl) : false
  const embedUrl = videoUrl
    ? isGDrive
      ? getGoogleDriveEmbedUrl(videoUrl)
      : isYT
      ? getYouTubeEmbedUrl(videoUrl)
      : videoUrl
    : ''

  return (
    <div className="space-y-6">
      {videoUrl ? (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-nitai-card border border-white/10">
          {isGDrive || isYT ? (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title={`Day ${dayNumber} video lesson`}
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
            />
          ) : (
            <video
              ref={videoRef}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              className="w-full h-full object-contain bg-black/40"
              src={embedUrl}
              onEnded={handleEnded}
            >
              Your browser doesn&apos;t support video playback.
            </video>
          )}
          {(isGDrive || isYT) && (
            <div className="absolute bottom-2 right-2">
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-black/60 backdrop-blur-sm rounded-xl hover:bg-black/80 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open in full screen</span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-nitai-card to-nitai-dark border border-white/10 flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-nitai-dark/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-nitai-accent/80 backdrop-blur-sm shadow-2xl shadow-nitai-accent/30 group-hover:bg-nitai-accent transition-all duration-300"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/60">
            <Film className="w-4 h-4" />
            <span>Video lesson placeholder</span>
          </div>
        </div>
      )}

      {videoEnded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500/20 border border-white/10 mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Day {dayNumber} Complete! 🎉</h3>
          <p className="text-sm text-white/40 mb-4">Next day is now unlocked and ready to go.</p>
          {nextDay && (
            <Link
              to={`/dashboard/student/module/${nextDay}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300"
            >
              Go to Day {nextDay}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>
      )}

      <div className="glass rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-nitai-cyan" />
          <h3 className="font-semibold text-white">Lecture Notes</h3>
        </div>
        <div className="prose prose-invert prose-sm max-w-none text-white/50 space-y-3">
          <p>
            Welcome to the Nitai Learn-to-Earn platform! In this module, you&apos;ll learn the foundational concepts
            that will guide you through your 90-day journey from AI literacy to active monetization.
          </p>
          <p>
            <strong className="text-white/70">Key Takeaways:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>The Nitai platform operates on a Zero-Capital AI Startup model</li>
            <li>You earn Nitai Credits through streaks, modules, quizzes, and assignments</li>
            <li>Credits can be redeemed for 1,200+ digital resell assets</li>
            <li>The 90-day roadmap is divided into three phases: Hustler, Automation Agency, and Enterprise</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function QuizTab({
  answers,
  setAnswers,
  submitted,
  score,
  onSubmit,
}: {
  answers: Record<number, number>
  setAnswers: (a: Record<number, number>) => void
  submitted: boolean
  score: number
  onSubmit: () => void
}) {
  const total = quizData.questions.length
  const percentage = Math.round((score / total) * 100)

  return (
    <div className="space-y-6">
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-6 border text-center ${
            percentage >= 75
              ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20'
              : percentage >= 50
              ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20'
              : 'bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20'
          }`}
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${
            percentage >= 75 ? 'from-emerald-400 to-emerald-500' : percentage >= 50 ? 'from-amber-400 to-amber-500' : 'from-red-400 to-red-500'
          }/20 border border-white/10 mb-3`}>
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Quiz Complete!</h3>
          <p className="text-3xl font-bold text-gradient mb-1">{score}/{total}</p>
          <p className="text-sm text-white/40">{percentage >= 75 ? 'Great job!' : percentage >= 50 ? 'Good effort!' : 'Keep studying!'}</p>
        </motion.div>
      )}

      {quizData.questions.map((q, qIdx) => {
        const selected = answers[q.id]
        const isCorrect = submitted && selected === q.correct
        const isWrong = submitted && selected !== undefined && selected !== q.correct

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qIdx * 0.05 }}
            className={`glass rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
              isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : isWrong ? 'border-red-500/20 bg-red-500/5' : 'border-white/5'
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-nitai-accent/20 text-nitai-accent-light text-xs font-bold flex-shrink-0">
                {qIdx + 1}
              </span>
              <p className="text-sm sm:text-base text-white font-medium">{q.question}</p>
            </div>
            <div className="space-y-2 ml-10">
              {q.options.map((opt, oIdx) => {
                const isSelected = selected === oIdx
                return (
                  <button
                    key={oIdx}
                    onClick={() => !submitted && setAnswers({ ...answers, [q.id]: oIdx })}
                    disabled={submitted}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 border ${
                      submitted && oIdx === q.correct
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        : submitted && isSelected && oIdx !== q.correct
                        ? 'border-red-500/30 bg-red-500/10 text-red-300'
                        : isSelected
                        ? 'border-nitai-accent/30 bg-nitai-accent/10 text-white'
                        : 'border-white/5 bg-white/[0.02] text-white/50 hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        submitted && oIdx === q.correct
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : submitted && isSelected && oIdx !== q.correct
                          ? 'bg-red-500/20 text-red-400'
                          : isSelected
                          ? 'bg-nitai-accent/20 text-nitai-accent-light'
                          : 'bg-white/5 text-white/30'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                      {submitted && oIdx === q.correct && <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )
      })}

      {!submitted && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={Object.keys(answers).length < total}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Quiz ({Object.keys(answers).length}/{total} answered)
        </motion.button>
      )}
    </div>
  )
}

function AssignmentTab({
  text,
  setText,
  submitted,
  onSubmit,
}: {
  text: string
  setText: (t: string) => void
  submitted: boolean
  onSubmit: () => void
}) {
  return (
    <div className="space-y-6">
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500/20 border border-white/10 mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Assignment Submitted!</h3>
          <p className="text-sm text-white/40">Your work has been submitted for review. You&apos;ll receive credits once approved.</p>
        </motion.div>
      )}

      <div className="glass rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-nitai-cyan" />
          <h3 className="font-semibold text-white">Module Assignment</h3>
        </div>
        <p className="text-sm text-white/50 mb-4">
          In your own words, explain how the Nitai Learn-to-Earn platform works and how you plan
          to use it to achieve your financial goals. (Minimum 100 words)
        </p>

        <div className="flex gap-2 mb-4 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
          {[
            { icon: FileText, label: 'Text', active: true },
            { icon: Link2, label: 'URL', active: false },
            { icon: Upload, label: 'File', active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                active ? 'bg-nitai-accent/20 text-nitai-accent-light' : 'text-white/30 hover:text-white/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your assignment here..."
          rows={6}
          disabled={submitted}
          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300 resize-none disabled:opacity-40"
        />

        {!submitted && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            disabled={text.trim().length < 20}
            className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-pink text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Assignment
          </motion.button>
        )}
      </div>
    </div>
  )
}

function DoubtTab({
  messages,
  input,
  setInput,
  onSend,
  onKeyDown,
  chatEndRef,
}: {
  messages: ChatMessage[]
  input: string
  setInput: (v: string) => void
  onSend: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  chatEndRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="glass rounded-2xl border border-white/5 flex flex-col h-[500px] sm:h-[600px]">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-nitai-accent to-nitai-cyan/80">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">AI Didi</h3>
          <p className="text-xs text-white/40">Your doubt-clearing assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${!msg.isBot ? 'flex-row-reverse' : ''}`}>
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0 mt-1
                  ${msg.isBot
                    ? 'bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-white/10'
                    : 'bg-gradient-to-br from-nitai-cyan/20 to-nitai-accent/20 border border-white/10'
                  }
                `}
              >
                {msg.isBot ? <Bot className="w-4 h-4 text-nitai-accent-light" /> : <User className="w-4 h-4 text-nitai-cyan" />}
              </div>
              <div>
                <div
                  className={`
                    px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                    ${msg.isBot
                      ? 'bg-white/[0.04] border border-white/5 text-white/80 rounded-tl-sm'
                      : 'bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-white/10 text-white rounded-tr-sm'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-white/5 p-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask AI Didi a doubt..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSend}
            disabled={!input.trim()}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-nitai-accent/20 transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

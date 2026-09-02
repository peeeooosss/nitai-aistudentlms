import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Presentation,
  ClipboardCheck,
  CheckCircle,
  Award,
  Bot,
  Lock,
  ArrowRight,
} from 'lucide-react'
import { api } from '../services/api'
import type { Module, Quiz, QuizQuestion } from '../types/dashboard'
import AIAssistantDrawer from '../components/ai/AIAssistantDrawer'
import SlideViewer from '../components/slides/SlideViewer'

type Step = 'theory' | 'slides' | 'examples' | 'quiz' | 'complete'

const steps: { key: Step; label: string; icon: typeof BookOpen }[] = [
  { key: 'theory', label: 'Theory', icon: BookOpen },
  { key: 'slides', label: 'Slides', icon: Presentation },
  { key: 'examples', label: 'Examples', icon: Lightbulb },
  { key: 'quiz', label: 'Quiz', icon: ClipboardCheck },
]

function renderMarkdown(md: string): string {
  let html = md
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-white/70 my-4"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-sm text-nitai-accent-light">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-white/70 italic">$1</em>')
    .replace(/^- (.+)$/gm, '<li class="text-white/60 ml-4 mb-1">• $1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="text-white/60 ml-4 mb-1 list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-white/60 leading-relaxed mb-3">')
  html = '<p class="text-white/60 leading-relaxed mb-3">' + html + '</p>'
  return html
}

export default function ModulePlayer() {
  const { dayNumber } = useParams<{ dayNumber: string }>()
  const navigate = useNavigate()
  const day = parseInt(dayNumber || '1', 10)

  const [module, setModule] = useState<Module | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [step, setStep] = useState<Step>('theory')
  const [loading, setLoading] = useState(true)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [completing, setCompleting] = useState(false)
  const prevDayRef = useRef(day)

  useEffect(() => {
    if (day !== prevDayRef.current) {
      prevDayRef.current = day
      setStep('theory')
      setQuizAnswers({})
      setQuizSubmitted(false)
      setQuizScore(0)
      setLoading(true)
    }
  }, [day])

  const fetchData = useCallback(async () => {
    try {
      const [moduleResp, progressData] = await Promise.all([
        api.get<{ module: Module }>(`/modules?dayNumber=${day}`),
        api.get<{ completedDays: number[] }>('/progress'),
      ])
      const mod = moduleResp.module
      setModule(mod)
      setCompletedDays(progressData.completedDays || [])

      if (mod?.id) {
        try {
          const quizData = await api.get<{ quiz: Quiz }>(`/quizzes?moduleId=${mod.id}`)
          setQuiz(quizData.quiz)
        } catch {
          setQuiz(null)
        }
      }
    } catch {
      setModule(null)
    } finally {
      setLoading(false)
    }
  }, [day])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const isPreviousDayCompleted = day === 1 || completedDays.includes(day - 1)
  const isCurrentDayCompleted = completedDays.includes(day)

  const handleQuizSubmit = async () => {
    if (!quiz || !module) return
    try {
      const { submission } = await api.post<{
        submission: { score: number; passed: boolean; correctCount: number; totalQuestions: number }
      }>('/quizzes', {
        quizId: quiz.id,
        answers: quiz.questions.map((_, i) => quizAnswers[i] ?? -1),
      })
      setQuizScore(submission.correctCount)
      setQuizSubmitted(true)
      if (submission.passed) {
        handleMarkComplete()
      }
    } catch {
      let score = 0
      quiz.questions.forEach((q, i) => {
        if (quizAnswers[i] === q.correctIndex) score++
      })
      setQuizScore(score)
      setQuizSubmitted(true)
      const quizTotal = quiz.questions.length
      const quizPercentage = quizTotal > 0 ? Math.round((score / quizTotal) * 100) : 0
      const passed = quizPercentage >= (quiz.passScore || 75)
      if (passed) {
        handleMarkComplete()
      }
    }
  }

  const handleMarkComplete = async () => {
    if (!module || isCurrentDayCompleted || completing) return
    setCompleting(true)
    try {
      await api.post('/progress', { moduleId: module.id })
      setCompletedDays((prev) => [...prev, day].sort((a, b) => a - b))
      setStep('complete')
      setTimeout(() => {
        if (day < 90) navigate(`/dashboard/student/module/${day + 1}`)
      }, 3000)
    } catch (err) {
      console.error('Failed to mark complete:', err)
    } finally {
      setCompleting(false)
    }
  }

  const handleRetryQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
  }

  const nextStep = () => {
    if (step === 'theory') setStep('slides')
    else if (step === 'slides') setStep('examples')
    else if (step === 'examples') setStep('quiz')
  }

  const prevStep = () => {
    if (step === 'slides') setStep('theory')
    else if (step === 'examples') setStep('slides')
    else if (step === 'quiz') setStep('examples')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-nitai-dark flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-nitai-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!module) {
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

  if (!isPreviousDayCompleted && day !== 1) {
    return (
      <div className="min-h-screen bg-nitai-dark text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
            <Lock className="w-8 h-8 text-white/30" />
          </div>
          <h1 className="text-2xl font-bold text-white/80 mb-2">Day {day} is Locked</h1>
          <p className="text-white/40 mb-6">Complete Day {day - 1} first to unlock this module.</p>
          <Link
            to={`/dashboard/student/module/${day - 1}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-nitai-accent text-white font-semibold text-sm hover:bg-nitai-accent/90 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Go to Day {day - 1}
          </Link>
        </div>
      </div>
    )
  }

  const weekNumber = Math.ceil(day / 7)
  const dayInWeek = ((day - 1) % 7) + 1
  const sessionTypeLabel: Record<string, string> = {
    THEORY: 'Theory',
    QUIZ: 'Quiz',
    PROJECT: 'Project',
    LIVE_INTERACTIVE: 'Live',
  }

  const contentHtml = module.contentMarkdown ? renderMarkdown(module.contentMarkdown) : '<p class="text-white/40">No content available for this module yet.</p>'

  const examplesMatch = module.contentMarkdown?.match(/## Real-World Examples[\s\S]*?(?=## |$)/i)
  const examplesHtml = examplesMatch ? renderMarkdown(examplesMatch[0]) : null

  const quizTotal = quiz?.questions?.length || 0
  const quizPercentage = quizTotal > 0 ? Math.round((quizScore / quizTotal) * 100) : 0
  const passed = quizPercentage >= (quiz?.passScore || 75)

  return (
    <div className="min-h-screen bg-nitai-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-20 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard/student">
                <motion.div whileHover={{ x: -3 }} className="p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white/40" />
                </motion.div>
              </Link>
              <div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span>Week {weekNumber}</span>
                  <span>·</span>
                  <span>Day {dayInWeek}/7</span>
                  <span>·</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    module.sessionType === 'QUIZ'
                      ? 'bg-purple-500/20 text-purple-400'
                      : module.sessionType === 'PROJECT'
                        ? 'bg-orange-500/20 text-orange-400'
                        : module.sessionType === 'LIVE_INTERACTIVE'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {sessionTypeLabel[module.sessionType] || 'Theory'}
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-white leading-tight mt-0.5">{module.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/30">
                <Award className="w-3.5 h-3.5" />
                <span>{module.creditsReward} credits</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => {
            const isActive = s.key === step
            const stepIndex = steps.findIndex(x => x.key === step)
            const isComplete =
              step !== 'complete' && stepIndex >= 0 && i < stepIndex
            const Icon = s.icon
            return (
              <div key={s.key} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-nitai-accent/20 text-nitai-accent-light border border-nitai-accent/30'
                    : isComplete
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-white/5 text-white/30 border border-white/5'
                }`}>
                  {isComplete && !isActive ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 h-px mx-1 ${
                    isComplete ? 'bg-emerald-500/30' : 'bg-white/10'
                  }`} />
                )}
              </div>
            )
          })}
        </div>

        {isCurrentDayCompleted && step !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <p className="text-sm font-medium text-white">This day is already completed!</p>
            </div>
            {day < 90 && (
              <Link
                to={`/dashboard/student/module/${day + 1}`}
                className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
              >
                Next Day →
              </Link>
            )}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-nitai-card border border-white/5 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-5 h-5 text-nitai-cyan" />
                  <h2 className="text-lg font-bold text-white">Theory</h2>
                </div>
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'slides' && (
            <motion.div
              key="slides"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-1">
                <Presentation className="w-5 h-5 text-nitai-accent-light" />
                <h2 className="text-lg font-bold text-white">Presentation Slides</h2>
                <span className="ml-auto text-xs text-white/40 font-mono tracking-wider">
                  Use ← → arrow keys to navigate
                </span>
              </div>

              <SlideViewer
                dayNumber={day}
                title={module.title}
                contentMarkdown={module.contentMarkdown || ''}
                phase={day <= 30 ? 1 : day <= 60 ? 2 : 3}
                phaseName={day <= 30 ? 'Hustler' : day <= 60 ? 'Automation Agency' : 'Enterprise'}
              />

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white/60 font-semibold text-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Theory
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300"
                >
                  Examples
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'examples' && (
            <motion.div
              key="examples"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-nitai-card border border-white/5 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <Lightbulb className="w-5 h-5 text-nitai-gold" />
                  <h2 className="text-lg font-bold text-white">Real-World Examples</h2>
                </div>
                {examplesHtml ? (
                  <div
                    className="prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: examplesHtml }}
                  />
                ) : (
                  <div className="text-white/40 space-y-4">
                    <p>Here are practical examples related to today&apos;s module:</p>
                    <div className="grid gap-4">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <h4 className="text-sm font-semibold text-white/70 mb-2">Example 1</h4>
                        <p className="text-sm text-white/50">
                          Apply the concepts from today&apos;s theory to a real-world scenario.
                          Think about how this knowledge can be used in your daily workflow.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <h4 className="text-sm font-semibold text-white/70 mb-2">Example 2</h4>
                        <p className="text-sm text-white/50">
                          Consider how professionals in the field use these techniques.
                          What patterns do you notice? How can you adapt them?
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white/60 font-semibold text-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Slides
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300"
                >
                  Start Quiz
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {!quiz || quiz.questions.length === 0 ? (
                <div className="bg-nitai-card border border-white/5 rounded-2xl p-8 text-center">
                  <ClipboardCheck className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40">No quiz available for this module yet.</p>
                  <button
                    onClick={() => handleMarkComplete()}
                    className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm"
                  >
                    Skip to Complete
                  </button>
                </div>
              ) : (
                <>
                  {quizSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`rounded-2xl p-6 border text-center ${
                        passed
                          ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20'
                          : 'bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20'
                      }`}
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 mb-3 ${
                        passed ? 'bg-emerald-500/20' : 'bg-red-500/20'
                      }`}>
                        {passed ? (
                          <CheckCircle className="w-8 h-8 text-emerald-400" />
                        ) : (
                          <Award className="w-8 h-8 text-red-400" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {passed ? 'Passed!' : 'Not Passed'}
                      </h3>
                      <p className="text-3xl font-bold mb-1">
                        <span className={passed ? 'text-emerald-400' : 'text-red-400'}>
                          {quizScore}/{quizTotal}
                        </span>
                      </p>
                      <p className="text-sm text-white/40 mb-4">
                        {passed
                          ? `Great job! +${module.creditsReward} Credits`
                          : `You need ${quiz.passScore || 75}% to pass. Try again!`}
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        {!passed && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRetryQuiz}
                            className="px-6 py-3 rounded-xl bg-white/5 text-white/60 font-semibold text-sm border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            Try Again
                          </motion.button>
                        )}
                        {passed && !isCurrentDayCompleted && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleMarkComplete}
                            disabled={completing}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 disabled:opacity-40 transition-all duration-300"
                          >
                            {completing ? 'Marking...' : 'Mark Complete & Continue →'}
                          </motion.button>
                        )}
                        {passed && isCurrentDayCompleted && (
                          <Link
                            to={day < 90 ? `/dashboard/student/module/${day + 1}` : '/dashboard/student'}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 transition-all duration-300"
                          >
                            {day < 90 ? 'Next Day →' : 'Dashboard'}
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div className="bg-nitai-card border border-white/5 rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-5">
                      <ClipboardCheck className="w-5 h-5 text-nitai-accent-light" />
                      <h2 className="text-lg font-bold text-white">Quiz</h2>
                      {quizTotal > 0 && !quizSubmitted && (
                        <span className="ml-auto text-xs text-white/40">
                          {Object.keys(quizAnswers).length}/{quizTotal} answered
                        </span>
                      )}
                    </div>

                    <div className="space-y-5">
                      {quiz.questions.map((q: QuizQuestion, qIdx: number) => {
                        const selected = quizAnswers[qIdx]
                        const isCorrect = quizSubmitted && selected === q.correctIndex
                        const isWrong = quizSubmitted && selected !== undefined && selected !== q.correctIndex

                        return (
                          <div
                            key={qIdx}
                            className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                              isCorrect
                                ? 'border-emerald-500/20 bg-emerald-500/5'
                                : isWrong
                                  ? 'border-red-500/20 bg-red-500/5'
                                  : 'border-white/5 bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-nitai-accent/20 text-nitai-accent-light text-xs font-bold flex-shrink-0">
                                {qIdx + 1}
                              </span>
                              <p className="text-sm sm:text-base text-white font-medium">{q.question}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                              {q.options.map((opt: string, oIdx: number) => {
                                const isSelected = selected === oIdx
                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                                    disabled={quizSubmitted}
                                    className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 border ${
                                      quizSubmitted && oIdx === q.correctIndex
                                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                        : quizSubmitted && isSelected && oIdx !== q.correctIndex
                                          ? 'border-red-500/30 bg-red-500/10 text-red-300'
                                          : isSelected
                                            ? 'border-nitai-accent/30 bg-nitai-accent/10 text-white'
                                            : 'border-white/5 bg-white/[0.02] text-white/50 hover:border-white/10 hover:bg-white/[0.04]'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                        quizSubmitted && oIdx === q.correctIndex
                                          ? 'bg-emerald-500/20 text-emerald-400'
                                          : quizSubmitted && isSelected && oIdx !== q.correctIndex
                                            ? 'bg-red-500/20 text-red-400'
                                            : isSelected
                                              ? 'bg-nitai-accent/20 text-nitai-accent-light'
                                              : 'bg-white/5 text-white/30'
                                      }`}>
                                        {String.fromCharCode(65 + oIdx)}
                                      </span>
                                      <span>{opt}</span>
                                      {quizSubmitted && oIdx === q.correctIndex && (
                                        <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />
                                      )}
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                            {quizSubmitted && (
                              <div className="mt-3 ml-10 text-xs text-white/40 italic">
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {!quizSubmitted && (
                    <div className="flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={prevStep}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white/60 font-semibold text-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Examples
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < quizTotal}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Submit Quiz ({Object.keys(quizAnswers).length}/{quizTotal})
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/20 border border-white/10 mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Day {day} Complete!</h2>
              <p className="text-white/40 mb-2">
                Next day{day < 90 ? ` (Day ${day + 1})` : ''} unlocked. Auto-advancing in 3 seconds...
              </p>
              <p className="text-emerald-400 text-sm mb-6">
                +{module.creditsReward} Credits earned
              </p>
              {day < 90 ? (
                <Link
                  to={`/dashboard/student/module/${day + 1}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 transition-all duration-300"
                >
                  Go to Day {day + 1}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/dashboard/student"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 transition-all duration-300"
                >
                  Back to Dashboard
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {step !== 'complete' && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            {day > 1 ? (
              <Link
                to={`/dashboard/student/module/${day - 1}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-xs font-medium transition-all duration-200 border border-white/5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev Day
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.02] text-white/20 text-xs font-medium cursor-not-allowed border border-white/5">
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev Day
              </div>
            )}

            <div className="flex items-center gap-2">
              {steps.map((s) => {
                const activeIndex = steps.findIndex(x => x.key === step)
                const idx = steps.findIndex(x => x.key === s.key)
                const isComplete = step !== ('complete' as Step) && activeIndex > idx
                return (
                  <div
                    key={s.key}
                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
                       s.key === step
                         ? 'bg-nitai-accent w-6'
                         : isComplete
                           ? 'bg-emerald-400'
                           : 'bg-white/10'
                     }`}
                  />
                )
              })}
            </div>

            {day < 90 ? (
              <Link
                to={`/dashboard/student/module/${day + 1}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 text-xs font-medium transition-all duration-200 border border-white/5"
              >
                Next Day
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.02] text-white/20 text-xs font-medium cursor-not-allowed border border-white/5">
                Next Day
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-nitai-accent to-nitai-cyan text-white shadow-lg shadow-nitai-accent/30 hover:shadow-nitai-accent/50 transition-all duration-300"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      <AIAssistantDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        dayNumber={day}
        moduleTitle={module.title}
      />
    </div>
  )
}

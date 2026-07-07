import { motion, AnimatePresence } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { NitaiLogo } from '../components/NitaiLogo'
import { AIDidiBot } from '../components/AIDidiBot'
import { getModuleByDay, getPhaseGradient } from '../data/modules'
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
} from 'lucide-react'

type Tab = 'video' | 'quiz' | 'assignment'

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
  const [showDidi, setShowDidi] = useState(false)

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
  ]

  const handleQuizSubmit = () => {
    let score = 0
    quizData.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) score++
    })
    setQuizScore(score)
    setQuizSubmitted(true)
  }

  const handleAssignmentSubmit = () => {
    setAssignmentSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-nitai-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard/student">
                <motion.div whileHover={{ x: -3 }} className="p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white/40" />
                </motion.div>
              </Link>
              <NitaiLogo />
            </div>
            <div className="flex items-center gap-3">
              <span className={`hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-gradient-to-r ${gradient}/20 text-white/70 border border-white/10`}>
                Phase {mod.phase}: {mod.phaseName}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
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
            {activeTab === 'video' && <VideoTab />}
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
          </motion.div>
        </AnimatePresence>
      </main>

      <AIDidiBot isOpen={showDidi} onToggle={() => setShowDidi(!showDidi)} />
    </div>
  )
}

function VideoTab() {
  return (
    <div className="space-y-6">
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
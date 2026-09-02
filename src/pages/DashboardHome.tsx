import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Coins,
  Flame,
  Clock,
  Trophy,
  Play,
  Rocket,
  Calendar,
  ArrowRight,
  CheckCircle,
  Lock,
} from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { DashboardStats } from '../types/dashboard'

interface CurrentModule {
  dayNumber: number
  title: string
  sessionType: string
  weekNumber: number
  weekTitle: string
  phase: number
  phaseName: string
}

interface DashboardSession {
  id: string
  scheduledAt: string
  topic: string
  platform: string
  meetLink?: string | null
  moduleTitle: string
  dayNumber: number
}

interface RecentActivity {
  dayNumber: number
  title: string
  completedAt: string
}

interface HomeData {
  stats: DashboardStats & { nextDay: number | null }
  currentModule: CurrentModule | null
  upcomingSessions: DashboardSession[]
  recentActivity: RecentActivity[]
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' as const },
  }),
}

export default function DashboardHome() {
  const { user } = useAuth()
  const [data, setData] = useState<HomeData | null>(null)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<HomeData>('/dashboard'),
      api.get<{ completedDays: number[] }>('/modules').then((r) => r.completedDays).catch(() => []),
    ])
      .then(([home, completed]) => {
        setData(home)
        setCompletedDays(completed)
      })
      .catch(() =>
        setData({
          stats: {
            totalCredits: 0,
            currentStreak: 0,
            completedDays: 0,
            totalHours: 0,
            currentWeek: 1,
            currentDay: 0,
            nextDay: 1,
          },
          currentModule: null,
          upcomingSessions: [],
          recentActivity: [],
        }),
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-nitai-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { stats, upcomingSessions, recentActivity, currentModule } = data
  const nextDay = stats.nextDay ?? stats.currentDay + 1
  const currentWeekTitle = currentModule?.weekTitle || `Week ${stats.currentWeek}`
  const currentDayTitle = currentModule?.title || 'Start your first module'
  const totalDays = 90
  const progressPercent = Math.round((stats.completedDays / totalDays) * 100)

  const statCards = [
    { label: 'CREDITS', value: stats.totalCredits.toLocaleString(), icon: Coins, color: 'text-yellow-400' },
    { label: 'STREAK', value: `${stats.currentStreak} days`, icon: Flame, color: 'text-orange-400' },
    { label: 'LEARNED', value: `${stats.totalHours}h`, icon: Clock, color: 'text-blue-400' },
    { label: 'MODULES DONE', value: `${stats.completedDays}/${totalDays}`, icon: Trophy, color: 'text-emerald-400' },
  ]

  const nextSession = upcomingSessions[0]

  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome + Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
            className="bg-nitai-card border border-white/5 rounded-2xl p-6"
          >
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}
            </h1>
            <p className="text-white/50 mt-1">
              Day {nextDay} of {totalDays} &middot; Week {stats.currentWeek}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                animate="visible"
                custom={i + 1}
                variants={fadeIn}
                className="bg-nitai-card border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-2"
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next Live Session */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeIn}
          className="bg-nitai-card border border-white/5 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Next Live Session
            </h2>
          </div>
          {nextSession ? (
            <>
              <p className="text-white font-semibold text-lg">{nextSession.topic}</p>
              <p className="text-white/40 text-sm mt-1">
                {new Date(nextSession.scheduledAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                at{' '}
                {new Date(nextSession.scheduledAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-white/30 text-xs mt-1">
                Day {nextSession.dayNumber} &middot; {nextSession.platform}
              </p>
              <a
                href={nextSession.meetLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 inline-flex items-center justify-center gap-2 bg-nitai-accent hover:bg-nitai-accent/90 text-white font-semibold rounded-xl px-4 py-3 transition-colors"
              >
                <Play className="w-4 h-4" />
                Join Live
              </a>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <Calendar className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-white/40 text-sm">No upcoming sessions</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Continue Learning */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeIn}
        className="bg-nitai-card border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-nitai-accent" />
            Continue Learning
          </h2>
          <a
            href="/dashboard/student/modules"
            className="text-nitai-accent text-sm font-semibold hover:underline inline-flex items-center gap-1"
          >
            View All Modules <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/40 mb-1">
            <span>Week {stats.currentWeek}: {currentWeekTitle}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' as const }}
              className="h-full bg-nitai-accent rounded-full"
            />
          </div>
        </div>

        {/* Day chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: 7 }, (_, i) => {
            const globalDay = (stats.currentWeek - 1) * 7 + (i + 1)
            const isComplete = completedDays.includes(globalDay)
            const isCurrent = globalDay === nextDay
            const isLocked = globalDay > nextDay

            return (
              <div
                key={globalDay}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isComplete
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : isCurrent
                      ? 'bg-nitai-accent/10 border-nitai-accent/30 text-nitai-accent'
                      : 'bg-white/5 border-white/5 text-white/30'
                }`}
              >
                {isComplete ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : null}
                Day {i + 1}
              </div>
            )
          })}
        </div>

        {/* Next lesson CTA */}
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
          <div>
            <p className="text-white/40 text-xs mb-0.5">NEXT LESSON</p>
            <p className="text-white font-semibold">
              Day {nextDay} — {currentDayTitle}
            </p>
          </div>
          <a
            href={`/dashboard/student/module/${nextDay}`}
            className="inline-flex items-center gap-2 bg-nitai-accent hover:bg-nitai-accent/90 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
          >
            Continue Day {nextDay}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* This Week */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeIn}
          className="bg-nitai-card border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            This Week
          </h3>
          <div className="space-y-2">
            {Array.from({ length: 7 }, (_, i) => {
              const globalDay = (stats.currentWeek - 1) * 7 + (i + 1)
              const isComplete = completedDays.includes(globalDay)
              const isCurrent = globalDay === nextDay
              return (
                <div
                  key={globalDay}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    isComplete
                      ? 'text-emerald-400 bg-emerald-500/5'
                      : isCurrent
                        ? 'text-white bg-nitai-accent/10 border border-nitai-accent/20'
                        : 'text-white/30'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 shrink-0 rounded-full border-2 border-nitai-accent" />
                  ) : (
                    <Lock className="w-4 h-4 shrink-0" />
                  )}
                  Day {i + 1}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Upcoming Live */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={6}
          variants={fadeIn}
          className="bg-nitai-card border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Upcoming Live
          </h3>
          <div className="space-y-3">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.slice(0, 3).map((session) => (
                <div
                  key={session.id}
                  className="bg-white/5 rounded-xl p-3 border border-white/5"
                >
                  <p className="text-white font-medium text-sm">{session.topic}</p>
                  <p className="text-white/40 text-xs mt-1">
                    {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    &middot; {session.platform}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white/30 text-sm">No upcoming sessions</p>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={7}
          variants={fadeIn}
          className="bg-nitai-card border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={`${item.dayNumber}-${item.completedAt}`} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-sm">
                    Completed Day {item.dayNumber} — {item.title}
                  </p>
                  <p className="text-white/30 text-xs">
                    {new Date(item.completedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-white/30 text-sm">No recent activity</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

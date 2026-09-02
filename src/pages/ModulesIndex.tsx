import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Lock,
  Play,
  FileText,
  HelpCircle,
  Users,
} from 'lucide-react'
import { api } from '../services/api'
import type { Week, Module } from '../types/dashboard'

interface WeeksData {
  weeks: Week[]
  modules: Module[]
  completedDays: number[]
  currentWeek: number
  currentDay: number
}

const sessionIcons: Record<string, typeof Play> = {
  THEORY: FileText,
  QUIZ: HelpCircle,
  PROJECT: Play,
  LIVE_INTERACTIVE: Users,
}

const sessionColors: Record<string, string> = {
  THEORY: 'text-blue-400',
  QUIZ: 'text-purple-400',
  PROJECT: 'text-orange-400',
  LIVE_INTERACTIVE: 'text-red-400',
}

const phaseColors: Record<number, string> = {
  1: 'bg-emerald-500',
  2: 'bg-blue-500',
  3: 'bg-purple-500',
}

function WeekAccordion({
  week,
  modules,
  completedDays,
  isOpen,
  onToggle,
}: {
  week: Week
  modules: Module[]
  completedDays: number[]
  isOpen: boolean
  onToggle: () => void
}) {
  const weekModules = modules.filter((m) => m.weekId === week.id)
  const phaseColor = phaseColors[week.phase] || 'bg-white/20'
  const completedInWeek = weekModules.filter((m) =>
    completedDays.includes(m.dayNumber),
  ).length
  const progressPercent = weekModules.length
    ? Math.round((completedInWeek / weekModules.length) * 100)
    : 0

  return (
    <div className="bg-nitai-card border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="shrink-0">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-white/40" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/40" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-sm font-mono">W{week.weekNumber}</span>
            <h3 className="text-white font-semibold truncate">{week.title}</h3>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${phaseColor}`}
            >
              {week.phaseName}
            </span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[200px]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${phaseColor}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-white/30">
              {completedInWeek}/{weekModules.length}
            </span>
          </div>
        </div>
      </button>

      {/* Days grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 grid grid-cols-7 gap-2">
              {weekModules
                .sort((a, b) => a.dayInWeek - b.dayInWeek)
                .map((mod) => {
                  const isComplete = completedDays.includes(mod.dayNumber)
                  const maxCompleted = completedDays.length ? Math.max(...completedDays) : 0
                  const isCurrent = mod.dayNumber === maxCompleted + 1
                  const isLocked = mod.dayNumber > maxCompleted + 1
                  const Icon = sessionIcons[mod.sessionType] || FileText

                  return (
                    <a
                      key={mod.id}
                      href={
                        isLocked
                          ? undefined
                          : `/dashboard/student/module/${mod.dayNumber}`
                      }
                      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                        isComplete
                          ? 'bg-emerald-500/10 border-emerald-500/20'
                          : isCurrent
                            ? 'bg-nitai-accent/10 border-nitai-accent/30 ring-1 ring-nitai-accent/20'
                            : isLocked
                              ? 'bg-white/[0.02] border-white/5 opacity-40 cursor-not-allowed'
                              : 'bg-white/[0.03] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <span className="text-[10px] text-white/30 font-medium">
                        Day {mod.dayInWeek}
                      </span>
                      <Icon
                        className={`w-5 h-5 ${
                          isComplete
                            ? 'text-emerald-400'
                            : isCurrent
                              ? 'text-nitai-accent'
                              : sessionColors[mod.sessionType] || 'text-white/30'
                        }`}
                      />
                      <span className="text-[9px] text-white/30 uppercase tracking-wide leading-tight">
                        {mod.sessionType === 'LIVE_INTERACTIVE'
                          ? 'Live'
                          : mod.sessionType.slice(0, 4)}
                      </span>
                      {isComplete && (
                        <div className="absolute -top-1 -right-1">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-white/20" />
                        </div>
                      )}
                    </a>
                  )
                })}
              {weekModules.length === 0 && (
                <div className="col-span-7 text-center text-white/20 text-sm py-8">
                  No modules available yet
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ModulesIndex() {
  const [data, setData] = useState<WeeksData | null>(null)
  const [loading, setLoading] = useState(true)
  const [openWeek, setOpenWeek] = useState<number | null>(null)

  useEffect(() => {
    api
      .get<WeeksData>('/modules')
      .then((d) => {
        setData(d)
        setOpenWeek(d.currentWeek)
      })
      .catch(() =>
        setData({
          weeks: [],
          modules: [],
          completedDays: [],
          currentWeek: 1,
          currentDay: 1,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Modules</h1>
          <p className="text-white/50 mt-1">90-Day AI Student Roadmap</p>
        </div>
        <div className="bg-nitai-card border border-white/5 rounded-xl px-4 py-2">
          <span className="text-white/40 text-sm">
            {data.weeks.length > 0
              ? `${data.weeks.filter((w) => {
                  const weekModules = data.modules.filter((m) => m.weekId === w.id)
                  return weekModules.every((m) => data.completedDays.includes(m.dayNumber))
                }).length}/${data.weeks.length} Weeks`
              : '0/13 Weeks'}
          </span>
        </div>
      </motion.div>

      {/* Weeks list */}
      <div className="space-y-3">
        {data.weeks.map((week) => (
          <WeekAccordion
            key={week.id}
            week={week}
            modules={data.modules}
            completedDays={data.completedDays}
            isOpen={openWeek === week.weekNumber}
            onToggle={() =>
              setOpenWeek(openWeek === week.weekNumber ? null : week.weekNumber)
            }
          />
        ))}
        {data.weeks.length === 0 && (
          <div className="bg-nitai-card border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-white/40">No weeks available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

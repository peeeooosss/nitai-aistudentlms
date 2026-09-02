import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Lock, CheckCircle2, Play, FileQuestion, FolderGit2, Radio } from 'lucide-react'
import type { Week, Module } from '../../types/dashboard'

interface WeekAccordionProps {
  weeks: Week[]
  completedDays: number[]
  currentDayNumber?: number
}

const sessionTypeConfig: Record<Module['sessionType'], { label: string; color: string; icon: React.ElementType }> = {
  THEORY: { label: 'Theory', color: 'text-blue-400 bg-blue-400/10', icon: Play },
  QUIZ: { label: 'Quiz', color: 'text-amber-400 bg-amber-400/10', icon: FileQuestion },
  PROJECT: { label: 'Project', color: 'text-purple-400 bg-purple-400/10', icon: FolderGit2 },
  LIVE_INTERACTIVE: { label: 'Live', color: 'text-cyan-400 bg-cyan-400/10', icon: Radio },
}

const phaseColors: Record<number, string> = {
  1: 'bg-emerald-500/10 text-emerald-400',
  2: 'bg-amber-500/10 text-amber-400',
  3: 'bg-rose-500/10 text-rose-400',
}

export function WeekAccordion({ weeks, completedDays, currentDayNumber }: WeekAccordionProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentDayNumber ? Math.ceil(currentDayNumber / 7) : null)

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeek((prev) => (prev === weekNumber ? null : weekNumber))
  }

  const getCompletedCount = (weekNumber: number) => {
    const start = (weekNumber - 1) * 7 + 1
    const end = weekNumber * 7
    return completedDays.filter((d) => d >= start && d <= end).length
  }

  const isDayCompleted = (dayNumber: number) => completedDays.includes(dayNumber)
  const maxCompleted = completedDays.length ? Math.max(...completedDays) : 0
  const isDayLocked = (dayNumber: number) => dayNumber > maxCompleted + 1

  const getSessionType = (dayInWeek: number): Module['sessionType'] => {
    if (dayInWeek === 7) return 'QUIZ'
    if (dayInWeek === 6) return 'PROJECT'
    if (dayInWeek === 5) return 'LIVE_INTERACTIVE'
    return 'THEORY'
  }

  return (
    <div className="space-y-0.5">
      {weeks.map((week) => {
        const isExpanded = expandedWeek === week.weekNumber
        const completedCount = getCompletedCount(week.weekNumber)

        return (
          <div key={week.id}>
            {/* Week header */}
            <button
              onClick={() => toggleWeek(week.weekNumber)}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors group"
            >
              <ChevronDown
                size={14}
                className={`shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
              <span className="flex-1 text-left truncate">Wk {week.weekNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${phaseColors[week.phase] ?? 'bg-white/10 text-white/50'}`}>
                P{week.phase}
              </span>
              <span className="text-[11px] text-white/30 tabular-nums">
                {completedCount}/7
              </span>
            </button>

            {/* Day list */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-1 py-1 space-y-0.5">
                    {Array.from({ length: 7 }, (_, i) => {
                      const dayNumber = (week.weekNumber - 1) * 7 + i + 1
                      const dayInWeek = i + 1
                      const sessionType = getSessionType(dayInWeek)
                      const config = sessionTypeConfig[sessionType]
                      const completed = isDayCompleted(dayNumber)
                      const locked = isDayLocked(dayNumber)
                      const Icon = config.icon

                      return (
                        <NavLink
                          key={dayNumber}
                          to={locked ? '#' : `/dashboard/student/module/${dayNumber}`}
                          onClick={(e) => {
                            if (locked) e.preventDefault()
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors group ${
                            locked
                              ? 'cursor-not-allowed opacity-40'
                              : completed
                              ? 'text-white/70 hover:bg-white/[0.04]'
                              : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <Icon size={13} className={`shrink-0 ${config.color.split(' ')[0]}`} />
                          <span className="flex-1 truncate">Day {dayNumber}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${config.color}`}>
                            {config.label}
                          </span>
                          {completed && (
                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          )}
                          {locked && !completed && (
                            <Lock size={12} className="text-white/20 shrink-0" />
                          )}
                        </NavLink>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

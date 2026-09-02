import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Menu,
  X,
  Calendar,
  ChevronRight,
  Home,
  BookOpen,
  FolderOpen,
} from 'lucide-react'
import { WeekAccordion } from './WeekAccordion'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'
import type { Week } from '../../types/dashboard'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const sidebarVariants = {
  expanded: { width: 280 },
  collapsed: { width: 64 },
}

const studentLinks = [
  { to: '/dashboard/student', label: 'Dashboard', icon: Home, end: true },
  { to: '/dashboard/student/live', label: 'Live Sessions', icon: Calendar },
  { to: '/dashboard/student/modules', label: 'All Modules', icon: BookOpen },
  { to: '/dashboard/student/resources', label: 'Resources', icon: FolderOpen },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth()
  const [weeks, setWeeks] = useState<Week[]>([])
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [currentDay, setCurrentDay] = useState(1)

  useEffect(() => {
    api.get<{ weeks: Week[]; completedDays: number[]; currentDay: number }>('/modules')
      .then((data) => {
        setWeeks(data.weeks || [])
        setCompletedDays(data.completedDays || [])
        setCurrentDay(data.currentDay || 1)
      })
      .catch(() => {})
  }, [])

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex flex-col bg-nitai-dark/95 border-r border-white/5 backdrop-blur-xl h-screen sticky top-0 z-40"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-lg tracking-tight"
          >
            Nitai
          </motion.span>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-white/60 hover:text-white"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6">
        {/* Student Nav */}
        <div>
          {!collapsed && (
            <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Navigation
            </p>
          )}
          <nav className="space-y-1">
            {studentLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-white/[0.06] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                <link.icon size={18} className="shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Modules */}
        <div>
          {!collapsed && (
            <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Modules
            </p>
          )}
          {!collapsed && weeks.length > 0 ? (
            <WeekAccordion
              weeks={weeks}
              completedDays={completedDays}
              currentDayNumber={currentDay}
            />
          ) : !collapsed ? (
            <div className="px-3 py-2 text-xs text-white/30">Loading modules...</div>
          ) : (
            <NavLink
              to="/dashboard/student/modules"
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white/[0.06] text-cyan-400'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              <ChevronRight size={18} />
            </NavLink>
          )}
        </div>
      </div>

      {/* User section */}
      <div className="border-t border-white/5 p-3">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'N'}
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-medium truncate">{user?.name || 'Student'}</p>
              <div className="flex items-center gap-3 text-[11px] text-white/40">
                <span>{(user?.credits ?? 0).toLocaleString()} credits</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}

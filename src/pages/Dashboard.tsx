import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { NitaiLogo } from '../components/NitaiLogo'
import {
  LogOut,
  Bell,
  Settings,
  Lock,
  Sparkles,
  Clock,
  Trophy,
  Coins,
  Flame,
  ChevronRight,
  Play,
  Zap,
  BarChart3,
  Rocket,
  LockKeyhole,
  Star,
} from 'lucide-react'
import { useState } from 'react'
import { modules } from '../data/modules'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules'>('modules')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-nitai-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <NitaiLogo />
              </Link>
              <div className="hidden sm:flex items-center gap-1 ml-4 p-1 rounded-xl bg-white/[0.03] border border-white/5">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === 'overview'
                      ? 'bg-nitai-accent/20 text-nitai-accent-light shadow-sm'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === 'modules'
                      ? 'bg-nitai-accent/20 text-nitai-accent-light shadow-sm'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  90-Day Grid
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-xl text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-nitai-pink animate-pulse" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="p-2 rounded-xl text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="sm:hidden relative z-10 flex gap-1 p-2 bg-white/[0.02] border-b border-white/5">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            activeTab === 'overview'
              ? 'bg-nitai-accent/20 text-nitai-accent-light'
              : 'text-white/40'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
            activeTab === 'modules'
              ? 'bg-nitai-accent/20 text-nitai-accent-light'
              : 'text-white/40'
          }`}
        >
          90-Day Grid
        </button>
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' ? <OverviewContent /> : <ModulesGrid />}
      </main>
    </div>
  )
}

function OverviewContent() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {[
          { icon: Coins, label: 'Nitai Credits', value: '1,250', color: 'from-amber-400 to-orange-500' },
          { icon: Flame, label: 'Day Streak', value: '3', color: 'from-red-400 to-pink-500' },
          { icon: Clock, label: 'Total Hours', value: '12', color: 'from-cyan-400 to-blue-500' },
          { icon: Trophy, label: 'Modules Done', value: '1 / 90', color: 'from-purple-400 to-pink-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl sm:rounded-2xl border border-white/5 p-4 sm:p-5"
          >
            <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color}/20 border border-white/10 mb-3`}>
              <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs sm:text-sm text-white/30">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-white/5 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-6 h-6 text-nitai-cyan" />
          <h2 className="text-lg sm:text-xl font-bold text-white">Your Journey So Far</h2>
        </div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-nitai-cyan/30 to-nitai-cyan/10 border border-nitai-cyan/20">
              <Sparkles className="w-6 h-6 text-nitai-cyan" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Day 1: Welcome to Nitai</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-nitai-cyan/20 text-nitai-cyan">Completed</span>
              </div>
              <p className="text-xs text-white/30 mt-0.5">You earned 25 credits for this module</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20" />
          </div>
          <div className="flex items-center gap-4 opacity-40">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5">
              <Lock className="w-5 h-5 text-white/20" />
            </div>
            <div className="flex-1">
              <span className="text-sm text-white/30">Day 2: What is AI?</span>
              <p className="text-xs text-white/20 mt-0.5">Complete Day 1 to unlock</p>
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/student/module/1"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white text-sm font-semibold shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 hover:scale-[1.02] transition-all duration-300"
        >
          <Play className="w-4 h-4" />
          Continue Learning
        </Link>
      </motion.div>
    </div>
  )
}

function ModulesGrid() {
  const phaseModules = [modules.filter((m) => m.phase === 1), modules.filter((m) => m.phase === 2), modules.filter((m) => m.phase === 3)]
  const phaseMeta = [
    { name: 'Hustler', days: 'Days 1–30', icon: Rocket, color: 'cyan' },
    { name: 'Automation Agency', days: 'Days 31–60', icon: Zap, color: 'purple' },
    { name: 'Enterprise', days: 'Days 61–90', icon: BarChart3, color: 'amber' },
  ]

  return (
    <div className="space-y-8">
      {phaseModules.map((phaseMods, phaseIdx) => {
        const meta = phaseMeta[phaseIdx]
        const Icon = meta.icon
        return (
          <motion.div
            key={meta.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phaseIdx * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-${meta.color}-500/20 border border-${meta.color}-500/20`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${meta.color}-400`} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{meta.name}</h3>
                <p className="text-xs text-white/30">{meta.days}</p>
              </div>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
              {phaseMods.map((mod) => {
                const isUnlocked = mod.dayNumber === 1
                return (
                  <Link
                    key={mod.dayNumber}
                    to={isUnlocked ? `/dashboard/student/module/${mod.dayNumber}` : '#'}
                    onClick={(e) => {
                      if (!isUnlocked) e.preventDefault()
                    }}
                    className={`group relative aspect-[3/4] rounded-lg sm:rounded-xl border overflow-hidden transition-all duration-300 ${
                      isUnlocked
                        ? `border-${meta.color}-500/30 bg-gradient-to-b from-${meta.color}-500/10 to-${meta.color}-500/5 hover:scale-105 hover:shadow-lg hover:shadow-${meta.color}-500/20`
                        : 'border-white/5 bg-white/[0.02] cursor-not-allowed'
                    }`}
                  >
                    {isUnlocked && (
                      <div className={`absolute inset-0 bg-gradient-to-b from-${meta.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    )}
                    <div className="relative h-full flex flex-col items-center justify-center p-1 sm:p-2">
                      <span className={`text-xs sm:text-sm font-bold leading-none ${isUnlocked ? 'text-white' : 'text-white/20'}`}>
                        {mod.dayNumber}
                      </span>
                      <div className="mt-1 sm:mt-1.5 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                        {isUnlocked ? (
                          <Play className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-${meta.color}-400`} />
                        ) : (
                          <LockKeyhole className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20" />
                        )}
                      </div>
                      <span className={`mt-1 text-[7px] sm:text-[9px] font-medium leading-tight text-center line-clamp-2 ${isUnlocked ? 'text-white/70' : 'text-white/20'}`}>
                        {mod.title}
                      </span>
                      {isUnlocked && (
                        <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5">
                          <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-cyan-400 fill-cyan-400" />
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
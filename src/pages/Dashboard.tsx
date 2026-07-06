import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { NitaiLogo } from '../components/NitaiLogo'
import {
  LogOut,
  Bell,
  Settings,
  Grid,
  Lock,
  Sparkles,
  Clock,
  Trophy,
  Coins,
  Flame,
  Construction,
  Wrench,
  Hammer,
} from 'lucide-react'
import { useState } from 'react'

const days = Array.from({ length: 90 }, (_, i) => i + 1)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules'>('overview')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-nitai-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
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

      {/* Mobile Tab Bar */}
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
        {activeTab === 'overview' ? (
          <OverviewContent />
        ) : (
          <ModulesGrid />
        )}
      </main>
    </div>
  )
}

function OverviewContent() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {[
          { icon: Coins, label: 'Nitai Credits', value: '0', color: 'from-amber-400 to-orange-500' },
          { icon: Flame, label: 'Day Streak', value: '0', color: 'from-red-400 to-pink-500' },
          { icon: Clock, label: 'Total Hours', value: '0', color: 'from-cyan-400 to-blue-500' },
          { icon: Trophy, label: 'Modules Done', value: '0 / 90', color: 'from-purple-400 to-pink-500' },
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

      {/* Under Construction Banner */}
      <UnderConstructionBanner />
    </div>
  )
}

function UnderConstructionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-nitai-accent/10 via-nitai-cyan/5 to-nitai-pink/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nitai-accent-light/30 to-transparent" />

      <div className="relative p-8 sm:p-12 lg:p-16 text-center">
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-nitai-cyan/20 mb-6"
        >
          <Construction className="w-10 h-10 sm:w-12 sm:h-12 text-nitai-cyan" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
          <span className="text-gradient">Dashboard Under Construction</span>
        </h2>

        <p className="text-white/40 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          We&apos;re building the most epic learning dashboard you&apos;ve ever seen.
          Your 90-day journey, AI tutor, real-time credits — all coming soon.
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {[
            { icon: Sparkles, text: 'AI Didi Tutor' },
            { icon: Grid, text: 'Module Grid' },
            { icon: Trophy, text: 'Quizzes' },
            { icon: Lock, text: 'Assignments' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-white/60 hover:bg-white/[0.05] transition-all duration-300">
              <Icon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/20">
          <Hammer className="w-4 h-4" />
          <span>Currently in development — stay tuned for launch</span>
          <Wrench className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

function ModulesGrid() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/5 p-6 sm:p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-nitai-cyan/20 mb-4">
          <Grid className="w-8 h-8 text-nitai-cyan" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          90-Day Module Grid
        </h3>
        <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
          The complete roadmap grid is being built. Each day unlocks the next — 
          with videos, quizzes, assignments, and credit rewards.
        </p>

        {/* Preview Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2 max-w-xl mx-auto">
          {days.slice(0, 30).map((day) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: day * 0.01 }}
              className={`aspect-square rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                day === 1
                  ? 'bg-gradient-to-br from-nitai-cyan/30 to-nitai-cyan/10 text-nitai-cyan border border-nitai-cyan/20'
                  : 'bg-white/[0.03] text-white/20 border border-white/5'
              }`}
            >
              {day === 1 ? (
                <Sparkles className="w-3 h-3" />
              ) : (
                <Lock className="w-3 h-3" />
              )}
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/20">
          Showing preview (1-30) &middot; {90 - 30} more days locked
        </p>
      </motion.div>
    </div>
  )
}
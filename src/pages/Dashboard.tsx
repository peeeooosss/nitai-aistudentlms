import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import { NitaiLogo } from '../components/NitaiLogo'
import { NotificationDropdown } from '../components/NotificationDropdown'
import { SettingsDrawer } from '../components/SettingsDrawer'
import {
  ArrowLeft,
  LogOut,
  Bell,
  Settings,
  Clock,
  Trophy,
  Coins,
  Flame,
  Play,
  Rocket,
  Sparkles,
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-nitai-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-30 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ x: -3 }}
                onClick={() => navigate('/')}
                className="p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white/40" />
              </motion.button>
              <NitaiLogo />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-nitai-pink animate-pulse" />
                </motion.button>
                <NotificationDropdown isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-xl text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 rounded-xl text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DashboardContent />
      </main>

      <SettingsDrawer isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}

function DashboardContent() {
  const { user } = useAuth()
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await api.get<{ completedModules: number[] }>('/progress')
        setCompletedModules(data.completedModules || [])
      } catch (err) {
        console.error('Failed to fetch progress:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  const nextDay = completedModules.length > 0 ? Math.max(...completedModules) + 1 : 1
  const hasStarted = completedModules.length > 0
  const credits = user?.credits || 0

  const stats = [
    { icon: Coins, label: 'Nitai Credits', value: credits.toLocaleString(), color: 'from-amber-400 to-orange-500' },
    { icon: Flame, label: 'Day Streak', value: hasStarted ? '1' : '0', color: 'from-red-400 to-pink-500' },
    { icon: Clock, label: 'Total Hours', value: hasStarted ? `${(completedModules.length * 0.5).toFixed(1)}` : '0', color: 'from-cyan-400 to-blue-500' },
    { icon: Trophy, label: 'Modules Done', value: `${completedModules.length} / 90`, color: 'from-purple-400 to-pink-500' },
  ] as const

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-nitai-cyan/30 border-t-nitai-cyan rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat, i) => (
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
        transition={{ delay: 0.15 }}
      >
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="relative p-6 sm:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-nitai-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-white/10 flex-shrink-0">
                <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-nitai-cyan" />
              </div>

              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  {hasStarted ? 'Continue Your Journey' : 'Start Your Journey'}
                </h2>
                <p className="text-sm sm:text-base text-white/40 max-w-lg">
                  {hasStarted
                    ? `You've completed ${completedModules.length} of 90 modules. Keep going!`
                    : 'Your 90-day path to financial freedom through AI literacy and active monetization.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <Link
                    to={`/dashboard/student/module/${nextDay}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white text-sm font-semibold shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 hover:scale-[1.02] transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    {hasStarted ? `Continue Day ${nextDay}` : 'Start Course'}
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-white/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
                    <span>{hasStarted ? `Pick up on Day ${nextDay}` : 'or pick up where you left off on Day 1'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 pt-8 border-t border-white/5">
              {[
                { label: 'Phases', value: '3', color: '#06b6d4' },
                { label: 'Total Modules', value: '90', color: '#a78bfa' },
                { label: 'Max Credits', value: '3,450', color: '#fbbf24' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-white" style={{ color: item.color }}>
                    {item.value}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

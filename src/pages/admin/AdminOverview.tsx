import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Users, Coins, TrendingUp, Activity, Flame, Award } from 'lucide-react'
import { api } from '../../services/api'

interface AdminStats {
  totalUsers: number
  totalCredits: number
  activeStreaks: number
  completionRate: number
}

interface ActivityItem {
  userName: string
  moduleTitle: string
  dayNumber: number
  completedAt: string
}

export default function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get<{ stats: AdminStats; recentActivity: ActivityItem[] }>('/admin/stats')
        setStats(data.stats)
        setRecentActivity(data.recentActivity)
      } catch (err) {
        console.error('Failed to fetch admin stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { icon: Users, label: 'Total Users', value: stats?.totalUsers?.toLocaleString() || '0', color: 'from-cyan-400 to-blue-500' },
    { icon: Coins, label: 'Credits Earned', value: stats?.totalCredits?.toLocaleString() || '0', color: 'from-amber-400 to-orange-500' },
    { icon: Flame, label: 'Active Streaks', value: stats?.activeStreaks?.toLocaleString() || '0', color: 'from-red-400 to-pink-500' },
    { icon: TrendingUp, label: 'Completion Rate', value: `${stats?.completionRate || 0}%`, color: 'from-purple-400 to-pink-500' },
  ]

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-nitai-cyan/30 border-t-nitai-cyan rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Overview</h1>
            <p className="text-white/40 text-sm mt-1">Ecosystem Analytics & Active Streaks</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
            <Activity className="w-3.5 h-3.5" />
            Live
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color}/20 border border-white/10`}>
                  <stat.icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/30">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl border border-white/5 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-4">No activity yet</p>
              ) : (
                recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 bg-nitai-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70 truncate">{item.userName} completed Day {item.dayNumber}</p>
                      <p className="text-xs text-white/30">{item.moduleTitle}</p>
                    </div>
                    <span className="text-xs text-white/20 flex-shrink-0">
                      {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/5 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Manage Modules', desc: 'Edit titles, videos, and credits', href: '/admin/modules' },
                { label: 'Review Submissions', desc: 'Grade pending assignments', href: '/admin/evaluations' },
                { label: 'Send Broadcast', desc: 'Notify all active students', href: '/admin/notifications' },
                { label: 'Manage Store', desc: 'Add and edit store items', href: '/admin/economy' },
              ].map((action, i) => (
                <a
                  key={i}
                  href={action.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors cursor-pointer group"
                >
                  <div>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{action.label}</p>
                    <p className="text-xs text-white/30">{action.desc}</p>
                  </div>
                  <Award className="w-4 h-4 text-white/20 group-hover:text-nitai-cyan transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

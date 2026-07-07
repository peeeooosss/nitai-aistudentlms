import { motion } from 'framer-motion'
import { Users, Coins, TrendingUp, Activity, Flame, Award, ArrowUp, ArrowDown } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Total Users', value: '12,450', change: '+12%', up: true, color: 'from-cyan-400 to-blue-500' },
  { icon: Coins, label: 'Credits Circulating', value: '89,250', change: '+8%', up: true, color: 'from-amber-400 to-orange-500' },
  { icon: Flame, label: 'Active Streaks Today', value: '3,421', change: '+5%', up: true, color: 'from-red-400 to-pink-500' },
  { icon: TrendingUp, label: 'Completion Rate', value: '93%', change: '-2%', up: false, color: 'from-purple-400 to-pink-500' },
]

const recentActivity = [
  { action: 'New user registered', user: 'john@example.com', time: '2 min ago', type: 'user' },
  { action: 'Module completed', user: 'sarah@example.com', time: '15 min ago', type: 'module' },
  { action: 'Assignment submitted', user: 'mike@example.com', time: '32 min ago', type: 'assignment' },
  { action: 'Store purchase', user: 'emma@example.com', time: '1 hour ago', type: 'store' },
  { action: 'Quiz passed', user: 'alex@example.com', time: '2 hours ago', type: 'quiz' },
]

export default function AdminOverview() {
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
          {stats.map((stat, i) => (
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
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
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
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.type === 'user' ? 'bg-nitai-cyan' :
                    item.type === 'module' ? 'bg-nitai-accent' :
                    item.type === 'assignment' ? 'bg-amber-400' :
                    item.type === 'store' ? 'bg-emerald-400' : 'bg-nitai-pink'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70 truncate">{item.action}</p>
                    <p className="text-xs text-white/30">{item.user}</p>
                  </div>
                  <span className="text-xs text-white/20 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/5 p-6">
            <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Add New Module', desc: 'Create a new day block in the curriculum' },
                { label: 'Create Quiz', desc: 'Add MCQ questions for any module' },
                { label: 'Send Broadcast', desc: 'Notify all active students' },
                { label: 'Review Submissions', desc: 'Grade pending assignments' },
              ].map((action, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors cursor-pointer group">
                  <div>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{action.label}</p>
                    <p className="text-xs text-white/30">{action.desc}</p>
                  </div>
                  <Award className="w-4 h-4 text-white/20 group-hover:text-nitai-cyan transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
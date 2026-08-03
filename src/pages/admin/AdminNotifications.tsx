import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Users, UserCheck, UserX, Bell } from 'lucide-react'

const targetOptions = [
  { value: 'all', label: 'All Users', icon: Users },
  { value: 'active', label: 'Active Students', icon: UserCheck },
  { value: 'inactive', label: 'Inactive Students', icon: UserX },
]

export default function AdminNotifications() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [target, setTarget] = useState('all')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!title.trim() || !message.trim()) return
    setSent(true)
    setTimeout(() => {
      setTitle('')
      setMessage('')
      setTarget('all')
      setSent(false)
    }, 2000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Notifications</h1>
            <p className="text-white/40 text-sm mt-1">System Broadcasts & Cohort Alerts</p>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="glass rounded-2xl border border-white/5 p-6 sm:p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/20 mb-4">
                  <Send className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Broadcast Sent!</h3>
                <p className="text-sm text-white/40">Notification delivered to selected audience.</p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Target Audience</label>
                  <div className="grid grid-cols-3 gap-2">
                    {targetOptions.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setTarget(value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm transition-all duration-300 ${
                          target === value
                            ? 'bg-nitai-accent/20 text-nitai-accent-light border-nitai-accent/30'
                            : 'bg-white/[0.02] text-white/40 border-white/10 hover:text-white/60 hover:bg-white/[0.04]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Notification Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., New Module Available!"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your broadcast message..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <Bell className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p className="text-xs text-amber-400/70">
                    This will send an in-app notification to all users in the selected audience.
                  </p>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!title.trim() || !message.trim()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-sm shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Broadcast
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Sparkles, Play, Rocket, CheckCheck } from 'lucide-react'

const notifications = [
  {
    id: 1,
    icon: Sparkles,
    color: 'from-nitai-accent to-nitai-cyan',
    title: 'Welcome to Nitai!',
    description: 'Your 90-day journey is ready to begin.',
    time: 'Just now',
  },
  {
    id: 2,
    icon: Play,
    color: 'from-nitai-cyan to-blue-500',
    title: 'Day 1: Ready to Go',
    description: 'First module unlocked and waiting for you.',
    time: '2h ago',
  },
  {
    id: 3,
    icon: Rocket,
    color: 'from-amber-400 to-orange-500',
    title: 'Platform Launch',
    description: 'Nitai LMS is live! Start learning today.',
    time: '1d ago',
  },
]

export function NotificationDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-[360px] sm:w-[400px] origin-top-right"
          >
            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-nitai-cyan" />
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-nitai-accent/20 text-nitai-accent-light">
                  3 new
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {notifications.map((n) => (
                  <div key={n.id} className="flex gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${n.color}/20 border border-white/10 flex-shrink-0 mt-0.5`}>
                      <n.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{n.title}</p>
                      <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{n.description}</p>
                      <p className="text-[10px] text-white/20 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 px-5 py-3">
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/40 hover:text-white/60 text-xs font-medium transition-all duration-200 border border-white/5"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all as read
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

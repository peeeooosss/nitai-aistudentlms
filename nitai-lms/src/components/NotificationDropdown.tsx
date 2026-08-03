import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bell, Sparkles, Play, Rocket, CheckCheck } from 'lucide-react'
import { api } from '../services/api'

interface Notification {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export function NotificationDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])

  const fetchNotifications = async () => {
    try {
      const data = await api.get<{ notifications: Notification[]; unreadCount: number }>('/notifications')
      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
    } finally {
      setLoading(false)
    }
  }

  const markAllRead = async () => {
    try {
      await api.put('/notifications', { markAllRead: true })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Failed to mark notifications:', err)
    }
  }

  const getNotificationIcon = (title: string) => {
    if (title.toLowerCase().includes('welcome')) return Sparkles
    if (title.toLowerCase().includes('day') || title.toLowerCase().includes('module')) return Play
    return Rocket
  }

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
                {unreadCount > 0 && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-nitai-accent/20 text-nitai-accent-light">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-nitai-cyan/30 border-t-nitai-cyan rounded-full animate-spin" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-5 py-8 text-center text-white/30 text-sm">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => {
                    const Icon = getNotificationIcon(n.title)
                    return (
                      <div key={n.id} className={`flex gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer ${!n.read ? 'bg-white/[0.01]' : ''}`}>
                        <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${n.read ? 'from-white/5 to-white/5' : 'from-nitai-accent/20 to-nitai-cyan/20'} border border-white/10 flex-shrink-0 mt-0.5`}>
                          <Icon className={`w-4 h-4 ${n.read ? 'text-white/30' : 'text-white'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${n.read ? 'text-white/50' : 'text-white'}`}>{n.title}</p>
                          <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-white/20 mt-1">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-nitai-cyan flex-shrink-0 mt-2" />
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              {notifications.length > 0 && (
                <div className="border-t border-white/5 px-5 py-3">
                  <button
                    onClick={markAllRead}
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-white/40 hover:text-white/60 text-xs font-medium transition-all duration-200 border border-white/5"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

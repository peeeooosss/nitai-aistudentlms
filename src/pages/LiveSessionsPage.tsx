import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Play,
  Clock,
  Users,
  ExternalLink,
  Video,
  MapPin,
} from 'lucide-react'
import { api } from '../services/api'
import type { LiveSession } from '../types/dashboard'

type Tab = 'upcoming' | 'recordings'

interface LiveSessionPageProps {
  initialTab?: Tab
}

function formatCountdown(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now()
  if (diff <= 0) return 'Starting now'
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
}

export default function LiveSessionsPage({ initialTab = 'upcoming' }: LiveSessionPageProps) {
  const [tab, setTab] = useState<Tab>(initialTab)
  const [upcoming, setUpcoming] = useState<LiveSession[]>([])
  const [recordings, setRecordings] = useState<LiveSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get<{ sessions: LiveSession[] }>('/live-sessions?status=upcoming').then(r => r.sessions || []).catch(() => []),
      api.get<{ sessions: LiveSession[] }>('/live-sessions?status=past').then(r => r.sessions || []).catch(() => []),
    ])
      .then(([u, r]) => {
        setUpcoming(u)
        setRecordings(r)
      })
      .finally(() => setLoading(false))
  }, [])

  const activeSessions = tab === 'upcoming' ? upcoming : recordings

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" variants={fadeSlide}>
        <h1 className="text-2xl font-bold text-white">Live Sessions</h1>
        <p className="text-white/50 mt-1">Join live classes or watch recordings</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-nitai-card border border-white/5 rounded-xl p-1 w-fit">
        {(['upcoming', 'recordings'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === t
                ? 'bg-nitai-accent text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            {t === 'upcoming' ? 'Upcoming' : 'Recordings'}
            <span className="ml-2 text-xs opacity-60">
              ({t === 'upcoming' ? upcoming.length : recordings.length})
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-nitai-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeSlide}
            className="space-y-4"
          >
            {activeSessions.length === 0 ? (
              <div className="bg-nitai-card border border-white/5 rounded-2xl p-12 text-center">
                <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 text-lg">
                  {tab === 'upcoming' ? 'No upcoming sessions scheduled' : 'No recordings available'}
                </p>
              </div>
            ) : (
              activeSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-nitai-card border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Thumbnail / Icon */}
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-nitai-accent/10 flex items-center justify-center">
                      {tab === 'upcoming' ? (
                        <Video className="w-7 h-7 text-nitai-accent" />
                      ) : (
                        <Play className="w-7 h-7 text-nitai-accent" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{session.topic}</h3>
                          <p className="text-white/40 text-sm mt-1 line-clamp-2">
                            {session.description || 'No description'}
                          </p>
                        </div>
                        {tab === 'upcoming' && (
                          <span className="shrink-0 bg-nitai-accent/10 text-nitai-accent text-xs font-bold px-3 py-1.5 rounded-full">
                            {formatCountdown(session.scheduledAt)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(session.scheduledAt).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                          &middot; {session.duration} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {session.platform}
                        </span>
                        {session.hostName && (
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {session.hostName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="shrink-0">
                      {tab === 'upcoming' ? (
                        <a
                          href={session.meetLink || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-nitai-accent hover:bg-nitai-accent/90 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Join
                        </a>
                      ) : (
                        <a
                          href={session.recordingUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          Watch
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

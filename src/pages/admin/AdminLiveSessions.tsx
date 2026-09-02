import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface LiveSession {
  id: string
  moduleId: number
  scheduledAt: string
  duration: number
  meetLink: string | null
  recordingUrl: string | null
  platform: string
  topic: string
  description: string | null
  hostName: string | null
  status: string
  isPublic: boolean
  module: { id: number; title: string; dayNumber: number; weekNumber: number }
}

export default function AdminLiveSessions() {
  const [sessions, setSessions] = useState<LiveSession[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ moduleId: '', scheduledAt: '', duration: 90, meetLink: '', topic: '', description: '', hostName: '', platform: 'Zoom', status: 'SCHEDULED', isPublic: true })
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.get<{ sessions: LiveSession[] }>('/admin/live-sessions')
      .then((r) => setSessions(r.sessions || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async () => {
    if (!form.topic || !form.moduleId || !form.scheduledAt) return
    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/admin/live-sessions/${editingId}`, { ...form, moduleId: parseInt(form.moduleId) })
      } else {
        await api.post('/admin/live-sessions', { ...form, moduleId: parseInt(form.moduleId) })
      }
      setEditingId(null)
      setForm({ moduleId: '', scheduledAt: '', duration: 90, meetLink: '', topic: '', description: '', hostName: '', platform: 'Zoom', status: 'SCHEDULED', isPublic: true })
      load()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (s: LiveSession) => {
    setEditingId(s.id)
    setForm({
      moduleId: String(s.moduleId),
      scheduledAt: s.scheduledAt.slice(0, 16),
      duration: s.duration,
      meetLink: s.meetLink || '',
      topic: s.topic,
      description: s.description || '',
      hostName: s.hostName || '',
      platform: s.platform,
      status: s.status,
      isPublic: s.isPublic,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this session?')) return
    await api.delete(`/admin/live-sessions/${id}`)
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Live Sessions</h1>

      {/* Form */}
      <div className="bg-nitai-card border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">{editingId ? 'Edit Session' : 'New Session'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.moduleId} onChange={e => setForm({ ...form, moduleId: e.target.value })} placeholder="Module ID (day number)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <input value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="Topic" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <input type="datetime-local" value={form.scheduledAt} onChange={e => setForm({ ...form, scheduledAt: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
          <input value={form.duration} type="number" onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 90 })} placeholder="Duration (min)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
          <input value={form.meetLink} onChange={e => setForm({ ...form, meetLink: e.target.value })} placeholder="Meet Link" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <input value={form.hostName} onChange={e => setForm({ ...form, hostName: e.target.value })} placeholder="Host Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <input value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} placeholder="Platform" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white">
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="LIVE">Live</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 w-full" />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="checkbox" checked={form.isPublic} onChange={e => setForm({ ...form, isPublic: e.target.checked })} className="accent-nitai-accent" />
            Public
          </label>
          <button onClick={handleSave} disabled={saving || !form.topic || !form.moduleId || !form.scheduledAt} className="px-6 py-2 rounded-xl bg-nitai-accent text-white text-sm font-semibold disabled:opacity-40 transition-colors">
            {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setForm({ moduleId: '', scheduledAt: '', duration: 90, meetLink: '', topic: '', description: '', hostName: '', platform: 'Zoom', status: 'SCHEDULED', isPublic: true }) }} className="px-4 py-2 rounded-xl bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-2 border-nitai-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center text-white/30 py-12">No live sessions yet</div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="bg-nitai-card border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{s.topic}</p>
                <p className="text-white/40 text-xs mt-1">
                  Day {s.module?.dayNumber ?? '—'} · {new Date(s.scheduledAt).toLocaleString()} · {s.duration}min · {s.platform}
                </p>
                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                  s.status === 'LIVE' ? 'bg-red-500/20 text-red-400' :
                  s.status === 'SCHEDULED' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-white/10 text-white/40'
                }`}>{s.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(s)} className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-colors">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

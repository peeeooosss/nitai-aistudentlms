import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { modules as defaultModules, getPhaseGradient } from '../../data/modules'
import { api } from '../../services/api'
import { Search, Edit3, Save, X } from 'lucide-react'

interface DbModule {
  id: number
  dayNumber: number
  title: string
  phase: number
  phaseName: string
  description: string
  creditsReward: number
  videoUrl: string | null
}

export default function AdminModules() {
  const [dbModules, setDbModules] = useState<DbModule[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ title: '', videoUrl: '', creditsReward: 0 })
  const [phaseFilter, setPhaseFilter] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    try {
      const data = await api.get<{ modules: DbModule[] }>('/admin/modules')
      setDbModules(data.modules)
    } catch {
      setDbModules(defaultModules as DbModule[])
    } finally {
      setLoading(false)
    }
  }

  const allModules = dbModules.length > 0 ? dbModules : defaultModules as DbModule[]

  const filtered = allModules.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchesPhase = phaseFilter === null || m.phase === phaseFilter
    return matchesSearch && matchesPhase
  })

  const startEdit = (mod: DbModule) => {
    setEditId(mod.id)
    setEditData({
      title: mod.title,
      videoUrl: mod.videoUrl || '',
      creditsReward: mod.creditsReward,
    })
  }

  const saveEdit = async () => {
    if (editId === null) return
    setSaving(true)
    try {
      await api.put(`/admin/modules/${editId}`, editData)
      setDbModules(prev => prev.map(m =>
        m.id === editId
          ? { ...m, title: editData.title, videoUrl: editData.videoUrl || null, creditsReward: editData.creditsReward }
          : m
      ))
    } catch (err) {
      console.error('Failed to save module:', err)
    } finally {
      setSaving(false)
      setEditId(null)
    }
  }

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Modules</h1>
            <p className="text-white/40 text-sm mt-1">Video Uploads & 90-Day Block Builder</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-nitai-accent/10 text-nitai-accent-light text-xs border border-nitai-accent/20">
            {allModules.length} blocks
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search modules..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            {[null, 1, 2, 3].map((p) => (
              <button
                key={p ?? 'all'}
                onClick={() => setPhaseFilter(p)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-300 ${
                  phaseFilter === p
                    ? 'bg-nitai-accent/20 text-nitai-accent-light border-nitai-accent/30'
                    : 'bg-white/[0.03] text-white/40 border-white/10 hover:text-white/60'
                }`}
              >
                {p ? `Phase ${p}` : 'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Day</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Phase</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden sm:table-cell">Video URL</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Credits</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((mod) => (
                  <tr key={mod.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-white">{mod.dayNumber}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getPhaseGradient(mod.phase)}/20 text-white/70`}>
                        P{mod.phase}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {editId === mod.id ? (
                        <input
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-nitai-cyan/50 text-white text-sm outline-none"
                        />
                      ) : (
                        <span className="text-sm text-white/70">{mod.title}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {editId === mod.id ? (
                        <input
                          value={editData.videoUrl}
                          onChange={(e) => setEditData({ ...editData, videoUrl: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-nitai-cyan/50 text-white text-sm outline-none"
                        />
                      ) : (
                        <span className="text-xs text-white/30 font-mono truncate block max-w-[200px]">
                          {mod.videoUrl || `https://youtube.com/watch?v=module-${mod.dayNumber}`}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {editId === mod.id ? (
                        <input
                          type="number"
                          value={editData.creditsReward}
                          onChange={(e) => setEditData({ ...editData, creditsReward: parseInt(e.target.value) || 0 })}
                          className="w-20 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-nitai-cyan/50 text-white text-sm outline-none text-center"
                        />
                      ) : (
                        <span className="text-sm font-medium text-amber-400">{mod.creditsReward}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {editId === mod.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} disabled={saving} className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors disabled:opacity-50">
                            {saving ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : <Save className="w-4 h-4" />}
                          </button>
                          <button onClick={() => setEditId(null)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(mod)}
                          className="p-1.5 rounded-lg bg-white/[0.03] text-white/30 hover:text-nitai-cyan hover:bg-white/[0.06] transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/30 text-sm">No modules found</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

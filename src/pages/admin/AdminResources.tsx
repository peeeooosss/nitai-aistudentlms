import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface Resource {
  id: string
  type: string
  title: string
  description: string | null
  url: string | null
  platform: string | null
  scope: string
  weekNumber: number | null
  dayNumber: number | null
  phase: number | null
  visibility: string
  isFeatured: boolean
  tags: string[]
  viewCount: number
  saveCount: number
  createdAt: string
}

const empty = { type: 'LINK', title: '', description: '', url: '', platform: '', scope: 'GLOBAL', weekNumber: '', dayNumber: '', phase: '', visibility: 'PUBLIC', isFeatured: false, tags: '' }

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.get<{ resources: Resource[] }>('/admin/resources')
      .then((r) => setResources(r.resources || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async () => {
    if (!form.title) return
    setSaving(true)
    try {
      const body: any = {
        type: form.type,
        title: form.title,
        description: form.description || undefined,
        url: form.url || undefined,
        platform: form.platform || undefined,
        scope: form.scope,
        weekNumber: form.weekNumber ? parseInt(form.weekNumber) : undefined,
        dayNumber: form.dayNumber ? parseInt(form.dayNumber) : undefined,
        phase: form.phase ? parseInt(form.phase) : undefined,
        visibility: form.visibility,
        isFeatured: form.isFeatured,
        tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      }
      if (editingId) {
        await api.put(`/admin/resources/${editingId}`, body)
      } else {
        await api.post('/admin/resources', body)
      }
      setEditingId(null)
      setForm(empty)
      load()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (r: Resource) => {
    setEditingId(r.id)
    setForm({
      type: r.type,
      title: r.title,
      description: r.description || '',
      url: r.url || '',
      platform: r.platform || '',
      scope: r.scope,
      weekNumber: r.weekNumber ? String(r.weekNumber) : '',
      dayNumber: r.dayNumber ? String(r.dayNumber) : '',
      phase: r.phase ? String(r.phase) : '',
      visibility: r.visibility,
      isFeatured: r.isFeatured,
      tags: (r.tags || []).join(', '),
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resource?')) return
    await api.delete(`/admin/resources/${id}`)
    load()
  }

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Resources</h1>

      {/* Form */}
      <div className="bg-nitai-card border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">{editingId ? 'Edit Resource' : 'New Resource'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={form.type} onChange={e => set('type', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white">
            <option value="VIDEO">Video</option>
            <option value="DRIVE">Google Drive</option>
            <option value="LINK">Link</option>
            <option value="UPLOAD">Upload</option>
            <option value="NOTE">Note</option>
          </select>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Title" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <input value={form.url} onChange={e => set('url', e.target.value)} placeholder="URL" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <input value={form.platform} onChange={e => set('platform', e.target.value)} placeholder="Platform" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30" />
          <select value={form.scope} onChange={e => set('scope', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white">
            <option value="GLOBAL">Global</option>
            <option value="PHASE">Phase</option>
            <option value="WEEK">Week</option>
            <option value="DAY">Day</option>
          </select>
          <select value={form.visibility} onChange={e => set('visibility', e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white">
            <option value="PUBLIC">Public</option>
            <option value="STUDENTS">Students</option>
            <option value="ADMIN">Admin</option>
          </select>
          {form.scope === 'WEEK' && <input value={form.weekNumber} onChange={e => set('weekNumber', e.target.value)} placeholder="Week Number" type="number" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />}
          {form.scope === 'DAY' && <input value={form.dayNumber} onChange={e => set('dayNumber', e.target.value)} placeholder="Day Number" type="number" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />}
          {form.scope === 'PHASE' && <input value={form.phase} onChange={e => set('phase', e.target.value)} placeholder="Phase" type="number" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />}
        </div>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Description" rows={2} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 w-full" />
        <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Tags (comma separated)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 w-full" />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} className="accent-nitai-accent" />
            Featured
          </label>
          <button onClick={handleSave} disabled={saving || !form.title} className="px-6 py-2 rounded-xl bg-nitai-accent text-white text-sm font-semibold disabled:opacity-40 transition-colors">
            {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setForm(empty) }} className="px-4 py-2 rounded-xl bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-colors">
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
      ) : resources.length === 0 ? (
        <div className="text-center text-white/30 py-12">No resources yet</div>
      ) : (
        <div className="space-y-2">
          {resources.map((r) => (
            <div key={r.id} className="bg-nitai-card border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{r.title}</p>
                <p className="text-white/40 text-xs mt-1">
                  {r.type} · {r.scope} · {r.visibility}
                  {r.weekNumber ? ` · W${r.weekNumber}` : ''}
                  {r.dayNumber ? ` · D${r.dayNumber}` : ''}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] text-white/30">{r.viewCount} views</span>
                  <span className="text-[10px] text-white/30">{r.saveCount} saves</span>
                  {r.isFeatured && <span className="text-[10px] text-yellow-400 font-bold">Featured</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(r)} className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-colors">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

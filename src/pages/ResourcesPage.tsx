import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Folder,
  ExternalLink,
  File,
  FileText,
  Star,
  Search,
  Download,
  Eye,
  Bookmark,
} from 'lucide-react'
import { api } from '../services/api'
import type { Resource } from '../types/dashboard'

type ResourceFilter = 'ALL' | 'VIDEO' | 'DRIVE' | 'LINK' | 'UPLOAD' | 'NOTE' | 'FEATURED'

const filterOptions: { key: ResourceFilter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'VIDEO', label: 'Videos' },
  { key: 'DRIVE', label: 'Drive' },
  { key: 'LINK', label: 'Links' },
  { key: 'UPLOAD', label: 'PDFs' },
  { key: 'NOTE', label: 'Notes' },
  { key: 'FEATURED', label: 'Featured' },
]

const typeIcons: Record<string, typeof Play> = {
  VIDEO: Play,
  DRIVE: Folder,
  LINK: ExternalLink,
  UPLOAD: File,
  NOTE: FileText,
}

const typeColors: Record<string, string> = {
  VIDEO: 'text-red-400 bg-red-400/10',
  DRIVE: 'text-blue-400 bg-blue-400/10',
  LINK: 'text-green-400 bg-green-400/10',
  UPLOAD: 'text-orange-400 bg-orange-400/10',
  NOTE: 'text-purple-400 bg-purple-400/10',
}

const scopeBadge: Record<string, string> = {
  GLOBAL: 'bg-white/10 text-white/60',
  PHASE: 'bg-nitai-accent/10 text-nitai-accent',
  WEEK: 'bg-blue-500/10 text-blue-400',
  DAY: 'bg-purple-500/10 text-purple-400',
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<ResourceFilter>('ALL')
  const [search, setSearch] = useState('')
  const [weekFilter, setWeekFilter] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (activeFilter !== 'ALL' && activeFilter !== 'FEATURED') {
      params.set('type', activeFilter)
    }
    if (weekFilter) params.set('week', weekFilter)
    if (search) params.set('search', search)

    const qs = params.toString()
    api
      .get<{ resources: Resource[] }>(`/resources${qs ? `?${qs}` : ''}`)
      .then((r) => setResources(r.resources || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false))
  }, [activeFilter, weekFilter, search])

  const filtered = useMemo(() => {
    let list = resources
    if (activeFilter === 'FEATURED') {
      list = list.filter((r) => r.isFeatured)
    }
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    return list
  }, [resources, activeFilter, search])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Resources</h1>
        <p className="text-white/50 mt-1">Videos, documents, and learning materials</p>
      </motion.div>

      {/* Search + Week filter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full bg-nitai-card border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-nitai-accent/50 transition-colors"
          />
        </div>
        <select
          value={weekFilter}
          onChange={(e) => setWeekFilter(e.target.value)}
          className="bg-nitai-card border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nitai-accent/50 transition-colors appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="">All Weeks</option>
          {Array.from({ length: 13 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              Week {i + 1}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {filterOptions.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === f.key
                ? 'bg-nitai-accent border-nitai-accent text-white'
                : 'bg-nitai-card border-white/5 text-white/50 hover:text-white/70 hover:border-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-nitai-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-nitai-card border border-white/5 rounded-2xl p-12 text-center">
          <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 text-lg">No resources found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resource, i) => {
            const Icon = typeIcons[resource.type] || File
            const colorClass = typeColors[resource.type] || 'text-white/40 bg-white/10'
            const scopeClass = scopeBadge[resource.scope] || scopeBadge.GLOBAL

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-nitai-card border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {resource.isFeatured && (
                    <Star className="w-4 h-4 text-yellow-400 shrink-0" fill="currentColor" />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                  {resource.title}
                </h3>
                {resource.description && (
                  <p className="text-white/40 text-xs line-clamp-2 mb-3">
                    {resource.description}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${scopeClass}`}>
                    {resource.scope}
                  </span>
                  {resource.weekNumber && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                      W{resource.weekNumber}
                    </span>
                  )}
                  {resource.dayNumber && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                      D{resource.dayNumber}
                    </span>
                  )}
                  {resource.phase && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                      Phase {resource.phase}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-white/30">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {resource.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {resource.downloadCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-3 h-3" />
                      {resource.saveCount}
                    </span>
                  </div>
                  <a
                    href={resource.url || resource.filePath || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors"
                  >
                    {resource.type === 'VIDEO'
                      ? 'Watch'
                      : resource.type === 'UPLOAD'
                        ? 'Download'
                        : 'Open'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

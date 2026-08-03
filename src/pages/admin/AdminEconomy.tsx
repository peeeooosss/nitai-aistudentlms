import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Edit3, Save, X, Plus } from 'lucide-react'

const initialItems = [
  { id: 1, title: 'AI Prompt Pack Vol.1', category: 'DIGITAL_RESELL', cost: 250, active: true },
  { id: 2, title: 'SaaS API Voucher — Starter', category: 'SAAS_VOUCHER', cost: 500, active: true },
  { id: 3, title: 'Franchise Application Discount', category: 'FRANCHISE_DISCOUNT', cost: 1000, active: true },
  { id: 4, title: 'Social Media Templates Kit', category: 'DIGITAL_RESELL', cost: 150, active: false },
]

export default function AdminEconomy() {
  const [items, setItems] = useState(initialItems)
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ title: '', category: '', cost: 0 })
  const [search, setSearch] = useState('')

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  const startEdit = (item: typeof items[0]) => {
    setEditId(item.id)
    setEditData({ title: item.title, category: item.category, cost: item.cost })
  }

  const saveEdit = () => {
    setItems(items.map((item) => (item.id === editId ? { ...item, ...editData } : item)))
    setEditId(null)
  }

  const toggleActive = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))
  }

  const categoryColor = (cat: string) => {
    switch (cat) {
      case 'DIGITAL_RESELL': return 'bg-cyan-500/10 text-cyan-400'
      case 'SAAS_VOUCHER': return 'bg-purple-500/10 text-purple-400'
      case 'FRANCHISE_DISCOUNT': return 'bg-amber-500/10 text-amber-400'
      default: return 'bg-white/5 text-white/40'
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Economy</h1>
            <p className="text-white/40 text-sm mt-1">Credit Escrow, Bounties & Store Inventory</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-nitai-accent/10 text-nitai-accent-light text-xs border border-nitai-accent/20">
            {items.filter((i) => i.active).length} active items
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white text-sm font-semibold shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300">
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Item</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Category</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Cost</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-3">
                      {editId === item.id ? (
                        <input
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-nitai-cyan/50 text-white text-sm outline-none"
                        />
                      ) : (
                        <span className="text-sm text-white/70">{item.title}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editId === item.id ? (
                        <select
                          value={editData.category}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-nitai-card border border-nitai-cyan/50 text-white text-sm outline-none"
                        >
                          <option value="DIGITAL_RESELL">Digital Resell</option>
                          <option value="SAAS_VOUCHER">SaaS Voucher</option>
                          <option value="FRANCHISE_DISCOUNT">Franchise Discount</option>
                        </select>
                      ) : (
                        <span className={`inline-flex text-xs px-2 py-1 rounded-full font-medium ${categoryColor(item.category)}`}>
                          {item.category.replace(/_/g, ' ')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {editId === item.id ? (
                        <input
                          type="number"
                          value={editData.cost}
                          onChange={(e) => setEditData({ ...editData, cost: parseInt(e.target.value) || 0 })}
                          className="w-24 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-nitai-cyan/50 text-white text-sm outline-none text-center"
                        />
                      ) : (
                        <span className="text-sm font-medium text-amber-400">{item.cost} credits</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive(item.id)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-all duration-300 ${
                          item.active
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-white/[0.03] text-white/30 border-white/10'
                        }`}
                      >
                        {item.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {editId === item.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditId(null)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg bg-white/[0.03] text-white/30 hover:text-nitai-cyan hover:bg-white/[0.06] transition-all">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
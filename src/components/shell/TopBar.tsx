import { Search, Bell, Settings } from 'lucide-react'
import { useState } from 'react'

export function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl flex items-center px-6 gap-4">
      {/* Title */}
      <h1 className="text-lg font-semibold mr-4">Dashboard</h1>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
            searchFocused
              ? 'border-cyan-500/50 bg-white/[0.06]'
              : 'border-white/5 bg-white/[0.03]'
          }`}
        >
          <Search size={16} className="text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search modules..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-white/30 w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button className="relative p-2.5 rounded-lg hover:bg-white/[0.06] transition-colors text-white/50 hover:text-white">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2.5 rounded-lg hover:bg-white/[0.06] transition-colors text-white/50 hover:text-white">
          <Settings size={18} />
        </button>

        {/* Avatar */}
        <button className="ml-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">
          N
        </button>
      </div>
    </header>
  )
}

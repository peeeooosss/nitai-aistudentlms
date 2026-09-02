import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  FileCheck,
  Bell,
  Store,
  ChevronRight,
  Calendar,
  FolderOpen,
} from 'lucide-react'

const sidebarLinks = [
  { href: '/admin/overview', icon: LayoutDashboard, label: 'Overview' },
  { href: '/admin/modules', icon: BookOpen, label: 'Modules' },
  { href: '/admin/live-sessions', icon: Calendar, label: 'Live Sessions' },
  { href: '/admin/resources', icon: FolderOpen, label: 'Resources' },
  { href: '/admin/evaluations', icon: FileCheck, label: 'Evaluations' },
  { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { href: '/admin/economy', icon: Store, label: 'Economy' },
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-nitai-dark/50 backdrop-blur-xl hidden lg:flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nitai-accent to-nitai-cyan" />
              <div className="absolute inset-[1.5px] rounded-[6px] bg-nitai-dark flex items-center justify-center">
                <span className="text-xs font-black bg-gradient-to-br from-nitai-cyan to-nitai-accent-light bg-clip-text text-transparent">N</span>
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Admin</span>
              <span className="block text-[8px] font-semibold uppercase tracking-widest text-nitai-accent-light/50">Command Center</span>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? 'bg-nitai-accent/20 text-nitai-accent-light shadow-sm'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-nitai-accent-light' : 'text-white/30 group-hover:text-white/50'}`} />
              <span>{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-nitai-accent-light" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          to="/dashboard/student"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] text-white/40 hover:text-white/60 text-xs transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Back to Student View
        </Link>
      </div>
    </aside>
  )
}
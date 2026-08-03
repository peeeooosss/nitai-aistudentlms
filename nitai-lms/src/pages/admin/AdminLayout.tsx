import { Outlet, Link } from 'react-router-dom'
import { AdminSidebar } from '../../components/AdminSidebar'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-nitai-dark text-white flex">
      <AdminSidebar />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-64 h-full bg-nitai-dark border-r border-white/5 p-4">
              <div className="flex justify-end mb-4">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/40 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AdminSidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-nitai-dark/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 h-14">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white/40 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/admin">
              <span className="text-sm font-bold text-white">Admin Panel</span>
            </Link>
            <div className="w-9" />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NitaiLogo } from './NitaiLogo'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-nitai-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <NitaiLogo />
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            <a
              href="#store"
              className="group flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-nitai-cyan transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Store Preview</span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <Link
              to="/auth/login"
              className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              className="group relative px-6 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-nitai-accent via-nitai-cyan to-nitai-accent bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0] opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-[1px] rounded-[11px] bg-nitai-dark transition-all duration-300 group-hover:bg-nitai-card" />
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="relative z-10 bg-gradient-to-r from-nitai-cyan to-nitai-accent-light bg-clip-text text-transparent"
              >
                Join Free
              </motion.span>
            </Link>
          </div>

          <button
            className="md:hidden relative p-2 text-white/50 hover:text-white transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass rounded-2xl mt-2 border border-white/10 overflow-hidden"
          >
            <div className="py-4 space-y-1 px-3">
              <a
                href="#store"
                className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5 text-nitai-cyan/60" />
                Store Preview
              </a>
              <div className="h-px bg-white/5 my-2" />
              <Link
                to="/auth/login"
                className="block px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Free
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}
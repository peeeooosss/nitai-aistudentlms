import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NitaiLogoFull } from '../components/NitaiLogo'
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Globe, Check } from 'lucide-react'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !accepted) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsLoading(false)
    localStorage.setItem('nitai_user_name', name)
    localStorage.setItem('nitai_user_email', email)
    navigate('/dashboard/student')
  }

  return (
    <div className="min-h-screen bg-nitai-dark text-white flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-nitai-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-nitai-cyan/10 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/40" />
          </motion.button>
          <Link to="/">
            <NitaiLogoFull />
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-nitai-pink/20 to-nitai-accent/20 border border-nitai-accent/20 mb-4"
              >
                <Sparkles className="w-8 h-8 text-nitai-accent-light" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="text-gradient">Create Account</span>
              </h1>
              <p className="text-white/40 mt-2 text-sm">
                Join thousands learning and earning with Nitai
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-nitai-cyan transition-colors duration-300" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-nitai-cyan transition-colors duration-300" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-nitai-cyan transition-colors duration-300" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-white/20">Minimum 8 characters</p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
                    accepted 
                      ? 'bg-nitai-cyan border-nitai-cyan' 
                      : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    {accepted && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                  I agree to the{' '}
                  <a href="#" className="text-nitai-cyan/70 hover:text-nitai-cyan">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-nitai-cyan/70 hover:text-nitai-cyan">Privacy Policy</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading || !accepted}
                className="group relative w-full py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-nitai-accent via-nitai-pink to-nitai-accent bg-[length:200%_100%] animate-shimmer" />
                <div className="absolute inset-[1px] rounded-[13px] bg-nitai-dark transition-all duration-300 group-hover:bg-nitai-card" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-nitai-dark px-4 text-white/30">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="text-sm font-medium">GitHub</span>
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-white/30">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-nitai-cyan hover:text-nitai-cyan-light transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NitaiLogoFull } from '../components/NitaiLogo'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Globe } from 'lucide-react'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard/student')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-nitai-dark text-white flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-nitai-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-nitai-cyan/10 rounded-full blur-3xl" />
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
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-nitai-cyan/20 mb-4"
              >
                <Sparkles className="w-8 h-8 text-nitai-cyan" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="text-gradient">Welcome Back</span>
              </h1>
              <p className="text-white/40 mt-2 text-sm">
                Sign in to continue your learning journey
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <p className="mt-1.5 text-xs text-white/20">Use the email you registered with</p>
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
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/[0.03] text-nitai-cyan focus:ring-nitai-cyan/30 focus:ring-offset-0"
                  />
                  <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-nitai-accent via-nitai-cyan to-nitai-accent bg-[length:200%_100%] animate-shimmer" />
                <div className="absolute inset-[1px] rounded-[13px] bg-nitai-dark transition-all duration-300 group-hover:bg-nitai-card" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      Sign In
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

              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Continue with Google</span>
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-white/30">
              Don&apos;t have an account?{' '}
              <Link to="/auth/register" className="text-nitai-cyan hover:text-nitai-cyan-light transition-colors font-medium">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NitaiLogoFull } from '../components/NitaiLogo'
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Globe, Check, X, ShieldCheck } from 'lucide-react'

interface PasswordRule {
  label: string
  test: (p: string) => boolean
}

const passwordRules: PasswordRule[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter (a-z)', test: (p) => /[a-z]/.test(p) },
  { label: 'One number (0-9)', test: (p) => /[0-9]/.test(p) },
  { label: 'One special character (!@#$%^&*)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(p) },
]

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function PasswordStrengthBar({ score }: { score: number }) {
  const color = score <= 1 ? 'bg-red-500' : score <= 3 ? 'bg-yellow-500' : 'bg-emerald-500'
  const label = score <= 1 ? 'Weak' : score <= 3 ? 'Medium' : 'Strong'
  const labelColor = score <= 1 ? 'text-red-400' : score <= 3 ? 'text-yellow-400' : 'text-emerald-400'

  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-white/30">Password strength</span>
        <span className={`text-xs font-medium ${labelColor}`}>{label}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / passwordRules.length) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const navigate = useNavigate()
  const { register, loginWithGoogle } = useAuth()

  const emailValid = useMemo(() => emailRegex.test(email), [email])
  const passwordResults = useMemo(() => passwordRules.map((r) => ({ ...r, passed: r.test(password) })), [password])
  const passwordScore = useMemo(() => passwordResults.filter((r) => r.passed).length, [passwordResults])
  const allPasswordValid = passwordScore === passwordRules.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !accepted || !allPasswordValid) return
    setIsLoading(true)
    setError('')
    try {
      await register(name, email, password)
      navigate('/dashboard/student')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
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

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

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
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300"
                    required
                  />
                  {emailFocused && email.length > 0 && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {emailValid ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {emailFocused && email.length > 0 && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-1.5 text-xs ${emailValid ? 'text-emerald-400/70' : 'text-red-400/70'}`}
                    >
                      {emailValid ? 'Valid email format' : 'Please enter a valid email (e.g. you@example.com)'}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!emailFocused && (
                  <p className="mt-1.5 text-xs text-white/20">We'll never share your email</p>
                )}
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
                    onFocus={() => setPasswordFocused(true)}
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

                {password.length > 0 && <PasswordStrengthBar score={passwordScore} />}

                <AnimatePresence>
                  {passwordFocused && password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 space-y-1.5 overflow-hidden"
                    >
                      {passwordResults.map((rule, i) => (
                        <motion.div
                          key={rule.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          {rule.passed ? (
                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                              <X className="w-2.5 h-2.5 text-white/20" />
                            </div>
                          )}
                          <span className={`text-xs transition-colors duration-200 ${rule.passed ? 'text-emerald-400/80' : 'text-white/30'}`}>
                            {rule.label}
                          </span>
                        </motion.div>
                      ))}
                      <div className="flex items-center gap-2 pt-1">
                        {allPasswordValid ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                            <X className="w-2.5 h-2.5 text-white/20" />
                          </div>
                        )}
                        <span className={`text-xs font-medium transition-colors duration-200 ${allPasswordValid ? 'text-emerald-400/80' : 'text-white/30'}`}>
                          {allPasswordValid ? 'Password is strong' : 'Password must meet all requirements'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {passwordFocused && password.length === 0 && (
                  <p className="mt-2 text-xs text-white/20">Use 8+ characters with uppercase, lowercase, numbers & symbols</p>
                )}
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
                disabled={isLoading || !accepted || !allPasswordValid}
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

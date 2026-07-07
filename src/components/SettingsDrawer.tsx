import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  X,
  User,
  Mail,
  FileText,
  Palette,
  Bell,
  Globe,
  Lock,
  Trash2,
  Save,
  ChevronDown,
  Check,
  Moon,
  Sun,
} from 'lucide-react'

export function SettingsDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [name, setName] = useState(() => localStorage.getItem('nitai_user_name') || 'Learner')
  const [email, setEmail] = useState(() => localStorage.getItem('nitai_user_email') || 'learner@nitai.com')
  const [bio, setBio] = useState('AI enthusiast on a 90-day journey to financial freedom.')
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('nitai_user_name', name)
    localStorage.setItem('nitai_user_email', email)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-nitai-dark/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl shadow-black/40"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="p-1.5 -ml-1.5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/40" />
                  </button>
                  <h2 className="text-lg font-bold text-white">Settings</h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Profile Section */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-white/10">
                      <User className="w-4 h-4 text-nitai-accent-light" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">Profile</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">Bio</label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3 w-4 h-4 text-white/20" />
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={3}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Preferences Section */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-nitai-pink/20 border border-white/10">
                      <Palette className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">Preferences</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.03]">
                          {darkMode ? <Moon className="w-3.5 h-3.5 text-nitai-cyan" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <span className="text-sm text-white/70">Dark Mode</span>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                          darkMode ? 'bg-nitai-cyan/30' : 'bg-white/10'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                            darkMode ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.03]">
                          <Bell className="w-3.5 h-3.5 text-nitai-pink" />
                        </div>
                        <span className="text-sm text-white/70">Email Notifications</span>
                      </div>
                      <button
                        onClick={() => setEmailNotifs(!emailNotifs)}
                        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                          emailNotifs ? 'bg-nitai-accent/30' : 'bg-white/10'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                            emailNotifs ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.03]">
                          <Globe className="w-3.5 h-3.5 text-nitai-cyan" />
                        </div>
                        <span className="text-sm text-white/70">Language</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-white/40">
                        <span>English</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Account Section */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-red-400/20 to-rose-500/20 border border-white/10">
                      <Lock className="w-4 h-4 text-red-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">Account</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full text-left py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-all">
                      Update Password
                    </button>
                    <div className="border-t border-white/5 pt-3">
                      <button className="flex items-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-500/5 border border-red-500/10 text-sm text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Save Button */}
              <div className="border-t border-white/5 px-6 py-5">
                <button
                  onClick={handleSave}
                  className="relative w-full py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-nitai-accent to-nitai-cyan" />
                  <div className="absolute inset-[1px] rounded-[13px] bg-nitai-dark transition-all duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Saved!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

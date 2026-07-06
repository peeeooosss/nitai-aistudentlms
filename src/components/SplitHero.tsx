import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Building2,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Coins,
} from 'lucide-react'

const features = [
  { icon: Sparkles, text: 'Zero-Capital Start', color: 'from-cyan-400 to-blue-500' },
  { icon: Zap, text: 'AI-Powered Learning', color: 'from-purple-400 to-pink-500' },
  { icon: Coins, text: 'Earn Real Credits', color: 'from-amber-400 to-orange-500' },
  { icon: Shield, text: 'Certified Skills', color: 'from-emerald-400 to-teal-500' },
]

export function SplitHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-nitai-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-nitai-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nitai-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-white/60 mb-6 border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-nitai-cyan animate-pulse" />
            <span>Learn to Earn — 90 Days to Freedom</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Turn AI Skills Into
            </span>
            <br />
            <span className="text-gradient">Real Income</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
            The first gamified learn-to-earn platform. Complete modules, earn Nitai Credits,
            and redeem them for 1,200+ digital assets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Student Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/auth/register" className="group block h-full">
              <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-nitai-card/80 to-nitai-dark/80 backdrop-blur-sm transition-all duration-500 hover:border-nitai-cyan/30 hover:glow-cyan">
                <div className="absolute inset-0 bg-gradient-to-br from-nitai-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-nitai-cyan/20 rounded-full blur-3xl group-hover:bg-nitai-cyan/30 transition-all duration-500" />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-nitai-cyan/20 to-nitai-cyan/5 border border-nitai-cyan/20">
                      <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-nitai-cyan" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-nitai-cyan/60">
                        For Students
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-nitai-cyan-light transition-colors duration-300">
                        Start Learning & Earning
                      </h2>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                    Access the full 90-block curriculum, complete quizzes & assignments, 
                    earn Nitai Credits, and unlock your first income stream.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['AI Literacy', 'Automation', 'Enterprise'].map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-nitai-cyan/10 text-nitai-cyan/70 border border-nitai-cyan/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-sm text-white/40">
                      Start with <span className="text-nitai-cyan font-semibold">0 Credits</span>
                    </div>
                    <div className="flex items-center gap-2 text-nitai-cyan font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Explore Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Enterprise Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/ecosystem/enterprise" className="group block h-full">
              <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-nitai-card/80 to-nitai-dark/80 backdrop-blur-sm transition-all duration-500 hover:border-nitai-accent/30 hover:glow-purple">
                <div className="absolute inset-0 bg-gradient-to-br from-nitai-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-nitai-accent/20 rounded-full blur-3xl group-hover:bg-nitai-accent/30 transition-all duration-500" />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-nitai-accent/20 to-nitai-accent/5 border border-nitai-accent/20">
                      <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-nitai-accent-light" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-nitai-accent-light/60">
                        For Business
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-nitai-accent-light transition-colors duration-300">
                        Explore Franchise & SaaS
                      </h2>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                    Launch your own AI-powered learning franchise. White-label our platform, 
                    access 1,200+ digital resell assets, and scale globally.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Franchise', 'SaaS API', 'Resell Rights'].map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-nitai-accent/10 text-nitai-accent-light/70 border border-nitai-accent/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-sm text-white/40">
                      Enterprise <span className="text-nitai-accent-light font-semibold">Inquiry</span>
                    </div>
                    <div className="flex items-center gap-2 text-nitai-accent-light font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Book a Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12"
        >
          {features.map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-2 text-white/30 hover:text-white/50 transition-colors duration-300">
              <Icon className={`w-4 h-4 bg-gradient-to-r ${color} bg-clip-text text-transparent`} />
              <span className="text-xs sm:text-sm">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
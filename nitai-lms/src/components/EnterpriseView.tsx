import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  ShoppingBag,
  Code2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart4,
} from 'lucide-react'

const perks = [
  {
    icon: ShoppingBag,
    title: '1,200+ Resell Assets',
    desc: 'Access our entire library of digital products with full resell rights.',
  },
  {
    icon: Code2,
    title: 'White-Label SaaS',
    desc: 'Rebrand the entire platform as your own AI learning ecosystem.',
  },
  {
    icon: BarChart4,
    title: 'Revenue Dashboard',
    desc: 'Real-time analytics on student enrollment, credits, and payouts.',
  },
  {
    icon: Globe,
    title: 'Global Franchise',
    desc: 'Operate in your region with full marketing & operational support.',
  },
]

const stats = [
  { value: '1,200+', label: 'Digital Assets' },
  { value: '50+', label: 'Franchise Partners' },
  { value: '98%', label: 'Uptime SLA' },
]

export function EnterpriseView() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-nitai-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nitai-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-white/60 mb-6 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-nitai-accent-light" />
            <span>For Business Owners</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Franchise & SaaS</span>
            <span className="text-white/80"> Ecosystem</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            Launch your own AI learning platform with zero code. 
            White-label everything and keep the revenue.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-start gap-4 p-4 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-nitai-accent/20 to-nitai-accent/5 border border-nitai-accent/20 flex-shrink-0">
                  <perk.icon className="w-6 h-6 text-nitai-accent-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-nitai-accent-light transition-colors duration-300">
                    {perk.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/40 mt-1">
                    {perk.desc}
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-nitai-accent-light/40 mt-1 flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-6 sm:p-8 lg:p-10 card-gradient">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nitai-accent-light/30 to-transparent" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-nitai-accent-light" />
                  <span className="text-lg font-semibold text-white">
                    Why Partner With Us?
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Zero upfront franchise fee',
                    'Full white-label platform',
                    'Revenue share model',
                    '24/7 technical support',
                    'Marketing toolkit included',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-nitai-accent-light flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/30">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-nitai-accent to-nitai-pink text-white font-semibold shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
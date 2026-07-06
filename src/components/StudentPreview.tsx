import { motion } from 'framer-motion'
import { 
  Rocket, 
  Zap, 
  BarChart3, 
  CheckCircle, 
  ChevronRight,
  Play,
  Award,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const phases = [
  {
    name: 'Month 1: Hustler',
    subtitle: 'AI Foundation',
    icon: Rocket,
    days: 'Days 1–30',
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'from-nitai-cyan/10 to-nitai-cyan/5',
    borderColor: 'border-nitai-cyan/20',
    items: [
      'AI Literacy Basics',
      'Prompt Engineering',
      'Content Creation',
      'First Credit Payout',
    ],
    gradient: 'from-nitai-cyan/20 to-nitai-cyan/5',
    glow: 'shadow-cyan-500/10',
  },
  {
    name: 'Month 2: Automation Agency',
    subtitle: 'Scale & Systemize',
    icon: Zap,
    days: 'Days 31–60',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'from-nitai-accent/10 to-nitai-accent/5',
    borderColor: 'border-nitai-accent/20',
    items: [
      'AI Agent Development',
      'Workflow Automation',
      'Client Acquisition',
      'Build Your Agency',
    ],
    gradient: 'from-nitai-accent/20 to-nitai-accent/5',
    glow: 'shadow-purple-500/10',
  },
  {
    name: 'Month 3: Enterprise',
    subtitle: 'Scale to Exit',
    icon: BarChart3,
    days: 'Days 61–90',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'from-nitai-gold/10 to-nitai-gold/5',
    borderColor: 'border-nitai-gold/20',
    items: [
      'Enterprise Automation',
      'Team Leadership',
      'Revenue Operations',
      'Franchise Access',
    ],
    gradient: 'from-nitai-gold/20 to-nitai-gold/5',
    glow: 'shadow-amber-500/10',
  },
]

export function StudentPreview() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-nitai-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-nitai-accent/5 rounded-full blur-3xl" />
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
            <Sparkles className="w-4 h-4 text-nitai-cyan" />
            <span>The 90-Day Roadmap</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Three Phases</span>
            <span className="text-white/80"> to Financial Freedom</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
            A structured journey from complete beginner to earning real income — 
            all within 90 days.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={phase.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border ${phase.borderColor} bg-gradient-to-b ${phase.bgColor} hover:scale-[1.02] transition-all duration-500`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${phase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${phase.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${phase.color}/20 border ${phase.borderColor}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                      {phase.days}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {phase.name}
                  </h3>
                  <p className="text-sm text-white/40 mb-6">
                    {phase.subtitle}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${phase.color}/20 border ${phase.borderColor} flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className="w-3 h-3 text-white/40" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border ${phase.borderColor} group-hover:bg-white/[0.05] transition-all duration-300`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-white/30" />
                      <span className="text-xs text-white/30">
                        Up to 1,500 Credits
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <Link
            to="/auth/register"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white font-semibold text-lg shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 hover:scale-[1.02] transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            <span>Start Your Journey</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
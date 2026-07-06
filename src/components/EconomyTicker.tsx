import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { Users, Trophy, Coins, Target } from 'lucide-react'

function Counter({ value, label, icon: Icon, suffix = '', decimals = 0 }: {
  value: number
  label: string
  icon: typeof Coins
  suffix?: string
  decimals?: number
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals)
  })

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2.5,
      ease: 'easeOut',
    })
    return controls.stop
  }, [value, count])

  return (
    <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
      </div>
      <div>
        <div className="flex items-baseline gap-0.5">
          <motion.span className="text-xl sm:text-2xl font-bold text-white">
            {rounded}
          </motion.span>
          <span className="text-lg sm:text-xl font-bold text-white/60">{suffix}</span>
        </div>
        <span className="text-xs sm:text-sm text-white/30">{label}</span>
      </div>
    </div>
  )
}

export function EconomyTicker() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-nitai-accent/5 via-nitai-cyan/5 to-nitai-pink/5" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            <Counter value={12450} label="Active Students" icon={Users} suffix="+" />
            <Counter value={89250} label="Credits Earned" icon={Coins} suffix="+" />
            <Counter value={1280} label="Store Assets" icon={Target} suffix="" />
            <Counter value={93} label="% Completion Rate" icon={Trophy} suffix="%" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
import { motion } from 'framer-motion'

export function NitaiLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nitai-accent via-nitai-cyan to-nitai-pink animate-shimmer" />
        <div className="absolute inset-[2px] rounded-[10px] bg-nitai-dark flex items-center justify-center">
          <span className="text-base font-black bg-gradient-to-br from-nitai-cyan via-nitai-accent-light to-nitai-pink bg-clip-text text-transparent">
            N
          </span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent tracking-tight">
          Nitai
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-nitai-accent-light/60">
          Group
        </span>
      </div>
    </motion.div>
  )
}

export function NitaiLogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-nitai-accent/20">
        <div className="absolute inset-0 bg-gradient-to-br from-nitai-accent via-nitai-cyan to-nitai-pink animate-shimmer" />
        <div className="absolute inset-[2px] rounded-[14px] bg-nitai-dark flex items-center justify-center">
          <span className="text-2xl font-black bg-gradient-to-br from-nitai-cyan via-nitai-accent-light to-nitai-pink bg-clip-text text-transparent">
            N
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-white">
          Nitai
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nitai-accent-light/50">
          Learn • Earn • Grow
        </span>
      </div>
    </div>
  )
}
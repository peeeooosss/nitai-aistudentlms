import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { SplitHero } from '../components/SplitHero'
import { EconomyTicker } from '../components/EconomyTicker'
import { StudentPreview } from '../components/StudentPreview'
import { EnterpriseView } from '../components/EnterpriseView'
import { Footer } from '../components/Footer'

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-nitai-dark text-white"
    >
      <Header />
      <main>
        <SplitHero />
        <EconomyTicker />
        <StudentPreview />
        <EnterpriseView />
      </main>
      <Footer />
    </motion.div>
  )
}
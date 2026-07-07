import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Sparkles } from 'lucide-react'

type Message = {
  id: number
  text: string
  sender: 'bot' | 'user'
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hey there! I'm AI Didi 🤖 — your personal doubt-clearing assistant. Ask me anything about the module you're studying!",
    sender: 'bot',
  },
]

const botResponses: Record<string, string> = {
  'what is nitai': "Nitai is a gamified Learn-to-Earn LMS platform. You complete modules, earn Nitai Credits, and redeem them for 1,200+ digital resell assets. Think of it as the first Zero-Capital AI Startup model!",
  'how do credits work': "You earn credits by maintaining login streaks, completing daily modules, passing auto-graded quizzes, submitting assignments, and fulfilling micro-bounties. Credits can be spent in the Digital Storefront!",
  'what is the 90 day roadmap': "The 90-day roadmap has 3 phases: Month 1 (Hustler) — AI literacy basics, Month 2 (Automation Agency) — build your own agency, Month 3 (Enterprise) — scale and franchise access.",
  'how do i start': "You're already on the right track! Just follow the modules day by day. Day 1 is unlocked for you — complete the video, quiz, and assignment to earn your first credits!",
  'what is ai didi': "That's me! AI Didi 🤖 is your contextual AI tutor powered by Groq's Llama 3.3 70B. I'm trained on the Nitai curriculum to help clear your doubts instantly!",
  'default': "Great question! I'd recommend checking the current module's video and notes for that answer. If you're stuck, try re-watching the video section or reviewing the key takeaways below it!",
}

export function AIDidiBot({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), text: input.trim(), sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const lower = input.toLowerCase()
      let response = botResponses['default']
      for (const [key, val] of Object.entries(botResponses)) {
        if (lower.includes(key)) {
          response = val
          break
        }
      }
      const botMsg: Message = { id: Date.now() + 1, text: response, sender: 'bot' }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-nitai-accent to-nitai-cyan text-white shadow-2xl shadow-nitai-accent/30 hover:shadow-nitai-accent/50 transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-nitai-pink animate-pulse" />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[400px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
          >
            <div className="bg-gradient-to-r from-nitai-accent to-nitai-cyan p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    AI Didi
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <p className="text-xs text-white/60">Online — Ask me anything!</p>
                </div>
              </div>
            </div>

            <div className="bg-nitai-card h-[400px] overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white rounded-br-md'
                        : 'bg-white/[0.05] text-white/80 border border-white/5 rounded-bl-md'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === 'bot' ? (
                        <Bot className="w-3.5 h-3.5 text-nitai-cyan" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-white/60" />
                      )}
                      <span className="text-[10px] font-medium text-white/30">
                        {msg.sender === 'bot' ? 'AI Didi' : 'You'}
                      </span>
                    </div>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/5 rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-nitai-card border-t border-white/5 p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask AI Didi..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white disabled:opacity-40 transition-all duration-300 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-white/20 mt-2 text-center">
                AI Didi is trained on Nitai curriculum documentation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
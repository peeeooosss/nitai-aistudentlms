import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Sparkles } from 'lucide-react'
import { api } from '../../services/api'

interface AIAssistantDrawerProps {
  isOpen: boolean
  onClose: () => void
  dayNumber: number
  moduleTitle?: string
}

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
}

export default function AIAssistantDrawer({ isOpen, onClose, dayNumber, moduleTitle }: AIAssistantDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgIdCounter, setMsgIdCounter] = useState(1)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: `Hi! I'm your AI tutor, trained only on Day ${dayNumber}${moduleTitle ? `: ${moduleTitle}` : ''}. I can help you with this module's theory, quiz, and assignment — but I can't answer questions about other topics or other days. What would you like to know about this module?`,
          isBot: true,
        },
      ])
      setMsgIdCounter(2)
    }
  }, [isOpen, dayNumber, moduleTitle, messages.length])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { id: msgIdCounter, text, isBot: false }
    setMessages((prev) => [...prev, userMsg])
    setMsgIdCounter((c) => c + 1)
    setInput('')
    setLoading(true)

    try {
      const data = await api.post<{ response?: string; answer?: string }>('/ai/doubt', {
        dayNumber,
        question: text,
      })
      const botMsg: ChatMessage = { id: msgIdCounter + 1, text: data.answer || data.response || 'No response received.', isBot: true }
      setMessages((prev) => [...prev, botMsg])
      setMsgIdCounter((c) => c + 1)
    } catch {
      const botMsg: ChatMessage = {
        id: msgIdCounter + 1,
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        isBot: true,
      }
      setMessages((prev) => [...prev, botMsg])
      setMsgIdCounter((c) => c + 1)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
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
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-nitai-dark/95 backdrop-blur-xl border-l border-white/5 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-nitai-accent to-nitai-cyan/80">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Tutor</h3>
                  <p className="text-xs text-white/40">
                    Day {dayNumber}{moduleTitle ? `: ${moduleTitle}` : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex gap-2.5 max-w-[85%] ${!msg.isBot ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0 mt-1 ${
                        msg.isBot
                          ? 'bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-white/10'
                          : 'bg-gradient-to-br from-nitai-cyan/20 to-nitai-accent/20 border border-white/10'
                      }`}
                    >
                      {msg.isBot ? (
                        <Bot className="w-4 h-4 text-nitai-accent-light" />
                      ) : (
                        <User className="w-4 h-4 text-nitai-cyan" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.isBot
                          ? 'bg-white/[0.04] border border-white/5 text-white/80 rounded-tl-sm'
                          : 'bg-gradient-to-br from-nitai-cyan/20 to-nitai-accent/20 border border-white/10 text-white rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-nitai-accent/20 to-nitai-cyan/20 border border-white/10 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-nitai-accent-light" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-white/5 p-4">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about this module..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 outline-none focus:border-nitai-cyan/50 focus:bg-white/[0.05] transition-all duration-300 text-sm disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-nitai-accent/20 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react'
import { api } from '../../services/api'

interface Submission {
  id: string
  userName: string
  userEmail: string
  moduleTitle: string
  dayNumber: number
  content: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string
}

type Question = { id: number; question: string; options: string[]; correct: number }

export default function AdminEvaluations() {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'submissions'>('quizzes')
  const [questions, setQuestions] = useState<Question[]>([])
  const [newQ, setNewQ] = useState({ question: '', options: ['', '', '', ''], correct: 0 })
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await api.get<{ submissions: Submission[] }>('/admin/submissions')
        setSubmissions(data.submissions || [])
      } catch (err) {
        console.error('Failed to fetch submissions:', err)
      } finally {
        setLoading(false)
      }
    }
    if (activeTab === 'submissions') {
      fetchSubmissions()
    } else {
      setLoading(false)
    }
  }, [activeTab])

  const addQuestion = () => {
    if (!newQ.question.trim() || newQ.options.some((o) => !o.trim())) return
    setQuestions([...questions, { id: Date.now(), ...newQ }])
    setNewQ({ question: '', options: ['', '', '', ''], correct: 0 })
  }

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleStatusChange = async (submissionId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      await api.put(`/admin/submissions/${submissionId}`, { status: newStatus })
      setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: newStatus } : s))
    } catch (err) {
      console.error('Failed to update submission:', err)
    }
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="w-4 h-4 text-emerald-400" />
      case 'REJECTED': return <XCircle className="w-4 h-4 text-red-400" />
      default: return <Clock className="w-4 h-4 text-amber-400" />
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Evaluations</h1>
            <p className="text-white/40 text-sm mt-1">Quiz Creator & Assignment Grader</p>
          </div>
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 mb-6 w-fit">
          {(['quizzes', 'submissions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-nitai-accent/20 text-nitai-accent-light shadow-sm'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {tab === 'quizzes' ? 'Quiz Builder' : 'Submissions'}
            </button>
          ))}
        </div>

        {activeTab === 'quizzes' ? (
          <div className="space-y-6">
            <div className="glass rounded-2xl border border-white/5 p-6">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-nitai-cyan" />
                Add New Question
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">Question</label>
                  <input
                    value={newQ.question}
                    onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                    placeholder="Enter your question..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {newQ.options.map((opt, i) => (
                    <div key={i}>
                      <label className="block text-xs font-medium text-white/40 mb-1.5">
                        Option {String.fromCharCode(65 + i)}
                      </label>
                      <input
                        value={opt}
                        onChange={(e) => {
                          const opts = [...newQ.options]
                          opts[i] = e.target.value
                          setNewQ({ ...newQ, options: opts })
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder-white/20 outline-none focus:border-nitai-cyan/50 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-1.5">Correct Answer</label>
                  <div className="flex gap-2">
                    {newQ.options.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewQ({ ...newQ, correct: i })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 ${
                          newQ.correct === i
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-white/[0.03] text-white/40 border-white/10'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={addQuestion}
                  disabled={!newQ.question.trim() || newQ.options.some((o) => !o.trim())}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-nitai-accent to-nitai-cyan text-white text-sm font-semibold shadow-lg shadow-nitai-accent/20 hover:shadow-nitai-accent/40 transition-all duration-300 disabled:opacity-40"
                >
                  Add Question
                </button>
              </div>
            </div>

            {questions.length > 0 && (
              <div className="glass rounded-2xl border border-white/5 p-6">
                <h2 className="text-base font-semibold text-white mb-4">
                  Question Bank ({questions.length})
                </h2>
                <div className="space-y-3">
                  {questions.map((q, i) => (
                    <div key={q.id} className="flex items-start justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="text-sm font-medium text-white mb-2">
                          {i + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {q.options.map((opt, oi) => (
                            <span key={oi} className={`text-xs px-2 py-1 rounded-lg ${
                              oi === q.correct ? 'bg-emerald-500/10 text-emerald-400' : 'text-white/30 bg-white/[0.02]'
                            }`}>
                              {String.fromCharCode(65 + oi)}. {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => deleteQuestion(q.id)} className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-nitai-cyan/30 border-t-nitai-cyan rounded-full animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">User</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Module</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Status</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Submitted</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-white/30 text-sm">
                          No submissions yet
                        </td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-sm text-white/70">{sub.userName}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-white/50">{sub.moduleTitle}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                              sub.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400' :
                              sub.status === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                              'bg-amber-500/10 text-amber-400'
                            }`}>
                              {statusIcon(sub.status)}
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-white/30">
                            {new Date(sub.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {sub.status === 'PENDING' && (
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleStatusChange(sub.id, 'APPROVED')}
                                  className="text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleStatusChange(sub.id, 'REJECTED')}
                                  className="text-xs px-2 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

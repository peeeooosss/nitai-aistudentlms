import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = searchParams.get('token')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setError('Authentication failed. Please try again.')
      setTimeout(() => navigate('/auth/login'), 3000)
      return
    }

    if (token) {
      localStorage.setItem('nitai_token', token)
      navigate('/dashboard/student')
    } else {
      setError('No token received. Please try again.')
      setTimeout(() => navigate('/auth/login'), 3000)
    }
  }, [searchParams, navigate])

  if (error) {
    return (
      <div className="min-h-screen bg-nitai-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">Authentication Error</div>
          <p className="text-white/40">{error}</p>
          <p className="text-white/30 text-sm mt-4">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nitai-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-nitai-cyan/30 border-t-nitai-cyan rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Completing sign in...</p>
      </div>
    </div>
  )
}

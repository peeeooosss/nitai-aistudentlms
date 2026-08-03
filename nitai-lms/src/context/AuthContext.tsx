import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  role: 'STUDENT' | 'ADMIN'
  avatar?: string
  credits: number
  totalEarned?: number
  createdAt?: string
}

interface AuthResponse {
  token: string
  user: User
}

interface MeResponse {
  user: User
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => void
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('nitai_token')
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      const data = await api.get<MeResponse>('/auth/me')
      setUser(data.user)
    } catch {
      localStorage.removeItem('nitai_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = async (email: string, password: string) => {
    const data = await api.post<AuthResponse>('/auth/login', { email, password })
    localStorage.setItem('nitai_token', data.token)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const data = await api.post<AuthResponse>('/auth/register', { name, email, password })
    localStorage.setItem('nitai_token', data.token)
    setUser(data.user)
  }

  const loginWithGoogle = () => {
    window.location.href = `${api.baseUrl}/auth/google`
  }

  const logout = () => {
    localStorage.removeItem('nitai_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

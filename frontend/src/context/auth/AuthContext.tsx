import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'

// Tipos
export type Role = 'CLIENT' | 'PROVIDER'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  type: Role // Adicionando type como alias para role para compatibilidade
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: Role) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// API base URL - usando o window.location.hostname para permitir acesso via IP da rede local
const API_URL = `http://${window.location.hostname}:3000/api`

// Para debug
console.log('API_URL:', API_URL);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação ao carregar
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }
      
      try {
        // Configurar axios com o token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        // Aqui poderia fazer uma chamada para verificar o token
        // Como é um MVP, vamos apenas buscar os dados do usuário do localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          // Garantir que o campo type exista (compatibilidade)
          if (!parsedUser.type && parsedUser.role) {
            parsedUser.type = parsedUser.role
          }
          setUser(parsedUser)
        } else {
          // Se não há dados do usuário, mas há token, remover o token
          localStorage.removeItem('token')
          setToken(null)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    verifyToken()
  }, [token])
  
  // Login
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      const { token: newToken, user: userData } = response.data
      
      // Garantir que o campo type exista (compatibilidade)
      if (!userData.type && userData.role) {
        userData.type = userData.role
      }
      
      // Salvar token e dados do usuário
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Atualizar estado
      setToken(newToken)
      setUser(userData)
      
      // Configurar axios para futuras requisições
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  // Registro
  const register = async (name: string, email: string, password: string, role: Role) => {
    setIsLoading(true)
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password, role })
      // Após o registro, fazer login automaticamente
      await login(email, password)
    } catch (error) {
      console.error('Erro ao registrar:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }
  
  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
} 
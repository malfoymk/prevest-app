import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }
    if (import.meta.env.DEV && token === '__dev__') {
      setUser({ id: 0, nome: 'Dev', email: 'dev@prevest.local' })
      setLoading(false)
      return
    }
    api.get('/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, senha) {
    if (import.meta.env.DEV && email === 'dev@prevest.local' && senha === 'dev1234') {
      localStorage.setItem('token', '__dev__')
      setUser({ id: 0, nome: 'Dev', email: 'dev@prevest.local' })
      return
    }
    const { data } = await api.post('/auth/login', { email, senha })
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }

  async function register(nome, email, senha, escola) {
    const { data } = await api.post('/auth/register', { nome, email, senha, escola })
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

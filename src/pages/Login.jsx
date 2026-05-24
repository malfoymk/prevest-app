import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import logo from '../context/logo.png'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      await login(email, senha)
      navigate('/home')
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 mx-auto overflow-hidden">
            <img src={logo} alt="PreVestApp" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">PreVestApp</h1>
          <p className="text-green-200 mt-1.5 text-sm">Seu guia para o ensino superior</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-0.5">Entrar</h2>
          <p className="text-sm text-gray-400 mb-5">Acesse sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm px-3 py-3 rounded-xl border border-red-100">
                <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="mt-1.5 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Senha</label>
              <div className="relative mt-1.5">
                <input
                  type={showSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm pr-11 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 mt-2"
            >
              {loading
                ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><LogIn size={16} /> Entrar</>
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            Não tem conta?{' '}
            <Link to="/register" className="text-green-600 font-semibold hover:underline">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>

      <p className="text-center text-green-200/40 text-xs pb-8">
        © PreVestApp 2026 — Educação para todos
      </p>
    </div>
  )
}

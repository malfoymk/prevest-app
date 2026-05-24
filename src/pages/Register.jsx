import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, AlertCircle, ChevronLeft } from 'lucide-react'
import logo from '../context/logo.png'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ nome: '', email: '', escola: '', senha: '', confirmarSenha: '' })
  const [showSenha, setShowSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    if (form.senha.length < 6) return setErro('A senha deve ter pelo menos 6 caracteres.')
    if (form.senha !== form.confirmarSenha) return setErro('As senhas não coincidem.')
    setLoading(true)
    try {
      await register(form.nome, form.email, form.senha, form.escola)
      navigate('/home')
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'mt-1.5 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-3 mx-auto overflow-hidden">
            <img src={logo} alt="PreVestApp" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black text-white">PreVestApp</h1>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Link to="/login" className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h2 className="text-xl font-bold text-gray-800 leading-tight">Criar conta</h2>
              <p className="text-xs text-gray-400">Comece sua jornada rumo à universidade</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {erro && (
              <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm px-3 py-3 rounded-xl border border-red-100">
                <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nome completo</label>
              <input type="text" required value={form.nome} onChange={set('nome')} placeholder="Seu nome completo" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">E-mail</label>
              <input type="email" required value={form.email} onChange={set('email')} placeholder="seu@email.com" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Escola <span className="text-gray-300 normal-case font-normal">(opcional)</span>
              </label>
              <input type="text" value={form.escola} onChange={set('escola')} placeholder="Nome da sua escola..." className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Senha</label>
              <div className="relative mt-1.5">
                <input
                  type={showSenha ? 'text' : 'password'}
                  required
                  value={form.senha}
                  onChange={set('senha')}
                  placeholder="Mínimo 6 caracteres"
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

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirmar senha</label>
              <input type="password" required value={form.confirmarSenha} onChange={set('confirmarSenha')} placeholder="Repita a senha" className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 mt-1"
            >
              {loading
                ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><UserPlus size={16} /> Criar conta</>
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Já tem conta?{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

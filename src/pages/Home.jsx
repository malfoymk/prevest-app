import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Flame, BookOpen, Clock, ChevronRight, CalendarDays,
  PenLine, GraduationCap, Target, LogOut, Sparkles
} from 'lucide-react'
import { getDaysUntil, formatDateBR } from '../data/vestibulares'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const FRASES = [
  'Cada hora de estudo hoje é um passo mais perto do seu futuro.',
  'Seu esforço é o único diferencial que ninguém pode te tirar.',
  'A universidade pública é sua — vá buscar.',
  'Não compare seu início com o meio de outra pessoa. Foco no seu processo.',
  'Estudar é o maior ato de rebeldia contra a desigualdade.',
  'Um dia de cada vez. Um assunto de cada vez. Você consegue.',
]

function computeStreak(sessions) {
  const completedDates = [...new Set(
    sessions.filter(s => s.completed).map(s => s.date)
  )].sort().reverse()
  if (!completedDates.length) return 0
  let streak = 0
  const checkDate = new Date()
  checkDate.setHours(0, 0, 0, 0)
  for (const ds of completedDates) {
    const d = new Date(ds + 'T00:00:00')
    const diff = Math.round((checkDate - d) / 86400000)
    if (diff <= 1) { streak++; checkDate.setDate(checkDate.getDate() - 1) }
    else break
  }
  return streak
}

export default function Home() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sessions, setSessions] = useState([])
  const [simuladoHistory, setSimuladoHistory] = useState([])
  const [frase] = useState(() => FRASES[Math.floor(Math.random() * FRASES.length)])

  const [vestibulares, setVestibulares] = useState([])

  useEffect(() => {
    api.get('/sessions').then(r => setSessions(r.data)).catch(() => {})
    api.get('/simulados').then(r => setSimuladoHistory(r.data)).catch(() => {})
    api.get('/vestibulares').then(r => setVestibulares(r.data)).catch(() => {})
  }, [])

  const totalQuestoes = simuladoHistory.reduce((a, h) => a + (h.total || 0), 0)
  const totalAcertos = simuladoHistory.reduce((a, h) => a + (h.acertos || 0), 0)
  const totalHoras = sessions
    .filter(s => s.completed)
    .reduce((a, s) => a + (s.duracao || 0) / 60, 0)
  const streak = computeStreak(sessions)
  const userName = user?.nome || 'Estudante'

  const proximos = vestibulares
    .flatMap(v => {
      const events = []
      if (v.inscricoes?.inicio) {
        const d = getDaysUntil(v.inscricoes.inicio)
        if (d >= 0) events.push({ tipo: 'Inscrições', nome: v.nome, sigla: v.sigla, data: v.inscricoes.inicio, dias: d, corIcone: v.corIcone })
      }
      if (v.inscricoes?.fim) {
        const d = getDaysUntil(v.inscricoes.fim)
        if (d >= 0 && d <= 30) events.push({ tipo: 'Fim das Inscrições', nome: v.nome, sigla: v.sigla, data: v.inscricoes.fim, dias: d, corIcone: v.corIcone })
      }
      v.provas?.forEach(p => {
        const d = getDaysUntil(p.dia)
        if (d >= 0) events.push({ tipo: 'Prova', nome: v.nome, sigla: v.sigla, data: p.dia, dias: d, corIcone: v.corIcone, desc: p.descricao })
      })
      return events
    })
    .sort((a, b) => a.dias - b.dias)
    .slice(0, 4)

  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  const primeiroNome = userName.split(' ')[0]

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header banner */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 px-4 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-green-200 text-sm font-medium">{saudacao},</span>
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="flex items-center gap-1 text-green-200 text-xs bg-white/10 px-2 py-1 rounded-full hover:bg-white/20"
            >
              <LogOut size={11} /> Sair
            </button>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            {userName.split(' ')[0]} 👋
          </h1>
          <p className="text-green-200 text-sm mt-1">PreVestApp — Seu guia para o ensino superior</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 -mt-4 mb-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 grid grid-cols-3 divide-x divide-gray-100">
          <div className="flex flex-col items-center px-2">
            <div className="flex items-center gap-1 text-orange-500 mb-1">
              <Flame size={18} strokeWidth={2.5} />
              <span className="text-2xl font-bold text-gray-800">{streak}</span>
            </div>
            <span className="text-xs text-gray-500 text-center">dias de sequência</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <div className="flex items-center gap-1 text-blue-500 mb-1">
              <Target size={18} strokeWidth={2.5} />
              <span className="text-2xl font-bold text-gray-800">{totalQuestoes}</span>
            </div>
            <span className="text-xs text-gray-500 text-center">questões respondidas</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <div className="flex items-center gap-1 text-green-600 mb-1">
              <Clock size={18} strokeWidth={2.5} />
              <span className="text-2xl font-bold text-gray-800">{totalHoras.toFixed(0)}</span>
            </div>
            <span className="text-xs text-gray-500 text-center">horas estudadas</span>
          </div>
        </div>
      </div>

      {/* Próximas datas */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-700">📅 Próximas Datas</h2>
          <button onClick={() => navigate('/vestibulares')} className="text-green-600 text-xs font-medium flex items-center gap-0.5">
            Ver todos <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {proximos.length === 0 && (
            <div className="bg-white rounded-xl p-4 text-center text-gray-400 text-sm border border-gray-100">
              Nenhum prazo próximo encontrado.
            </div>
          )}
          {proximos.map((ev, i) => (
            <div key={i} className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-3 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-xl ${ev.corIcone} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-[10px] font-bold leading-tight text-center">{ev.sigla}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{ev.nome}</p>
                <p className="text-[10px] text-gray-500">{ev.tipo} — {formatDateBR(ev.data)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                {ev.dias === 0 ? (
                  <span className="text-xs font-bold text-red-600">Hoje!</span>
                ) : ev.dias === 1 ? (
                  <span className="text-xs font-bold text-orange-600">Amanhã</span>
                ) : (
                  <>
                    <p className="text-sm font-bold text-green-700">{ev.dias}</p>
                    <p className="text-[10px] text-gray-400">dias</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acesso rápido */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">⚡ Acesso Rápido</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: CalendarDays, label: 'Editais e Prazos', desc: 'ENEM, FUVEST, UNICAMP', path: '/vestibulares', cor: 'from-blue-500 to-blue-600' },
            { icon: BookOpen, label: 'Minha Agenda', desc: 'Cronograma de estudos', path: '/cronograma', cor: 'from-purple-500 to-purple-600' },
            { icon: PenLine, label: 'Simulados', desc: '4 matérias disponíveis', path: '/simulados', cor: 'from-amber-500 to-orange-500' },
            { icon: GraduationCap, label: 'Cursos e Vagas', desc: 'USP, UNICAMP, UNESP...', path: '/cursos', cor: 'from-green-500 to-emerald-600' },
          ].map(({ icon: Icon, label, desc, path, cor }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`bg-gradient-to-br ${cor} rounded-2xl p-3.5 text-left shadow-sm active:scale-95 transition-transform`}
            >
              <Icon size={22} className="text-white mb-2" strokeWidth={2} />
              <p className="text-white text-sm font-semibold leading-tight">{label}</p>
              <p className="text-white/75 text-[10px] mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Desempenho */}
      {totalQuestoes > 0 && (
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">📊 Desempenho nos Simulados</h2>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none" stroke="#16a34a" strokeWidth="3.5"
                    strokeDasharray={`${totalQuestoes ? (totalAcertos / totalQuestoes * 100) : 0} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                  {totalQuestoes ? Math.round(totalAcertos / totalQuestoes * 100) : 0}%
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{totalAcertos} de {totalQuestoes} acertos</p>
                <p className="text-xs text-gray-500 mt-0.5">{simuladoHistory.length} simulado{simuladoHistory.length !== 1 ? 's' : ''} realizado{simuladoHistory.length !== 1 ? 's' : ''}</p>
                <button onClick={() => navigate('/simulados')} className="text-green-600 text-xs font-medium mt-1">
                  Fazer novo simulado →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Frase motivacional */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-green-100">
          <div className="flex gap-2">
            <Sparkles size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 italic leading-relaxed">"{frase}"</p>
          </div>
        </div>
      </div>

    </div>
  )
}

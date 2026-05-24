import { useState, useEffect } from 'react'
import { Plus, X, CheckCircle2, Circle, Trash2, BookOpen, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import api from '../services/api'

const MATERIAS = [
  { id: 'matematica', label: 'Matemática', cor: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
  { id: 'portugues', label: 'Português', cor: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700' },
  { id: 'ciencias', label: 'Ciências da Natureza', cor: 'bg-green-500', light: 'bg-green-50', text: 'text-green-700' },
  { id: 'humanas', label: 'Ciências Humanas', cor: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-700' },
  { id: 'redacao', label: 'Redação', cor: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700' },
  { id: 'ingles', label: 'Inglês/Espanhol', cor: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-700' },
  { id: 'revisao', label: 'Revisão Geral', cor: 'bg-gray-500', light: 'bg-gray-50', text: 'text-gray-700' },
]

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const MESES_FULL = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getWeekDays(baseDate) {
  const d = new Date(baseDate)
  d.setDate(d.getDate() - d.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d)
    day.setDate(d.getDate() + i)
    return day
  })
}

export default function Cronograma() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const [weekBase, setWeekBase] = useState(today)
  const [sessions, setSessions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ materia: 'matematica', hora: '08:00', duracao: 60, notas: '' })

  useEffect(() => {
    api.get('/sessions').then(r => setSessions(r.data)).catch(() => {})
  }, [])

  const weekDays = getWeekDays(weekBase)
  const selectedStr = toDateStr(selectedDate)
  const todayStr = toDateStr(today)

  const daySessions = sessions
    .filter(s => s.date === selectedStr)
    .sort((a, b) => a.hora.localeCompare(b.hora))

  const weekCompleted = sessions.filter(s => {
    const ds = s.date
    return s.completed && ds >= toDateStr(weekDays[0]) && ds <= toDateStr(weekDays[6])
  }).length

  const weekTotal = sessions.filter(s => {
    const ds = s.date
    return ds >= toDateStr(weekDays[0]) && ds <= toDateStr(weekDays[6])
  }).length

  const weekHours = sessions
    .filter(s => s.completed && s.date >= toDateStr(weekDays[0]) && s.date <= toDateStr(weekDays[6]))
    .reduce((a, s) => a + s.duracao / 60, 0)

  async function addSession() {
    try {
      const { data } = await api.post('/sessions', { date: selectedStr, ...form })
      setSessions(prev => [...prev, data])
      setShowForm(false)
      setForm({ materia: 'matematica', hora: '08:00', duracao: 60, notas: '' })
    } catch {}
  }

  async function toggleDone(id) {
    try {
      const { data } = await api.patch(`/sessions/${id}/toggle`)
      setSessions(prev => prev.map(s => s.id === id ? data : s))
    } catch {}
  }

  async function deleteSession(id) {
    try {
      await api.delete(`/sessions/${id}`)
      setSessions(prev => prev.filter(s => s.id !== id))
    } catch {}
  }

  const sessionsForDay = (d) => sessions.filter(s => s.date === toDateStr(d))

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-violet-700 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen size={22} className="text-purple-200" />
          <h1 className="text-xl font-bold text-white">Agenda de Estudos</h1>
        </div>
        <p className="text-purple-200 text-sm">Organize sua rotina de preparação</p>
      </div>

      {/* Week stats */}
      <div className="px-4 -mt-3 mb-3">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-800">{weekCompleted}/{weekTotal}</p>
            <p className="text-[10px] text-gray-500">sessões concluídas</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-green-700">{weekHours.toFixed(1)}h</p>
            <p className="text-[10px] text-gray-500">estudadas esta semana</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="flex-1 text-center">
            {weekTotal > 0 ? (
              <>
                <p className="text-lg font-bold text-purple-700">{Math.round(weekCompleted / weekTotal * 100)}%</p>
                <p className="text-[10px] text-gray-500">progresso</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-gray-300">—</p>
                <p className="text-[10px] text-gray-500">progresso</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Week navigation */}
      <div className="px-4 mb-3">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setWeekBase(d => { const n = new Date(d); n.setDate(n.getDate() - 7); return n })}>
              <ChevronLeft size={18} className="text-gray-400" />
            </button>
            <span className="text-xs font-semibold text-gray-600">
              {MESES[weekDays[0].getMonth()]} {weekDays[0].getDate()} – {MESES[weekDays[6].getMonth()]} {weekDays[6].getDate()}, {weekDays[6].getFullYear()}
            </span>
            <button onClick={() => setWeekBase(d => { const n = new Date(d); n.setDate(n.getDate() + 7); return n })}>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((d, i) => {
              const ds = toDateStr(d)
              const isSelected = ds === selectedStr
              const isToday = ds === todayStr
              const hasSessions = sessionsForDay(d).length > 0
              const allDone = hasSessions && sessionsForDay(d).every(s => s.completed)

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center py-1.5 rounded-xl transition-all ${
                    isSelected ? 'bg-purple-600 shadow-sm' : isToday ? 'bg-purple-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-[9px] font-medium ${isSelected ? 'text-purple-200' : 'text-gray-400'}`}>
                    {DIAS[i]}
                  </span>
                  <span className={`text-sm font-bold mt-0.5 ${isSelected ? 'text-white' : isToday ? 'text-purple-700' : 'text-gray-700'}`}>
                    {d.getDate()}
                  </span>
                  {hasSessions && (
                    <div className={`w-1 h-1 rounded-full mt-0.5 ${allDone ? 'bg-green-500' : isSelected ? 'bg-white/60' : 'bg-purple-400'}`} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Day label + add button */}
      <div className="px-4 mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-800">
            {DIAS[selectedDate.getDay()]}, {selectedDate.getDate()} de {MESES_FULL[selectedDate.getMonth()]}
          </h2>
          <p className="text-xs text-gray-400">{daySessions.length} sessão{daySessions.length !== 1 ? 'ões' : ''} planejada{daySessions.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-purple-600 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-sm"
        >
          <Plus size={14} />
          Adicionar
        </button>
      </div>

      {/* Sessions list */}
      <div className="px-4 pb-6 space-y-2">
        {daySessions.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-sm font-semibold text-gray-700">Nenhuma sessão planejada</p>
            <p className="text-xs text-gray-400 mt-1">Toque em "Adicionar" para planejar seus estudos</p>
          </div>
        )}
        {daySessions.map(s => {
          const mat = MATERIAS.find(m => m.id === s.materia) || MATERIAS[0]
          return (
            <div key={s.id} className={`bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex items-start gap-3 ${s.completed ? 'opacity-75' : ''}`}>
              <button onClick={() => toggleDone(s.id)} className="mt-0.5 flex-shrink-0">
                {s.completed
                  ? <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                  : <Circle size={22} className="text-gray-300" strokeWidth={2} />
                }
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${mat.cor} flex-shrink-0`} />
                  <p className={`text-sm font-semibold ${s.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {mat.label}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Clock size={10} /> {s.hora}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {s.duracao >= 60
                      ? `${Math.floor(s.duracao / 60)}h${s.duracao % 60 > 0 ? `${s.duracao % 60}min` : ''}`
                      : `${s.duracao}min`}
                  </span>
                </div>
                {s.notas && <p className="text-[11px] text-gray-400 mt-1 truncate">{s.notas}</p>}
              </div>
              <button onClick={() => deleteSession(s.id)} className="flex-shrink-0 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={14} className="text-gray-300 hover:text-red-400" />
              </button>
            </div>
          )
        })}
      </div>

      {/* Add session modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md max-h-[85vh] flex flex-col animate-fade-in-up">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-base font-bold text-gray-800">Nova Sessão de Estudos</h3>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Matéria</label>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  {MATERIAS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setForm(f => ({ ...f, materia: m.id }))}
                      className={`text-xs font-medium py-2 px-3 rounded-xl border transition-all text-left flex items-center gap-2 ${
                        form.materia === m.id
                          ? `${m.light} ${m.text} border-current`
                          : 'bg-gray-50 text-gray-600 border-transparent'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${m.cor} flex-shrink-0`} />
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horário</label>
                  <input
                    type="time"
                    value={form.hora}
                    onChange={e => setForm(f => ({ ...f, hora: e.target.value }))}
                    className="mt-1.5 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Duração</label>
                  <select
                    value={form.duracao}
                    onChange={e => setForm(f => ({ ...f, duracao: Number(e.target.value) }))}
                    className="mt-1.5 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {[30, 45, 60, 90, 120, 150, 180].map(m => (
                      <option key={m} value={m}>{m >= 60 ? `${Math.floor(m/60)}h${m%60>0?` ${m%60}min`:''}` : `${m}min`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Observações (opcional)</label>
                <input
                  type="text"
                  value={form.notas}
                  onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                  placeholder="Ex: Capítulo 3, exercícios de fixação..."
                  className="mt-1.5 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              onClick={addSession}
              className="w-full bg-purple-600 text-white rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm mt-4 flex-shrink-0"
            >
              <Plus size={16} />
              Adicionar sessão
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

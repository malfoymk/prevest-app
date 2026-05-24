import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, RotateCcw, Trophy, PenLine, AlertCircle } from 'lucide-react'
import api from '../services/api'

const LETRAS = ['A', 'B', 'C', 'D', 'E']

export default function Simulados() {
  const [fase, setFase] = useState('selecao')
  const [materiaKey, setMateriaKey] = useState(null)
  const [respostas, setRespostas] = useState([])
  const [atual, setAtual] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [finalizado, setFinalizado] = useState(false)
  const [showExplicacao, setShowExplicacao] = useState(false)
  const [history, setHistory] = useState([])
  const [materias, setMaterias] = useState({})
  const timerRef = useRef(null)

  useEffect(() => {
    api.get('/simulados').then(r => setHistory(r.data)).catch(() => {})
    api.get('/materias').then(r => setMaterias(r.data)).catch(() => {})
  }, [])

  const materia = materiaKey ? materias[materiaKey] : null
  const questoes = materia?.questoes || []
  const questaoAtual = questoes[atual]

  useEffect(() => {
    if (fase === 'quiz' && !finalizado) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); finish(respostas); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [fase, finalizado])

  function startQuiz(key) {
    const mat = materias[key]
    setMateriaKey(key)
    setRespostas(new Array(mat.questoes.length).fill(null))
    setAtual(0)
    setTimeLeft(mat.tempo * 60)
    setFinalizado(false)
    setShowExplicacao(false)
    setFase('quiz')
  }

  function selectAnswer(idx) {
    if (finalizado) return
    setRespostas(prev => {
      const next = [...prev]
      next[atual] = idx
      return next
    })
    setShowExplicacao(false)
  }

  async function finish(ans) {
    clearInterval(timerRef.current)
    const acertos = questoes.filter((q, i) => ans[i] === q.correta).length
    try {
      const { data } = await api.post('/simulados', {
        materia: materiaKey,
        nome: materia.nome,
        total: questoes.length,
        acertos,
      })
      setHistory(prev => [data, ...prev].slice(0, 20))
    } catch {}
    setFinalizado(true)
    setFase('resultado')
  }

  function formatTime(s) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const acertos = finalizado ? questoes.filter((q, i) => respostas[i] === q.correta).length : 0
  const pct = finalizado && questoes.length ? Math.round(acertos / questoes.length * 100) : 0

  if (fase === 'resultado') {
    return (
      <div className="bg-gray-50 min-h-full">
        <div className={`px-4 pt-12 pb-8 bg-gradient-to-br ${pct >= 60 ? 'from-green-600 to-emerald-700' : pct >= 40 ? 'from-amber-500 to-orange-600' : 'from-red-500 to-rose-600'}`}>
          <div className="text-center">
            <div className="text-5xl mb-3">{pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '📈' : '💪'}</div>
            <h1 className="text-white text-2xl font-bold">{pct}%</h1>
            <p className="text-white/80 text-sm mt-1">{acertos} de {questoes.length} acertos</p>
            <p className="text-white/70 text-xs mt-1">{materia?.nome}</p>
          </div>
        </div>

        <div className="px-4 mt-4 space-y-3">
          {/* Feedback */}
          <div className={`rounded-2xl p-4 border ${pct >= 60 ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
            <p className={`text-sm font-semibold ${pct >= 60 ? 'text-green-800' : 'text-amber-800'}`}>
              {pct >= 80 ? 'Excelente! Continue assim!' : pct >= 60 ? 'Bom resultado! Revise os erros.' : pct >= 40 ? 'Ainda há espaço para melhorar. Revise o conteúdo!' : 'Não desanime! Revise o assunto e tente novamente.'}
            </p>
          </div>

          {/* Gabarito */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Gabarito</h3>
            <div className="space-y-3">
              {questoes.map((q, i) => {
                const acertou = respostas[i] === q.correta
                const respondeu = respostas[i] !== null
                return (
                  <div key={q.id} className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-start gap-2 mb-2">
                      {acertou
                        ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        : <XCircle size={16} className={`${respondeu ? 'text-red-500' : 'text-gray-300'} flex-shrink-0 mt-0.5`} />
                      }
                      <p className="text-xs text-gray-700 leading-snug">{q.enunciado}</p>
                    </div>
                    <div className="pl-5 space-y-1">
                      {q.alternativas.map((alt, j) => (
                        <div
                          key={j}
                          className={`text-xs px-2 py-1 rounded-lg ${
                            j === q.correta
                              ? 'bg-green-100 text-green-800 font-semibold'
                              : j === respostas[i] && !acertou
                              ? 'bg-red-100 text-red-700'
                              : 'text-gray-500'
                          }`}
                        >
                          <span className="font-bold mr-1">{LETRAS[j]})</span>{alt}
                        </div>
                      ))}
                      <p className="text-[10px] text-gray-400 mt-1 italic">{q.explicacao}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-4">
            <button
              onClick={() => startQuiz(materiaKey)}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-xl py-3 text-sm font-semibold"
            >
              <RotateCcw size={15} /> Refazer
            </button>
            <button
              onClick={() => setFase('selecao')}
              className="flex items-center justify-center gap-2 bg-amber-500 text-white rounded-xl py-3 text-sm font-semibold"
            >
              <PenLine size={15} /> Outra matéria
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (fase === 'quiz' && materia && questaoAtual) {
    const respondida = respostas[atual] !== null
    const timerPct = (timeLeft / (materia.tempo * 60)) * 100
    const timerColor = timerPct > 50 ? 'bg-green-500' : timerPct > 20 ? 'bg-amber-500' : 'bg-red-500'

    return (
      <div className="bg-gray-50 min-h-full flex flex-col">
        {/* Quiz header */}
        <div className={`bg-gradient-to-br ${materia.corBg} px-4 pt-10 pb-4`} style={{background: undefined}} >
          <div className={`bg-gradient-to-br from-${materia.cor}-600 to-${materia.cor}-700 px-4 pt-10 pb-4`} />
        </div>
        <div className={`${materia.corBg} px-4 pt-10 pb-4`}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/80 text-xs">{materia.emoji} {materia.nome}</p>
              <p className="text-white text-sm font-bold">Questão {atual + 1} de {questoes.length}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${timeLeft <= 60 ? 'bg-red-500/30 animate-pulse' : 'bg-white/20'}`}>
              <Clock size={13} className="text-white" />
              <span className="text-white text-sm font-bold font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-2">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${((atual + 1) / questoes.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 px-4 py-4 flex flex-col gap-3">
          {/* Question */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-800 leading-relaxed">{questaoAtual.enunciado}</p>
          </div>

          {/* Alternatives */}
          <div className="space-y-2">
            {questaoAtual.alternativas.map((alt, i) => {
              const selected = respostas[atual] === i
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all active:scale-98 ${
                    selected
                      ? `${materia.corLight} border-current ${materia.corTexto} shadow-sm`
                      : 'bg-white border-gray-100 text-gray-700 hover:border-gray-200'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    selected ? `${materia.corBg} text-white` : 'bg-gray-100 text-gray-500'
                  }`}>
                    {LETRAS[i]}
                  </span>
                  <span className="text-sm">{alt}</span>
                </button>
              )
            })}
          </div>

          {/* Nav */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => { setAtual(a => a - 1); setShowExplicacao(false) }}
              disabled={atual === 0}
              className="flex-1 flex items-center justify-center gap-1 py-3 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600 disabled:opacity-30"
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            {atual < questoes.length - 1 ? (
              <button
                onClick={() => { setAtual(a => a + 1); setShowExplicacao(false) }}
                className="flex-1 flex items-center justify-center gap-1 py-3 bg-gray-700 rounded-xl text-sm font-semibold text-white"
              >
                Próxima <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => finish(respostas)}
                className={`flex-1 flex items-center justify-center gap-1 py-3 ${materia.corBg} rounded-xl text-sm font-semibold text-white shadow-sm`}
              >
                <Trophy size={16} /> Finalizar
              </button>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 pb-2">
            {questoes.map((_, i) => (
              <button
                key={i}
                onClick={() => setAtual(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === atual
                    ? `${materia.corBg} w-4`
                    : respostas[i] !== null
                    ? 'bg-gray-400'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Selection screen
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <PenLine size={22} className="text-amber-200" />
          <h1 className="text-xl font-bold text-white">Simulados</h1>
        </div>
        <p className="text-amber-100 text-sm">Questões estilo ENEM • Gabarito comentado</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Escolha uma matéria</p>
        {Object.entries(materias).map(([key, mat]) => (
          <button
            key={key}
            onClick={() => startQuiz(key)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-98 transition-transform text-left"
          >
            <div className={`w-12 h-12 rounded-2xl ${mat.corBg} flex items-center justify-center text-2xl shadow-sm`}>
              {mat.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">{mat.nome}</p>
              <p className="text-xs text-gray-400 mt-0.5">{mat.descricao}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Histórico recente</p>
            <div className="space-y-2">
              {history.slice(0, 5).map((h, i) => {
                const mat = materias[h.materia]
                const pct = Math.round(h.acertos / h.total * 100)
                return (
                  <div key={i} className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-3 border border-gray-100 shadow-sm">
                    <span className="text-lg">{mat?.emoji || '📝'}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-700">{h.nome}</p>
                      <p className="text-[10px] text-gray-400">
                        {new Date(h.timestamp).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className={`text-sm font-bold ${pct >= 60 ? 'text-green-600' : pct >= 40 ? 'text-amber-600' : 'text-red-500'}`}>
                      {pct}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

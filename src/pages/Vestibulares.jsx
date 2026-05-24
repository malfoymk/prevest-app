import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Bell, BellOff, ExternalLink, CalendarDays, MapPin, Tag } from 'lucide-react'
import { getStatusLabel, getStatusColor, getDaysUntil, formatDateBR } from '../data/vestibulares'
import api from '../services/api'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'inscricoes-abertas', label: 'Abertas' },
  { id: 'em-breve', label: 'Em Breve' },
  { id: 'encerrado', label: 'Encerrados' },
]

export default function Vestibulares() {
  const [filtro, setFiltro] = useState('todos')
  const [expandido, setExpandido] = useState(null)
  const [notifs, setNotifs] = useState([])
  const [vestibulares, setVestibulares] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/notificacoes').then(r => setNotifs(r.data)).catch(() => {})
    api.get('/vestibulares')
      .then(r => setVestibulares(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function toggleNotif(id) {
    const ativo = notifs.includes(id)
    try {
      if (ativo) {
        await api.delete(`/notificacoes/${id}`)
        setNotifs(prev => prev.filter(x => x !== id))
      } else {
        await api.post(`/notificacoes/${id}`)
        setNotifs(prev => [...prev, id])
      }
    } catch {}
  }

  const filtrados = filtro === 'todos' ? vestibulares : vestibulares.filter(v => v.status === filtro)
  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <CalendarDays size={22} className="text-blue-200" />
          <h1 className="text-xl font-bold text-white">Editais e Prazos</h1>
        </div>
        <p className="text-blue-200 text-sm">ENEM, FUVEST, UNICAMP, UNESP e mais</p>
      </div>

      {/* Filtros */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar -mt-2">
        {FILTROS.map(f => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filtro === f.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="px-4 pb-6 space-y-3">
        {filtrados.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            Nenhum vestibular nesta categoria.
          </div>
        )}
        {filtrados.map(v => {
          const isExpanded = expandido === v.id
          const hasNotif = notifs.includes(v.id)
          const inscDias = v.inscricoes?.inicio ? getDaysUntil(v.inscricoes.inicio) : null
          const fimDias = v.inscricoes?.fim ? getDaysUntil(v.inscricoes.fim) : null

          return (
            <div
              key={v.id}
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${v.corBorda || 'border-gray-100'}`}
            >
              {/* Card header */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl ${v.corIcone} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-white text-[10px] font-bold text-center leading-tight px-0.5">{v.sigla}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{v.nome}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{v.instituicao}</p>
                      </div>
                      <button
                        onClick={() => toggleNotif(v.id)}
                        className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${hasNotif ? 'bg-yellow-50 text-yellow-500' : 'bg-gray-50 text-gray-400'}`}
                        title={hasNotif ? 'Remover lembrete' : 'Adicionar lembrete'}
                      >
                        {hasNotif ? <Bell size={14} strokeWidth={2.5} /> : <BellOff size={14} />}
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(v.status)}`}>
                        {getStatusLabel(v.status)}
                      </span>
                      {v.taxa && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${v.taxa === 'GRATUITO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {v.taxa}
                        </span>
                      )}
                      {v.cotas && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                          Cotas
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick dates */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {v.inscricoes?.inicio && (
                    <div className="bg-gray-50 rounded-xl p-2">
                      <p className="text-[9px] text-gray-400 uppercase font-semibold tracking-wide">Início das Inscrições</p>
                      <p className="text-xs font-bold text-gray-700 mt-0.5">{formatDateBR(v.inscricoes.inicio)}</p>
                      {inscDias !== null && inscDias >= 0 && (
                        <p className={`text-[9px] mt-0.5 font-medium ${inscDias <= 7 ? 'text-orange-500' : 'text-gray-400'}`}>
                          {inscDias === 0 ? 'Hoje!' : `em ${inscDias} dias`}
                        </p>
                      )}
                    </div>
                  )}
                  {v.inscricoes?.fim && (
                    <div className="bg-gray-50 rounded-xl p-2">
                      <p className="text-[9px] text-gray-400 uppercase font-semibold tracking-wide">Fim das Inscrições</p>
                      <p className="text-xs font-bold text-gray-700 mt-0.5">{formatDateBR(v.inscricoes.fim)}</p>
                      {fimDias !== null && fimDias >= 0 && (
                        <p className={`text-[9px] mt-0.5 font-medium ${fimDias <= 7 ? 'text-red-500' : 'text-gray-400'}`}>
                          {fimDias === 0 ? 'Hoje!' : `em ${fimDias} dias`}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Toggle expand */}
                <button
                  onClick={() => setExpandido(isExpanded ? null : v.id)}
                  className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-gray-400 py-1"
                >
                  {isExpanded ? (
                    <><ChevronUp size={14} /> Menos detalhes</>
                  ) : (
                    <><ChevronDown size={14} /> Mais detalhes</>
                  )}
                </button>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                  <p className="text-xs text-gray-600 leading-relaxed">{v.descricao}</p>

                  {v.provas && v.provas.length > 0 && (
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1.5">Datas das Provas</p>
                      <div className="space-y-1.5">
                        {v.provas.map((p, i) => {
                          const d = getDaysUntil(p.dia)
                          return (
                            <div key={i} className="bg-white rounded-xl p-2.5 flex gap-2 items-start border border-gray-100">
                              <div className={`w-8 h-8 rounded-lg ${v.corIcone} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-white text-[9px] font-bold">{formatDateBR(p.dia).split('/').slice(0,2).join('/')}</span>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-700">{p.descricao}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                  {formatDateBR(p.dia)} {d >= 0 ? `• em ${d} dias` : '• já realizada'}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1"><MapPin size={10} className="inline mr-1" />Vagas</p>
                    <p className="text-xs text-gray-700">{v.vagas}</p>
                  </div>

                  {v.link && (
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-blue-600 font-medium"
                    >
                      <ExternalLink size={12} />
                      Site oficial
                    </a>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

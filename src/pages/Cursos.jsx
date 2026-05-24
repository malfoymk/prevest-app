import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp, GraduationCap, MapPin, Clock, Users, Star } from 'lucide-react'
import { getAreaColor, getInstituicaoColor } from '../data/cursos'
import api from '../services/api'

const INST_BASE = [
  { id: 'todos', nome: 'Todos' },
  { id: 'USP', nome: 'USP' },
  { id: 'UNICAMP', nome: 'UNICAMP' },
  { id: 'UNESP', nome: 'UNESP' },
  { id: 'UNIFESP', nome: 'UNIFESP' },
  { id: 'FATEC', nome: 'FATEC' },
]

export default function Cursos() {
  const [cursos, setCursos] = useState([])
  const [busca, setBusca] = useState('')
  const [instFiltro, setInstFiltro] = useState('todos')
  const [expandido, setExpandido] = useState(null)

  useEffect(() => {
    api.get('/cursos').then(r => setCursos(r.data)).catch(() => {})
  }, [])

  const filtrados = cursos.filter(c => {
    const matchInst = instFiltro === 'todos' || c.instituicao === instFiltro
    const q = busca.toLowerCase()
    const matchBusca = !q ||
      c.nome.toLowerCase().includes(q) ||
      c.instituicao.toLowerCase().includes(q) ||
      c.area.toLowerCase().includes(q) ||
      c.campus.toLowerCase().includes(q)
    return matchInst && matchBusca
  })

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-green-700 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <GraduationCap size={22} className="text-emerald-200" />
          <h1 className="text-xl font-bold text-white">Cursos e Universidades</h1>
        </div>
        <p className="text-emerald-200 text-sm">USP, UNICAMP, UNESP, UNIFESP e FATEC</p>
      </div>

      {/* Search */}
      <div className="px-4 -mt-3 mb-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 px-4 py-3">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar curso, área ou universidade..."
            className="flex-1 text-sm focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
          {busca && (
            <button onClick={() => setBusca('')} className="text-gray-400 text-xs">✕</button>
          )}
        </div>
      </div>

      {/* Institution filter */}
      <div className="px-4 mb-3 flex gap-2 overflow-x-auto no-scrollbar">
        {INST_BASE.map(inst => (
          <button
            key={inst.id}
            onClick={() => setInstFiltro(inst.id)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              instFiltro === inst.id
                ? 'bg-green-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {inst.nome}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-4 mb-2">
        <p className="text-xs text-gray-400">{filtrados.length} curso{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Course list */}
      <div className="px-4 pb-6 space-y-3">
        {filtrados.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm font-semibold text-gray-700">Nenhum curso encontrado</p>
            <p className="text-xs text-gray-400 mt-1">Tente outro termo de busca</p>
          </div>
        )}
        {filtrados.map(c => {
          const isExp = expandido === c.id
          const instColor = getInstituicaoColor(c.instituicao)
          const areaColor = getAreaColor(c.area)

          return (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Card top */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${instColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-white text-[9px] font-bold leading-tight text-center px-0.5">{c.instituicao}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{c.nome}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{c.nomeCompleto}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${areaColor}`}>
                        {c.area}
                      </span>
                      {c.cotas && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                          Cotas
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick info row */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-xl py-2 px-1">
                    <Clock size={12} className="text-gray-400 mx-auto mb-0.5" />
                    <p className="text-[10px] font-semibold text-gray-700">{c.duracao}</p>
                    <p className="text-[9px] text-gray-400">Duração</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl py-2 px-1">
                    <Users size={12} className="text-gray-400 mx-auto mb-0.5" />
                    <p className="text-[10px] font-semibold text-gray-700">{c.vagas}</p>
                    <p className="text-[9px] text-gray-400">Vagas/ano</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl py-2 px-1">
                    <Star size={12} className="text-gray-400 mx-auto mb-0.5" />
                    <p className="text-[10px] font-semibold text-gray-700">{c.notaCorte.universal || '—'}</p>
                    <p className="text-[9px] text-gray-400">Nota corte</p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => setExpandido(isExp ? null : c.id)}
                  className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-gray-400 py-1"
                >
                  {isExp ? <><ChevronUp size={14} /> Menos</> : <><ChevronDown size={14} /> Mais detalhes</>}
                </button>
              </div>

              {/* Expanded */}
              {isExp && (
                <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
                  <p className="text-xs text-gray-600 leading-relaxed">{c.descricao}</p>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1">
                      <MapPin size={10} className="inline mr-1" />Campus
                    </p>
                    <p className="text-xs text-gray-700">{c.campus}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1">Turno</p>
                    <p className="text-xs text-gray-700">{c.turno}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1">Forma de Ingresso</p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.formaIngresso.map(f => (
                        <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {c.notaCorte.universal && (
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1.5">Nota de Corte (referência)</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-xl p-2.5 border border-gray-100">
                          <p className="text-[9px] text-gray-400">Ampla concorrência</p>
                          <p className="text-sm font-bold text-gray-800 mt-0.5">{c.notaCorte.universal}</p>
                        </div>
                        {c.notaCorte.cotasEtno && (
                          <div className="bg-white rounded-xl p-2.5 border border-gray-100">
                            <p className="text-[9px] text-gray-400">Cotas étnico-raciais</p>
                            <p className="text-sm font-bold text-purple-700 mt-0.5">{c.notaCorte.cotasEtno}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {c.diferenciais && (
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide mb-1.5">Diferenciais</p>
                      <ul className="space-y-1">
                        {c.diferenciais.map((d, i) => (
                          <li key={i} className="text-xs text-gray-700 flex gap-2">
                            <span className="text-green-500 flex-shrink-0">✓</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
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

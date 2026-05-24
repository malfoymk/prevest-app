export const vestibulares = [
  {
    id: 'enem2026',
    nome: 'ENEM 2026',
    sigla: 'ENEM',
    instituicao: 'INEP / MEC',
    cor: 'blue',
    corBg: 'bg-blue-100',
    corTexto: 'text-blue-700',
    corBorda: 'border-blue-200',
    corIcone: 'bg-blue-600',
    status: 'inscricoes-abertas',
    inscricoes: { inicio: '2026-06-01', fim: '2026-06-20' },
    provas: [
      { dia: '2026-11-01', descricao: 'Linguagens, Códigos e Redação + Ciências Humanas' },
      { dia: '2026-11-08', descricao: 'Matemática e Ciências da Natureza' },
    ],
    descricao:
      'Exame Nacional do Ensino Médio. Porta de entrada para PROUNI, FIES, SISU e diversas universidades federais e estaduais. A nota também é aceita pela UNICAMP e outras instituições.',
    link: 'https://enem.inep.gov.br',
    vagas: 'Acesso ao SISU, PROUNI, FIES e universidades estaduais',
    cotas: true,
    taxa: 'R$ 85,00 (isenção disponível para alunos da rede pública)',
  },
  {
    id: 'fuvest2027',
    nome: 'FUVEST 2027',
    sigla: 'FUVEST',
    instituicao: 'Universidade de São Paulo (USP)',
    cor: 'red',
    corBg: 'bg-red-100',
    corTexto: 'text-red-700',
    corBorda: 'border-red-200',
    corIcone: 'bg-red-600',
    status: 'em-breve',
    inscricoes: { inicio: '2026-08-10', fim: '2026-09-12' },
    provas: [
      { dia: '2026-12-06', descricao: '1ª Fase — Questões de múltipla escolha' },
      { dia: '2027-01-10', descricao: '2ª Fase — Dia 1 (Redação + Língua Portuguesa, Biologia, Geografia)' },
      { dia: '2027-01-11', descricao: '2ª Fase — Dia 2 (Matemática, Física, Química, História)' },
    ],
    descricao:
      'Processo seletivo para ingresso nos cursos de graduação da Universidade de São Paulo. Considerado um dos vestibulares mais concorridos do Brasil.',
    link: 'https://www.fuvest.br',
    vagas: 'Vagas na USP (São Paulo, Campinas, Ribeirão Preto, São Carlos e outras cidades)',
    cotas: true,
    taxa: 'R$ 190,00 (isenção para alunos da rede pública)',
  },
  {
    id: 'unicamp2027',
    nome: 'Vestibular UNICAMP 2027',
    sigla: 'COMVEST',
    instituicao: 'Universidade Estadual de Campinas',
    cor: 'purple',
    corBg: 'bg-purple-100',
    corTexto: 'text-purple-700',
    corBorda: 'border-purple-200',
    corIcone: 'bg-purple-600',
    status: 'em-breve',
    inscricoes: { inicio: '2026-08-03', fim: '2026-09-04' },
    provas: [
      { dia: '2026-10-18', descricao: '1ª Fase — Questões interdisciplinares' },
      { dia: '2026-11-22', descricao: '2ª Fase — Dia 1' },
      { dia: '2026-11-23', descricao: '2ª Fase — Dia 2' },
    ],
    descricao:
      'O vestibular da UNICAMP avalia o raciocínio interdisciplinar e a capacidade analítica dos candidatos, com provas que exigem leitura crítica e argumentação.',
    link: 'https://www.comvest.unicamp.br',
    vagas: 'Vagas na UNICAMP — Campinas/SP',
    cotas: true,
    taxa: 'R$ 170,00 (isenção para alunos da rede pública)',
  },
  {
    id: 'vunesp2027',
    nome: 'Vestibular UNESP 2027',
    sigla: 'VUNESP',
    instituicao: 'Universidade Estadual Paulista',
    cor: 'orange',
    corBg: 'bg-orange-100',
    corTexto: 'text-orange-700',
    corBorda: 'border-orange-200',
    corIcone: 'bg-orange-600',
    status: 'em-breve',
    inscricoes: { inicio: '2026-08-17', fim: '2026-09-25' },
    provas: [
      { dia: '2026-11-15', descricao: '1ª Fase — Questões objetivas + Redação' },
      { dia: '2027-01-17', descricao: '2ª Fase — Questões discursivas e redação' },
    ],
    descricao:
      'A UNESP oferece vagas em mais de 23 campi espalhados pelo interior de São Paulo. O vestibular avalia conhecimentos do Ensino Médio em todas as áreas.',
    link: 'https://www.vunesp.com.br',
    vagas: 'Vagas em campi de Araçatuba, Araraquara, Assis, Bauru, Botucatu, Franca, Guaratinguetá, Ilha Solteira, Marília, Presidente Prudente, Rio Claro, São José do Rio Preto, entre outros',
    cotas: true,
    taxa: 'R$ 155,00',
  },
  {
    id: 'provao2026',
    nome: 'Provão Paulista 2026',
    sigla: 'Provão',
    instituicao: 'Secretaria da Educação do Estado de SP',
    cor: 'teal',
    corBg: 'bg-teal-100',
    corTexto: 'text-teal-700',
    corBorda: 'border-teal-200',
    corIcone: 'bg-teal-600',
    status: 'em-breve',
    inscricoes: { inicio: '2026-08-01', fim: '2026-09-15' },
    provas: [
      { dia: '2026-11-20', descricao: 'Prova Única — Todos os componentes' },
    ],
    descricao:
      'Processo seletivo exclusivo para alunos da rede estadual de SP. Oferece vagas em FATEC, ETEC e outras instituições estaduais. Totalmente gratuito e voltado para estudantes de escola pública.',
    link: 'https://www.educacao.sp.gov.br',
    vagas: 'Vagas nas FATEC e instituições estaduais paulistas',
    cotas: false,
    taxa: 'GRATUITO',
  },
  {
    id: 'sisu2027',
    nome: 'SISU 2027 (1º Semestre)',
    sigla: 'SISU',
    instituicao: 'MEC — Sistema de Seleção Unificada',
    cor: 'indigo',
    corBg: 'bg-indigo-100',
    corTexto: 'text-indigo-700',
    corBorda: 'border-indigo-200',
    corIcone: 'bg-indigo-600',
    status: 'em-breve',
    inscricoes: { inicio: '2027-01-20', fim: '2027-01-24' },
    provas: [],
    descricao:
      'O SISU utiliza a nota do ENEM para selecionar candidatos a vagas em universidades federais e estaduais em todo o Brasil. A inscrição ocorre logo após a divulgação das notas do ENEM.',
    link: 'https://sisu.mec.gov.br',
    vagas: 'Vagas em universidades federais e estaduais de todo o Brasil',
    cotas: true,
    taxa: 'GRATUITO',
  },
  {
    id: 'prouni2026-2',
    nome: 'PROUNI 2026 — 2º Semestre',
    sigla: 'PROUNI',
    instituicao: 'MEC — Programa Universidade para Todos',
    cor: 'green',
    corBg: 'bg-green-100',
    corTexto: 'text-green-700',
    corBorda: 'border-green-200',
    corIcone: 'bg-green-600',
    status: 'em-breve',
    inscricoes: { inicio: '2026-07-08', fim: '2026-07-11' },
    provas: [],
    descricao:
      'O PROUNI oferece bolsas integrais e parciais (50%) em faculdades privadas para estudantes de baixa renda que tenham participado do ENEM. Não exige vestibular próprio.',
    link: 'https://prouni.mec.gov.br',
    vagas: 'Bolsas em faculdades particulares de todo o Brasil',
    cotas: true,
    taxa: 'GRATUITO',
  },
]

export function getStatusLabel(status) {
  const labels = {
    'inscricoes-abertas': 'Inscrições Abertas',
    'em-breve': 'Em Breve',
    'encerrado': 'Encerrado',
    'provas-em-breve': 'Provas em Breve',
  }
  return labels[status] || status
}

export function getStatusColor(status) {
  const colors = {
    'inscricoes-abertas': 'bg-green-100 text-green-700',
    'em-breve': 'bg-yellow-100 text-yellow-700',
    'encerrado': 'bg-gray-100 text-gray-500',
    'provas-em-breve': 'bg-orange-100 text-orange-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-600'
}

export function getDaysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
}

export function formatDateBR(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

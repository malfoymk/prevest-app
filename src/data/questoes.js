export const materias = {
  matematica: {
    nome: 'Matemática',
    emoji: '📐',
    cor: 'blue',
    corBg: 'bg-blue-600',
    corLight: 'bg-blue-50',
    corTexto: 'text-blue-700',
    tempo: 25,
    descricao: '5 questões • 25 minutos',
    questoes: [
      {
        id: 'm1',
        enunciado:
          'Uma progressão aritmética tem primeiro termo a₁ = 3 e razão r = 5. Qual é o décimo termo dessa progressão?',
        alternativas: ['45', '48', '50', '53', '55'],
        correta: 1,
        explicacao: 'aₙ = a₁ + (n−1)·r → a₁₀ = 3 + 9×5 = 3 + 45 = 48',
      },
      {
        id: 'm2',
        enunciado:
          'Uma loja oferece 20% de desconto em um produto que custa R$ 250,00. Qual é o preço final do produto?',
        alternativas: ['R$ 180,00', 'R$ 190,00', 'R$ 200,00', 'R$ 210,00', 'R$ 220,00'],
        correta: 2,
        explicacao: 'Preço final = 250 × (1 − 0,20) = 250 × 0,80 = R$ 200,00',
      },
      {
        id: 'm3',
        enunciado: 'As raízes da equação x² − 5x + 6 = 0 são:',
        alternativas: ['x = 1 e x = 5', 'x = 2 e x = 3', 'x = −2 e x = −3', 'x = −1 e x = 6', 'x = 1 e x = 6'],
        correta: 1,
        explicacao: 'x² − 5x + 6 = (x − 2)(x − 3) = 0 → x = 2 ou x = 3',
      },
      {
        id: 'm4',
        enunciado:
          'Um triângulo retângulo tem catetos medindo 6 cm e 8 cm. Qual é a medida de sua hipotenusa?',
        alternativas: ['7 cm', '10 cm', '11 cm', '12 cm', '14 cm'],
        correta: 1,
        explicacao: 'h = √(6² + 8²) = √(36 + 64) = √100 = 10 cm',
      },
      {
        id: 'm5',
        enunciado:
          'Uma urna contém 3 bolas vermelhas e 7 bolas azuis. Qual é a probabilidade de sortear aleatoriamente uma bola vermelha?',
        alternativas: ['3/10', '7/10', '1/3', '3/7', '1/10'],
        correta: 0,
        explicacao: 'P = 3 / (3 + 7) = 3/10',
      },
    ],
  },
  portugues: {
    nome: 'Língua Portuguesa',
    emoji: '📖',
    cor: 'amber',
    corBg: 'bg-amber-600',
    corLight: 'bg-amber-50',
    corTexto: 'text-amber-700',
    tempo: 25,
    descricao: '5 questões • 25 minutos',
    questoes: [
      {
        id: 'p1',
        enunciado: 'Identifique a alternativa em que TODAS as palavras estão grafadas corretamente:',
        alternativas: [
          'Excessão, supressão, omissão',
          'Exceção, supresão, omissão',
          'Exceção, supressão, omição',
          'Exceção, supressão, omissão',
          'Ecceção, supressão, omissão',
        ],
        correta: 3,
        explicacao: '"Exceção" (não excessão), "supressão" (dois s) e "omissão" (dois s) — todas corretas na opção D.',
      },
      {
        id: 'p2',
        enunciado: 'Em qual frase a concordância verbal está CORRETA?',
        alternativas: [
          'Fazem dez anos que ele partiu.',
          'Faz dez anos que ele partiu.',
          'Fazem dez anos desde que ele partiu.',
          'Fez dez anos que eles partiram.',
          'Fazem dez anos que eles partiram.',
        ],
        correta: 1,
        explicacao:
          'Com expressões de tempo, o verbo "fazer" é impessoal e deve ser conjugado na 3ª pessoa do singular: "Faz dez anos".',
      },
      {
        id: 'p3',
        enunciado: 'Qual figura de linguagem está presente na expressão "A vida é uma viagem"?',
        alternativas: ['Comparação', 'Hipérbole', 'Metáfora', 'Metonímia', 'Eufemismo'],
        correta: 2,
        explicacao:
          'A metáfora é uma comparação implícita, sem o uso de "como" ou "tal qual". "A vida é uma viagem" é uma metáfora.',
      },
      {
        id: 'p4',
        enunciado: 'O vocábulo sublinhado em "Ela chegou CEDO" exerce a função sintática de:',
        alternativas: ['Adjetivo', 'Substantivo', 'Advérbio', 'Pronome', 'Preposição'],
        correta: 2,
        explicacao: '"Cedo" modifica o verbo "chegou", indicando circunstância de tempo. Logo, é um advérbio.',
      },
      {
        id: 'p5',
        enunciado: 'Indique a frase que apresenta uso CORRETO da crase:',
        alternativas: [
          'Fui à escola ontem.',
          'Ele foi à pé para o trabalho.',
          'Vi à professora na biblioteca.',
          'Cheguei à Brasília no fim de semana.',
          'Dei o livro à ela.',
        ],
        correta: 0,
        explicacao:
          '"Fui à escola" — crase obrigatória (preposição "a" + artigo "a" antes de substantivo feminino). As demais estão incorretas.',
      },
    ],
  },
  ciencias: {
    nome: 'Ciências da Natureza',
    emoji: '🔬',
    cor: 'green',
    corBg: 'bg-green-600',
    corLight: 'bg-green-50',
    corTexto: 'text-green-700',
    tempo: 25,
    descricao: '5 questões • 25 minutos',
    questoes: [
      {
        id: 'c1',
        enunciado:
          'Um carro parte do repouso e acelera uniformemente a 4 m/s². Qual é sua velocidade após 5 segundos?',
        alternativas: ['10 m/s', '15 m/s', '20 m/s', '25 m/s', '30 m/s'],
        correta: 2,
        explicacao: 'v = v₀ + a·t = 0 + 4×5 = 20 m/s (MUV — Movimento Uniformemente Variado)',
      },
      {
        id: 'c2',
        enunciado:
          'Qual elemento químico tem símbolo Fe e é essencial para a formação da hemoglobina no sangue humano?',
        alternativas: ['Cálcio', 'Magnésio', 'Ferro', 'Cobre', 'Zinco'],
        correta: 2,
        explicacao: 'Fe é o símbolo do Ferro (Ferrum, em latim). O ferro é o átomo central da hemoglobina.',
      },
      {
        id: 'c3',
        enunciado:
          'A divisão celular que origina células com metade do número de cromossomos da célula-mãe, sendo essencial para a reprodução sexuada, é:',
        alternativas: ['Mitose', 'Meiose', 'Citocinese', 'Cariótipo', 'Interfase'],
        correta: 1,
        explicacao:
          'A meiose é a divisão reducional. Ocorre em duas etapas (Meiose I e II) e produz 4 células haploides (n).',
      },
      {
        id: 'c4',
        enunciado:
          'Na Tabela Periódica, os elementos da mesma coluna (família/grupo) possuem como característica em comum:',
        alternativas: [
          'Mesmo número de prótons',
          'Mesmo número de elétrons totais',
          'Mesmo número de elétrons na última camada',
          'Mesma massa atômica',
          'Mesmo número de nêutrons',
        ],
        correta: 2,
        explicacao:
          'Elementos de um mesmo grupo têm a mesma configuração da camada de valência (elétrons na última camada), o que determina propriedades químicas semelhantes.',
      },
      {
        id: 'c5',
        enunciado:
          'Num circuito elétrico, a tensão é de 220 V e a resistência é de 100 Ω. Qual é a corrente elétrica que percorre esse circuito?',
        alternativas: ['0,22 A', '2,2 A', '22 A', '100 A', '220 A'],
        correta: 1,
        explicacao: 'Lei de Ohm: I = V / R = 220 / 100 = 2,2 A',
      },
    ],
  },
  humanas: {
    nome: 'Ciências Humanas',
    emoji: '🌎',
    cor: 'rose',
    corBg: 'bg-rose-600',
    corLight: 'bg-rose-50',
    corTexto: 'text-rose-700',
    tempo: 25,
    descricao: '5 questões • 25 minutos',
    questoes: [
      {
        id: 'h1',
        enunciado:
          'A Proclamação da República Brasileira, ocorrida em 15 de novembro de 1889, foi liderada principalmente por:',
        alternativas: [
          'Dom Pedro I',
          'Dom Pedro II',
          'Marechal Deodoro da Fonseca',
          'Floriano Peixoto',
          'Prudente de Moraes',
        ],
        correta: 2,
        explicacao:
          'Marechal Deodoro da Fonseca proclamou a República e tornou-se o primeiro presidente do Brasil.',
      },
      {
        id: 'h2',
        enunciado:
          'O fenômeno da globalização, intensificado a partir da segunda metade do século XX, tem como característica principal:',
        alternativas: [
          'O isolamento das economias nacionais',
          'A integração econômica, cultural e política entre países',
          'O fortalecimento do protecionismo industrial',
          'A redução das trocas comerciais internacionais',
          'O enfraquecimento das telecomunicações',
        ],
        correta: 1,
        explicacao:
          'A globalização é marcada pela integração crescente entre países nos campos econômico, tecnológico, cultural e político.',
      },
      {
        id: 'h3',
        enunciado: 'A queda do Muro de Berlim, em 1989, simbolizou:',
        alternativas: [
          'O início da Segunda Guerra Mundial',
          'A unificação da Alemanha e o fim da Guerra Fria',
          'A criação da União Europeia',
          'O fim da Primeira Guerra Mundial',
          'O início da descolonização africana',
        ],
        correta: 1,
        explicacao:
          'A queda do Muro de Berlim em novembro de 1989 marcou o fim da divisão da Alemanha e simbolizou o colapso do bloco soviético.',
      },
      {
        id: 'h4',
        enunciado:
          'O processo de industrialização e urbanização intensa no Brasil gerou o crescimento desordenado das cidades, com aumento das moradias precárias conhecidas como:',
        alternativas: [
          'Condomínios fechados',
          'Zonas de amortecimento',
          'Favelas e periferias',
          'Distritos industriais',
          'Áreas de preservação ambiental',
        ],
        correta: 2,
        explicacao:
          'O êxodo rural intenso a partir dos anos 1940-50 gerou o "inchaço urbano" com surgimento de favelas e periferias nas grandes cidades brasileiras.',
      },
      {
        id: 'h5',
        enunciado:
          'Segundo Immanuel Kant, o imperativo categórico pode ser resumido como o princípio de:',
        alternativas: [
          'Agir conforme os próprios desejos individuais',
          'Agir de modo que sua ação possa ser lei universal para todos',
          'Buscar a felicidade como bem supremo da vida',
          'Obedecer às autoridades sem questionamento',
          'Agir visando apenas o prazer e a ausência de dor',
        ],
        correta: 1,
        explicacao:
          'O imperativo categórico de Kant diz: "Age apenas segundo a máxima que possas querer que se torne lei universal."',
      },
    ],
  },
}

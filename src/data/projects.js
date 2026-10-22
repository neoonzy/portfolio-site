// Projetos autorais e trabalhos documentados pelo próprio Luis Eduardo.
export const projects = [
  {
    slug: 'typeee', title: 'Typeee', symbol: 'TYPE', image: '/projects/typeee.png', color: 'green',
    category: { pt: 'JOGO / DESENVOLVIMENTO WEB', en: 'GAME / WEB DEVELOPMENT' },
    description: {
      pt: 'Jogo de digitação com treinos, partidas competitivas, ranking e perfis públicos. Um laboratório de produto, interface e experiência de uso.',
      en: 'A typing game with training modes, competitive matches, leaderboards and public profiles. A playground for product, interface and user experience.',
    },
    tags: ['React', 'UX', 'Game design'],
    role: {pt:'Concepção, interface e desenvolvimento',en:'Concept, interface design and development'},
    details: {pt:'Produto autoral para treino de digitação com modos individuais e competitivos, ranking, perfis e acompanhamento de evolução. Trabalho contínuo em experiência do usuário, responsividade e desenvolvimento web.',en:'Independent typing platform featuring solo and competitive modes, leaderboards, user profiles and progress. Ongoing work on user experience, responsive interfaces and web development.'},
    url: 'https://typeee.quest', repo: 'https://github.com/neoonzy/typeee',
  },
  {
    slug: 'zumbido', title: 'Zumbido.cc', symbol: 'ZZZ', image: '/projects/zumbido.png', color: 'orange',
    category: { pt: 'ARQUIVO / CULTURA CICLISTA', en: 'ARCHIVE / CYCLING CULTURE' },
    description: {
      pt: 'Arquivo independente de bicicleta, fotografia, deslocamentos e som. Um projeto editorial e cicloativista que começa na rua.',
      en: 'An independent archive of bicycles, photography, movement and sound. An editorial and cycling-activist project rooted in the streets.',
    },
    tags: ['Editorial', 'Web', 'Fotografia'],
    role: {pt:'Conceito, identidade editorial e desenvolvimento',en:'Concept, editorial identity and development'},
    details: {pt:'Arquivo independente de cultura ciclista, fotografia, deslocamento e som. Criação de uma linguagem editorial e de uma plataforma para publicar registros, matérias e narrativas visuais.',en:'Independent archive for cycling culture, photography, mobility and sound. Editorial identity and platform for publishing stories, field notes and visual records.'},
    url: 'https://zumbido.cc', repo: 'https://github.com/neoonzy/zumbido',
  },
  {
    slug: 'mapeia', title: 'Mapeia', symbol: 'MAP', image: '/projects/mapeia.jpg', color: 'blue',
    category: { pt: 'PROTOTIPAGEM / IMPACTO URBANO', en: 'PROTOTYPING / URBAN IMPACT' },
    description: {
      pt: 'Proposta de interface para georreferenciamento colaborativo de imóveis abandonados no Recife, conectando relatos da população a dados públicos.',
      en: 'An interface concept for collaborative mapping of abandoned properties in Recife, connecting community reports and public data.',
    },
    tags: ['UI/UX', 'Figma', 'Cidade'],
    role: {pt:'Design de interfaces e prototipagem',en:'Interface design and prototyping'},
    details: {pt:'Conceito de produto para georreferenciar colaborativamente imóveis abandonados no Recife. Estudo de navegação e organização de dados voltados ao contexto urbano.',en:'Product concept for collaboratively mapping abandoned properties in Recife. Navigation and information design for an urban context.'},
    url: 'https://mapeia.figma.site',
  },
  {
    slug: 'monan', title: 'Monan', symbol: '3D', color: 'pink',
    category: { pt: 'MODELAGEM / PROTOTIPAGEM 3D', en: 'MODELING / 3D PROTOTYPING' },
    description: {
      pt: 'Participação em projeto interdisciplinar com criação de modelos e protótipos físicos, integrando fabricação digital e tecnologia de impacto social.',
      en: 'Contributed models and physical prototypes to an interdisciplinary project bringing together digital fabrication and social-impact technology.',
    },
    tags: ['3D', 'Fabricação digital', 'UFPE'],
    role: {pt:'Modelagem 3D e prototipagem física',en:'3D modeling and physical prototyping'},
    details: {pt:'Criação de modelos e protótipos físicos por meio de processos de fabricação digital em projeto interdisciplinar.',en:'Created models and physical prototypes using digital fabrication methods in an interdisciplinary project.'},
    url: 'http://lattes.cnpq.br/2980803847545519',
  },
]

// Cards originais do Behance, com o projeto Mapeia incluído ao final.
export const visualProjects = [
  {kind:'behance',id:'249376791'}, {kind:'behance',id:'248768295'},
  {kind:'behance',id:'205419833'}, {kind:'behance',id:'205426665'},
  {kind:'behance',id:'203290819'}, {kind:'behance',id:'205493055'},
  {kind:'behance',id:'203507999'}, {kind:'behance',id:'206151039'},
  {kind:'mapeia',slug:'mapeia',title:'Mapeia',image:'/projects/mapeia.jpg',
   url:'https://mapeia.figma.site',
   type:{pt:'UI/UX · Protótipo',en:'UI/UX · Prototype'},
   alt:{pt:'Interface do Mapeia com mapa do Recife, marcadores e filtros de imóveis abandonados',en:'Mapeia interface with Recife map, property markers and filters'}}
]

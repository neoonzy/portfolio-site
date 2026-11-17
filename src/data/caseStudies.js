import { projects } from './projects.js'

/* Short, grounded case studies. Add genuine photos and outcomes as they become available. */
const process = {
  typeee: {
    pt: [
      ['Problema', 'Conciliar prática de digitação, modos competitivos e leitura de desempenho sem sobrecarregar a interface.'],
      ['Estrutura', 'Organização de modos, fluxos de entrada, partidas e acompanhamento de evolução.'],
      ['Interação', 'Feedback de precisão, velocidade, erros e adaptações para celular.'],
      ['Entrega', 'Jogo web com modos de treino e competição, perfis e estatísticas.'],
    ],
    en: [
      ['Problem', 'Unify typing practice, competitive modes and progress feedback without overwhelming the interface.'],
      ['Structure', 'Design of modes, entry flows, matches and progress tracking.'],
      ['Interaction', 'Accuracy, speed and error feedback, including mobile adaptations.'],
      ['Deliverable', 'Web game with practice and competitive modes, profiles and statistics.'],
    ],
    next: { pt: 'Documentar testes com usuários e decisões de interface com comparativos reais.', en: 'Document user tests and interface decisions with real comparisons.' },
  },
  zumbido: {
    pt: [
      ['Problema', 'Reunir textos, imagens, sons e fragmentos de cultura ciclista sem criar um catálogo de equipamentos.'],
      ['Estrutura', 'Archive, Journal, Sound e Registros têm funções editoriais próprias.'],
      ['Interação', 'Fluxos de publicação, organização de mídias e navegação responsiva.'],
      ['Entrega', 'Arquivo cultural independente com identidade editorial e publicação online.'],
    ],
    en: [
      ['Problem', 'Bring together writing, images, sounds and cycling culture without creating a gear catalog.'],
      ['Structure', 'Archive, Journal, Sound and Records serve distinct editorial purposes.'],
      ['Interaction', 'Publishing workflows, media organization and responsive navigation.'],
      ['Deliverable', 'Independent cultural archive with an editorial identity and published website.'],
    ],
    next: { pt: 'Ampliar registros originais e validar a navegação com leitores.', en: 'Expand original records and validate navigation with readers.' },
  },
  mapeia: {
    pt: [
      ['Problema', 'Organizar relatos, marcadores e filtros de imóveis abandonados em um contexto urbano.'],
      ['Estrutura', 'Hierarquia entre mapa, filtros e detalhes de cada registro.'],
      ['Interação', 'Prototipagem de fluxos de consulta e contribuição.'],
      ['Entrega', 'Conceito de produto e protótipo navegável, não um serviço público operacional.'],
    ],
    en: [
      ['Problem', 'Organize reports, markers and filters for abandoned urban properties.'],
      ['Structure', 'Hierarchy between the map, filters and record details.'],
      ['Interaction', 'Prototyped browsing and contribution flows.'],
      ['Deliverable', 'Product concept and navigable prototype, not a live public service.'],
    ],
    next: { pt: 'Testar com usuários e aprofundar acessibilidade de mapas.', en: 'Test with users and improve map accessibility.' },
  },
  monan: {
    pt: [
      ['Problema', 'Traduzir necessidades de um projeto interdisciplinar em modelos e peças físicas.'],
      ['Estrutura', 'Modelagem tridimensional orientada à fabricação.'],
      ['Interação', 'Prototipagem e ajustes a partir de restrições de material e geometria.'],
      ['Entrega', 'Modelos e protótipos físicos; documentação fotográfica ainda em organização.'],
    ],
    en: [
      ['Problem', 'Translate interdisciplinary project requirements into models and physical objects.'],
      ['Structure', 'Three-dimensional modeling for fabrication.'],
      ['Interaction', 'Prototyping and adjustments for material and geometry constraints.'],
      ['Deliverable', '3D models and physical prototypes; photographic documentation still pending.'],
    ],
    next: { pt: 'Acrescentar fotografias reais e registros de fabricação.', en: 'Add real photographs and fabrication notes.' },
  },
}

export const caseStudies = projects.map(project => ({
  ...project,
  narrative: process[project.slug],
  path: '/projetos/' + project.slug,
}))
export const findCaseStudy = slug => caseStudies.find(item => item.slug === slug)

const translations = {
  pt: {
    label: '06 / CADERNO DE PROCESSO',
    title: ['O CAMINHO', 'IMPORTA.'],
    intro: 'Entre uma ideia e o resultado há escolhas, testes e mudanças de rota. Alguns recortes do que construo e aprendo.',
    open: 'VER BASTIDORES',
    close: 'FECHAR',
    items: [
      {
        index: '01', type: 'PRODUTO / INTERFACE', name: 'Typeee',
        title: 'Aprender também pode ser um jogo.',
        text: 'Um produto de digitação em que treino, competição e leitura de desempenho precisam funcionar como uma experiência só.',
        detail: 'Projeto autoral: concepção, interfaces, implementação dos modos de jogo e ajustes contínuos de responsividade e experiência de uso.',
        image: '/projects/typeee.png', alt: 'Interface do jogo de digitação Typeee',
        link: 'https://typeee.quest', linkText: 'EXPERIMENTAR',
      },
      {
        index: '02', type: 'ARQUIVO / EDITORIAL', name: 'Zumbido',
        title: 'Um arquivo que começa na rua.',
        text: 'Uma plataforma independente em que bicicletas, fotografia, textos e sons convivem sem virar apenas um catálogo.',
        detail: 'Trabalho de conceito, identidade editorial e desenvolvimento: organizar diferentes formatos de registro em uma interface coerente.',
        image: '/projects/zumbido.png', alt: 'Página do arquivo de cultura ciclista Zumbido',
        link: 'https://zumbido.cc', linkText: 'ABRIR O ARQUIVO',
      },
      {
        index: '03', type: 'OBJETO / PROTÓTIPO', name: 'Monan',
        title: 'Da tela para a matéria.',
        text: 'Modelagem e prototipagem física no contexto de um projeto interdisciplinar de tecnologia e impacto social.',
        detail: 'Atuação com criação de modelos e protótipos físicos. Fotos do processo e documentação técnica podem ser adicionadas quando estiverem disponíveis.',
        link: 'http://lattes.cnpq.br/2980803847545519', linkText: 'VER TRAJETÓRIA',
      },
    ],
    footer: 'NOTAS DE TRABALHO / EM CONSTRUÇÃO',
  },
  en: {
    label: '06 / PROCESS NOTEBOOK',
    title: ['THE PROCESS', 'MATTERS.'],
    intro: 'Between an idea and an outcome lie choices, tests and changes of direction. A few glimpses of what I make and learn.',
    open: 'BEHIND THE SCENES',
    close: 'CLOSE',
    items: [
      {
        index: '01', type: 'PRODUCT / INTERFACE', name: 'Typeee',
        title: 'Learning can be playful.',
        text: 'A typing product where practice, competition, and performance feedback need to work as one coherent experience.',
        detail: 'Independent project: concept, interfaces, game modes implementation, and continuous work on responsiveness and user experience.',
        image: '/projects/typeee.png', alt: 'Typeee typing game interface',
        link: 'https://typeee.quest', linkText: 'TRY IT',
      },
      {
        index: '02', type: 'ARCHIVE / EDITORIAL', name: 'Zumbido',
        title: 'An archive rooted in the street.',
        text: 'An independent platform for bicycles, photography, writing, and sound — without turning it all into a catalog.',
        detail: 'Concept, editorial identity, and development: organizing different kinds of records into a coherent interface.',
        image: '/projects/zumbido.png', alt: 'Zumbido cycling culture archive page',
        link: 'https://zumbido.cc', linkText: 'OPEN THE ARCHIVE',
      },
      {
        index: '03', type: 'OBJECT / PROTOTYPE', name: 'Monan',
        title: 'From screen to matter.',
        text: '3D modeling and physical prototyping as part of an interdisciplinary technology project focused on social impact.',
        detail: 'Modeling and physical prototyping. Process photos and technical documentation can be added when available.',
        link: 'http://lattes.cnpq.br/2980803847545519', linkText: 'SEE EXPERIENCE',
      },
    ],
    footer: 'WORK IN PROGRESS / PROCESS NOTES',
  },
}

export default function FieldNotes({ lang }) {
  const c = translations[lang] || translations.pt
  return (
    <section className="section notes-section" id="notes" aria-labelledby="notes-title">
      <div className="shell">
        <div className="notes-header">
          <span className="eyebrow">{c.label}</span>
          <div className="notes-heading-copy">
            <h2 id="notes-title" className="section-title">
              {c.title.map(line => <span key={line} className="notes-title-line">{line}</span>)}
            </h2>
            <p className="section-intro">{c.intro}</p>
          </div>
        </div>
        <div className="notes-grid">
          {c.items.map((item) => <article className="note-card" key={item.index}>
            <div className="note-topline"><span>{item.index} / {c.items.length.toString().padStart(2, '0')}</span><span>{item.type}</span></div>
            {item.image ? (
              <div className="note-image"><img src={item.image} loading="lazy" alt={item.alt} /></div>
            ) : (
              <div className="note-placeholder" aria-label={lang === 'pt' ? 'Sem imagem do protótipo disponível' : 'Prototype image not yet available'}>
                <span>WORKSHOP / OBJECT</span>
                <strong>03</strong>
                <span>{lang === 'pt' ? 'PROCESSO EM DOCUMENTAÇÃO' : 'DOCUMENTATION IN PROGRESS'}</span>
              </div>
            )}
            <div className="note-content">
              <span className="note-name">{item.name}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <details className="note-details">
                <summary>{c.open}<span aria-hidden="true">+</span></summary>
                <p>{item.detail}</p>
              </details>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.linkText} <span aria-hidden="true">↗</span></a>
            </div>
          </article>)}
        </div>
        <p className="notes-caption">{c.footer}</p>
      </div>
    </section>
  )
}

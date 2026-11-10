const translations = {
  pt: {
    label: '04 / CADERNO DE PROCESSO',
    title: ['NÃO É SÓ', 'O RESULTADO.'],
    intro: 'Um pouco do raciocínio e dos materiais por trás das coisas que faço. Projetos em diferentes escalas, do pixel à matéria.',
    items: [
      { index: '01', kind: 'PRODUTO DIGITAL', title: 'Construir para experimentar.', text: 'O Typeee combina prática, partidas competitivas e acompanhamento de desempenho em uma experiência de digitação. Interface e implementação evoluem juntas.', image: '/projects/typeee.png', link: 'https://typeee.quest', linkText: 'EXPLORAR O PRODUTO', alt: 'Prévia da interface do Typeee' },
      { index: '02', kind: 'ARQUIVO INDEPENDENTE', title: 'Registrar também é projetar.', text: 'O Zumbido reúne bicicleta, deslocamentos, fotografia e som. O desafio editorial é criar um espaço onde diferentes tipos de registros possam conviver.', image: '/projects/zumbido.png', link: 'https://zumbido.cc', linkText: 'VISITAR O ARQUIVO', alt: 'Prévia do site Zumbido' },
      { index: '03', kind: 'FABRICAÇÃO DIGITAL', title: 'Da tela para a matéria.', text: 'No Monan, a modelagem e a prototipagem física fazem parte de um trabalho interdisciplinar. Quero mostrar mais desse processo com fotos e modelos reais.', link: 'http://lattes.cnpq.br/2980803847545519', linkText: 'VER TRAJETÓRIA', alt: '' }
    ],
    caption: 'SELEÇÃO DE PROCESSOS / DOCUMENTAÇÃO EM EXPANSÃO'
  },
  en: {
    label: '04 / PROCESS NOTEBOOK',
    title: ['MORE THAN', 'THE OUTCOME.'],
    intro: 'A glimpse into the thinking and materials behind my work. Projects at different scales, from pixels to physical objects.',
    items: [
      { index: '01', kind: 'DIGITAL PRODUCT', title: 'Build to experiment.', text: 'Typeee brings together practice, competitive matches and performance tracking in a typing experience. Interface design and implementation evolve together.', image: '/projects/typeee.png', link: 'https://typeee.quest', linkText: 'EXPLORE THE PRODUCT', alt: 'Preview of the Typeee interface' },
      { index: '02', kind: 'INDEPENDENT ARCHIVE', title: 'Documenting is designing.', text: 'Zumbido brings together bicycles, movement, photography and sound. The editorial challenge is to make room for different types of records to coexist.', image: '/projects/zumbido.png', link: 'https://zumbido.cc', linkText: 'VISIT THE ARCHIVE', alt: 'Preview of the Zumbido site' },
      { index: '03', kind: 'DIGITAL FABRICATION', title: 'From screen to matter.', text: 'For Monan, modeling and physical prototyping are part of interdisciplinary work. I plan to share more of this process with actual photos and 3D models.', link: 'http://lattes.cnpq.br/2980803847545519', linkText: 'SEE EXPERIENCE', alt: '' }
    ],
    caption: 'SELECTED PROCESSES / MORE DOCUMENTATION TO COME'
  }
}

export default function FieldNotes({ lang }) {
  const c = translations[lang] || translations.pt

  return (
    <section className="section notes-section" id="notes" aria-labelledby="notes-title">
      <div className="shell">
        <div className="notes-header">
          <span className="eyebrow">{c.label}</span>
          <div>
            <h2 id="notes-title" className="section-title">{c.title.map(line => <span key={line} className="notes-title-line">{line}</span>)}</h2>
            <p className="section-intro">{c.intro}</p>
          </div>
        </div>
        <div className="notes-grid">
          {c.items.map((item) => (
            <article className="note-card" key={item.index}>
              <div className="note-topline"><span>{item.index} / 03</span><span>{item.kind}</span></div>
              {item.image ? (
                <div className="note-image"><img loading="lazy" src={item.image} alt={item.alt} /></div>
              ) : (
                <div className="note-placeholder" aria-hidden="true">
                  <span>PROTOTYPE / PHYSICAL</span>
                  <div className="note-geometry"><i /><i /><i /></div>
                  <span>STUDY 003 / WORK IN PROGRESS</span>
                </div>
              )}
              <div className="note-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.linkText} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <p className="notes-caption">{c.caption}</p>
      </div>
    </section>
  )
}

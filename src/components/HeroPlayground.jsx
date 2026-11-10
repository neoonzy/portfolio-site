import { useState } from 'react'

const stages = {
  pt: [
    { label: 'OBSERVAR.', detail: 'Tudo começa olhando com atenção.', tag: '01 / CURIOSIDADE', shape: 'observe' },
    { label: 'DESENHAR.', detail: 'Dar forma às perguntas e ideias.', tag: '02 / DESIGN', shape: 'design' },
    { label: 'CONSTRUIR.', detail: 'Testar até virar algo que funciona.', tag: '03 / FAZER', shape: 'make' },
  ],
  en: [
    { label: 'OBSERVE.', detail: 'Everything starts with paying attention.', tag: '01 / CURIOSITY', shape: 'observe' },
    { label: 'DESIGN.', detail: 'Giving shape to questions and ideas.', tag: '02 / DESIGN', shape: 'design' },
    { label: 'MAKE.', detail: 'Testing until things actually work.', tag: '03 / MAKING', shape: 'make' },
  ],
}

export default function HeroPlayground({ lang }) {
  const [index, setIndex] = useState(0)
  const entries = stages[lang] || stages.pt
  const active = entries[index]

  return (
    <div className="hero-playground" aria-label={lang === 'pt' ? 'Cartaz interativo de apresentação' : 'Interactive introduction poster'}>
      <div className="hero-playground-top">
        <span>LE / STUDIO</span>
        <span>{String(index + 1).padStart(2, '0')} — 03</span>
      </div>
      <div className={'hero-playground-art is-' + active.shape} aria-hidden="true">
        <div className="hero-playground-grid" />
        <div className="hero-playground-form"><span /><span /><span /></div>
        <span className="hero-playground-coordinate">50° / 08°</span>
      </div>
      <div className="hero-playground-copy" key={lang + index} aria-live="polite" aria-atomic="true">
        <span>{active.tag}</span>
        <strong>{active.label}</strong>
        <p>{active.detail}</p>
      </div>
      <div className="hero-playground-bottom">
        <span>{lang === 'pt' ? 'UMA IDEIA POR VEZ' : 'ONE IDEA AT A TIME'}</span>
        <button type="button" onClick={() => setIndex(i => (i + 1) % entries.length)}
          aria-label={lang === 'pt' ? 'Descobrir o próximo passo' : 'Discover the next step'}>
          {lang === 'pt' ? 'PRÓXIMO' : 'NEXT'} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  )
}

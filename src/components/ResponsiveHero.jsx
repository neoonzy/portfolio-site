import { useEffect, useRef, useState } from 'react'

const gestures = {
  pt: [
    { number: '01', word: 'OBSERVAR', sub: 'Ler a rua, perceber detalhes e fazer perguntas.' },
    { number: '02', word: 'DESENHAR', sub: 'Organizar ideias e encontrar uma linguagem.' },
    { number: '03', word: 'CONSTRUIR', sub: 'Experimentar, testar e colocar as coisas no mundo.' },
  ],
  en: [
    { number: '01', word: 'OBSERVE', sub: 'Read the street, notice the details, ask questions.' },
    { number: '02', word: 'DESIGN', sub: 'Shape ideas and discover a visual language.' },
    { number: '03', word: 'MAKE', sub: 'Experiment, test and bring things into the world.' },
  ],
}

export default function ResponsiveHero({ lang, c, email }) {
  const heroRef = useRef(null)
  const [active, setActive] = useState(0)
  const [intro, setIntro] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const choices = gestures[lang] || gestures.pt
  const item = choices[active]

  useEffect(() => {
    if (!intro) return
    const finish = window.setTimeout(() => setIntro(false), 1380)
    return () => window.clearTimeout(finish)
  }, [intro])

  const move = (event) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = heroRef.current
    if (!element) return
    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    element.style.setProperty('--react-x', (x * 100).toFixed(2) + '%')
    element.style.setProperty('--react-y', (y * 100).toFixed(2) + '%')
    element.style.setProperty('--shift-x', ((x - .5) * 18).toFixed(1) + 'px')
    element.style.setProperty('--shift-y', ((y - .5) * 14).toFixed(1) + 'px')
    element.style.setProperty('--shift-last-x', ((.5 - x) * 4).toFixed(1) + 'px')
  }
  const reset = () => {
    const element = heroRef.current
    if (!element) return
    element.style.setProperty('--react-x','50%')
    element.style.setProperty('--react-y','50%')
    element.style.setProperty('--shift-x','0px')
    element.style.setProperty('--shift-y','0px')
    element.style.setProperty('--shift-last-x','0px')
  }

  return (
    <section className="editorial-hero" id="top" aria-labelledby="hero-title"
      ref={heroRef} onPointerMove={move} onPointerLeave={reset} data-active={active}>
      {intro && <div className="editorial-intro" aria-hidden="true">
        <div className="editorial-intro-left" /><div className="editorial-intro-right" />
        <div className="editorial-intro-mark">LE<span>/</span></div>
        <div className="editorial-intro-counter">PORTFOLIO — 2026</div>
      </div>}
      <div className="shell">
        <div className="editorial-hero-top">
          <span>LE / 2026</span>
          <span>{lang === 'pt' ? 'DESIGN, CÓDIGO & PROCESSO' : 'DESIGN, CODE & PROCESS'}</span>
          <span>{lang === 'pt' ? 'RECIFE — BRASIL' : 'RECIFE — BRAZIL'} <span aria-hidden="true">↗</span></span>
        </div>
        <div className="editorial-hero-grid">
          <div className="editorial-hero-copy">
            <p className="editorial-hero-eyebrow"><span className="editorial-hero-status" aria-hidden="true" />{c.eyebrow}</p>
            <p className="editorial-hero-kicker">{c.heroTop}</p>
            <h1 id="hero-title" className="editorial-hero-title">
              <span className="editorial-title-line"><span>{c.heroName.split(' ')[0]}</span></span>
              <span className="editorial-title-line editorial-title-shift"><span>{c.heroName.split(' ').slice(1).join(' ')}</span></span>
              <span className="editorial-title-line editorial-title-last"><span>{c.heroName2}</span></span>
            </h1>
            <div className="editorial-hero-description">
              <p>{c.heroText}</p>
              <div className="editorial-hero-actions">
                <a className="editorial-hero-cta" href="#projects">{c.heroAction} <span aria-hidden="true">↗</span></a>
                <a className="editorial-hero-cta editorial-hero-cta-secondary" href={'mailto:' + email}>{c.heroSecond} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <div className="editorial-reactive" aria-label={lang === 'pt' ? 'Experimento interativo de formas e processos' : 'Interactive study of shapes and process'}>
            <div className="editorial-reactive-heading">
              <span>{lang === 'pt' ? 'ESTUDO DE MOVIMENTO / 001' : 'MOVEMENT STUDY / 001'}</span>
              <span>{lang === 'pt' ? 'INTERAJA' : 'INTERACT'} <span aria-hidden="true">↗</span></span>
            </div>
            <div className="editorial-reactive-canvas" aria-hidden="true">
              <div className="editorial-reactive-grid" />
              <div className="editorial-reactive-disc">
                <div className="editorial-reactive-ring ring-one" />
                <div className="editorial-reactive-ring ring-two" />
                <div className="editorial-reactive-ring ring-three" />
                <span className="editorial-reactive-crosshair">+</span>
              </div>
              <span className="editorial-reactive-coordinate">X / 0{active + 1} &nbsp; Y / 03</span>
              <span className="editorial-reactive-side">MOVE / LOOK / MAKE</span>
            </div>
            <div className="editorial-reactive-caption" aria-live="polite" aria-atomic="true">
              <span>{item.number} / 03</span>
              <strong>{item.word}<span>.</span></strong>
              <p>{item.sub}</p>
            </div>
            <div className="editorial-reactive-switches" role="group" aria-label={lang === 'pt' ? 'Etapas do processo criativo' : 'Creative process stages'}>
              {choices.map((entry, index) => <button key={entry.number}
                className={index === active ? 'is-active' : ''}
                type="button" aria-pressed={index === active}
                onClick={() => setActive(index)}>
                <span>{entry.number}</span><span>{entry.word}</span>
              </button>)}
            </div>
          </div>
        </div>
        <div className="editorial-hero-bottom">
          <span>{lang === 'pt' ? 'USE O PONTEIRO PARA MOVER O ESTUDO' : 'MOVE YOUR POINTER TO EXPLORE'}</span>
          <a href="#lab">{lang === 'pt' ? 'EXPERIMENTAR O TYPEEE' : 'TRY TYPEEE'} <span aria-hidden="true">↓</span></a>
          <span>SCROLL / 001—007</span>
        </div>
      </div>
    </section>
  )
}

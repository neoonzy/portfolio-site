import { useState } from 'react'
import { projects } from '../data/projects.js'

/**
 * An editorial index of actual work, not a decorative animation.
 * The masthead is immediately visible. Hover, focus or select a title
 * to reveal its context; touch and keyboard have the same functionality.
 */
export default function ResponsiveHero({ lang, c, email }) {
  const [active, setActive] = useState(0)
  const selected = projects[active]
  const pt = lang === 'pt'

  return (
    <section className="editorial-hero" id="top" aria-labelledby="hero-title">
      <div className="shell">
        <div className="editorial-hero-top">
          <span>LE / PORTFÓLIO 2026</span>
          <span>{pt ? 'DESIGN, CÓDIGO & PROCESSO' : 'DESIGN, CODE & PROCESS'}</span>
          <span>{pt ? 'RECIFE — BRASIL' : 'RECIFE — BRAZIL'} <span aria-hidden="true">↗</span></span>
        </div>

        <div className="editorial-hero-grid">
          <div className="editorial-hero-copy">
            <p className="editorial-hero-eyebrow">
              <span className="editorial-hero-status" aria-hidden="true" />{c.eyebrow}
            </p>
            <p className="editorial-hero-kicker">{c.heroTop}</p>
            <h1 id="hero-title" className="editorial-hero-title">
              <span>LUIS</span>
              <span>EDUARDO</span>
              <span className="editorial-hero-last">LUSTOSA<span aria-hidden="true">.</span></span>
            </h1>
            <div className="editorial-hero-description">
              <p>{c.heroText}</p>
              <div className="editorial-hero-actions">
                <a className="editorial-hero-cta" href="#projects">
                  {c.heroAction} <span aria-hidden="true">↗</span>
                </a>
                <a className="editorial-hero-cta editorial-hero-cta-secondary" href={'mailto:' + email}>
                  {c.heroSecond} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <aside className="editorial-work-index" aria-label={pt ? 'Índice interativo de projetos' : 'Interactive project index'}>
            <div className="editorial-work-index-top">
              <span>{pt ? 'TRABALHOS SELECIONADOS' : 'SELECTED WORK'}</span>
              <span>01 — 04</span>
            </div>
            <div className="editorial-work-index-list">
              {projects.map((project, i) => (
                <button
                  type="button"
                  key={project.slug}
                  className={'editorial-work-index-item' + (active === i ? ' is-active' : '')}
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="editorial-work-index-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="editorial-work-index-name">{project.title}</span>
                  <span aria-hidden="true" className="editorial-work-index-arrow">↗</span>
                </button>
              ))}
            </div>
            <div className="editorial-work-index-detail" aria-live="polite" aria-atomic="true">
              <div className="editorial-work-index-meta">
                <span>{String(active + 1).padStart(2, '0')} / 04</span>
                <span>{selected.category[lang]}</span>
              </div>
              <p>{selected.description[lang]}</p>
              <a href={selected.url} target="_blank" rel="noopener noreferrer">
                {pt ? 'ABRIR ESSE PROJETO' : 'OPEN THIS PROJECT'} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>

        <div className="editorial-hero-bottom">
          <span>{pt ? 'ÍNDICE DE PROJETOS — EXPLORE PELOS TÍTULOS' : 'PROJECT INDEX — EXPLORE BY TITLE'}</span>
          <a href="#lab">
            {pt ? 'EXPERIMENTAR O TYPEEE' : 'TRY TYPEEE'} <span aria-hidden="true">↓</span>
          </a>
          <span>SCROLL / 001—007</span>
        </div>
      </div>
    </section>
  )
}

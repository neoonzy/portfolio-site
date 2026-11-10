import { useState } from 'react'
import { projects } from '../data/projects.js'
import MagneticStamp from './MagneticStamp.jsx'

/**
 * Graphic editorial front page inspired by Swiss grids and printed portfolios.
 * No initial animation, artificial motion studies, or personal photography.
 * The project index is the only interaction in this section.
 */
export default function ResponsiveHero({ lang, c, email, onPreviewEnter, onPreviewFocus, onPreviewLeave }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = projects[selectedIndex]
  const pt = lang === 'pt'

  return (
    <section className="print-hero" id="top" aria-labelledby="hero-title">
      <div className="shell print-shell">
        <div className="print-running-header">
          <span>INDEX</span>
          <span>/ 01 — {pt ? 'INTRO' : 'INTRO'}</span>
          <span>LUIS EDUARDO / {pt ? 'PORTFÓLIO' : 'PORTFOLIO'}</span>
          <span>GRID ↗</span>
        </div>

        <div className="print-cover">
          <div className="print-identity">
            <h1 id="hero-title" className="print-wordmark">
              <span>LUIS<span className="print-separator">/</span></span>
              <span>EDUARDO</span>
            </h1>
            <div className="print-identity-caption">
              <span>LUIS EDUARDO LUSTOSA</span>
              <span>DESIGN & DEVELOPMENT</span>
              <span>BASED IN RECIFE, BR</span>
              <span>2026 ©</span>
            </div>
          </div>

          <div className="print-cover-lower">
            <div className="print-cover-years">
              <span>{pt ? 'PROJETOS / PROCESSOS' : 'WORK / PROCESS'}</span>
              <strong>2024—<br/>2026</strong>
              <a href="#projects">{pt ? 'VER TRABALHOS' : 'SELECTED WORK'} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="print-cover-statement">
              <span className="print-minilabel">/ {pt ? 'SOBRE' : 'ABOUT'}</span>
              <p>{c.heroText}</p>
              <div className="print-cover-statement-links">
                <a href="#about">{pt ? 'MAIS SOBRE MIM' : 'ABOUT ME'} ↗</a>
                <a href={'mailto:' + email}>{pt ? 'CONTATO' : 'CONTACT'} ↗</a>
              </div>
            </div>
            <div className="print-cover-art">
              <div className="print-linework" aria-hidden="true">
                <div className="print-linework-cutout" />
                <span className="print-linework-code">LEL — 01</span>
              </div>
              <MagneticStamp lang={lang} />
              <span className="print-art-caption">{pt ? 'ARRASTE O CARIMBO / SOLTE PARA VOLTAR' : 'DRAG THE STAMP / RELEASE TO SPRING BACK'}</span>
            </div>
          </div>
        </div>

        <div className="print-index" aria-label={pt ? 'Índice interativo de projetos' : 'Interactive projects index'}>
          <div className="print-index-header">
            <span>INDEX</span>
            <span>/ 02 — {pt ? 'SELEÇÃO DE TRABALHOS' : 'SELECTED WORK'}</span>
            <span>{String(projects.length).padStart(2,'0')} {pt ? 'PROJETOS' : 'PROJECTS'}</span>
          </div>
          <div className="print-index-grid">
            <div className="print-index-nav" role="group" aria-label={pt ? 'Selecionar projeto' : 'Select project'}>
              {projects.map((project, index) => (
                <button
                  key={project.slug}
                  type="button"
                  aria-pressed={selectedIndex === index}
                  className={'print-index-item' + (selectedIndex === index ? ' is-selected' : '')}
                  onFocus={event => { setSelectedIndex(index); onPreviewFocus?.(project, event) }}
                  onBlur={onPreviewLeave}
                  onMouseEnter={event => { setSelectedIndex(index); onPreviewEnter?.(project, event) }}
                  onMouseLeave={onPreviewLeave}
                  onClick={() => { setSelectedIndex(index); onPreviewLeave?.() }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{project.title}</strong>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div className="print-index-detail" aria-live="polite" aria-atomic="true">
              <div className="print-index-detail-head">
                <span>SELECTED / {String(selectedIndex + 1).padStart(2, '0')}</span>
                <span>{pt ? 'VISÃO GERAL' : 'OVERVIEW'}</span>
              </div>
              <div className="print-index-detail-body" key={selected.slug}>
                <span className="print-minilabel">{selected.category[lang]}</span>
                <h2>{selected.title}<span aria-hidden="true">.</span></h2>
                <p>{selected.description[lang]}</p>
                <a href={selected.url} target="_blank" rel="noopener noreferrer">
                  {pt ? 'VISITAR O PROJETO' : 'OPEN PROJECT'} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="print-index-detail-foot">
                <span>{pt ? 'PASSE O MOUSE OU SELECIONE' : 'HOVER OR SELECT'}</span>
                <span>LEL © 26</span>
              </div>
            </div>
          </div>
        </div>

        <div className="print-hero-footer">
          <span>SCROLL / 001 — 007</span>
          <a href="#about">{pt ? 'CONTINUAR EXPLORANDO' : 'KEEP EXPLORING'} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}

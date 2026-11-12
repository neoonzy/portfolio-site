import { useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import KineticWordmark from './KineticWordmark.jsx'

/**
 * Graphic editorial front page inspired by Swiss grids and printed portfolios.
 * No initial animation, artificial motion studies, or personal photography.
 * The project index is the only interaction in this section.
 */
export default function ResponsiveHero({ lang, c, email, onPreviewEnter, onPreviewFocus, onPreviewLeave, onOpenCase }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [expandedMobileIndex, setExpandedMobileIndex] = useState(null)
  const lettersRef = useRef(null)
  const selected = projects[selectedIndex]
  const pt = lang === 'pt'

  return (
    <section className="print-hero" id="top" aria-labelledby="hero-title">
      <div className="shell print-shell">
        <div className="print-running-header">
          <span>INDEX</span>
          <span>/ 01 — {pt ? 'INTRO' : 'INTRO'}</span>
          <span>LUIS EDUARDO / {pt ? 'PORTFÓLIO' : 'PORTFOLIO'}</span>
          <span>PORTFOLIO / 09</span>
        </div>

        <div className="print-cover">
          <div className="print-identity">
            <KineticWordmark lang={lang} ref={lettersRef} />
            <div className="print-identity-caption">
              <span>LUIS EDUARDO LUSTOSA</span>
              <span>DESIGN & DEVELOPMENT</span>
              <span>BASED IN RECIFE, BR</span>
              <button className="print-physics-reset" type="button" onClick={() => lettersRef.current?.reset()}>{pt ? 'REORGANIZAR ↺' : 'RESET LETTERS ↺'}</button>
            </div>
          </div>

          <div className="print-cover-lower">
            <div className="print-cover-years">
              <span data-physics-obstacle="projects">{pt ? 'PROJETOS / PROCESSOS' : 'WORK / PROCESS'}</span>
              <strong>2024—<br/>2026</strong>
              <a href="#projects">{pt ? 'VER TRABALHOS' : 'SELECTED WORK'} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="print-cover-statement">
              <span className="print-minilabel" data-physics-obstacle="about">/ {pt ? 'SOBRE' : 'ABOUT'}</span>
              <p>{c.heroText}</p>
              <div className="print-cover-statement-links">
                <a href="#about">{pt ? 'MAIS SOBRE MIM' : 'ABOUT ME'} ↗</a>
                <a href={'mailto:' + email}>{pt ? 'CONTATO' : 'CONTACT'} ↗</a>
              </div>
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
                <div className="print-index-entry" key={project.slug}>
                <button
                  aria-expanded={expandedMobileIndex === index}
                  aria-controls={'hero-mobile-project-' + index}
                  type="button"
                  aria-pressed={selectedIndex === index}
                  className={'print-index-item' + (selectedIndex === index ? ' is-selected' : '')}
                  onFocus={event => { setSelectedIndex(index); onPreviewFocus?.(project, event) }}
                  onBlur={onPreviewLeave}
                  onMouseEnter={event => { setSelectedIndex(index); onPreviewEnter?.(project, event) }}
                  onMouseLeave={onPreviewLeave}
                  onClick={() => {
                    setSelectedIndex(index)
                    setExpandedMobileIndex(current => current === index ? null : index)
                    onPreviewLeave?.()
                  }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{project.title}<small className="index-mobile-hint">{pt ? 'VER RESUMO' : 'VIEW DETAILS'}</small></strong>
                  <span aria-hidden="true">{expandedMobileIndex === index ? '−' : '+'}</span>
                </button>
                <div id={'hero-mobile-project-' + index} className="print-index-mobile-detail" hidden={expandedMobileIndex !== index}>
                  <p>{project.description[lang]}</p>
                  <a href={'/projetos/' + project.slug} onClick={event => onOpenCase?.(event,project.slug)}>{pt ? 'ESTUDO DE CASO' : 'CASE STUDY'} ↗</a>
                </div>
                </div>
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
                <a href={'/projetos/' + selected.slug} onClick={event => onOpenCase?.(event, selected.slug)}>
                  {pt ? 'LER ESTUDO DE CASO' : 'READ CASE STUDY'} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="print-index-detail-foot">
                <span>{pt ? 'ESCOLHA UM PROJETO' : 'CHOOSE A PROJECT'}</span>
                <span>LEL © 26</span>
              </div>
            </div>
          </div>
        </div>

        <div className="print-hero-footer">
          <span>SCROLL / {pt ? 'EXPLORAR PROJETOS' : 'EXPLORE PROJECTS'}</span>
          <a href="#projects">{pt ? 'EXPLORAR PROJETOS' : 'EXPLORE SELECTED WORK'} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}

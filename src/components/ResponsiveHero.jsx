import { useState } from 'react'
import { projects } from '../data/projects.js'

/**
 * Editorial cover + interactive index.
 *
 * The cover is a document, not a splash screen: always visible, no blocking
 * animation, no decorative 3D, and no imagery in the hero.
 */
export default function ResponsiveHero({ lang, c, email }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = projects[selectedIndex]
  const pt = lang === 'pt'

  return (
    <section className="magazine-hero" id="top" aria-labelledby="hero-title">
      <div className="shell">
        <div className="magazine-topline">
          <span>LEL / {pt ? 'PORTFÓLIO' : 'PORTFOLIO'} <b>2026</b></span>
          <span>{pt ? 'UM ARQUIVO DE IDEIAS E TRABALHOS' : 'AN ARCHIVE OF IDEAS AND WORK'}</span>
          <span>RECIFE, BRASIL <span aria-hidden="true">↗</span></span>
        </div>

        <div className="magazine-cover">
          <div className="magazine-cover-overline">
            <span>01 / {pt ? 'APRESENTAÇÃO' : 'INTRODUCTION'}</span>
            <span>{pt ? 'DESIGN · CÓDIGO · FABRICAÇÃO' : 'DESIGN · CODE · MAKING'}</span>
          </div>

          <h1 className="magazine-cover-title" id="hero-title">
            <span className="magazine-name-line magazine-name-first">LUIS <small>EDUARDO</small></span>
            <span className="magazine-name-line magazine-name-last">Lustosa<span aria-hidden="true">.</span></span>
          </h1>

          <div className="magazine-cover-deck">
            <div className="magazine-cover-aside">
              <span>{pt ? 'NOTAS DE UM PROCESSO CONTÍNUO' : 'NOTES FROM AN ONGOING PROCESS'}</span>
              <span className="magazine-cover-asterisk" aria-hidden="true">✳</span>
              <span>ED. 001 / 2026</span>
            </div>

            <div className="magazine-cover-description">
              <span className="magazine-small-label">{pt ? 'SOBRE O QUE EU FAÇO' : 'ABOUT WHAT I DO'}</span>
              <p>{c.heroText}</p>
              <div className="magazine-cover-actions">
                <a href="#projects" className="magazine-link">{c.heroAction} <span aria-hidden="true">↗</span></a>
                <a href={'mailto:' + email} className="magazine-link magazine-link-secondary">{c.heroSecond} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>

        <div className="magazine-index" aria-label={pt ? 'Índice de projetos interativo' : 'Interactive project index'}>
          <div className="magazine-index-label">
            <span>02 / {pt ? 'ÍNDICE' : 'INDEX'}</span>
            <span>{pt ? 'SELEÇÃO DE PROJETOS' : 'SELECTED PROJECTS'}</span>
          </div>
          <div className="magazine-index-layout">
            <div className="magazine-index-nav" role="group" aria-label={pt ? 'Selecionar projeto' : 'Select project'}>
              {projects.map((project, index) => (
                <button
                  key={project.slug}
                  type="button"
                  onMouseEnter={() => setSelectedIndex(index)}
                  onFocus={() => setSelectedIndex(index)}
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={selectedIndex === index}
                  className={'magazine-index-row' + (index === selectedIndex ? ' is-current' : '')}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{project.title}</strong>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div className="magazine-index-preview">
              <div className="magazine-index-preview-top">
                <span>{pt ? 'EM FOCO' : 'IN FOCUS'} / {String(selectedIndex + 1).padStart(2, '0')}</span>
                <span>LEL.26</span>
              </div>
              <div className="magazine-index-preview-content" key={selected.slug}>
                <span className="magazine-small-label">{selected.category[lang]}</span>
                <h2>{selected.title}<span aria-hidden="true">.</span></h2>
                <p>{selected.description[lang]}</p>
                <a href={selected.url} target="_blank" rel="noopener noreferrer" className="magazine-index-open">
                  {pt ? 'CONHECER PROJETO' : 'VIEW PROJECT'} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="magazine-index-preview-foot">
                <span>{pt ? 'EXPLORE O ÍNDICE À ESQUERDA' : 'EXPLORE THE INDEX ON THE LEFT'}</span>
                <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="magazine-hero-end">
          <span>{pt ? 'PRÓXIMO: EXPERIMENTE ALGO' : 'NEXT: TRY SOMETHING'}</span>
          <a href="#lab">{pt ? 'IR PARA O TYPEEE' : 'GO TO TYPEEE'} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}

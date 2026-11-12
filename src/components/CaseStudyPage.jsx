import { useEffect } from 'react'
import { findCaseStudy } from '../data/caseStudies.js'

export default function CaseStudyPage({ slug, lang, onBack, onLanguageChange }) {
  const project = findCaseStudy(slug)
  const pt = lang === 'pt'
  const narrative = project?.narrative
  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('case-title')?.focus({ preventScroll: true })
  }, [slug])
  if (!project || !narrative) return (
    <main className="case-page shell">
      <h1>{pt ? 'PROJETO NÃO ENCONTRADO' : 'PROJECT NOT FOUND'}</h1>
      <a href="/#projects" onClick={onBack}>{pt ? 'VOLTAR AOS PROJETOS' : 'BACK TO PROJECTS'}</a>
    </main>
  )
  const parts = narrative[lang]
  return (
    <>
      <a className="skip-link" href="#case-main">{pt ? 'Pular para o conteúdo' : 'Skip to content'}</a>
      <header className="case-header">
        <div className="shell case-header-inner">
          <a href="/#projects" onClick={onBack}>← {pt ? 'PROJETOS' : 'PROJECTS'}</a>
          <span>LUIS EDUARDO / {pt ? 'ESTUDO DE CASO' : 'CASE STUDY'}</span>
          <button type="button" onClick={onLanguageChange} aria-label={pt ? 'Mudar para inglês' : 'Switch to Portuguese'}>{lang.toUpperCase()} ↔</button>
        </div>
      </header>
      <main className="case-page" id="case-main">
        <article className="shell">
          <div className="case-meta"><span>{project.category[lang]}</span><span>WORK / {String(projectsIndex(project.slug)+1).padStart(2,'0')}</span></div>
          <div className="case-hero">
            <h1 id="case-title" tabIndex={-1}>{project.title}<span aria-hidden="true">.</span></h1>
            <p>{project.description[lang]}</p>
          </div>
          <div className="case-cover">
            {project.image
              ? <img src={project.image} alt={pt ? 'Prévia da interface de ' + project.title : project.title + ' interface preview'} decoding="async" />
              : <div className="case-placeholder"><span>WORKSHOP / OBJECT</span><strong>3D</strong><span>{pt ? 'REGISTROS FOTOGRÁFICOS EM ORGANIZAÇÃO' : 'PHOTOS TO BE DOCUMENTED'}</span></div>}
          </div>
          <nav className="case-toc" aria-label={pt ? 'Neste estudo' : 'In this case study'}>
            <span>{pt ? 'NESTE PROJETO' : 'IN THIS PROJECT'}</span>
            <a href="#challenge">01 / {pt ? 'DESAFIO' : 'CHALLENGE'} ↓</a>
            <a href="#process">02 / {pt ? 'PROCESSO' : 'PROCESS'} ↓</a>
            <a href="#outcome">03 / {pt ? 'ENTREGA' : 'DELIVERY'} ↓</a>
          </nav>
          <section className="case-section" id="challenge" aria-labelledby="case-challenge">
            <span>01 / {pt ? 'DESAFIO' : 'CHALLENGE'}</span>
            <div>
              <h2 id="case-challenge">{pt ? 'O CONTEXTO.' : 'THE CONTEXT.'}</h2>
              <p>{parts[0][1]}</p>
              <h3>{pt ? 'MINHA ATUAÇÃO' : 'MY ROLE'}</h3>
              <p>{project.role[lang]}</p>
            </div>
          </section>
          <section className="case-section" id="process" aria-labelledby="case-process">
            <span>02 / {pt ? 'PROCESSO' : 'PROCESS'}</span>
            <div>
              <h2 id="case-process">{pt ? 'DECISÕES E CAMINHOS.' : 'DECISIONS AND PROCESS.'}</h2>
              <div className="case-steps">{parts.slice(1,3).map(([title,desc],i) => (
                <div className="case-step" key={title}>
                  <span>0{i+1}</span><h3>{title}</h3><p>{desc}</p>
                </div>
              ))}</div>
            </div>
          </section>
          <section className="case-section" id="outcome" aria-labelledby="case-outcome">
            <span>03 / {pt ? 'ENTREGA' : 'DELIVERY'}</span>
            <div>
              <h2 id="case-outcome">{pt ? 'O QUE FOI FEITO.' : 'WHAT WAS BUILT.'}</h2>
              <p>{parts[3][1]}</p>
              <h3>{pt ? 'PRÓXIMOS PASSOS' : 'NEXT STEPS'}</h3>
              <p>{narrative.next[lang]}</p>
              <p className="case-disclaimer">{pt ? 'Este estudo descreve o processo sem atribuir resultados quantitativos não verificados.' : 'This study describes the process without claiming unverified quantitative results.'}</p>
              <div className="case-actions">
                <a className="case-action-primary" href={project.url} target="_blank" rel="noopener noreferrer">{project.slug === 'monan' ? (pt ? 'VER CURRÍCULO LATTES ↗' : 'ACADEMIC PROFILE ↗') : (pt ? 'ABRIR PROJETO ↗' : 'OPEN PROJECT ↗')}</a>
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">{pt ? 'VER CÓDIGO ↗' : 'VIEW SOURCE ↗'}</a>}
              </div>
            </div>
          </section>
          <div className="case-bottom">
            <a href="/#projects" onClick={onBack}>← {pt ? 'VOLTAR À SELEÇÃO DE PROJETOS' : 'BACK TO SELECTED WORK'}</a>
            <span>LUIS EDUARDO © {new Date().getFullYear()}</span>
          </div>
        </article>
      </main>
    </>
  )
}

function projectsIndex(slug) {
  return ['typeee','zumbido','mapeia','monan'].indexOf(slug)
}

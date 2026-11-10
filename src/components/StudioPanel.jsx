import { useEffect, useState } from 'react'

const copy = {
  pt: {
    browse: 'ESCOLHA UM EXPERIMENTO',
    editorial: 'EDITORIAL',
    code: 'CÓDIGO',
    object: 'OFICINA',
    eyebrow: 'CADERNO DE EXPERIMENTOS / 001',
    editorialTitle: 'A rua também é um arquivo.',
    editorialText: 'Projetos que conectam imagem, território e interfaces digitais.',
    editorialLink: 'CONHECER O ZUMBIDO',
    codeTitle: 'Experimente antes de ler.',
    codeText: 'Uma amostra interativa do raciocínio por trás do Typeee.',
    target: 'ideias boas viram coisas reais.',
    typeLabel: 'Digite a frase acima',
    typePlaceholder: 'Comece a digitar aqui',
    typeReset: 'RECOMEÇAR',
    typeComplete: 'Concluído. Quer continuar o desafio?',
    typeProgress: 'PRECISÃO',
    typeOpen: 'JOGAR TYPEEE',
    objectTitle: 'Da ideia ao objeto.',
    objectText: 'Um estudo de volume em linhas. Em breve, modelos dos protótipos reais.',
    objectAlt: 'Desenho esquemático ilustrativo de uma peça geométrica tridimensional.',
    objectButton: 'ALTERAR VISTA',
    objectView: 'VISTA',
    objectCaption: 'ESTUDO VISUAL, NÃO É UM MODELO DE PROJETO REAL',
    foot: 'UMA PRÉVIA DO MEU PROCESSO',
    footEnd: 'DESIGN / CÓDIGO / MATÉRIA'
  },
  en: {
    browse: 'PICK AN EXPERIMENT',
    editorial: 'EDITORIAL',
    code: 'CODE',
    object: 'WORKSHOP',
    eyebrow: 'EXPERIMENT NOTEBOOK / 001',
    editorialTitle: 'The street is an archive, too.',
    editorialText: 'Projects connecting images, territory, and digital interfaces.',
    editorialLink: 'VISIT ZUMBIDO',
    codeTitle: 'Try it before reading about it.',
    codeText: 'An interactive taste of the ideas behind Typeee.',
    target: 'good ideas become real things.',
    typeLabel: 'Type the sentence above',
    typePlaceholder: 'Start typing here',
    typeReset: 'RESTART',
    typeComplete: 'Completed. Want to keep going?',
    typeProgress: 'ACCURACY',
    typeOpen: 'PLAY TYPEEE',
    objectTitle: 'From idea to object.',
    objectText: 'An exploration of volume through lines. Real prototype models to come.',
    objectAlt: 'Illustrative schematic drawing of a three-dimensional geometric object.',
    objectButton: 'CHANGE VIEW',
    objectView: 'VIEW',
    objectCaption: 'VISUAL STUDY, NOT AN ACTUAL PROJECT MODEL',
    foot: 'A PREVIEW OF MY PROCESS',
    footEnd: 'DESIGN / CODE / MATERIAL'
  }
}

const modes = [
  { id: 'editorial', index: '01', key: 'editorial' },
  { id: 'code', index: '02', key: 'code' },
  { id: 'object', index: '03', key: 'object' }
]

export default function StudioPanel({ lang }) {
  const [active, setActive] = useState('editorial')
  const [typed, setTyped] = useState('')
  const [view, setView] = useState(0)
  const c = copy[lang] || copy.pt
  const target = Array.from(c.target)
  const entered = Array.from(typed)
  const correct = entered.reduce((sum, letter, index) => sum + (letter === target[index] ? 1 : 0), 0)
  const accuracy = entered.length ? Math.round(correct / entered.length * 100) : 100
  const completed = typed === c.target

  useEffect(() => setTyped(''), [lang])

  return (
    <div className="studio" aria-label={lang === 'pt' ? 'Laboratório interativo' : 'Interactive studio'}>
      <div className="studio-heading">
        <span>{c.eyebrow}</span>
        <span className="studio-live"><span aria-hidden="true" /> LIVE STUDIES</span>
      </div>

      <div className="studio-controls" role="group" aria-label={c.browse}>
        {modes.map(mode => (
          <button
            type="button"
            key={mode.id}
            className={'studio-switch' + (active === mode.id ? ' is-current' : '')}
            aria-pressed={active === mode.id}
            onClick={() => setActive(mode.id)}
          >
            <span>{mode.index}</span>{c[mode.key]}
          </button>
        ))}
      </div>

      <div className={'studio-stage studio-stage-' + active}>
        {active === 'editorial' && (
          <div className="studio-editorial">
            <div className="studio-photo-primary">
              <img src="/projects/zumbido.png" alt={lang === 'pt' ? 'Prévia visual do arquivo Zumbido' : 'Visual preview of the Zumbido archive'} />
              <span>01 / ZUMBIDO.CC</span>
            </div>
            <div className="studio-photo-secondary">
              <img src="/projects/mapeia.jpg" alt={lang === 'pt' ? 'Prévia da interface do Mapeia' : 'Preview of the Mapeia interface'} />
              <span>02 / MAPEIA</span>
            </div>
            <div className="studio-stage-copy">
              <span className="studio-index">DESIGN / 001</span>
              <strong>{c.editorialTitle}</strong>
              <p>{c.editorialText}</p>
              <a href="https://zumbido.cc" target="_blank" rel="noopener noreferrer">{c.editorialLink} ↗</a>
            </div>
          </div>
        )}

        {active === 'code' && (
          <div className="studio-code">
            <div className="studio-stage-copy">
              <span className="studio-index">CODE / 002</span>
              <strong>{c.codeTitle}</strong>
              <p>{c.codeText}</p>
            </div>
            <div className="studio-type">
              <div className="studio-type-header"><span>TYPEEE / INPUT TEST</span><span>⌨ 001</span></div>
              <p className="studio-type-target" aria-label={c.target}>
                {target.map((letter, index) => (
                  <span
                    aria-hidden="true"
                    key={index}
                    className={index < entered.length ? (letter === entered[index] ? 'is-correct' : 'is-error') : ''}
                  >{letter}</span>
                ))}
              </p>
              <label htmlFor="studio-typing">{c.typeLabel}</label>
              <input
                id="studio-typing"
                type="text"
                value={typed}
                maxLength={target.length}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={c.typePlaceholder}
                onChange={(event) => setTyped(event.target.value)}
              />
              <div className="studio-progress" role="progressbar" aria-label={c.typeLabel} aria-valuemin={0} aria-valuemax={target.length} aria-valuenow={entered.length}>
                <span style={{ width: (entered.length / target.length * 100) + '%' }} />
              </div>
              <div className="studio-type-footer">
                <span>{c.typeProgress}: {accuracy}%</span>
                <button type="button" onClick={() => setTyped('')}>{c.typeReset} ↺</button>
              </div>
              {completed && <p className="studio-type-done" role="status">{c.typeComplete}</p>}
              <a className="studio-type-link" href="https://typeee.quest" target="_blank" rel="noopener noreferrer">{c.typeOpen} ↗</a>
            </div>
          </div>
        )}

        {active === 'object' && (
          <div className="studio-object">
            <div className="studio-stage-copy">
              <span className="studio-index">VOLUME / 003</span>
              <strong>{c.objectTitle}</strong>
              <p>{c.objectText}</p>
              <button type="button" className="studio-view-button" onClick={() => setView((previous) => (previous + 1) % 3)}>
                {c.objectButton} ↻
              </button>
            </div>
            <div className="studio-blueprint">
              <div className="studio-blueprint-top"><span>FIG. 003 / WIREFRAME</span><span>{c.objectView} 0{view + 1}/03</span></div>
              <svg viewBox="0 0 500 320" className={'studio-wireframe view-' + view} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={c.objectAlt}>
                <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4">
                  <path d="M250 43 387 120 250 198 113 120Z M113 120V234L250 310 387 234V120 M250 198V310" />
                  <path d="M250 43V160L113 234 M250 160 387 234 M250 160V310" opacity=".28" strokeDasharray="4 7" />
                  <path d="M250 43V12 M387 120H445 M113 234H59 M250 310V320" opacity=".55" />
                  <circle cx="250" cy="43" r="4" fill="currentColor" />
                  <circle cx="387" cy="120" r="4" fill="currentColor" />
                  <circle cx="113" cy="234" r="4" fill="currentColor" />
                </g>
                <g fill="currentColor" fontSize="10" fontFamily="monospace">
                  <text x="259" y="23">A</text><text x="453" y="124">B</text><text x="39" y="237">C</text>
                </g>
              </svg>
              <span className="studio-blueprint-note">{c.objectCaption}</span>
            </div>
          </div>
        )}
      </div>

      <div className="studio-foot">
        <span>{c.foot}</span><span>{c.footEnd}</span>
      </div>
    </div>
  )
}

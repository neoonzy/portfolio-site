import { useEffect, useMemo, useRef, useState } from 'react'
import { projects } from './data/projects.js'
import { caseStudies } from './data/caseStudies.js'
import { normalizeQuery } from './lib/searchPortfolio.js'
import KineticWordmark from './components/KineticWordmark.jsx'
import StudioPanel from './components/StudioPanel.jsx'
import CaseStudyPage from './components/CaseStudyPage.jsx'

const stations = [
  { id: 'entrada', pt: 'ENTRADA', en: 'ENTER', symbol: '00' },
  { id: 'obras', pt: 'OBRAS', en: 'WORK', symbol: '01' },
  { id: 'metodo', pt: 'OFICINA', en: 'STUDIO', symbol: '02' },
  { id: 'constelacao', pt: 'ATLAS', en: 'ATLAS', symbol: '03' },
  { id: 'contato', pt: 'CONTATO', en: 'CONTACT', symbol: '04' },
]
const pathCase = () => window.location.pathname.match(/^\/projetos\/([a-z0-9-]+)\/?$/)?.[1] || null
const fromHash = () => stations.findIndex(s => s.id === window.location.hash.replace('#', ''))
const order = ['typeee', 'zumbido', 'mapeia', 'monan']
const accents = { typeee: '#d3ff50', zumbido: '#fe642d', mapeia: '#6c8dfa', monan: '#e9a5ca' }
const translations = {
  pt: {
    about: 'Interface, objeto, rua.', manifesto: 'Trabalho entre o digital e o físico. Programo, desenho e experimento para dar forma a ideias que possam existir fora da tela.',
    explore: 'ENTRAR NO ARQUIVO', touch: 'TOQUE NAS PEÇAS', drag: 'ARRASTE AS PEÇAS', reset: 'REORGANIZAR',
    select: 'ESCOLHA UM TRABALHO', project: 'OBRA SELECIONADA', projectView: 'ABRIR ESTUDO DE CASO', live: 'VISITAR PROJETO',
    atlas: 'UM TRABALHO, MUITAS LINGUAGENS', workshop: 'DA IDEIA AO OBJETO',
    contact: 'TEM ALGUMA COISA EM MENTE?', contactBig: 'BORA\nFAZER.', email: 'ESCREVER UM E-MAIL',
    shift: 'MUDE DE ESTAÇÃO', keyboard: 'TECLAS 1—5 / NAVEGAR', index: 'MAPA DO SITE', search: 'BUSCAR',
    close: 'FECHAR', menu: 'ABRIR MAPA', first: 'VOLTA À ENTRADA', next: 'PRÓXIMA ESTAÇÃO',
    note: 'Um portfólio para tocar, explorar e descobrir. Sem percurso obrigatório.',
    enter: 'ENTRAR', result: 'PROJETOS', notFound: 'NENHUM RESULTADO',
    locality: 'RECIFE / BRASIL', caseStudy: 'ESTUDO DE CASO', coming: 'REGISTROS EM PREPARAÇÃO',
    projectShort: 'Trabalhos digitais, cultura ciclista, cidade e fabricação.',
    workshopShort: 'Maneiras de pensar, prototipar e colocar a mão na massa.',
    spaceShort: 'Não cabe tudo em uma categoria. Explore as conexões.',
    aboutFoot: 'Luis Eduardo Lustosa • Sistemas de Informação / UFPE',
  },
  en: {
    about: 'Interfaces, objects, streets.', manifesto: 'I work between the digital and the physical. I code, design and experiment to give shape to ideas that can exist beyond screens.',
    explore: 'ENTER THE ARCHIVE', touch: 'TOUCH THE PIECES', drag: 'DRAG THE PIECES', reset: 'RESET LETTERS',
    select: 'CHOOSE A WORK', project: 'SELECTED WORK', projectView: 'OPEN CASE STUDY', live: 'VISIT PROJECT',
    atlas: 'ONE PRACTICE, MANY LANGUAGES', workshop: 'FROM IDEA TO OBJECT',
    contact: 'GOT SOMETHING IN MIND?', contactBig: 'LET’S\nMAKE.', email: 'SEND AN EMAIL',
    shift: 'CHANGE STATION', keyboard: 'KEYS 1—5 / NAVIGATE', index: 'SITE MAP', search: 'SEARCH',
    close: 'CLOSE', menu: 'OPEN MAP', first: 'BACK TO ENTRY', next: 'NEXT STATION',
    note: 'A portfolio to touch, explore and discover. No required itinerary.',
    enter: 'ENTER', result: 'PROJECTS', notFound: 'NO RESULTS',
    locality: 'RECIFE / BRAZIL', caseStudy: 'CASE STUDY', coming: 'DOCUMENTATION IN PROGRESS',
    projectShort: 'Digital work, cycling culture, urban space and fabrication.',
    workshopShort: 'How I think, prototype and get my hands dirty.',
    spaceShort: 'My work doesn’t fit in just one box. Trace the connections.',
    aboutFoot: 'Luis Eduardo Lustosa • Information Systems / UFPE',
  },
}

const atlasItems = [
  { id: 'codigo', pt: 'CÓDIGO', en: 'CODE', project: 'typeee', pos: 0, ptText: 'Interfaces que reagem, sistemas que funcionam. Do primeiro protótipo ao produto.', enText: 'Interfaces that respond, systems that work. From early prototypes to real products.' },
  { id: 'rua', pt: 'RUA', en: 'STREET', project: 'zumbido', pos: 1, ptText: 'A cidade como lugar de encontro, deslocamento e cultura. A bicicleta como ponto de partida.', enText: 'The city as a place to meet, move and make culture. The bicycle as a starting point.' },
  { id: 'objeto', pt: 'OBJETO', en: 'OBJECT', project: 'monan', pos: 2, ptText: 'O trabalho continua quando sai da tela: modelagem, impressão e experimentação material.', enText: 'Work continues beyond screens: modeling, printing and material experiments.' },
  { id: 'cidade', pt: 'CIDADE', en: 'CITY', project: 'mapeia', pos: 3, ptText: 'Interfaces como ferramentas para olhar, questionar e compreender o espaço urbano.', enText: 'Interfaces as tools to examine, question and understand urban space.' },
]
const processItems = [
  { symbol: 'A', pt: 'PERGUNTAR', en: 'QUESTION', project: 'mapeia', ptText: 'Que problema vale ser resolvido? Começo observando o que acontece na rua e nos sistemas.', enText: 'Which problem deserves solving? I start by observing streets and systems.' },
  { symbol: 'B', pt: 'DESENHAR', en: 'DESIGN', project: 'zumbido', ptText: 'Organizo ideias em hierarquias, fluxos e linguagem visual — com espaço para o inesperado.', enText: 'I organize ideas into flows, hierarchies and visual language, leaving space for surprise.' },
  { symbol: 'C', pt: 'CONSTRUIR', en: 'BUILD', project: 'monan', ptText: 'Código, impressão 3D, protótipos e teste. Fazer é parte de pensar.', enText: 'Code, 3D printing, prototypes and testing. Making is part of thinking.' },
  { symbol: 'D', pt: 'EXPERIMENTAR', en: 'EXPERIMENT', project: 'typeee', ptText: 'Uma ideia só começa a existir quando alguém usa, experimenta e encontra seus limites.', enText: 'An idea starts existing when someone uses it, experiments and discovers its limits.' },
]
function safeAction(event) { return !(event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) }

function PointerPrint({ project, n, onOpen }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)
  const suppress = useRef(false)
  const onDown = event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
    if (event.button !== 0) return
    dragRef.current = { x: event.clientX, y: event.clientY, dx: offset.x, dy: offset.y, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onMove = event => {
    const a = dragRef.current
    if (!a) return
    const dx = event.clientX - a.x, dy = event.clientY - a.y
    if (Math.hypot(dx, dy) > 7) a.moved = true
    setOffset({ x: Math.max(-90, Math.min(90, a.dx + dx)), y: Math.max(-90, Math.min(90, a.dy + dy)) })
  }
  const onUp = () => { suppress.current = Boolean(dragRef.current?.moved); dragRef.current = null }
  const click = () => { if (suppress.current) { suppress.current = false; return } onOpen(project.slug) }
  return <button type="button" className={'ex-print ex-print-' + n} onClick={click} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} style={{ '--mx': `${offset.x}px`, '--my': `${offset.y}px` }} aria-label={'Abrir ' + project.title}>
    <span className="ex-print-meta"><span>{String(n).padStart(2, '0')} / 04</span><span>LE — 26</span></span>
    <span className="ex-print-image">{project.image ? <img src={project.image} alt="" draggable="false" /> : <span>3D.</span>}</span>
    <span className="ex-print-caption"><strong>{project.title}</strong><span>↗</span></span>
  </button>
}

function Entrance({ lang, t, onChange, onProject }) {
  const wordmarkRef = useRef(null)
  return <div className="ex-entrance ex-scene" id="entrada">
    <div className="ex-entrance-mark"><span>LE — EST. 2006</span><span>{t.locality} / 08°S</span></div>
    <div className="ex-cover">
      <section className="print-hero ex-physics" aria-label="LUIS EDUARDO">
        <div className="print-cover ex-letter-field">
          <div className="ex-wordmark"><KineticWordmark ref={wordmarkRef} lang={lang} /></div>
          <div className="ex-letter-obstacles"><span data-physics-obstacle="projects">PROJETOS / PROCESSOS</span><span data-physics-obstacle="about">/ SOBRE</span></div>
          <button type="button" className="ex-letters-reset" onClick={() => wordmarkRef.current?.reset()}>{t.reset} ↺</button>
        </div>
        <div className="print-index ex-floor" aria-hidden="true" />
      </section>
      <div className="ex-hero-collage" aria-label={lang === 'pt' ? 'Fragmentos de projetos' : 'Project fragments'}>
        <div className="ex-collage-caption">{lang === 'pt' ? 'OBJETOS PARA EXPLORAR' : 'OBJECTS TO EXPLORE'} <span>↘</span></div>
        <PointerPrint project={projects[1]} n={1} onOpen={onProject} />
        <PointerPrint project={projects[0]} n={2} onOpen={onProject} />
        <PointerPrint project={projects[2]} n={3} onOpen={onProject} />
        <span className="ex-collage-bottom">{t.drag} / {t.touch}</span>
      </div>
    </div>
    <div className="ex-entrance-bottom">
      <div className="ex-statement"><span>DESIGN / CÓDIGO / OFICINA / RUA</span><p>{t.manifesto}</p></div>
      <button type="button" className="ex-enter-btn" onClick={() => onChange(1)}><span>{t.explore}</span><span aria-hidden="true">↗</span></button>
    </div>
  </div>
}

function Works({ lang, t, selected, onSelect, onCase }) {
  const work = projects[selected]
  const ref = caseStudies.find(c => c.slug === work.slug)
  const increment = d => onSelect((selected + d + projects.length) % projects.length)
  const start = useRef(null)
  return <div className="ex-work ex-scene" id="obras" style={{ '--work-accent': accents[work.slug] }}>
    <header className="ex-work-header"><span>01 / {t.result}</span><span>2024—2026</span><span>04 {lang === 'pt' ? 'ARQUIVOS' : 'FILES'}</span></header>
    <div className="ex-work-content">
      <div className="ex-work-selector"><span className="ex-overline">{t.select}</span>
        <div className="ex-work-names" role="group" aria-label={t.select}>{projects.map((p,i)=><button type="button" key={p.slug} className={i===selected?'selected':''} aria-pressed={i===selected} onClick={() => onSelect(i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{p.title}</strong><span aria-hidden="true">{i===selected?'●':'↗'}</span></button>)}</div>
        <div className="ex-work-controls"><button type="button" onClick={()=>increment(-1)} aria-label={lang==='pt'?'Projeto anterior':'Previous project'}>←</button><span>{selected+1} / 04</span><button type="button" onClick={()=>increment(1)} aria-label={lang==='pt'?'Próximo projeto':'Next project'}>→</button></div>
      </div>
      <div className="ex-work-object" onTouchStart={e=>{start.current=e.touches[0]?.clientX}} onTouchEnd={e=>{if(start.current==null)return;const delta=e.changedTouches[0]?.clientX-start.current; if(Math.abs(delta)>55) increment(delta<0?1:-1);start.current=null}}>
        <div className="ex-work-object-top"><span>ARQUIVO N° {String(selected+1).padStart(2,'0')}</span><span>Ⓛ E ↗</span></div>
        <div className="ex-work-object-image" key={work.slug}>{work.image?<img src={work.image} alt={lang==='pt'?'Imagem do projeto '+work.title:'Image of '+work.title} decoding="async" />:<div className="ex-work-blank"><span>{t.coming}</span><b>3D</b></div>}</div>
        <div className="ex-work-object-bottom"><strong>{work.title}</strong><span>{work.tags.join(' / ')}</span></div>
      </div>
      <aside className="ex-work-info" aria-live="polite"><span className="ex-overline">{t.project} / {String(selected+1).padStart(2,'0')}</span><h2>{work.title}<span>.</span></h2><span className="ex-work-category">{work.category[lang]}</span><p>{work.description[lang]}</p><span className="ex-work-role">{work.role[lang]}</span>
        <div className="ex-work-info-actions"><a href={'/projetos/'+work.slug} onClick={e=>onCase(e,work.slug)}>{t.projectView} ↗</a><a href={work.url} target="_blank" rel="noopener noreferrer">{work.slug==='monan'?'LATTES ↗':t.live+' ↗'}</a></div>
        <div className="ex-work-annotation">{ref?.narrative?.[lang]?.[0]?.[1] || t.projectShort}</div>
      </aside>
    </div>
    <div className="ex-scene-bottom"><span>↔ {lang === 'pt' ? 'ESCOLHA / DESLIZE' : 'SELECT / SWIPE'}</span><span>LUIS EDUARDO / PORTFÓLIO</span></div>
  </div>
}

function Workshop({ lang, t, stage, setStage, onCase }) {
  const item = processItems[stage]
  const linked = projects.find(p=>p.slug===item.project)
  return <div className="ex-workshop ex-scene" id="metodo">
    <header className="ex-scene-label"><span>02 / {lang==='pt'?'OFICINA ABERTA':'OPEN STUDIO'}</span><span>WORK IN PROCESS</span></header>
    <div className="ex-method-hero"><h1>{t.workshop}<span aria-hidden="true">*</span></h1><p>{t.workshopShort}</p></div>
    <div className="ex-conveyor" role="group" aria-label={t.workshop}>{processItems.map((x,i)=><button type="button" key={x.symbol} aria-pressed={stage===i} className={stage===i?'active':''} onClick={()=>setStage(i)}><span>{x.symbol}</span><strong>{x[lang]}</strong><span aria-hidden="true">↗</span></button>)}</div>
    <div className="ex-method-body"><div className="ex-method-number">{item.symbol}<span> / 04</span></div><div className="ex-method-copy"><span>{lang==='pt'?'ETAPA DO PROCESSO':'PROCESS STEP'}</span><h2>{item[lang]}</h2><p>{lang==='pt'?item.ptText:item.enText}</p><button type="button" onClick={()=>onCase(null,linked.slug)}>{lang==='pt'?'EXEMPLO EM':'SEE IT IN'} {linked.title} ↗</button></div><div className="ex-method-media">{linked.image?<img src={linked.image} alt="" loading="lazy" />:<span>3D / {t.coming}</span>}</div></div>
    <details className="ex-demo"><summary><span>▣ {lang==='pt'?'PROTÓTIPO PARA EXPERIMENTAR':'AN INTERACTIVE PROTOTYPE'}</span><strong>TYPEEE / RUN ↗</strong></summary><div className="ex-demo-body"><StudioPanel lang={lang} /></div></details>
    <div className="ex-scene-bottom"><span>PROCESSO NÃO É LINHA RETA.</span><span>LE / CADERNO 02</span></div>
  </div>
}

function Atlas({ lang, t, active, setActive, onProject }) {
  const item=atlasItems[active]
  const project=projects.find(p=>p.slug===item.project)
  return <div className="ex-atlas ex-scene" id="constelacao">
    <header className="ex-scene-label"><span>03 / ATLAS DE INTERESSES</span><span>4 CAMINHOS / 1 PRÁTICA</span></header>
    <div className="ex-atlas-top"><h1>{t.atlas}<span>.</span></h1><p>{t.spaceShort}</p></div>
    <div className="ex-atlas-field"><svg viewBox="0 0 1000 550" preserveAspectRatio="none" aria-hidden="true"><path d="M170 155 L760 105 L640 425 L330 400 Z M170 155 L640 425 M760 105 L330 400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8"/><circle cx="500" cy="280" r="60" fill="none" stroke="currentColor" strokeWidth="1"/></svg><div className="ex-atlas-center">LE<br/><span>°</span></div>{atlasItems.map((x,i)=><button className={'ex-atlas-node ex-atlas-node-'+i+(active===i?' current':'')} key={x.id} onClick={()=>setActive(i)} aria-pressed={active===i}><span>0{i+1}</span><strong>{x[lang]}</strong><span aria-hidden="true">↗</span></button>)}</div>
    <div className="ex-atlas-caption" aria-live="polite"><div><span>{lang==='pt'?'EM FOCO':'IN FOCUS'} / 0{active+1}</span><h2>{item[lang]}</h2></div><p>{lang==='pt'?item.ptText:item.enText}</p><button type="button" onClick={()=>onProject(project.slug)}>{lang==='pt'?'EXPLORAR':'EXPLORE'} {project.title} ↗</button></div>
    <div className="ex-scene-bottom"><span>RECIFE / CURIMATÁ / EM MOVIMENTO</span><span>LE / MAPA 03</span></div>
  </div>
}

function Contact({ lang, t, onChange }) {
  return <div className="ex-contact ex-scene" id="contato">
    <header className="ex-scene-label"><span>04 / CONTACT — 2026</span><span>{t.locality}</span></header>
    <div className="ex-contact-main"><p>{t.contact}</p><h1>{t.contactBig.split('\n').map(line=><span key={line}>{line}</span>)}</h1><div className="ex-contact-actions"><a href="mailto:luiseduardolustosabrito@gmail.com" className="ex-contact-primary">{t.email} <span>↗</span></a><a href="https://github.com/neoonzy" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.behance.net/lustosabr" target="_blank" rel="noopener noreferrer">BEHANCE ↗</a><a href="http://lattes.cnpq.br/2980803847545519" target="_blank" rel="noopener noreferrer">LATTES ↗</a></div></div>
    <div className="ex-contact-footer"><span>{t.aboutFoot}</span><button type="button" onClick={()=>onChange(0)}>{t.first} ↖</button><span>© 2026</span></div>
  </div>
}

function SiteMap({ lang, t, onGo, onClose }) {
  return <div className="ex-sitemap" role="dialog" aria-modal="true" aria-label={t.index}>
    <div className="ex-map-header"><span>LE — 26 / {t.index}</span><button onClick={onClose} aria-label={t.close}>{t.close} ×</button></div>
    <div className="ex-map-title">ESCOLHA<br/><em>UM CAMINHO.</em></div>
    <div className="ex-map-links">{stations.map((x,i)=><button key={x.id} onClick={()=>onGo(i)}><span>{x.symbol}</span><strong>{x[lang]}</strong><span>↗</span></button>)}</div>
    <div className="ex-map-foot">{t.note}</div>
  </div>
}

function Search({ lang, t, onClose, onGo, onCase }) {
  const [query,setQuery]=useState('')
  const input=useRef(null)
  useEffect(()=>{input.current?.focus()},[])
  const q=normalizeQuery(query)
  const matchingStations=stations.map((v,i)=>({...v,i})).filter(x=>normalizeQuery(x[lang]+' '+x.id).includes(q))
  const matchingProjects=q?projects.filter(p=>normalizeQuery([p.title,p.category[lang],p.description[lang],p.tags.join(' ')].join(' ')).includes(q)):[]
  return <div className="ex-search-layer" role="dialog" aria-modal="true" aria-label={t.search}>
    <div className="ex-map-header"><span>/ {t.search}</span><button type="button" onClick={onClose}>{t.close} ×</button></div>
    <label htmlFor="ex-search-input">{lang==='pt'?'PROCURAR ESTAÇÃO, PROJETO OU FERRAMENTA':'FIND A STATION, PROJECT OR TOOL'}</label>
    <input id="ex-search-input" ref={input} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={lang==='pt'?'Ex.: Typeee, rua, código…':'E.g. Typeee, street, code…'} autoComplete="off" />
    <div className="ex-search-results">{matchingStations.map(x=><button type="button" onClick={()=>onGo(x.i)} key={x.id}><span>ESTAÇÃO</span><strong>{x[lang]}</strong><span>↗</span></button>)}{matchingProjects.map(x=><button type="button" onClick={()=>onCase(null,x.slug)} key={x.slug}><span>OBRA</span><strong>{x.title}</strong><span>↗</span></button>)}{!(matchingStations.length||matchingProjects.length)&&<p role="status">{t.notFound}</p>}</div>
  </div>
}

export default function ExhibitionApp() {
  const [lang,setLang]=useState(()=>localStorage.getItem('luis-portfolio-language')==='en'?'en':'pt')
  const [station,setStation]=useState(()=>Math.max(0,fromHash()))
  const [currentCase,setCurrentCase]=useState(pathCase)
  const [selected,setSelected]=useState(0)
  const [step,setStep]=useState(0)
  const [atlas,setAtlas]=useState(0)
  const [overlay,setOverlay]=useState(null)
  const mainRef=useRef(null)
  const t=translations[lang]
  useEffect(()=>{
    document.documentElement.lang=lang==='pt'?'pt-BR':'en'
    localStorage.setItem('luis-portfolio-language',lang)
    document.title=currentCase?`${projects.find(x=>x.slug===currentCase)?.title||'Projeto'} — Luis Eduardo Lustosa`:'Luis Eduardo Lustosa — Arquivo Vivo'
  },[lang,currentCase])
  useEffect(()=>{
    const sync=()=>{setCurrentCase(pathCase());const next=fromHash(); if(next>=0)setStation(next)}
    window.addEventListener('popstate',sync)
    window.addEventListener('hashchange',sync)
    return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync)}
  },[])
  const go = index => {
    const next=Math.max(0,Math.min(stations.length-1,index))
    setOverlay(null);setCurrentCase(null);setStation(next)
    window.history.pushState({station:next},'',`/#${stations[next].id}`)
    window.scrollTo({top:0,behavior:'instant'})
    window.requestAnimationFrame(()=>{const heading=mainRef.current?.querySelector('h1')||mainRef.current; heading?.focus?.({preventScroll:true})})
  }
  const openProject=(event,slug)=>{
    if(event && !safeAction(event))return
    event?.preventDefault()
    setOverlay(null);setCurrentCase(slug)
    window.history.pushState({slug},'',`/projetos/${slug}`)
  }
  const backProject=event=>{
    if(event&&!safeAction(event))return
    event?.preventDefault()
    setCurrentCase(null);setStation(1)
    window.history.pushState({station:1},'','/#obras')
    window.scrollTo({top:0,behavior:'instant'})
  }
  useEffect(()=>{
    const onKey=event=>{
      const tag=event.target?.tagName
      if(event.ctrlKey||event.altKey||event.metaKey||event.target?.isContentEditable||['INPUT','SELECT','TEXTAREA'].includes(tag))return
      if(event.key==='Escape'){setOverlay(null);return}
      if(currentCase)return
      if(event.key==='/'&&!overlay){event.preventDefault();setOverlay('search');return}
      if(overlay)return
      if(/^[1-5]$/.test(event.key)){event.preventDefault();go(Number(event.key)-1)}
      if(event.key==='ArrowRight'&&station===1){event.preventDefault();setSelected(v=>(v+1)%4)}
      if(event.key==='ArrowLeft'&&station===1){event.preventDefault();setSelected(v=>(v+3)%4)}
    }
    window.addEventListener('keydown',onKey)
    return()=>window.removeEventListener('keydown',onKey)
  },[currentCase,overlay,station])
  useEffect(()=>{
    if(!overlay)return
    const prior=document.activeElement
    const key=event=>{if(event.key==='Escape')setOverlay(null)}
    document.addEventListener('keydown',key)
    document.body.style.overflow='hidden'
    return()=>{document.removeEventListener('keydown',key);document.body.style.overflow='';prior?.focus?.()}
  },[overlay])
  const changeLang=()=>setLang(v=>v==='pt'?'en':'pt')
  if(currentCase)return <CaseStudyPage slug={currentCase} lang={lang} onBack={backProject} onLanguageChange={changeLang}/>
  return <div className={'exhibit ex-station-'+station}>
    <a className="ex-skip" href="#ex-main">{lang==='pt'?'PULAR PARA CONTEÚDO':'SKIP TO CONTENT'}</a>
    <header className="ex-header">
      <button type="button" className="ex-brand" onClick={()=>go(0)} aria-label="Luis Eduardo — início"><strong>LE<span>°</span></strong><small>EST. 2006<br/>RECIFE / BR</small></button>
      <div className="ex-header-center"><span>{stations[station][lang]}</span><span>—</span><span>{String(station+1).padStart(2,'0')}/05</span></div>
      <div className="ex-header-actions"><button type="button" onClick={()=>setOverlay('search')}>/ {t.search}</button><button type="button" onClick={changeLang} aria-label={lang==='pt'?'Switch to English':'Mudar para português'}>{lang.toUpperCase()} ↔</button><button type="button" className="ex-menu-button" onClick={()=>setOverlay('map')} aria-label={t.menu}>☷ <span>{t.index}</span></button></div>
    </header>
    <nav className="ex-rail" aria-label={t.shift}>{stations.map((x,i)=><button key={x.id} type="button" onClick={()=>go(i)} aria-current={station===i?'page':undefined} className={station===i?'active':''}><span>{x.symbol}</span><span>{x[lang]}</span><i aria-hidden="true"/></button>)}</nav>
    <main id="ex-main" className="ex-main" key={station} ref={mainRef} tabIndex={-1}>
      {station===0&&<Entrance lang={lang} t={t} onChange={go} onProject={slug=>openProject(null,slug)}/>}
      {station===1&&<Works lang={lang} t={t} selected={selected} onSelect={setSelected} onCase={openProject}/>}
      {station===2&&<Workshop lang={lang} t={t} stage={step} setStage={setStep} onCase={openProject}/>}
      {station===3&&<Atlas lang={lang} t={t} active={atlas} setActive={setAtlas} onProject={slug=>openProject(null,slug)}/>}
      {station===4&&<Contact lang={lang} t={t} onChange={go}/>}
    </main>
    <footer className="ex-bottom-dock"><span>{t.keyboard}</span><div className="ex-bottom-pips">{stations.map((x,i)=><button type="button" key={x.id} aria-label={`${x.symbol} ${x[lang]}`} aria-current={station===i?'page':undefined} onClick={()=>go(i)}><span/></button>)}</div><button type="button" onClick={()=>go((station+1)%5)}>{station===4?t.first:t.next} <span aria-hidden="true">→</span></button></footer>
    {overlay&&<div className="ex-overlay" onClick={event=>{if(event.target===event.currentTarget)setOverlay(null)}}>{overlay==='map'?<SiteMap lang={lang} t={t} onGo={go} onClose={()=>setOverlay(null)}/>:<Search lang={lang} t={t} onClose={()=>setOverlay(null)} onGo={go} onCase={openProject}/>}</div>}
  </div>
}
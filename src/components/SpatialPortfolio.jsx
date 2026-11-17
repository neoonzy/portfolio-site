import { useEffect, useRef, useState } from 'react'
import { projects, visualProjects } from '../data/projects.js'
import StudioPanel from './StudioPanel.jsx'
import KineticWordmark from './KineticWordmark.jsx'

const email = 'luiseduardolustosab@gmail.com'
const channels = [
  { name: 'GITHUB', href: 'https://github.com/neoonzy' },
  { name: 'BEHANCE', href: 'https://www.behance.net/lustosabr' },
  { name: 'INSTAGRAM', href: 'https://www.instagram.com/neoonzy/' },
  { name: 'LATTES', href: 'http://lattes.cnpq.br/2980803847545519' },
]
const rooms = [
  { key: 'entrada', pt: 'ENTRADA', en: 'ENTRY', label: '00' },
  { key: 'arquivo', pt: 'TRABALHOS', en: 'WORK', label: '01' },
  { key: 'laboratorio', pt: 'LABORATÓRIO', en: 'LAB', label: '02' },
  { key: 'caderno', pt: 'CADERNO', en: 'NOTEBOOK', label: '03' },
  { key: 'pessoa', pt: 'PESSOA', en: 'ABOUT', label: '04' },
  { key: 'contato', pt: 'CONTATO', en: 'CONTACT', label: '05' },
]
const aliases = { projects: 'arquivo', about: 'pessoa', notes: 'caderno', lab: 'laboratorio', top: 'entrada', contact: 'contato', experience: 'pessoa', gallery: 'arquivo' }
const findRoom = () => {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  if (hash.startsWith('work-')) return 'arquivo'
  return rooms.some(room => room.key === hash) ? hash : aliases[hash] || 'entrada'
}
const findWork = () => {
  const slug = window.location.hash.slice(6)
  return projects.find(project => project.slug === slug)?.slug || null
}
const copy = {
  pt: {
    skip: 'Pular para o conteúdo', index:'MAPA DO SITE', close:'FECHAR', map:'MAPA / 06 SALAS',
    intro:'DESENHO INTERFACES, ESCREVO CÓDIGO E CONSTRUO COISAS.',
    note:'Um portfólio para explorar, não apenas rolar. Comece por onde quiser.',
    discover:'ABRIR ARQUIVO', drag:'MOVA AS LETRAS COM O MOUSE', reset:'REORGANIZAR',
    feature:'OBJETO EM DESTAQUE', process:'DESIGN / CÓDIGO / OFICINA',
    entryLabel:'ARQUIVO PESSOAL DE PROJETOS E PROCESSOS',
    archiveLead:'PROJETOS EM MOVIMENTO.',
    archiveHelp:'ESCOLHA UMA PEÇA. NO DESKTOP, VOCÊ TAMBÉM PODE ARRASTÁ-LA.',
    inspect:'FICHA DA PEÇA', number:'Nº', role:'MINHA ATUAÇÃO', materials:'MATERIAIS', launch:'ABRIR PROJETO',
    source:'VER CÓDIGO', clear:'VER OUTRA PEÇA', noImage:'REGISTRO VISUAL EM PREPARAÇÃO',
    labLead:'UMA PEQUENA COISA QUE FUNCIONA.', labText:'Em vez de apenas ler sobre o que faço, experimente uma parte dele. Esta é uma amostra jogável do Typeee.',
    notebookLead:'O PROCESSO NÃO CABE NO RESULTADO.', next:'PRÓXIMA FOLHA', prev:'FOLHA ANTERIOR',
    leaf:'FOLHA', notebookTag:'ANOTAÇÕES DE OFICINA', deep:'VER PROJETO',
    aboutLead:'ENTRE A TELA E A OFICINA.', aboutP:'Sou de Curimatá, no Piauí, e vivo em Recife. Estudo Sistemas de Informação na UFPE e trabalho entre design de interfaces, desenvolvimento web, comunicação e fabricação digital.',
    aboutP2:'Já passei por robótica educacional, projetos de extensão, laboratórios de impressão 3D e sistemas embarcados. Fora do trabalho: bicicletas, fotografia, música e cidade.',
    timeline:'TRAJETÓRIA EM TRÊS FRAGMENTOS', now:'AGORA', tools:'O QUE PASSA PELAS MINHAS MÃOS',
    contactLead:'TEM ALGUMA COISA PRA FAZER JUNTO?', contactSub:'Projetos, conversas, colaborações e ideias ainda sem nome.',
    email:'ESCREVER UM E-MAIL', copy:'COPIAR ENDEREÇO', copied:'COPIADO ✓', social:'OUTRAS ROTAS',
    back:'VOLTAR À ENTRADA', escape:'M ABRE O MAPA · ESC FECHA', keyboard:'01—06 NAVEGAM',
    archiveTitle:'ARQUIVO', labTitle:'EXPERIMENTO', notebookTitle:'CADERNO', aboutTitle:'PESSOA', contactTitle:'CONTATO',
  },
  en: {
    skip:'Skip to content', index:'SITE MAP', close:'CLOSE', map:'MAP / 06 ROOMS',
    intro:'I DESIGN INTERFACES, WRITE CODE AND BUILD THINGS.',
    note:'A portfolio to explore, not just scroll. Start anywhere.',
    discover:'OPEN THE ARCHIVE', drag:'MOVE THE LETTERS WITH YOUR MOUSE', reset:'RESET LETTERS',
    feature:'FEATURED OBJECT', process:'DESIGN / CODE / WORKSHOP',
    entryLabel:'PERSONAL ARCHIVE OF PROJECTS AND PROCESSES',
    archiveLead:'WORK IN MOTION.',
    archiveHelp:'CHOOSE AN OBJECT. ON DESKTOP, YOU CAN ALSO DRAG IT.',
    inspect:'OBJECT FILE', number:'NO.',role:'MY ROLE',materials:'MATERIALS',launch:'OPEN PROJECT',
    source:'VIEW SOURCE',clear:'ANOTHER OBJECT',noImage:'VISUAL DOCUMENTATION IN PROGRESS',
    labLead:'SOMETHING SMALL THAT ACTUALLY WORKS.',labText:'Instead of only reading what I make, try a small part of it. This is a playable sample of Typeee.',
    notebookLead:'THE PROCESS DOESN’T FIT IN THE RESULT.',next:'NEXT SHEET',prev:'PREVIOUS SHEET',
    leaf:'SHEET',notebookTag:'WORKSHOP NOTES',deep:'VIEW PROJECT',
    aboutLead:'BETWEEN THE SCREEN AND THE WORKSHOP.',aboutP:'Originally from Curimatá, Piauí, now based in Recife. I study Information Systems at UFPE and work across interface design, web development, communication and digital fabrication.',
    aboutP2:'My background includes educational robotics, outreach projects, 3D printing labs and embedded systems. Outside work: bicycles, photography, music and the city.',
    timeline:'A JOURNEY IN THREE FRAGMENTS',now:'NOW',tools:'WHAT I WORK WITH',
    contactLead:'GOT SOMETHING WE COULD MAKE TOGETHER?',contactSub:'Projects, conversations, collaborations and ideas without names yet.',
    email:'WRITE AN EMAIL',copy:'COPY ADDRESS',copied:'COPIED ✓',social:'OTHER ROUTES',
    back:'BACK TO ENTRY',escape:'M OPENS MAP · ESC CLOSES',keyboard:'01—06 NAVIGATE',
    archiveTitle:'ARCHIVE',labTitle:'EXPERIMENT',notebookTitle:'NOTEBOOK',aboutTitle:'PERSON',contactTitle:'CONTACT',
  },
}
const notebook = [
  {
    id:'typeee', tag:'01 / PRODUTO DIGITAL', enTag:'01 / DIGITAL PRODUCT',
    ptTitle:'APRENDER TAMBÉM PODE SER UM JOGO.', enTitle:'LEARNING CAN BE PLAY.',
    pt:'No Typeee, treino, competição, precisão e velocidade precisam existir na mesma interface sem disputar atenção. A pergunta é menos “quantas funções?” e mais “qual é o próximo gesto?”.',
    en:'In Typeee, practice, competition, accuracy and speed have to coexist without fighting for attention. The question is less “how many features?” and more “what is the next gesture?”.',
  },
  {
    id:'zumbido', tag:'02 / ARQUIVO CULTURAL', enTag:'02 / CULTURAL ARCHIVE',
    ptTitle:'UM ARQUIVO COMEÇA NA RUA.', enTitle:'AN ARCHIVE STARTS IN THE STREET.',
    pt:'O Zumbido nasce das bicicletas e de tudo que acontece ao redor delas. Texto, fotografia e som não são categorias decorativas: são modos diferentes de guardar um encontro.',
    en:'Zumbido starts with bicycles and everything around them. Text, photography and sound are not decorative categories: they are different ways to keep an encounter.',
  },
  {
    id:'monan', tag:'03 / FABRICAÇÃO', enTag:'03 / FABRICATION',
    ptTitle:'DO ARQUIVO DIGITAL À MATÉRIA.', enTitle:'FROM A FILE TO AN OBJECT.',
    pt:'Modelar uma peça é só o início. A bancada, o material, o tempo de impressão e as limitações físicas devolvem perguntas que a tela sozinha não responde.',
    en:'Modeling a part is only the start. The workbench, material, print time and physical constraints ask questions a screen alone cannot answer.',
  },
]
const career = [
  {
    date:'2026',pt:'DESIGNER · CINCODERS',en:'DESIGNER · CINCODERS',
    place:'FÁBRICA DE SOFTWARE / UFPE',
    ptDesc:'Desenho de interfaces, prototipação em Figma e colaboração em produtos digitais de impacto social.',
    enDesc:'Interface design, Figma prototyping and collaboration on digital projects with social impact.',
  },
  {
    date:'ATUAL',pt:'COORDENAÇÃO & COMUNICAÇÃO',en:'COORDINATION & COMMUNICATIONS',
    place:'FEIRA AGROECOLÓGICA DA VÁRZEA',
    ptDesc:'Comunicação visual, conteúdo e articulação de uma iniciativa comunitária de agroecologia.',
    enDesc:'Visual communication, content and coordination of a community agroecology initiative.',
  },
  {
    date:'2024—26',pt:'MONITOR · GREA3D',en:'LAB MONITOR · GREA3D',
    place:'LABORATÓRIO DE ARTEFATOS 3D / UFPE',
    ptDesc:'Impressão 3D, fabricação digital, manutenção de equipamentos e apoio a oficinas e atividades práticas.',
    enDesc:'3D printing, digital fabrication, equipment maintenance and hands-on workshop support.',
  },
  {
    date:'2025',pt:'SECRETARIA DE COMUNICAÇÃO',en:'COMMUNICATIONS SECRETARY',
    place:'LASER / CIN—UFPE',
    ptDesc:'Comunicação e divulgação de projetos da liga acadêmica de sistemas embarcados.',
    enDesc:'Communications and outreach for the embedded systems academic league.',
  },
  {
    date:'2024—25',pt:'MODELAGEM E PROTOTIPAGEM',en:'3D MODELING & PROTOTYPING',
    place:'MONAN / UFPE',
    ptDesc:'Desenvolvimento de modelos tridimensionais e protótipos físicos para um projeto interdisciplinar.',
    enDesc:'3D models and physical prototypes for an interdisciplinary project.',
  },
  {
    date:'2021—22',pt:'MONITOR DE ROBÓTICA',en:'EDUCATIONAL ROBOTICS MONITOR',
    place:'INSTITUTO FEDERAL DO PIAUÍ',
    ptDesc:'Apoio ao ensino de robótica e atividades práticas com estudantes.',
    enDesc:'Hands-on teaching support for robotics and educational activities.',
  },
]
const projectNumbers = projects.map((p,i)=>({ ...p, number: String(i+1).padStart(2,'0') }))

function Frame({ children, title, number, side, className='' }) {
  return <div className={'sp-room-head '+className}>
    <span>{number} / {title}</span><span>{side}</span>
    {children}
  </div>
}

function WorkTile({ project, index, active, onPick }) {
  const node = useRef(null)
  const drag = useRef(null)
  const [shift, setShift] = useState({x:0,y:0})
  const down = e => {
    if (e.button !== 0 || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    drag.current={x:e.clientX,y:e.clientY,tx:shift.x,ty:shift.y,move:false}
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const move = e => {
    if (!drag.current) return
    const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y
    if(Math.hypot(dx,dy)>5)drag.current.move=true
    setShift({x:Math.max(-90,Math.min(90,drag.current.tx+dx)),y:Math.max(-75,Math.min(75,drag.current.ty+dy))})
  }
  const up = e => {
    if(!drag.current)return
    const dragged=drag.current.move
    drag.current=null
    if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)
    if(!dragged)onPick(project.slug)
  }
  return <button
    ref={node} type="button" className={'sp-specimen sp-specimen-'+index+(active?' is-active':'')}
    onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>{drag.current=null}}
    onClick={e=>{if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)onPick(project.slug)}}
    onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onPick(project.slug)}}}
    aria-pressed={active} aria-label={'Selecionar '+project.title}
    style={{'--move-x':shift.x+'px','--move-y':shift.y+'px'}}>
    <span className="sp-specimen-top"><span>OBJ / {project.number}</span><span>↗</span></span>
    <span className="sp-specimen-visual">
      {project.image?<img src={project.image} alt="" loading="eager" decoding="async" fetchPriority={active ? "high" : "auto"} />:
      <span className="sp-specimen-3d" aria-hidden="true"><i/><i/><i/>3D</span>}
    </span>
    <span className="sp-specimen-name">{project.title}<span>0{index+1}</span></span>
  </button>
}

function SiteMap({ lang, isOpen, onClose, onGo }) {
  const dialog=useRef(null)
  useEffect(()=>{
    if(!dialog.current)return
    if(isOpen&&!dialog.current.open)dialog.current.showModal()
    if(!isOpen&&dialog.current.open)dialog.current.close()
  },[isOpen])
  return <dialog ref={dialog} className="sp-map" aria-label={copy[lang].map}
    onClose={onClose} onClick={e=>{if(e.target===dialog.current)onClose()}}>
    <div className="sp-map-inner">
      <div className="sp-map-top"><span>{copy[lang].map}</span><button onClick={onClose}>{copy[lang].close} ×</button></div>
      {rooms.map((room,i)=><button key={room.key} onClick={()=>{onGo(room.key);onClose()}}>
        <small>{room.label}</small><strong>{room[lang]}</strong><span aria-hidden="true">↗</span></button>)}
      <div className="sp-map-bottom"><span>LUIS EDUARDO / RECIFE, BR</span><span>{copy[lang].escape}</span></div>
    </div>
  </dialog>
}

function Landing({ lang, t, onGo, onSelect }) {
  const physicsRef=useRef(null)
  const [featured,setFeatured]=useState(0)
  const project=projectNumbers[featured]
  return <section className="sp-landing print-hero" aria-labelledby="hero-title">
    <div className="print-cover sp-cover">
      <Frame title={t.entryLabel} number="EX 00" side="RECIFE / 2026" />
      <div className="sp-name-grid">
        <KineticWordmark lang={lang} ref={physicsRef}/>
        <div className="sp-name-sub">
          <span>LUIS EDUARDO LUSTOSA</span><span>DESIGN / SOFTWARE / OBJETOS</span>
        </div>
      </div>
      <div className="sp-entry-work">
        <div className="sp-entry-manifesto">
          <span className="sp-kicker" data-physics-obstacle="about">/ SOBRE O QUE EU FAÇO</span>
          <h2>{t.intro}</h2>
          <p>{t.note}</p>
          <button className="sp-action" onClick={()=>onGo('arquivo')}>{t.discover}<span>↗</span></button>
          <button className="sp-reset" onClick={()=>physicsRef.current?.reset()}>{t.reset} ↺</button>
        </div>
        <button className="sp-featured" onClick={()=>{onSelect(project.slug);onGo('arquivo')}} aria-label={'Explorar '+project.title}>
          <span className="sp-featured-head"><span>{t.feature}</span><span>{String(featured+1).padStart(2,'0')} / 04</span></span>
          <span className="sp-featured-image">{project.image
            ?<img src={project.image} alt="" width="1200" height="820" decoding="async" fetchPriority="high"/>
            :<span className="sp-featured-noimage">3D / MONAN</span>}
          </span>
          <span className="sp-featured-title">{project.title}<span>↗</span></span>
        </button>
        <div className="sp-entry-selector">
          <span className="sp-kicker" data-physics-obstacle="projects">{t.process}</span>
          <div className="sp-selector-list">{projectNumbers.map((p,i)=><button key={p.slug} className={featured===i?'is-selected':''} onClick={()=>setFeatured(i)} aria-pressed={featured===i}><span>{p.number}</span><strong>{p.title}</strong><span>↗</span></button>)}</div>
          <span className="sp-drag-note">{t.drag}</span>
        </div>
      </div>
    </div>
    <div className="print-index sp-physics-floor" aria-hidden="true"/>
  </section>
}

function ProjectInfo({ project:p, t, lang, onNext, onClose, modal=false }) {
  return <>
    <div className="sp-inspector-top">
      <span>{t.inspect}</span>
      <span>{t.number} {p.number} / 04</span>
      {modal&&<button className="sp-inspector-close" onClick={onClose} aria-label={lang==='pt'?'Fechar ficha':'Close project file'}>FECHAR ×</button>}
    </div>
    <h2>{p.title}</h2>
    <p className="sp-inspector-kind">{p.category[lang]}</p>
    <p className="sp-inspector-description">{p.description[lang]}</p>
    <div className="sp-inspector-facts"><span>{t.role}</span><p>{p.role[lang]}</p></div>
    <div className="sp-inspector-facts"><span>{t.materials}</span><p>{p.tags.join(' / ')}</p></div>
    <div className="sp-inspector-links">
      <a href={p.url} target="_blank" rel="noopener noreferrer">{p.slug==='monan'?(lang==='pt'?'VER NO LATTES':'ACADEMIC PROFILE'):t.launch} ↗</a>
      {p.repo&&<a href={p.repo} target="_blank" rel="noopener noreferrer">{t.source} ↗</a>}
    </div>
    <button className="sp-inspector-next" onClick={onNext}>{t.clear} <span>→</span></button>
  </>
}

function Archive({lang,t,selected,onSelect,onGo}) {
  const p=projectNumbers.find(x=>x.slug===selected)||projectNumbers[0]
  const [sheetOpen,setSheetOpen]=useState(false)
  const sheetRef=useRef(null)
  const next=()=>onSelect(projectNumbers[(projectNumbers.findIndex(x=>x.slug===p.slug)+1)%4].slug)
  const pick=slug=>{
    onSelect(slug)
    if(window.matchMedia('(max-width:680px)').matches)setSheetOpen(true)
  }
  useEffect(()=>{
    const dialog=sheetRef.current
    if(!dialog)return
    if(sheetOpen&&!dialog.open)dialog.showModal()
    if(!sheetOpen&&dialog.open)dialog.close()
  },[sheetOpen])
  return <section className="sp-archive" aria-labelledby="sp-archive-title">
    <Frame title={t.archiveTitle} number="01" side="04 OBJETOS / UM ARQUIVO"/>
    <div className="sp-archive-title"><h1 id="sp-archive-title">{t.archiveLead}</h1><p>{t.archiveHelp}</p></div>
    <div className="sp-archive-layout">
      <div className="sp-workbench" aria-label={lang==='pt'?'Escolher projeto':'Choose project'}>
        {projectNumbers.map((project,i)=><WorkTile key={project.slug} project={project} index={i} active={p.slug===project.slug} onPick={pick}/>)}
      </div>
      <aside className="sp-inspector" aria-label={lang==='pt'?'Ficha do projeto selecionado':'Selected project file'} aria-live="polite" aria-atomic="true">
        <ProjectInfo project={p} t={t} lang={lang} onNext={next}/>
      </aside>
      <dialog ref={sheetRef} className="sp-project-sheet" onClose={()=>setSheetOpen(false)}
        aria-label={(lang==='pt'?'Ficha do projeto ':'Project file ')+p.title}
        onClick={e=>{if(e.target===sheetRef.current)setSheetOpen(false)}}>
        <div className="sp-project-sheet-inner">
          <ProjectInfo project={p} t={t} lang={lang} onClose={()=>setSheetOpen(false)} onNext={next} modal/>
        </div>
      </dialog>
    </div>
    <div className="sp-visual-roll">
      <div className="sp-visual-roll-title"><span>VISUAL ROLL / 08</span><span>{lang==='pt'?'TRABALHOS GRÁFICOS / BEHANCE':'GRAPHIC WORK / BEHANCE'}</span></div>
      <div className="sp-visual-roll-track" aria-label={lang==='pt'?'Trabalhos visuais':'Visual works'}>
        {visualProjects.filter(item=>item.kind==='behance').map((item,i)=><a key={item.id}
          href={'https://www.behance.net/gallery/'+item.id+'/'} target="_blank" rel="noopener noreferrer"
          aria-label={(lang==='pt'?'Abrir trabalho visual ':'Open visual work ')+(i+1)+' no Behance'}>
          <span>{String(i+1).padStart(2,'0')} / 08</span>
          <strong>{String(i+1).padStart(2,'0')}</strong>
          <small>BEHANCE / {item.id}</small>
          <i aria-hidden="true">↗</i>
        </a>)}
      </div>
      <a className="sp-visual-roll-all" href="https://www.behance.net/lustosabr" target="_blank" rel="noopener noreferrer">{lang==='pt'?'VER TODO O ARQUIVO VISUAL':'EXPLORE ALL VISUAL WORK'} ↗</a>
    </div>
    <button className="sp-room-end" onClick={()=>onGo('laboratorio')}>02 / {rooms[2][lang]} <span>↗</span></button>
  </section>
}

function Notebook({lang,t,onSelect,onGo}) {
  const [page,setPage]=useState(0)
  const note=notebook[page]
  const work=projects.find(p=>p.slug===note.id)
  return <section className="sp-notebook" aria-labelledby="sp-notebook-title">
    <Frame title={t.notebookTitle} number="03" side={t.notebookTag}/>
    <div className="sp-notebook-head"><h1 id="sp-notebook-title">{t.notebookLead}</h1><span>NOTA / 0{page+1}—03</span></div>
    <div className="sp-book">
      <div className="sp-book-left">
        <span>{t.leaf} / 0{page+1}</span>
        <strong>{String(page+1).padStart(2,'0')}</strong>
        <div className="sp-book-stamp">LEL / PROCESS FILE<br/>RECIFE—BR / 2026</div>
      </div>
      <div className="sp-book-right" key={note.id}>
        <div className="sp-book-metadata"><span>{lang==='pt'?note.tag:note.enTag}</span><span>↘</span></div>
        <h2>{lang==='pt'?note.ptTitle:note.enTitle}</h2>
        <p>{lang==='pt'?note.pt:note.en}</p>
        {work.image&&<div className="sp-book-image"><img src={work.image} alt="" loading="lazy" decoding="async"/></div>}
        <button onClick={()=>{onSelect(work.slug);onGo('arquivo')}}>{t.deep} / {work.title} ↗</button>
      </div>
    </div>
    <div className="sp-book-navigation">
      <button onClick={()=>setPage(value=>(value+2)%3)}><span aria-hidden="true">←</span> {t.prev}</button>
      <div className="sp-book-dots" aria-label={t.leaf}>{notebook.map((item,i)=><button key={item.id} onClick={()=>setPage(i)} aria-label={'Folha '+(i+1)} aria-current={i===page?'step':undefined}>{i+1}</button>)}</div>
      <button onClick={()=>setPage(value=>(value+1)%3)}>{t.next} <span aria-hidden="true">→</span></button>
    </div>
  </section>
}

function About({lang,t,onGo}) {
  const path=[
    {year:'ORIGEM',place:'CURIMATÁ / PI',name:lang==='pt'?'PIAUÍ':'PIAUÍ'},
    {year:'CIDADE',place:'RECIFE / PE',name:lang==='pt'?'PERNAMBUCO':'PERNAMBUCO'},
    {year:'2026',place:'UFPE / CIN',name:t.now},
  ]
  return <section className="sp-about" aria-labelledby="sp-about-title">
    <Frame title={t.aboutTitle} number="04" side="BIO / MAPA DE PERCURSO"/>
    <div className="sp-about-grid">
      <div className="sp-about-portrait" aria-hidden="true"><span>DO PIAUÍ</span><strong>↘</strong><span>AO RECIFE</span></div>
      <div className="sp-about-text"><h1 id="sp-about-title">{t.aboutLead}</h1><p>{t.aboutP}</p><p>{t.aboutP2}</p><button className="sp-action" onClick={()=>onGo('contato')}>{rooms[5][lang]} <span>↗</span></button></div>
    </div>
    <div className="sp-transit"><span>{t.timeline}</span><div>{path.map((item,i)=><div key={item.place} className="sp-transit-stop"><i aria-hidden="true"/><span>{item.year}</span><strong>{item.place}</strong><small>{item.name}</small></div>)}</div></div>
    <div className="sp-career">
      <div className="sp-career-label"><span>{lang==='pt'?'FICHAS DE TRABALHO':'WORK RECORDS'}</span><span>01—06</span></div>
      {career.map((item,i)=><details className="sp-career-item" key={i}>
        <summary><span>{String(i+1).padStart(2,'0')}</span><strong>{item[lang]}</strong><span className="sp-career-date">{item.date}</span><span aria-hidden="true">＋</span></summary>
        <div className="sp-career-content"><span>{item.place}</span><p>{item[lang+'Desc']}</p></div>
      </details>)}
    </div>
    <div className="sp-toolstrip"><span>{t.tools}</span><div>FIGMA <i/> REACT <i/> JAVASCRIPT <i/> MODELAGEM 3D <i/> IMPRESSÃO 3D <i/> FOTOGRAFIA <i/> CULTURA MAKER</div></div>
  </section>
}

function Contact({lang,t,onGo}) {
  const [copied,setCopied]=useState(false)
  const doCopy=async()=>{try{await navigator.clipboard.writeText(email);setCopied(true);window.setTimeout(()=>setCopied(false),1700)}catch{window.location.href='mailto:'+email}}
  return <section className="sp-contact" aria-labelledby="sp-contact-title">
    <Frame title={t.contactTitle} number="05" side="ABERTO / COLABORAÇÃO"/>
    <div className="sp-contact-body"><p>LUIS EDUARDO LUSTOSA / RECIFE</p><h1 id="sp-contact-title">{t.contactLead}</h1><p className="sp-contact-sub">{t.contactSub}</p>
      <div className="sp-contact-actions"><a href={'mailto:'+email}>{t.email} <span aria-hidden="true">↗</span></a><button onClick={doCopy} aria-live="polite">{copied?t.copied:t.copy} <span aria-hidden="true">⧉</span></button></div>
      <div className="sp-contact-address">{email}</div>
    </div>
    <div className="sp-contact-foot"><div><span>{t.social}</span><div>{channels.map(x=><a key={x.name} href={x.href} target="_blank" rel="noopener noreferrer">{x.name} ↗</a>)}</div></div><button onClick={()=>onGo('entrada')}>{t.back} ↑</button></div>
  </section>
}

export default function SpatialPortfolio(){
  const [lang,setLang]=useState(()=>window.localStorage.getItem('luis-portfolio-language')==='en'?'en':'pt')
  const [room,setRoom]=useState(findRoom)
  const [selected,setSelected]=useState(findWork()||'typeee')
  const [mapOpen,setMapOpen]=useState(false)
  const [visit,setVisit]=useState(0)
  const t=copy[lang]
  const mainRef=useRef(null)
  const navigate=key=>{
    if(!rooms.some(item=>item.key===key))return
    if(key===room&&key!=='arquivo'){window.scrollTo({top:0,behavior:'instant'});return}
    window.history.pushState(null,'','#'+key)
    setRoom(key)
    setVisit(value=>value+1)
  }
  const selectWork=slug=>{
    setSelected(slug)
    if(room==='arquivo')window.history.replaceState(null,'','#work-'+slug)
  }
  useEffect(()=>{
    document.documentElement.lang=lang==='pt'?'pt-BR':'en'
    document.title=(rooms.find(r=>r.key===room)?.[lang]||'PORTFÓLIO')+' — Luis Eduardo Lustosa'
    window.localStorage.setItem('luis-portfolio-language',lang)
  },[lang,room])
  useEffect(()=>{
    const sync=()=>{setRoom(findRoom());setSelected(findWork()||'typeee');setMapOpen(false);setVisit(v=>v+1)}
    window.addEventListener('popstate',sync)
    window.addEventListener('hashchange',sync)
    return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',sync)}
  },[])
  useEffect(()=>{
    const handler=e=>{
      const target=e.target
      if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return
      if(target instanceof HTMLElement&&(target.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(target.tagName)))return
      if(e.key==='Escape'){if(mapOpen){e.preventDefault();setMapOpen(false)}return}
      if(e.key.toLowerCase()==='m'&&!mapOpen){e.preventDefault();setMapOpen(true);return}
      const index=Number(e.key)-1
      if(index>=0&&index<rooms.length){e.preventDefault();navigate(rooms[index].key)}
    }
    document.addEventListener('keydown',handler)
    return()=>document.removeEventListener('keydown',handler)
  },[room,mapOpen])
  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:'instant'})
    const frame=requestAnimationFrame(()=>mainRef.current?.focus({preventScroll:true}))
    return()=>cancelAnimationFrame(frame)
  },[room,visit])
  return <>
    <a className="sp-skip" href="#sp-main">{t.skip}</a>
    <header className="sp-header">
      <button type="button" className="sp-brand" onClick={()=>navigate('entrada')} aria-label={lang==='pt'?'Voltar à entrada':'Return to entry'}><span className="sp-brand-symbol">LE/</span><span>LUIS EDUARDO<br/>ARQUIVO PESSOAL</span></button>
      <nav className="sp-primary-nav" aria-label={lang==='pt'?'Salas do portfólio':'Portfolio rooms'}>
        {rooms.map(r=><button key={r.key} onClick={()=>navigate(r.key)} aria-current={room===r.key?'page':undefined}><span>{r.label}</span>{r[lang]}</button>)}
      </nav>
      <div className="sp-header-actions"><button type="button" className="sp-lang" onClick={()=>setLang(v=>v==='pt'?'en':'pt')} aria-label={lang==='pt'?'Switch to English':'Mudar para português'}>{lang.toUpperCase()} ↔</button><button type="button" className="sp-map-button" onClick={()=>setMapOpen(true)} aria-haspopup="dialog">{t.index} <span aria-hidden="true">↗</span></button></div>
    </header>
    <main id="sp-main" ref={mainRef} tabIndex={-1} className={'sp-site sp-site-'+room} key={room}>
      {room==='entrada'&&<Landing lang={lang} t={t} onGo={navigate} onSelect={selectWork}/>}
      {room==='arquivo'&&<Archive lang={lang} t={t} selected={selected} onSelect={selectWork} onGo={navigate}/>}
      {room==='laboratorio'&&<section className="sp-lab" aria-labelledby="sp-lab-title"><Frame number="02" title={t.labTitle} side="TYPEEE / DEMO"/><div className="sp-lab-heading"><h1 id="sp-lab-title">{t.labLead}</h1><p>{t.labText}</p></div><StudioPanel lang={lang}/><button className="sp-room-end" onClick={()=>navigate('caderno')}>03 / {rooms[3][lang]} <span>↗</span></button></section>}
      {room==='caderno'&&<Notebook lang={lang} t={t} onGo={navigate} onSelect={selectWork}/>}
      {room==='pessoa'&&<About lang={lang} t={t} onGo={navigate}/>}
      {room==='contato'&&<Contact lang={lang} t={t} onGo={navigate}/>}
    </main>
    <footer className="sp-bottom">
      <span>LEL © {new Date().getFullYear()}</span><span>{rooms.find(x=>x.key===room)?.label} / 05 — {rooms.find(x=>x.key===room)?.[lang]}</span>
      <button onClick={()=>setMapOpen(true)}>{t.map} ↗</button>
    </footer>
    <nav className="sp-mobile-dock" aria-label={lang==='pt'?'Acesso rápido':'Quick navigation'}>
      {[rooms[0],rooms[1],rooms[3],rooms[5]].map(item=><button key={item.key} onClick={()=>navigate(item.key)} aria-current={room===item.key?'page':undefined}><span>{item.label}</span>{item[lang]}</button>)}
      <button className="sp-mobile-map-trigger" onClick={()=>setMapOpen(true)} aria-label={t.index}>＋</button>
    </nav>
    <SiteMap lang={lang} isOpen={mapOpen} onClose={()=>setMapOpen(false)} onGo={navigate}/>
  </>
}

import { useEffect, useRef, useState } from 'react'
import { chapters } from '../data/chapters.js'
import { projects } from '../data/projects.js'
import { searchPortfolio } from '../lib/searchPortfolio.js'

export default function QuickNavigator({ lang }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const pt = lang === 'pt'
  const results = searchPortfolio(chapters, projects, lang, query)

  const open = () => {
    if (dialogRef.current?.open) return
    setQuery('')
    setSelected(0)
    dialogRef.current?.showModal()
    setIsOpen(true)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }
  const close = () => { if (dialogRef.current?.open) dialogRef.current.close(); setIsOpen(false) }
  const go = id => {
    close()
    const target = document.getElementById(id)
    if (!target) return
    window.location.hash = id
    const heading = target.querySelector('h1,h2,h3') || target
    const oldTabIndex = heading.getAttribute('tabindex')
    heading.setAttribute('tabindex','-1')
    window.requestAnimationFrame(() => {
      heading.focus({ preventScroll:true })
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start' })
      heading.addEventListener('blur', () => {
        if (oldTabIndex === null) heading.removeAttribute('tabindex')
        else heading.setAttribute('tabindex', oldTabIndex)
      }, { once:true })
    })
  }
  useEffect(() => {
    const handler = event => {
      if (event.key !== '/' || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName))) return
      if (document.querySelector('dialog[open]')) return
      event.preventDefault()
      const dialog = dialogRef.current
      if (!dialog || dialog.open) return
      dialog.showModal()
      setQuery('')
      setSelected(0)
      setIsOpen(true)
      window.requestAnimationFrame(() => inputRef.current?.focus())
    }
    document.addEventListener('keydown',handler)
    return () => document.removeEventListener('keydown',handler)
  }, [])
  const inputKeys = event => {
    if (event.key === 'ArrowDown' && results.length) { event.preventDefault(); setSelected(v=>Math.min(v+1,results.length-1)) }
    if (event.key === 'ArrowUp' && results.length) { event.preventDefault(); setSelected(v=>Math.max(v-1,0)) }
    if (event.key === 'Enter' && results.length) { event.preventDefault(); go(results[Math.min(selected,results.length-1)].target) }
  }
  return <>
    <button className="quick-nav-trigger" type="button" onClick={open} aria-haspopup="dialog"
      aria-expanded={isOpen} aria-controls="quick-nav"
      title={pt ? 'Buscar seção ou projeto · /' : 'Search sections or projects · /'}
      aria-label={pt ? 'Buscar seção ou projeto' : 'Search sections or projects'}>
      <span className="quick-nav-slash" aria-hidden="true">/</span>
      <span className="quick-nav-label">{pt ? 'BUSCAR' : 'SEARCH'}</span>
      <span className="quick-nav-label-mobile">{pt ? 'BUSCAR' : 'SEARCH'}</span>
      <span className="quick-nav-arrow" aria-hidden="true">↗</span>
    </button>
    <dialog ref={dialogRef} id="quick-nav" className="quick-nav-dialog"
      aria-label={pt ? 'Busca rápida de seções e projetos' : 'Quick search across sections and projects'}
      onClose={()=>setIsOpen(false)} onClick={event=>{if(event.target===dialogRef.current)close()}}>
      <div className="quick-nav">
        <div className="quick-nav-top"><span>INDEX / SEARCH</span><span>LUIS EDUARDO — 2026</span>
          <button type="button" onClick={close} aria-label={pt?'Fechar busca':'Close search'}>ESC <span aria-hidden="true">×</span></button>
        </div>
        <div className="quick-nav-heading">
          <h2>{pt ? <>NAVEGAÇÃO<span>RÁPIDA.</span></> : <>QUICK<span>ACCESS.</span></>}</h2>
          <span>{pt?'BUSCA':'SEARCH'} / {String(results.length).padStart(2,'0')}</span>
        </div>
        <label htmlFor="quick-nav-input" className="quick-nav-input-label">{pt?'BUSCAR SEÇÃO OU PROJETO /':'SEARCH SECTION OR PROJECT /'}</label>
        <div className="quick-nav-search">
          <span aria-hidden="true">/</span>
          <input ref={inputRef} id="quick-nav-input" type="search" value={query} autoComplete="off"
            onChange={event=>{setQuery(event.target.value);setSelected(0)}} onKeyDown={inputKeys}
            placeholder={pt?'Ex.: Zumbido, React, contato...':'E.g. Typeee, React, contact...'} />
          <span className="quick-nav-search-hint">↵</span>
        </div>
        <div className="quick-nav-results-heading">
          <span>{pt?'RESULTADOS /':'RESULTS /'} {String(results.length).padStart(2,'0')}</span><span>↗</span>
        </div>
        <div className="quick-nav-results">
          {results.map((item,index)=><button type="button" key={item.type+item.target}
            className={selected===index?'is-highlighted':''}
            onMouseEnter={()=>setSelected(index)} onFocus={()=>setSelected(index)}
            onClick={()=>go(item.target)}>
            <span>{String(index+1).padStart(2,'0')}</span>
            <strong>{item.label}<small className="quick-nav-result-type">{item.type==='project'?(pt?'PROJETO':'PROJECT'):(pt?'SEÇÃO':'SECTION')}</small></strong>
            <span aria-hidden="true">↗</span>
          </button>)}
          {results.length===0&&<p role="status">{pt?'NENHUM RESULTADO. TENTE OUTRO TERMO.':'NO RESULTS. TRY ANOTHER SEARCH.'}</p>}
        </div>
        <div className="quick-nav-help">
          <span>{pt?'ATALHO / PRESSIONE “/” PARA ABRIR':'SHORTCUT / PRESS “/” TO OPEN'}</span>
          <span>{pt?'↑↓ SELECIONAR · ↵ IR · ESC FECHAR':'↑↓ SELECT · ↵ GO · ESC CLOSE'}</span>
        </div>
      </div>
    </dialog>
  </>
}

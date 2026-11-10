import { useEffect, useRef, useState } from 'react'
import { chapters } from '../data/chapters.js'

const sections = chapters

export default function QuickNavigator({ lang, onNavigate }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const pt = lang === 'pt'
  const filtered = sections.filter(item => item[lang].toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))

  const open = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    setQuery('')
    setSelected(0)
    dialog.showModal()
    setIsOpen(true)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }
  const close = () => {
    if (dialogRef.current?.open) dialogRef.current.close()
    setIsOpen(false)
  }
  const go = id => {
    close()
    onNavigate?.()
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
    window.history.replaceState(null, '', '#' + id)
  }

  useEffect(() => {
    const handleKey = event => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      const target = event.target
      if (target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
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
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const inputKeys = event => {
    if (event.key === 'ArrowDown' && filtered.length) {
      event.preventDefault()
      setSelected(i => Math.min(i + 1, filtered.length - 1))
    } else if (event.key === 'ArrowUp' && filtered.length) {
      event.preventDefault()
      setSelected(i => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && filtered.length) {
      event.preventDefault()
      go(filtered[Math.min(selected, filtered.length - 1)].id)
    }
  }

  return (
    <>
      <button className="quick-nav-trigger" type="button" onClick={open}
        aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="quick-nav"
        title={pt ? 'Navegação rápida · /' : 'Quick navigation · /'}>
        <span className="quick-nav-slash" aria-hidden="true">/</span>
        <span className="quick-nav-label">{pt ? 'ATALHOS' : 'SHORTCUTS'}</span>
      </button>
      <dialog ref={dialogRef} id="quick-nav" className="quick-nav-dialog"
        aria-label={pt ? 'Navegação rápida' : 'Quick navigation'}
        onClose={() => setIsOpen(false)}
        onClick={event => { if (event.target === dialogRef.current) close() }}>
        <div className="quick-nav">
          <div className="quick-nav-top">
            <span>INDEX / 001</span>
            <span>LUIS EDUARDO — 2026</span>
            <button type="button" onClick={close} aria-label={pt ? 'Fechar navegação rápida' : 'Close quick navigation'}>
              ESC <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="quick-nav-heading">
            <h2>{pt ? <>NAVEGAÇÃO<span>RÁPIDA.</span></> : <>QUICK<span>ACCESS.</span></>}</h2>
            <span>{pt ? 'ÍNDICE' : 'INDEX'} / {String(sections.length).padStart(2, '0')}</span>
          </div>
          <label htmlFor="quick-nav-input" className="quick-nav-input-label">
            {pt ? 'BUSCAR SEÇÃO /' : 'SEARCH SECTION /'}
          </label>
          <div className="quick-nav-search">
            <span aria-hidden="true">/</span>
            <input ref={inputRef} id="quick-nav-input" type="search" value={query}
              autoComplete="off"
              onChange={event => { setQuery(event.target.value); setSelected(0) }}
              onKeyDown={inputKeys}
              placeholder={pt ? 'Digite uma seção...' : 'Type a section...'} />
            <span className="quick-nav-search-hint">↵</span>
          </div>
          <div className="quick-nav-results-heading">
            <span>{pt ? 'SEÇÕES /' : 'SECTIONS /'} {String(filtered.length).padStart(2, '0')}</span>
            <span>↗</span>
          </div>
          <div className="quick-nav-results">
            {filtered.map((item, index) => (
              <button type="button" key={item.id}
                className={index === selected ? 'is-highlighted' : ''}
                onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)}
                onClick={() => go(item.id)}>
                <span>{String(sections.findIndex(x => x.id === item.id) + 1).padStart(2, '0')}</span>
                <strong>{item[lang]}</strong><span aria-hidden="true">↗</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p role="status">{pt ? 'NENHUMA SEÇÃO ENCONTRADA.' : 'NO MATCHING SECTIONS.'}</p>
            )}
          </div>
          <div className="quick-nav-help">
            <span>{pt ? 'ATALHO / PRESSIONE “/” PARA ABRIR' : 'SHORTCUT / PRESS “/” TO OPEN'}</span>
            <span>{pt ? '↑↓ SELECIONAR · ↵ IR · ESC FECHAR' : '↑↓ SELECT · ↵ GO · ESC CLOSE'}</span>
          </div>
        </div>
      </dialog>
    </>
  )
}

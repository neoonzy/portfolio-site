import { useEffect, useRef, useState } from 'react'

const sections = [
  { id: 'projects', pt: 'Projetos na prática', en: 'Selected projects', key: 'P' },
  { id: 'lab', pt: 'Experimentar o Typeee', en: 'Try Typeee', key: 'T' },
  { id: 'notes', pt: 'Caderno de processo', en: 'Process notebook', key: 'N' },
  { id: 'about', pt: 'Sobre mim', en: 'About me', key: 'S' },
  { id: 'experience', pt: 'Trajetória', en: 'Experience', key: 'E' },
  { id: 'gallery', pt: 'Trabalhos visuais', en: 'Visual work', key: 'V' },
  { id: 'contact', pt: 'Contato', en: 'Contact', key: 'C' },
]

export default function QuickNavigator({ lang, onNavigate }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const filtered = sections.filter(item => item[lang].toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))

  const open = () => {
    const el = dialogRef.current
    if (!el || el.open) return
    setQuery('')
    el.showModal()
    setIsOpen(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }
  const close = () => {
    dialogRef.current?.close()
    setIsOpen(false)
  }
  const go = (id) => {
    close()
    onNavigate?.()
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    window.history.replaceState(null, '', '#' + id)
  }

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
      event.preventDefault()
      if (!dialogRef.current?.open) {
        dialogRef.current?.showModal()
        setQuery('')
        setIsOpen(true)
        requestAnimationFrame(() => inputRef.current?.focus())
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <button type="button" className="quick-nav-trigger" onClick={open} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="quick-nav">
        <span aria-hidden="true">/</span><span className="quick-nav-label">{lang === 'pt' ? 'ATALHOS' : 'SHORTCUTS'}</span>
      </button>
      <dialog ref={dialogRef} id="quick-nav" className="quick-nav-dialog" aria-label={lang === 'pt' ? 'Navegação rápida' : 'Quick navigation'}
        onClose={() => setIsOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) close() }}>
        <div className="quick-nav">
          <div className="quick-nav-top">
            <span>LE / {lang === 'pt' ? 'NAVEGAÇÃO RÁPIDA' : 'QUICK NAVIGATION'}</span>
            <button type="button" onClick={close} aria-label={lang === 'pt' ? 'Fechar' : 'Close'}>ESC ×</button>
          </div>
          <label htmlFor="quick-nav-input">{lang === 'pt' ? 'Para onde vamos?' : 'Where to?'}</label>
          <input ref={inputRef} id="quick-nav-input" type="search" value={query} autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && filtered.length) { e.preventDefault(); go(filtered[0].id) } }}
            placeholder={lang === 'pt' ? 'Digite uma seção...' : 'Search a section...'} />
          <div className="quick-nav-results">
            {filtered.map((item, index) => (
              <button type="button" key={item.id} onClick={() => go(item.id)}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{item[lang]}</strong><span aria-hidden="true">↗</span>
              </button>
            ))}
            {filtered.length === 0 && <p role="status">{lang === 'pt' ? 'Nada por aqui. Tente outro termo.' : 'No matches. Try another word.'}</p>}
          </div>
          <p className="quick-nav-help">{lang === 'pt' ? 'DICA: pressione / em qualquer lugar para abrir.' : 'TIP: press / anywhere to open.'}</p>
        </div>
      </dialog>
    </>
  )
}

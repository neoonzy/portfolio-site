import { useEffect, useRef, useState } from 'react'
import { chapters } from '../data/chapters.js'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * Mobile-only chapter marker that follows the document, not a separate menu.
 * rAF throttles measurements; percentage is quantized to limit React updates.
 * Clicks reuse the existing /atalhos dialog through onOpenIndex.
 */
export default function MobileSectionIndicator({ lang, onOpenIndex }) {
  const barRef = useRef(null)
  const [reading, setReading] = useState({ index: 0, percent: 0 })
  const pt = lang === 'pt'
  const current = chapters[reading.index]

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 680px)')
    const nodes = chapters.map(chapter => document.getElementById(chapter.id))
    const header = document.querySelector('.header')
    let frame = 0

    const measure = () => {
      frame = 0
      if (!mobile.matches) return
      const headerHeight = header?.getBoundingClientRect().height ?? 68
      const barHeight = barRef.current?.getBoundingClientRect().height ?? 48
      const readerLine = headerHeight + barHeight + 8

      let index = 0
      // A chapter starts when its leading edge passes below the fixed bars.
      nodes.forEach((node, i) => {
        if (node && node.getBoundingClientRect().top <= readerLine) index = i
      })

      const section = nodes[index]
      const bounds = section?.getBoundingClientRect()
      const percent = bounds && bounds.height > 0
        ? Math.round(clamp((readerLine - bounds.top) / bounds.height, 0, 1) * 100)
        : 0

      setReading(previous =>
        previous.index === index && previous.percent === percent
          ? previous
          : { index, percent }
      )
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null
    nodes.forEach(node => { if (node) observer?.observe(node) })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('load', schedule)
    mobile.addEventListener('change', schedule)
    schedule()

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
      mobile.removeEventListener('change', schedule)
    }
  }, [])

  const chapterName = current[lang]
  const label = pt
    ? `Seção ${reading.index + 1} de ${chapters.length}: ${chapterName}. Abrir índice de navegação.`
    : `Section ${reading.index + 1} of ${chapters.length}: ${chapterName}. Open navigation index.`

  return (
    <nav className="mobile-chapter-indicator" ref={barRef}
      aria-label={pt ? 'Localização no portfólio' : 'Portfolio reading position'}>
      <button type="button" className="mobile-chapter-button"
        onClick={onOpenIndex} aria-controls="quick-nav" aria-haspopup="dialog"
        aria-label={label}>
        <span className="mobile-chapter-counter">
          {String(reading.index + 1).padStart(2, '0')}
          <span aria-hidden="true"> / </span>
          {String(chapters.length).padStart(2, '0')}
        </span>
        <span className="mobile-chapter-name">{pt ? current.shortPt : current.shortEn}</span>
        <span className="mobile-chapter-action" aria-hidden="true">{pt ? 'ÍNDICE' : 'INDEX'} ↗</span>
      </button>
      <div className="mobile-chapter-track" aria-hidden="true">
        <span style={{ width: `${reading.percent}%` }} />
      </div>
    </nav>
  )
}

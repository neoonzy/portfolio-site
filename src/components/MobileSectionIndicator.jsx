import { useEffect, useRef, useState } from 'react'
import { chapters } from '../data/chapters.js'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * Mobile-only chapter marker that follows the document, not a separate menu.
 * rAF throttles measurements; percentage is quantized to limit React updates.
 * The only visible UI is a 2px progress line beneath the sticky header.
 */
export default function MobileSectionIndicator({ lang }) {
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
      const barHeight = barRef.current?.getBoundingClientRect().height ?? 2
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
  const ariaLabel = pt
    ? `Progresso em ${chapterName}, seção ${reading.index + 1} de ${chapters.length}`
    : `Progress through ${chapterName}, section ${reading.index + 1} of ${chapters.length}`

  return (
    <div className="mobile-chapter-indicator" ref={barRef}
      role="progressbar" aria-label={ariaLabel}
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={reading.percent}>
      <span className="mobile-chapter-fill" style={{ width: `${reading.percent}%` }} />
    </div>
  )
}

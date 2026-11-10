import { useEffect, useRef } from 'react'

const TEXT = ['LUIS/', 'EDUARDO']
const GLYPHS = TEXT.join('').split('')
const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

/**
 * One readable title, with spring physics applied to its individual glyphs.
 * Inert on touch, and entirely motion-free for prefers-reduced-motion.
 * DOM styles are updated in rAF instead of re-rendering React at 60fps.
 */
export default function KineticWordmark({ lang }) {
  const root = useRef(null)
  const letters = useRef([])
  const metrics = useRef([])
  const bodies = useRef(GLYPHS.map(() => ({ x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0 })))
  const pointer = useRef({ x: 0, y: 0, active: false })
  const dragging = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const node = root.current
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!node) return

    const measure = () => {
      metrics.current = letters.current.map((letter, i) => {
        const rect = letter?.getBoundingClientRect()
        const body = bodies.current[i]
        return rect
          ? { x: rect.left + rect.width / 2 - body.x, y: rect.top + rect.height / 2 - body.y }
          : { x: 0, y: 0 }
      })
    }

    const step = () => {
      raf.current = 0
      const animate = media.matches && !reduced.matches
      const p = pointer.current
      const drag = dragging.current
      let moving = false
      bodies.current.forEach((body, i) => {
        const center = metrics.current[i]
        if (!center || !letters.current[i]) return

        let tx = 0
        let ty = 0
        let tr = 0
        if (animate && p.active) {
          const dx = center.x - p.x
          const dy = center.y - p.y
          const distance = Math.hypot(dx, dy)
          const radius = 175
          if (distance < radius && distance > .1) {
            const force = Math.pow(1 - distance / radius, 1.75)
            tx = dx / distance * force * 22
            ty = dy / distance * force * 16
            tr = clamp(-dx / radius * force * 14, -7, 7)
          }
        }
        if (animate && drag?.index === i) {
          tx = clamp(drag.dx, -65, 65)
          ty = clamp(drag.dy, -52, 52)
          tr = clamp(drag.dx * .12, -9, 9)
        }
        if (!animate) { tx = 0; ty = 0; tr = 0 }
        body.vx = (body.vx + (tx - body.x) * .16) * .73
        body.vy = (body.vy + (ty - body.y) * .16) * .73
        body.vr = (body.vr + (tr - body.r) * .14) * .74
        body.x += body.vx
        body.y += body.vy
        body.r += body.vr
        letters.current[i].style.transform = `translate3d(${body.x.toFixed(2)}px,${body.y.toFixed(2)}px,0) rotate(${body.r.toFixed(2)}deg)`

        if (Math.abs(body.x - tx) + Math.abs(body.y - ty) + Math.abs(body.r - tr) +
          Math.abs(body.vx) + Math.abs(body.vy) + Math.abs(body.vr) > .07) moving = true
      })
      if (moving) raf.current = window.requestAnimationFrame(step)
    }
    const wake = () => { if (!raf.current) raf.current = window.requestAnimationFrame(step) }

    const enter = (event) => {
      if (!media.matches || reduced.matches) return
      measure()
      pointer.current = { x: event.clientX, y: event.clientY, active: true }
      wake()
    }
    const move = (event) => {
      if (!media.matches || reduced.matches) return
      pointer.current = { x: event.clientX, y: event.clientY, active: true }
      if (dragging.current) {
        const d = dragging.current
        d.dx = event.clientX - d.startX
        d.dy = event.clientY - d.startY
      }
      wake()
    }
    const leave = () => {
      if (dragging.current) return
      pointer.current.active = false
      wake()
    }
    const down = (event) => {
      if (!media.matches || reduced.matches || event.button !== 0) return
      const target = event.target.closest('[data-glyph]')
      if (!target) return
      event.preventDefault()
      measure()
      const index = Number(target.dataset.glyph)
      dragging.current = { index, id: event.pointerId, startX: event.clientX, startY: event.clientY, dx: 0, dy: 0 }
      node.setPointerCapture(event.pointerId)
      pointer.current.active = false
      wake()
    }
    const up = (event) => {
      if (!dragging.current || dragging.current.id !== event.pointerId) return
      dragging.current = null
      pointer.current.active = false
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId)
      wake()
    }
    const lostCapture = () => {
      if (!dragging.current) return
      dragging.current = null
      pointer.current.active = false
      wake()
    }
    const disable = () => {
      pointer.current.active = false
      dragging.current = null
      if (reduced.matches || !media.matches) {
        window.cancelAnimationFrame(raf.current)
        raf.current = 0
        bodies.current.forEach((body, i) => {
          Object.assign(body, { x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0 })
          if (letters.current[i]) letters.current[i].style.transform = ''
        })
      } else wake()
    }

    node.addEventListener('pointerenter', enter)
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', leave)
    node.addEventListener('pointerdown', down)
    node.addEventListener('pointerup', up)
    node.addEventListener('pointercancel', up)
    node.addEventListener('lostpointercapture', lostCapture)
    window.addEventListener('resize', measure)
    media.addEventListener('change', disable)
    reduced.addEventListener('change', disable)
    measure()
    document.fonts?.ready.then(() => { if (root.current === node) measure() })

    return () => {
      window.cancelAnimationFrame(raf.current)
      node.removeEventListener('pointerenter', enter)
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
      node.removeEventListener('pointerdown', down)
      node.removeEventListener('pointerup', up)
      node.removeEventListener('pointercancel', up)
      node.removeEventListener('lostpointercapture', lostCapture)
      window.removeEventListener('resize', measure)
      media.removeEventListener('change', disable)
      reduced.removeEventListener('change', disable)
    }
  }, [])

  let offset = 0
  return (
    <h1 id="hero-title" className="print-wordmark kinetic-wordmark" ref={root} aria-label="LUIS/EDUARDO">
      {TEXT.map((line, groupIndex) => {
        const start = offset
        offset += line.length
        return <span key={groupIndex} className="kinetic-word" aria-hidden="true">
          {Array.from(line).map((char, i) => (
            <span
              key={start + i}
              ref={node => { letters.current[start + i] = node }}
              data-glyph={start + i}
              className={'kinetic-glyph' + (char === '/' ? ' kinetic-slash' : '')}
            >{char}</span>
          ))}
        </span>
      })}
    </h1>
  )
}

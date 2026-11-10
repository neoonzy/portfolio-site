import { useEffect, useRef } from 'react'

const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

/**
 * An unobtrusive physical detail: a movable stamp in the printed-art panel.
 * Pointer release creates a spring return with a little overshoot.
 * Arrow keys work too; reduced-motion moves immediately without inertia.
 */
export default function MagneticStamp({ lang }) {
  const stampRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const body = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const dragging = useRef(null)
  const frame = useRef(0)

  useEffect(() => () => window.cancelAnimationFrame(frame.current), [])

  const render = () => {
    const node = stampRef.current
    if (!node) return
    node.style.transform = `translate3d(${body.current.x}px, ${body.current.y}px, 0) rotate(${body.current.x * .11}deg)`
  }

  const startSpring = () => {
    window.cancelAnimationFrame(frame.current)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      body.current.x = target.current.x
      body.current.y = target.current.y
      body.current.vx = 0
      body.current.vy = 0
      render()
      return
    }
    const step = () => {
      const particle = body.current
      particle.vx = (particle.vx + (target.current.x - particle.x) * .14) * .77
      particle.vy = (particle.vy + (target.current.y - particle.y) * .14) * .77
      particle.x += particle.vx
      particle.y += particle.vy
      render()
      const settled = Math.abs(particle.vx) + Math.abs(particle.vy) +
        Math.abs(target.current.x - particle.x) + Math.abs(target.current.y - particle.y) < .12
      if (settled) {
        particle.x = target.current.x
        particle.y = target.current.y
        render()
        return
      }
      frame.current = window.requestAnimationFrame(step)
    }
    frame.current = window.requestAnimationFrame(step)
  }

  const onDown = event => {
    if (event.button !== 0) return
    event.preventDefault()
    dragging.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: target.current.x,
      startY: target.current.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onMove = event => {
    const start = dragging.current
    if (!start || start.id !== event.pointerId) return
    target.current.x = clamp(start.startX + event.clientX - start.x, -75, 75)
    target.current.y = clamp(start.startY + event.clientY - start.y, -70, 70)
    startSpring()
  }

  const release = event => {
    if (!dragging.current || dragging.current.id !== event.pointerId) return
    dragging.current = null
    target.current.x = 0
    target.current.y = 0
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    startSpring()
  }

  const onKeyDown = event => {
    const amount = event.shiftKey ? 36 : 18
    if (event.key === 'ArrowUp') target.current.y = clamp(target.current.y - amount, -70, 70)
    else if (event.key === 'ArrowDown') target.current.y = clamp(target.current.y + amount, -70, 70)
    else if (event.key === 'ArrowLeft') target.current.x = clamp(target.current.x - amount, -75, 75)
    else if (event.key === 'ArrowRight') target.current.x = clamp(target.current.x + amount, -75, 75)
    else if (event.key === 'Escape' || event.key === 'Home') {
      target.current.x = 0
      target.current.y = 0
    } else return
    event.preventDefault()
    startSpring()
  }

  return (
    <button
      type="button"
      ref={stampRef}
      className="physics-stamp"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={() => {
        if (!dragging.current) return
        dragging.current = null
        target.current.x = 0
        target.current.y = 0
        startSpring()
      }}
      onKeyDown={onKeyDown}
      aria-label={lang === 'pt'
        ? 'Carimbo interativo: arraste e solte para vê-lo voltar; use as setas do teclado para mover e Home para centralizar.'
        : 'Interactive stamp: drag and release to spring back; use arrow keys to move and Home to reset.'}
      title={lang === 'pt' ? 'ARRASTE / SOLTE' : 'DRAG / RELEASE'}
    >
      <span>LEL</span>
      <span aria-hidden="true">↗</span>
    </button>
  )
}

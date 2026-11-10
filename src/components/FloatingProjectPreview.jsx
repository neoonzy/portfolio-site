import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

const clamp = (value, low, high) => Math.min(Math.max(value, low), high)

/**
 * Fixed, portal-mounted image preview. Unlike an absolutely positioned card,
 * it is not clipped by overflow:hidden, transforms or local stacking contexts.
 *
 * Uses a damped spring rather than a mouse-follow CSS animation. All
 * interactions remain on the original link/button; the preview is decorative.
 */
export default function FloatingProjectPreview({ preview, lang }) {
  const layerRef = useRef(null)
  const bodyRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

  useEffect(() => {
    if (!preview || !layerRef.current) return
    const layer = layerRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = bodyRef.current
    let frame = 0
    let destX = 0
    let destY = 0

    const destination = (x, y, mode, anchor) => {
      const width = layer.offsetWidth || 342
      const height = layer.offsetHeight || 244
      const margin = 12
      const offset = 24
      if (mode === 'focus' && anchor) {
        // Prefer the right side of the focused element; fall back to the left.
        const right = anchor.right + offset
        destX = right + width < window.innerWidth - margin
          ? right
          : anchor.left - width - offset >= margin
            ? anchor.left - width - offset
            : clamp(anchor.left, margin, window.innerWidth - width - margin)
        destY = clamp(anchor.top, margin, window.innerHeight - height - margin)
      } else {
        const preferRight = x + width + offset < window.innerWidth - margin
        destX = clamp(x + (preferRight ? offset : -width - offset), margin, window.innerWidth - width - margin)
        destY = clamp(y - height * 0.45, margin, window.innerHeight - height - margin)
      }
    }

    destination(preview.x, preview.y, preview.mode, preview.anchor)
    state.x = destX
    state.y = destY
    state.vx = 0
    state.vy = 0
    layer.style.transform = `translate3d(${state.x}px,${state.y}px,0)`

    const tick = () => {
      if (!reduced) {
        state.vx = (state.vx + (destX - state.x) * 0.14) * 0.74
        state.vy = (state.vy + (destY - state.y) * 0.14) * 0.74
        state.x += state.vx
        state.y += state.vy
        layer.style.transform = `translate3d(${state.x}px,${state.y}px,0)`
      }
      frame = window.requestAnimationFrame(tick)
    }
    if (!reduced && preview.mode === 'pointer') frame = window.requestAnimationFrame(tick)

    const move = event => {
      if (preview.mode !== 'pointer' || event.pointerType === 'touch') return
      destination(event.clientX, event.clientY, 'pointer', null)
      if (reduced) layer.style.transform = `translate3d(${destX}px,${destY}px,0)`
    }
    const resize = () => destination(preview.x, preview.y, preview.mode, preview.anchor)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('resize', resize)
    }
  }, [preview])

  if (!preview || typeof document === 'undefined') return null
  const project = preview.project
  return createPortal(
    <div className="floating-project-preview" ref={layerRef} aria-hidden="true">
      <div className="floating-preview-top">
        <span>PREVIEW / {project.title.toUpperCase()}</span>
        <span>↗</span>
      </div>
      <div className={'floating-preview-image' + (!project.image ? ' is-type' : '')}>
        {project.image
          ? <img src={project.image} alt="" draggable="false" />
          : <strong>{project.symbol || project.title}</strong>}
      </div>
      <div className="floating-preview-footer">
        <span>{project.category[lang]}</span>
        <span>LEL / 2026</span>
      </div>
    </div>,
    document.body
  )
}

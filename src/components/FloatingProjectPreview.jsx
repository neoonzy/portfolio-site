import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

const clamp = (value, low, high) => Math.min(Math.max(value, low), high)

/**
 * Editorial project card with weighted motion. Portal-mounted to escape
 * clipping/stacking contexts. It remains decorative and never takes input.
 *
 * The card follows the pointer with a spring, tilts in the direction of
 * movement and gently straightens when it stops. Focus is kept stationary.
 */
export default function FloatingProjectPreview({ preview, lang }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!preview || !layer) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = 26
    const margin = 22
    let frame = 0
    let destination = { x: 0, y: 0 }
    const body = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, va: 0, scale: 1 }

    const moveTarget = (x, y, mode, anchor) => {
      const width = layer.offsetWidth || 340
      const height = layer.offsetHeight || 258
      const rightLimit = Math.max(margin, window.innerWidth - width - margin)
      const bottomLimit = Math.max(margin, window.innerHeight - height - margin)

      if (mode === 'focus' && anchor) {
        const right = anchor.right + offset
        const left = anchor.left - width - offset
        destination.x = right <= rightLimit ? right : left >= margin ? left : clamp(anchor.left, margin, rightLimit)
        destination.y = clamp(anchor.top, margin, bottomLimit)
      } else {
        const fitsRight = x + width + offset <= window.innerWidth - margin
        destination.x = clamp(x + (fitsRight ? offset : -width - offset), margin, rightLimit)
        destination.y = clamp(y - height * .42, margin, bottomLimit)
      }
    }

    const render = () => {
      layer.style.transform = `translate3d(${body.x.toFixed(2)}px,${body.y.toFixed(2)}px,0) rotate(${body.angle.toFixed(2)}deg) scale(${body.scale.toFixed(3)})`
    }
    const settle = () => {
      if (reduced || preview.mode === 'focus') {
        body.x = destination.x
        body.y = destination.y
        body.angle = 0
        body.scale = 1
        render()
        return
      }
      body.vx = (body.vx + (destination.x - body.x) * .14) * .73
      body.vy = (body.vy + (destination.y - body.y) * .14) * .73
      body.x += body.vx
      body.y += body.vy
      const lean = clamp(body.vx * .55, -6, 6)
      body.va = (body.va + (lean - body.angle) * .16) * .7
      body.angle += body.va
      body.scale += (1 - body.scale) * .17
      render()
      const remaining = Math.abs(destination.x - body.x) + Math.abs(destination.y - body.y) +
        Math.abs(body.vx) + Math.abs(body.vy) + Math.abs(body.angle) +
        Math.abs(body.va) + Math.abs(1 - body.scale)
      if (remaining > .22) frame = window.requestAnimationFrame(settle)
      else frame = 0
    }
    const start = () => {
      if (frame || reduced || preview.mode === 'focus') return
      frame = window.requestAnimationFrame(settle)
    }

    moveTarget(preview.x, preview.y, preview.mode, preview.anchor)
    body.x = destination.x
    body.y = destination.y + (preview.mode === 'pointer' && !reduced ? 12 : 0)
    body.scale = preview.mode === 'pointer' && !reduced ? .97 : 1
    render()
    start()

    const move = event => {
      if (preview.mode !== 'pointer' || event.pointerType === 'touch') return
      moveTarget(event.clientX, event.clientY, 'pointer', null)
      if (reduced) { body.x = destination.x; body.y = destination.y; render() }
      else start()
    }
    const resize = () => {
      moveTarget(preview.x, preview.y, preview.mode, preview.anchor)
      if (reduced || preview.mode === 'focus') { body.x = destination.x; body.y = destination.y; render() }
      else start()
    }

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
        <span>PREVIEW / {project.title.toUpperCase()}</span><span>↗</span>
      </div>
      <div className={'floating-preview-image' + (!project.image ? ' is-type' : '')}>
        {project.image
          ? <img src={project.image} alt="" draggable="false" />
          : <strong>{project.symbol || project.title}</strong>}
      </div>
      <div className="floating-preview-footer">
        <span>{project.category[lang]}</span><span>LEL / 2026</span>
      </div>
    </div>,
    document.body
  )
}

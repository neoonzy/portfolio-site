import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import {
  createGlyphBody, FIXED_STEP, glyphHit, kickGlyph, settled, stepGlyphWorld,
} from '../lib/glyphPhysics.js'

const WORDS = ['LUIS/', 'EDUARDO']
const count = WORDS.join('').length
const clamp = (x, low, high) => Math.min(high, Math.max(low, x))

/**
 * DOM lettering at rest; individual rigid bodies after mouse impact.
 * Their collision floor is the rule immediately under the open cover space,
 * so falling glyphs never descend into the projects index.
 */
const KineticWordmark = forwardRef(function KineticWordmark(_props, ref) {
  const rootRef = useRef(null)
  const glyphRefs = useRef([])
  const controllerRef = useRef({ dropAll: () => {}, reset: () => {} })

  useImperativeHandle(ref, () => ({
    dropAll: () => controllerRef.current.dropAll(),
    reset: () => controllerRef.current.reset(),
  }), [])

  useEffect(() => {
    const title = rootRef.current
    const cover = title?.closest('.print-cover')
    const runway = cover?.querySelector('.print-physics-runway')
    const glyphs = glyphRefs.current
    if (!title || !cover || !runway || glyphs.length !== count) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const bodies = []
    let bounds = { left: 0, right: 0, top: 0, floor: 0 }
    let frame = 0
    let previous = 0
    let accumulator = 0
    let quietFrames = 0
    let duration = 0
    let dragging = null
    let pointer = null
    let mounted = true

    const position = event => {
      const rect = cover.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const render = () => {
      bodies.forEach((body, i) => {
        if (!glyphs[i]) return
        if (!body.active) {
          glyphs[i].style.transform = ''
          glyphs[i].style.zIndex = ''
        } else {
          const dx = body.x - body.homeX
          const dy = body.y - body.homeY
          glyphs[i].style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) rotate(${body.angle.toFixed(4)}rad)`
          glyphs[i].style.zIndex = String(10 + i)
        }
      })
    }

    const pause = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      previous = 0
      accumulator = 0
    }

    const reset = () => {
      pause()
      dragging = null
      pointer = null
      quietFrames = 0
      duration = 0
      glyphs.forEach(glyph => { glyph.style.transform = ''; glyph.style.zIndex = '' })
      const coverRect = cover.getBoundingClientRect()
      const floorRect = runway.getBoundingClientRect()
      bounds = {
        left: 6,
        right: Math.max(24, coverRect.width - 6),
        top: 0,
        floor: Math.max(80, floorRect.bottom - coverRect.top - 1),
      }
      bodies.length = 0
      glyphs.forEach((glyph, i) => {
        const rect = glyph.getBoundingClientRect()
        bodies.push(createGlyphBody(
          rect.left - coverRect.left + rect.width / 2,
          rect.top - coverRect.top + rect.height / 2,
          rect.width * .78,
          rect.height * .73,
          i,
        ))
      })
    }

    const animate = now => {
      frame = 0
      if (reduce.matches) { reset(); return }
      if (!previous) previous = now
      accumulator += Math.min((now - previous) / 1000, .045)
      previous = now
      let steps = 0
      while (accumulator >= FIXED_STEP && steps < 6) {
        stepGlyphWorld(bodies, bounds, FIXED_STEP)
        accumulator -= FIXED_STEP
        steps += 1
      }
      render()

      if (!dragging && settled(bodies)) quietFrames += 1
      else quietFrames = 0
      duration += 1
      if (quietFrames < 75 && duration < 2400) frame = window.requestAnimationFrame(animate)
      else pause()
    }

    const wake = () => {
      if (reduce.matches) return
      quietFrames = 0
      duration = 0
      if (!frame) frame = window.requestAnimationFrame(animate)
    }

    const dropAll = () => {
      if (reduce.matches) return
      bodies.forEach((body, i) => {
        if (body.active) return
        kickGlyph(body, (i - (bodies.length - 1) / 2) * 22, -40, body.x + (i % 2 ? 6 : -6))
      })
      wake()
    }

    controllerRef.current = { dropAll, reset }

    const pick = (event, x, y) => {
      const target = event.target instanceof Element ? event.target.closest('[data-glyph]') : null
      if (target && title.contains(target)) return bodies[Number(target.dataset.glyph)] || null
      // Pick a fallen letter by its rotated body, even outside the original h1.
      for (let i = bodies.length - 1; i >= 0; i -= 1) {
        if (bodies[i].active && glyphHit(bodies[i], x, y, 5)) return bodies[i]
      }
      return null
    }

    const onDown = event => {
      if (reduce.matches || event.button !== 0) return
      const p = position(event)
      const body = pick(event, p.x, p.y)
      if (!body) return
      event.preventDefault()
      body.active = true
      body.held = true
      body.vx = 0
      body.vy = 0
      body.omega = 0
      dragging = {
        id: event.pointerId,
        body,
        offsetX: body.x - p.x,
        offsetY: body.y - p.y,
        px: p.x,
        py: p.y,
        timestamp: event.timeStamp,
        vx: 0,
        vy: 0,
      }
      cover.setPointerCapture(event.pointerId)
      pointer = null
      wake()
    }

    const onMove = event => {
      if (reduce.matches) return
      const p = position(event)
      if (dragging && event.pointerId === dragging.id) {
        const d = dragging
        const dt = Math.max(.008, (event.timeStamp - d.timestamp) / 1000)
        d.vx = clamp((p.x - d.px) / dt, -900, 900)
        d.vy = clamp((p.y - d.py) / dt, -900, 900)
        d.px = p.x
        d.py = p.y
        d.timestamp = event.timeStamp
        d.body.x = clamp(p.x + d.offsetX, bounds.left + d.body.w / 2, bounds.right - d.body.w / 2)
        d.body.y = clamp(p.y + d.offsetY, bounds.top + d.body.h / 2, bounds.floor - d.body.h / 2)
        d.body.angle = clamp(d.vx / 150, -0.28, .28)
        render()
        wake()
        return
      }

      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
      const time = event.timeStamp
      const delta = pointer
        ? Math.max(.008, (time - pointer.time) / 1000)
        : .016
      const vx = pointer ? clamp((p.x - pointer.x) / delta, -1200, 1200) : 0
      const vy = pointer ? clamp((p.y - pointer.y) / delta, -1200, 1200) : 0
      pointer = { x: p.x, y: p.y, time }

      const speed = Math.hypot(vx, vy)
      if (speed < 35) return
      let hit = false
      bodies.forEach(body => {
        if (body.held || time - body.lastHit < 115 || !glyphHit(body, p.x, p.y, 10)) return
        body.lastHit = time
        kickGlyph(body, vx, vy, p.x)
        hit = true
      })
      if (hit) wake()
    }

    const release = event => {
      if (!dragging || event.pointerId !== dragging.id) return
      const d = dragging
      d.body.held = false
      d.body.vx = d.vx * .78
      d.body.vy = d.vy * .78 - 90
      d.body.omega = clamp(d.vx * .006, -5, 5)
      dragging = null
      pointer = null
      if (cover.hasPointerCapture(event.pointerId)) cover.releasePointerCapture(event.pointerId)
      wake()
    }
    const lost = () => {
      if (!dragging) return
      dragging.body.held = false
      dragging = null
      wake()
    }
    const onPointerLeave = () => { pointer = null }
    const onResize = () => {
      // A resized text layout requires new original glyph bounds.
      reset()
    }
    const onPreference = () => { if (reduce.matches) reset() }
    const onBlur = () => {
      if (dragging) { dragging.body.held = false; dragging = null; wake() }
      pointer = null
    }

    cover.addEventListener('pointerdown', onDown)
    cover.addEventListener('pointermove', onMove, { passive: true })
    cover.addEventListener('pointerup', release)
    cover.addEventListener('pointercancel', release)
    cover.addEventListener('lostpointercapture', lost)
    cover.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', onResize)
    window.addEventListener('blur', onBlur)
    reduce.addEventListener('change', onPreference)
    reset()
    document.fonts?.ready.then(() => { if (mounted) reset() })

    return () => {
      mounted = false
      pause()
      controllerRef.current = { dropAll: () => {}, reset: () => {} }
      cover.removeEventListener('pointerdown', onDown)
      cover.removeEventListener('pointermove', onMove)
      cover.removeEventListener('pointerup', release)
      cover.removeEventListener('pointercancel', release)
      cover.removeEventListener('lostpointercapture', lost)
      cover.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('blur', onBlur)
      reduce.removeEventListener('change', onPreference)
      glyphs.forEach(glyph => {
        if (!glyph) return
        glyph.style.transform = ''
        glyph.style.zIndex = ''
      })
    }
  }, [])

  let offset = 0
  return (
    <h1 ref={rootRef} id="hero-title" className="print-wordmark kinetic-wordmark" aria-label="LUIS/EDUARDO">
      {WORDS.map((part, group) => {
        const first = offset
        offset += part.length
        return (
          <span className="kinetic-word" key={group} aria-hidden="true">
            {Array.from(part).map((char, index) => (
              <span
                key={first + index}
                ref={node => { glyphRefs.current[first + index] = node }}
                data-glyph={first + index}
                className={'kinetic-glyph' + (char === '/' ? ' kinetic-slash' : '')}
              >{char}</span>
            ))}
          </span>
        )
      })}
    </h1>
  )
})

export default KineticWordmark

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import {
  createGlyphBody, createStaticObstacle, FIXED_STEP, glyphHit, kickGlyph, settled, stepGlyphWorld,
} from '../lib/glyphPhysics.js'

const WORDS = ['LUIS/', 'EDUARDO']
const count = WORDS.join('').length
const clamp = (x, low, high) => Math.min(high, Math.max(low, x))

/**
 * DOM lettering at rest; individual rigid bodies after mouse impact.
 * Real editorial labels act as collision platforms, while the bottom edge
 * immediately before the selected-work index is the final floor.
 */
const KineticWordmark = forwardRef(function KineticWordmark({ lang }, ref) {
  const rootRef = useRef(null)
  const glyphRefs = useRef([])
  const controllerRef = useRef({ reset: () => {} })

  useImperativeHandle(ref, () => ({
    reset: () => controllerRef.current.reset(),
  }), [])

  useEffect(() => {
    const title = rootRef.current
    const cover = title?.closest('.print-cover')
    const section = title?.closest('.print-hero')
    const workIndex = section?.querySelector('.print-index')
    const glyphs = glyphRefs.current
    if (!title || !cover || !section || !workIndex || glyphs.length !== count) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const bodies = []
    const obstacles = []
    let keyboardIndex = 0
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
          glyphs[i].style.pointerEvents = ''
        } else {
          const dx = body.x - body.homeX
          const dy = body.y - body.homeY
          glyphs[i].style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) rotate(${body.angle.toFixed(4)}rad)`
          glyphs[i].style.zIndex = String(10 + i)
          glyphs[i].style.pointerEvents = 'none'
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
      glyphs.forEach(glyph => { glyph.style.transform = ''; glyph.style.zIndex = ''; glyph.style.pointerEvents = '' })
      const coverRect = cover.getBoundingClientRect()
      const indexRect = workIndex.getBoundingClientRect()
      bounds = {
        left: 6,
        right: Math.max(24, coverRect.width - 6),
        top: 0,
        floor: Math.max(80, indexRect.top - coverRect.top - 3),
      }
      keyboardIndex = 0
      bodies.length = 0
      obstacles.length = 0
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
      cover.querySelectorAll('[data-physics-obstacle]').forEach((label, i) => {
        const rect = label.getBoundingClientRect()
        obstacles.push(createStaticObstacle(
          rect.left - coverRect.left + rect.width / 2,
          rect.top - coverRect.top + rect.height / 2,
          rect.width + 12,
          rect.height + 14,
          label.dataset.physicsObstacle || i,
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
        stepGlyphWorld(bodies, bounds, FIXED_STEP, obstacles)
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

    controllerRef.current = { reset }

    const onTitleKey = event => {
      if (reduce.matches || (event.key !== 'Enter' && event.key !== ' ')) return
      if (event.ctrlKey || event.altKey || event.metaKey) return
      event.preventDefault()
      for (let i = 0; i < bodies.length; i += 1) {
        const index = (keyboardIndex + i) % bodies.length
        const body = bodies[index]
        if (body.active) continue
        kickGlyph(body, (index % 2 ? 1 : -1) * 100, -50, body.x)
        keyboardIndex = (index + 1) % bodies.length
        wake()
        return
      }
    }

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
      // Keep touch scrolling natural; mobile visitors can use DROP ALL.
      if (reduce.matches || event.button !== 0 || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return
      const p = position(event)
      if (event.target instanceof Element && event.target.closest('a, button, input, select, textarea, summary')) return
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
      section.setPointerCapture(event.pointerId)
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
      if (section.hasPointerCapture(event.pointerId)) section.releasePointerCapture(event.pointerId)
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

    title.addEventListener('keydown', onTitleKey)
    section.addEventListener('pointerdown', onDown)
    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerup', release)
    section.addEventListener('pointercancel', release)
    section.addEventListener('lostpointercapture', lost)
    section.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', onResize)
    window.addEventListener('blur', onBlur)
    reduce.addEventListener('change', onPreference)
    reset()
    document.fonts?.ready.then(() => { if (mounted) reset() })

    return () => {
      mounted = false
      pause()
      controllerRef.current = { reset: () => {} }
      title.removeEventListener('keydown', onTitleKey)
      section.removeEventListener('pointerdown', onDown)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerup', release)
      section.removeEventListener('pointercancel', release)
      section.removeEventListener('lostpointercapture', lost)
      section.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('blur', onBlur)
      reduce.removeEventListener('change', onPreference)
      glyphs.forEach(glyph => {
        if (!glyph) return
        glyph.style.transform = ''
        glyph.style.zIndex = ''
        glyph.style.pointerEvents = ''
      })
    }
  }, [lang])

  let offset = 0
  return (
    <h1 ref={rootRef} id="hero-title" className="print-wordmark kinetic-wordmark"
      tabIndex={0} aria-label={lang === 'en'
        ? 'LUIS/EDUARDO. Press Enter or Space to release one letter at a time.'
        : 'LUIS/EDUARDO. Pressione Enter ou espaço para soltar uma letra.'}>
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

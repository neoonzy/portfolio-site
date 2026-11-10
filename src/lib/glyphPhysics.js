/**
 * Tiny deterministic 2D rigid-body engine for the portfolio wordmark.
 * Each glyph is an oriented rectangle, not a CSS easing animation:
 * gravity, SAT contact detection, separation, linear/angular impulses and friction.
 * No external physics dependency and no canvas: text remains selectable in the DOM.
 */

export const GRAVITY = 1550
export const FIXED_STEP = 1 / 120

const clamp = (x, low, high) => Math.max(low, Math.min(high, x))
const dot = (a, b) => a.x * b.x + a.y * b.y
const cross = (a, b) => a.x * b.y - a.y * b.x
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })
const minus = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })
const scale = (v, amount) => ({ x: v.x * amount, y: v.y * amount })

export function createGlyphBody(x, y, width, height, id = 0) {
  const w = Math.max(5, width)
  const h = Math.max(6, height)
  const mass = Math.max(.5, w * h / 5500)
  return {
    id, x, y, homeX: x, homeY: y,
    w, h, mass, inertia: mass * (w * w + h * h) / 12,
    vx: 0, vy: 0, angle: 0, omega: 0,
    active: false, held: false, lastHit: 0,
  }
}

export function createStaticObstacle(x, y, width, height, id = 'obstacle') {
  return {
    id, x, y,
    w: Math.max(6, width),
    h: Math.max(8, height),
    mass: Infinity,
    inertia: Infinity,
    angle: 0,
    vx: 0, vy: 0, omega: 0,
    active: false, held: false, static: true,
  }
}

function axes(body) {
  const cos = Math.cos(body.angle), sin = Math.sin(body.angle)
  return [{ x: cos, y: sin }, { x: -sin, y: cos }]
}

function projectedRadius(body, axis) {
  const [horizontal, vertical] = axes(body)
  return Math.abs(dot(horizontal, axis)) * body.w / 2 +
    Math.abs(dot(vertical, axis)) * body.h / 2
}

function satContact(a, b) {
  const candidates = [...axes(a), ...axes(b)]
  const direction = { x: b.x - a.x, y: b.y - a.y }
  let overlap = Infinity
  let normal = null
  for (const candidate of candidates) {
    const distance = Math.abs(dot(direction, candidate))
    const penetration = projectedRadius(a, candidate) + projectedRadius(b, candidate) - distance
    if (penetration <= 0) return null
    if (penetration < overlap) {
      overlap = penetration
      normal = dot(direction, candidate) >= 0 ? candidate : scale(candidate, -1)
    }
  }
  return { normal, overlap }
}

function support(body, direction) {
  const [horizontal, vertical] = axes(body)
  const h = dot(horizontal, direction)
  const v = dot(vertical, direction)
  const xx = Math.abs(h) < .0001 ? 0 : Math.sign(h) * body.w / 2
  const yy = Math.abs(v) < .0001 ? 0 : Math.sign(v) * body.h / 2
  return add({ x: body.x, y: body.y }, add(scale(horizontal, xx), scale(vertical, yy)))
}

function velocityAt(body, radius) {
  return { x: body.vx - body.omega * radius.y, y: body.vy + body.omega * radius.x }
}

function inverse(body) {
  if (!body.active || body.held || body.static) return { mass: 0, inertia: 0 }
  return { mass: 1 / body.mass, inertia: 1 / body.inertia }
}

function applyImpulse(body, impulse, radius, inv, direction) {
  if (!inv.mass) return
  body.vx += impulse.x * inv.mass * direction
  body.vy += impulse.y * inv.mass * direction
  body.omega += cross(radius, impulse) * inv.inertia * direction
}

function resolvePair(a, b) {
  if (!a.active && !b.active) return
  const hit = satContact(a, b)
  if (!hit) return
  const n = hit.normal

  // Anchored letters wake when another glyph falls into them.
  const approach = dot({ x: b.vx - a.vx, y: b.vy - a.vy }, n)
  if (approach < -25 && hit.overlap > .5) {
    if (!a.active && !a.static) a.active = true
    if (!b.active && !b.static) b.active = true
  }

  const ai = inverse(a), bi = inverse(b)
  const invMass = ai.mass + bi.mass
  if (!invMass) return

  // Position correction prevents bodies from sinking into one another.
  const correction = Math.max(0, hit.overlap - .18) * .76 / invMass
  a.x -= n.x * correction * ai.mass
  a.y -= n.y * correction * ai.mass
  b.x += n.x * correction * bi.mass
  b.y += n.y * correction * bi.mass

  const pointA = support(a, n)
  const pointB = support(b, scale(n, -1))
  const point = scale(add(pointA, pointB), .5)
  const ra = minus(point, { x: a.x, y: a.y })
  const rb = minus(point, { x: b.x, y: b.y })
  const rel = minus(velocityAt(b, rb), velocityAt(a, ra))
  const normalSpeed = dot(rel, n)
  if (normalSpeed >= 0) return

  const an = cross(ra, n), bn = cross(rb, n)
  const denom = invMass + an * an * ai.inertia + bn * bn * bi.inertia
  if (denom < 1e-9) return
  const restitution = Math.abs(normalSpeed) > 80 ? .2 : 0
  const impulseSize = -(1 + restitution) * normalSpeed / denom
  const impulse = scale(n, impulseSize)
  applyImpulse(a, impulse, ra, ai, -1)
  applyImpulse(b, impulse, rb, bi, 1)

  const after = minus(velocityAt(b, rb), velocityAt(a, ra))
  const tangentRaw = minus(after, scale(n, dot(after, n)))
  const length = Math.hypot(tangentRaw.x, tangentRaw.y)
  if (length < 1e-7) return
  const tangent = scale(tangentRaw, 1 / length)
  const at = cross(ra, tangent), bt = cross(rb, tangent)
  const frictionDenom = invMass + at * at * ai.inertia + bt * bt * bi.inertia
  if (frictionDenom < 1e-9) return
  const friction = clamp(-dot(after, tangent) / frictionDenom, -impulseSize * .5, impulseSize * .5)
  const frictionImpulse = scale(tangent, friction)
  applyImpulse(a, frictionImpulse, ra, ai, -1)
  applyImpulse(b, frictionImpulse, rb, bi, 1)
}

function resolveBounds(body, bounds) {
  if (!body.active || body.held) return
  const cos = Math.abs(Math.cos(body.angle)), sin = Math.abs(Math.sin(body.angle))
  const rx = cos * body.w / 2 + sin * body.h / 2
  const ry = sin * body.w / 2 + cos * body.h / 2

  if (body.x - rx < bounds.left) {
    body.x = bounds.left + rx
    if (body.vx < 0) body.vx = -body.vx * .25
    body.omega *= .9
  } else if (body.x + rx > bounds.right) {
    body.x = bounds.right - rx
    if (body.vx > 0) body.vx = -body.vx * .25
    body.omega *= .9
  }
  if (body.y - ry < bounds.top) {
    body.y = bounds.top + ry
    if (body.vy < 0) body.vy = -body.vy * .15
  }
  if (body.y + ry > bounds.floor) {
    body.y = bounds.floor - ry
    if (body.vy > 0) body.vy = body.vy > 32 ? -body.vy * .16 : 0
    body.vx *= .88
    body.omega *= .85
  }
}

export function stepGlyphWorld(bodies, bounds, dt = FIXED_STEP, obstacles = []) {
  const step = clamp(dt, 0, 1 / 30)
  for (const body of bodies) {
    if (!body.active || body.held) continue
    body.vy += GRAVITY * step
    body.vx *= Math.pow(.994, step * 60)
    body.vy *= Math.pow(.998, step * 60)
    body.omega *= Math.pow(.991, step * 60)
    body.vx = clamp(body.vx, -1300, 1300)
    body.vy = clamp(body.vy, -1400, 1400)
    body.omega = clamp(body.omega, -12, 12)
    body.x += body.vx * step
    body.y += body.vy * step
    body.angle += body.omega * step
  }
  for (let iteration = 0; iteration < 5; iteration += 1) {
    for (const body of bodies) resolveBounds(body, bounds)
    for (let i = 0; i < bodies.length; i += 1) {
      for (let j = i + 1; j < bodies.length; j += 1) {
        resolvePair(bodies[i], bodies[j])
      }
      for (const obstacle of obstacles) resolvePair(bodies[i], obstacle)
    }
  }
  // A final boundary pass keeps the pile above the floor after letter collisions.
  for (const body of bodies) resolveBounds(body, bounds)
}

export function glyphHit(body, x, y, radius = 0) {
  const dx = x - body.x, dy = y - body.y
  const c = Math.cos(body.angle), s = Math.sin(body.angle)
  const localX = dx * c + dy * s
  const localY = -dx * s + dy * c
  const nearX = clamp(localX, -body.w / 2, body.w / 2)
  const nearY = clamp(localY, -body.h / 2, body.h / 2)
  return (localX - nearX) ** 2 + (localY - nearY) ** 2 <= radius ** 2
}

export function kickGlyph(body, pointerVX = 0, pointerVY = 0, contactX = body.x) {
  body.active = true
  body.held = false
  body.vx += clamp(pointerVX * .37, -580, 580)
  body.vy += clamp(pointerVY * .27 - 95, -440, 310)
  body.omega += clamp((contactX - body.x) / Math.max(12, body.w) * pointerVX * .006, -3, 3)
}

export function settled(bodies) {
  return bodies.every(body => !body.active || body.held || (
    Math.abs(body.vx) < 5 && Math.abs(body.vy) < 5 && Math.abs(body.omega) < .14
  ))
}

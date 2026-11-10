import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createGlyphBody, createStaticObstacle, FIXED_STEP, glyphHit, kickGlyph, settled, stepGlyphWorld,
} from '../src/lib/glyphPhysics.js'

const bounds = { left: 0, right: 600, top: 0, floor: 410 }

const run = (bodies, frames = 300, area = bounds) => {
  for (let i = 0; i < frames; i += 1) stepGlyphWorld(bodies, area, FIXED_STEP)
}

test('letters remain aligned until the mouse activates gravity', () => {
  const body = createGlyphBody(100, 65, 52, 75)
  run([body], 200)
  assert.equal(body.y, body.homeY)
  assert.equal(body.active, false)
})

test('released glyph falls, bounces and stays above the collision floor', () => {
  const body = createGlyphBody(100, 65, 52, 75)
  kickGlyph(body, 140, -80, 115)
  run([body], 420)
  const projection = Math.abs(Math.sin(body.angle)) * body.w / 2 +
    Math.abs(Math.cos(body.angle)) * body.h / 2
  assert.ok(body.y + projection <= bounds.floor + .01)
  assert.ok(body.y > 200)
  assert.ok(body.x > bounds.left && body.x < bounds.right)
  assert.ok(Math.abs(body.angle) > .02, 'the rigid body should rotate')
  assert.ok(settled([body]))
})

test('a falling glyph physically wakes another glyph on collision', () => {
  const upper = createGlyphBody(190, 80, 53, 60, 0)
  const lower = createGlyphBody(190, 208, 53, 60, 1)
  kickGlyph(upper, 0, 0, upper.x)
  run([upper, lower], 350)
  assert.equal(lower.active, true)
  assert.ok(lower.y > lower.homeY)
})

test('twelve released letters do not pass through floor or walls', () => {
  const bodies = Array.from({ length: 12 }, (_, i) => createGlyphBody(25 + i * 48, 55, 33, 60, i))
  bodies.forEach((body, index) => kickGlyph(body, (index - 5.5) * 8, -80, body.x + 7))
  run(bodies, 600)
  bodies.forEach(body => {
    const cos = Math.abs(Math.cos(body.angle)), sin = Math.abs(Math.sin(body.angle))
    const rx = cos * body.w / 2 + sin * body.h / 2
    const ry = sin * body.w / 2 + cos * body.h / 2
    assert.ok(body.y + ry <= bounds.floor + .01, 'glyph above floor')
    assert.ok(body.x - rx >= bounds.left - .01, 'inside left edge')
    assert.ok(body.x + rx <= bounds.right + .01, 'inside right edge')
    assert.ok(Number.isFinite(body.angle))
  })
})

test('hit testing accounts for rotation and circle radius', () => {
  const body = createGlyphBody(200, 140, 48, 80)
  body.angle = Math.PI / 4
  assert.equal(glyphHit(body, body.x, body.y), true)
  assert.equal(glyphHit(body, 350, 350, 5), false)
  assert.equal(glyphHit(body, body.x + 12, body.y + 12, 6), true)
})

test('falling letters collide with immovable editorial text before reaching section floor', () => {
  const textLabel = createStaticObstacle(220, 235, 180, 25, 'projects/process')
  const letter = createGlyphBody(220, 72, 42, 60)
  kickGlyph(letter, 0, 0, letter.x)
  const original = { x: textLabel.x, y: textLabel.y }
  for (let i = 0; i < 560; i += 1) {
    stepGlyphWorld([letter], { left: 0, right: 500, top: 0, floor: 900 }, FIXED_STEP, [textLabel])
  }
  assert.equal(textLabel.active, false)
  assert.deepEqual([textLabel.x, textLabel.y], [original.x, original.y])
  assert.ok(letter.y > letter.homeY, 'letter falls')
  assert.ok(letter.y + letter.h / 2 <= textLabel.y - textLabel.h / 2 + 2, 'letter rests on label')
  assert.ok(letter.y < 300, 'letter does not fall through label to the section floor')
})

import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { projects } from '../src/data/projects.js'
import { chapters } from '../src/data/chapters.js'
import { caseStudies, findCaseStudy } from '../src/data/caseStudies.js'
import { searchPortfolio, normalizeQuery } from '../src/lib/searchPortfolio.js'

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')

test('every featured project has a bilingual case study and a dedicated route', () => {
  assert.equal(caseStudies.length, projects.length)
  assert.equal(new Set(projects.map(project => project.slug)).size, projects.length)
  for (const project of projects) {
    const caseStudy = findCaseStudy(project.slug)
    assert.ok(caseStudy)
    assert.equal(caseStudy.path, '/projetos/' + project.slug)
    assert.match(project.url, /^https?:\/\//)
    for (const lang of ['pt', 'en']) {
      assert.ok(project.role?.[lang])
      assert.equal(caseStudy.narrative[lang].length, 4)
      assert.ok(caseStudy.narrative.next[lang])
    }
  }
})

test('all nine editorial chapters are unique and match the actual page order', () => {
  const expected = ['top','projects','about','experience','lab','notes','gallery','skills','contact']
  assert.deepEqual(chapters.map(chapter => chapter.id), expected)
  const app = source('src/App.jsx')
  const markers = [
    'section projects-section','section about-section','section experience-section',
    'className="lab-band"','<FieldNotes lang={lang}', 'section gallery-section',
    'section skills-section', 'section contact-section',
  ]
  let cursor = -1
  for (const marker of markers) {
    const next = app.indexOf(marker)
    assert.ok(next > cursor, 'out-of-order or absent section: '+marker)
    cursor = next
  }
})

test('search finds projects, technologies and chapters regardless of accents', () => {
  assert.equal(normalizeQuery('  TRAJETÓRIA '), 'trajetoria')
  assert.ok(searchPortfolio(chapters, projects, 'pt', 'React').some(item => item.target === 'project-typeee'))
  assert.ok(searchPortfolio(chapters, projects, 'pt', 'zumbido').some(item => item.target === 'project-zumbido'))
  assert.ok(searchPortfolio(chapters, projects, 'pt', 'prototipagem').some(item => item.target === 'project-monan'))
  assert.ok(searchPortfolio(chapters, projects, 'pt', 'contato').some(item => item.target === 'contact'))
  assert.equal(searchPortfolio(chapters, projects, 'en', 'unknown invented term').length, 0)
  assert.ok(searchPortfolio(chapters, projects, 'pt', '').every(item => item.type === 'section'))
})

test('deep links work without reenabling automatic Vercel deployments', () => {
  const config = JSON.parse(source('vercel.json'))
  assert.equal(config.git?.deploymentEnabled, false)
  assert.ok(config.rewrites?.some(entry => entry.source === '/projetos/:slug' && entry.destination === '/index.html'))
})

test('mobile project selection has an inline disclosure and a reachable case study', () => {
  const hero = source('src/components/ResponsiveHero.jsx')
  assert.match(hero, /print-index-mobile-detail/)
  assert.match(hero, /aria-expanded/)
  assert.match(hero, /onOpenCase/)
  const app = source('src/App.jsx')
  assert.match(app, /id=\{'project-'\+project.slug\}/)
  assert.match(app, /onClick=\{event=>openCase\(event,project.slug\)\}/)
})

test('gallery defers extra iframes until visitors request more', () => {
  const gallery = source('src/components/VisualGallery.jsx')
  assert.match(gallery, /useState\(false\)/)
  assert.match(gallery, /shown = expanded \? works : works.slice\(0, 5\)/)
  assert.match(gallery, /aria-expanded=\{expanded\}/)
  assert.match(gallery, /loading="lazy"/)
})

test('Vercel build uses root-absolute assets for direct case-study URLs', () => {
  assert.match(source('vite.config.js'), /base: '\/'/)
  const packageJson = JSON.parse(source('package.json'))
  assert.equal(packageJson.scripts['build:cin'], 'vite build --base=./')
})

test('fonts are linked from HTML rather than imported from the main stylesheet', () => {
  assert.doesNotMatch(source('src/styles/global.css'), /@import url\(['"]https:\/\/fonts.googleapis.com/)
  assert.match(source('index.html'), /fonts.googleapis.com\/css2/)
})

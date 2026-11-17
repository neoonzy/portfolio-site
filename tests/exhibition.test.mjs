import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
const source=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8')

test('homepage uses the nonlinear exhibition, not the previous landing page',()=>{
  const main=source('src/main.jsx')
  const exhibit=source('src/ExhibitionApp.jsx')
  assert.match(main,/import ExhibitionApp from '\.\/ExhibitionApp\.jsx'/)
  assert.doesNotMatch(main,/import App from '\.\/App\.jsx'/)
  for(const id of ['entrada','obras','metodo','constelacao','contato'])
    assert.match(exhibit,new RegExp("id: '"+id+"'"))
  assert.match(exhibit,/className="ex-rail"/)
  assert.match(exhibit,/className="ex-bottom-pips"/)
  assert.match(exhibit,/className="ex-hero-collage"/)
  assert.match(exhibit,/<KineticWordmark/)
  assert.match(exhibit,/className="ex-work-selector"/)
  assert.match(exhibit,/className="ex-atlas-field"/)
})

test('projects are authored content with routes and accessible alternatives',()=>{
  const exhibit=source('src/ExhibitionApp.jsx')
  assert.match(exhibit,/\/projetos\//)
  assert.match(exhibit,/<CaseStudyPage/)
  assert.match(exhibit,/aria-pressed=/)
  assert.match(exhibit,/aria-current=/)
  assert.match(exhibit,/target="_blank" rel="noopener noreferrer"/)
  assert.match(exhibit,/mailto:luiseduardolustosab@gmail.com/)
  assert.doesNotMatch(exhibit,/mailto:luiseduardolustosabrito@gmail.com/)
  assert.match(exhibit,/getButtons/)
  assert.match(exhibit,/event\.key==='Tab'/)
})

test('physical, typographic and responsive stations retain motion alternatives',()=>{
  const css=source('src/styles/exhibition.css')
  assert.match(css,/@media\(max-width:680px\)/)
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/)
  assert.match(css, /@media \(hover:none\), \(pointer:coarse\)/)
  assert.match(css,/\.ex-atlas-field/)
  assert.match(css,/\.ex-print-1/)
  assert.match(css,/\.ex-work-object/)
  assert.match(css,/\.ex-contact-main/)
  assert.doesNotMatch(css,/transition:\s*all/)
})

test('production remains untouched by git commits on this branch',()=>{
  const config=JSON.parse(source('vercel.json'))
  assert.equal(config.git?.deploymentEnabled,false)
  assert.ok(config.rewrites?.some(x=>x.source==='/projetos/:slug'))
})

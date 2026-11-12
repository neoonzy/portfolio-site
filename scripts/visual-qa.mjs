import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import assert from 'node:assert/strict'

const base = process.env.BASE_URL || 'http://127.0.0.1:4173'
await fs.mkdir('visual-qa-artifacts', { recursive: true })
const browser = await chromium.launch({ headless: true })
const sizes = [320,360,390,430,680,681,768,900,1120,1440]
try {
  for (const width of sizes) {
    const page = await browser.newPage({ viewport: { width, height: 844 }, deviceScaleFactor: 1 })
    await page.addInitScript(() => localStorage.setItem('luis-portfolio-language','pt'))
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => document.fonts?.ready)
    const geometry = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      fonts: [...document.querySelectorAll('.kinetic-word')].map(node => ({
        size: getComputedStyle(node).fontSize, x:node.getBoundingClientRect().left
      })),
      header: document.querySelector('.header')?.getBoundingClientRect().height,
    }))
    assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 2,
      `horizontal overflow at ${width}px: ${JSON.stringify(geometry)}`)
    if (width <= 680 && geometry.fonts.length === 2) {
      assert.equal(geometry.fonts[0].size, geometry.fonts[1].size, 'different name sizes at '+width)
      assert.ok(Math.abs(geometry.fonts[0].x - geometry.fonts[1].x) < 2, 'unaligned names at '+width)
    }
    if ([320,390,680,768,1440].includes(width))
      await page.screenshot({ path: `visual-qa-artifacts/hero-${width}.png`, fullPage:false })
    console.log('PASS viewport', width, geometry.viewportWidth)
    await page.close()
  }
  const page = await browser.newPage({ viewport: { width:390, height:844 } })
  await page.goto(base + '/', { waitUntil:'domcontentloaded' })
  await page.locator('.print-index-item').nth(1).click()
  assert.equal(await page.locator('.print-index-mobile-detail:not([hidden])').count(),1)
  await page.locator('.print-index-mobile-detail:not([hidden]) a').click()
  await page.waitForURL('**/projetos/zumbido')
  assert.match(await page.locator('#case-title').innerText(),/Zumbido/)
  await page.locator('.case-header a').first().click()
  await page.waitForURL('**/#projects')
  await page.locator('.quick-nav-trigger').click()
  await page.locator('#quick-nav-input').fill('React')
  assert.ok(await page.locator('.quick-nav-results').innerText().then(text=>text.includes('Typeee')))
  await page.locator('#quick-nav-input').fill('Zumbido')
  await page.locator('#quick-nav-input').press('Enter')
  await page.waitForURL('**/#project-zumbido')
  await page.locator('.gallery-load-more').click()
  assert.equal(await page.locator('.gallery-card').count(),9)
  await page.locator('.typeee-start').click()
  assert.equal(await page.evaluate(() => document.activeElement?.id),'typeee-preview-input')
  await page.locator('#typeee-preview-input').type('cidade ')
  assert.ok(await page.locator('.typeee-arena').innerText().then(text=>text.includes('002')))
  console.log('PASS navigation, mobile disclosures, routes, search, gallery and Typeee keyboard')
  await page.close()
} finally {
  await browser.close()
}

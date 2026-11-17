import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const base = process.env.BASE_URL || 'http://127.0.0.1:4173'
await fs.mkdir('exhibition-artifacts', { recursive: true })
const browser = await chromium.launch({headless:true})
try {
  for (const width of [320,360,390,430,680,768,1024,1440]) {
    const page = await browser.newPage({viewport:{width,height:860},deviceScaleFactor:1})
    const errors=[]
    page.on('pageerror',err=>errors.push(err.message))
    await page.goto(base+'/',{waitUntil:'domcontentloaded'})
    await page.evaluate(()=>document.fonts?.ready)
    await page.locator('.ex-wordmark h1').waitFor()
    const result=await page.evaluate(()=>({
      viewport:document.documentElement.clientWidth,
      content:document.documentElement.scrollWidth,
      names:[...document.querySelectorAll('.kinetic-word')].map(node=>({
        x:Math.round(node.getBoundingClientRect().left),
        font:getComputedStyle(node).fontSize
      }))
    }))
    assert.ok(result.content<=result.viewport+2, 'Horizontal overflow: '+width+': '+JSON.stringify(result))
    assert.equal(result.names.length,2)
    if(width<=680){
      assert.equal(result.names[0].font,result.names[1].font,'Different mobile name sizes at '+width)
      assert.ok(Math.abs(result.names[0].x-result.names[1].x)<=2,'Misaligned mobile wordmark at '+width)
    }
    assert.deepEqual(errors,[],'Runtime errors at '+width)
    if([320,390,768,1440].includes(width))await page.screenshot({path:'exhibition-artifacts/entry-'+width+'.png'})
    await page.close()
  }
  const desktop=await browser.newPage({viewport:{width:1440,height:900}})
  await desktop.goto(base+'/')
  await desktop.locator('.ex-enter-btn').click()
  assert.match(desktop.url(),/#obras$/)
  assert.equal(await desktop.locator('.ex-work-names button').count(),4)
  await desktop.locator('.ex-work-names button').nth(1).click()
  assert.match(await desktop.locator('.ex-work-info h2').innerText(),/Zumbido/)
  await desktop.screenshot({path:'exhibition-artifacts/work-desktop.png'})
  await desktop.locator('.ex-work-info-actions a').first().click()
  await desktop.waitForURL('**/projetos/zumbido')
  assert.match(await desktop.locator('#case-title').innerText(),/Zumbido/)
  await desktop.locator('.case-header a').first().click()
  await desktop.waitForURL('**/#obras')
  await desktop.keyboard.press('3')
  await desktop.locator('.ex-method-hero h1').waitFor()
  await desktop.locator('.ex-conveyor button').nth(3).click()
  assert.match(await desktop.locator('.ex-method-copy h2').innerText(),/EXPERIMENTAR|EXPERIMENT/)
  await desktop.locator('.ex-demo summary').click()
  await desktop.locator('#typeee-preview-input').waitFor()
  await desktop.screenshot({path:'exhibition-artifacts/workshop-desktop.png'})
  await desktop.keyboard.press('4')
  await desktop.locator('.ex-atlas-node').nth(1).click()
  assert.match(await desktop.locator('.ex-atlas-caption h2').innerText(),/RUA|STREET/)
  await desktop.screenshot({path:'exhibition-artifacts/atlas-desktop.png'})
  await desktop.keyboard.press('5')
  assert.match(await desktop.locator('.ex-contact h1').innerText(),/BORA|LET/)
  await desktop.screenshot({path:'exhibition-artifacts/contact-desktop.png'})
  await desktop.keyboard.press('/')
  await desktop.locator('#ex-search-input').fill('typeee')
  assert.ok(await desktop.locator('.ex-search-results button').count()>0)
  await desktop.locator('.ex-map-header button').click()
  await desktop.close()

  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true})
  await mobile.goto(base+'/#obras',{waitUntil:'domcontentloaded'})
  await mobile.locator('.ex-work-info h2').waitFor()
  await mobile.screenshot({path:'exhibition-artifacts/work-mobile.png'})
  await mobile.locator('.ex-bottom-pips button').nth(2).click()
  await mobile.locator('.ex-method-hero h1').waitFor()
  await mobile.screenshot({path:'exhibition-artifacts/workshop-mobile.png'})
  await mobile.locator('.ex-bottom-pips button').nth(3).click()
  await mobile.locator('.ex-atlas-node').nth(2).click()
  await mobile.screenshot({path:'exhibition-artifacts/atlas-mobile.png'})
  await mobile.locator('.ex-bottom-pips button').nth(4).click()
  await mobile.screenshot({path:'exhibition-artifacts/contact-mobile.png'})
  await mobile.locator('.ex-menu-button').click()
  assert.equal(await mobile.locator('.ex-sitemap').count(),1)
  await mobile.locator('.ex-map-links button').nth(0).click()
  await mobile.locator('.ex-entrance-mark').waitFor()
  console.log('PASS: 8 viewports, 5 stations, keyboard, search, cases, Typeee, mobile index')
} finally {
  await browser.close()
}

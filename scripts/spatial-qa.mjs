import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'

const origin=process.env.BASE_URL||'http://127.0.0.1:4173'
await fs.mkdir('spatial-qa', {recursive:true})
const browser=await chromium.launch({headless:true})
const rooms=['entrada','arquivo','laboratorio','caderno','pessoa','contato']
try{
  for(const width of [320,360,390,430,680,768,1024,1440]){
    const page=await browser.newPage({viewport:{width,height:880},deviceScaleFactor:1})
    await page.goto(origin,{waitUntil:'domcontentloaded'})
    await page.evaluate(()=>document.fonts.ready)
    const sizes=await page.locator('.kinetic-word').evaluateAll(nodes=>nodes.map(n=>getComputedStyle(n).fontSize))
    assert.equal(sizes.length,2,'kinetic name must contain two words')
    if(width<=680)assert.equal(sizes[0],sizes[1],'first and last names differ at '+width)
    const measurements=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}))
    assert.ok(measurements.scroll<=measurements.width+2,'horizontal overflow '+width+' '+JSON.stringify(measurements))
    for(const room of rooms){
      await page.goto(origin+'/#'+room,{waitUntil:'domcontentloaded'})
      await page.waitForSelector('.sp-site-'+room)
      if(room==='arquivo') await page.waitForFunction(() =>
        [...document.querySelectorAll('.sp-specimen-visual img')].every(img=>img.complete && img.naturalWidth>0),
        { timeout:10000 }
      )
      assert.equal(await page.locator('.sp-site-'+room).count(),1)
      const d=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}))
      assert.ok(d.scrollWidth<=d.clientWidth+2,'overflow '+width+' '+room+' '+JSON.stringify(d))
      if([390,1440].includes(width)){
        await page.screenshot({path:`spatial-qa/${room}-${width}.png`,fullPage:false,animations:'disabled'})
      }
    }
    await page.close()
    console.log('PASS / rooms + viewport',width)
  }
  const desktop=await browser.newPage({viewport:{width:1440,height:900}})
  await desktop.goto(origin+'/#arquivo')
  const inspector=desktop.locator('.sp-inspector h2')
  await desktop.locator('.sp-specimen').nth(1).click()
  await assert.doesNotReject(()=>inspector.getByText('Zumbido.cc').waitFor())
  await desktop.screenshot({path:'spatial-qa/archive-selected-desktop.png',fullPage:false})
  await desktop.keyboard.press('4')
  await desktop.waitForSelector('.sp-site-caderno')
  await desktop.locator('.sp-book-navigation>button').last().click()
  assert.match(await desktop.locator('.sp-book-right h2').innerText(),/ARQUIVO/)
  await desktop.keyboard.press('m')
  await desktop.locator('.sp-map[open]').waitFor({state:'visible'})
  await desktop.screenshot({path:'spatial-qa/site-map-desktop.png',fullPage:false})
  await desktop.locator('.sp-map-inner>button').last().click()
  await desktop.waitForSelector('.sp-site-contato')
  const copied=desktop.locator('.sp-contact-actions button')
  await assert.doesNotReject(()=>copied.waitFor())
  await desktop.close()

  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true})
  await mobile.goto(origin+'/#entrada')
  await mobile.locator('.sp-mobile-dock button').nth(1).click()
  await mobile.waitForSelector('.sp-site-arquivo')
  await mobile.locator('.sp-specimen').nth(2).click()
  await mobile.locator('.sp-project-sheet[open]').waitFor({state:'visible'})
  assert.match(await mobile.locator('.sp-project-sheet h2').innerText(),/Mapeia/)
  await mobile.screenshot({path:'spatial-qa/project-sheet-mobile.png',fullPage:false})
  await mobile.locator('.sp-inspector-close').click()
  await mobile.locator('.sp-mobile-map-trigger').click()
  await mobile.locator('.sp-map[open]').waitFor({state:'visible'})
  await mobile.locator('.sp-map-inner>button').nth(2).click()
  await mobile.waitForSelector('.sp-site-laboratorio')
  await mobile.locator('#typeee-preview-input').fill('cidade ')
  assert.equal(await mobile.locator('.sp-site-laboratorio').count(),1)
  console.log('PASS / desktop keyboard, mobile dock, archive and map')
  await mobile.close()
} finally{
  await browser.close()
}

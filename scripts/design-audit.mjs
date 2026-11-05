import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
await mkdir('qa',{recursive:true});
try {
  for (const width of [360,768,1280]) {
    const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4173',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`qa/hero-${width}.png`});
    for(const section of ['rooms','facilities','gallery','contact']) {
      await page.goto((process.env.TEST_BASE_URL || 'http://127.0.0.1:4173')+'/'+section,{waitUntil:'networkidle'});
      await page.locator(`#${section}`).evaluate(el=>el.scrollIntoView({block:'start'}));
      await page.screenshot({path:`qa/${section}-${width}.png`});
    }
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4173',{waitUntil:'networkidle'});
    await page.screenshot({path:`qa/design-${width}.png`,fullPage:true});
    console.log(JSON.stringify({width,overflow:await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1);}).map(el=>({tag:el.tagName,class:el.className,text:el.textContent.slice(0,70)})).slice(0,12))}));
    await page.close();
  }
} finally {await browser.close();}

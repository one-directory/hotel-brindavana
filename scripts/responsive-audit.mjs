import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const baseURL=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'})});
const sizes=[[320,740],[390,844],[600,900],[768,1024],[820,1180],[844,390],[1024,768],[1440,1000],[1920,1080],[2560,1440]];
const routes=['/','/rooms','/facilities','/gallery','/contact'];
const report=[];
try {
  await mkdir('qa/client-review',{recursive:true});
  for(const [width,height] of sizes){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const route of routes){
      const response=await page.goto(baseURL+route,{waitUntil:'networkidle'});
      if(!response?.ok())throw Error('Page failed: '+route);
      await page.evaluate(()=>document.fonts.ready);
      const overflow=await page.evaluate(()=>[...document.querySelectorAll('main *, header *, footer *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left< -1||r.right>innerWidth+1)}).map(e=>e.className).slice(0,5));
      if(overflow.length)throw Error(JSON.stringify({width,height,route,overflow}));
      if(await page.locator('h1').count()!==1)throw Error('Heading count: '+route);
      if(width<=768){await page.getByRole('button',{name:'Open navigation'}).click();await page.locator('#mobile-nav a').first().focus();await page.keyboard.press('Escape');if(await page.locator('#mobile-nav').count())throw Error('Menu did not close');}
      if([390,768,1440].includes(width)){
        await page.locator('main img').evaluateAll(async images=>{images.forEach(i=>i.loading='eager');await Promise.all(images.map(i=>i.decode()));});
        await page.screenshot({path:'qa/client-review/'+(route.slice(1)||'home')+'-'+width+'.png',fullPage:true});
      }
      report.push({width,height,route,status:'passed'});
    }
    if(errors.length)throw Error(errors.join('\n'));
    await page.close();console.log(width+'x'+height+': all five pages passed');
  }
  await writeFile('qa/client-review/responsive-report.json',JSON.stringify(report,null,2));
} finally {await browser.close();}

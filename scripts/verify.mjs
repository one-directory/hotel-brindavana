import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const routes = [
  {path:'/',id:'home',name:'Home',content:'A stay in'},
  {path:'/rooms',id:'rooms',name:'Rooms',content:'Standard AC Rooms'},
  {path:'/facilities',id:'facilities',name:'Facilities',content:'Family Restaurant'},
  {path:'/gallery',id:'gallery',name:'Gallery',content:'Hotel Brindavana'},
  {path:'/contact',id:'contact',name:'Contact',content:'+91 9743545550'},
];
const manifest=JSON.parse(await readFile('.next/prerender-manifest.json','utf8'));
const sitemap=await (await fetch(baseURL+'/sitemap.xml')).text();
const sitemapPaths=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
for(const route of routes) {
  if(manifest.routes[route.path])throw Error('Route must use request-time SSR: '+route.path);
  const response=await fetch(baseURL+route.path);
  if(!response.ok)throw Error('HTTP '+response.status+' at '+route.path);
  if(!response.headers.get('cache-control')?.includes('no-store'))throw Error('Expected uncached SSR: '+route.path);
  const html=(await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
  if(!html.includes(route.content))throw Error('Missing initial HTML content: '+route.path);
  if(!html.includes('id="'+route.id+'"'))throw Error('Missing page section: '+route.path);
  const required = {'/':['home-rooms','home-facilities','home-gallery','home-visit'],'/rooms':['room-comparison'],'/facilities':['facility-details','event-spaces'],'/contact':['location','arrival-guide']};
  for(const id of required[route.path] || []) if(!html.includes('id="'+id+'"'))throw Error('Missing server-rendered section: '+id);
  if(route.path==='/gallery' && (html.match(/class="gallery-item /g)||[]).length!==11)throw Error('Expected 11 selected gallery images');
  if(!sitemapPaths.includes(route.path))throw Error('Missing sitemap entry: '+route.path);
}
console.log('All five pages: HTTP 200, request-time SSR, initial HTML and sitemap entries verified');
const oldLocation=await fetch(baseURL+'/location',{redirect:'manual'});
if(oldLocation.status!==308 || oldLocation.headers.get('location')!=='/contact#location')throw Error('Location redirect failed');
if(sitemapPaths.includes('/location'))throw Error('Redirect route included in sitemap');
console.log('Location redirects permanently to the map on Contact');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const errors=[];
try {
  await mkdir('qa',{recursive:true});
  const noJS=await browser.newPage({javaScriptEnabled:false,viewport:{width:360,height:900}});
  for(const route of routes) {
    await noJS.goto(baseURL+route.path,{waitUntil:'domcontentloaded'});
    if(!await noJS.locator('#'+route.id).isVisible())throw Error('Content requires JavaScript: '+route.path);
    if(await noJS.locator('h2 em, h3 em, .hero-topline, .eyebrow, .section-label').count())throw Error('Repeated decorative headings or labels');
    if(route.path==='/') {
      const previews=noJS.locator('#home-rooms img');
      if(await previews.count()!==2)throw Error('Missing room preview images');
      await previews.evaluateAll(async images=>{await Promise.all(images.map(img=>img.decode())); if(images.some(img=>!img.naturalWidth || img.getBoundingClientRect().height<100 || img.loading!=='eager'))throw Error('Room previews must load without JavaScript or scrolling');});
    }
    if(route.path==='/contact') {
      const frame=noJS.locator('#location iframe');
      if(!await frame.isVisible() || !(await frame.getAttribute('src')).includes('Hotel%20Brindavana%20Santhekatte%20Kallianpur'))throw Error('Map missing or wrong query');
      if(!await noJS.getByRole('link',{name:'Open in Google Maps',exact:true}).isVisible())throw Error('Map button missing');
    }
    if(await noJS.locator('h1').count()!==1)throw Error('Expected one H1: '+route.path);
    if(route.path!=='/gallery' && !await noJS.locator('a[href^="https://wa.me/"]').first().getAttribute('href'))throw Error('Missing enquiry link');
    const expectedWhatsApp=route.path==='/' || route.path==='/contact' ? 2 : 1;
    if(await noJS.locator('a[href^="https://wa.me/"]').count()!==expectedWhatsApp)throw Error('Incorrect WhatsApp placements: '+route.path);
    if(await noJS.locator('header a[href^="tel:"]').count()!==1)throw Error('Header phone missing');
    if(await noJS.locator('header a[href^="https://wa.me/"], footer a[href^="https://wa.me/"], .room-card a[href^="https://wa.me/"]').count())throw Error('Unwanted WhatsApp CTA');
    if(route.path==='/rooms') {
      if(await noJS.getByRole('link',{name:'Ask about rates',exact:true}).count()!==2)throw Error('Missing rate links');
      if((await noJS.locator('main').innerText()).match(/Rates on request/g)?.length!==1)throw Error('Rates note should appear once');
    }
    const canonical=await noJS.locator('link[rel="canonical"]').getAttribute('href');
    if(new URL(canonical).pathname!==route.path)throw Error('Wrong canonical URL: '+route.path);
    for(const other of routes) {
      if(!await noJS.getByRole('navigation',{name:'Footer navigation'}).getByRole('link',{name:other.name,exact:true}).getAttribute('href').then(href=>href===other.path))throw Error('Wrong footer route');
    }
  }
  await noJS.close();
  console.log('All five pages readable without JavaScript; unique page headings and canonicals verified');
  for(const width of [360,768,1280]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    page.on('pageerror',error=>errors.push(error.message));
    for(const route of routes) {
      await page.goto(baseURL+route.path,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow at '+width+' on '+route.path);
      const smallText=await page.locator('main p, main dd, main td, main th, main li, main summary').evaluateAll(elements=>elements.filter(el=>el.getBoundingClientRect().height && parseFloat(getComputedStyle(el).fontSize)<16).map(el=>el.textContent));
      if(smallText.length)throw Error('Body text below 16px: '+smallText.join(', '));
      if(route.path==='/gallery') {
        if(await page.locator('.gallery-caption small').count())throw Error('Small gallery labels remain');
        if(await page.locator('img[src*="party-hall-06"], img[src*="party-hall-07"]').count())throw Error('Blue-lit photo remains');
      }
      if(await page.locator('h1').count()!==1)throw Error('Incorrect heading count');
      if(width<=768) {
        await page.getByRole('button',{name:'Open navigation'}).click();
        if(await page.locator('#mobile-nav a[aria-current="page"]').textContent().then(text=>!text.includes(route.name)))throw Error('Incorrect mobile active link');
        await page.keyboard.press('Escape');
        // Move focus into the menu before using its Escape handler.
        if(await page.locator('#mobile-nav').count()) {
          await page.locator('#mobile-nav a').first().focus();
          await page.keyboard.press('Escape');
        }
        if(await page.locator('#mobile-nav').count())throw Error('Menu did not close');
      } else if(await page.locator('.desktop-nav a[aria-current="page"]').textContent()!==route.name)throw Error('Incorrect desktop active link');
      await page.locator('main img').evaluateAll(async images => { for (const img of images) { img.loading='eager'; } await Promise.all(images.map(img => img.decode())); });
      const broken=await page.locator('img').evaluateAll(images=>images.filter(image=>image.complete&&image.naturalWidth===0).map(image=>image.src));
      if(broken.length)throw Error('Broken image: '+broken.join(', '));
      await page.screenshot({path:'qa/'+route.id+'-'+width+'.png',fullPage:true});
    }
    await page.goto(baseURL+'/contact',{waitUntil:'networkidle'});
    for(const [choice,phrase] of [['AC','Standard AC Rooms'],['Non-AC','Standard Non-AC Rooms'],['Function','Party Hall and Lawn']]) {
      await page.getByRole('radio',{name:choice,exact:true}).check();
      const href=await page.locator('.contact-enquiry a').getAttribute('href');
      if(!new URL(href).searchParams.get('text').includes(phrase))throw Error('Wrong WhatsApp message for '+choice);
    }
    await page.goto(baseURL,{waitUntil:'networkidle'});
    await page.evaluate(()=>{window.__documentMarker='old document';});
    if(width<=768) {
      await page.getByRole('button',{name:'Open navigation'}).click();
      await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Rooms',exact:true}).click();
    } else {
      await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Rooms',exact:true}).click();
    }
    await page.waitForURL(baseURL+'/rooms');
    await page.waitForLoadState('networkidle');
    if(await page.evaluate(()=>window.__documentMarker))throw Error('Navigation reused SPA document');
    if(await page.locator('.room-card').count()!==2)throw Error('Incorrect room count');
    await page.getByRole('button',{name:'Next Standard AC Rooms photo',exact:true}).click();
    await page.getByRole('button',{name:'Enlarge Standard AC Rooms photo 2'}).click();
    await page.keyboard.press('ArrowRight');
    if(!await page.locator('.lightbox-controls').innerText().then(text=>text.includes('3 / 4')))throw Error('Lightbox navigation failed');
    for(let tab=0;tab<5;tab++) {
      await page.keyboard.press('Tab');
      if(!await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)))throw Error('Focus escaped modal');
    }
    await page.keyboard.press('Escape');
    if(await page.locator('dialog').isVisible())throw Error('Escape failed');
    if(!await page.getByRole('button',{name:'Enlarge Standard AC Rooms photo 2'}).evaluate(el=>el===document.activeElement))throw Error('Focus not restored');
    if(width===1280) {
      for(const [name,count] of [['Standard Non-AC Rooms',2],['Standard AC Rooms',4]]) {
        const card=page.locator('.room-card').filter({has:page.getByRole('heading',{name:name.replace(' Rooms',' rooms'),exact:true})});
        const seen=new Set();
        for(let photo=0;photo<count;photo++) {
          await card.getByRole('button',{name:'Next '+name+' photo',exact:true}).click();
          const img=card.locator('.room-enlarge img');
          await img.evaluate(image=>image.decode());
          seen.add(await img.getAttribute('src'));
        }
        if(seen.size!==count)throw Error('Missing supplied photos');
      }
    }
    await page.goto(baseURL+'/gallery',{waitUntil:'networkidle'});
    await page.getByRole('button',{name:'Enlarge Standard AC room photo'}).click();
    await page.getByRole('button',{name:'Close photo viewer'}).click();
    await page.goBack({waitUntil:'networkidle'});
    if(new URL(page.url()).pathname!=='/rooms')throw Error('Back navigation failed');
    console.log(width+'px: five layouts, active links, full-page navigation, history and photo controls passed');
    await page.close();
  }
  if(errors.length)throw Error(errors.join('\n'));
} finally {await browser.close();}

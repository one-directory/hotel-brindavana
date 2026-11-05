// Original three-ink vector placeholders. These do not depict the real hotel.
import { mkdir, writeFile } from 'node:fs/promises';
const directory = 'public/images/illustrations';
await mkdir(directory, { recursive: true });
await mkdir('public/images/rooms', { recursive: true });
const ink = '#6b1f2a', paper = '#eee3cc', gold = '#c99d51';
function svg(title, content, width=800, height=560) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${title} — conceptual illustration, not the actual hotel</title><rect width="100%" height="100%" fill="${paper}"/><g stroke="${ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${content}</g></svg>`;
}
const palm = `<path d="M82 525Q120 354 192 250" fill="none" stroke-width="6"/><path d="M183 270Q93 185 35 234Q100 239 183 270ZM179 282Q80 241 26 292Q112 278 179 282ZM169 304Q68 297 25 362Q100 325 169 304ZM181 267Q182 161 234 137Q216 208 181 267ZM179 283Q256 190 300 220Q242 237 179 283ZM169 304Q255 241 288 284Q224 282 169 304Z" fill="${ink}" stroke="none"/>`;
await writeFile(`${directory}/hospitality.svg`, svg('A doorway and a palm, a study in hospitality', `
<rect x="23" y="23" width="594" height="674" fill="none" stroke-opacity=".35"/>
<circle cx="479" cy="153" r="67" fill="${gold}" stroke="none"/>
<path d="M91 558V190H550V558" fill="${gold}" fill-opacity=".22"/>
<path d="M91 190H550M91 207H550M91 535H550M78 558H564M64 580H578M49 603H592" fill="none"/>
<path d="M209 535V319A112 112 0 0 1 433 319V535Z" fill="${ink}"/>
<path d="M223 535V320A98 98 0 0 1 419 320V535" fill="none" stroke="${paper}"/>
<path d="M247 535V322A74 74 0 0 1 395 322V535Z" fill="${paper}"/>
<path d="M260 535V324A61 61 0 0 1 382 324V535Z" fill="${gold}"/>
<path d="M321 263V535M260 349H382M271 365H309V485H271ZM333 365H371V485H333Z" fill="none"/>
<circle cx="308" cy="432" r="3" fill="${ink}"/><circle cx="334" cy="432" r="3" fill="${ink}"/>
<path d="M107 229H176V418H107ZM465 229H534V418H465ZM117 245H166M117 263H166M117 281H166M117 299H166M117 317H166M117 335H166M117 353H166M117 371H166M117 389H166M475 245H524M475 263H524M475 281H524M475 299H524M475 317H524M475 335H524M475 353H524M475 371H524M475 389H524" fill="none"/>
<path d="M247 558H395M223 580H419M199 603H443M320 604V648M199 648H443M144 670H496M219 604L190 696M421 604L450 696" fill="none" stroke-opacity=".4"/>
<g transform="translate(-32 60) scale(.8)">${palm}</g>
<path d="M58 528H121L111 579H70Z" fill="${ink}"/>
<path d="M500 540Q476 486 492 464Q511 476 514 511Q517 463 540 447Q553 483 530 523Q550 490 572 491Q568 520 538 541" fill="${ink}"/>
<path d="M494 539H553L544 580H503Z" fill="${gold}"/>
<path d="M75 638H149M491 638H565" stroke-opacity=".5"/>
`,640,720));
function roomScene(variant, ac) {
  if (variant === 2) return `
    <path d="M0 452H800M105 0V452M105 452L0 539" fill="none" stroke-opacity=".3"/>
    <path d="M225 80H575V374H225Z" fill="${gold}" fill-opacity=".2"/>
    <path d="M225 80H575V374H225ZM400 80V374M225 226H575M240 359Q305 284 350 316T467 301T560 284" fill="none"/>
    <path d="M192 61H609M204 78L171 397H246L277 78M524 78L553 397H629L593 78" fill="${paper}"/>
    <path d="M218 92L194 384M240 92L218 384M550 92L571 384M574 92L600 384" stroke-opacity=".3"/>
    <path d="M290 391H512V413H290ZM303 413V468M499 413V468" fill="${ink}"/>
    <path d="M326 380H377L368 356H335ZM448 388V338M426 338H470L461 307H434Z" fill="${gold}"/>
    <path d="M173 499H633" stroke-opacity=".3"/>
    ${ac?`<rect x="629" y="114" width="118" height="33" fill="${paper}"/><path d="M642 137H735"/>`:''}`;
  if (variant === 3) return `
    <path d="M0 450H800M584 0V450L800 551" fill="none" stroke-opacity=".3"/>
    <path d="M52 331V150Q52 127 75 127H332Q355 127 355 150V331" fill="${gold}"/>
    <path d="M67 146H341M67 169H341M67 192H341M67 215H341M67 238H341" stroke-opacity=".3"/>
    <path d="M32 297H354L433 404H0V351Z" fill="${paper}"/>
    <path d="M54 275H165L142 329H21ZM195 275H303L340 329H213Z" fill="${paper}"/>
    <path d="M0 371H409L433 404H0Z" fill="${gold}"/>
    <path d="M0 404H433V444H0ZM410 444V472" fill="${ink}"/>
    <path d="M476 322H666V343H476ZM491 343V466M651 343V466M490 379H652" fill="${paper}"/>
    <path d="M546 322V235M507 235H588L573 178H522Z" fill="${gold}"/>
    <path d="M611 319V295H639V319M591 320H647" fill="none"/>
    <path d="M96 505H706" stroke-opacity=".3"/>`;
  const shift = variant===2 ? -30 : variant===3 ? 22 : 0;
  return `<path d="M0 430H800M90 0V430M90 430L0 520" fill="none" stroke-opacity=".35"/>
  <rect x="510" y="61" width="188" height="239" fill="${gold}" fill-opacity=".24"/>
  <path d="M510 61H698V300H510ZM604 61V300M510 172H698" fill="none"/>
  <path d="M523 282Q565 227 594 257T685 209M523 275L685 275" stroke-opacity=".4" fill="none"/>
  <path d="M497 54H710M499 62L480 320H525L539 62M667 62L680 320H724L705 62" fill="${paper}"/>
  <g transform="translate(${shift} 0)">
  <path d="M167 302V226Q167 202 191 202H423Q447 202 447 226V302" fill="${gold}"/>
  <path d="M180 219H434M180 236H434M180 253H434M180 270H434" stroke-opacity=".35"/>
  <path d="M167 291H447L533 402H103Z" fill="${paper}"/>
  <path d="M103 402H533V440H103ZM116 440V466M519 440V466" fill="${ink}"/>
  <path d="M188 275H272L264 316H168ZM293 275H385L409 316H309Z" fill="${paper}"/>
  <path d="M146 346H490L533 402H103Z" fill="${gold}"/>
  <path d="M175 346L135 402M198 346L163 402M220 346L191 402M242 346L219 402M264 346L247 402M286 346L275 402M308 346L303 402M330 346L331 402M352 346L359 402M374 346L387 402M396 346L415 402M418 346L443 402M440 346L471 402M462 346L499 402" fill="none" stroke-opacity=".35"/>
  <path d="M562 351H668V370H562ZM574 370V440M656 370V440M589 350V282M568 282H611L603 251H576Z" fill="${paper}"/>
  </g>
  ${ac?`<rect x="183" y="75" width="223" height="48" rx="3" fill="${paper}"/><path d="M198 109H391M367 89H387"/>`:`<path d="M292 39V82M292 82Q245 48 218 70Q229 94 292 82ZM292 82Q338 47 365 70Q350 95 292 82ZM292 82Q268 123 294 145Q322 128 292 82Z" fill="${ink}"/>`}
  <path d="M84 492H672M117 510H740" stroke-opacity=".25"/>`;
}
for(const ac of [false,true])for(const variant of [1,2,3])await writeFile(`public/images/rooms/standard-${ac?'ac':'non-ac'}-${variant}.svg`,svg('Room study; furnishings and layout are illustrative',roomScene(variant,ac)));
await writeFile(`${directory}/restaurant.svg`,svg('A table set for company',`
<path d="M70 80H730M70 92H730" stroke-opacity=".3"/>
<path d="M205 18V140M595 18V140M162 184Q162 135 205 135Q248 135 248 184ZM552 184Q552 135 595 135Q638 135 638 184Z" fill="${gold}"/>
<path d="M126 354V250Q126 233 143 233H204Q220 233 220 250V354M580 354V250Q580 233 597 233H658Q675 233 675 250V354" fill="${gold}" fill-opacity=".3"/>
<path d="M135 266H210M135 284H210M590 266H665M590 284H665"/>
<ellipse cx="400" cy="333" rx="268" ry="75" fill="${paper}"/>
<path d="M132 333V369Q400 483 668 369V333M184 388V476M618 388V476" fill="${gold}"/>
<ellipse cx="400" cy="333" rx="268" ry="75" fill="${paper}"/>
<ellipse cx="268" cy="334" rx="58" ry="21" fill="none"/><ellipse cx="268" cy="334" rx="42" ry="14" fill="none"/><ellipse cx="527" cy="334" rx="58" ry="21" fill="none"/><ellipse cx="527" cy="334" rx="42" ry="14" fill="none"/>
<path d="M194 313V356M184 313V331H204V313M598 312V355M610 313V356M351 282V311H369V282ZM430 282V311H448V282ZM384 306H418L412 264H390Z" fill="none"/>
<path d="M400 264V219M400 245Q369 219 376 208Q400 209 400 245M400 235Q423 210 432 215Q431 236 400 235" fill="${ink}"/>
<path d="M89 494H711" stroke-opacity=".3"/>
`));
await writeFile(`${directory}/lawn.svg`,svg('A garden gathering',`
<path d="M0 389Q230 352 456 393T800 376" fill="none"/>
<path d="M222 384V145H578V384M244 384V168H556V384" fill="none" stroke-width="4"/>
<path d="M222 145Q280 110 310 145T400 145T490 145T578 145M244 168Q292 190 333 168T422 168T511 168T556 168" fill="none"/>
<path d="M236 162Q252 236 230 302M566 162Q548 236 570 302" fill="none"/>
<g transform="translate(-46 -44) scale(.9)">${palm}</g>
<g transform="translate(846 -15) scale(-.85 .85)">${palm}</g>
<path d="M155 354V319H201V354M150 354H206V368H150ZM157 368V404M200 368V404M599 354V319H645V354M594 354H650V368H594ZM601 368V404M644 368V404" fill="${gold}"/>
<path d="M310 367H490L559 531H239Z" fill="${gold}" fill-opacity=".3"/>
<path d="M318 382H482M306 413H494M293 446H507M279 480H521M266 512H534" stroke-opacity=".3"/>
<path d="M33 447L38 434L43 447M91 476L96 463L101 476M678 454L683 441L688 454M731 491L736 478L741 491" fill="none"/>
`));
await writeFile(`${directory}/rooftop.svg`,svg('An open-air terrace study',`
<circle cx="614" cy="152" r="67" fill="${gold}" stroke="none"/>
<path d="M58 348H742V374H58ZM77 374V452M143 374V452M209 374V452M275 374V452M341 374V452M407 374V452M473 374V452M539 374V452M605 374V452M671 374V452M725 374V452M58 452H742" fill="none"/>
<path d="M80 324L80 285L122 262L164 285V324M187 324V246H255V324M274 324V280L319 253L364 280V324M385 324V217H448V324M470 324V267H553V324M570 324V285L618 264L666 285V324" fill="${gold}" fill-opacity=".22" stroke-opacity=".35"/>
<ellipse cx="400" cy="396" rx="93" ry="24" fill="${paper}"/><path d="M400 420V485M359 485H441M392 395V367M392 367L369 345M392 367L410 340" fill="none"/>
<path d="M237 412V366Q237 352 251 352H279V412M237 412H303V431H237M244 431V482M294 431V482M497 412H563V431H497M505 431V482M556 431V482M563 412V366Q563 352 549 352H521V412" fill="${paper}"/>
<path d="M60 507H742" stroke-opacity=".3"/>
`));
console.log('Created 10 original SVG illustration placeholders.');

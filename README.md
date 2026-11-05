# Hotel Brindavana

A responsive Next.js App Router website with TypeScript, Tailwind CSS and request-time SSR. Every marketing route uses `dynamic = 'force-dynamic'`. Content is delivered in the initial HTML; only the mobile menu, photo carousels and accessible lightbox hydrate. No booking engine, payments, accounts, forms, database or API routes. Enquiries open WhatsApp or a phone call.

## Pages

| Navigation | URL | Content |
|---|---|---|
| Home | `/` | Exterior banner, welcome, room previews, dining, gatherings, photographs and visit details |
| Rooms | `/rooms` | Both room categories, all room photos, comparison, stay questions and rate enquiries |
| Facilities | `/facilities` | Dining details, everyday services, venue information and gathering enquiries |
| Gallery | `/gallery` | 12 selected views grouped by exterior, Non-AC rooms, AC rooms, restaurant and party hall |
| Contact | `/contact` | Telephone, WhatsApp, address, map, directions, arrival guidance, room/dining/event enquiries and common questions |

Each page has its own title, description, canonical URL and sitemap entry. Header, footer, mobile navigation and enquiry controls are shared. Links deliberately use ordinary HTML anchors for full document requests, rather than SPA navigation. Room and venue links also target the relevant section on their dedicated page.

## Run and deploy

Requires Node.js 20.9+.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Use `npm.cmd` in Windows PowerShell if script execution is restricted.

```sh
npm run lint
npm run build
npm run typecheck
npm start
```

Production uses `.next/`; development uses `.next-dev/` to avoid conflicts. Fonts are downloaded at build time by next/font and self-hosted. next/image handles responsive image optimization and lazy loading; the hero is prioritised.

- Vercel: use this folder as root and the Next.js framework preset.
- Netlify: use its Next.js server runtime integration, build command `npm run build`, output `.next`.
- Node hosting: build and run `npm start`; configure the hostname binding as appropriate (the local script binds to 127.0.0.1).
- Static-only hosting and the obsolete `out/` export cannot serve this SSR version.
- Set `NEXT_PUBLIC_SITE_URL` to the deployed origin before building. The existing Sites fallback is reserved but not published. Sites deployment would require a compatible server runtime integration.

## Content and photographs

- `src/config/site.ts`: telephone, WhatsApp, address, times, messages, room descriptions, photo ordering, photo captions and gallery entries.
- `src/config/pages.ts`: page URLs, navigation labels and route-specific metadata.
- `src/components/hotel.tsx`: shared chrome and main server-rendered sections.
- `src/components/page-content.tsx`: homepage previews and expanded page content, with native FAQ disclosures.
- `src/components/interactions.tsx`: menu, carousels and keyboard-accessible modal.
- `src/app/globals.css`: editorial typography, maroon/ivory palette, responsive layouts and thin gold rules.
- `src/app/layout.tsx`: metadata and social preview. `src/app/page.tsx`: Hotel JSON-LD; update its structured address if the hotel address changes.
- `public/images/hero.png`: supplied hotel exterior, used for the home banner and social preview.
- `public/images/rooms/AC/`: all 11 supplied AC photos, with the room views first.
- `public/images/rooms/NON-AC/`: all four supplied Non-AC photos, with the room views first.

The supplied filenames are preserved. Change their source paths and captions in the config if renaming them. All 27 room, restaurant and party hall photos have AI exposure, color and clarity enhancements, saved as WebP in `public/images/enhanced/`; originals are preserved. The gallery contains 12 selected views across the exterior, rooms, restaurant and party hall. Room carousels show 6 selected room views; bathroom photos and near-identical views are excluded. Restaurant and hall photos also appear on Home and Facilities. Source mappings and enhancement prompts are documented in `public/images/enhanced/README.md`.

Icons are limited to phone, map pin, menu and the official WhatsApp glyph. Previous/Next/Close controls use text. The WhatsApp artwork is unchanged from Meta's official asset pack; see `public/brand/README.md`. Smooth anchor scrolling is the only motion treatment, disabled with reduced motion. No stats strip, decorative icon grids, gradients or automatic animation.

Confirm category-specific amenities and the Google Maps pin before launch. Rates stay “Rates on request.” Kitchens are only described as available in some rooms. The map includes a direct-link fallback.

## Verification

Build and start the production server, then run `npm run verify`. Install a Playwright Chromium browser or set `CHROME_PATH` to an existing executable. Set `TEST_BASE_URL` for a non-default address.

Checks cover all six direct URLs, uncached SSR, content with JavaScript disabled, one primary heading per page, canonical URLs, sitemap entries, active navigation, full document navigation and browser history. Responsive checks at 360/768/1280px also exercise room carousels, all supplied room images, gallery modal and focus containment/restoration. `node scripts/design-audit.mjs` captures the hero and individual pages (default port 4173). Captures are in `qa/`.

Lighthouse scores are not measured. Google Maps may be blocked in the preview environment; confirm the pin in a normal browser.

Location information is part of Contact at /contact#location. The former /location URL permanently redirects there; navigation and the sitemap list five pages.

## Client layout review - 30 October 2026

Final spacing and responsive rules are in `src/app/responsive.css`, imported after the base styles. The site uses consistent section spacing, aligned photo rows, readable body text and stacked tablet layouts. The gallery exterior remains uncropped and the hero retains its Day / Night switch. Enquiry buttons remain limited to their contextual locations.

Run `node scripts/responsive-audit.mjs` against the local preview (`TEST_BASE_URL` overrides the URL). It checks all five pages at 320, 390, 600, 768, 820, 844, 1024, 1440, 1920 and 2560 pixels, including landscape. Results and screenshots are saved in `qa/client-review/`. These are viewport checks in Chrome, not tests on every physical device.

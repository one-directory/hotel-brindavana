# Hotel Brindavana — current art direction

The hotel and its supplied photographs are the visual identity: a large exterior banner, maroon/ivory stationery colours, Kannada text, Cormorant Garamond headings and Inter body copy. Use an asymmetric desktop layout, generous purposeful whitespace and plain local copy about Santhekatte and Udupi.

The home banner uses `public/images/hero.png`. Mobile puts the exterior first. Alternating room rows show photographs from the correct AC and NON-AC folders. Every supplied room image is included. Gallery captions describe actual views. No illustrative or stock placeholders are rendered.

Facilities are grouped plain text with thin gold dividers. The events section is an asymmetric text invitation, because no venue images have been supplied. Check-in/out is a quiet text line, not a stats strip. No testimonials, invented distances, ratings or promotional statistics.

Functional icons only: phone, map pin, menu and the official unmodified WhatsApp glyph. No decorative arrows, leaves, facility icons, icon squares or emojis. Image controls say Previous, Next and Close. WhatsApp source provenance is in public/brand/README.md.

Smooth anchor scrolling is the sole motion treatment and respects reduced motion. No gradients, glassmorphism, floating decoration, glow, parallax or repeated scroll reveals.

SSR is preserved. Browser review covers 360px, 768px and 1280px, no horizontal overflow, keyboard-operable carousels/modal, focus restoration, no-JavaScript content and direct enquiries. Retain real asset filenames and never retouch hotel photos without a request. Confirm the map pin and room-specific amenities before publication.

## Page structure

The navbar now opens separate server-rendered pages: `/`, `/rooms`, `/facilities`, `/gallery`, `/contact`. Home introduces the whole hotel: exterior banner, welcome, staggered room previews, dining and gathering copy, photographs and visit details. Dedicated pages expand those previews with room comparisons and stay questions, facility descriptions, all 11 photos in collections, arrival guidance within Contact, and enquiry options for rooms, dining and functions. Shared navigation highlights the current page, with ordinary anchors requesting a new document rather than SPA routing. Each route has one H1, individual metadata, a canonical URL and a sitemap entry.

All five direct routes, no-JavaScript content, active links and layouts passed at 360/768/1280px. Browser navigation was verified to create a new document, with browser Back working and photo controls retaining their keyboard support.

Location information is part of Contact at /contact#location. The former /location URL permanently redirects there; navigation and the sitemap list five pages.

The roman-and-italic two-tone heading is reserved for the home hero. Other headings use a single upright style, sentence case and varied sizes. The header information strip and section eyebrow labels have been removed. Copy is factual, and primary call/enquiry actions are solid or outlined buttons. Home combines split content, staggered room previews, a full-width exterior photograph and an offset photo pair. Contact uses the real entrance photo for directions, with the embedded map in a native disclosure to avoid a blank panel before it loads. No new restaurant or venue photography was requested after clarification; only the supplied exterior and room photos are used.

## Day and night hero

The home hero has an explicit Day / Night photo switch. Day is the default. Night crossfades to the supplied hero-night.png after it loads; the day photo remains visible during loading or failure. A sliding control and caption identify the selected view. Motion respects reduced-motion preferences. This user-requested transition extends the earlier anchor-only motion guidance.

## Final responsive spacing

The final responsive stylesheet supersedes the earlier staggered-row guidance: paired room and home-gallery photos align at the top, and spacing follows a shared fluid scale. Tablet hero, room-detail and contact layouts stack to keep text readable. Body copy and navigation have comfortable sizes and controls retain keyboard focus and touch targets. The oversized home exterior banner is replaced by the compact services section. The gallery exterior is shown in full.

October 31 refinement: homepage room images load eagerly from public WebP files with intrinsic dimensions, without JavaScript or scroll activation. Gallery selection excludes the blue-lit hall, tilted room view, desk/wall shot and tilted restaurant entrance. All gallery thumbnails use 4:3 crops; full images remain available in the viewer. Captions have no numbered uppercase labels. Body text is at least 16px across both stylesheets, with muted text #4A4442. Contact embeds Google Maps directly, disambiguated with the supplied plus code, and has an Open in Google Maps button. Duplicate Contact FAQs and repetitive enquiry paragraphs were removed; room questions live under Before you enquire.

WhatsApp appears only in the floating link on every page, the Home hero and the main Contact enquiry. The Contact radio choices (AC, Non-AC, Function) update one prefilled WhatsApp link; its default AC message is server-rendered. Header contact is a telephone link. Room and hall enquiries use ordinary links to /contact, and Rates on request appears once in the Rooms introduction.

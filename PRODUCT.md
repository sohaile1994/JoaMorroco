# Product

## Register

brand

## Users

Travelers (couples, families, small friend groups of 2 to 7) planning a once-in-a-lifetime private tour of Morocco. They browse on their phones first, often from another continent, comparing a handful of operators. They are not bargain hunters; they are buying trust, taste, and the feeling of the trip before it happens. Secondary user: the owner-operator managing bookings.

## Product Purpose

JOA Morocco sells two completely private multi-day tours (The Kingdom of Morocco Tour, 11 days; Sahara Dreams, 8 days). One group at a time, one Mercedes Vito, a shared availability calendar. The site must do what a brochure cannot: make the visitor feel the journey (light, texture, distance) and then let them book it end-to-end with a real calendar, tiered pricing, and confirmation. Success = a visitor on a phone reaches "You're booked!" without ever feeling like they used a booking machine.

## Brand Personality

Warm, unhurried, personal. Three words: sunlit, storied, private. The voice of a well-traveled friend, not a travel agency. Emotional goals: wanderlust first, then trust. The register is travel-editorial: big photography, elegant serif display type (Playfair Display), warm sand and terracotta tones, journey motifs (dotted routes, dune horizons, arches) drawn as fine SVG linework.

## Anti-references

- Deal-site clutter (Viator, GetYourGuide): badge storms, urgency banners, prices shouting from every card.
- Corporate travel agency: sterile blues, globe icons, bland symmetric grids.
- Dark and moody themes: this brand lives in daylight; keep it sunlit and warm.
- Template/AI look: identical icon-card grids, gradient text, decorative blob heroes, glassmorphism.

## Design Principles

1. The photography is the product. Layout, color, and SVG decoration frame the imagery; they never compete with it.
2. Feel the journey. Motifs of travel (routes, horizons, arches, stamps) appear as quiet structural elements, not clip-art.
3. Mobile is the first canvas. Every section composes perfectly at 360px with zero horizontal scroll; desktop is the enhancement.
4. Alive but calm. Scroll reveals, gentle drift, slow zooms. Nothing bounces, nothing nags.
5. Private, not premium-generic. Warmth and specificity (real places, real days) over luxury clichés.

## Accessibility & Inclusion

- Respect prefers-reduced-motion (site-wide kill switch already in App.css; all new animation must inherit it).
- Text over imagery always carries a legibility gradient or scrim; contrast ≥ WCAG AA.
- Carousels must be operable by buttons and swipe, never horizontal page scroll; all controls keyboard-focusable with visible focus rings (already brand-colored).
- Decorative SVG is aria-hidden; informative imagery keeps meaningful alt text.

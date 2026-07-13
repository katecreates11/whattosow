# The Groundskeeper — weekly site health

**Date:** 2026-07-13
**Site:** whattosow.co.uk

First run of this report — no prior week to compare against.

## BROKEN

None found. Every internal page, referenced image, and directly-reachable affiliate/reference link returned a healthy status.

## UNVERIFIABLE — click-test manually (bot-blocked, not confirmed broken)

These merchants return `403` (or, for Amazon search pages, `202`) to automated requests — confirmed by checking their plain homepages too, which return the same code, so this is a domain-wide Cloudflare/bot-challenge, not evidence of a dead page. Worth a manual click-through since dead links here would be lost affiliate revenue, but nothing here is confirmed broken:

- **Suttons (suttons.co.uk)** — all `search?q=` seed-supplier links (used across every crop page's "buy seeds" panel, ~26 crops), plus two fixed product links:
  - `https://www.suttons.co.uk/garden-equipment/all/frost-protection-fleece_MH4728` (homepage + `/blight-watch` via BlightMap.tsx)
  - `https://www.suttons.co.uk/vegetable-fruit-plants/` (homepage)
- **Thompson & Morgan (thompson-morgan.com)** — all `search?q=` seed-supplier links (same ~26 crop pages).
- **Amazon search pages** (`amazon.co.uk/s?k=...`) — returned `202` rather than `200`. This reads as a soft bot-challenge (Amazon's async-render response), not a 404. Amazon's `dp/{ASIN}` product links (25 unique ASINs checked across kit.ts, crop-kit.ts, crop-playbooks.ts, editorial-posts.ts, WateringBuyerNote.tsx) all returned a clean `200`, so the product-level links are healthy — it's specifically the keyword-search links (raised beds, greenhouses, water butts, compost bins, propagators, polytunnels, plus the blight-watch/longest-day "buy X" links) that are unverifiable this way.
- **Ko-fi** (`ko-fi.com/whattosow`, footer + several guide pages) — same 403 pattern on the bare domain.
- **Unsplash.com** (footer attribution link, not the image CDN) — `401`. Note: `images.unsplash.com` (the actual photo CDN used for hero/crop images) is unaffected and all 38 unique photo IDs in use returned clean `200`s — this is only the "Photo: Unsplash" credit link in the footer.

None of the above are new concerns — they're the expected shape of bot-blocked merchant sites — but they're the highest-value items to click-test by hand since a genuinely dead one would be silent lost revenue.

## SEASONAL

All clear. Checked the homepage's season-aware copy (`src/app/page.tsx`) against today's date (13 July, mid-summer): the hero eyebrow logic correctly resolves to "The growing season's in full swing" for June–August, and the live homepage confirms this is what's actually rendering. No hardcoded off-season copy found. The Christmas-dinner planner (`/grow-your-christmas-dinner`) is squarely in its own correct season too — most of its sowing windows (Aug–Oct starts) are still open or approaching, nothing showing as stale.

## OK — summary

- **390 internal pages** (from the live sitemap.xml): all `200`.
- **38 unique Unsplash photo IDs** (crop hero images + Christmas-plate placeholders): all `200`.
- **11 local photo files** referenced by slug in `crop-image.ts` (Kate's own allotment shots): all present on disk and sampled live — all `200`.
- **25 unique Amazon product ASINs** (`dp/` links) across kit.ts, crop-kit.ts, crop-playbooks.ts, editorial-posts.ts, WateringBuyerNote.tsx: all `200`.
- **Sarah Raven** search links: `200` — not bot-blocked, working normally.
- **Reference/attribution links** (Met Office, Open-Meteo, postcodes.io, Environment Agency flood data, ONS Geoportal, OpenStreetMap, Stamen, Creative Commons, umami.is): all `200`.
- **Awin merchants configured but currently unused in content** (crocus.co.uk, primrose.co.uk, dobies.co.uk, mr-fothergills) — nothing to check; only referenced in `src/lib/awin.ts`'s advertiser table, no live links point at them yet.

# The Groundskeeper — weekly site health report
**Date:** 2026-10-05

## BROKEN
None found this week. 🎉

## UNVERIFIABLE — click-test manually
These merchants block automated requests (Cloudflare/bot protection) and returned 403 to curl. This is **not** proof the links are broken — all three are long-standing active Awin merchants (see `src/lib/awin.ts`) and the search-query URL pattern they use rarely breaks. Still, worth a 30-second manual click-test since dead affiliate links = lost revenue:

- **Thompson & Morgan** search links (e.g. `https://www.thompson-morgan.com/search?q=broad+beans+seeds`) — used across all 48 crop pages' seed-supplier lists. 403 to curl.
- **Suttons** search links (e.g. `https://www.suttons.co.uk/search?q=broad+beans+seeds`) — same pattern, same 48 crop pages. 403 to curl.
- **Dobies** — one hardcoded link in `src/app/guides/autumn-planting-garlic-onions/page.tsx:54` (`https://www.dobies.co.uk/potatoes-garlic-onions/onions-shallots/autumn-planting`). 403 to curl. This guide is seasonally relevant right now (autumn planting), so worth checking first if you only check one.

Sarah Raven's equivalent search links did **not** block curl and returned clean 200s, so those are confirmed OK outright (see below).

## SEASONAL
Light touch only. Checked the homepage's live "This week on your plot" module: it currently reads **"Right now · the main job is harvesting"**, which is correct for early October UK. The recent fixes in the repo (shared UK seasonal clock, hourly-refreshed seasonal routes) appear to be holding — nothing hardcoded or stale spotted. No action needed.

## OK — summary of what was checked
- **Pages:** 393 URLs in the live sitemap. Checked all 212 non-variety pages (static pages, blog posts ×36, editorial posts, `/sow-in/<city>` ×50, `/sow/<month>` ×12, companion-planting topics ×17, and all 47 crop hub pages) — **all 200**. Sampled 31 of the 181 crop-variety pages (every 6th one, spread across the full list) — **all 200**.
- **Images:** Cross-checked every `/photos/...webp` path referenced in `src/` and `public/` (209 unique references) against the 226 actual files in `public/photos/` — **zero missing**. (Two apparent mismatches were just code comments/placeholder examples, not live references.) No remote/Unsplash images are used anywhere in the codebase.
- **Affiliate/outbound links:**
  - 41 unique Amazon ASIN product links (`/dp/<ASIN>`, used in Allotment Essentials, Seed Starting Kit, Composting, Pest guides, Kit page, editorial posts, etc.) — all returned 200 with no "page not found" / soft-404 content.
  - Amazon search-query links (`/s?k=...`) — spot-checked, working (these essentially can't 404 by nature).
  - Sarah Raven search links — spot-checked, 200.
  - Awin tracking redirect (`awin1.com/cread.php?...`) — spot-checked, redirects correctly (302).
  - Thompson & Morgan, Suttons, Dobies — see UNVERIFIABLE above.

No code changes made. No branches pushed to main. This report only.

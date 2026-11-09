# The Groundskeeper — weekly site health — 9 November 2026

## BROKEN
None found this week.

## UNVERIFIABLE — click-test manually
These merchants return 403 (Cloudflare bot-block) to automated requests. That is **not** proof of a dead link — it's the same bot-wall every scheduled run hits on these three retailers. Please click each once in a real browser; if any genuinely 404s, that's lost affiliate revenue and worth an urgent fix.

- **Suttons** (suttons.co.uk) — all checked, 403 to the checker:
  - `/vegetable-seeds/popular-seeds/tomato-seeds-f1-crimson-crush_MH-32561` (blight-watch page)
  - `/vegetable-seeds/popular-seeds/tomato-seeds-crimson-cocktail-f1_MH-63935` (blight-watch page)
  - `/vegetable-seeds/tomato-seeds/tomato-seeds-crimson-cherry-f1_MH-73968` (blight-watch page)
  - `/vegetable-seeds/popular-seeds/tomato-seeds-f1-fantasio_MH-1401` (blight-watch page)
  - `/potatoes-onions-garlic/potatoes/all/potato-sarpo-mira_mh-83821` (blight-watch page)
  - `/potatoes-onions-garlic/potatoes/all/potato-cara_MH-20080` (blight-watch page)
  - `/potatoes-onions-garlic/garlic-bulbs/autumn-planting-garlic` (autumn-planting-garlic-onions guide)
  - `/garden-equipment/all/frost-protection-fleece_MH4728` (homepage, "plant out" section)
  - `/vegetable-fruit-plants/` (homepage, "plant out" section)
  - `/search?q=...` pattern (used across ~48 crop pages' seed-supplier links) — sampled 2, both 403
- **Thompson & Morgan** (thompson-morgan.com) — `/search?q=...` pattern, sampled 2, both 403
- **Dobies** (dobies.co.uk) — `/potatoes-garlic-onions/onions-shallots/autumn-planting` (autumn-planting-garlic-onions guide), 403

These six specific Suttons product URLs (the blight-watch tomato/potato varieties) are the ones worth clicking first — they're hand-picked links, not search queries, so they're the only ones at real risk of having been discontinued/renamed by the retailer. The Awin tracking layer itself is healthy: I confirmed the `awin1.com` redirect for Thompson & Morgan resolves cleanly (302 → thompson-morgan.com with tracking params attached), so the bot-block sits only with the merchants' own Cloudflare, not our link-wrapping code.

Sarah Raven (sarahraven.com) does **not** bot-block and returned a clean 200 on every sample — no action needed there.

## SEASONAL
- **Homepage editor's note is dated October, we're now in November.** `src/data/editor-note.ts` was last hand-updated 19 October ("October is when the fleece comes out and the last tomatoes are gathered...") and the on-page byline still reads "Editor's Note — October 2026". It's now 9 November — three weeks on. Not broken, just ready for Kate's next monthly pass. (The seasonal-clock-driven routes — /sow, /still-time, crop status labels, etc. — all refresh automatically per the recent fixes and were not flagged.)

## OK — summary
- **Pages:** 240 of 240 checked returned 200 (all 51 guides, all 39 blog posts, all 51 sow-in city pages, all 13 monthly /sow pages, all 47 crop base pages, the 12 single top-level pages, the homepage, plus a spread sample of 26 of the 181 crop/variety pages). Zero non-200s.
- **Images:** all 38 distinct Unsplash photo IDs referenced across crops.ts and the Christmas-plate data returned 200. A spread sample of 15 of our own `/photos/...` files (blog, crops, guides, hero, kit, longest-day, slots) all returned 200 on the live site. No broken local image references found against the files actually on disk either (one `/photos/varieties/...` path exists only inside a commented-out code example, not live).
- **Affiliate/outbound links:** all 12 distinct Amazon product (`/dp/ASIN`) links returned 200, plus both UK and US Amazon search-query links. Sarah Raven returned clean 200s. Suttons, Thompson & Morgan and Dobies are all bot-blocked for automated checks (see UNVERIFIABLE above) — none could be confirmed broken, none could be confirmed working, hence the manual click-test ask.

No code changed, no deploys made, `main` untouched.

# The Groundskeeper — weekly site health — 2026-10-12

Report-only. No site code touched, nothing pushed to `main`.

## BROKEN — needs fixing (lost revenue)

1. **Dead Sarah Raven affiliate link — French Breakfast radish.**
   `https://www.sarahraven.com/products/radish-french-breakfast` → confirmed **404** (checked twice, a few seconds apart, after ruling out rate-limiting).
   - Used on: `/crops/radishes/radishes-french-breakfast` (seed supplier list)
   - Source: `src/data/varieties.ts`, variety id `radishes-french-breakfast`
   - The variety's other two links (Thompson & Morgan, Suttons) are bot-blocked and unverifiable, not confirmed dead — see below. Sarah Raven doesn't block bots, so this one is a clean signal: the product page is genuinely gone (renamed slug or delisted). Likely fix is finding Sarah Raven's current French Breakfast radish URL, or dropping the link if they've discontinued it.

No broken pages. No broken images (see OK summary).

## SEASONAL

- **Homepage editor's note is five weeks stale.** `src/data/editor-note.ts` still reads "September has that wind-down feeling…" dated "September 2026" (last hand-written 7 September, commit `ead807c`). It's now 12 October — the note is live on the homepage today, still talking about September's "wind-down feeling" and the picking slowing down, which reads oddly five weeks into autumn. This is deliberately hand-written (not auto-derived), so the Groundskeeper is only flagging it, not touching it — worth a fresh line from Kate whenever she's next writing.
- Everything else seasonal (crop sowing-status labels, `/still-time`, `/crops/[slug]/[variety]`, the "N crops you can still sow" OG image) runs off the shared seasonal clock added in the last few commits (`add shared UK seasonal clock`, `keep homepage and sow list in season`, `refresh public seasonal routes hourly`) and re-renders hourly, so no other obvious out-of-season copy found this week.

## UNVERIFIABLE — bot-blocked, click-test manually

Suttons and Thompson & Morgan block automated requests with a `403` on **every** URL shape tested this week — generic search pages and specific product pages alike, even with a browser user-agent — so a 403 from either tells us nothing about whether the specific product page is really there. Per standing instructions, these are not reported as broken.

- **Thompson & Morgan** — 403 on both `/search?q=…` and `/p/…TM` product pages. Affects roughly 163 variety-specific product links (`src/data/varieties.ts`) and 47 crop-level search links (`src/data/crops.ts`), plus the one `search.thompson-morgan.com` redirect used in `src/data/companion-topics.ts` (redirects to `thompson-morgan.com/search-results`, then 403s).
- **Suttons** — 403 on both `/search?q=…` and `/vegetable-seeds/…` product pages. Affects roughly 161 variety-specific product links and 47 crop-level search links, same two data files.
- **Dobies** — 403 on the one link in use: `src/app/guides/autumn-planting-garlic-onions/page.tsx` → `https://www.dobies.co.uk/potatoes-garlic-onions/onions-shallots/autumn-planting`.

Given the scale (500+ Suttons/T&M links) and that bot-blocking was confirmed consistent across every URL shape sampled on both domains, the sample stands in for the full set rather than hand-checking several hundred more 403s. If Kate wants a real signal here, the only way is clicking through a handful by hand in a browser — happy to point to specific ones on request.

**Not currently wired up anywhere, FYI:** `src/lib/awin.ts` lists Crocus, Primrose and Mr Fothergill's as active Awin advertisers, but a repo-wide search found no actual links to any of the three in `src/`. Not a bug — just a reminder they're configured and unused if there's ever a reason to add links to them.

## OK — summary of what was checked and came back clean

- **Pages:** 239 of the site's 394 sitemap URLs checked, all **200 OK**. That's every non-variety page (166) and every plain crop page (47) in full, plus a spread sample of 26 of the 181 crop/variety pages (every 7th, plus the one tied to this week's dead link).
- **Images:** all 38 Unsplash photo IDs used across `crops.ts`/`christmas-plate.ts` returned 200. All ~209 of Kate's own `/photos/...` references in the source resolve to real files on disk (`public/photos/`); a random sample of 15 of those also returned 200 live on the deployed site.
- **Affiliate links — Amazon:** all 42 unique product ASINs in use (`kit.ts`, `crop-kit.ts`, editorial posts, etc.) returned 200. Amazon doesn't bot-block, so this is a clean, fully-verified result.
- **Affiliate links — Sarah Raven:** 19 of 20 unique product links returned 200; the one exception is the French Breakfast radish link above.

**Net this week: 1 confirmed broken affiliate link (Sarah Raven, French Breakfast radish), 1 stale seasonal note, nothing else broken.**

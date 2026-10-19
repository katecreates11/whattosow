# The Groundskeeper — weekly site health — 2026-10-19

Report-only. No site code touched, nothing pushed to `main`.

## BROKEN — needs fixing (lost revenue)

**Four confirmed dead Sarah Raven affiliate links — all real 404s** (Sarah Raven doesn't bot-block, so these are clean signals, not false positives; each checked twice, a few seconds apart):

1. `https://www.sarahraven.com/products/radish-french-breakfast` → **404**
   - Variety: `radishes-french-breakfast` (`src/data/varieties.ts:303`) — flagged last week (2026-10-12), still unfixed.
2. `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` → **404**
   - Variety: `squash-uchiki-kuri` (`src/data/varieties.ts:1604`) — **this is the same Uchiki Kuri squash link first reported dead on 10 August.** Over ten weeks broken, never fixed.
3. `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` → **404**
   - Variety: `rhubarb-champagne` (`src/data/varieties.ts:2831`) — **same Champagne rhubarb link first reported dead on 10 August.** Over ten weeks broken, never fixed.
4. `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` → **404**
   - Variety: `basil-genovese` (`src/data/varieties.ts:2395`) — **same Genovese basil link first reported dead on 10 August.** Over ten weeks broken, never fixed.

**Why this is now urgent rather than routine:** three of these four have been sitting broken since the 10 August report — that's eleven weekly Groundskeeper runs (10 Aug → 19 Oct) all re-confirming the same three dead links with no fix landing. All four variety pages they sit on are live, 200 OK, and getting traffic; the Sarah Raven seed-supplier button on each is a dead end for anyone who clicks it. Likely fix for all four: find Sarah Raven's current URL for each product (search/products path probably changed), or drop the Sarah Raven option from these four varieties if discontinued.

No broken pages. No broken images (see OK summary).

## SEASONAL

- **Homepage editor's note is now six weeks stale, flagged for the second week running.** `src/data/editor-note.ts` still reads "September has that wind-down feeling…" (last hand-written 7 September). It's live on the homepage today, 19 October, still talking about September's "wind-down feeling." Deliberately hand-written, not auto-derived, so only flagging — worth a fresh line next time Kate's writing.
- Everything else seasonal (crop sowing-status labels, `/still-time`, `/crops/[slug]/[variety]`, "sow now" copy) runs off the shared seasonal clock and re-renders hourly — no other out-of-season copy found.

## UNVERIFIABLE — bot-blocked, click-test manually

Thompson & Morgan, Suttons and Dobies all still return a consistent `403` on every URL shape sampled this week (product pages and search pages alike, with a browser user-agent) — unchanged from previous weeks. Per standing instructions, not reported as broken:

- **Thompson & Morgan** — ~163 variety-level product links + 47 crop-level search links (`src/data/varieties.ts`, `src/data/crops.ts`).
- **Suttons** — ~161 variety-level product links + 47 crop-level search links, same two files.
- **Dobies** — the one link in use (`src/app/guides/autumn-planting-garlic-onions/page.tsx`).

Given the scale and consistency of the bot-block, the sample stands in for the full set. Happy to point to specific ones for a manual click-test on request.

**Still configured but unused, FYI (unchanged):** `src/lib/awin.ts` lists Crocus, Primrose and Mr Fothergill's as active Awin advertisers; no links to any of the three exist in `src/`.

## OK — summary of what was checked and came back clean

- **Pages:** all 213 non-variety sitemap URLs (every static/guide/city/blog/companion/month page) — all **200 OK**. Plus a fresh spread-sample of 27 of the 181 variety pages (a different every-7th slice from last week, plus the previously-flagged radish page) — all **200 OK**.
- **Images:** all 38 Unsplash photo IDs used across `crops.ts`/`christmas-plate.ts` returned 200. All 207 of Kate's own `/photos/...` references resolve to real files on disk.
- **Affiliate links — Amazon:** all 41 unique ASINs in use returned 200. Amazon doesn't bot-block, so this is a clean, fully-verified result.
- **Affiliate links — Sarah Raven:** 39 of 43 unique links returned 200; the 4 exceptions are above (3 are a 10-week-old recurring issue).

**Net this week: 4 confirmed broken affiliate links (3 of them 10+ weeks old and unfixed), 1 stale seasonal note (now flagged twice), nothing else broken.**

# The Groundskeeper — site health, 2026-08-31

Report-only, as always — nothing in this branch touches site code. Kate fixes.

## BROKEN — needs fixing (dead affiliate links = lost revenue)

**1. Amazon soaker hose link — 404, used in three places**
`https://www.amazon.co.uk/dp/B000TAFENY` is gone (confirmed 404, not a bot block — other Amazon links on the same domain returned 200/202 in the same run). This ASIN is hardcoded in:
- `src/components/BlightKit.tsx:27` (`SOAKER_HOSE_URL`)
- `src/components/BlightMap.tsx:138`
- `src/app/guides/watering-while-away/page.tsx:238`

One dead product, three live buy-points pointing at it. Needs a replacement ASIN.

**2. Sarah Raven — Uchiki Kuri squash seed link — 404**
`src/data/varieties.ts:1604` (`squash-uchiki-kuri` variety)
`https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm`
Confirmed dead — other sarahraven.com links resolved fine in the same run (86 of them, incl. a sibling squash variety two entries up), so this isn't a site-wide block, just this product page.

**3. Sarah Raven — Genovese basil seed link — 404**
`src/data/varieties.ts:2395` (`basil-genovese` variety, id likely `basil-genovese`)
`https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm`

**4. Sarah Raven — Rhubarb Champagne link — 404**
`src/data/varieties.ts:2831` (`rhubarb-champagne` variety)
`https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm`

All three Sarah Raven 404s re-checked twice, consistent both times. The product pages have most likely been retired/renamed on their end.

## UNVERIFIABLE — bot-blocked, click-test manually

These merchants block automated requests (Cloudflare/challenge pages), so a 403/202 here is *not* proof of a dead link — see brief for why. Reporting by domain rather than by URL since the block is domain-wide and consistent, not link-specific:

- **suttons.co.uk** — 219 product/search links returned 403 (every single one, including hand-picked product URLs like the potato and tomato pages). Same pattern as thompson-morgan below; near-certainly just their bot wall, not 219 dead pages, but worth a manual spot-check of 2–3 (e.g. the tomato variety pages, since those carry `MH-` product codes that can go stale when a line is discontinued).
- **thompson-morgan.com** (+ 1 on `search.thompson-morgan.com`) — 210 links returned 403, same story.
- **amazon.co.uk** — 45 links returned 202 (Amazon's own "slow down, bot" response) rather than resolving; 25 other Amazon UK links and 4 Amazon US links in the same batch returned clean 200s, so this looks like intermittent throttling rather than a real problem.
- **dobies.co.uk** — 1 link (`https://www.dobies.co.uk/potatoes-garlic-onions/onions-shallots/autumn-planting`) returned 403.
- **ko-fi.com** — 1 link (the Ko-fi support link) returned 403.

Recommend: click-test a small sample per merchant rather than all ~477 — if the sample loads fine, the rest are almost certainly fine too (this is standard behaviour for these retailers' bot protection, not new this week).

## SEASONAL — light touch, nothing to fix

- Homepage "sow now" strap is date-driven (`nowMonth` logic in `src/app/page.tsx`), and correctly reads "Sow now for autumn & winter" for 31 August — working as designed, not hardcoded.
- `/guides` index and other listing pages have no date-aware "featured" logic to go stale — they're flat lists of evergreen, topically-named guides (e.g. "spring-vegetables" existing as a guide in August is expected, not a bug).
- Nothing else out of season jumped out.

## OK — summary of what was checked

- **Pages:** 392/392 sitemap URLs returned 200.
- **Images:** 38/38 Unsplash crop images resolved; 208 local `/photos/*` references checked live, 207/208 resolved (the one "404" was `tomatoes-sungold.webp`, referenced only inside commented-out example code in `src/lib/variety-photos.ts` — never actually rendered anywhere, so not a live bug).
- **Outbound/affiliate links:** 604 unique destination URLs checked (all crop-level seed-supplier links + all 181 variety-page supplier links + hardcoded Amazon/gear links from components). 120 confirmed 200 OK, 4 confirmed BROKEN (above), 477 UNVERIFIABLE (bot-blocked, above). Two non-issues excluded from those counts: a MailerLite API root and unsplash.com's root both returned 401 to a bare GET, which is expected API behaviour and not a real page; one Stadia Maps tile URL "404'd" only because it's a `{z}/{x}/{y}` template literal, never fetched as-is.

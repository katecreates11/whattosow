# The Groundskeeper — weekly site health

**Run date:** 2026-09-14
**Site:** whattosow.co.uk (live, checked via curl against production)

---

## BROKEN — needs fixing (lost revenue)

Three Sarah Raven affiliate links are genuine 404s — not bot-blocking. **These are the same three links the Groundskeeper's 10 August report flagged over a month ago and they are still broken.** Every visitor who reaches these variety pages and clicks through to Sarah Raven hits a dead page — five-plus weeks of lost commission on three of the site's variety pages.

1. **Uchiki Kuri squash** — `src/data/varieties.ts:1604`
   `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` → 404
2. **Genovese basil** — `src/data/varieties.ts:2395`
   `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` → 404
3. **Champagne rhubarb** — `src/data/varieties.ts:2831`
   `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` → 404

All three variety pages still have working Thompson & Morgan and/or Suttons supplier links alongside the dead Sarah Raven one, so the pages aren't broken for buyers — just quietly leaking one merchant's revenue on each. Recommend either removing the dead Sarah Raven entry from each `seedSuppliers` array or replacing it with the product's current URL on sarahraven.com.

No broken internal pages and no broken images were found this week (see OK summary).

---

## UNVERIFIABLE — click-test manually

These merchants bot-block automated requests (403, or Amazon's 202 "soft block" on search-style URLs), so a non-200 here is **not** evidence of a dead link — just that the bot check couldn't confirm it either way.

- **Suttons (suttons.co.uk):** 200-ish product links resolved fine where checkable; the majority of direct product-page URLs (roughly 210 across variety pages) returned 403 to the bot and need a human click if you want certainty. No pattern suggesting a mass outage — spot checks that did get through were all fine.
- **Thompson & Morgan (thompson-morgan.com):** same pattern — most direct product links 403'd to the bot (~195 of them); the ones that returned a real code were all 200.
- **Dobies (dobies.co.uk):** the one hardcoded link (`/potatoes-garlic-onions/onions-shallots/autumn-planting`, used in the autumn planting guide) returned 403 — click-test this one, it's a single high-traffic seasonal link right now.
- **Amazon search-style links (`amazon.co.uk/s?k=...`):** ~58 of these returned Amazon's 202 "request accepted but not confirmed" bot response rather than a clean 200. All 36 direct Amazon product links (`/dp/ASIN...`) checked out at a clean 200, so this looks like Amazon's anti-bot layer on search URLs specifically, not a supply problem — still worth a manual click on a couple if you're near any of the gear guides.

None of the above showed a 404, 410, or DNS failure — the signal that would mean "actually broken" — so nothing here is being escalated to BROKEN.

---

## SEASONAL notes

14 September, UK (early autumn). Spot-checked the homepage and the September sow page:

- Homepage hero currently reads "Sow now for autumn & winter" with a "13 days left" countdown — correct for the date, no stale copy found.
- `/sow/september` serves the September-specific guide correctly (`<title>What to Sow in September — UK Planting Guide</title>`).

Nothing out of season spotted this week. Light touch only — not exhaustively checked page by page.

---

## OK summary (counts checked)

- **Pages:** 393 URLs in the live sitemap. All 212 non-variety pages checked individually — **all 200**. Of the 181 crop-variety pages, sampled 31 (roughly 1 in 6, spread across the list) — **all 200**.
- **Images:** 38 distinct Unsplash photo IDs referenced in code, all checked — **all 200**. 226 local images in `public/photos`; sampled 29 (~1 in 8) served live from the site — **all 200**. Also verified every `/photos/...` path referenced in source against the filesystem (209 references) — no missing files (two apparent misses were commented-out example code, not live references).
- **Outbound/affiliate links:** 633 distinct merchant URLs found across `src/data/crops.ts`, `src/data/varieties.ts`, `AffiliateLink` usages, and `christmas-plate.ts`. Checked 354 direct product/search-style links plus a spot sample of the generic supplier-search endpoints and the Dobies link — **3 confirmed broken** (see BROKEN, all Sarah Raven, all previously flagged), rest either clean 200s or bot-blocked (see UNVERIFIABLE). All 36 direct Amazon product links (`/dp/ASIN`) — clean 200.

**Nothing new is broken this week.** The one thing that needs Kate's attention is the same one from five weeks ago: the three dead Sarah Raven links haven't been fixed yet.

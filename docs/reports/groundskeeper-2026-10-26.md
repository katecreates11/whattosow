# The Groundskeeper — weekly site health — 26 October 2026

Scope checked: 394 sitemap pages (213 checked in full, 181 variety pages sampled at 31), 38 Unsplash images + 191 local `/photos` references, and 628 outbound/affiliate destination URLs (276 direct product links, 352 search links across Thompson & Morgan, Sarah Raven, Suttons, Dobies, Crocus, Primrose, Mr Fothergill's and Amazon UK/US).

## BROKEN — needs fixing (lost revenue)

Four dead Sarah Raven affiliate links, all confirmed 404 on repeat check. All live in `src/data/varieties.ts`:

| Variety | URL | Line |
|---|---|---|
| Radish, French Breakfast | `https://www.sarahraven.com/products/radish-french-breakfast` | 303 |
| Squash, Uchiki Kuri (listed as "climbing onion squash") | `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` | 1604 |
| Basil, Genovese | `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` | 2395 |
| Rhubarb, Champagne | `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` | 2831 |

**Three of these (Uchiki Kuri, Genovese basil, Champagne rhubarb) were first flagged by this routine on 10 August 2026 — they have now been broken, unfixed, for over ten weeks.** The fourth (French Breakfast radish) is new this week. Sarah Raven isn't an active Awin advertiser currently (per `src/lib/awin.ts`), so these are untracked plain links regardless — but they still send readers to a dead page instead of a product, which is a bad experience and zero revenue either way. Worth either fixing the slugs or swapping these four to Thompson & Morgan / Suttons equivalents, which are already used as alternate suppliers for the same varieties in most other entries.

## UNVERIFIABLE — bot-blocked, click-test manually

These merchants block scripted requests (Cloudflare/anti-bot challenges) — a 403/202/503 here is **not** proof of a dead link, just that the bot couldn't get through where a browser would.

- **Thompson & Morgan** — 211 links returned 403.
- **Suttons** — 216 links returned 403.
- **Dobies** — 1 link returned 403 (`autumn-planting-garlic` category page).
- **Amazon UK search** — 52 search links (`/s?k=...`) returned 202 (Amazon's standard bot-challenge response for scripted requests).
- **Amazon US search** — 1 link returned 503 (same bot-challenge pattern).

None of these can be distinguished from genuinely broken links by curl alone. If Kate wants assurance beyond last week's spot checks, a manual click-through of a sample from each merchant would be the way to confirm.

## SEASONAL

No hardcoded seasonal errors found. The homepage and "what to sow" list are driven by the live seasonal clock (`src/lib/seasonal-time.ts` / `variety-status.ts`), not fixed dates — matching the string of recent fixes in the commit history ("keep homepage and sow list in season," "refresh public seasonal routes hourly"). The homepage editor's note (`src/data/editor-note.ts`) correctly reads "October 2026" and describes late-October jobs (fleece out, last tomatoes, garlic and broad beans going in) — consistent with today's date.

## OK summary

- **Pages:** 394 sitemap URLs — 213 checked in full + 31 of 181 variety pages sampled (1 in 6) — **all 200 OK**.
- **Images:** 38 Unsplash photo IDs referenced from crop data — **all 200 OK**. 192 local `/photos/...` references checked against `public/` — 191 exist; the 1 "missing" hit is a commented-out example line in `src/lib/variety-photos.ts`, not a live reference.
- **Outbound/affiliate links:** 628 checked — 143 returned 200 clean, 428 bot-blocked (403), 52 Amazon bot-challenge (202), 1 Amazon bot-challenge (503), **4 confirmed dead (404, all Sarah Raven, see BROKEN above)**.

---
*Report only — no site code changed, no branch merged to `main`. Branch: `groundskeeper/2026-10-26`.*

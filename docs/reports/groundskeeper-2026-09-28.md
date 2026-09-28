# The Groundskeeper — weekly site health report

**Run date:** Monday 28 September 2026, 06:24 UTC
**Site:** whattosow.co.uk (checked live against the current sitemap, 393 URLs)

Report-only — nothing in this branch touches site code. Kate fixes.

---

## BROKEN — needs fixing (dead affiliate links = lost revenue)

### The same three Sarah Raven links are still dead — now **7 weeks** unfixed
First flagged in the 10 August report and re-confirmed every week since (17, 24, 31 Aug; 7, 14 Sep). Oddly, last week's (21 Sep) report said "BROKEN: None" — its sample of 46 Sarah Raven links apparently didn't happen to include these three hardcoded product links, so they slipped through unflagged for one week. They are still genuine 404s today, not bot-blocking (Sarah Raven doesn't block automated checks — 86 of the 89 links checked today resolved cleanly).

Each of the three has a live Thompson & Morgan and/or Suttons alternative sitting right next to it on the same variety page, so this isn't a dead-end for visitors — but every click on the Sarah Raven option specifically is a lost affiliate click, and has been for seven weeks.

1. **Uchiki Kuri squash** — `src/data/varieties.ts:1604`
   `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` → 404
2. **Genovese basil** — `src/data/varieties.ts:2395`
   `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` → 404
3. **Champagne rhubarb** — `src/data/varieties.ts:2831`
   `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` → 404

All three read like Sarah Raven restructured their URL slugs a while back (the `.htm` category-path style looks like an older scheme — their other working links in the same file use `/products/<slug>`). Worth either updating the three URLs to Sarah Raven's current slug for each product, or just dropping the Sarah Raven line for these three varieties since T&M/Suttons already cover them.

**Pages, images, everything else:** nothing else broken this week.

---

## UNVERIFIABLE — bot-blocked, click-test manually

Same pattern as every previous week — these merchants return 403 to automated requests via their Cloudflare/anti-bot layer. Confirmed again with a fresh sample today (3 Suttons, 2 Thompson & Morgan, the 1 Dobies link and the 1 Ko-fi link all came back 403 on a normal browser user-agent). This is expected and is **not** evidence the links are dead.

| Domain | Links found | Bot-blocked |
|---|---|---|
| suttons.co.uk | 220 hardcoded product/category pages | sampled — 403 |
| thompson-morgan.com | 213 hardcoded product pages + search template | sampled — 403 |
| dobies.co.uk | 1 (autumn onion-planting guide) | 403 |
| ko-fi.com | 1 (footer support link) | 403 |

Given the volume, not realistic to click every one by hand — the domain-level pattern has held for eight straight weeks. Worth a spot-click of 2–3 per merchant if you're browsing anyway; flag here only if something looks genuinely different (e.g. a "product discontinued" page rather than the usual Cloudflare block).

---

## SEASONAL — light touch

Nothing wrong found. The shared UK seasonal clock (added 7–14 Sep after that stale-cache bug) is holding up:
- Homepage reads "Sow now for autumn & winter" / "See the full **September** sowing list" — correct for today.
- `/sow` reads "**September's** sowing" — correct.
- Cache headers show a short TTL (~1,100s) now, not the year-long stale cache from the 7 Sep incident — that fix has stuck for three weeks running.

---

## OK summary

- **Pages:** 243 checked (all 212 non-variety sitemap URLs + a 1-in-6 spread sample of 31 of the 181 crop-variety pages) — **all HTTP 200**.
- **Images:** 38 distinct Unsplash photo IDs (covering all crop hero images + the Christmas-plate reuses) — **all HTTP 200**. All 209 local `/photos/*` references checked against `public/photos/` — all present on disk except two non-live mentions (a comment example in `PinButton.tsx` and a commented-out placeholder in `variety-photos.ts`) — not real bugs.
- **Affiliate/outbound links:** 678 unique merchant URLs found in `src/`.
  - Sarah Raven: 89 checked individually — 85 clean 200s, 1 redirect (301, fine), **3 dead (see BROKEN)**.
  - Amazon: 32 unique `/dp/<ASIN>` product links checked individually — **all 200**, including the soaker-hose ASIN (`B000TAFENY`) that flaked once on 21 Sep — clean today.
  - Suttons, Thompson & Morgan, Dobies, Ko-fi: sampled, all bot-blocked (see UNVERIFIABLE) — consistent with every prior week.
  - Amazon `/s?k=` search-style links (generated from a shared template, ~90 of them) not checked individually — they hit Amazon's search endpoint rather than a specific product, so there's nothing product-specific to go dead.
- **AWIN wrapping:** `src/lib/awin.ts` correctly wraps the 7 active advertiser domains (Thompson & Morgan, Suttons, Crocus, Primrose, Dobies, Mr Fothergill's) and leaves non-Awin merchants (Sarah Raven, Amazon) untouched — no dead merchant IDs found.

# The Groundskeeper — weekly site health report

**Run date:** 2026-08-10
**Site:** whattosow.co.uk

---

## BROKEN — needs fixing (dead affiliate links = lost revenue)

Three dead Sarah Raven product links, all in `src/data/varieties.ts`. Sarah Raven doesn't bot-block (84/104 of its links checked cleanly with real 200s and 404s), so these are genuine dead pages, not false positives from anti-bot blocking — confirmed with two separate requests each.

1. **Uchiki Kuri squash** — `src/data/varieties.ts:1604`
   `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` → 404
   (Thompson & Morgan and Suttons links for this variety are present and unaffected — see UNVERIFIABLE below.)

2. **Basil Genovese** — `src/data/varieties.ts:2395`
   `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` → 404

3. **Champagne rhubarb** — `src/data/varieties.ts:2831`
   `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` → 404

All three read like Sarah Raven restructured their URL slugs (the `.htm`-suffixed category-path style looks like an older URL scheme). Worth checking whether Sarah Raven now serves these products under `/products/<slug>` like their other listings in the same file, and updating the three URLs (or dropping the supplier link for that variety) accordingly.

**Pages, images:** nothing broken this week (see OK summary).

---

## UNVERIFIABLE — bot-blocked, click-test manually

These merchants return 403 (Suttons, Thompson & Morgan, Dobies) or 503 (Amazon.com) to automated requests via their Cloudflare/anti-bot layer — this is expected and NOT evidence the links are dead. Flagging for a manual click-test only.

| Domain | Links checked | Bot-blocked |
|---|---|---|
| suttons.co.uk | 112 hardcoded product pages | 112 (403) |
| thompson-morgan.com | 105 hardcoded product pages + the shared `/search?q=` template used across 15 guide pages | 105 (403) |
| dobies.co.uk | 1 hardcoded link (`src/app/guides/autumn-planting-garlic-onions/page.tsx:54` — autumn onion planting) | 1 (403) |
| amazon.com (US) | 4 sample `/s?k=` search links | 4 (503) |

Full URL list is in the repo at `docs/reports/groundskeeper-2026-08-10-urls.txt` if a spot-check is wanted rather than clicking through the site. Given the volume (217 links), a full manual click-through isn't realistic — worth trusting the domain-level pattern (Sarah Raven and Amazon.co.uk both resolved cleanly with real user-agents, so these three domains are almost certainly just blocking the bot, not broken) unless Kate spots something odd browsing the site normally.

---

## SEASONAL — light touch

Nothing wrong found. Spot-checked:
- Homepage — generic "sow now" framing (postcode-driven, not hardcoded to a stale month).
- `/sow/august` — title and content correctly August-specific.
- `/still-time` — loads correctly (200); an earlier grep hit on the word "may" turned out to be boilerplate 404-page copy embedded in the page's script bundle, not rendered content — false alarm, no fix needed.

Not re-checked here: the wisdom log notes the SEO Watchdog already flagged a stale build-date bug on the 51 `/sow-in/*` city pages (28 July report) — that's logged elsewhere and outside this week's scope to re-verify.

---

## OK summary

- **Pages:** 246 checked (all 211 non-variety sitemap URLs + a sample of 35 of the 181 crop-variety pages) — all 200.
- **Images:** 208 local `/photos/*` references + 38 distinct Unsplash photo IDs — all resolve. (One apparent 404 on `/photos/varieties/tomatoes-sungold.webp` turned out to be an example path inside a code *comment* in `src/lib/variety-photos.ts`, never actually referenced — not a real bug, the variety-photo map is empty.)
- **Affiliate/outbound links:** 649 unique merchant URLs found in `src/`; 305 hardcoded product/deep-links checked individually (84 confirmed OK, 218 bot-blocked/unverifiable, 3 broken — see above). Search-style query links (`?q=`, `/s?k=`) were spot-checked per domain rather than exhaustively, since they're generated from a template and share one endpoint.
- **AWIN wrapping:** `awinLink()` correctly leaves non-Awin merchants (e.g. Sarah Raven, whose programme isn't active) untouched and wraps the seven active advertiser domains — no dead merchant IDs found in `src/lib/awin.ts`.

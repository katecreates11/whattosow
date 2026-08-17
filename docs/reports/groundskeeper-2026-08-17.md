# The Groundskeeper — weekly site health

**Run date:** 2026-08-17
**Scope:** all sitemap pages, all referenced images, all outbound/affiliate merchant links, light seasonal sanity check.

---

## BROKEN — needs fixing (dead affiliate links = lost revenue)

Three Sarah Raven product links return a genuine 404 (verified — not a bot-block). Each variety page still has a working Thompson & Morgan and/or Suttons link alongside, so these aren't total dead ends for a visitor, but they're wasted clicks and should be fixed or removed.

1. **`/crops/squash/squash-uchiki-kuri`** — `src/data/varieties.ts:1604`
   `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` → 404

2. **`/crops/basil/basil-genovese`** — `src/data/varieties.ts:2395`
   `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` → 404

3. **`/crops/rhubarb/rhubarb-champagne`** — `src/data/varieties.ts:2831`
   `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` → 404

All three look like Sarah Raven retired or renamed the product page. Worth a quick manual search on sarahraven.com for the current URL (or drop the supplier row for that variety if it's genuinely gone).

No broken internal pages, no broken images.

---

## UNVERIFIABLE — click-test manually

Two merchants block **all** automated requests outright (Cloudflare bot-check, 403 on every single link tested — not link-specific, a blanket domain policy):

- **Suttons** (suttons.co.uk) — 115/115 unique links tested returned 403.
- **Thompson & Morgan** (thompson-morgan.com) — 105/105 unique links tested returned 403.

This is expected and not evidence anything is broken — just genuinely can't be checked by a bot. If you want spot-confidence, click a handful by hand next time you're on the site; I have no reason to think any specific one is dead, this is just a blind spot in automated checking.

Also unverifiable:
- **Dobies** (dobies.co.uk) — 1 link, 403.
- **Amazon search links** (2 total: `amazon.co.uk/s?...`, `amazon.com/s?...`) — returned HTTP 202, which is Amazon's own bot-throttle response, not a real error.

---

## SEASONAL

Nothing wrong. Spot-checked the homepage hero, `/still-time`, blight-watch season gating, the Christmas-dinner plate deadlines, and the midsummer band — all correctly date-derived off the current date rather than hardcoded, and all read right for mid-August (homepage hero already says "Sow now for autumn & winter"; blight-watch correctly still in-season; Christmas potatoes correctly showing "closing" with 14 days left rather than stuck on "start now").

---

## OK — summary

- **392/392** sitemap pages returned HTTP 200 (crop pages, variety pages, guides, blog, city pages, month pages, companion-planting topics, tools).
- **191/191** locally-referenced photos (`/photos/...`) exist on disk — no missing images.
- **38/38** Unsplash placeholder images (crop cards + Christmas plate) load fine.
- **280 unique outbound/affiliate merchant links** checked across the whole codebase (guides, components, `crops.ts`, `varieties.ts`, `crop-kit.ts`, `crop-playbooks.ts`, `kit.ts`, `christmas-plate.ts`, `companion-topics.ts`, `editorial-posts.ts`) — this is full coverage, not a sample, since after de-duplication the whole site only uses 280 distinct destination URLs:
  - 54 confirmed 200 (34 Amazon, 21 Sarah Raven, 1 Dobies homepage-adjacent link)... see breakdown below
  - 3 confirmed 404 (Sarah Raven — see BROKEN above)
  - 221 bot-blocked/unverifiable (Suttons, Thompson & Morgan, 1 Dobies, 2 Amazon search)

Merchant breakdown (unique links):

| Merchant | 200 OK | 404 | 403/202 (unverifiable) |
|---|---|---|---|
| Amazon (.co.uk + .com) | 33 | 0 | 2 |
| Sarah Raven | 21 | 3 | 0 |
| Suttons | 0 | 0 | 115 |
| Thompson & Morgan | 0 | 0 | 105 |
| Dobies | 0 | 0 | 1 |

All clear otherwise — no broken pages, no broken images, seasonal content is live and correct.

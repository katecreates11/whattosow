# The Groundskeeper — weekly site health report

**Date:** 24 August 2026
**Checked:** 392 internal pages, 900 outbound/affiliate links (651 unique merchant URLs + duplicates), 249 images (local + Unsplash)

---

## BROKEN — needs fixing (lost revenue / real defects)

### 1. Three Sarah Raven links are still dead — flagged 10 August, still broken two weeks later
These were reported in the 10 August Groundskeeper run and confirmed again today with a fresh check (real `404` page, not a bot block — verified by fetching the page body, which itself says "404"). All three have a live Thompson & Morgan or Suttons alternative already sitting next to them, so the fix is just to drop the dead line, not find a new supplier.

| Variety | Dead URL | Location |
|---|---|---|
| Uchiki Kuri squash | `sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` | `src/data/varieties.ts:1604` |
| Genovese basil | `sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` | `src/data/varieties.ts:2395` |
| Champagne rhubarb | `sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` | `src/data/varieties.ts:2831` |

This is the second week running these have sat unfixed — worth checking why the first report didn't land (see note at the bottom).

### 2. New: dead Amazon soaker hose link, used in three places
`https://www.amazon.co.uk/dp/B000TAFENY` returns a real Amazon "Page Not Found" (verified, not a captcha/bot page). Same ASIN hardcoded in three spots:
- `src/components/BlightKit.tsx:27`
- `src/components/BlightMap.tsx:138`
- `src/app/guides/watering-while-away/page.tsx:238`

One dead ASIN, three lost-revenue surfaces. Needs a replacement soaker-hose ASIN.

### 3. Homepage and several core pages are serving stale content — the "sow now" date is 6 days old
The homepage and `/sow` currently show **"Tuesday 18 August"** / **"week of 18 August"** to every visitor — today is Monday 24 August. Response headers confirm this isn't a one-off: `age: 497000+` seconds (~5.75 days) and `cache-status: "Netlify Durable"; hit; ttl=31038738` (~359-day TTL) on the homepage, `/sow`, `/calendar`, `/blight-watch`, `/harvest`, and `/grow` — all last generated 18–19 August and not revalidating since, despite `/blight-watch` being declared `changeFrequency: daily` in the sitemap. `/still-time` is the exception and is showing today's date correctly, so whatever's serving it differs from the rest.

This isn't a broken link, but it directly undercuts the site's core promise ("know exactly what to plant, right now") — every visitor this week is seeing last Tuesday's sowing list on the homepage. Worth a look at the ISR/ Netlify Durable cache revalidation config, not a content fix.

---

## UNVERIFIABLE — bot-blocked, click-test manually

**Thompson & Morgan (211 links) and Suttons (220 links) returned 100% `403` — every single link, no exceptions.** This is domain-level Cloudflare bot-blocking, consistent with prior weeks, and not evidence any individual product page is dead. Recommend Kate spot-check a handful by hand rather than treating this as a finding — with every link on both domains blocked identically, an automated check genuinely can't tell the good ones from the bad ones this week.

- Dobies (1 link, `sarahraven` alternative pattern) — also `403`, same story.
- Amazon.co.uk: 55 of 125 checked links returned `202` (Amazon's bot-challenge response) rather than a clean `200` — also not evidence of dead links, just Amazon rate-limiting the checker.

Sarah Raven (89 links) was **not** blocked — 86 returned clean `200`s, and the 3 above are confirmed real 404s.

---

## SEASONAL

Nothing wrong with the sowing advice content itself for late August — no obviously wrong "sow X now" copy found. The only seasonal issue is the stale-cache one already flagged above under BROKEN #3 (the *dates shown* are stale, not the *advice*).

National Allotments Week and other August-specific editorial content wasn't checked in depth this run — out of scope for a link/image sweep.

---

## OK — summary

- **392/392 internal pages** (from the live sitemap) return `200`.
- **249/249 images checked** are fine. (Two initial false alarms, both resolved: `plot-summer-growing.webp` was a one-off timeout — confirmed `200` on retry; `tomatoes-sungold.webp` doesn't actually appear on the live site — it's inside a *commented-out* example in `src/lib/variety-photos.ts`, never rendered.)
- **Sarah Raven (86/89 links)** and the non-blocked slice of **Amazon (63/125)** all check out clean.
- **Thompson & Morgan and Suttons** — fully bot-blocked, see UNVERIFIABLE above.

---

## A note on last week's silence

The 10 August report found the same three Sarah Raven 404s now confirmed again above, but apparently never reached Kate's inbox or `main` — it's been sitting on its own unmerged branch for two weeks. If this report doesn't land differently, the branch is still the record: `groundskeeper/2026-08-24`, file `docs/reports/groundskeeper-2026-08-24.md`.

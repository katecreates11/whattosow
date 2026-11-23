# The Groundskeeper — weekly site health report
**2026-11-23**

## BROKEN — needs fixing (lost revenue)

Six genuine 404s on Sarah Raven, confirmed real (other Sarah Raven product pages on the same domain return 200 fine, so this isn't bot-blocking). All six are seed-supplier links on variety pages, feeding straight affiliate traffic into a dead end.

Two of these — **rhubarb-champagne** and **basil-genovese** — are the *same* dead links the 10 August Groundskeeper report already flagged (then as "Champagne rhubarb" and "Genovese basil"). They were never fixed: that report landed on a branch that never reached `main` (see note below), so it's sat unseen for over three months. Four more have gone dead since.

| Variety (`src/data/varieties.ts`) | Dead Sarah Raven URL | Line |
|---|---|---|
| `rhubarb-champagne` | `sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` | 2831 |
| `basil-genovese` | `sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` | 2395 |
| `squash-uchiki-kuri` | `sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` | 1604 |
| `parsnips-tender-and-true` | `sarahraven.com/products/parsnip-tender-and-true` | 740 |
| `radishes-french-breakfast` | `sarahraven.com/products/radish-french-breakfast` | 303 |
| `spring-onions-ishikura` | `sarahraven.com/products/spring-onion-ishikura` | 817 |

Each of these varieties still has a working Thompson & Morgan and/or Suttons supplier link alongside the dead Sarah Raven one, so the page isn't broken for visitors — but the Sarah Raven button goes nowhere, and (per `awin.ts`'s own comment) Sarah Raven isn't even on an active Awin programme right now, so these clicks were never tracked/earning anyway — removing or swapping them is pure upside, no tracking to preserve.

**Everything else checked is clean**: all 241 site pages checked (every non-variety page plus a 25-page sample of the 181 variety pages) returned 200. All 38 Unsplash photo IDs referenced in code returned 200. All 27 Amazon ASIN links returned 200. No local `/photos/...` references point at missing files.

## UNVERIFIABLE — click-test manually (bot-blocked, not confirmed broken)

**All** Suttons and Thompson & Morgan product/search links returned `403` from this check — consistently, across every page type (product, category, search), which is a bot-block signature, not a content problem. Sarah Raven and Amazon, checked the same way from the same place, returned normal 200/202s throughout, so this is Suttons/T&M-specific anti-bot behaviour, not a result of this report's requests being generally blocked.

- Every Suttons (`suttons.co.uk`) link in `src/data/crops.ts`, `varieties.ts`, and the autumn-planting-garlic-onions guide — ~100+ distinct URLs, direct products and searches alike.
- Every Thompson & Morgan (`thompson-morgan.com`) link in the same files — ~90+ distinct URLs.
- One Dobies link (`dobies.co.uk/potatoes-garlic-onions/onions-shallots/autumn-planting`) in the autumn-planting-garlic-onions guide.

Worth a manual click-through on a handful of these (especially ones tied to currently-relevant content, e.g. autumn garlic/onion planting) just to be sure none have quietly gone dead behind the bot-wall — but nothing here is reportable as a confirmed break.

## SEASONAL

Checked the homepage against today's date (23 November, UK). The season-aware chrome (`src/app/page.tsx`) is computed from `getSeasonalTime()`, not hardcoded, and the live site matches: hero eyebrow correctly reads "Sow now for autumn & winter" and the Grow Your Christmas Dinner planner link is showing (its window is 1 Nov–25 Dec). No seasonal mismatches found on the homepage. Did not do a full page-by-page seasonal audit (light touch, per brief) — nothing else stood out while checking the other pages for status codes.

## OK summary

- **241 pages** checked (35 fixed site pages/guides, 181 crop/blog/sitemap entries minus variety pages = 216 non-variety pages, plus a 25-page sample of the 181 variety pages) — all 200.
- **~620 outbound/affiliate link destinations** extracted from `src/data/crops.ts`, `varieties.ts`, components (`AffiliateLink`, `AffiliateButtons`), and `awin.ts` merchants; checked in full for direct product/category links (263) plus a cross-domain sample of search-style links (33) plus all Amazon ASINs (27) plus all unique Unsplash photo IDs (38).
  - 6 confirmed dead (Sarah Raven, see BROKEN).
  - ~190 bot-blocked, unverifiable by this method (Suttons/T&M/Dobies).
  - Everything else (Sarah Raven's other links, all Amazon, all Unsplash) confirmed working.
- **38 Unsplash images** checked — all OK.
- **Local photos** — no missing files found among referenced paths.

## Note on last week's reports

Per crew memory (`docs/dreams/wisdom.md`), Groundskeeper reports have been landing on their own branch and never reaching `main`, so they've gone unseen for weeks even though the routine itself has been running correctly. This report follows the same instructed workflow (branch only, no PR) — the email sent alongside it is the real delivery mechanism this week, so it shouldn't get lost the same way. Flagging in case Kate wants the branch step changed.

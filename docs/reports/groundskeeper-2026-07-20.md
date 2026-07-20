# The Groundskeeper — weekly site health, 20 July 2026

All clear this week. No dead pages, no dead images, no confirmed-broken
affiliate links. A batch of merchant links are bot-blocked and can't be
checked by machine — those are listed below for a quick manual click-test,
same as every week they show up.

## BROKEN

None found.

## UNVERIFIABLE — click-test manually

These merchants return bot-challenge pages to automated requests (Cloudflare
"Just a moment…" interstitials or Amazon's "click to continue shopping"
page), sometimes with a *200* status even though it isn't the real page. A
403/challenge is not proof of a dead link — but it also means I can't confirm
these resolve, so they need a human click.

**Amazon (33 product links, all `dp/ASIN` or kit-catalogue links)** — every
single one returned Amazon's bot-block interstitial regardless of whether the
ASIN was real or made-up, so status code is not a useful signal here at all.
Worth a manual spot-check, especially the ones in **`src/data/kit.ts`** and
**`src/data/crop-kit.ts`** since those get reused across many pages:

- `broadfork` B09J4QWJLW, `gloves` B0017HEJC0, `kneeler` B099FDNQR3,
  `bulb-planter` B09GVYL32D, `weed-puller` B08CTVKW8K, `root-trainer`
  B0CV5Z9Y7H, `plant-ties` B0D5L7F2S3, `dibber` B002W5V62C, `labels`
  B0DQ5WVTQJ, `watering-lance` B01MQDGXMO, `pea-netting` B0DMFPNXHL,
  `pea-sticks` B01G91STQA, `ground-pegs` B08WJRK7Q5, `tent-pegs` B0C94Q85JV,
  `twine` B000PJCDZG, `slug-killer` B0B1VWK2V2, `terracotta-pots` B08NC6J8VL,
  `solar-fountain` B0BMVTB9LQ (all `src/data/kit.ts`)
- Digging fork B0006UF6DA, gloves B0017HEJC0 (again, `AllotmentEssentialsBuyerNote.tsx`)
- Seed tray B00844031K, propagator B0F3W9KC7N, plant labels B015WFRWUI
  (`SeedStartingKitBuyerNote.tsx`)
- Watering lance B01MQDGXMO (`WateringBuyerNote.tsx`)
- Soaker hose B000TAFENY (`BlightKit.tsx`)
- Crop-kit extras: B09RK3HPH5, B00844031K, B015WFRWUI (`crop-kit.ts`)
- Plus a handful of `amazon.co.uk/s?...` keyword-search links (fleece,
  watering cans, water butts, netting, canes) across the same files — search
  pages, lower risk since there's no specific product to delist, but flagging
  for completeness.

**Suttons, Thompson & Morgan (`src/data/crops.ts` `seedSuppliers`, used
across all 47 crop pages)** — both domains 403'd every request, direct and
via the Awin tracking redirect. The Awin redirect itself is healthy (302 →
merchant, confirmed against Suttons), so this is purely the merchant's bot
wall, not our tracking layer.

**Ko-fi** (`https://ko-fi.com/whattosow`, in the footer and `/about`, `/print`)
— Cloudflare challenge page, not a real 404.

Sarah Raven (also in `seedSuppliers`) came back clean at 200 with no bot
block, for what it's worth as a cross-check.

## SEASONAL

Nothing obviously wrong for late July spotted this pass — light touch only,
didn't parse every guide. Worth noting the "sow peas indoors" mid-July
mismatch flagged last week (`e824382`) is already fixed and not reappearing.
No hardcoded month-name logic found outside the calendar engine that would
be at risk of the same kind of drift.

## OK — what was checked

- **239 of 390 sitemap pages** checked directly (all 209 non-variety pages —
  homepage, `/sow`, `/us`, `/crops`, `/grow`, `/harvest`, `/calendar`,
  `/frost-map`, `/blight-watch`, all 49 `/guides/*` pages including the 17
  companion-planting sub-pages, all 47 `/crops/[slug]` pages, all 50
  `/sow-in/[city]` pages, all 12 `/sow/[month]` pages, all 34 `/blog/[slug]`
  posts — plus a 1-in-6 sample of the 181 crop/variety pages, 30 checked).
  **All returned HTTP 200.**
- **208 local `/photos/*` references** checked against the live site (one
  match, `tomatoes-sungold.webp`, turned out to be a commented-out example
  in `variety-photos.ts`, not a real reference — genuinely nothing missing).
  **All real references returned HTTP 200.**
- **38 Unsplash photo IDs** used as hero images across crop pages and the
  Christmas plate. **All returned HTTP 200.**
- **Trust/attribution links** in the footer, `/about`, `/privacy`,
  `/frost-map`, `/blight-watch` (Met Office, Open-Meteo, Postcodes.io,
  Environment Agency, ONS Geoportal, Stamen, OpenStreetMap, Creative
  Commons) — all 200. Stadia Maps tiles return 401 without a referer header
  but 200 with `Referer: whattosow.co.uk` — that's the expected
  domain-restricted auth working correctly, not a fault.
- **Awin tracking layer** — spot-checked one live tracked link end to end
  (`awinmid=25121`, Suttons); redirects correctly to the merchant with
  tracking params attached.

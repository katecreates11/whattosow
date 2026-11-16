# The Groundskeeper — weekly site health — 16 November 2026

## BROKEN — needs fixing (lost affiliate revenue)

Four Sarah Raven product links return a clean 404 (Sarah Raven does not bot-block automated checks, so this is a real result, not a bot-wall). **Three of these have been broken since at least 10 August** — flagged in a previous Groundskeeper run and never fixed, so this is 3+ months of a dead "buy the seeds" link on those variety pages:

- **`squash-uchiki-kuri`** (Lucky Dip variety page) → `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` — **404**. Link added 12 July, first reported dead 10 August, still dead today.
- **`basil-genovese`** (Lucky Dip variety page) → `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` — **404**. Same history as above.
- **`rhubarb-champagne`** (Lucky Dip variety page) → `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` — **404**. Same history as above.
- **`radishes-french-breakfast`** (Lucky Dip variety page) → `https://www.sarahraven.com/products/radish-french-breakfast` — **404**. New this week — not in the August list, so this one's gone dead more recently.

All four are in `src/data/varieties.ts`, in the `seedSuppliers` array for each variety id above. Likely fix: Sarah Raven has renamed, delisted, or restructured these URLs — replace with the current product URL (or drop Sarah Raven as a supplier for that variety if discontinued).

## UNVERIFIABLE — click-test manually

These three merchants return 403 (Cloudflare bot-block) to every automated request this routine makes — not proof of a dead link, just the bot-wall these three retailers put up for non-browser traffic. A real 404 would be lost affiliate revenue, so worth a human click if you have a spare minute, but none of this is urgent on the strength of the check alone:

- **Suttons** (suttons.co.uk) — 216 URLs checked, all 403. Includes the 6 hand-picked blight-watch tomato/potato links, the 2 autumn-planting-garlic-onions guide links, the 2 homepage "plant out" links, and ~210 variety-page / crop-page product and search links.
- **Thompson & Morgan** (thompson-morgan.com) — 210 URLs checked (mostly variety-page product links), all 403.
- **Dobies** (dobies.co.uk) — 1 URL checked (autumn-planting-garlic-onions guide), 403.

Same picture as recent weeks — these three have bot-blocked every automated check since at least July. If it would help, the hand-picked product links (not the generic `/search?q=` ones) are the ones actually worth a human glance, since a search page essentially never 404s but a specific product page can if delisted:
- Suttons: the 6 blight-watch tomato/potato varieties, the homepage frost-fleece link, the garlic-onions guide link.
- Dobies: the one garlic-onions guide link.

## SEASONAL

Nothing wrong found. The homepage editor's note now reads "November 2026" and matches the season (tidying the plot, carrots left in for Christmas) — last week's "note is dated October" flag has been fixed. The dynamic seasonal routes (`/sow`, `/still-time`, crop status labels, blight-watch risk) all compute from the current date rather than being hardcoded, so nothing to flag there.

## OK — summary

- **Pages:** 214 of 214 non-variety pages checked returned 200 (all guides, blog posts, editorial posts, sow-in city pages, monthly /sow pages, crop base pages, companion-planting topic pages, and the single top-level pages). A spread sample of 21 of the 181 crop/variety pages also returned 200 — no non-200s anywhere.
- **Images:** all 38 distinct Unsplash photo IDs referenced in `crops.ts` and `christmas-plate.ts` returned 200. All 192 local `/photos/...` paths referenced in the source code exist on disk (one `/photos/varieties/...` path is only in a commented-out code example in `variety-photos.ts`, not a live reference, so not a real gap).
- **Affiliate/outbound links — checked exhaustively this week, not sampled:** all 507 unique seed-supplier URLs from `crops.ts` and `varieties.ts`, plus all 31 unique Amazon `/dp/ASIN` product links (from guides, editorial posts, crop-kit, and crop-playbooks data) and the handful of hardcoded Suttons/Dobies links on blight-watch, the garlic-onions guide, and the homepage — 549 URLs in total. 118 returned 200 (all Sarah Raven + all Amazon), 427 came back bot-blocked 403 (Suttons/Thompson & Morgan/Dobies, see UNVERIFIABLE), and 4 are genuinely broken (see BROKEN above).

No code changed, no deploys made, `main` untouched. Report pushed to branch `groundskeeper/2026-11-16`.

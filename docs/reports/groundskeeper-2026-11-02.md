# The Groundskeeper — weekly site health report

**Date:** 2026-11-02
**Site:** whattosow.co.uk (Next.js on Netlify)
**Report only — no site code touched, nothing deployed.**

## Summary

- **Pages checked:** 244 of 394 sitemap URLs — all 213 non-variety pages (100%) plus a sample of 31/181 variety pages. **All returned HTTP 200.**
- **Images checked:** 268 local `/public` images + 38 Unsplash images referenced in `src/` = 306. **All returned HTTP 200.**
- **Affiliate/outbound links checked:** ~190 distinct URLs across Amazon, Thompson & Morgan, Suttons, Sarah Raven, Dobies, Awin, Ko-fi, Pinterest, Met Office. **Zero confirmed BROKEN (404/410/DNS failure).**
- **Seasonal:** clean — homepage and `/still-time` compute "sow now" content live off today's date (confirmed showing "Monday 2 November" / "Sow now for autumn & winter"), not hardcoded. No stale seasonal copy found.

**Nothing is confirmed broken this week.** One thing below (Sarah Raven searches) is odd enough that it's worth a two-minute manual look even though it isn't a clear-cut fault.

---

## 🔶 WORTH A MANUAL LOOK (not a confirmed break, but off-pattern)

### Sarah Raven searches: every single one came back "0 results"
Checked 66 sampled `sarahraven.com/search?q=...` links (out of ~109 used across `crops.ts`/`varieties.ts`). Unlike Suttons/T&M/Dobies, Sarah Raven's site did **not** bot-block the request (HTTP 200, full ~300KB page) — but **66 of 66**, including generic terms Sarah Raven definitely stocks (`tomatoes seeds`, `lettuce seeds`, `carrots seeds`), rendered "0 results"/"No results" in the HTML.

Two possible explanations, and I can't tell which from a plain fetch:
1. Sarah Raven's search results load via client-side JS/API after the page loads, so a non-browser request never sees them (false alarm — links are probably fine in a real browser).
2. Their search backend genuinely isn't matching these query strings any more (real problem — every Sarah Raven link on the site would be a dead end for visitors, even though it's technically a 200 page, not a 404).

**Suggested action:** open 2–3 Sarah Raven links from the site in an ordinary browser (e.g. the "broad beans" or "tomatoes" crop page) and see if products actually appear. If they don't, this affects the Sarah Raven column on every crop/variety page — worth flagging as a possible silent revenue leak even though no link is technically dead.

---

## UNVERIFIABLE — bot-blocked or challenge-gated, click-test manually

These returned 403/202/a bot-check page rather than real content, so a curl check can't distinguish "fine" from "actually broken" per this routine's standing instructions. None are flagged as broken.

| Destination | What happened | Where used |
|---|---|---|
| Suttons.co.uk search links | HTTP 403 (Cloudflare) | ~47 `crops.ts` + ~161 `varieties.ts` entries |
| Thompson & Morgan search links | HTTP 403 (Cloudflare) | ~47 `crops.ts` + ~164 `varieties.ts` entries, plus several guide pages |
| Dobies.co.uk (autumn onion-planting link) | HTTP 403 (Cloudflare) | `guides/autumn-planting-garlic-onions` |
| Awin `cread.php` tracked redirect | HTTP 403 when hit directly | `src/lib/awin.ts` — wraps T&M/Suttons/Crocus/Primrose/Dobies/Mr Fothergill's links |
| Ko-fi donate link | HTTP 403 (Cloudflare) | Footer (×2) |
| Amazon.co.uk `/dp/ASIN` product links (32 unique ASINs) | HTTP 200, but served a generic 3.8KB bot-check page (title just "Amazon.co.uk", no product content) — status code alone proves nothing here | Guide buyer-notes, kit pages, components (BlightKit, GearPick, etc.) |
| Amazon.co.uk `/s?k=...` search links | HTTP 202 (automation challenge) | Many guide pages, buyer-note components |

Amazon ASIN links are the one category here genuinely worth an eyeball pass at some point — discontinued ASINs are a real, recurring failure mode on Amazon (unlike search pages, which almost never "404"), and this check can't see through the bot wall to confirm any of the 32 individually.

---

## Note, not a fault

`src/lib/awin.ts` declares active Awin merchant IDs for Crocus and Primrose, but neither domain currently appears as an actual destination URL anywhere in `crops.ts` or `varieties.ts` — those two mappings are just sitting dormant. Not broken, just unused.

---

## OK — everything checked clean

- 213/213 non-variety sitemap pages (home, `/sow`, `/crops`, `/grow`, `/harvest`, `/calendar`, `/frost-map`, `/blight-watch`, all 38 guides, blog index + posts, all city and month pages, companion-planting topics) → 200.
- 31/181 sampled variety pages (`/crops/[slug]/[variety]`) → 200.
- 268/268 local images in `public/photos` and `public/images` → 200 (four had spaces in filenames — confirmed fine once URL-encoded, no actual issue).
- 38/38 Unsplash photo IDs referenced from `src/data/crops.ts` → 200.
- Seasonal content (homepage, `/still-time`, `/grow-your-christmas-dinner`) computes off the live date — correct for 2 November.

— The Groundskeeper

# The Groundskeeper — weekly site health

**Run date:** Monday 21 September 2026, 06:13 UTC
**Site:** whattosow.co.uk (checked against the live sitemap, 393 URLs)

## OK summary

- **242 internal pages checked** (all 212 non-variety pages in the sitemap, plus a spread sample of 30 of the 181 crop-variety pages) — **all returned HTTP 200**. No broken pages this week.
- **38 images checked** (every distinct Unsplash photo ID referenced across crops, the Christmas plate, and hero images) — **all returned HTTP 200**. Cross-checked every local `/photos/...` path referenced in `src/` against `public/photos/` — all present on disk (two grep hits that looked like missing files, `/photos/blog/...webp` and `/photos/varieties/tomatoes-sungold.webp`, turned out to be a placeholder comment and a commented-out example respectively — not real references, nothing to fix).
- **178 outbound/affiliate links checked**: 46 Sarah Raven seed-search links + 35 distinct Amazon product links returned clean 200s. 47 Thompson & Morgan, 47 Suttons, 1 Dobies, and 1 Ko-fi link came back 403 (bot-blocked — see below). One Amazon link 404'd on first try, retried clean twice — treated as a flake, not broken (see BROKEN section).
- Seasonal content: **all clear**. The homepage, sow list, and editor's note are correctly reading "September 2026" live off the shared UK seasonal clock added recently (`feat: add shared UK seasonal clock`, `fix: keep homepage and sow list in season`, `fix: refresh public seasonal routes hourly`) — no stale hardcoded months found.

## BROKEN

None. Nothing needs fixing this week.

*(One near-miss, noted for the record, not action: `https://www.amazon.co.uk/dp/B000TAFENY` — the soaker-hose pick used in `BlightKit.tsx`, `BlightMap.tsx`, and the watering-while-away guide — returned a single 404 on the first pass. Retried twice more, both clean 200s. Treated as an Amazon-side blip, not a dead link. Worth a manual glance only if it recurs next week.)*

## UNVERIFIABLE — click-test manually

These returned 403 (bot/Cloudflare block), which is expected for these merchants and is **not** proof of a dead link — please click-test a couple from each when you have a moment:

- **Thompson & Morgan** (`thompson-morgan.com`) — 47 seed-search links across crop pages, all 403'd identically. Known bot-blocker; sample-clicking 2–3 crop pages (e.g. broad beans, carrots) should be enough to confirm the pattern still holds.
- **Suttons** (`suttons.co.uk`) — 47 seed-search links, same pattern, same recommendation. Also used for the Christmas-plate seed-potato link.
- **Dobies** (`dobies.co.uk`) — 1 link, the autumn onion-planting category page in the garlic/onions guide.
- **Ko-fi** (`ko-fi.com/whattosow`) — the footer support link.

None of these are new — Suttons and Thompson & Morgan have blocked automated checks every week this pattern's been run. Flagging per the "distinguish real 404 from bot-block" rule, not as a change from last week.

## SEASONAL notes

Nothing to flag. September copy, the sowing clock, and the editor's note are all in step with today's date. The recent fixes for pages frozen at build time appear to be holding.

---

*Checked: 393 sitemap URLs total — 212 non-variety pages checked in full, plus a 1-in-6 spread sample of 30 (of 181) crop-variety pages, for 242 pages fetched directly. Also 38 images and 178 outbound/affiliate links. Report-only — no site code touched, nothing pushed to `main`.*

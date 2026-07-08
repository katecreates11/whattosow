# The Groundskeeper — weekly site health

**Date:** 2026-07-08
**Site:** whattosow.co.uk

## Summary

All clear this week. No broken pages, no broken images, no dead affiliate links (404/410/DNS-failure) found. Two merchants continue to bot-block automated checks (see UNVERIFIABLE below) — that's expected and not evidence of a problem, but worth an occasional manual click-test.

*Note: an earlier run today hit a network-egress block and could only inventory the repo, not check anything live — that report is superseded by this one, which had full network access and completed all checks below, including the one lead the earlier run flagged for manual follow-up (see next paragraph).*

**Followed up from that earlier inventory:** it flagged four Amazon ASINs (`B000TAFENY`, `B0014E0UWC`, `B00US8ESWK`, `B01MQDGXMO`) appearing in source both with and without `?tag=whattosow21-21`, worried the untagged copies might be losing commission if they're the ones actually rendered. Checked this directly — every "untagged" instance is either passed through the `AffiliateLink` component (which adds the tag automatically at render, per `withAmazonTag()` in `src/components/AffiliateLink.tsx`) or built via a local `amazonAsin()` helper that bakes the tag in (`src/app/kit/page.tsx`). No revenue leak — false alarm, nothing to fix.

## BROKEN

None found.

## UNVERIFIABLE — click-test manually

Suttons and Thompson & Morgan return `403 Attention Required! | Cloudflare` to automated requests (confirmed Cloudflare bot-challenge page, not a real 404 — checked response headers/body on a sample). This affects every search-link to those two merchants across the crop pages:

- **Suttons** (`suttons.co.uk/search?q=…`) — 47 links, one per crop, all 403-blocked.
- **Thompson & Morgan** (`thompson-morgan.com/search?q=…`) — 47 links, one per crop, all 403-blocked.

These have blocked the Groundskeeper the same way for a while now, so it's a standing pattern rather than a new fault. Recommend Kate spot-click 2–3 of each (e.g. broad beans, tomatoes, carrots) next time she's on the site, just to be sure nothing's actually broken behind the block.

Sarah Raven (46 links) and Amazon (21 kit product links + gear/ASIN links) all responded 200 to the same checks — no block on those two.

## SEASONAL

No issues. It's 8 July — high summer:

- Homepage hero eyebrow correctly reads "The growing season's in full swing" (calendar-driven off `nowMonth`, not hardcoded).
- `/blight-watch` and `/still-time` both read correctly for the season (blight risk live-tracking, closing sowing windows).
- Nothing hardcoded to a wrong month found on the pages checked.

## OK — counts checked

- **Pages:** 208/208 core pages (from the live sitemap, every non-variety URL) returned 200. Sampled 30 of the 181 crop-variety pages — all 200.
- **Images:** 131 referenced photo paths checked live on whattosow.co.uk — 130 returned 200. The one 404 (`/photos/varieties/tomatoes-sungold.webp`) is **not a live bug** — it only appears inside a commented-out example in `src/lib/variety-photos.ts`, never rendered. No action needed. All 38 Unsplash hero images (crop pages + Christmas planner, which reuses the same IDs) returned 200.
- **Affiliate/outbound links:** 161 checked — 67 confirmed live (200: Amazon, Sarah Raven), 94 bot-blocked/unverifiable (Suttons, Thompson & Morgan — see above). Zero confirmed-broken (404/410/DNS-failure).

— The Groundskeeper

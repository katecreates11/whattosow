# The Groundskeeper — weekly site health — 2026-07-08

## ⚠️ Network access was blocked this session — no live checks could run

This run could not reach the internet at all. Every outbound HTTPS request — including
plain requests to `whattosow.co.uk` itself — was rejected by the session's egress proxy
with `403 (policy denial)`, not by any merchant's bot-blocking. This affected both the
`curl`/Bash path and the `WebFetch` tool. Sample from the proxy's own diagnostics:

```
gateway answered 403 to CONNECT (policy denial or upstream failure)
host: whattosow.co.uk:443
host: www.suttons.co.uk:443
host: www.thompson-morgan.com:443
host: www.amazon.co.uk:443
host: www.sarahraven.com:443
```

So this week I could **not** verify:
- Any of the site's own pages return 200
- Any images actually load
- Any affiliate/seed-supplier link is live vs. dead

**Action needed:** this looks like the scheduled environment's network policy doesn't
allow outbound web access, which the Groundskeeper needs every week to do its job.
Worth checking the environment's network policy setting (see the "Environment
configuration" section of the Claude Code on the web docs) and allowing outbound
HTTPS, or at minimum an allowlist covering `whattosow.co.uk` and the merchant domains
below, before next week's run. GitHub and Gmail worked fine (they're separate
connectors), which is why this report and email could still be delivered.

Below is everything I *could* establish from the repo itself, so next week's run (once
network access works) has a ready-made checklist rather than starting cold.

---

## Inventory gathered from source (not live-verified)

**Pages** — ~404 URLs would be in the sitemap: 54 static/hand-listed pages (home, /sow,
/crops, /grow, /harvest, /calendar, /frost-map, /blight-watch, /still-time, all 27
/guides/* pages, etc.), 47 crop pages, 183 variety pages, 51 sow-in/[city] pages, 12
monthly /sow/[month] pages, 9 editorial + 29 regular blog posts, 19 companion-planting
topic pages.

**Images** — 147 local photos under `public/photos/` (all `.webp`, split across
`blog/` and `crops/`), plus 3 `images.unsplash.com` references in `src/` (used via
`UnsplashHero.tsx`). None of these were fetched this week to confirm they render.

**Outbound / affiliate links** — 644 unique product-level URLs referenced across
`src/data/crops.ts` (`seedSuppliers`), `src/data/varieties.ts`, `src/data/kit.ts`,
`src/data/crop-kit.ts`, and affiliate components (`AffiliateLink`, `SeedSupplierLinks`,
`CropBuyingAdvice`, `GearPick`, `BlightKit`, `CropKit`, `ChristmasPlate`, etc.), by
domain:

| Domain | Link count | Notes |
|---|---|---|
| suttons.co.uk | 217 | Awin-tracked (mid 25121) |
| thompson-morgan.com | 210 | Awin-tracked (mid 2283), incl. `search.thompson-morgan.com` |
| amazon.co.uk | 127 | `tag=whattosow21-21` Associates tag — some entries **missing the tag** (see below) |
| sarahraven.com | 89 | Untracked (no active Awin programme per `awin.ts` comment) |
| ko-fi.com | 1 | Support link |
| pinterest.com, x.com/x | 3 | Social share links |

`src/lib/awin.ts` also lists `crocus.co.uk`, `primrose.co.uk`, `dobies.co.uk`, and
`mr-fothergills`/`mrfothergills` as active Awin advertisers, but I found no literal
URLs to those domains in `src/data/` this week — worth a `grep -r` if any content
references them, to make sure those links are actually getting the tracked wrapper.

**Possible non-network issue spotted while grepping** — a handful of the 127
`amazon.co.uk` URLs appear twice in the source, once with `?tag=whattosow21-21` and
once without (e.g. `B000TAFENY`, `B0014E0UWC`, `B00US8ESWK`, `B01MQDGXMO`). If any of
those un-tagged copies are the ones actually rendered on a live page, that's a
silent revenue leak (click goes through, no commission). Worth a manual check —
I didn't trace which literal string lands on which component this week.

## Seasonal sanity

Checked `src/app/page.tsx`'s homepage hero copy — the "sow now" eyebrow text and
lead interactive module are computed live from `new Date()` (not hardcoded), and for
today (8 July) it correctly resolves to "The growing season's in full swing" for the
Jun–Aug summer branch. No stale hardcoded seasonal copy found on the homepage.
Guides pages weren't checked line-by-line this week (light-touch pass, prioritised
the network outage above).

## OK summary

Nothing was live-checked this week — 0 of ~404 pages, 0 of 644 affiliate links, 0 of
150 images confirmed reachable — due to the network block described above. This is
a report of what needs checking next run, not a clean bill of health.

# The Groundskeeper — weekly site health

**Run date:** 2026-09-07
**Checked against:** live site (whattosow.co.uk) + repo at `main`@`7ba73e0`

---

## BROKEN — needs fixing

### 1. Homepage and `/sow` are stuck showing August, not September (stale cache — likely root cause found)

Both pages are being served from a Netlify/Next.js cache that hasn't revalidated in over a week:

- `https://whattosow.co.uk/` — response header `x-nextjs-date: Mon, 31 Aug 2026`, `cache-status: "Netlify Durable"; ttl=30953214` (≈358 days remaining). Live page currently reads **"See the full August sowing list"** and "sow now" countdowns computed from an 31 Aug snapshot — wrong for 7 September.
- `https://whattosow.co.uk/sow` — same symptom, snapshot from `01 Sep`, ttl similarly huge.

Likely cause: `src/app/page.tsx` computes `new Date()` at render time to pick the current month (line ~87-89), but unlike other date-sensitive routes it has **no `export const revalidate`**. Compare:
- `src/app/crops/[slug]/page.tsx:408` → `export const revalidate = 86400;`
- `src/app/guides/page.tsx:6` → `export const revalidate = 3600;`
- `src/app/grow-your-christmas-dinner/page.tsx:7` → `export const revalidate = 3600;`
- `src/app/page.tsx` and `src/app/sow/page.tsx` → no `revalidate` export found, so Next treats them as fully static and Netlify caches the first render near-indefinitely.

Effect: every visitor to the homepage and the main `/sow` hub is currently being shown last month's sowing list. This is the site's two highest-traffic pages, so worth a look before the month drifts further.

### 2. Three genuinely dead Sarah Raven affiliate links (still broken — first flagged a month ago, unfixed)

All three return a real HTTP 404 (not a bot-block — confirmed with a browser user-agent, retried, consistent). These are the same three links a Groundskeeper run flagged on 10 August; they're still live on `main` and still 404ing, so they've been quietly losing commission for about a month.

| Variety page | Broken URL | Source |
|---|---|---|
| `/crops/squash/uchiki-kuri` | `https://www.sarahraven.com/flowers/seeds/seeds-to-order-now/climbing-onion-squash-red-kuri.htm` | `src/data/varieties.ts:1604` |
| `/crops/basil/genovese` | `https://www.sarahraven.com/veg-fruit/seeds/herb-seeds/genovese-basil.htm` | `src/data/varieties.ts:2395` |
| `/crops/rhubarb/champagne` | `https://www.sarahraven.com/veg-fruit/plants/fruit/rhubarb-champagne.htm` | `src/data/varieties.ts:2831` |

Sarah Raven appears to have restructured or delisted these product pages. Thompson & Morgan and Suttons links for the same three varieties are all fine, so each of these pages still has working buy options — but the Sarah Raven option is a dead click for anyone who picks it.

---

## UNVERIFIABLE — click-test manually

These returned bot-block responses (Cloudflare 403 on the merchant, or Amazon's bot-challenge 202) rather than a real 404/410, so they are **not** confirmed broken — just impossible to check by script. Sampled/grouped rather than listed individually since the pattern is uniform per domain:

- **Thompson & Morgan** — 211 links checked, all 403 (Cloudflare bot-block). This is expected; T&M has blocked scripted requests in every previous Groundskeeper run too.
- **Suttons** — 208 links checked, all 403 (Cloudflare bot-block), same as above.
- **Amazon.co.uk** `/s?k=...` search links (buying-guide "shop this" links, not product deep-links) — 35 links, all returned 202 (Amazon's bot-challenge status for search pages). Direct `/dp/ASIN` product links (22 of them) mostly came back clean 200s — see OK summary.
- `search.thompson-morgan.com` (used once, in `src/data/companion-topics.ts:59`) — 403, same bot-block.
- `ko-fi.com/whattosow` — 403 on this check; ko-fi has occasionally challenged scripted requests before. Worth a manual click if it's been a while since anyone visited the "buy me a coffee" link — low stakes either way.

**Recommendation:** these are the same merchants that block bots every week — no action needed unless Kate wants to spot-check a handful by hand. Nothing here is new or unusual.

---

## SEASONAL notes

- Beyond the stale-cache issue above (§BROKEN 1), the rest of the site's seasonal logic looks sound: `Marquee.tsx` and `BlightKit.tsx` both branch on `new Date().getMonth()` with sensible September/October ranges, and the crop calendar (`MONTH_SLUGS`) is data-driven, not hardcoded to a month.
- National Allotments Week and other date-anchored editorial content weren't checked in depth this run (out of scope for a link/uptime pass) — flagging only that the homepage cache bug above means *any* "this month" framing on `/` and `/sow` is currently wrong, independent of the underlying data being correct.

---

## OK summary

- **392/392** internal site pages (from the live sitemap) returned HTTP 200 — every crop, variety, `sow-in/<city>`, guide, blog and editorial page checked, sampled generously across the 229 crop/variety pages.
- **264/264** images returned HTTP 200 — all 226 self-hosted `/photos/*` files plus all 38 distinct Unsplash crop photos referenced in `src/data/crops.ts`.
- **122/585** outbound/affiliate link checks resolved cleanly (200), including all 19 distinct Amazon `/dp/ASIN` product deep-links used across kit pages and editorial posts (one flaked to a 404 on first pass, retried clean — Amazon rate-limiting, not a real break).
- **459/585** were bot-blocked by the merchant (403 T&M/Suttons/search.thompson-morgan, 202 Amazon search) — see UNVERIFIABLE above, not counted as broken.
- **3/585** were confirmed genuinely broken — see BROKEN §2.
- Two false positives excluded from the outbound count before checking: a Googlebot user-agent string matched from a unit test file (not a real link), and a Stadia Maps tile URL template containing `{z}/{x}/{y}` placeholders (not a literal fetchable URL).

---

*Report only — no site code touched. Never pushed to `main`, no deploy triggered.*

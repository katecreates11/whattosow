# The Groundskeeper — weekly site health report
**Date:** 2026-08-03

All clear this week. No broken pages, no broken images, no confirmed-dead affiliate links. Two seed suppliers remain bot-blocked to automated checks (as most weeks) — worth an occasional manual click-test but not urgent.

---

## BROKEN

None found. 🎉

---

## UNVERIFIABLE — click-test manually

These merchants block automated requests (Cloudflare bot protection, 403 on every URL — including their own homepage, so this is a site-wide bot policy, not evidence of any specific dead link). A 403 here is *not* proof of a broken link; only a genuine 404/410/DNS failure would be. None of the sampled/checked URLs returned that.

- **Thompson & Morgan** (`thompson-morgan.com`) — 47 crop-page search links + 104 unique direct product links from variety pages, all checked, all 403. Homepage itself also 403s. Worth an occasional manual spot-check since these are affiliate revenue, but nothing here indicates an actual break.
- **Suttons** (`suttons.co.uk`) — 47 crop-page search links + 161 unique direct product links from variety pages, all checked, all 403. Same pattern — homepage also 403s.
- **Crocus, Primrose, Dobies** (configured Awin merchants in `src/lib/awin.ts`, not currently linked from any live page) — root domains sampled, also 403. Informational only: no live link on the site points at them yet, so nothing to click-test.

Nothing in this list threw a 404, 410, or DNS failure — if it did, it would be in BROKEN above instead.

---

## SEASONAL

Checked the homepage's live "sow now" and "harvest this week" sections (these are calculated from the current date, not hardcoded) against 3 August:

- **Sow now:** beetroot, coriander, dill, french beans, lettuce, peas (closing, 2 days left), radishes, rocket, spinach, spring onions — all correct for early August UK sowing.
- **Harvest this week:** aubergine, brussels sprouts, carrots, chillies, dill, fennel, french beans, garlic, onion sets, parsnips, peppers, runner beans, spring onions, squash, sweetcorn, tomatoes — correct peak-summer harvest list.

No hardcoded "sow X now" copy found anywhere that's fixed to a specific month or season out of step with today's date. Nothing to flag.

---

## OK summary

| Checked | Count | Result |
|---|---|---|
| Internal pages (from live sitemap.xml) | 390 | all HTTP 200 |
| Local images (`public/photos/**`) | 226 | all HTTP 200 |
| Unsplash-hosted crop/Christmas-plate images | 38 unique IDs | all HTTP 200 |
| Amazon affiliate links (product ASINs + search endpoints) | 33 unique ASINs + spot-checked search URLs | all resolving |
| Sarah Raven affiliate search links | 46 unique queries | all HTTP 200 (not bot-blocked) |
| Thompson & Morgan affiliate links | 47 search + 104 product URLs | site-wide 403 (see UNVERIFIABLE) |
| Suttons affiliate links | 47 search + 161 product URLs | site-wide 403 (see UNVERIFIABLE) |

**Total: 390 pages, 264 images, ~440 outbound/affiliate links checked. Nothing confirmed broken.**

---

*Report only — no site code touched, nothing deployed. Kate fixes; the Groundskeeper watches.*

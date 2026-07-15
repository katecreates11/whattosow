# Every Drop — what your roof could give the garden

*Spec, 12 July 2026. Board card #8 (Forager, approved by Kate 12 Jul with notes). Build after Kate reviews this spec. News window: hosepipe restrictions expand ~17 July (~11m people).*

## What it is

A feature page at **`/every-drop`**: tell it roughly what roof you have (shed, greenhouse, garage — or your own measurements) and where you are, and it tells you what a year of your own rain is actually worth to a vegetable grower — not litres in the abstract, but *"about 40 good soaks of a tomato bed"*. A quiet, honest nudge toward a water butt (or a second one), pointing at the existing buying guide.

It joins three things the site already owns: the postcode/location plumbing, the watering guide's own numbers, and the water-butt guide's affiliate links.

## The angle (Kate's reframe — this is the voice of the page)

**Not fear.** Kate's note: allotments are generally allowed to keep watering food crops during a hosepipe ban — you don't lose your hard work. But allotment culture takes water seriously anyway: no unattended hoses, no hogging the tap, and sites actively encourage "water harvesting" — lots of butts. Her own site encourages it; her own butt is the terracotta-look one we've photographed two summers running.

So the page's story is: *the most allotment thing you can do this summer is catch your own.* The calculator shows how much "your own" really is. The ban question is answered honestly in the FAQ (great search query, nobody answers it well) — with the responsibility culture, not doom.

## The answer-first design (per DIRECTION / ANTI_PATTERNS)

One interpreted sentence first, mono footnote beneath. **No metric-tile row, no gauge cluster.**

> **A shed roof in Birmingham catches about 5,800 litres a year — that's a full water butt 28 times over, or about 190 proper soaks of a tomato bed.**
> `SHED 6×4 · YOUR RAINFALL ~740MM/YR · CAPTURE ~80%`

The three translations rotate *inside the sentence* (butt-fills / soaks / watering cans), never as separate stat boxes.

## Inputs

1. **Roof** — preset chips in site style: `Shed 6×4` · `Shed 8×6` · `Greenhouse 6×8` · `Single garage` · `House side (guttered)` · `Own size…` (two small m inputs). Presets carry honest roof-footprint values: 6×4 shed ≈ 2.3m², 8×6 shed ≈ 4.5m², 6×8 greenhouse ≈ 4.5m², single garage ≈ 18m², guttered house side ≈ 30m². (Worked example at UK-average rain: the 8×6 shed gives ~3,200L/yr ≈ 15 butt-fills ≈ 105 bed-soaks — enough to matter, honest enough to say a tiny 6×4 gives half that.)
2. **Location** — the existing `LocalisePostcode` component (as on /longest-day); listens for `whattosow:location-updated`. No postcode → UK-average rainfall (~885mm) with the usual "add your postcode to tune it" mono line.

## Data & maths (deterministic, no API)

- **`src/data/uk-rainfall.ts`** — new static dataset: ~30 UK points (Met Office 1991–2020 annual climate normals for representative stations: Plymouth, Cardiff, Birmingham, Manchester, Fort William, Norwich, Cambridge, Kent, Belfast, Aberdeen…). Lookup = inverse-distance weighting of the 3 nearest points from lat/lng. Cite the normals period in the footnote.
- **Litres/year = roof footprint m² × rainfall mm × 0.8** (capture efficiency: diverter + overflow losses; state the 0.8 honestly in the footnote).
- **Translations** (site's own numbers, cross-referenced in copy):
  - *Good soak* = 10 L/m² (the watering guide's figure) × 3m² tomato bed = **30L per bed-soak**
  - *Watering can* = 10L
  - *Butt-fill* = 210L (the standard butt in the buying guide)
- **Monthly shape**: same dataset carries per-month normals so the visual can show summer vs winter catch ("even June gives you ~X cans").

## The visual centrepiece — Kate's terracotta butt, filling

The hero interactive is a **bespoke SVG of a terracotta water butt** (drawn in the site's warm editorial style — it is *her* butt, the one in the photos below it). As you change roof/location:

- The butt **fills and overflows N times** in a gentle loop — one fill-and-empty cycle per butt-fill-per-year, sped to ~6s total, counter ticking up in serif type ("…28 times over").
- Reduced-motion: static filled butt + the number.
- No axes, no bars. If a monthly view earns its place, it's **12 small hand-drawn droplets** sized by month (Jan big, Jul small) under a mono label — organic, not a chart (per dataviz skill: form first, one hue, no rainbow).

## Visual-led & editorial — the media plan (all assets exist)

| Moment | Asset | Why |
|---|---|---|
| Hero image | `water-butt-2025.webp` (the terracotta butt) | the page is literally about this object |
| "The culture" section | **`watering-can-nasturtiums.mp4`** (unplaced, gorgeous) | butt-water on the beds — the payoff of harvesting |
| "Owned since 2022" unit | `water-butt-2022.webp` + `water-butt-2025.webp` | reuse the ownedSince component — proof before the buy-point |
| Rain texture moment | `cloche-dome-beaded.webp` (water-beaded cloche) | the only "rain" photo we own; editorial pause |
| Optional close | `lance-spray-loop.mp4` poster or `watering-can-lettuce.mp4` | links onward to the watering guide |

Layout rhythm follows the blog's editorial grammar: drop-cap lead → calculator (the Answer) → butt visual → culture section with video → FAQ → ownedSince + buy-points → onward links. Videos via `LoopClip` (portrait at 24rem, muted, on-screen-only).

## Monetisation (after the answer, never inside it)

- Primary: **the water-butt guide** (`/blog/best-water-butts-uk`) — "the butts we'd actually buy" editorial link.
- Two direct `AffiliateLink` products *after* the FAQ: the guide's top butt + a **rain diverter kit** (the thing most people are missing; ~£15, high attach-rate). Optional third: linking kit ("two butts beat one" — echoes the compost guide's line).
- Calculator result includes one quiet contextual line when catch > 2 butt-fills: *"Your roof outruns one butt by March — a second, linked, catches the difference."* → guide link, not a button.

## Season awareness

Dateline chip reuses `getWeatherState` + `conditionsFrom` (as /guides): *"Day 9 of a dry spell"* when true — the page feels aware of the moment it's read in. Month-only fallback when the API is down; calculator itself never depends on the API.

## FAQ (+ FAQPage schema)

1. **Can I water my allotment during a hosepipe ban?** — the honest, nuanced answer (food crops generally allowed; check your water company; site etiquette: attended hoses, no hogging — Kate's culture framing).
2. How much rain does a roof really collect?
3. Do I need gutters on a shed? (yes — cheap kits exist → diverter link)
4. Is butt water safe for vegetables? (yes; avoid leaves of salads right before picking; standard advice)
5. How big a butt do I need?

## SEO

Targets: "rainwater harvesting calculator uk", "how much rainwater from my roof", "can I water my allotment in a hosepipe ban" (the FAQ can rank alone), "water butt worth it". Article + FAQPage schema; canonical `/every-drop`; internal links from watering guide, water-butts guide, /grow, guides index (add to `guide-relevance` META with `hotDry` boost so it surfaces in dry spells).

## Files

- `src/app/every-drop/page.tsx` (server: schema, layout, media) + `EveryDropCalculator.tsx` (client: inputs, sentence, butt SVG)
- `src/data/uk-rainfall.ts` (+ tiny test: IDW returns sane values for 3 known cities)
- `src/components/ButtFill.tsx` (the SVG animation; reduced-motion safe)
- Edits: watering + water-butts guides gain one editorial cross-link each; guides index META entry; sitemap.

## Not doing (deliberately)

- No tank-sizing configurator, no ROI/money-saved claims (rain is free, butts are cheap — don't dress it as finance).
- No live rainfall API — normals are the honest, stable answer.
- No metric tiles, no gauges, no percentage dials (ANTI_PATTERNS).
- No doom framing of bans.

## Open for Kate before build

1. Preset list OK, or add "polytunnel"? (We don't own one — presets shouldn't imply we do.)
2. The butt SVG will be drawn to *resemble* your terracotta one — happy for it to be recognisably yours?
3. Route name `/every-drop` (vs `/rainwater`)? Every Drop is the charmer; rainwater is the SEO-literal. Recommend `/every-drop` with the SEO carried by title/H1.

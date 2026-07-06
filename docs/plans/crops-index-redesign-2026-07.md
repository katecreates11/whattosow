# /crops redesign — the field-guide index (July 2026)

Read `docs/DIRECTION.md`, `docs/ANTI_PATTERNS.md` (§1, §2 are this page's exact
diseases) and `docs/tone-of-voice.md` first. This replaces the forty-equal-boxes
browse page with the contents page of the field guide.

## 1. The role of /crops

Navigation with pleasure: get a gardener to the right crop page in one glance,
and let the index itself say what season it is. It is the **contents page of the
herbarium** — the crop pages carry "No. 23" specimen plates, and this is the
numbered index they belong to. It is not an SEO landing page (crop pages own the
queries); it competes on speed and charm, not word count.

## 2. Mobile-first layout (390px)

Single column, ruled rows, grouped:

```
CROP INDEX                                ← mono eyebrow
The crops                                 ← serif H1
Everything in the field guide — and       ← standfirst, 1 sentence
when its moment is, at a glance.
                         in season now →  ← ONE quiet text toggle

● HARDY · sow from late winter            ← mono group label + colour dot (h2)
──────────────────────────────────────
№ 01  Broad beans            sow nov · feb–apr
──────────────────────────────────────
№ 02  Peas                   SOW NOW · mar–jun
──────────────────────────────────────
№ 07  Carrots                ~ CLOSING · by mid-july
```

Row anatomy: specimen number (mono, amber, small) · serif crop name (the link,
whole row tappable, ≥44px) · right-aligned mono tag. Nothing else. No boxes, no
left colour bars, no descriptions.

## 3. Desktop layout

Same rows flowing into **two columns per group** (`columns-2`,
`break-inside-avoid` on rows) — a seed catalogue's index page, not a card wall.
Groups run full-width with their label; generous vertical space between groups.
Optionally the current group's first in-season crop gets the only photo on the
page (one small square, top right of the group) — hierarchy, not decoration;
skip entirely if it fights the columns.

## 4. Grouping

Keep the four horticultural groups — they're real information, already in the
data, and they map to the existing category colour dots:

- **● HARDY** — "sow from late winter"
- **● HALF-HARDY** — "sow as the soil warms"
- **● TENDER** — "sow indoors, out after the frosts"
- **● FRUIT** — "plant once, pick for years"

Fixed order (hardy → half-hardy → tender → fruit), stable for crawl and memory.
Seasonal relevance is carried by row tags, not by reshuffling groups.

## 5. How crop links look

Serif names, never chips (ANTI_PATTERNS §2). Rust on hover, the row's hairline
rule as the only border anywhere on the page. The specimen number ties each row
to its crop page's "№" plate — the index and the pages are one book.

## 6. Row metadata

**One tag per row, mono, right-aligned.** Priority order:

1. `~ CLOSING · by mid-july` (amber) — when the urgency maths says so
2. `SOW NOW · direct` or `SOW NOW · indoors` (leaf) — in window now
3. `PLANT OUT NOW` — when that's the live action
4. otherwise the plain window: `sow mar–jun` (earth-lighter)

Kill "Direct sow 8w before frost" — frost-relative arithmetic is engine-speak
(a receipt, not a neighbour). Months are how humans hold sowing windows; the
engine already computes them (`getCropActionMonths`). Fruit rows: `plant nov–mar`
or nothing.

## 7. Avoiding cards, chips and equal boxes

There are no containers on this page at all: one H1, four group labels, ~40
ruled rows. Hierarchy comes from live tags (colour + weight), the group dots,
and the specimen numbers. If a design iteration adds a border on all four sides
of anything, it has failed §1 and starts again.

## 8. Search / filter

- **Keep exactly one control:** the existing "in season now" idea as a quiet
  mono text toggle (not a button) that hides rows without a live tag. It's
  genuinely useful in January when only six things are sowable.
- **No search box.** ~40 rows on one page is scannable; the groups are the
  index. Feature bloat starts here — don't.
- Toggle is a client sprinkle over a server-rendered full list; JS off = full
  list, which is also the crawl state.

## 9. Crawlable

Everything: full list server-rendered with real `<a>`s (this page is ~40 strong
internal links with clean anchor text), one h1, group labels as h2s, rows as a
semantic `<ul>`. UK-average tags server-render; postcode hydration of tags is
OPTIONAL and deferred (same pattern as /sow if ever wanted — don't build it in
v1). Title stays query-shaped ("Vegetable & Fruit Growing Guides — every crop |
What To Sow"); self-canonical.

## 10. Codex implementation notes

1. Read the docs listed at the top first.
2. File: the current browse page (src/app/crops/page.tsx or wherever "Browse the
   crops" lives — locate by its H1). **Fix the heading stutter while there**: one
   eyebrow + one H1 ("Browse the crops" + "Explore crops" currently stack — cut
   to the structure in §2).
3. Reuse: `crops` array order for № numbers (must match the crop pages' cropNo —
   same `findIndex` convention), `categoryDot` colours, `getCropActionMonths`
   for windows, `getCropStatus`/urgency for live tags. **No new season logic, no
   new dependencies.**
4. Server component; the in-season toggle is the only client code (a tiny
   wrapper or CSS-only via a checked input if simpler).
5. Month-range strings formatted lowercase mono ("mar–jun"); en-dash; no year.
6. Preserve every crop link. No tracking changes (no affiliate content here).
7. Quiet season (deep winter): the toggle's empty state shows one warm line
   ("Six things are sowable in January — the rest are waiting with us.") — never
   an empty page.
8. Verify 390px via CDP device emulation; tsc + `npm run build` + `npx vitest
   run` clean; Kate reviews at :3000; ONE deploy. Don't touch
   `src/data/image-slots.json` or `public/photos/slots/companion-*`.

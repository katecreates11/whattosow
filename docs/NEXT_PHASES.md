# What To Sow — Final Implementation Handover

**For every future agent (Codex, Claude, anyone).** The law is: `PROJECT_CONTEXT.md`
→ `docs/DIRECTION.md` → `docs/ANTI_PATTERNS.md` → `docs/COPY_REWRITES.md` →
`docs/tone-of-voice.md`, plus the page specs in `docs/plans/`. This document does
not add direction; it sequences it. Read the relevant spec before each phase.
When this document and a spec disagree, the spec is newer thinking — but flag it
to Kate rather than silently choosing.

Working rules that never change: build → Kate tests at localhost:3000 → ONE
deploy. `tsc --noEmit` + `npm run build` + `npx vitest run` clean before any
push. Verify mobile at 390px with CDP device emulation (`--headless --screenshot
--window-size` lies). Never touch `src/data/image-slots.json` or
`public/photos/slots/companion-*`. Commit messages name what was displaced when
anything is added to the homepage.

---

## 1. North star

What To Sow is becoming a **weekly gardening periodical, personally addressed** —
the front page answers "what can I sow right now, where I am?" in one second, the
listings and field guide carry the depth, and a real allotment (Kate's, with her
photographs, including the failures) is the proof behind every sentence. It earns
its keep through honest recommendations placed at the moment of need, on the way
to a shed. It is never a dashboard, a directory, or a content farm in a nice font.

## 2. Current state (July 2026) — what's already improved

- **Homepage postcode Answer** — first version live (simplified by Codex); the
  full letter-shape (recognition → interpretation → crops → tonight → doors) is
  specced in `homepage-experience-dashboard-split-2026-07.md`.
- **Tonight's Watering Note** — live, with a year of rotating state copy in
  `src/data/watering-notes.ts`.
- **Crop verdicts** — "Can I sow this now?" band live on crop pages.
- **Affiliate hygiene** — every outbound link through `AffiliateLink` (tag,
  rel=sponsored, one `affiliate-click` event with product/merchant/type).
- **Crop buying advice** — worth-buying/skip-this live for tomatoes, carrots,
  courgettes, maincrop potatoes, runner beans (`src/data/crop-kit.ts`).
- **Playbooks** — 5 crops have the full season/problems/FAQ/photos treatment
  (`src/data/crop-playbooks.ts`); a year of editorial copy is pre-written
  (`weekly-list.ts`, `seasonal-kit.ts` ×12 months, `almanac.ts`).
- **Voice** — the 181 variety personalities passed; 2 seasonal guides + the
  sweetcorn diary post live; governance docs in place.

## 3. The biggest remaining problems — bluntly

1. **The "Browse the crops" page is forty equal beige boxes** — the exact
   pattern DIRECTION forbids by name. Worst page on the site.
2. **The six-box grid still lives on /sow**, repeating crops three times per
   page in chip clouds.
3. **The homepage bottom half is dashboard ghost-town**: utility card rows, four
   sage guide tiles, three photo cards — and the page runs ~13 slots against the
   10-slot rule.
4. **The postcode greeting is a receipt** ("Barnet · your last frost was ·
   19 Apr"), not a sentence. The Answer isn't yet the letter the spec describes.
5. **Seed-vs-plug contradiction is live**: "Sweetcorn: too late" renders beside
   Kate's post about planting sweetcorn this week. Avoid-window thresholds also
   look too aggressive (courgettes "too late" in early July contradicts the
   July weekly-list copy).
6. **/my-garden has no real role** — it's the Lucky Dip garden without the
   noticeboard around it; meanwhile homepage still carries the metric strip and
   SkyTonight that belong there.
7. **Grey "VIEW ON AMAZON" pills** in the kit edit and rail — SaaS furniture.
8. **Copy risk at the edges**: repeated identical lines (avoid list), tool-speak
   ("Support this tool", "Free UK planting calendar"), and over-lyrical drift if
   future copy isn't checked against COPY_REWRITES.

## 4. The next 12 phases

Each is one Codex session, one commit, one Kate review. Order matters for 1–6;
7–12 can flex.

### Phase 1 — /sow listings redesign
- **Why:** kills the six-box grid where it lives; delivers the greeting-sentence
  fix (the review's "smallest change, biggest difference"); consumes the
  pre-written `weekly-list.ts`.
- **Spec:** `docs/plans/sow-page-redesign-2026-07.md` (follow it exactly).
- **Files:** `src/app/sow/page.tsx`, new `SowGreeting` client component, new
  `src/data/sow-greetings.ts`; remove `ServerSeasonalAnswer` usage from /sow.
- **Don't touch:** homepage, `/sow/[month]` pages, the `#kit` anchor/edit, email band.
- **Accept:** no boxes/chips; one deduplicated list with method tags; greeting is
  a sentence; UK-average fully server-rendered; every link + affiliate attribute
  preserved; 390px clean.
- **Taste-fail:** any bordered box; "UK AVERAGE ANSWER" heading survives; SEEDS
  column styled as buttons.
- **Commit:** `Redesign /sow as the editorial listings page (kills the six-box grid)`

### Phase 2 — Too-late contradiction audit & fix
- **Why:** live trust bug. The site says "too late" about things Kate is
  visibly doing.
- **Files:** the avoid-list source (`src/lib/server-seasonal-answer.ts` or
  successor), its window thresholds vs `season-core`; copy per COPY_REWRITES §3
  ("from seed" always; one sentence; every crop links its next-window month).
- **Don't touch:** the season engine's core maths without documenting why; crop
  page verdicts (separate logic).
- **Accept:** no bare "too late" anywhere; seed/plug distinction explicit;
  courgettes/sweetcorn July output manually sanity-checked against the weekly
  list and Kate's post; verdict copy passes the three-beat rule.
- **Taste-fail:** "unfortunately", repeated identical lines, a warning icon.
- **Commit:** `Fix too-late copy and windows: from-seed precision, one warm sentence`

### Phase 3 — /crops field-guide index
- **Why:** deletes the worst page on the site.
- **Spec:** `docs/plans/crops-index-redesign-2026-07.md`.
- **Files:** the browse page (find by its "Browse the crops" H1), reusing
  `getCropActionMonths`, urgency, `categoryDot`.
- **Don't touch:** crop pages, crops.ts ordering (№ numbers must match plates).
- **Accept:** zero containers; № numbers match crop pages; live tags correct for
  the current month; "in season now" is the only control; heading stutter gone.
- **Taste-fail:** any card, any left colour-bar, "Direct sow 8w before frost"
  surviving anywhere.
- **Commit:** `Redesign /crops as the numbered field-guide index`

### Phase 4 — Homepage final declutter
- **Why:** enforce the 10-slot page-count rule; the bottom half still grids.
- **Files:** `src/app/page.tsx` only.
- **Don't touch:** the components being removed (they stay in the codebase);
  Watering Note; jobs walls' data logic.
- **Accept:** exactly the 10 slots of DIRECTION §5; utility cards + guide tiles
  gone (links folded into footer doors / week's-list go-deeper); harvest wall
  compact; editor's note merged into the featured "from the plot" spread, not an
  11th slot; commit message names every displacement.
- **Taste-fail:** any grid of equal anything below the fold; a new slot smuggled in.
- **Commit:** `Homepage declutter to the 10-slot page count (displaced: …)`

### Phase 5 — /my-garden noticeboard, first slice
- **Why:** the dashboard needs a home before the homepage can shed it.
- **Spec:** `homepage-experience-dashboard-split-2026-07.md` §8.
- **Files:** `src/app/my-garden/page.tsx` + new section components reusing
  existing logic (weather/watering full view, your plants via MyPlot logic,
  alerts, sky tonight) ABOVE ReactGarden.
- **Don't touch:** /my-plot (still lives until Kate approves the merge),
  homepage, ReactGarden internals.
- **Accept:** renders with and without plot data; sentence-led sections, numbers
  whispered; noindex intact; warm empty states.
- **Taste-fail:** stat tiles; panel boxes; alert badges instead of notes.
- **Commit:** `My garden: the noticeboard sections (today, your plants, alerts, sky)`

### Phase 6 — Move WeatherCommandCenter / SkyTonight off the homepage
- **Why:** the metric strip is the last dashboard organ in the front page.
- **Files:** `src/app/page.tsx` (removals), dateline gains the moon cameo.
- **Don't touch:** the components themselves (they now serve /my-garden).
- **Accept:** homepage has at most one whispered mono weather line; moon in the
  dateline; /my-garden confirmed carrying the full versions BEFORE removal.
- **Taste-fail:** deleting instead of relocating; homepage losing its one
  weather sentence entirely.
- **Commit:** `Homepage: metrics move to my-garden; the moon keeps a dateline cameo`

### Phase 7 — Crop page trust & photo polish
- **Why:** the top third is still utility boxes; photos exist unplaced.
- **Files:** `PersonalisedCropDates` + `SowPlanner` (the "Your dates" merge —
  disclosure toggle, functionality intact), provenance line (COPY_REWRITES §1),
  place parked photos (peas-flowering-netting, pumpkin-planted-out,
  sweetcorn-planted-out-rows) as their playbooks arrive.
- **Don't touch:** playbook content, verdict band, schema.
- **Accept:** one calm dates block, `aria-expanded` toggle, add-to-plot intact;
  provenance line present; no photo captioned without Kate confirming the plant
  (see the cosmos incident, status notes 6 Jul).
- **Taste-fail:** the form still permanently open; a boxed panel look.
- **Commit:** `Crop pages: Your dates merge + provenance; parked photos placed`

### Phase 8 — Affiliate rail & button restyle
- **Why:** grey pills are the last SaaS furniture; ANTI_PATTERNS §8.
- **Files:** `SeedSupplierLinks`, `CropKit`, `CropBuyingAdvice`, `GearPick`
  styling only.
- **Don't touch:** URLs, `AffiliateLink` internals, any `data-umami-*` attribute
  (must remain **byte-identical** — diff the rendered HTML attributes before/after).
- **Accept:** serif-italic buy-lines in flow; mono-caps buttons only inside
  uniform commerce structures; tracking verified identical via curl diff.
- **Taste-fail:** a wall of identical buttons anywhere; any tracking change.
- **Commit:** `Restyle affiliate rail and buy-points to the editorial register (tracking untouched)`

### Phase 9 — Search Console / sitemap QA
- **Why:** indexing is the growth bottleneck; the machinery must be spotless.
- **Files:** `src/app/sitemap.ts` audit (every new page present, lastmod sane),
  canonicals spot-check, schema validation (Rich Results test on a crop page, a
  guide, the sweetcorn post), robots unchanged.
- **Don't touch:** URLs/slugs of anything indexed.
- **Accept:** sitemap count matches expectation; no orphan pages (every new page
  has ≥2 internal links); FAQPage/HowTo/Article validate; a written list of
  request-indexing URLs handed to Kate.
- **Taste-fail:** n/a (technical phase) — but no "SEO content" gets added.
- **Commit:** `SEO QA: sitemap, canonicals, schema validation, orphan sweep`

### Phase 10 — Performance & accessibility pass
- **Why:** mobile users in gardens on one bar; PROJECT_CONTEXT demands both.
- **Files:** image `sizes`/`priority` audit, LCP on homepage + a crop page,
  focus-visible/aria on the new toggles and the Answer, heading order sweep,
  colour-contrast check on mono-on-cream tags.
- **Don't touch:** visual design (fixes must be invisible).
- **Accept:** CWV green on homepage + tomato page (CDP mobile emulation);
  keyboard path through postcode → Answer → list works; no contrast failures at
  AA; `prefers-reduced-motion` respected by any animation.
- **Commit:** `Performance and accessibility pass (CWV + AA, no visual changes)`

### Phase 11 — Editorial content cadence
- **Why:** a periodical that doesn't publish is a brochure. The year of copy is
  pre-written; this phase makes the rhythm real.
- **Deliverable:** `docs/CADENCE.md` — the monthly 30-minute ritual: (1) Kate
  gives 2 sentences of plot news → editor's note updated (never fabricated);
  (2) verify the month rolled over cleanly (weekly list, kit edit, almanac,
  watering states); (3) one playbook crop added (queue: peas, lettuce, beetroot,
  onions, French beans, squash, kale — use the 5 shipped ones as the template);
  (4) one diary post when Kate has a story + photos; (5) pin batch.
- **Accept:** the doc exists, the current month passes its own checklist.
- **Commit:** `Editorial cadence: the monthly ritual, documented and verified`

### Phase 12 — Affiliate revenue measurement
- **Why:** the £300–£600 goal is managed by data now, not hope: the unified
  event has been live since 5 July.
- **Deliverable:** a documented monthly report pull (umami `affiliate-click` by
  merchant / product / page / type), written into `docs/CADENCE.md`; first
  analysis answers: in-flow vs rail CTR (the standing prediction: in-flow wins),
  Suttons vs Amazon conversion, which pages earn, which links have zero clicks
  (prune candidates per the monetisation rulebook).
- **Don't touch:** tracking plumbing.
- **Accept:** one page of findings with 2–3 decisions Kate can say yes/no to.
- **Commit:** `First affiliate measurement report + monthly pull documented`

## 5. Blocked decisions — DO NOT proceed without Kate's explicit yes

1. **Merging /my-plot into /my-garden** (and its redirect).
2. **Deleting any functionality or component** (incl. InSeasonBand — verify
   unimported, then still ask).
3. **Enabling email capture / reminders** (`NEXT_PUBLIC_EMAIL_SIGNUPS` stays off
   until she says).
4. **Expanding buying-advice blocks to all crops** (currently 5 — expansion
   follows playbook rollout, with her sign-off on the skips).
5. **Changing navigation labels** or the wordmark.
6. **Removing/replacing Unsplash imagery wholesale** (it retires photo-by-photo
   as Kate's replace it, never in a purge).
7. **Any change to existing affiliate URLs/ASINs** (Suttons links still await
   her click-test).
8. **Publishing anything in Kate's first-person voice she hasn't approved.**

## 6. Do not let Codex do this

- Add another grid of equal anything, anywhere.
- Add an 11th homepage slot ("just one small band").
- Create a chip cloud, a metric tile row, or a bordered panel with a title.
- Write vague-poetic copy, or copy with an exclamation mark.
- Move commercial content into a trust anchor (watering note, Answer, verdict,
  FAQ, problem clinic).
- Change a single `data-umami-*` attribute or affiliate URL while "restyling".
- Touch `image-slots.json` / `photos/slots/*` (another workflow owns them).
- Invent Kate's experiences, plant IDs, product ownership, or ASINs.
- Add a dependency.
- "Improve SEO" by adding pages or repeating keywords — depth and links only.

## 7. Taste QA checklist — run before every "safe to commit"

1. Read the relevant spec + ANTI_PATTERNS + COPY_REWRITES for the surface. Done?
2. Any element with borders on all four sides? Justify in writing or redesign.
3. Any repeated identical sentence or CTA label outside a commerce table?
4. Every number: does a sentence interpret it first?
5. Every new string: allotment-gate test (embarrassed = try-hard; "so what do I
   do?" = cold).
6. Crop names: serif links, never chips?
7. Affiliate attributes: byte-identical (curl + diff)?
8. `tsc` + `build` + `vitest` clean? 390px CDP check done? Screenshot LOOKED AT?
9. Homepage touched? Count the slots. Ten. Name the displacement.
10. Would Kate screenshot this? If unsure, it ships to :3000, not to origin.

## 8. Live-site QA — Kate, on your phone, after each deploy

1. Homepage: postcode entry → does the Answer feel like it knows your garden?
   Watering note match tonight's actual sky?
2. The changed page at 390px: no clipped text, no sideways photos, tap targets
   comfortable with muddy thumbs.
3. Tap one seed link and one kit link — do they land where they claim (right
   product, tag in URL)?
4. One crop page: dates match your plot's reality; photos are the right plants
   (cosmos rule).
5. Umami live view: your test clicks appear as `affiliate-click` with the right
   product.
6. Anything that made you wince → tell the next session verbatim; wincing is data.

## 9. The shed-fund path

**Monetise first:** the buying guides (high AOV — one raised-bed sale = fifty
seed packets), in-flow moments on playbook crops, the seasonal rotation, seeds
via the listings' uniform SEEDS column. **Never monetise:** the watering note,
the Answer, verdicts, FAQs, problem clinics (free fix first), charm moments,
email. **Worth-buying/skip expands** only with playbooks, every crop keeping a
real skip, ownership claimed only for kit Kate owns. **Watch monthly:**
affiliate-click by page/merchant/type, in-flow vs rail CTR, revenue per 1,000
sessions, GSC indexed count and query growth, and the prune list (zero-click
links get removed — the rulebook says trust is the compounding asset;
commission is the interest). The realistic path to £300–£600/mo is 12–18 months
of: distribution (indexing, Pinterest, backlinks — `docs/plans/backlink-kit-2026-07.md`)
× depth (playbooks) × honesty (the skips). No shortcuts exist; several
shortcuts are fatal.

## 10. What to sow loses when…

…it stops being edited. The moment a grid ships because a loop was easier than a
decision, a sentence ships because it sounds like other gardening sites, a link
ships where trust was doing the work, or a photo ships that Kate didn't take —
the site becomes what it swore not to be, and no amount of good code brings back
a reader who felt that change. It loses when the homepage grows an eleventh slot,
when "too late" forgets its "instead", when the shed fund becomes a sales target,
and when anyone — human or model — decides the rules in these documents are
suggestions. They aren't. They're the reason a tired gardener with muddy hands
and one bar of signal keeps coming back. Protect that reader and everything else
follows; lose them and nothing else matters.

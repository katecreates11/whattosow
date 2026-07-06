# What To Sow — Product & Editorial Direction Pack

**Status: LOCKED (July 2026).** This is the canonical direction. It consolidates and
supersedes ambiguity in the four specs (`docs/plans/crop-page-ideal-spec-2026-07.md`,
`homepage-charm-watering-2026-07.md`, `seasonal-answer-redesign-2026-07.md`,
`homepage-experience-dashboard-split-2026-07.md`) — read those for detail; read this
for direction. `PROJECT_CONTEXT.md` and `docs/tone-of-voice.md` still govern.

The organising idea for the whole site: **a weekly gardening periodical, personally
addressed.** The homepage is its front page. /sow is its listings. Crop pages are
its field guide. /my-garden is the reader's own noticeboard. Nothing on the site is
a dashboard, ever — data appears only after judgement, and judgement is written in
the voice of a friendly allotment neighbour.

---

## 1. The homepage north star

**What it is for:** answering "what can I sow right now, where I am?" in one
second, and being worth reading weekly even when the answer hasn't changed. It is
the front page of the periodical and the postcode moment is its headline act.

**What it is not for:** managing a plot, displaying metrics, housing every tool,
internal-link plumbing, or anything a returning power-user does daily (that's
/my-garden).

**Above the fold (mobile, 390px — the design target):** masthead + dateline →
H1 promise + postcode input (or the Answer, once entered) → Tonight's Watering
Note. Three answers, zero scrolling: what is this site, what can I sow, do I water.

**Before postcode entry:** the UK-average issue — watering note and week's list in
their middle-of-the-country state, each with one quiet "add your postcode" invite.
The page must be fully useful without personalisation, never a locked door.

**After postcode entry:** the input transforms in place (no navigation, no
spinner-grid; one charming loading beat). The Answer renders where the input was:
*recognition* ("Growing in Cirencester, then."), *interpretation* (their frost
pattern and season length as one warm sentence, never coordinates), *the answer*
(3–4 sowable crops + one closing window), *tonight* (the watering verdict), *two
doors* (/sow and /my-garden). The rest of the page quietly re-tunes via the
existing `whattosow:location-updated` event. The feeling: "it understood my
garden" — shown by interpretation, never by echoing data back.

**Remove / move / demote:** metric strip and SkyTonight → /my-garden (the moon
keeps a whispered cameo in the dateline). Frost/season detail beyond the Answer's
one sentence → /my-garden. The six-box seasonal grid → the week's list. Duplicate
seed links → one instance per viewport. Full blight module → alert-banner only,
shown only when risk is elevated.

## 2. The /my-garden north star

**What belongs there:** today on your plot (full weather + watering, sentence-led);
your plants (the my-plot localStorage data: sown / growing / ready, harvest dates,
log-a-sowing); alerts that matter (harvest-ready, closing windows *for crops you
grow*, frost in season, blight when elevated); sky tonight (sun, daylight, moon);
the garden visual (ReactGarden) as the page's charming heart; doors back to your
crops' pages and relevant guides.

**What moves from the homepage:** WeatherCommandCenter's metrics, SkyTonight,
planner tooling, the full blight module. Moved, never deleted.

**Warm, not cold:** every section leads with a written judgement, numbers whisper
beneath in mono. Alerts are notes ("the first courgette is close — check under the
big leaves"), not badges. Plants are addressed by name. Empty states get the
illustrated warmth the site already does well. The dashboard wears the garden, not
the other way round.

**Repeat visits:** this is the bookmark page. Returning visitors (saved postcode or
plot data) get a quiet "my garden" in the header sitewide. Nothing on /my-garden
duplicates the homepage, so each page has a distinct reason to open it. Noindex —
it is personal, not for Google.

## 3. The /sow page role

/sow is **the Answer, continued** — the full personalised list, where the homepage
gives the edit. Front page vs listings page: the homepage says "these three,
tonight"; /sow says "everything, for your postcode, with the seeds and the kit".

**Crawlable content:** the UK-average list, month links, and the seasonal kit edit
are server-rendered and never depend on personalisation; the postcode layer
hydrates on top. /sow and /sow/[month] own the "what to sow in [month]" query
family; the homepage links into them rather than competing.

**Editorial, not generated:** the week's-list language — ruled rows, serif crop
names, mono method tags, edited micro-notes on a few crops, a monthly standfirst
in voice. No chip clouds, no equal boxes, and at least one human-written sentence
per screen: if a section could be rendered by a loop with no human sentence in it,
add the sentence or cut the section.

## 4. The crop page role

**How it feels:** a field-guide entry from a trusted friend who has actually grown
this crop and photographed themselves doing it — the page a gardener bookmarks in
February and returns to in July.

**Where things belong, top to bottom:** verdict band (too early / good time / last
chance / too late — localised, honest, never a dead end) → hero photo → "Your
dates" (one calm block, adjust-form behind a disclosure) → data strip → the season
step by step (playbook + dated stage photos + in-flow buy points at the moment of
need) → live blight (where relevant) → problem clinic (free fixes first) →
varieties → worth-buying/skip → companions → go deeper → FAQ. Desktop rail: seeds,
kit, postcode, my-plot.

**Trust while earning:** the verdict, the dated own-plot photos (including the
failures), the honest caveats, and the skip-this entries ARE the conversion
strategy — a page that tells you what not to buy is a page whose links mean
something. One buy link per season step, maximum. All links via AffiliateLink
(tag, rel=sponsored, unified `affiliate-click` event). The shed-fund disclosure
stays in-voice and visible.

## 5. The homepage page-count rule

The homepage contains **exactly ten slots**:

1. Masthead + dateline + ticker
2. Hero: promise + postcode → the Answer
3. Tonight's Watering Note
4. The Week's List
5. One editorial photo feature (featured variety / seasonal cameo)
6. The jobs photo walls (the browse layer)
7. Seasonal kit teaser (the one shop moment)
8. Shed fund (the why-of-the-links)
9. Email capture (one instance)
10. FAQ + footer doors

**Anything new must displace something, and the displacement must be named in the
commit/PR description.** Seasonal cameos (solstice band, blight banner) may borrow
slot 5's space in their windows; they do not get an eleventh slot. The periodical
has a page count.

## 6. Component move map

| Component | Decision |
|---|---|
| WateringNote | **Keep** — homepage identity |
| PlantingTool (hero) | **Keep + refactor** — becomes the Answer; detail/metric views move to /my-garden (relocate, never delete) |
| WeatherCommandCenter | **Move to /my-garden** (its prose-lead idea survives inside the Answer/note) |
| SkyTonight / SkyTonightLoader | **Move to /my-garden**; moon cameo in the dateline |
| ServerSeasonalAnswer | **Merge** into the Week's List redesign |
| CropCardGrid jobs sections + StageStrip | **Keep** — the browse layer |
| FeaturedVariety | **Keep** — slot 5 |
| SeasonalKitEdit (teaser) | **Keep** — slot 7 |
| BlightRisk | **Keep banner variant only, elevated-risk only**; full module lives on /blight-watch and /my-garden |
| ShedFund | **Keep** — slot 8 |
| ContextualEmailCapture (homepage instance) | **Keep** — slot 9, one instance |
| Homepage FAQ | **Keep** — slot 10 |
| CropIndex / explore-crops | **Demote** — footer-adjacent or /sow; not a mid-page slot |
| LongestDayBand | **Keep** — self-gating seasonal cameo (borrows slot 5) |
| InSeasonBand | **Delete only if genuinely unimported anywhere** — verify with grep first |
| MyPlot* components | **/my-garden** absorbs (after Kate approves the /my-plot merge) |

## 7. The visual taste checklist (the anti-boring gate)

Run every new or changed block past this. Two failures = redesign it.

- **Typography:** exactly two registers — Newsreader serif is the voice, IBM Plex
  Mono is the data. A block that's all one register is probably wrong. No new fonts.
- **Spacing:** whitespace is the luxury good. Sections breathe. Never tighten
  spacing to fit more in — cut content instead.
- **Cards vs rules:** hairline `border-t` rules on open ground. A box with borders
  on all four sides needs a written justification. A grid of equal boxes is
  forbidden — hierarchy or nothing.
- **Colour:** cream ground; pastels as section washes, never slabs; amber is the
  accent that means *now*; frost/leaf/rust follow the seasons. No new colours, no
  shadows, no rounded corners, no emoji, no icons where a word does.
- **Crop links:** names, never chips or buttons. Serif, amber underline, rust hover.
- **Metrics:** one number per moment, mono, whispered *after* the sentence that
  interprets it. A tile of metrics is a bug, not a feature.
- **Photos:** Kate's own only, `img-grade`, dated diary-style mono captions. Never
  stock, never AI. A photo earns its place by proving something (including
  failures). An empty slot beats a filler image.
- **Editorial details:** stamps and datelines; micro-notes on a *few* items (three
  notes is editing, ten is a database); one signature per page, used once; almanac
  whispers on the right days only.
- **The two tests:** would a weekly gardening paper print this on its front page?
  Would someone screenshot it and send it to a friend?

## 8. The monetisation rulebook

**Where affiliate appears:** in-flow on crop pages at the moment of need (one link
per season step, max); the crop-page rail; the buying guides (the comparison
destination); the kit page; the seasonal edit + its monthly buying-guide rotation.
Always via `AffiliateLink` — tag, `rel=sponsored`, unified `affiliate-click` event.

**Never monetise the trust anchors:** the Watering Note, the Answer, the verdict
band, FAQs, problem clinics (free fix first — a product may be *linked* from a
problem only when the fix genuinely is that product, and mesh-for-carrot-fly is
the standard, not the loophole), charm moments (404, empty states), and email
capture. The moments that make people trust the site are kept commercial-free so
the commercial moments are believed.

**What would damage trust:** product walls; mid-article ad breaks; star ratings we
haven't earned; claiming ownership of kit Kate doesn't own; invented ASINs;
skip-this entries carrying links (they never do — that's the point); urgency
theatre ("only 3 left!"); recommending anything the data shows nobody clicks but
we keep for commission.

**How worth-buying/skip evolves:** every playbook crop ships with one; a skip entry
is mandatory wherever a common beginner waste exists; entries tie to the crop's
real failure mode, never to commission rate; the unified click report prunes what
never earns its place. Trust is the compounding asset; commission is the interest.

## 9. The next 10 Codex phases (small, testable, committable)

Every phase: read `PROJECT_CONTEXT.md` + `docs/tone-of-voice.md` + the relevant
spec first; `tsc --noEmit`, `npm run build`, `npx vitest run` clean; verify 390px
via CDP device emulation (never `--headless --screenshot --window-size`); one
commit; Kate reviews on :3000 before merge; NEVER touch `src/data/image-slots.json`
or `public/photos/slots/companion-*`.

1. **Week's list restyle.** Goal: ServerSeasonalAnswer → the almanac (spec:
   seasonal-answer-redesign). Files: ServerSeasonalAnswer.tsx, its lib, new
   `src/data/weekly-list.ts`. Don't touch: jobs sections, WateringNote. Accept:
   no boxes, one deduplicated list with method tags, all links preserved, the
   pick renders, quiet-season state warm.
2. **Dateline + almanac whispers.** Goal: masthead dateline with daylight length +
   occasional whisper. Files: Header.tsx or a small Dateline component, a ~12-entry
   data file. Don't touch: hero, ticker logic. Accept: renders sitewide, max one
   whisper, mono register, no layout shift.
3. **Verdict band finish.** Goal: verify/complete the crop-page verdict against the
   crop-page spec, tomatoes + carrots as the opposite-state pair. Files: the
   verdict component, season-core/urgency usage. Don't touch: playbook sections.
   Accept: four states in text not colour alone, UK-average fallback, too-late
   pivots to alternatives + care content.
4. **"Your dates" merge.** Goal: PersonalisedCropDates + SowPlanner become one calm
   block, form behind a disclosure. Files: both components. Don't touch: their
   logic/maths. Accept: one block, `aria-expanded` toggle, add-to-plot intact,
   provenance line present.
5. **The Answer (homepage hero).** Goal: post-postcode Answer per the
   homepage-experience spec. Files: PlantingTool + a new Answer component +
   place-personality copy file. Don't touch: /my-garden, anything below the hero.
   Accept: one phone screen, recognition/interpretation/answer/tonight/two doors,
   `aria-live` + focus management, SSR fallback unchanged. **CHECKPOINT: Kate
   reviews before any further homepage phase.**
6. **/my-garden dashboard sections.** Goal: add today-on-your-plot + sky tonight +
   alerts above ReactGarden. Files: my-garden page + new section components
   (reusing moved logic). Don't touch: homepage, my-plot. Accept: renders with and
   without plot data, noindex intact, sentence-led.
7. **Homepage demotions.** Goal: remove metric strip + SkyTonight from homepage now
   their new home exists. Files: page.tsx. Don't touch: the components themselves.
   Accept: page-count rule satisfied (10 slots), moon cameo in dateline, nothing
   deleted from the codebase.
8. **/my-plot merge.** Goal: /my-garden absorbs plot tracking; /my-plot redirects.
   **Blocked on Kate's explicit approval.** Files: my-garden, my-plot redirect.
   Accept: localStorage reads unchanged, no data loss, redirect 308.
9. **Crop-page rail restyle.** Goal: seed buttons + kit cards into the editorial
   register. Files: SeedSupplierLinks, CropKit, CropBuyingAdvice styling. Don't
   touch: tracking attributes or URLs. Accept: no grey chip rows, taste checklist
   passes, `affiliate-click` attrs byte-identical.
10. **/sow alignment.** Goal: /sow adopts the week's-list language for its
    personalised list. Files: sow page + SeasonalGrid styling. Don't touch:
    crawlable server content, kit edit. Accept: server HTML for UK-average state
    keeps all content/links, editorial register throughout.

## 10. What to sow should never become…

…a dashboard, a directory, or a content farm wearing a nice font. It should never
greet a gardener with twelve metrics and no opinion; never publish a page whose
only reason to exist is a keyword; never let a chip cloud, an equal-box grid or an
auto-generated sentence stand where an editor should have stood; never put a link
where the reader's trust is the thing being spent; never fake a rating, an
ownership claim or an urgency; never bury the one thing a visitor came for under
things we wanted them to see; and never, ever become the kind of site that a tired
gardener with muddy hands and one bar of signal regrets opening. It is a friend at
the allotment gate with the weather on their mind and time to talk. Everything
that protects that is allowed. Everything that erodes it is not — whatever it
promises to earn.

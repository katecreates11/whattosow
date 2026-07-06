# Homepage as experience, /my-garden as dashboard (July 2026)

Read `PROJECT_CONTEXT.md` and `docs/tone-of-voice.md` first. This spec depends on and
sequences AFTER `seasonal-answer-redesign-2026-07.md` (the week's list) and assumes
the Watering Note is live. Organising idea for the whole homepage: **a weekly
periodical, personally addressed** — never a dashboard.

The sentence we are designing for: *"I entered my postcode and what to sow
understood my garden."* Understanding is shown by **interpretation, not by echoing
data back**. "23° · soil 25° · W 16mph" is data. "You're on the warm side of the
Cotswolds — your beans have three good weeks left" is understanding.

## 1. Homepage before postcode entry

Top to bottom (mobile order): masthead + dateline + ticker → H1 promise + postcode
input → Tonight's Watering Note (UK-average state) → The Week's List (UK-average) →
ONE editorial photo feature (featured variety / seasonal moment) → jobs photo walls
(browse layer) → seasonal kit teaser → shed fund → email → FAQ/footer doors.

Under the postcode input, one promise line (mono, small): "we'll work out your
frosts, your season, and what makes sense tonight". The input is the hero's only
call to action — no competing buttons.

## 2. The moment after postcode entry

- **No navigation, no spinner-grid.** The input transforms in place.
- One charming beat while fetching (text, not skeleton): "reading your sky…" then
  "checking your frosts…" (max ~2s, sequential lines, calm).
- Then the **Answer** renders where the input was (input collapses to a small
  "GL7 · change" chip) — and the rest of the page quietly re-tunes around them:
  the Watering Note switches to their sky, the Week's List gains their closing
  dates, the jobs walls re-filter. The whole page becomes theirs, but the Answer
  block is the reveal; everything else just *happens to already be right*.
- Focus moves to the Answer (a11y: `aria-live="polite"` region, heading focus).

## 3. The Answer — what it says and looks like

The field-guide/pinned-note language: serif-led, hairline rules, zero tiles, one
amber accent. Anatomy, in order:

1. **Recognition** (serif, warm): "Growing in Cirencester, then."
2. **Their garden, interpreted** (1–2 sentences): "You're on the warm side of the
   Cotswolds — last frost usually gone by 24 April, back around 19 October. A
   178-day season; a fortnight more than most of the country gets."
   (All computable now: frost.ts has latitude + coastal adjustments; compare to UK
   average for the personality line. Coastal/highland/city variants.)
3. **The answer itself** (the reason they came):
   "Sow this week: **French beans**, **beetroot**, **quick salads** — and your
   **carrots** window closes in about ten days."
   3–4 linked crop names + method tags; one amber closing line max.
4. **Tonight, specifically:** the watering verdict for their sky (one sentence —
   this replaces a separate localised Watering Note duplicating below; the note
   and the Answer share the same engine and the note visually docks here once a
   postcode exists).
5. **Two doors** (serif italic links): "Everything for your postcode →" (/sow) ·
   "Set up your garden →" (/my-garden).

Length cap: the whole Answer fits one phone screen. It is a letter, not a report.

## 4. What moves OFF the homepage → /my-garden

- The WeatherCommandCenter metric strip (temp/soil/wind/sunset tiles).
- SkyTonight (sun/moon detail) — the moon may keep a whispered cameo in the
  homepage dateline, nothing more.
- Frost countdown detail and season maths beyond the Answer's one sentence.
- SowPlanner-style tooling and any my-plot management UI.
- Full blight module (homepage keeps the one-line banner variant only when risk is
  elevated — an alert is editorial; a permanent module is a dashboard).

Rule (PROJECT_CONTEXT): moved, never deleted. Every metric keeps living on
/my-garden.

## 5. What stays on the homepage

The Answer, Watering Note, Week's List, ONE photo feature, jobs photo walls,
seasonal kit teaser, shed fund, email capture, FAQ. The homepage keeps: one
verdict, one list, one feature, one browse layer, one shop moment. Anything new
must displace something — the periodical has a page count.

## 6. Routing

- **/sow**: from the Answer's first door + the Week's List "full July list" link —
  /sow is "your full personalised list", the answer continued.
- **Crop pages**: every crop name everywhere links; the pick and the Answer's crops
  are the strongest funnels.
- **Guides**: from the editorial feature, the Week's List "go deeper" line, and the
  glut/seasonal boxes — editorial doors, never a link farm.
- **/my-garden**: the Answer's second door; plus, for RETURNING visitors (saved
  postcode + any plot data), the header gains a quiet "my garden" item and the hero
  shows "your garden's waiting →" beside the collapsed postcode chip. Repeat
  visitors route themselves there; the homepage remains the front door and the
  weekly read.

## 7. Keeping it editorial, not dashboard

- Judgement sentences first; numbers whispered in mono footnotes, never tiled.
- Max one number per moment (days left, degrees, mm — pick the one that matters).
- Place personality over coordinates; "your beans" over "crop status".
- Nothing visibly live-updates; the page is "edited today", not "streaming now".
- The periodical test for any future block: *would a weekly gardening paper print
  this on its front page?* Metrics panels fail that test; letters, lists, notes
  and photographs pass.

## 8. The /my-garden dashboard (repeat-visitor home)

Consolidates with the standing Lucky Dip decision (real tool first, charm second)
and ABSORBS /my-plot — needs Kate's explicit sign-off since it merges two pages
(/my-plot then redirects to /my-garden; its localStorage data reads unchanged).

Contents, in priority order:
1. **Today on your plot** — weather + watering verdict, full version (the moved
   WeatherCommandCenter data lives here, still sentence-led).
2. **Your plants** (from my-plot localStorage): sown / growing / ready, harvest
   dates, "log a sowing" quick action.
3. **Alerts that matter**: harvest-ready, closing sowing windows for crops you
   grow, frost warnings in season, blight when elevated.
4. **Sky tonight**: sun, daylight, moon (SkyTonight's new home).
5. The garden visual (ReactGarden) as the page's heart/charm — the dashboard
   wearing the garden, not the other way round (per feedback_lucky-dip-real-tool).
6. Doors back out: the crops you grow, relevant guides, bed planner when ready.
Noindex (personal page), as /my-plot is today.

## 9. Mobile-first layout (390px, post-postcode)

masthead + dateline → "GL7 · change" chip → **THE ANSWER** (one screen) → Week's
List → photo feature → jobs walls → kit teaser → shed/email → footer. Before
postcode: same, with hero input where the Answer will be. Tap targets full-width;
the Answer's crop links are the biggest touch targets on the page.

## 10. Implementation notes for Codex

1. Read `PROJECT_CONTEXT.md` + `docs/tone-of-voice.md` + this spec +
   `seasonal-answer-redesign-2026-07.md` first. Sequence: week's list → this.
2. **No new dependencies.** The Answer is a client component hydrating over a
   server-rendered no-postcode hero (SSR never blank; SEO content — week's list,
   jobs, FAQ — stays server-rendered and unchanged by personalisation).
3. Reuse engines: `frost.ts` (incl. coastal adjustment — the place-personality
   sentence derives from frost date vs UK average + coastal flag), `season-core`,
   `urgency.ts`, the shared watering lib, `location-storage.ts` +
   `whattosow:location-updated` (the existing event is how the rest of the page
   re-tunes — most components already listen).
4. PlantingTool refactor: the Answer becomes its primary render; its metric/detail
   views MOVE to /my-garden components. Relocate, never delete (PROJECT_CONTEXT).
5. Place recognition: postcode → place name via existing Postcodes.io lookup
   (already used by frost map). Cache in localStorage beside the postcode.
6. Copy variants for the interpretation line (warm/mild/late-frost/coastal/short-
   season) in a small data file, in voice; 2 variants each, day-seeded.
7. /my-garden: build the dashboard sections above ReactGarden; /my-plot's
   MyPlotClient logic is reused (imported/adapted), THEN /my-plot redirects —
   only after Kate approves the merge. Keep noindex.
8. A11y: `aria-live="polite"` on the Answer region, focus to its heading on
   render, the "change" chip is a real button, loading beats announced.
9. Perf: no LCP regression (hero text/photo unchanged pre-entry); Answer is text.
   Weather fetches only after postcode exists (as today).
10. Verify at 390px via CDP device emulation (never `--headless --screenshot
    --window-size`). tsc + `npm run build` clean; Kate browser-tests on :3000;
    ONE deploy. Don't touch `src/data/image-slots.json` or
    `public/photos/slots/companion-*`.

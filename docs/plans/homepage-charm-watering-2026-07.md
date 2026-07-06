# Homepage charm review — the watering note (July 2026)

Read `PROJECT_CONTEXT.md` and `docs/tone-of-voice.md` first. No full redesign: this is
a reweighting. Keep every piece of "what can I sow now" functionality exactly as is.

## Diagnosis (creative director's note)

The charm didn't disappear — it got demoted and de-verdicted.

- The homepage weather moment (`WeatherCommandCenter`) leads with a good prose line
  but then presents a strip of six metrics (23° · soil 25° · W 16mph · sunset ·
  daylight · moon). Data is a dashboard. **Judgement is a neighbour.**
- The judgement already exists: `PlantingTool`'s summer mode computes a genuine
  watering verdict ("Hold off — the rain's doing the work" vs "Time to water",
  rain-vs-loss balance). But it renders only *inside the tool results, after a
  postcode search*, far from the front door.
- Fix = move the verdict to the front door as a small, warm, one-sentence moment,
  and demote the raw numbers to a quiet mono footnote. Nothing is deleted.

## 1. What stays untouched

The hero promise + postcode, the week's-jobs sections (Sow / Plant out / Harvest,
StageStrip), featured variety with its "week of" stamp, seasonal teaser, glut box,
ticker. All of it works. This spec adds ONE block and reweights ONE block.

## 2. The watering note (the returning moment)

A small block styled like a note pinned by the shed door: mono eyebrow, one serif
sentence of judgement, one quiet mono data footnote, an amber pin-dot accent. Flat,
no card, no shadow, no rounded corners — the editorial language we already have.

**Placement (ask 7):** directly under the hero/postcode block, before "This week on
your plot" — so on mobile it's the first thing after the promise. It answers
PROJECT_CONTEXT's second question ("why should I do it now?") for the day's most
common job. Localised via saved postcode; UK-average with the existing gentle
"this is the sky over the middle of the country" invite pattern when there isn't one.

## 3. Above the fold, mobile (ask 6)

1. Masthead + ticker (exists)
2. Dateline (NEW, tiny): "sunday 6 july · 16h 38m of daylight"
3. H1 promise + postcode input (exists)
4. **Tonight's watering note** (NEW placement)
Illustration and everything else arrives on scroll. The reader gets: what site is
this → what can I sow → do I need to water. Three answers, no scrolling.

## 4. Microcopy — watering states (ask 8)

Eyebrow is always: `TONIGHT'S WATERING · {PLACE or "THE MIDDLE OF THE COUNTRY"}`.
Footnote is always mono, e.g. `rain 8mm last night · soil 19° · nothing due till fri`.

- **Rained properly in last 24h:** "The rain's done tonight's job for you — the soil
  is holding it nicely. Put the can down and go and see what's grown instead."
- **Raining now:** "It's doing it for you right now. The only job tonight is
  admiring it from the shed with a cuppa."
- **Hot, dry spell (soil losing):** "Hot, dry day. Give pots and anything newly
  planted a proper drink tonight — the rest can wait if the soil still feels
  cool below the surface."
- **Heatwave (3+ hot days):** "Third hot day in a row, and the pots are running on
  fumes. Water deep tonight and again at dawn if you can — and leave a saucer out
  for the birds."
- **Cool and cloudy, soil holding:** "No need tonight — cool and grey means the soil
  keeps what it has. Have the evening off. The garden won't tell anyone."
- **Windy and dry:** "That wind dries beds faster than sunshine does. Check the pots
  and anything newly planted — the rest will ride it out."
- **Rain due within ~12h:** "Rain's on the way before morning — let the sky take
  this one. If a pot looks desperate, that one can jump the queue."
- **No postcode (UK average):** "In the middle of the country it's a watering
  evening. Add your postcode and we'll tell you about *your* sky →"

State logic: reuse PlantingTool's rain-vs-loss inputs (Open-Meteo current + recent
precipitation + forecast). Sentences rotate per state (2–3 variants each, seeded by
date) so regulars don't see wallpaper.

## 5. Reweighting WeatherCommandCenter (ask 4)

Keep the component and its prose lead. Demote the metric strip: smaller, one quiet
mono line ("23° · soil 25° · W 16mph · sunset 21:33 · waning gibbous"), beneath the
sentence, not beside it as tiles. Lead with the sentence, whisper the numbers.
Since the watering note now owns "should I water?", the WeatherCommandCenter lead
can rotate through non-watering observations (slugs after rain, wind and tall
plants, soil warmth for germination) — no duplication.

## 6. Small touches that make it feel loved (ask 9)

- **The dateline** under the masthead: day, date, daylight length. An almanac, not a
  nav bar. Costs one line; sets "periodical, edited today" tone sitewide.
- **Almanac whispers** in the dateline on the right days: "st swithin's day — watch
  the sky", "longest day", "first frost usually ~14 weeks off". Data file of ~12
  dates, in voice, no more than one at a time.
- **Sign the notes**: watering note ends with a tiny mono "— pinned to the shed
  door". One signature, used once per page.
- **Seasonal H1 shading**: the hero eyebrow already shifts by season — let the
  watering note's pin-dot follow (frost blue in winter, leaf in spring, amber high
  summer, rust in autumn). Quiet, almost subliminal.
- **The moon stays** — it's the single most "allotment neighbour" metric we have.
- Already-charming things to protect, not touch: Dot's 404, the empty-state
  illustrations, the ticker, the solstice band's June cameo.

## 7. Implementation notes for Codex (ask 10)

1. Read `PROJECT_CONTEXT.md` + `docs/tone-of-voice.md` before writing anything.
2. **No new dependencies.** One new small client component (`WateringNote`), server-
   rendered fallback = the no-postcode state, hydrate to local via
   `src/lib/location-storage.ts` + `whattosow:location-updated` event (same pattern
   as PlantingTool/WeatherCommandCenter).
3. **Extract, don't duplicate, the verdict maths**: lift PlantingTool's summer
   rain-vs-loss logic into a shared `src/lib/watering.ts` used by both. Do not
   change PlantingTool's rendered behaviour (PROJECT_CONTEXT: no functionality
   removed). Out of season (roughly Oct–Mar) the note swaps to a frost/weather
   observation from the same component rather than disappearing — the pinned note
   is year-round; only the subject changes.
4. Open-Meteo only (already used; CSP already allows it). Cache/fetch pattern as in
   WeatherCommandCenter; degrade silently to the no-postcode copy on API failure —
   never an error state on the front door.
5. Copy lives in a small data file (`src/data/watering-notes.ts`?) with 2–3 variants
   per state, seeded rotation by day-of-year. All copy through the tone-of-voice
   check: gentle, "we", weather-first, no smugness.
6. Design tokens: existing palette only (frost/leaf/amber/rust), Newsreader serif
   sentence, IBM Plex Mono eyebrow/footnote, no cards/shadows/rounded corners/emoji.
7. A11y: the note is a `<section>` with an accessible heading; verdict conveyed in
   text, not colour; respects `prefers-reduced-motion` (no animation needed anyway).
8. Perf: text + one fetch; must not affect LCP (hero image stays `priority`, note
   renders as text immediately with fallback copy). Homepage Core Web Vitals must
   not regress.
9. Verify mobile-first at 390px with CDP device emulation (NOT
   `--headless --screenshot --window-size` — known to lie).
10. Dev on :3000; `tsc --noEmit` + `npm run build` clean; Kate browser-tests before
    any deploy; ONE deploy. Don't touch `src/data/image-slots.json` or
    `public/photos/slots/companion-*`.

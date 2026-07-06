# Seasonal answer section redesign — "The week's list" (July 2026)

Read `PROJECT_CONTEXT.md` and `docs/tone-of-voice.md` first. Scope: the
`ServerSeasonalAnswer` block only (src/components/ServerSeasonalAnswer.tsx, rendered
~line 356 of the homepage). The photo-wall jobs sections above it are untouched. The
Watering Note is untouched — this section complements it: **the note answers
"tonight", this answers "this week", the crop pages answer "the season".**

## 1. Diagnosis — why the screenshot is boring

1. **Six equal boxes = no editor.** Everything is a headline, so nothing is. A real
   editor would never give "What to read next" the same billing as "What to sow now".
2. **Redundancy wearing three costumes.** "Sow now" is the union of "indoors" +
   "outdoors" — Carrots, Peas, Beetroot, French beans, Lettuce appear two and three
   times in one screen. Repetition reads as generated content, because it is.
3. **It repeats the page above it.** The photo-wall jobs sections already say what to
   sow and plant out, with photographs. This block says it again in beige.
4. **Chips are SaaS furniture.** Identical bordered rectangles read as filter buttons,
   not crops. Nothing about "Dill" in a box says *dill*.
5. **Boxes at all.** The site's editorial language is open space and hairline rules
   (border-t), not carded grids. Six borders + six beige fills = dashboard.
6. **Copy is correct but weatherless.** "Use modules or pots for crops that benefit
   from a protected start" is true in any July of any year. Nothing says *this week*.
7. **Negative framing over-promoted.** "What to avoid sowing now" is a footnote's
   worth of wisdom given co-headline status.

## 2. The concept — an almanac column, not a grid

One edited list, like the week's page of a seed merchant's almanac or a list pinned
inside the shed door. Structure top to bottom:

1. **Stamp** (mono): `THE WEEK'S LIST · WEEK OF 6 JULY`
2. **Standfirst** (serif, 1–2 sentences, changes monthly, in voice):
   "Midsummer sowing is a race you can still win — quick roots, fast salads and one
   last go at the beans. Everything below, sown this week, makes the table before
   the cold."
3. **The pick** (the lead item — see §3).
4. **The sow list** — ONE deduplicated list; indoors/outdoors becomes a per-crop
   method tag, not three boxes. Ruled rows (border-t hairlines).
5. **And plant out** — smaller ruled group, mono label, names + CLOSING tags.
6. **Two footnote lines** (no boxes):
   - *Worth waiting on:* "Parsnips, broad beans and onions from seed — the season
     now owes them more than it has. Their moment comes round again in the spring."
     (keep the per-crop next-month links the component already computes)
   - *Go deeper:* "the full July list · the year at a glance · summer sowing,
     properly" — one quiet mono line, real links kept.

## 3. The lead item — "the pick"

One crop, chosen for the week, with one sentence of conviction:
> **If you sow one thing this week:** dwarf French beans — two minutes poking seeds
> into warm soil now, three weeks of picking come September.

This is the editor's move the section is missing. Everything else hangs beneath it.
Selection: a small curated per-month map (12 entries, human-written) with a
deterministic fallback (soonest-closing sowable crop). Curated beats computed here —
this line IS the charm.

## 4. What goes quieter

- "Avoid sowing" → one warm *worth waiting on* sentence (footnote register).
- "What to read next" → one mono *go deeper* line. Links kept, box gone.
- Explainer paragraphs (the "use modules or pots…" copy) → deleted; the method tag
  carries that information per crop, which is where it was always needed.

## 5. How crop links look and feel

Not chips. **Names.** Serif, text-lg, linked to `/crops/[slug]`, rust on hover,
in ruled rows:

```
Carrots            DIRECT              ~ closing · sow by mid-july
French beans       EITHER
Dill               DIRECT              sow where it'll stay — it hates moving
```

- Method tag: mono 10px uppercase (DIRECT / MODULES / EITHER).
- Closing urgency: amber mono, only when true (from urgency maths).
- **Edited micro-notes on 2–3 crops only** (an optional per-crop map) — annotating
  everything is a database; annotating three things is an editor.

## 6. Copy changes (register examples)

- Section H2: "What to sow this week — and how" (one heading, not six).
- Group labels (h3, small mono): "THE SOWING LIST" / "AND PLANT OUT".
- All standfirsts weather-adjacent and monthly, never evergreen-neutral.
- Worth-waiting copy always ends facing forward ("their moment comes round again").

## 7. Space, type, borders, colour, details

- **Kill all six boxes and beige fills.** The section sits open on the cream ground
  (or one single sage/ochre wash at most). Hairline `border-t border-earth/8` rules
  between rows — the guides-page register.
- Two type registers only: Newsreader serif for names/standfirst, Plex Mono for
  stamp/tags/footnotes.
- Amber = urgency accent, exactly as elsewhere. No new colours, no icons, no emoji.
- The stamp echoes the featured variety's "week of" stamp — the homepage starts to
  feel like a weekly issue. Do NOT reuse the Watering Note's pin-dot or signature
  here; that's the note's identity.

## 8. Mobile-first layout (390px)

Single column: stamp → standfirst → the pick → sow rows (name left, method tag
right, note beneath when present — full-width tap targets ≥44px) → plant-out rows →
two footnote lines. No wrapping chip clouds, no horizontal anything.

## 9. Desktop layout

An editorial spread, asymmetric: left ~60% = the pick + sow list flowing into two
balanced columns; right ~40% = margin notes (AND PLANT OUT group, then the two
footnotes) — like an almanac page with its marginalia. Generous whitespace; the
section should breathe more than the grid it replaces.

## 10. Implementation notes for Codex

1. Read `PROJECT_CONTEXT.md` + `docs/tone-of-voice.md` + this file before coding.
2. Scope = restructure `ServerSeasonalAnswer.tsx` (and its lib) only. Stays a
   **server component, zero client JS**. Homepage jobs sections untouched.
3. **Preserve every real link** for crawl equity: crop pages, `/sow/[monthSlug]`,
   `/calendar`, the guide links, and the avoid-entries' next-month links. Headings
   stay semantic (one h2, small h3s) — style them small; don't demote to divs.
4. Dedupe: build one sow list = union of indoors/outdoors with a per-crop `method`
   derived from the existing entry data (the split the component already has).
5. New tiny data file (e.g. `src/data/weekly-list.ts`): per-month standfirst, per-
   month pick + one-liner, optional per-crop micro-notes. All copy in voice; Kate
   can edit sentences without touching components.
6. Closing tags from the existing urgency maths — don't reinvent.
7. Empty/quiet-season states: one warm line, existing empty-note pattern; never an
   empty ruled list.
8. Design tokens only (cream/sage/ochre grounds, earth/amber/rust, serif+mono). No
   cards, borders-as-boxes, shadows, rounded corners, icons, emoji.
9. Verify at 390px with CDP device emulation (not `--headless --screenshot
   --window-size`). tsc + `npm run build` clean; Kate reviews on :3000 before any
   deploy; ONE deploy. Don't touch `src/data/image-slots.json` or
   `public/photos/slots/companion-*`.

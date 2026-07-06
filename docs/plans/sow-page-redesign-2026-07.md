# /sow redesign — the editorial listings page (July 2026)

Read `PROJECT_CONTEXT.md`, `docs/DIRECTION.md`, `docs/ANTI_PATTERNS.md` and
`docs/tone-of-voice.md` first. This replaces the six-box grid on /sow and gives
the page its own job. Consumes `src/data/weekly-list.ts` (already written, all
12 months).

## 1. The role of /sow vs the homepage

The homepage is the **front page**: the edit — three crops, tonight's watering,
one screen. /sow is the **listings page**: *everything* sowable right now, with
method, urgency and seeds — complete, scannable, and worth bookmarking as the
season's working page. Front page says "these three, tonight"; /sow says
"everything, for your postcode, with the seeds."

They also divide visually: the homepage keeps the big asymmetric **photo walls**
(browsing pleasure); /sow is the **working list** — ruled rows, with photos used
only as hierarchy (the lead items), never as wallpaper. Same engine, different
registers, no duplication.

## 2. Above the fold

```
today on your veg patch                                    ← mono eyebrow
Growing in Barnet, then — your last frost went on          ← serif GREETING SENTENCE
19 April, and midsummer's list is still long.
What to *sow* now                                          ← H1 (keep)
Everything worth sowing this week where you are — the      ← standfirst (keep)
windows that are open, and the ones quietly beginning to close.

IF YOU SOW ONE THING THIS WEEK                             ← the pick, lead item
Dwarf French beans — two minutes poking seeds into warm
soil now, three weeks of picking come September.
```

Mobile 390px: eyebrow, greeting, H1, standfirst and the pick all land in the
first screen-and-a-half; the list starts immediately after. **No "UK AVERAGE
ANSWER" preamble heading, no info-bars, no six boxes** (anti-patterns 4 & 6 —
do the thing; explain nothing).

**The greeting is a sentence, never a receipt.** Kill
`Barnet · your last frost was · 19 Apr`. Templates (data file, one per state):
- Personal: "Growing in {place}, then — your last frost went on {date}, and
  {month-phrase}." (month-phrase from weekly-list-adjacent copy: July =
  "midsummer's list is still long"; October = "it's planting weather now".)
- No postcode: "This is the list for the middle of the country — add your
  postcode and it becomes yours." (inline link that expands the postcode input
  in place; no panel.)

## 3 & 4. Personalisation over crawlable server content

The **entire page server-renders in its UK-average state**: greeting (average
variant), full list, month link, worth-waiting sentence, kit edit. That HTML is
what Google gets, always.

A single small client hydrator then, if a postcode is saved (or arrives via the
existing `whattosow:location-updated` event):
- swaps the greeting to the personal sentence,
- updates each row's tags in place (closing days, method windows go local),
- never adds/removes rows in a way that shifts layout more than a tag's width.

No spinners, no skeletons — the average list is correct content, not a
placeholder. JS off = a complete, honest page.

## 5. Method and plant-out without grids or chips

**One list, two acts, ruled rows** (anti-patterns 1 & 2):

```
THE SOWING LIST · WEEK OF 6 JULY                           ← mono act label
──────────────────────────────────────────────────────────
[photo]  Carrots          DIRECT    ~ closing · by mid-july     SEEDS →
[photo]  French beans     EITHER                                SEEDS →
──────────────────────────────────────────────────────────
         Lettuce          MODULES   somewhere shadier now       SEEDS →
         Beetroot         DIRECT                                SEEDS →
         Dill             DIRECT    sow where it'll stay        SEEDS →
──────────────────────────────────────────────────────────
AND PLANT OUT                                              ← second act, smaller
         Leeks            ~ closing                             
         Courgettes       plant out on a damp evening           
```

- **Hierarchy, not equality:** the 2–3 *lead* rows (anything closing + the pick's
  crop) get a small square photo (Kate's where they exist) and slightly larger
  type; the rest are text rows. Photos are rank, not decoration.
- **Method is a mono tag per row** (DIRECT / MODULES / EITHER) — the information
  the old three boxes existed for, as an attribute where it always belonged.
- **Ordering:** closing-soonest first, then alphabetical. Urgency is the edit.
- **Micro-notes** on 2–3 rows only, from `weekly-list.ts` notes.
- **SEEDS →** as a quiet mono end-column is permitted: a listings table is a
  uniform commerce structure (anti-pattern 8's exception). One style, tracked
  via the existing awin/AffiliateLink plumbing, attributes preserved.
- Mobile: each row two lines — name+tag, then note; whole row tappable to the
  crop page, SEEDS a distinct right-side tap target (44px).

## 6. "Too late" without negativity or contradiction

One warm sentence, not five identical rows (anti-pattern 5), and **always with
the instead**:

> **Worth waiting on:** sweetcorn, courgettes and pumpkins *from seed* — they
> now need more weeks than the season has left. As young plants they're still
> fair game this week (here's how the corn went in on our plot →), or circle
> them for spring — their month comes round again in April →.

Rules: (a) always say *from seed* — the seed/plants distinction is what kills
the "too late" vs Kate-just-planted-hers contradiction; (b) link the corn post
while it's seasonal; (c) every crop named links to its next-window month page
(`/sow/february` etc.) — "not now" always carries its "when".

## 7. Linking to crop pages

Every crop name is a serif link to `/crops/[slug]` — names, never chips. The
lead rows' photos link too. The pick's crop name links. That's ~20 strong
internal links per render, in reading order, with real anchor text.

## 8. /sow vs /sow/july

- **/sow** = *this week, where you are* — live verdicts, personal, self-canonical.
- **/sow/[month]** = *the month, anywhere* — the stable reference that owns the
  "what to sow in july" query family. Untouched by this redesign (a later phase
  may adopt the list language).
- They cross-link explicitly, once each: under the list, "**The full July page** —
  everything this month, not just this week →"; month pages carry "For this
  week's list, tuned to your postcode → /sow".

## 9. SEO while feeling human

- All content server-rendered; one h1, act labels as small-styled h2s, semantic
  `<ul>` rows with real `<a>`s.
- Title stays query-shaped ("What to Sow Now — by your postcode | What To Sow");
  the humanity lives in the greeting, standfirst, pick and micro-notes — at
  least one human-written sentence per screen (DIRECTION §3 rule).
- The worth-waiting sentence keeps the "too late to sow X" long-tail phrases
  naturally inside honest prose.
- No FAQ block here — the month pages own question queries; /sow stays lean.

## 10. Implementation notes for Codex

1. Read the four docs at the top of this file first.
2. Files: `src/app/sow/page.tsx` (restructure), remove `ServerSeasonalAnswer`
   from /sow (component may still serve elsewhere until the homepage phase
   decides), new small `SowGreeting` client component (greeting + tag hydration),
   a `sow-greetings.ts` data file (per-state sentences + month-phrases, Kate-
   editable). Consume `weeklyListForMonth()` for standfirst/pick/notes.
3. The list body is a **server component**; only the greeting/tag updates
   hydrate. Reuse `inSeasonCrops`/`plantOutCrops`/urgency maths — no new season
   logic, no new dependencies.
4. Keep the existing `#kit` anchor and the "Kit for the jobs ahead" edit below
   the list (homepage teaser deep-links to it), and the email band.
5. Preserve every link and every affiliate/tracking attribute byte-identical in
   the SEEDS column. De-chip per ANTI_PATTERNS §2; no boxes per §1; no preamble
   per §6.
6. Photos for lead rows via `getCropPhoto`/`cropImage` (Kate's first, Unsplash
   fallback as today); square thumbs `aspect-square`, `img-grade`.
7. Empty/quiet-season state: one warm sentence + the month link + kit edit —
   never an empty ruled list.
8. Verify 390px with CDP device emulation (never `--headless --screenshot
   --window-size`). tsc + `npm run build` + `npx vitest run` clean; Kate reviews
   at :3000; ONE deploy. Don't touch `src/data/image-slots.json` or
   `public/photos/slots/companion-*`.

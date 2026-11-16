# The weather brain — what was built, and what's waiting on Kate (Nov 2026)

## What exists now

**One reading of the sky per place.** `src/lib/weather-brain.ts` makes a single
Open-Meteo request per postcode (cached 30 minutes, shared by every component)
where there used to be seven differently-shaped ones — five on the homepage.
It also holds the ONE definition of each judgement: frost risk (air minimum of
2°C or below), a dry spell, rain fallen and rain coming, tonight's low, soil
temperature at seed depth. Blight is the Hutton Criteria everywhere.

**Your frost, actually.** `src/lib/frost-record.ts` reads ten years of archive
nights for the gardener's own coordinates and derives when frost has really
stopped in spring and started in autumn. `calculateLastFrostDate` and
`calculateFirstAutumnFrostDate` in `src/lib/frost.ts` use that record for the
saved postcode — so every sowing date on the site follows it — within limits:

| | may move earlier | may move later |
|---|---|---|
| last spring frost | 14 days | 28 days |
| first autumn frost | 28 days | 14 days |

The limits exist because frost isn't the whole season: Penzance's record says
frost stops five weeks before the latitude model, but its light and soil are
still March's. Server-rendered pages, city pages and UK-average pages always
use the model, so they render the same for everyone.

Checked against real archive data (2016–2025): Barnet 0 days from the model,
York −1, Buxton (294 m) +6, Penzance −35 (held to −14).

**The Answer speaks from the brain.** `src/lib/local-answer.ts` writes the
homepage Answer's greeting, its weather sentence and a whispered provenance
line. All pure functions, tested for every week of the year.

## Rules for the next agent

- Need a new weather field? Add it to the one request in `weather-brain.ts`.
  A test fails if any other file calls the forecast API.
- Need a new judgement? A pure function in `weather-brain.ts`, with a test.
- New weather goes into sentences, not tiles (DIRECTION, ANTI_PATTERNS).
- Copy in `local-answer.ts` is site microcopy in the house voice; Kate has not
  yet reviewed the new lines. Treat her edits as vetoes.

## Fixed along the way

- "Tonight's" frost low was today's daily minimum — after breakfast, that is
  the frost already over. It now reads the coming night, 6pm–9am.
- The watering note read yesterday's maximum temperature and yesterday's
  evaporation as today's, and summed four days of rain as three.
- Soil readings were matched against UTC, so an hour out all summer.
- The Answer told November gardeners "the season's properly open" and that
  "tender crops are happiest now the soil has warmed".
- The garden dashboard called it blight weather above 20°C and 75% humidity;
  the blight page used the Hutton Criteria. One definition now.

## Engine fixes — approved by Kate, 16 Nov 2026

Found by simulating the year; fixed in `src/lib/crop-windows.ts` (the shared
window engine), with `calendar.ts` and `getCropsByAction` pointed at it. Every
promise below is a test in `src/lib/season-year.test.ts`.

**The UK-average garden did not move.** Its windows are identical to the day,
bar two deliberate additions: broad beans now appear in October–November, and
garlic's window runs six weeks (the "Oct-Nov" its own tip promised) not four.

1. **Garlic runs the right way up the country.** Autumn sowings are counted
   from the autumn frost, not back from spring (`sowingOpenAt`). Aberdeen:
   mid-September. Barnet: mid-October. Penzance: late October.
2. **Each garden has its own autumn** (`autumnFrostFor`): 25 October for the
   average garden, about five days earlier for every six days its spring frost
   runs late.
3. **Tender and half-hardy sowings close by the garden's own autumn; hardy
   crops keep 25 October.** A blanket version was tried first and emptied
   Aberdeen's June list of peas and beetroot — hardy crops stand through the
   first frosts. No sowing is ever squeezed below a fortnight.
4. **Tender plant-outs get the same run-up to frost everywhere**
   (`plantOutCloseAt`). Aberdeen is no longer offered peppers on 31 August; its
   tender plant-out window now ends in late June. Always at least three weeks
   past the ideal date.
5. **Autumn broad beans** — a second, overwintering sowing (`autumnSow` on the
   crop). Their crop page gets an "Or sow in autumn" date.
6. **Soil minimums:** French beans 12°C, sweetcorn 10°C.
7. **ColdSnapNote** says the first frost "can come from" its date, which is
   what the date means.

Also fixed, because verifying the above exposed it: **dates slipped a day
across the March clock change.** Week arithmetic was done in milliseconds, so
the server rendered "sow carrots from 25 March" and a UK browser corrected it
to "24 March" as the page loaded (a hydration error on most crop pages).
`addDays`/`addWeeks` are calendar-safe now and `SowPlanner` uses them.

### Still open

- **Open-Meteo licence.** The free tier is for non-commercial use, and its
  daily limit is per IP address. Visitors' browsers are fine; the two
  server-side callers (`/guides`, `/api/blight-map`) share Netlify's
  addresses. Worth reading their terms before leaning on it harder.
- **Two older date engines are untouched:** `src/lib/sowable.ts` and the
  lucky-dip game still count garlic from the spring frost, on the UK average
  only. They agree with the main engine for the average garden.
- **Verdict grammar** on crop pages predates this work: "garlic are near the
  end of their direct sow window".
- **Sow-in-[city] pages** are server-rendered from the model, so northern
  cities' month lists now shift a little with their own autumn. Worth a skim
  of one northern and one southern city page.

## Step 3 — weather that changes the list (not built)

The brain now knows enough for the sowing list itself to respond:

- **Soil gates the list.** A direct-sow crop whose soil minimum isn't met
  moves from "sow this week" to "ready when the soil reaches N°" — on /sow and
  the crop verdict, not only in the Answer's sentence.
- **Frost in the week ahead holds plant-outs.** Any frost-risk night in the
  next seven turns "plant out now" into "harden off; plant after Thursday".
- **The season, early or late.** Compare this year's warmth so far with the
  ten-year record ("running about a week ahead") and say so once, in the
  Answer. Needs one more archive variable.
- **Rain against normal** feeds the watering note in summer.

Each needs the engine to accept a weather snapshot alongside the frost date,
and each changes advice — so each wants Kate at localhost before it ships.

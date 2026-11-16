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

## Waiting on Kate's yes (found by simulating the year; not changed)

Each is recorded as an `it.todo` in `src/lib/season-year.test.ts`.

1. **Garlic runs backwards up the country.** Autumn planting is keyed to the
   *spring* frost, so Penzance is told mid-October and Aberdeen late
   November–December. Cold gardens should go first. Fix: key autumn sowings
   to the first autumn frost.
2. **Late plant-outs.** The plant-out window stays open twelve weeks, so
   Aberdeen is offered "plant out peppers, chillies, aubergines" on 31 August,
   three weeks before its first frost.
3. **Sowing closes on 25 October everywhere.** `sowingCloseAt` and
   `calendar.ts` hard-code it, so Aberdeen gets Penzance's last-sowing dates.
   A blanket fix was tried and reverted: applied to hardy crops it emptied
   Aberdeen's June list of peas and beetroot. The right fix applies each
   garden's own autumn to tender and half-hardy crops only.
4. **No autumn-sown broad beans.** They only appear February–March; the
   October–November sowing isn't in the data.
5. **Soil minimums look low for two crops.** French beans and sweetcorn
   inherit 8°C from "half-hardy"; most guidance says 10–12°C. One line each
   (`minSoilTempC`) if Kate agrees.
6. **"The first frost is usually around…"** (ColdSnapNote). The autumn date
   behaves like the *earliest* first frost in ten years, not the usual one.
   The copy could say "can come from".
7. **Open-Meteo licence.** The free tier is for non-commercial use, and its
   daily limit is per IP address. Visitors' browsers are fine; the two
   server-side callers (`/guides`, `/api/blight-map`) share Netlify's
   addresses. Worth reading their terms before leaning on it harder.

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

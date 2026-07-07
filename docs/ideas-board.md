# What To Sow — Ideas Board

The Forager's weekly shortlist, ranked, with evidence. Cards move through
**Proposed → Approved / Parked / Binned**. Never re-pitch anything Binned or
Parked without new evidence; never duplicate a card already on this board.

---

## Proposed — 2026-07-07

### 1. "Still Watering?" — a live hosepipe-ban checker · FEATURE

**Evidence:** Three English water companies have live or imminent Temporary
Use Bans right now: South East Water (Kent, ~850k customers, from 3 July),
Yorkshire Water (~5m customers, from 11 July, reservoirs at 55.8%), and
Southern Water (Hampshire & Isle of Wight, ~1m customers, from 21 July).
Thames Water is issuing advisory notices to London/Thames Valley without a
formal ban yet. This follows the UK's highest June temperature on record —
37.3°C at Santon Downham, Suffolk on 26 June (GOV.UK drought report).
Several generic postcode-checker sites exist (lawnbyseason.com, Water UK)
that tell you *if* you're banned, but none pair that with garden-specific
advice — what's still legal, and what to do about tonight's watering.
Our own `guides/watering` page already targets "hosepipe ban garden" as a
keyword and carries solid evergreen advice (water butts, grey water) — but
it's static and generic, not live or personalised. That's the gap: the
brand's whole DNA (frost map, blight watch) is turning a generic fact into
a personal, timely one, and we haven't done that for the single biggest
live gardening story of the summer.

**Pitch:** A small tool, same family as frost-map and blight-watch: enter
your postcode (or reuse the saved one), see your water company and its
current status in one plain sentence, then — regardless of ban or not — the
Watering Note's usual voice tells you what's still allowed tonight: water
butt, grey water, drip line with a timer, can at the roots. Doors out to
`/guides/watering` and to sowable-now crops that cope on a can rather than
a hose. Data is a small hand-maintained file (water company → postcode
area → status), refreshed by Kate as bans change — no API dependency,
same pattern as keeping blight-watch current. A genuinely shareable,
screenshot-worthy front page moment while this story is live.

**Payoff vs effort:** High payoff (live national news relevance, matches
the site's tool-DNA exactly, strong natural link-bait, and the "still
legal" answer — water butts, drip kits, timers — is itself the buying
guide, so revenue rides along without a separate sales pitch). Medium
effort (one small static data file to build and maintain by hand, a
postcode → water-company lookup, and a page/section in the existing
Watering Note voice — no new design language needed).

---

### 2. Sowing through a dry spell — which of this week's crops need a can, not a hose · CONTENT

**Evidence:** Every competitor July calendar we found (RHS, Suttons,
gloriousgarden, Garden Ninja) lists what to sow this month with no mention
of the live watering restrictions — a real gap during a live news moment,
not a permanent one. Meanwhile the drought/hosepipe-ban advice sites (BBC
Gardeners' World, Garden Health, Woman & Home) are all covering "what's
still allowed" this week, but none of them connect it back to *what to sow
now*, which is squarely our territory.

**Pitch:** A short piece — or a note folded into the existing Week's List —
naming which of this week's direct-sow crops (root veg, chard, beans)
shrug off a dry spell once established versus which (salad successions,
anything freshly pricked out) need daily attention we might not be able to
give. Ends forward, as ever: not "don't sow," but "sow this, hold that for
a fortnight."

**Ready-to-queue brief:** *Working title:* "What's worth sowing when you
can't water every day." *Angle:* pulled straight from this week's sowable
list in `weekly-list.ts` — split by root depth and establishment need, in
the Watering Note's voice, not a new dashboard. *Length:* 400–500 words.
*Photos:* one only, and it must carry information (a watering can at the
base of a row, not a stock drought landscape). *Links:* into `/guides/watering`
and the relevant crop pages. *Voice check:* no personifying the soil or sky
— plain observation only, per COPY_REWRITES' ceiling.

**Payoff vs effort:** Good payoff (rides the same live news moment as card
1, cheap to produce, reinforces trust — free advice before any product).
Low effort (short piece, existing data source, no new component).

---

### 3. Blight, after the heat broke — a diary note · CONTENT

**Evidence:** Blight needs 10–25°C and 90%+ humidity for 48 hours to
release spores (the Hutton Criteria / Smith Periods, per Blight Watch and
BlightSpy) — textbook conditions for the days right after a record
heatwave breaks into the muggier, wetter pattern the water companies are
now bracing reservoirs against. Our own Blight Watch tool will likely be
showing elevated risk right when this would post, and the Cut List /
Phase 11 cadence explicitly asks for one diary post a month when Kate has
a real story and photos — this is a naturally-occurring one, not a
manufactured hook.

**Pitch:** A short first-person note — did she check the tomatoes this
week, what she saw (or didn't), tied lightly to the live Blight Watch
reading. Pure trust content: no affiliate link, no CTA, just the plot and
the weather, which is the entire brand.

**Ready-to-queue brief:** *Needs Kate first* — this can only be queued once
she's actually looked at her plants; nothing here should be written on her
behalf (NEXT_PHASES §5, rule 8). If she has 4–5 sentences and a photo, the
piece writes itself in the existing editorial-posts.ts pattern. *Length:*
250–350 words. *Voice check:* the diary register already in use for the
June/May "what I'm doing right now" posts.

**Payoff vs effort:** Medium payoff (trust-building, low reach on its own,
but compounds the diary's authenticity). Low effort — but blocked on Kate's
actual plot check, so it's a brief on standby, not a queued task.

---

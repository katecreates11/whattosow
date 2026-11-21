# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-11-21 (week 19)._

**Status, before any taste theory:** **103 days** since the last Potting
Bench decision (card 21, 10 August) — the **fifteenth** silent week
running. **PR #3 at 108 days**, still zero reviews. But `main` didn't stop
at last week's five-item fix: between 16–17 November it took **fourteen
more commits** — a whole weather/frost feature, a full affiliate-revenue
audit, and a 511-link bug fix bigger than anything the crew has ever
flagged. Kate's own direct engineering is no longer an exception to the
freeze; this week it's the main event, and it's teaching this memory more
than the crew's own branches are. See §1.

---

## 1. Kate's taste

_Still no new Bench decision for the fifteenth week running. Taste rules
below are carried forward unchanged unless noted — but this week's `main`
activity is rich enough to revise two live theories and add one new one._

### REVISED — last week's "the freeze has a working channel: any flat checklist" theory was too broad; narrow it
- **Confidence:** medium (down from the "strongest lead this quarter"
  framing last week). The 11 November fix did match the SEO Watchdog's
  checklist, in order — that evidence still stands. But this week supplies
  a clean counter-case: the Groundskeeper's dead-Sarah-Raven-links finding
  is the same shape (flat, ranked, one-line-per-item, file-and-line named)
  and has been sitting on crew branches since **August**, repeated in at
  least four separate weekly reports, including this week's — and it is
  still unfixed. Two checklists, same shape, opposite outcomes. The
  difference isn't format. It's that the SEO fix landed inside work Kate's
  own session was already doing on that exact area (the November SEO/money
  push); the Sarah Raven fix lives only on a branch nobody's session has
  opened. Revised rule: **a finding gets acted on when it falls inside
  work Kate (or her session) is already doing, not because it's shaped as
  a checklist.** Format may still help once something's in front of her;
  it doesn't get it in front of her.
- **Evidence:** `3060827` fixed SEO items #1–#5 same week as a matching SEO
  push; the Sarah Raven links (flagged 10 Aug, repeated ~9 Nov, repeated
  again 16 Nov in `groundskeeper/2026-11-16`, now a *fourth* consecutive
  report) remain unfixed despite being individually smaller and simpler
  than anything in Batch A.

### STRENGTHENED — Kate's own direct sessions are the primary active channel on this project, not a side exception
- **Confidence:** high, n=6+. 3 Sep, 7 Sep, 19 Oct, 11 Nov, then a
  fourteen-commit burst 16–17 Nov: a full weather/frost-date feature
  (`weather-brain-2026-11.md`), a Phase 12 affiliate-revenue audit that
  found and fixed **511 broken Thompson & Morgan links across 253 pages**
  (wrong URL pattern — far bigger than any single finding the crew's
  Groundskeeper has produced in nineteen weeks), a wrong US-visitor
  redirect, a `.com` duplicate, month pages rebuilt as listings, a new
  windowsill-microgreens guide, and a date-engine unification. None of
  this touched `docs/ideas-board.md` or any crew branch. This is now the
  dominant mode this memory should assume, not a footnote to "the freeze."

### NEW — real analytics now back the monetisation rulebook's oldest, least-tested rule
- **Confidence:** high (upgraded from "theoretical"). Phase 12's numbers:
  buying guides convert at 23.7% of UK visits (compost bins 35%) against
  2–6% everywhere else; in-flow/comparison-table links outsell rail links,
  exactly as the monetisation rulebook predicted on no data at all; Amazon
  *search* links barely sell (15 of 16 Amazon sales were not the searched
  item); postcode-entering readers click 5.7% vs 3.4%. First real evidence
  for a rule this memory has been citing on instinct since week 1.

### NEW CONNECTION — the SEO Watchdog may be chasing the wrong search engine
- **Confidence:** medium, one data point but a striking one. Phase 12's
  traffic breakdown: UK sessions by source are DuckDuckGo 1,509 · Bing
  1,074 · Google 1,053 · Ecosia 555 · Yahoo 364 — Google is *third*, not
  first. The SEO Watchdog's own 17 November report calls its indexing
  section "the weakest part of this report" for lack of Search Console
  access, and has spent nineteen weeks assuming Google is the audience.
  Worth the next SEO Watchdog run reading Phase 12 before writing another
  Google-indexing section.

### UNCHANGED — Forager runs that branch from the latest `dreams/*` branch produce clean, non-duplicate pitches
- **Confidence:** high, now n=3. The 15 November run (cards 92–95)
  branched from `dreams/2026-11-14` for a third straight time, two of
  those times by explicit instruction, and again produced zero duplicates
  against all ~17 existing pitch families. This is the single most
  reliable mechanical finding in the whole memory.

### UNCHANGED — the rest of the frozen taste rules
Feature ideas extending the calculator DNA (Glut-o-meter, "Every Drop," the
green-manure picker) land easily, zero rejections to date; dreamt
scope-additions to already-pitched/built cards are 6/6 historically;
independently-converged pitches (rhubarb forcing, card 49, still a
confirmed four-way convergence, now with chicory-forcing — card 94 — making
a third unrelated sighting of the same "deny a dormant thing light or
warmth" mechanic, see §season); "parked" still means "not now," never
re-pitched. All untested by an actual decision for fifteen weeks; none
contradicted. Four single-instance rules from July (approval notes built
exactly as asked; revenue instructions near a monetised hub; affiliate-mix
pitch avoidance; Night Gardener deferring undefined calls) have now had
zero retest opportunity for four months — kept as low-confidence footnotes
rather than written out in full again; see week 18 for their original
evidence if they ever resurface.

---

## 2. What works

- **Kate's own direct engineering sessions.** The real channel, confirmed
  again this week at far greater scale than any crew branch has ever
  produced. See §1.
- **Work that falls inside whatever Kate's session is already focused on**
  gets fixed fast, whatever its format. Work that sits only on a crew
  branch doesn't, whatever its format. (Narrows last week's "checklists
  work" claim — see §1.)
- **In-flow/buying-guide monetisation over rail placement.** Now backed by
  real numbers, not just the rulebook's instinct.
- **A Forager run on the `dreams/*` branch produces clean pitches.** n=3.
- **Report-writing agents self-correcting their own prior sampling** — the
  Groundskeeper again distinguished a 403 bot-wall from a real 404 this
  week, cleanly, for at least the third week running.
- **The Potting Bench as the decision surface, in principle.** Untested in
  practice for 103 days.

---

## 3. Self-score (against the 2026-11-14 dream)

**Hit, n=3:** card 85's instruction (branch future runs from `dreams/*`)
was followed a third time, 15 November, without even needing to be
re-named this week — it's becoming habit rather than a one-off compliance.

**Downgrade, not a clean miss:** last week's dream treated "a flat
checklist gets acted on" as the strongest lead of the quarter on n=1. This
week supplied a same-shape counter-example (Sarah Raven links, unfixed a
fourth time) that the dream didn't anticipate and couldn't have, on the
evidence it had. The honest correction is in §1 — it isn't the format,
it's whether the finding sits inside work already underway. Recorded as a
theory correction, not a prediction failure, since nothing last week
committed to a falsifiable claim beyond "format, not channel, might be
the variable" — but worth being more cautious next time before calling
n=1 the strongest lead of the quarter.

**Not yet scoreable:** card 90 (link rhubarb/bulb forcing once built) and
card 91 (checklist PR #3) — neither has had anything built or touched to
score against. Carried forward.

See `scoreboard.md` for this week's row.

---

## 4. Season note

21 November, UK. Christmas is 34 days out. The new weather-brain feature
(frost dates from each garden's own ten years of nights) ships just as
frost genuinely starts to matter. Rhubarb forcing (card 49/84) and bulb
forcing (card 87/88) remain open, undecided windows; chicory forcing (card
94, this week's Forager pitch) makes a third independent sighting of the
same "trick a dormant thing into growth out of season" mechanic — rhubarb,
bulbs, now a salad crop — still nobody's connected all three, not even the
one-sentence link already promoted (card 90) covers all three. The seed-
potato ordering window (card 92) opens properly in January but the "order
now" messaging season (per card 1's own precedent) starts now. The bare-
root, storage, hosepipe-ban and frost-countdown families remain unbuilt
through a sixth season turn.

---

## 5. Open threads

- **URGENT, worsening — 103 days since any Potting Bench decision, the
  fifteenth silent week.**
- **URGENT, worsening — PR #3 at 108 days, confirmed zero human review.**
  Still unblocks cards 13, 14, 16–21 and everything queued behind it. Card
  91's checklist suggestion is unactioned and, per §1's revision, may not
  be the fix anyway — nobody's current session is "already in" the
  Glut-o-meter's area the way November's sessions were in SEO/money.
- **Confirmed a fourth time, still unfixed: four dead Sarah Raven product
  links** (`squash-uchiki-kuri`, `basil-genovese`, `rhubarb-champagne`,
  `radishes-french-breakfast`, all in `src/data/varieties.ts`) — three
  since August, one newly confirmed 16 November. This is now the single
  cleanest test case left in this whole memory for the channel question in
  §1: it is small, true, checklist-shaped, and has had four separate
  chances to be seen. If it's still unfixed next week, that's further
  evidence it's not about format at all.
- **New real-money findings from Kate's own Phase 12 audit (`docs/plans/
  affiliate-findings-2026-11.md`), decisions explicitly waiting on her:**
  pick one real product per buying-guide row (prefer Thompson & Morgan,
  8% convert vs Amazon's 3.4%); join a specialist merchant programme for
  big-ticket items; decide on email capture (43 signups, capture mostly
  off). None of these route through the crew; noted here only so this
  memory doesn't lose track of them.
- **The SEO Watchdog has no memory of its own prior weeks.** Its 17
  November report opens "First watchdog run, so there's no prior report to
  diff against" — it branched from `main`, not from the latest `dreams/*`
  branch, unlike the Forager (§1). Worth it doing what the Forager now
  does by habit.
- **Eighteen-plus "Dreamer" Gmail drafts remain unopened**, back to 12
  July; this week adds a twentieth. Two format experiments (long, short)
  and the "something else reached her instead" correction from last week
  both still hold: this channel has never once been the thing that worked.
- **The write-to-main gap is still structural and now eighteen+ weeks
  old.** `chore/forager-writes-board-to-main` remains unmerged.
  `docs/ideas-board.md` on `main` itself still shows only cards 1–29;
  cards 30–95 exist solely on branches, recovered here.
- **Rhubarb forcing (card 49/84) is still the single most evidence-backed
  undecided idea on the board** — now a near-five-way convergence with
  chicory forcing (card 94) added this week.
- The hosepipe-ban family (8, 12, 16), the Christmas cluster (4, 60, 62–64,
  66–68, 86–89), the bonfire-hedgehog family (50, 74, 75, past their own
  window), the frost-countdown family (30, 38), the storage family (13,
  20, 76, 77) and the seed-potato pitch (92) all still await a single
  Bench session. Card 24's overlap with 18/21/37 — still undecided. The
  companion-planting playground / ReactGarden overlap — still parked. The
  F1/heirloom affiliate-conflict check — still untested.
- **NEW — where this memory itself sits.** Nobody's November session
  touched `docs/dreams/` or `docs/ideas-board.md` while doing fourteen
  commits of real work three clicks away. This memory's own channel (a
  `dreams/*` branch) is in exactly the same unread state as the crew's
  other four. See card 96, promoted this week.

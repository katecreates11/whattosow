# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-08-22 (week 6)._

**A note on this week:** the first fully silent week — zero commits reached
`main`, zero Potting Bench decisions, zero PR review. Kate did come back to
the repo once, to merge last week's dream branch (18 August), but that's
the only action recorded anywhere this week; the board (cards 22–29) and
PR #3 sit exactly where they were seven days ago. Meanwhile the three
routines the crew-wide bug hits kept running on schedule and kept missing
`main`: a new Forager run (16 August), a new Groundskeeper report (17
August), a new SEO Watchdog report (18 August) — all confirmed, again, only
by querying the GitHub API directly rather than local `git branch -r`. The
bug is now a month and a half old, still unfixed, and this week it produced
a new kind of cost: because the 16 August Forager run branched from a
`main` that predates last week's board recovery, it re-pitched leaf mould
(already card 28) under colliding card numbers. Delay used to be the whole
cost; now it's also duplicate work. See §5.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. Two weeks now with no new evidence either way —
  nothing built, nothing freshly approved. Unchanged, not tested.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Two weeks unchanged; no new evidence either way.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 build (PR #1 / `ColdSnapNote`). Still
  untested at scale — nothing from the 13–21 batch has shipped yet (the
  Glut-o-meter that *has* shipped, PR #3, predates this batch and isn't a
  tie-in-note case, and it still hasn't been reviewed — see §5).

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged.

### Kate wants real photography and video, said twice
- **Confidence:** low, nearing the ~8-week decay point with still no fresh
  signal. Seven-plus weeks and ten further decisions since the last
  mention. Not contradicted, just untested — if nothing surfaces by the
  next dream, drop it from active tracking rather than keep carrying it.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high, unchanged. Zero rejections of a calculator-shaped
  pitch to date; a third recovered pitch this week (card 30, the
  first-frost rescue triage) fits the same DNA and hasn't been seen by
  Kate yet either.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high, unchanged. Still six for six (cards 10, 11, 12, 16,
  20, 21) — no new test this week, since card 29 (last week's promotion)
  hasn't been decided yet. Still the crew's best-performing move, better
  than the Forager's own fresh pitches.

### RETIRED: "three scheduled routines went quiet in the same week"
Recorded last week as a flagged-not-concluded observation. Wrong, and wrong
in the same shape as the *previous* retraction ("a growing pile suppresses
decisions," retired the week before that): both times the instinct was to
explain a gap with something about Kate's attention, and both times the real
cause was mechanical. The Forager, Groundskeeper and SEO Watchdog all ran on
schedule through the gap (branches dated 8/2, 8/3, 8/4, 8/9, 8/10, 8/11 all
exist) — none of their output reached `main`. See §5 for the corrected,
now-crew-wide diagnosis, and the note above on *why* last week's check
missed it.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high, unchanged.
- **Dreamt scope-additions to unbuilt cards get approved.** See §1 — 6/6.
- **Evidence-required cards with a named, current commercial/seasonal
  window get approved fast.** Confidence: high, unchanged this week (no new
  batch to test it against — the pipeline is stalled, see §5).
- **A build that follows a specific approval note exactly gets kept, not
  reverted.** Confidence: medium, still n=1 (PR #1). Still the crew's
  biggest untested-at-scale claim — the 13–21 batch remains entirely unbuilt.
- **The Night Gardener's repair path handles one specific failure mode:
  an *approved* PR that's gone stale against current `main`.** It does
  **not** apply to a PR that's simply waiting for Kate's first review — that
  case is working as designed (see PR #3 in §5), not stuck. Worth keeping
  these two states distinct; conflating them was almost this week's mistake.
- **Querying the GitHub API directly (`list_branches`, `list_pull_requests`)
  finds work that local `git branch -r` misses after a fresh checkout.**
  Confidence: high, confirmed a second week running — surfaced this week's
  three new stuck branches (Forager 8/16, Groundskeeper 8/17, SEO Watchdog
  8/18) and PR #3's now-17-day wait. Treat the API call as the real STEP 1.
- **When a week looks quiet, check for a mechanical cause before a
  behavioural one.** Confidence: high — two clean tests, two wins. "A
  growing pile suppresses decisions" and "three routines went quiet" were
  both wrong in the same way: reaching for an explanation about Kate's
  attention before ruling out plumbing. This week's genuine behavioural
  fact (Kate touched the repo only to merge the dream branch, nothing else)
  is reported as an observation in §5, not turned into a third theory —
  there's no plumbing left to blame this time, but that's not the same as
  knowing the reason, so it isn't being guessed at either.

---

## 3. Self-score (against the 2026-08-15 dream)

Nothing to score. Card 29 (last week's dreamt promotion — let card 9 read as
a look-back, not a live diary) hasn't been decided; card 21 was already
scored last week. Zero Potting Bench decisions happened at all this week, so
there is nothing pending or fresh to check a prediction against. Not a miss
— there was no decision cycle for anything to land in. Third quiet-for-
scoring week out of six (see scoreboard.md: 8/1, and now this one, with
8/15 a near-miss since card 21 landed just before the dream ran).

---

## 4. Season note

22 August, UK. National Allotments Week has closed (card 9/29 still
unbuilt — see §5). Drought has deepened sharply: 71.3% of England is now in
drought and ten water companies hold Temporary Use Bans (Wessex Water
joined 18 August), up from three companies and ~6.85m people when card 8
was first pitched in July — cards 12/16 (the hosepipe pieces) are more
overdue by the week, not less. Malvern Autumn Show's giant-veg championship
(card 18/21's anchor) and its giant-pumpkin weekend (25–27 September, new
evidence for card 31 below) are both 4–5 weeks out. The allium leaf miner/
leek moth danger window (card 34 below) opens in the next few weeks.
Chilli/tender-crop overwintering (parked card 15) is closer but still not
urgent, and it's parked — not re-pitching it.

---

## 5. Open threads

- **URGENT — the write-to-main bug is crew-wide and now six weeks old,
  unresolved.** Confirmed a third week running: the Forager (16 August),
  Groundskeeper (17 August) and SEO Watchdog (18 August) all ran on
  schedule and all landed on their own branch, not `main`. `docs/reports/`
  on `main` has still never once received a Groundskeeper or SEO Watchdog
  report. New this week: the cost has grown past delay. The 16 August
  Forager run branched from a `main` that pre-dates last week's board
  recovery, so it couldn't see cards 22–28 and re-pitched leaf mould (a
  near-duplicate of card 28) under colliding card numbers — recovered below
  as card 32, flagged as a likely duplicate rather than silently merged
  with card 28. Every week this stays unfixed, the next recovery gets
  messier.
- **URGENT — PR #3 (the Glut-o-meter) has now waited 17 days for a first
  review** (opened 5 August; 10 days at last week's dream, 17 now), and the
  entire approved backlog is still frozen behind it. Still working as
  designed, not stuck (the Night Gardener correctly won't touch an
  unreviewed PR) — but nine approved, build-ready cards (13, 14, 16, 17,
  18, 19, 20, 21, 29) are stalled behind one review that would take Kate a
  few minutes.
- **Fact, not a theory: this week Kate's only recorded action anywhere in
  the repo was merging last week's dream branch.** No Potting Bench
  decisions, no PR #3 review. Logged as an observation per §2's "check
  mechanical first" habit — there's no plumbing bug left to blame for this
  one, but that's not evidence of a cause either, so none is being guessed.
  Worth one more week before treating a second silent decision-week as
  a pattern rather than a busy fortnight.
- **The three dead Sarah Raven affiliate links are now confirmed a second
  time and still unfixed, two weeks running.** First found in the 10 August
  Groundskeeper report; the 17 August report re-checked all three and they
  are still genuine 404s (Uchiki Kuri squash, Genovese basil, Champagne
  rhubarb). Real, current revenue loss, and now the single cheapest fix on
  this entire list — three URL corrections, no design, no copy.
- **The SEO Watchdog's 18 August report confirms all 11 FIX NOW items from
  11 August are still open, unchanged**, and adds one piece of hard
  evidence the crew didn't have before: a live Google snippet for
  `/sow-in/worcester` is showing a title computed in June ("— June 2026
  Sowing Guide") two months after the fact, because the route has no
  `revalidate` and hasn't rebuilt since. The staleness risk flagged weeks
  ago is now visibly happening in search results, not just theoretical.
- **Two small, evidence-precise opportunities from the 18 August SEO
  Watchdog report are promoted to the board this week** (cards 33, 34) —
  see below. Both are data-file additions to pages that already exist and
  already rank; neither needs a new page or a design pass, just a Night
  Gardener slot once PR #3 clears.
- Photo/video ask (see §1) — one week from the ~8-week decay point, still
  no signal either way.
- The companion-planting playground / ReactGarden overlap — still parked,
  still unscheduled.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.

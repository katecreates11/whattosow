# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-08-15 (week 5)._

**A note on this week:** a quiet week for decisions (one: card 21, already
decided before this dream ran) but the loudest week yet for what was sitting
undiscovered. Local `git branch -r` after a fresh checkout shows only `main`
— it does not list remote branches unless you fetch them by name or query
the GitHub API directly. Last week's dream ran that check, saw nothing, and
concluded three routines had gone quiet. They hadn't: the GitHub API (this
week, `list_branches`) shows the Forager, Groundskeeper and SEO Watchdog all
kept running weekly — they just kept landing on unmerged branches instead of
`main`, the exact bug the crew has been calling "the Forager's pipeline
bug" for a month. It isn't Forager-specific. See §5.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. No new evidence this week — nothing built, nothing
  freshly approved on this axis. Unchanged from last week.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Unchanged; no new evidence this week.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 build (PR #1 / `ColdSnapNote`). Still
  untested at scale — nothing from the 13–21 batch has shipped yet (the
  Glut-o-meter that *has* shipped, PR #3, predates this batch and isn't a
  tie-in-note case). See §5 for why the batch is stalled.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged.

### Kate wants real photography and video, said twice
- **Confidence:** low, and now dropping off active tracking. Six-plus weeks
  and nine further decisions since the last mention. Not contradicted, just
  no longer worth weighing until it resurfaces on its own.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high, unchanged. Zero rejections of a calculator-shaped
  pitch to date; two more recovered this week (cards 27, spring-bulb
  spacing) fit the same DNA and haven't been seen by Kate yet.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high.
- **Evidence:** now six for six. Card 21 (anchor the giant-veg tool to
  Malvern, not Worcester) was approved 10 August, the day after this dream
  promoted it — cards 10, 11, 12, 16, 20 and now 21 have all been approved,
  no exceptions. Still the crew's best-performing move, better than the
  Forager's own fresh pitches.

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
  New this week, high confidence on one clean test: this is what surfaced
  four stuck branches and one 10-day-old open PR that a plain local git
  check would have missed entirely, again. Future Dreamer runs should treat
  the API call as the real STEP 1, not a local git command.

---

## 3. Self-score (against the 2026-08-08 dream)

One clean, scoreable prediction: card 21 (anchor the giant-veg tool to
Malvern, not Worcester) was promoted as a dreamt scope-addition and approved
10 August, exactly as predicted. **1/1 correct** — sixth in a row for this
move, see §1.

The other two forward-looking notes from last week's dream weren't actioned,
but neither really had the chance to be: "write National Allotments Week as
it happens" wasn't taken up (card 9 is still unbuilt — see §5, its window
closes today), and "give the build queue an urgency order" couldn't be
tested because the Night Gardener hasn't opened a *new* build since (PR #3
has occupied its one-PR slot since 5 August). Not scored as misses — there
was no build cycle for either idea to land in.

---

## 4. Season note

15 August, UK. National Allotments Week (10–16 August) ends tomorrow; card 9
(approved 13 July specifically for this week) has not been built and will
not make it — see §5 for a reframe rather than letting it lapse silently.
Malvern Autumn Show's giant-veg championship (card 18/21's anchor) is still
weeks out. Chilli/tender-crop overwintering (parked card 15) starts to
matter in the next 4–8 weeks but isn't urgent yet, and it's parked — not
re-pitching it.

---

## 5. Open threads

- **URGENT — the write-to-main bug is crew-wide, not Forager-specific, and
  unresolved after a month of being flagged.** Confirmed this week across
  three routines: two more Forager runs (2 and 9 August — 7 cards, recovered
  onto the board below as 22–28) never reached `main`; and *every single*
  Groundskeeper and SEO Watchdog report found so far — 8/3, 8/10
  (Groundskeeper) and 8/4, 8/11 (SEO Watchdog) — is sitting on its own
  branch. `docs/reports/` on `main` has never once received one of these.
  This has been treated for weeks as "the Forager's pipeline bug" and a
  side-question about report cadence; it's neither — it's one mechanism
  (agents finishing work but not landing it on `main`) hitting three
  different crew members. Worth someone looking at what these routines
  share in their write step, since the Night Gardener (which pushes real
  branches and opens real PRs) doesn't have this problem.
- **URGENT — PR #3 (the Glut-o-meter) has waited 10 days for a first
  review, and the whole approved backlog is frozen behind it.** Built 5
  August, still open, no approval marker — which is the Night Gardener
  working correctly (it won't touch an unreviewed PR, by design), not a
  repeat of the PR #2 problem. But its one-open-PR rule means nothing else
  can build while it waits: cards 13, 14, 16, 17, 18, 19, 20, 21 — eight
  approved, build-ready cards — are all stalled behind one review. This is
  exactly the collision this dream predicted a week ago, now real.
- **Card 9 (National Allotments Week) will miss its own week entirely** —
  not "likely," as flagged last week, but now certain; the week ends
  tomorrow and the Night Gardener hasn't built anything since PR #3. See the
  dreamt reframe promoted to the board below.
- **The Groundskeeper's 10 August report found three genuinely dead
  affiliate links** (Sarah Raven: Uchiki Kuri squash, Genovese basil,
  Champagne rhubarb — all real 404s, not bot-blocking) sitting unseen on its
  branch for five days. Real, current revenue loss; worth Kate's eye
  directly on that branch rather than waiting for a code fix to flow through
  this memory.
- **The SEO Watchdog's 11 August report carries a ten-item FIX NOW list**
  (orphaned `/sow-in` cluster, a wrong canonical on `/kit`, `/privacy`
  missing from the sitemap, oversized titles across most guides, and more)
  — also unseen, also worth a direct look rather than summary-by-summary
  relay here.
- Photo/video ask (see §1) — dropped from active tracking, six-plus weeks
  stale with no signal either way.
- The companion-planting playground / ReactGarden overlap — still parked,
  still unscheduled.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.

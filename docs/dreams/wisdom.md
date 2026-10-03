# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-10-03 (week 12)._

**Status, before any taste theory** (last week's own suggestion, adopted):
**54 days** since the last Potting Bench decision (card 21, 10 August) —
the **eighth** silent week running. **PR #3 at 59 days**, still zero human
engagement. `main` has not moved in **26 days** (since 7 September). Board
sits at **59 cards** (3 more recovered this week, 2 of them duplicates), of
which roughly a dozen are dreamt promotions still undecided. **Bench
status: resolved this week, not broken** — see §2. Write-to-main bug: ~12
weeks old, still unfixed, and its own *named fix* (check sibling unmerged
branches before writing) still isn't being followed — see §5.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. Ten weeks with no new evidence — unchanged, not
  retested. Built on cards 2, 7, 17.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Unchanged, same reason.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high. Zero rejections to date across every batch. Cards
  30/38/53 (frost countdown, three pitches), 41, 48, 59 (new, bare-root
  picker) all fit this DNA and remain unseen by Kate.

### Dreamt scope-additions to already-pitched or already-built cards are the crew's single most reliable move
- **Confidence:** high, historical (6/6 on cards 10, 11, 12, 16, 20, 21).
  Untested since 10 August — thirteen promotions now sit undecided (29, 33,
  34, 37, 41, 42, 45, 46, 51, 55, 56, and this week's 60, 61). Still worth
  leading with on the strength of the record.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged (card 1's note).

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 (PR #1 / `ColdSnapNote`). Twelve weeks now
  with no second data point.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Independently-converged pitches (2+ blind sources, same gap) deserve priority when decisions resume
- **Confidence:** medium, unchanged in shape. Leaf mould: three-way
  (Forager 9 Aug, 16 Aug, SEO Watchdog 1 Sep). Top fruit/storage: three
  fragments (cards 23, 39, 42).

### A repeated commercial mechanic is a process gap, not a taste signal — now confirmed a second time
- **Confidence:** high. The bare-root/order-now family grew an identical
  pitch for the *second* time this week: the 27 September Forager run
  pitched "bare-root fruit trees & bushes — order now" (its own card 30,
  recovered below as card 57) — the same idea as card 52, pitched by the
  20 September run exactly one week before it. That's seven cards for one
  mechanic now (1, 25, 36, 39, 47, 52, 57). Same shape on the frost
  countdown (38, 45, 53). Says nothing about Kate; says the fix named two
  weeks running — check sibling unmerged branches before a Forager run
  starts — isn't happening. See §5.

### An "all clear" report is only as good as its sampling method — and a report can catch its own drift
- **Confidence:** high. New this week: the 28 September Groundskeeper
  report didn't just re-confirm the three dead Sarah Raven links (now
  unfixed 7+ weeks) — it explicitly named *why* the 21 September report
  missed them ("last week's report missed them... its sample... didn't
  happen to include these three"). The lesson from week 11 held one week
  later, and the agent caught its own predecessor's gap without being told.
  Worth noting as the method working, not just the bug recurring.

### Kate acts directly and fast on clear technical bugs, even during a total content-decision freeze
- **Confidence:** low, still n=1 (3 and 7 September). No new episode in 26
  days. Keep tracking, don't fold into "Kate is busy."

### NEW — a page can go stale in its own peak season just like an unbuilt card can miss its week
- **Confidence:** medium, one clean case. The SEO Watchdog's 29 September
  report found `/guides/autumn-planting-garlic-onions` — card 1, Kate's
  warmest-praised build — still carries July/August "pre-order" copy and is
  missing from `guide-relevance.ts`, during its actual October–November
  planting peak. Same shape as card 9 missing National Allotments Week and
  card 46/55's Malvern miss, but this is the first time it's happened to a
  page that's already *live and earning*, not just queued. See §5, card 61.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high in
  principle, untested in practice for 54 days.
- **Dreamt scope-additions to unbuilt or already-live cards get approved.**
  6/6 historically; thirteen more pitched since, none yet tested.
- **Reading the GitHub API directly, not local git or a report's own
  summary line, and defaulting to a mechanical explanation before a
  behavioural one.** Standard practice since week 5.
- **Checking a primitive directly resolves questions a summary can't.**
  New this week: raised in week 10 and carried as an open, unconfirmed
  question for six weeks — "does `/bench` actually load and accept a
  decision?" A direct fetch of the live page and a direct hit on
  `/api/bench` this week both answered cleanly: the page renders its real
  shell (the approve/park/bin copy, not an error page) and the API
  responds with a clean, deliberate `{"error":"unauthorised"}` — not a
  timeout, not a 500. **The Bench is not broken.** The 54-day silence is
  not an infrastructure problem; whatever it is, it isn't this. Retire the
  "is the Bench even working" open thread.
- **Independent re-confirmation across separate weekly reports is
  reliable, low-noise evidence — but only when actually re-checked.** The
  Sarah Raven links are dead an eighth week running, confirmed directly
  against `varieties.ts` on current `main` every time someone actually
  looked at the right sample.
- **The Night Gardener's repair path applies only to a stale approved PR,
  not one still waiting on its first review.** Confidence: high, unchanged
  — PR #3 is the latter case, working as designed, now at 59 days.

---

## 3. Self-score

Nothing scoreable against an actual Kate decision for an eighth week
running — see `scoreboard.md`. Thirteen dreamt promotions now sit
undecided. The process-gap theory (bare-root family) scores as correct a
second time: card 57 repeating card 52 was predicted as likely the moment
card 52's own evidence named the mechanism, and it happened again, one week
later, same shape. The 6/6 "dreamt scope-addition gets approved" record
stands as history, not a live streak, until the Bench reopens.

---

## 4. Season note

3 October, UK. British Summer Time ends 25 October (~3 weeks) — the
frost-countdown family (cards 38, 45, 53) and card 43 (The Dark Half)
cluster here and are now time-pressured, not just evidence-backed.
Bare-root/bulb ordering windows (cards 25, 30/52/57, 36, 39, 47) continue
narrowing toward winter price rises and stock-outs — seven pitches for one
mechanic now, still undecided. Leaf mould's setup window (card 28) is live.
Card 4 (Grow Your Christmas Dinner, built since July) needs its indexing
lead time spent now, not in November — see card 60. Card 1's live copy
needs its season fixed now, mid-planting-window — see card 61.

---

## 5. Open threads

- **URGENT, worsening — 54 days since any Potting Bench decision.**
- **URGENT, worsening — PR #3 at 59 days, confirmed zero human engagement**
  (one Netlify bot comment, zero reviews). `mergeable_state` still `clean`.
  The PR itself names its own unlock: add the HTML comment
  `<!-- potting-bench:approved-to-ship -->` and the Night Gardener merges it
  on its next run. A dozen-plus approved, build-ready cards sit behind it.
- **RESOLVED — "is the Bench even working?"** No. It isn't broken. See §2.
  Whatever explains 54 days of silence, it isn't infrastructure.
- **URGENT, unresolved, ~12 weeks old — the write-to-main bug, and now its
  own named fix isn't landing either.** `docs/reports/` on `main` has still
  never once received a Groundskeeper or SEO Watchdog report. Worse: the
  fix this routine has now named three weeks running (check sibling
  unmerged branches before a run starts writing) did not stop the 27
  September Forager run from repeating card 52's pitch. This has stopped
  being something to flag and started being something that needs an actual
  change to how these routines start up, not another week of the same note.
- **Confirmed, unfixed revenue-loss items:** the same three Sarah Raven
  links, dead an eighth week running (Uchiki Kuri squash, Genovese basil,
  Champagne rhubarb — `src/data/varieties.ts`). Each is a one-line URL swap
  or removal; cheap to fix directly, no decision needed first.
- **NEW — a live, praised page (card 1) is showing stale season copy during
  its own peak month**, and is invisible to its own `/guides` index ranking
  because of a missing `guide-relevance.ts` entry. Promoted below as card
  61.
- **NEW — card 4 (Grow Your Christmas Dinner) has sat unlinked and
  unindexed since July and is heading into the one season it exists for.**
  Promoted below as card 60.
- **NEW — the SEO Watchdog's 29 September report flags a wider orphan
  problem** (`/sow-in` cluster, ~52 pages; `/still-time`) gated on CUT_LIST
  decisions already pending — not re-pitching, just noting it's grown since
  the 22 September report and sits behind the same ⛔ gates.
- **The bare-root/order-now family has grown to seven pitches** (cards 1
  [live], 25, 36, 39, 47, 52, 57) plus one proposed index (41) and one
  sequencing ask (56) — still undecided.
- **The frost-countdown mechanic has three pitches** (38, 45, 53) — still
  undecided.
- Card 24 (vegetable-show piece) still flagged as possibly overlapping card
  18/21/37's scope — undecided.
- The companion-planting playground / ReactGarden overlap — still parked,
  unscheduled. The F1/heirloom affiliate-conflict check — still untested.

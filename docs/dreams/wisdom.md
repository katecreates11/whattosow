# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-10-10 (week 13)._

**Status, before any taste theory:** **61 days** since the last Potting
Bench decision (card 21, 10 August) — the **ninth** silent week running.
**PR #3 at 66 days**, still zero human engagement, same one-line unlock
unused. `main` has not moved in **33 days** (since 7 September). Board sits
at **64 cards**, of which roughly 15 are dreamt promotions still undecided.
**One genuine bright spot:** the 4 October Forager run read the GitHub API
directly, based itself on the fullest unmerged board (`dreams/2026-09-26`'s
descendant) instead of `main`'s stale one, and produced three new cards with
**zero duplicates** — the first clean run since the bug was first spotted in
July. One week isn't proof it holds; see §3 and §5.

---

## 1. Kate's taste

_No new Kate decisions for the ninth week running — nothing below is
retested this week. Confidence levels reflect how long each has gone
without a fresh data point, per the decay rule._

### Weave personalisation into content, don't just describe it
- **Confidence:** high. Eleven weeks with no new evidence. Built on cards 2, 7, 17.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Unchanged, same reason.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high. Zero rejections to date across every batch. Card 62
  (Shortest Day, this week) is the cleanest example yet — it reuses an
  existing engine (`/longest-day`) wholesale rather than inventing new
  calculator logic, and still fits the pattern.

### Dreamt scope-additions to already-pitched or already-built cards are the crew's single most reliable move
- **Confidence:** high, historical (6/6 on cards 10, 11, 12, 16, 20, 21).
  Untested since 10 August — fifteen promotions now sit undecided (29, 33,
  34, 37, 41, 42, 45, 46, 51, 55, 56, 60, 61, and this week's 65, 66). Still
  worth leading with on the strength of the record, but the record itself is
  now two months stale.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence: decayed from high to medium.** Still n=1 (PR #1 /
  `ColdSnapNote`), now thirteen weeks with no second data point — past the
  ~8-week decay window this memory is supposed to apply. Not contradicted,
  just no longer safe to call "high" on one old build.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged (card 1's note).

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Independently-converged pitches (2+ blind sources, same gap) deserve priority when decisions resume
- **Confidence:** medium, unchanged in shape. Leaf mould: three-way. Top
  fruit/storage: three fragments (cards 23, 39, 42).

### A repeated commercial mechanic was a process gap, not a taste signal — and it stopped reproducing once the cause was fixed
- **Confidence:** high. The bare-root/order-now family grew to seven cards
  (1, 25, 36, 39, 47, 52, 57) over six weeks of the Forager branching from a
  stale base. This week's run, the first to branch from the correct base,
  produced **zero** further duplicates. Treat the family as closed at seven
  until decisions resume, and treat this as evidence the diagnosis was
  right, not just a complaint.

### Kate acts directly and fast on clear technical bugs, even during a total content-decision freeze
- **Confidence:** low, still n=1 (3 and 7 September). No new episode in 33
  days. Keep tracking, don't fold into "Kate is busy."

### A page can go stale in its own peak season just like an unbuilt card can miss its week — and it's now hit three different layers
- **Confidence:** medium, reconfirmed, not newly evidenced. Card 1 (live,
  stale copy) and card 4 (live, orphaned) are both still unfixed as of the
  6 October SEO report. Card 65 (this week) applies the same lesson a third
  time, pre-emptively, to the still-unbuilt hosepipe-ban family.

### An "all clear" report is only as good as its sampling method — now confirmed a third time, this time by the Dreamer's own direct check
- **Confidence:** high. The Groundskeeper's 5 October report called Sarah
  Raven's links "confirmed OK outright" based on generic search-URL
  samples — but the three specific product links named as dead in July
  (Uchiki Kuri squash, Genovese basil, Champagne rhubarb) were never in that
  sample. Curled directly this week: all three are still live 404s, ten
  weeks on. The report wasn't wrong about what it checked; it checked the
  wrong thing and the wording read as broader than it was.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high in
  principle, untested in practice for 61 days.
- **Dreamt scope-additions to unbuilt or already-live cards get approved.**
  6/6 historically; fifteen more pitched since, none yet tested.
- **Reading the GitHub API directly, not local git or a report's own
  summary line, and defaulting to a mechanical explanation before a
  behavioural one.** Standard Dreamer practice since week 5 — and this week
  the Forager adopted it too, with a clean result. Worth watching whether
  it's now the Forager's habit or a one-off.
- **Report-writing agents are getting more rigorous about checking their
  own history, even while stuck on branches.** The Groundskeeper caught its
  own predecessor's narrower sample in week 11; the SEO Watchdog went
  further this week and named exactly which of its own prior fixes failed
  to land on `main` (0 of 5, itemised in a table) rather than repeating the
  list unchanged. The rigor is improving even though the underlying pipeline
  gap isn't.
- **Independent re-confirmation across separate weekly reports is
  reliable, low-noise evidence — but only when the sample actually includes
  the thing in question.** The Sarah Raven links are dead a tenth week
  running by direct check, not by report say-so.
- **The Night Gardener's repair path applies only to a stale approved PR,
  not one still waiting on its first review.** Confidence: high, unchanged
  — PR #3 is the latter case, working as designed, now at 66 days.

---

## 3. Self-score

Nothing scoreable against an actual Kate decision for a ninth week running
— see `scoreboard.md`. One process hypothesis did get tested: last week's
dream worried that naming "check sibling branches" a fourth time would be
hollow repetition, since a wisdom.md note might never actually reach the
Forager's own run. This week's 4 October run read the API directly and used
the correct base anyway — zero duplicates, the first clean run in thirteen
weeks. Score it as a tentative hit, not a solved problem: one clean week
doesn't prove the habit holds, and next week's run is the real test.

---

## 4. Season note

10 October, UK. British Summer Time ends 25 October (~2 weeks) — the
frost-countdown family (cards 38, 45, 53) is now genuinely time-pressured,
not just evidence-backed. Bare-root/bulb ordering windows (cards 25,
30/52/57, 36, 39, 47) continue narrowing. Leaf mould's setup window (card
28) is live. Card 4 and card 1 both need their fixes spent now, not later —
unfixed as of 6 October. New this week: the hosepipe-ban family (cards 8,
12, 16), approved in high summer, has now sat unbuilt long enough to need
the same tense check — promoted below as card 65.

---

## 5. Open threads

- **URGENT, worsening — 61 days since any Potting Bench decision.**
- **URGENT, worsening — PR #3 at 66 days, confirmed zero human engagement.**
  The PR's own unlock instruction (the HTML comment
  `<!-- potting-bench:approved-to-ship -->`) is unchanged and unused. A
  dozen-plus approved, build-ready cards sit behind it.
- **REFRAMED — the write-to-main bug is now a named mechanism, not a
  mystery, and needs a decision, not another week of flagging.** The SEO
  Watchdog's 6 October report states plainly: "That's by design for this
  routine (I'm told never to touch main myself)" — these routines are
  deliberately barred from pushing to `main`, and nothing else performs the
  merge step on their behalf. It also quantified the cost for the first
  time: 0 of its own last 5 fixes landed. Thirteen weeks of calling this a
  bug may have been slightly wrong — it may be a missing step (a human or
  scripted merge/triage pass) rather than a malfunction. Worth Kate deciding
  which she wants: an automatic merge path, or a standing weekly five-minute
  triage. See this week's dream for the fuller argument.
- **Confirmed, unfixed revenue-loss items, tenth week:** the same three
  Sarah Raven links (Uchiki Kuri squash, Genovese basil, Champagne rhubarb —
  `src/data/varieties.ts`). Each is a one-line URL swap or removal.
- **Card 1 and card 4's SEO fixes (cards 60, 61) remain unfixed**, reconfirmed
  6 October.
- **NEW — cards 8, 12, 16 (the hosepipe-ban family)** have sat unbuilt since
  July into October; promoted below as card 65, the same shape as 21/29/61.
- **NEW — the freshly-pitched Christmas cluster** (card 4 plus this week's
  62, 63, 64) risks the same orphan problem four times over by December
  unless cross-linked as each is built; promoted below as card 66.
- The bare-root family (seven cards) and frost-countdown family (three
  cards) remain undecided, unchanged in size this week.
- Card 24's overlap with 18/21/37 — still undecided.
- The companion-planting playground / ReactGarden overlap — still parked,
  unscheduled. The F1/heirloom affiliate-conflict check — still untested.

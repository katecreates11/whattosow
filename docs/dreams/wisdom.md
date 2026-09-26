# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-09-26 (week 11)._

**A note on this week:** the seventh consecutive week with zero Potting Bench
decisions — 47 days since card 21 (10 August) — and PR #3 has now sat **52
days**, confirmed via the GitHub API to have exactly one comment ever (an
automated Netlify deploy-preview bot notice, not a human), zero reviews,
zero human engagement of any kind. Two things sharpened this week rather
than changed: the "order bare-root now" pitch landed a **sixth** time,
identical in shape to a card still sitting three cards away on the same
board — the cleanest possible proof that the write-to-main bug also blinds
each Forager run to the *previous unmerged* run's pitches, not just to
`main`. And a Groundskeeper "all clear" report turned out to rest on a
lighter sampling method than the week before, missing the three Sarah Raven
links confirmed dead since 10 August — still dead, checked directly in
`varieties.ts` on current `main`. See §5.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. Nine weeks with no new evidence (nothing built or
  freshly approved) — unchanged, not retested. Built on cards 2, 7, 17.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Unchanged, same reason.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high. Zero rejections to date across every batch. Cards
  30/38/53 (frost countdown, now pitched three times), 41, 48 all fit this
  DNA and remain unseen by Kate.

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high, historical (6/6 on cards 10, 11, 12, 16, 20, 21).
  Untested since 10 August — eleven promotions now sit undecided (29, 33,
  34, 37, 41, 42, 45, 46, 51, and this week's 55, 56). Still worth leading
  with on the strength of the record, not fresh confirmation.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged (card 1's note).

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 (PR #1 / `ColdSnapNote`). Eleven weeks now
  with no second data point.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Independently-converged pitches (2+ blind sources, same gap) deserve priority when decisions resume
- **Confidence:** medium, unchanged in shape. Leaf mould: three-way
  (Forager 9 Aug, Forager 16 Aug, SEO Watchdog 1 Sep). Top fruit/storage:
  three fragments (cards 23, 39, 42).

### A repeated commercial mechanic is a process gap, not a taste signal — now demonstrated, not just theorised
- **Confidence:** high this is a process gap (not about Kate at all).
  Last week this was a hunch: five order-now-bare-root pitches (cards 1,
  25, 36, 39, 47) and a proposal to merge them (card 41). This week
  confirmed the mechanism directly: the 20 September Forager run pitched
  "order your bare-root fruit trees now" (its own card 30, recovered below
  as card 52) — **the same idea**, same suppliers, same angle, as card 47,
  pitched by the *previous* Forager run just seven days earlier and still
  sitting unmerged when the 20 September run wrote its own board. The
  pipeline bug doesn't just hide work from `main` — it hides each run's
  pitches from the very next run, guaranteeing repeats. Same shape, same
  week gap, on the frost-countdown mechanic (card 38, now a third instance
  arriving as card 53). Says nothing about Kate's taste; says the recovery
  step needs to check sibling *unmerged* branches, not just `main`, before
  a Forager run starts, not just after a Dreamer run ends.

### NEW — an "all clear" report is only as good as its sampling method, and a method can quietly narrow between weeks
- **Confidence:** high on the single case found, worth carrying forward as
  a standing check. The 14 September Groundskeeper report did a full sweep
  of `varieties.ts` and confirmed three Sarah Raven links (Uchiki Kuri
  squash, Genovese basil, Champagne rhubarb) were genuinely dead. The 21
  September report sampled only 30 of 181 variety pages and 46 (not all)
  Sarah Raven links, found no breaks, and read as "nothing needs fixing
  this week" — but the same three URLs are still sitting dead in
  `src/data/varieties.ts` on current `main`, unchanged, unfixed. The
  report wasn't wrong about what it checked; it just checked less, and
  the summary line didn't say so. This is the same shape of mistake as
  trusting a stale local `git branch -r` in week 5, and the "Bench might
  be broken, unverified" caution from week 10: **verify a specific,
  previously-confirmed finding directly before believing a summary that
  says it's resolved.**

### Kate acts directly and fast on clear technical bugs, even during a total content-decision freeze
- **Confidence:** low, still n=1 (one dated bug-fix episode, 3 and 7
  September). No new episode this week — no commits on `main` since 7
  September, 19 days now. Keep tracking, don't fold into "Kate is busy."

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high, unchanged
  in principle — untested in practice for 47 days.
- **Dreamt scope-additions to unbuilt cards get approved.** 6/6 historically;
  eleven more pitched since, none yet tested.
- **Reading the GitHub API directly (branches, PRs, comments, reviews), not
  local git or a report's own summary line, and defaulting to a mechanical
  explanation before a behavioural one.** Standard practice since week 5;
  this week it caught both PR #3's "1 comment" being a bot, and the
  Groundskeeper's narrower sample.
- **Independent re-confirmation across separate weekly reports is reliable,
  low-noise evidence — but only when actually re-checked, not assumed.**
  The Sarah Raven links are dead a **seventh** week running (10, 17, 24, 31
  August, 7, 14, 21 September) once checked directly against `main`; the 21
  September report's own text would have said otherwise.
- **An agent that reads every stuck sibling branch before writing, and
  reconciles rather than adds on top, recovers cleanly.** Set by the 6
  September Forager run; not held to by the 20 September run, which is why
  card 52 repeats card 47. Worth restating as the standard every week, not
  assuming it will hold once it's held once.
- **Checking a fresh finding against what `CUT_LIST.md` already flags as
  pending is a good filter for what's decision-ready.** Card 51 (variety-page
  duplication) is the clean example; still undecided.
- **The Night Gardener's repair path applies only to a stale approved PR,
  not one still waiting on its first review.** Confidence: high, unchanged
  — PR #3 is the latter case, working as designed, now extremely slow: 52
  days and counting with confirmed-zero human engagement.

---

## 3. Self-score

Nothing scoreable for a seventh week running against an actual Kate
decision — see `scoreboard.md`. Eleven dreamt promotions (29, 33, 34, 37,
41, 42, 45, 46, 51, 55, 56) now sit undecided. The 6/6 record on "dreamt
scope-addition gets approved" (cards 10–21) stands as a track record, not a
live streak, until the Bench reopens. Week 9's "split the ask in two" idea
(lead with just PR #3, not the whole backlog) got no test again — still no
Bench activity of any kind to test it against, not a failure of the idea.

---

## 4. Season note

26 September, UK. Malvern's giant-pumpkin weekend (25–27 September) has now
happened — card 18/21/37's anchor is spent, and on current form (PR #3 still
the only thing queued, still untouched) it did not ship in time. Card 46's
"if it can't beat Malvern, use card 21's honest fallback" framing is no
longer a hedge; it's the fact of what happened. British Summer Time ends 25
October (~4 weeks) — cards 30/38/53 (frost countdown, now three separate
pitches), 43 (The Dark Half) all cluster here; card 45 already proposed
pairing them. Bare-root/bulb ordering windows (cards 25, 36, 39, 47, 52)
continue narrowing toward winter price rises, now six pitches for the same
mechanic. Leaf mould's setup window (before leaves fall, so now through
October) is live.

---

## 5. Open threads

- **URGENT, worsening — 47 days since any Potting Bench decision** (card 21,
  10 August), the seventh fully silent week running.
- **URGENT, worsening — PR #3 (the Glut-o-meter) has now gone 52 days with
  confirmed zero human engagement** (checked directly: one automated Netlify
  bot comment, zero reviews, zero human comments). `mergeable_state` is
  still `clean` against current `main` — it would merge without conflict
  today. Eleven-plus approved, build-ready cards are frozen behind it.
- **Still unconfirmed after six weeks of assuming it: does `/bench` actually
  load, show PR #3, and accept a decision?** Raised week 10, not checked
  this week either (outside this routine's tool access) — still worth
  someone's two minutes, since it would explain all 47 days at once if the
  answer is no.
- **URGENT, unresolved, now ~11 weeks old — the write-to-main bug.**
  `docs/reports/` on `main` has still never once received a Groundskeeper or
  SEO Watchdog report. The SEO Watchdog's own 22 September report counted:
  twelve of its own reports in a row, unmerged, `main` 15 days stale at the
  time of writing. It re-verified its carried-forward findings line-by-line
  against current code rather than re-asserting them — all unchanged, which
  is itself the evidence nothing has reached Kate, not that fixes were
  declined.
- **Confirmed, unfixed revenue-loss items:** the same three Sarah Raven
  links, dead a seventh week running (see §1's new entry on the 21
  September report's narrower sampling). The Amazon soaker-hose ASIN
  (`B000TAFENY`) 404'd once on 21 September, cleared on two immediate
  retries — treated as a flake, not broken, worth only a glance if it
  recurs.
- **The bare-root/order-now family has grown to six pitches** (cards 1
  [live], 25, 36, 39, 47, and this week's 52) plus one proposed index (41)
  — now with a same-idea repeat one week apart as direct proof it's a
  process gap. See §1.
- **The frost-countdown mechanic has grown to three pitches** (card 38,
  card 45's proposed pairing with 43, and this week's 53, "The Last
  Weekend") — same pattern as the bare-root family, one process gap wearing
  two costumes.
- **SEO Watchdog's 22 September report, new findings worth a look when
  reachable:** `/kit`, `/my-plot`, `/my-garden`, `/lucky-dip` are dead
  route files (permanently redirected before they can render) still
  shipping full metadata nobody will ever crawl — pure housekeeping, no
  indexing risk. `/guides` and `/crops` hub pages have an H1 that doesn't
  match their own title/meta. Meta-description-length problem is bigger
  than previously scoped: site-wide (34 of 58 static pages), not just
  `/guides`. `/sow/september` still shows no evidence of indexing while
  it's the current month — the highest-priority request-indexing item.
- **Card 24** (vegetable-show piece) still flagged as possibly overlapping
  card 18/21/37's scope — undecided.
- The companion-planting playground / ReactGarden overlap — still parked,
  unscheduled. The F1/heirloom affiliate-conflict check — still untested.

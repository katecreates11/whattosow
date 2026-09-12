# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-09-12 (week 9)._

**A note on this week:** this dream had four weeks to catch up on, not one.
The write-to-main bug that's hit the Forager, Groundskeeper and SEO Watchdog
since July hit **the Dreamer itself** for three cycles running — `dreams/
2026-08-22`, `-08-29` and `-09-05` all branched from the same stale `main`
(the 15 August merge) and none was ever merged, so each restated the last
one's content from scratch instead of building on it. This dream reads all
three, plus the 6 September Forager run (which had already done the heavy
reconciliation work itself — see §2), and lands everything in one pass.
The headline underneath all of it hasn't changed in a month: the Potting
Bench has made **zero decisions since card 21 on 10 August** — 33 days now
— while PR #3 has sat with **zero reviews for 38 days**. But there is one
piece of real news: Kate fixed the stale-cache bug herself, directly, on 3
and 7 September, while leaving the content backlog completely untouched.
See §1 and §5.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. No new evidence in five weeks — nothing built,
  nothing freshly approved. Unchanged, not tested; still the single
  best-supported rule in this file (cards 2, 7, 17 built or approved on it).

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Unchanged for five weeks, same reason.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high, unchanged. Zero rejections to date across every
  batch. Cards 30/38, 41, 43, 45 all fit the same DNA and are still unseen
  by Kate.

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high, unchanged. Still six for six on anything actually
  decided (cards 10, 11, 12, 16, 20, 21) — no new test this cycle, since
  every dreamt promotion since card 21 (29, 33, 34, 37, 41, 42, and now 45,
  46) remains undecided. Still worth leading with once decisions resume;
  this dream keeps using the move on the strength of that record, not on
  fresh confirmation.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 (PR #1 / `ColdSnapNote`). Six weeks now
  with no second data point — the 13–21 batch remains entirely unbuilt, and
  PR #3, the one thing that has shipped, has had no review to test a note
  against.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Independently-converged pitches (2+ blind sources, same gap) deserve priority when decisions resume
- **Confidence:** medium, strengthening slowly. Leaf mould is now a
  **three-way** blind convergence (Forager 9 Aug, Forager 16 Aug, SEO
  Watchdog 1 Sep — cards 28/32). Green tomatoes: two (Forager 23 Aug, SEO
  Watchdog 1 Sep — card 35). Frost-countdown: two (Forager 16 and 30 Aug —
  cards 30/38). Top fruit/storage: three fragments now (card 23's ripeness
  test, card 39's bare-root trees, the Watchdog's storage gap folded into
  card 42) — a whole under-served category converged on independently, not
  just one idea. Still untested against an actual Kate decision, so held at
  medium, not high — but the pattern itself is now well past coincidence.

### NEW: Kate acts directly and fast on clear technical bugs, even during a total content-decision freeze
- **Confidence:** low, n=1, but concrete and worth tracking rather than
  folding into "Kate is busy/away."
- **Evidence:** the stale-cache bug the Groundskeeper first flagged on 24
  August sat unfixed through three of this dream's own stuck cycles. On 3
  September Kate committed the actual fix herself, directly to `main`
  (`feat: add shared UK seasonal clock`, `fix: keep homepage and sow list
  in season`, `fix: refresh public seasonal routes hourly`), and on 7
  September extended it to two more frozen pages with a Claude Code
  session's help. None of this went through the Potting Bench, none of it
  is a "bench:" commit, and it happened in the exact same five-week window
  the Bench recorded zero content decisions. This matters because it rules
  out the simplest explanation for the silence (Kate has had no time for
  the repo at all) — she was in it, twice, fixing something specific. What
  it doesn't yet tell us is why the content backlog gets a different
  response than a technical bug; worth watching for a second data point
  before drawing a rule from it.

### RETIRED: "Kate wants real photography and video, said twice"
Already retired at week 8, past the ~8-week decay point with no supporting
signal since July. Confirmed gone, not restated as a rule this week.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high, unchanged.
- **Dreamt scope-additions to unbuilt cards get approved.** See §1 — 6/6
  historically, several more pitched since, none yet tested.
- **Reading the GitHub API directly (branches, PRs), not local git, and
  defaulting to a mechanical explanation before a behavioural one.**
  Confidence: high, standard practice for this routine since week 5.
- **Independent re-confirmation across separate weekly reports is reliable,
  low-noise evidence.** The same three Sarah Raven links have now been
  independently re-checked and re-confirmed dead **five** separate weeks
  running (10, 17, 24, 31 August, 7 September) by the same routine reading
  the live site fresh each time.
- **NEW — an agent that reads every stuck sibling branch before writing,
  and reconciles them into one clean board rather than adding on top,
  recovers cleanly from this bug with no further loss.** The 6 September
  Forager run found `main` three commits and 27 cards behind reality, read
  all six stuck branches directly (three Forager, two Dreamer, and used the
  Groundskeeper/SEO context already in wisdom.md), and wrote one reconciled
  44-card board rather than adding a seventh divergent copy — flagging its
  own two likely duplicates (cards 32/28, 38/30) instead of silently
  merging or silently duplicating them again. This is the first time in
  eight weeks a stuck-branch cycle didn't cost the crew a fresh
  reconciliation tax. Worth naming as the standard every recovery (including
  this dream's own) should now be held to.
- **NEW — restraint is itself a signal worth keeping.** The same 6
  September run checked four fresh angles against the site's actual content
  and against `CUT_LIST.md`, found each either already covered or too close
  to parked ground (card 15), and pitched two cards instead of padding to
  five. No Kate verdict exists on this yet, but it's exactly the kind of
  self-correction this memory exists to notice and reinforce.
- **The Night Gardener's repair path applies only to a *stale approved* PR,
  not one still waiting on its first review.** Confidence: high, unchanged
  — PR #3 is the latter case, working as designed, just now extremely slow.

---

## 3. Self-score

Nothing scoreable for a fifth week running against an actual Kate decision
— see scoreboard.md. Six dreamt promotions (cards 29, 33, 34, 37, 41, 42)
sit undecided across four weeks; two more (45, 46) added this week. The
run of six straight correct "dreamt scope-addition gets approved" calls
(cards 10–21) is unbroken but also untested since 10 August — it is a
track record, not a live streak right now. When the Bench reopens, all of
this resolves in one batch rather than one at a time; scoring it honestly
will mean judging roughly eight promotions at once, not eight separate
weekly tests.

---

## 4. Season note

12 September, UK. Malvern Autumn Show's giant-veg championship and
giant-pumpkin weekend (25–27 September) are **13 days out** — card
18/21/37's anchor, still unbuilt, on current form very unlikely to ship in
time (see card 46, promoted this week). The allium leaf miner/leek moth
window (card 34) has been open since late August. Leaf fall proper begins
within weeks (cards 28/32). Bare-root tree/bulb ordering windows (cards 25,
36, 39, 41) are open and narrowing toward winter price rises. British
Summer Time ends 25 October — the same date `frost.ts` uses as its baseline
first-autumn-frost estimate, which is what connects cards 30/38 and 43 (see
card 45). No fresher drought/hosepipe figure than 25 August exists in
anything read since, so none is restated.

---

## 5. Open threads

- **RESOLVED THIS WEEK — three stuck Dreamer branches, now landed.** The
  08-22, 08-29 and 09-05 dream branches are folded into this one. Going
  forward, if a future dream branch is still unmerged when the next one
  starts, that dream should do what the 6 September Forager run did: read
  the stuck branch directly and reconcile, rather than restate.
- **URGENT, unresolved — the write-to-main bug is now roughly nine weeks
  old.** Confirmed again this week on three more branches (`ideas/
  weekly-2026-09-06`, `groundskeeper/2026-09-07`, `seo/2026-09-08`), all
  found only via the GitHub API. `docs/reports/` on `main` has still never
  once received a Groundskeeper or SEO Watchdog report — ten SEO Watchdog
  reports and eight Groundskeeper reports now, all sitting on their own
  branches. An old, abandoned fix attempt (`chore/forager-writes-board-to-
  main`, last touched 12 July) is too stale to revive as a diff, though the
  intent might still be worth someone's time.
- **URGENT, worsening — PR #3 (the Glut-o-meter) has now gone 38 days with
  zero activity of any kind** (opened 5 August; confirmed via the GitHub
  API that no comment, review, or commit has touched it since — only a
  Netlify bot deploy-preview comment exists). Eleven-plus approved,
  build-ready cards are frozen behind it. Given §1's new finding that Kate
  has been active in the repo throughout this exact window (just not here),
  the ask is more reachable than ever, not less: a five-word verdict —
  merge it, or say what's wrong — unblocks everything behind it at once.
- **The homepage/`/sow` stale-cache bug is very likely fixed in code, not
  just quiet.** Unlike the false alarm at week 8 (a TTL that looked fixed
  but wasn't), this time there's a real code change behind it: Kate's own
  3 September commits added `export const revalidate` via a shared
  seasonal-clock helper to the routes that lacked it, and a 7 September
  follow-up caught two more pages the first pass missed. The 7 September
  Groundskeeper report still showed the old symptom, but it was checked
  against `main`@`7ba73e0` — a commit that predates the fix — so it isn't
  evidence the fix failed, just evidence the branch was stale. Worth a live
  spot-check next week rather than assuming either way.
- **Four confirmed, unfixed revenue-loss items, all cheap.** The same three
  Sarah Raven links (Uchiki Kuri squash, Genovese basil, Champagne rhubarb)
  are dead a fifth week running. The Amazon soaker-hose ASIN
  (`B000TAFENY`) has been dead since 24 August. All four are URL/ASIN
  swaps, not design or spec work.
- **The SEO Watchdog's 8 September report carries the same short, cheap fix
  list it's carried for weeks:** `/privacy` missing from the sitemap
  (one line), `/grow-your-christmas-dinner` still a true orphan with zero
  internal links (and the season for it is opening now — this specific
  finding gets more expensive the longer it waits), and a batch title/
  description trim across ~26–28 `/guides` pages. None of it is urgent-
  broken; all of it is still true and now ten weeks unactioned.
- **Two duplicate pairs need one steer each, not a rebuild of either:**
  cards 28/32 (leaf mould, now a three-way convergence) and cards 30/38
  (frost countdown). Card 45 (this week) notes 30/38 and 43 share the same
  25 October anchor regardless of which duplicate Kate picks.
- Card 24 (the vegetable-show piece) still flagged as possibly overlapping
  card 18/21's giant-veg tool scope — still undecided.
- The companion-planting playground / ReactGarden overlap — still parked,
  still unscheduled.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.

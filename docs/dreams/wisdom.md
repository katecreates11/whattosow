# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-09-05 (week 8)._

**A note on this week:** the third fully silent decision week running (26
days since card 21, the last decision, on 10 August). Both prior dream
branches (08-22, 08-29) were still unmerged when this one started, so this
run restated their content before adding anything new — the same tax as
last week, now paid three times. The write-to-main bug produced its
**third** confirmed duplicate pitch (a frost-countdown feature, pitched
independently on 16 and 30 August). PR #3 has gone 31 days with zero
comments of any kind. Full detail in §5; kept tight everywhere else this
week since most of it is confirmation, not new discovery.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. Four weeks with no new evidence either way — nothing built, nothing approved. Unchanged, not tested.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Four weeks unchanged.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 (PR #1 / `ColdSnapNote`). Untested at scale — the 13–21 batch remains entirely unbuilt, and PR #3 (the one build that has shipped since) still hasn't had a single review, 31 days now.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high, unchanged. Zero rejections to date. Two more candidates recovered this week (cards 30/38, 40) fit the same DNA, unseen by Kate yet.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high, unchanged. Still six for six (cards 10, 11, 12, 16, 20, 21) — no new test this week, since cards 29, 33, 34, 37 (all dreamt promotions, all still undecided) haven't reached Kate. Two more added this week (41, 42). Still the crew's best-performing move, worth leading with once decisions resume.

### NEW: independently-converged pitches (2+ blind sources, same gap) deserve priority when decisions resume
- **Confidence:** medium, on a clean and now-repeated pattern rather than a single instance.
- **Evidence:** leaf mould pitched blind by three separate sources (Forager 9 Aug, Forager 16 Aug, SEO Watchdog 1 Sep — cards 28/32). Green tomatoes pitched blind by two (Forager 23 Aug, SEO Watchdog 1 Sep — card 35). Frost-countdown pitched blind by two (Forager 16 and 30 Aug — cards 30/38). None of these agents could see each other's work, so the overlap isn't copying — it's three different reads of real UK search/seasonal behaviour landing in the same place. Not yet tested against an actual Kate decision (nothing has been decided in three weeks), so held at medium, not high.

### RETIRED: "Kate wants real photography and video, said twice"
Said twice, back in July; no supporting signal since, well past the ~8-week decay point. Dropped entirely rather than carried in Open Threads — if it resurfaces, treat it as new evidence, not a revival of an old rule.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high, unchanged.
- **Dreamt scope-additions to unbuilt cards get approved.** See §1 — 6/6, two more pitched this week.
- **Evidence-required cards with a named, current commercial/seasonal window get approved fast.** Confidence: high, untested for a month — the pipeline's been stalled since 10 August (see §5).
- **A build that follows a specific approval note exactly gets kept, not reverted.** Confidence: medium, still n=1 (PR #1).
- **The Night Gardener's repair path applies only to a *stale approved* PR, not one still waiting on its first review.** Confidence: high, unchanged — PR #3 is the latter case, working as designed, just now extremely slow.
- **Reading the GitHub API directly (branches, PRs) rather than local git, and checking mechanically before assuming a behavioural cause, are both now standard practice for this routine** — settled over five weeks of clean tests, no longer worth a fresh bullet each week. This week the mechanical check came back clean for once: the silence really is Kate's, not a hidden branch (see §5).
- **Independent re-confirmation across separate weekly Groundskeeper/SEO reports is reliable, low-noise evidence.** Confidence: high now — the same three Sarah Raven links have been independently re-checked and re-confirmed dead four separate weeks running (10, 17, 24, 31 August) by the same routine reading the live site fresh each time.

---

## 3. Self-score (against the 2026-08-29 dream)

Nothing scoreable, for the third week running. Cards 29, 33, 34 (promoted 15/22 August) and 37 (promoted 29 August) are all still undecided — no Potting Bench cycle has happened since 10 August for any prediction to land in. Fifth quiet-for-scoring week of eight (see scoreboard.md). Not scored as misses: there is nothing to be wrong about yet. Worth flagging once, plainly: whenever the Bench reopens, four dreamt promotions plus the Forager's own cards 22–40 will all resolve at once — a real backlog to score, not a string of small tests.

---

## 4. Season note

5 September, UK. Malvern Autumn Show's giant-veg championship and
giant-pumpkin weekend (25–27 September) are three weeks out — card 18/21,
still unbuilt. The allium leaf miner/leek moth danger window (card 34) is
open now, not approaching. Leaf fall proper begins within weeks (cards
28/32). Bare-root tree/bulb ordering windows (cards 25, 36, 39, and the
new index idea, card 41) are open and narrowing toward winter price rises.
Card 23 (apple ripeness) and the newly-folded card 42 (apple/pear storage)
sit in a live RHS harvest window right now. No fresher drought figure than
25 August exists in anything read this week, so none is restated here.

---

## 5. Open threads

- **URGENT — the write-to-main bug is now roughly eight weeks old, still unresolved, and has caused a third confirmed duplicate pitch.** Six branches now sit stuck and unreconciled: three Forager runs (16, 23, 30 August), two Groundskeeper reports (24, 31 August) and one SEO Watchdog report (1 September) — `docs/reports/` on `main` has still never once received one. New this week: the 30 August Forager run independently pitched a frost-countdown feature that duplicates card 30 from two weeks earlier (after leaf-mould and Halloween-pumpkin duplicated in the two weeks before that). Treat every 1–2 week gap in this bug being fixed as costing at least one duplicate pitch going forward, not just delay. An old, abandoned fix attempt still sits on `chore/forager-writes-board-to-main`, diverged too far from current `main` to use as-is — reviving the *intent*, not the diff, may be worth someone's time.
- **URGENT — PR #3 (the Glut-o-meter) has now gone 31 days with zero activity of any kind** (opened 5 August; `updated_at` still equals `created_at`). Eleven approved, build-ready cards (13, 14, 16, 17, 18, 19, 20, 21, 29, 33, 34, 37) are frozen behind it. This is the single highest-leverage open item: a five-word verdict (merge it, or say what's wrong) unblocks more work than anything else on this list.
- **The homepage's stale-cache bug looks fixed but probably isn't.** Found stale on 24 August, found correct on 31 August, but a direct code check this week found no `revalidate` export added to any of the affected routes in between — the most likely explanation is the cache's own TTL simply expired, not that anyone fixed the underlying ISR/revalidation gap. Expect it to drift stale again on its own schedule; worth a real fix, not just a lucky re-check.
- **Four confirmed, unfixed revenue-loss items, all cheap.** The same three Sarah Raven links (Uchiki Kuri squash, Genovese basil, Champagne rhubarb) are dead a fourth week running (10, 17, 24, 31 Aug). The Amazon soaker-hose ASIN (`B000TAFENY`, used in three components) is dead a second week. All four are URL/ASIN swaps, not design or spec work — the cheapest fix on the whole list, still sitting on an unmerged Groundskeeper branch.
- **This week's SEO Watchdog report (1 September) carries a one-line sitemap fix (`/privacy` missing) and two orphan pages worth linking** (`/grow-your-christmas-dinner`, seasonally live right now; `/still-time`, already scheduled for retirement on `CUT_LIST.md` — don't spend new links on a page that's leaving), plus a batch title/description trim across 29 `/guides` pages. Worth a direct look rather than summary-by-summary relay here.
- **Fact, not a theory: Kate's last recorded repo action was merging the 15 August dream branch, on 18 August.** Three consecutive fully-silent decision weeks now (22, 29 August, 5 September). The mechanical check (branches, API) came back clean this week — there is no hidden bug explaining this particular silence, just logged plainly per the "check mechanical first" habit in §2.
- Card 24 (the vegetable-show piece) still flagged as possibly overlapping card 18/21's giant-veg tool scope — still undecided.
- The companion-planting playground / ReactGarden overlap — still parked, still unscheduled.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.
- Card 38/30 (frost-countdown, duplicated) and card 23/13/42 (top-fruit, now three-way split) both need a single steer from Kate on which version to build — flagged, not resolved, in this week's board additions.

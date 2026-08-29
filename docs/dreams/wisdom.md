# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-08-29 (week 7)._

**A note on this week:** the second fully silent decision week running, and
the third since any Potting Bench decision at all (the last was card 21, 10
August). Last week's dream (`dreams/2026-08-22`) was never merged either —
so its recovered cards (30–34) sat off the real board for a full week on top
of everything else, and this branch has to restate them before adding
anything new. The write-to-main bug produced its second confirmed duplicate
pitch: the 16 and 23 August Forager runs independently pitched the same
Halloween-pumpkin-timing idea, on top of the leaf-mould duplicate from two
weeks ago. And the 24 August Groundskeeper report found a genuinely new kind
of problem — not a backlog item but a live one: the homepage and several
core routes have been serving a stale, days-old date to every visitor. See
§5 for all of it; kept tight this week, since most of this is confirmation,
not new discovery.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high. Three weeks with no new evidence either way —
  nothing built, nothing approved. Unchanged, not tested.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high. Three weeks unchanged.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 (PR #1 / `ColdSnapNote`). Still untested at
  scale — the 13–21 batch remains entirely unbuilt, and the one build that
  has shipped since (PR #3) still hasn't been reviewed at all, 24 days now.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium, unchanged.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high, unchanged. Zero rejections to date. No new candidate
  this week (the 23 August run pitched content and monetisation only).

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high, unchanged.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high, unchanged. Still six for six (cards 10, 11, 12, 16,
  20, 21) — no new test this week, since none of cards 29, 33 or 34 (all
  dreamt promotions, all still undecided) have reached Kate yet. Still the
  crew's best-performing move, still worth leading with once decisions
  resume.

### RETIRED from active tracking: Kate wants real photography and video
Said twice, back in July; no supporting signal since, now well past the
~8-week decay point flagged last two weeks running. Moved to Open Threads
(§5) rather than carried as a live rule — not contradicted, just gone quiet
long enough that weighing it further isn't earning its place here.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high, unchanged.
- **Dreamt scope-additions to unbuilt cards get approved.** See §1 — 6/6.
- **Evidence-required cards with a named, current commercial/seasonal
  window get approved fast.** Confidence: high, untested this week — the
  pipeline's been stalled a month now (see §5).
- **A build that follows a specific approval note exactly gets kept, not
  reverted.** Confidence: medium, still n=1 (PR #1).
- **The Night Gardener's repair path applies only to a *stale approved* PR,
  not one still waiting on its first review.** Confidence: high, unchanged
  — PR #3 is the latter case, working as designed, just very slow.
- **Querying the GitHub API directly (`list_branches`, `list_pull_requests`)
  finds work local `git branch -r` misses entirely.** Confidence: high,
  confirmed a fourth week running — this week it's what surfaced
  `ideas/weekly-2026-08-23`, `groundskeeper/2026-08-24`, `seo/2026-08-25`
  and PR #3's now-24-day wait. Settled: this is the real STEP 1, not worth
  re-litigating weekly any further.
- **When a week looks quiet, check for a mechanical cause before a
  behavioural one.** Confidence: high — two clean tests, two wins (both
  retired; see the 8 Aug and 15 Aug dreams for the detail, not repeated
  here). This week's silence has no plumbing bug left to explain it — logged
  as fact in §5, still not spun into a theory.
- **Independent re-confirmation across separate weekly Groundskeeper/SEO
  Watchdog reports is reliable, low-noise evidence.** New this week,
  confidence medium on one clean pattern: the same three dead Sarah Raven
  links have now been independently re-checked and re-confirmed dead three
  separate weeks running (10, 17, 24 Aug) by the same routine reading the
  live site fresh each time — worth trusting a repeated finding like this
  without further verification before acting on it.

---

## 3. Self-score (against the 2026-08-22 dream)

Nothing scoreable, for the second week running. Card 29 (promoted 15
August) and cards 33–34 (promoted 22 August) are all still undecided — not
one has reached a live Potting Bench yet, since even last week's dream
branch stayed unmerged. Not scored as misses: there has been no decision
cycle at all for anything to land in. Fourth quiet-for-scoring week out of
seven (see scoreboard.md). Worth flagging plainly rather than restating
weekly: with three weeks since the last real decision and now two dream
branches queued unmerged, self-scoring is stalled on the same bottleneck as
everything else — there will be a genuine backlog to score all at once
whenever the Bench is next opened.

---

## 4. Season note

29 August, UK. Drought and hosepipe restrictions remain unresolved and
undated (nine water companies, 71.3%+ of England, 27m+ people, per the 25
August SEO Watchdog report) — cards 12/16 more overdue by the week, still
approved, still unbuilt. Malvern Autumn Show's giant-veg championship and
giant-pumpkin weekend (25–27 September) are now about four weeks out —
card 18/21's anchor, sharpened this week by a small scope-addition below.
The allium leaf miner/leek moth autumn danger window opens within days
(card 34, promoted last week, still unbuilt) — currently the single
most time-critical item sitting on the board. RHS's September top-fruit
harvest window (card 23, apples — still only *proposed*, not approved) has
now opened. National Allotments Week (card 9/29) closed weeks ago, still
unbuilt.

---

## 5. Open threads

- **URGENT — the write-to-main bug is now roughly seven weeks old and still
  unresolved**, and its cost keeps compounding rather than staying flat.
  Three more stuck branches this week alone (`ideas/weekly-2026-08-23`,
  `groundskeeper/2026-08-24`, `seo/2026-08-25`) — `docs/reports/` on `main`
  has still never once received a Groundskeeper or SEO Watchdog report in
  this project's history. New this week: a **second** confirmed duplicate
  pitch. The 16 and 23 August Forager runs independently pitched the same
  Halloween-pumpkin-timing idea (each blind to the other, and both blind to
  cards already stuck on other branches) — on top of the leaf-mould
  duplicate found two weeks ago. At this point, assume every 1–2 week gap
  in this bug being fixed costs at least one duplicate pitch, not just
  delay. There's an old, abandoned attempt at a fix sitting on
  `chore/forager-writes-board-to-main`, but it branched from very early
  July and has diverged too far from current `main` to be usable as-is —
  flagging its existence rather than its content, in case reviving the
  intent (not the diff) is worth someone's time.
- **URGENT, NEW — the live site is serving stale content to real visitors,
  not just an internal backlog problem.** The 24 August Groundskeeper report
  found the homepage and several core routes (`/`, `/sow`, `/calendar`,
  `/blight-watch`, `/harvest`, `/grow`) all serving a date computed 18–19
  August to every visitor, days stale even at the time of that check —
  despite `/blight-watch` being declared `changeFrequency: daily` in the
  sitemap. This directly undercuts the site's core promise ("know exactly
  what to plant, right now") for anyone visiting today, not a future
  reader. Looks like an ISR/cache-revalidation config issue, not a broken
  link — worth someone's eyes before the next content push, since it will
  keep silently drifting regardless of what else gets merged.
- **URGENT — PR #3 (the Glut-o-meter) has now waited 24 days for a first
  review** (opened 5 August), still zero reviews, zero substantive comments.
  Working as designed, not stuck — but nine-plus approved, build-ready
  cards are frozen behind it, and the wait itself keeps growing.
- **Two confirmed, unfixed revenue-loss items from the 24 August
  Groundskeeper report.** The same three Sarah Raven links (Uchiki Kuri
  squash, Genovese basil, Champagne rhubarb) are dead a third week running
  (10, 17, 24 Aug) — a real fix that's the cheapest thing on this whole
  list, three URL corrections. New this week: one dead Amazon soaker-hose
  ASIN (`B000TAFENY`) hardcoded in three places (`BlightKit.tsx`,
  `BlightMap.tsx`, `guides/watering-while-away`) — one bad ASIN, three lost
  surfaces.
- **The SEO Watchdog's 25 August report says its own reporting failure now
  matters more than any individual finding** — its 8th consecutive week
  landing on an unmerged branch, all 11 FIX NOW items unchanged and
  independently re-verified again. Two items worth naming directly: the
  `/sow-in/worcester` title is now visibly showing "June 2026" in a live
  Google snippet, drifting a further month stale every month `main` doesn't
  rebuild the route; and it independently flagged the same spring-bulb gap
  already sitting as card 25 on the board, cross-confirming rather than
  duplicating it.
- **Fact, not a theory: Kate's only recorded repo action in the last three
  weeks was merging the 15 August dream branch, on 18 August — nothing
  since.** Two consecutive fully-silent decision weeks now (22, 29 August).
  Not turned into a taste rule; logged plainly for whoever reads this next,
  per the "check mechanical first" habit in §2 — there's no plumbing bug
  left to blame for this particular silence.
- Card 24 (the vegetable-show piece) still flagged as possibly overlapping
  card 18/21's giant-veg tool scope — still undecided, worth Kate's steer
  whenever she's back at the Bench.
- Photo/video ask — retired from §1 this week, see there.
- The companion-planting playground / ReactGarden overlap — still parked,
  still unscheduled.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.

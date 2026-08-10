# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-08-08 (week 4)._

**A note on this week:** the loudest week yet, and it answers last week's
biggest open question. Kate spent 27–31 July not at the bench but building
the fix herself — teaching the Night Gardener to repair a stale approved PR
instead of leaving it stuck open — then shipped PR #2 (15 days late) on 4
August and, once the plumbing worked, cleared almost the entire backlog in
two sittings on 4–5 August: seven approved, one parked. Last week's
"growing pile suppresses decisions" hypothesis is retired — wrong. The real
cause was Kate's attention going to infrastructure, not board fatigue. See
§5 for what that backlog clearing now sets up.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Confidence:** high (now proven, not just pitched).
- **Evidence:** "Sow now, eat all winter" (frost tie-in, built) and "Why your
  seeds won't come up" (heat tie-in, approved) already made this the crew's
  best rule. This week two more: card 16 (make the hosepipe piece
  postcode-aware) approved outright, and card 17's approval note — "focus on
  making this a visual experience alongside the personalisation" — asked for
  it unprompted, again.

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** high (raised from medium).
- **Evidence:** the Glut-o-meter's "weighing your harvest up" note is now
  joined by two more: card 17 approved with "make this a visual experience";
  card 18 (giant veg) approved with "work on making this look good." Three
  different features, three unprompted visual asks — as trustworthy now as
  the personalisation rule.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high, still n=1 build (PR #1 / `ColdSnapNote`). Untested
  again this week — none of this batch (13, 16, 17, 18, 19, 20) has been
  built yet; they're queued one-at-a-time behind a single Night Gardener PR
  (see §5).

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** medium (down from high). Cards 14 (green-manure picker,
  seed links already on the target page) and 20 (potato section) were both
  approved with no revenue note, where the rule would have predicted one.
  Still holds as "sometimes," just less reliably than previously recorded.

### Kate wants real photography and video, said twice
- **Confidence:** low (downgraded, as flagged last week it would be if
  untested again). Four-plus weeks and eight further decisions since the
  last mention (cards 9, 10, mid-July), including cards where it would have
  fit naturally (card 18 asks for the giant-veg tool to "look good" but
  doesn't mention photos). Not contradicted — just stop weighting it until
  it's tested again.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** high (raised from medium). Five approved on this DNA now:
  Glut-o-meter, Every Drop, the green-manure picker (14), the catch-crop
  finder (17), the giant-veg tool (18). Zero rejections of a
  calculator-shaped pitch to date.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. Evidence unchanged (parked veg seed-saving, card 3).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high. New instance: card 15 (chilli overwintering) parked
  this week with no note attached — consistent with the pattern, though
  genuinely ambiguous without a note this time.

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. Evidence unchanged (PR #1).

### Dreamt scope-additions to already-pitched cards are the crew's single most reliable move
- **Confidence:** high (raised — this was a "what works" note last week,
  now confident enough to count as taste).
- **Evidence:** five for five — cards 10, 11, 12, 16 and 20 are all dreamt
  cards or dreamt scope-additions, and every one has been approved, no
  exceptions. A better hit rate than the Forager's own fresh pitches.
  Folding new evidence into an existing, unbuilt card — rather than starting
  a new one — is worth leaning into further.

### RETIRED: "a growing unreviewed pile suppresses decisions"
Held low-confidence last week as a hypothesis. This week refutes it: the
pile reached its largest point yet (eight cards) and Kate cleared seven of
them plus one park in two days once she returned to the bench. The simpler
explanation: she'd spent the prior week building the fix for the *other*
pipeline problem (stuck PRs) instead of doing board triage, then came back
and worked through everything in one sitting. Pile size isn't the variable;
her calendar is. Not carried forward.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: high (raised
  from medium-high) — proven at volume this week, eight decisions in two
  days through the same UI.
- **Dreamt scope-additions to unbuilt cards get approved.** See §1 — 5/5.
- **Evidence-required cards with a named, current commercial/seasonal
  window get approved fast.** Confidence: high, unchanged — six of six this
  batch (13, 14, 16, 17, 18, 19) had dated, named evidence and were all
  approved.
- **A build that follows a specific approval note exactly gets kept, not
  reverted.** Confidence: medium, still n=1 (PR #1) — none of this week's
  seven newly-approved cards have been built yet, so this remains the
  crew's biggest untested-at-scale claim.
- **A stuck PR now has a real repair path instead of sitting open
  indefinitely.** New this week — Kate taught the Night Gardener
  (`docs/agents/night-gardener.md`) to detect an approved-but-unmerged PR,
  repair it against current `main`, rerun the full gate, and merge, rather
  than leaving it for a human rescue. Kate shipped PR #2 herself this time;
  the mechanism is written down but not yet proven under an agent's own
  hand.

---

## 3. Self-score (against the 2026-08-01 dream)

One clean, scoreable prediction: card 20 (fold the Watchdog's "when to lift
maincrop potatoes" finding into card 13's storage guide) was promoted as a
dreamt scope-addition and approved 4 August, exactly as predicted.
**1/1 correct.**

Bonus, unscored: cards 17–19 were recovered from a stuck branch rather than
predicted, and all three were also approved (17, 18 with notes; 19
plainly) — not a prediction hit, but confirms recovering stuck runs
unedited continues to be the right call rather than editing or re-ranking
them.

The Glut-o-meter's "still pending" call is now four weeks unscored —
approved 11 July, still not built. Retiring it as an active weekly
prediction; tracking it under §5 instead so it stops padding the scoreboard
with non-answers.

---

## 4. Noted but not taste signal

No SEO Watchdog report since 28 July (was weekly before that) and no
Groundskeeper report since 20 July — both now over two weeks quiet, the
same window Kate was heads-down on the Night Gardener repair fix rather
than board work generally. No new Forager run since 26 July either (over a
fortnight). Three separate scheduled routines went quiet in the same
window — possibly the same underlying cause (Kate's attention was
elsewhere, not a scheduling break) as the "quiet board" mystery this dream
just retired, but it's at least worth someone checking the schedules
directly rather than assuming. Flagging, not scoring as taste.

---

## 5. Open threads

- **NEW, urgent: the approved-but-unbuilt queue is about to recreate the
  exact problem the repair mechanism just solved, from the other
  direction.** Seven cards (13, 14, 16, 17, 18, 19, 20) are now approved
  and build-ready, and the Night Gardener's own new rule allows only one PR
  open at a time. At roughly one build per week (the historic rate),
  several will go stale on their calendar hook before they're even
  started: National Allotments Week (10–16 August) is two days out and
  card 9 — approved 13 July for exactly this — still isn't built; Worcester
  Show's giant-veg judging (9 August) is tomorrow, and card 18 was only
  approved 5 August. Worth Kate deciding a build order by urgency rather
  than board order.
- **Card 9 (National Allotments Week) will likely miss its own week.** If
  it can't be built by 10 August, writing it *during* the week as it
  happens may serve the diary voice better than pretending it was ready on
  opening day.
- **Card 18's Worcester Show hook is essentially already gone by build
  time; Malvern Autumn Show (September) is the one with runway left.** See
  this week's dreamt promotion.
- **The photo/video ask is now genuinely stale** (see §1) — needs a real
  test or it should be dropped, not downgraded forever.
- **Groundskeeper + SEO Watchdog + Forager cadence** — three routines quiet
  at once; see §4.
- **The Forager's write-to-main pipeline bug** (stuck twice in June/July) —
  untested this week, since no Forager run happened at all. Still
  unconfirmed either way.
- The companion-planting playground / ReactGarden overlap — still parked,
  still unscheduled.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.

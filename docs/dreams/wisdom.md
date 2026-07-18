# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-07-18 (week 1)._

**A note on this week:** wisdom.md was bootstrapped on 11 Jul from a single batch
of six decisions. Since then Kate has decided five more cards (7–11, all
approved, 0 parked, 0 binned) and the first Night Gardener PR was built,
reviewed, and merged via the new one-tap "Ship it" bench flow. That's a second
independent batch of evidence, so a few week-0 ratings move from medium to
high below; everything else stays capped until more weeks confirm it. This
week also saw a large affiliate/revenue-hygiene push (see §4) that ran
entirely outside the Forager/Bench pipeline — real signal about Kate's
current priorities, but not approve/park/bin data, so it's recorded
separately rather than folded into the taste rules it doesn't actually test.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Loves.** A pitch that promises to *use* the postcode/frost engine to give
  each reader a different answer, not sit beside it as static prose.
- **Confidence:** high (was medium).
- **Evidence:** now two-for-two. Approving "Sow now, eat all winter" (card 2):
  "tie it to using our postcode tool... if they're more cold locations,
  promote more cold kit stuff." Approving "Why your seeds won't come up"
  (card 7): "Can you use the postcode info here too? Like check to see if
  it's too hot for your lettuce seeds where you are." Two different guides,
  two different climate axes (cold arriving / heat stalling germination),
  same instinct both times: personalise the condition, don't just describe
  it in the abstract.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Loves** (a build-quality signal, not just a taste rule, but worth stating
  plainly since it's now tested). The Night Gardener's first real PR
  (`night/sow-now-eat-all-winter`, merged) built precisely what card 2's note
  asked for: a `ColdSnapNote` component reading the real frost engine, a
  UK-average fallback, and a cold-kit nudge gated to locations whose frost
  lands 10+ days early — with a plain no-buy-point sentence for everyone
  else. Nothing generic shipped in its place.
- **Confidence:** high (first real test, passed cleanly).
- **Evidence:** `40cd268` / merged PR #1. The open thread from last week's
  dream asking "did the build honour the note" is now resolved — yes.

### Content near an already-monetised hub gets an explicit revenue instruction
- **Loves.** Even when a pitch didn't lead with commerce, Kate's approval
  note adds one when the topic sits near existing affiliate ground.
- **Confidence:** high (was medium; a genuinely new generalisation this week).
- **Evidence:** approving the flower-seed-saving piece (card 10): "Make sure
  it is revenue generating, suggest what they can buy from envelopes to store
  etc." Approving "Good neighbours for your alliums" (card 11): "make sure
  it's revenue focused with affiliate links." Neither pitch was framed as
  monetisation-first (both were `content`) — she added the commercial ask
  herself both times, same pattern as the original garlic/onion hub praise.
  **Caveat worth holding onto:** none of this contradicts the shed-fund rule
  ("no new surface unless it replaces one") — her adjacent revenue-hygiene
  work this week (§4) is all pruning/sharpening existing buyer notes, not
  adding new ones. Read "make it revenue focused" as *use the buy-point that
  belongs here well*, not *add more buy-points*.

### Kate wants real photography and video, said twice this week
- **Loves.** Visible proof, not just described advice — a new rule, not seen
  in week 0.
- **Confidence:** medium (two instances, one sitting, first appearance).
- **Evidence:** approving National Allotments Week (card 9): "Sounds good as
  long as we use lots of photos and videos." Approving the flower-seed piece
  (card 10): "Use lots of photos and videos. People want to see what
  companion planting looks like." Both notes treat photo/video as a
  condition of approval, not a nice-to-have. Worth watching against
  `docs/CUT_LIST.md`'s flagged trust risk (Unsplash stock credit) and the
  photo/video catalogue's real gaps (see open threads) — the ask is real but
  the asset supply may not keep up.

### Interactive features want a physical/visual metaphor, not just a form
- **Loves.** A calculator or triager that *feels* like the thing it measures.
- **Confidence:** medium (unchanged — no new evidence this week; the
  Glut-o-meter that tested this is still unbuilt).
- **Evidence:** unchanged from week 0 — approving the Glut-o-meter with "I
  think it should have a visual like it's weighing your harvest up."

### Feature ideas that extend the existing calculator DNA land easily
- **Loves.** A feature pitched as fitting the site's season-aware-calculator
  lineage (longest-day, frost-map, blight-watch) gets approved fast and with
  enthusiasm.
- **Confidence:** medium, strengthening (2/2 approved, 0 rejected, one more
  data point than week 0).
- **Evidence:** the Glut-o-meter (week 0) and now "Every Drop" (card 8, the
  rainwater feature): approved with a long, personal, enthusiastic note about
  her own water butt and allotment hosepipe-ban realities — no hesitation,
  same pattern.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Avoids.** A topic where the natural how-to quietly undercuts what the
  linked suppliers actually sell.
- **Confidence:** medium (unchanged — no new test this week).
- **Evidence:** unchanged from week 0 (parking veg seed-saving over the
  F1/heirloom mismatch with Suttons/Dobies).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Avoids-for-now, not avoids.**
- **Confidence:** high (unchanged — no parks this week to confirm or
  challenge it further, but nothing contradicts it either).
- **Evidence:** unchanged from week 0 (companion-planting playground).

### The Night Gardener defers undefined technical/design calls rather than guessing
- **New this week.** Faced with two build-ready approved ideas (#1 and #7),
  it picked the one with an existing model to build against (frost dates)
  and explicitly left the one requiring an invented threshold (a soil-heat
  model with no codebase precedent) on the board "without your sign-off."
- **Confidence:** medium (one instance, but a clean example of good
  judgement worth reinforcing, not just Kate's taste but the crew's own).
- **Evidence:** PR #2's description, explaining why idea #1 (not #7) was
  built that night.

---

## 2. What works

- **The Potting Bench as the decision surface, now extended to shipping.**
  Kate's rich, substantive notes on every card (11/11 so far) continue. The
  bench grew a "Ship it" section (`932ba5d`) — a one-tap merge for Night
  Gardener `night/` PRs with a Netlify preview link, same guarded mechanism
  as the Dreamer's own merge button. First real use: PR #1 merged this way.
  Confidence: medium-high (small sample, clean result both times it's been
  used — six board verdicts, one ship).

- **A build that follows a specific approval note exactly gets kept, not
  reverted.** PR #1 is the first real Night-Gardener-build-to-merge cycle,
  and it stuck (merged, no revert, no follow-up complaint commit). See taste
  rule above. Confidence: medium (n=1, but clean).

- **Evidence-required cards with a named, current commercial/seasonal window
  get approved fast.** Reinforced again this week — the hosepipe-ban
  evidence behind "Every Drop" (three water companies, ~11 million people
  affected, two more joining 17 Jul) was cited approvingly in Kate's own
  note. Confidence: high (three-for-three dated-trigger pitches approved).

- **Dreamt content connections (from-a-dream cards) land well.** Both ideas
  The Dreamer promoted last week — flower-seed-saving and "good neighbours
  for your alliums" — were approved, each with an added revenue/photo
  instruction rather than a rejection or heavy rewrite. 2/2 so far.
  Confidence: medium (one week's test, but a real result for the method
  itself, not just the ideas).

---

## 3. Self-score (against the 2026-07-11 dream)

- **Predicted:** does "Sow now, eat all winter" get built with the specific
  cold-kit/postcode tie-in Kate asked for? **Hit.** Built exactly as asked
  (see taste rule above), merged, kept.
- **Predicted:** does the Glut-o-meter get its weighing visual? **Pending,
  not scoreable** — still unbuilt. Carried forward as an open thread below,
  now with an actual deadline pressure (August is close).
- **Promoted:** flower-seed-saving pitch. **Hit** — approved.
- **Promoted:** "good neighbours for your alliums." **Hit** — approved, and
  folded into the built/open autumn-allium hub PR exactly as its own brief
  suggested ("a cross-link, if the hub's already been scoped tight").
- **Held back:** the companion-playground/ReactGarden thread was flagged as
  worth watching, not pitched, since it's parked. Correctly not re-pitched
  this week either — still no /my-garden Phase 6 scheduling to hang it on.

Net: 2/2 promoted ideas landed, 1/2 build predictions confirmed, 1 correctly
not re-pitched. Encouraging for a second week, still too small a sample to
be confident the method generalises past two similar cross-link pitches.

---

## 4. Noted but not taste signal: this week's revenue-hygiene push

Between `2026-07-13` and `2026-07-17`, a large body of work (`docs/reports/
commercial-surface-inventory-2026-07-15.md`, `revenue-route-hygiene-
2026-07-17.md`, and ~25 commits sharpening buyer notes, pruning duplicate
tracking, and fixing attribution) ran entirely outside the Forager/Bench
pipeline — direct commits and merges, no board cards, no approve/park/bin
verdicts to harvest. It's strong evidence of *priority* (Kate is spending
real time on affiliate hygiene right now, and the reports explicitly encode
CUT_LIST's "replace, don't add" rule as working policy) but it isn't
training signal for the ideas-board taste rules above, so it's recorded here
rather than folded in. Worth revisiting if this becomes a recurring weekly
pattern rather than a one-off cleanup sprint.

Separately, a real bug (`e824382`, homepage advising "sow peas indoors" in
mid-July) was found and fixed directly by Kate + Claude outside the pipeline
entirely — a maintenance fix, not a taste signal, but worth knowing the crew
also catches and fixes correctness bugs this way, not only through the
Groundskeeper.

---

## 5. Open threads

- **The approved-but-unbuilt backlog is growing, and some of it has a real
  calendar deadline.** Cards 7 (heat/lettuce), 8 (Every Drop), 9 (Allotments
  Week diary), and the Glut-o-meter (approved 11 Jul) are all approved and
  unbuilt. National Allotments Week is 10–16 August; the glut is imminent;
  the hosepipe bans Every Drop responds to are active *now*. One build per
  night may not keep pace with dated windows closing. Worth watching whether
  a priority order (by deadline, not just by board position) would serve
  Kate better than build-order-as-listed.

- **A Night Gardener PR has sat open and unshipped since 17 July.** PR #2
  (`night/autumn-garlic-onion-hub`, folding in cards #1 and #11) has been
  open for about a day with a Netlify preview ready — the "Ship it" bench
  flow exists specifically for this. Not a taste question, just worth
  flagging since the pre-order window it targets ("late July–August") is
  ticking while it waits.

- **The photo/video ask (new taste rule above) is colliding with a real
  asset gap.** PR #2 itself flagged reusing a spring allium photo for an
  autumn-planting guide because no autumn shot exists yet in the catalogue.
  Kate is asking for *more* photos and video in the same week a build had to
  improvise around missing ones. If this keeps happening, the constraint
  isn't build effort, it's the photo/video catalogue itself.

- **The "SnapNote" pattern may be worth naming before a third appears.**
  `ColdSnapNote` (cold-kit nudge) and the still-unbuilt heat-check for card 7
  are both bespoke postcode-tied condition components. Fine at two; worth a
  shared abstraction if a third one gets pitched.

- **The F1/heirloom affiliate-conflict check is still untested elsewhere.**
  No new data this week (potato-variety content, or similar, hasn't come up)
  — flagged, not concluded, same as week 0.

- **The companion-planting playground / ReactGarden overlap** (DIRECTION's
  /my-garden Phase 6) is still parked and still unscheduled. Not worth
  surfacing again until Phase 6 is actually queued.

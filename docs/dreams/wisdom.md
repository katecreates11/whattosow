# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-07-11 (week 0, bootstrap)._

**A note on this week:** this file did not exist before today. The Forager has
run once (7 Jul); Kate made her first-ever batch of decisions today, 11 Jul,
via the new Potting Bench (a private mobile verdict page). Everything below is
built from that one batch — six cards, four approved, two parked, none
binned. That's a real signal, but it's one sitting's worth. Every confidence
rating here is capped at **medium** until a second week of decisions either
confirms or contradicts it.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Loves.** A content pitch that promises to *use* an existing tool (the
  postcode/frost-date engine) rather than sit beside it as static prose.
- **Confidence:** medium.
- **Evidence:** approving "Sow now, eat all winter", her only instruction was
  "tie it to using our postcode tool to plan when it will get cold where they
  are — and if they're more cold locations, promote more cold kit stuff." She
  didn't ask for anything else about the idea; personalisation + the kit
  tie-in was the entire note.

### Commerce riding a real, live buying window earns explicit praise
- **Loves.** A monetisation pitch is approved fastest when it names a real
  supplier window happening *now* (pre-orders, stock arriving) rather than an
  evergreen "buy this" angle.
- **Confidence:** medium.
- **Evidence:** approving the autumn garlic/onion hub: "a good focus on
  getting those affiliate clicks as well as useful content" — she named the
  commerce explicitly as a plus, not a tolerated side-effect.

### Interactive features want a physical/visual metaphor, not just a form
- **Loves.** A calculator or triager that *feels* like the thing it measures.
- **Confidence:** medium.
- **Evidence:** approving the Glut-o-meter, her only note was "I think it
  should have a visual like it's weighing your harvest up" — she added the
  metaphor unprompted; the Forager's pitch hadn't specified one. Matches
  DESIGN_TASTE's "signature moves" (a filling meter, veg piling up) — this is
  the first real Kate evidence for that doc's own guess.

### Don't pitch content whose premise fights the site's own affiliate mix
- **Avoids.** A topic where the natural "how-to" content quietly undercuts or
  competes with what the linked suppliers actually sell.
- **Confidence:** medium.
- **Evidence:** parking "Saving your own seed — beans, peas & tomatoes": "Real
  Seeds have really good guides and they sell those heirloom seeds not F1.
  We're linking to Suttons and Dobies and a lot of their seeds are F1 I
  think." The objection wasn't the topic (thrift, seed-saving) — it was the
  specific crops sitting on top of an F1-heavy affiliate relationship. She
  offered her own pivot in the same breath: "maybe we can do a sunflower one
  and marigold etc?" — ornamentals dodge the objection. **Read this as a
  redirect, not a veto on seed-saving as a theme.**

### "Parked" can mean "not now, sequencing" rather than "no"
- **Avoids-for-now, not avoids.** Don't read every park as a quality
  rejection — check her note for *why*.
- **Confidence:** high (the wording is unambiguous, though it's one data
  point).
- **Evidence:** parking the companion-planting playground: "I am keen on
  this, been trying out this idea before with my garden. Let's park until
  we've got other improvements handled." Contrast with the seed-saving park
  above, which *was* a substantive objection. Two parks this week, two
  different reasons — don't collapse them into one "parked = weak idea"
  rule.

### Feature ideas that extend the existing calculator DNA land easily
- **Loves.** Both approved features (Christmas-dinner backward-planner,
  Glut-o-meter) were pitched explicitly as fitting the site's existing
  season-aware-calculator lineage (longest-day, frost-map, blight-watch).
  Both were approved with enthusiasm and no hesitation in the note.
- **Confidence:** medium — small sample, but 2/2 features approved this way
  and 0/2 rejected is a clean early signal worth watching.

---

## 2. What works

- **The Potting Bench (private mobile verdict page) as the decision surface.**
  Kate reviewed and decided on all six of the Forager's first cards in one
  sitting, with a substantive note on every single one — including the two
  parks. A low-friction, mobile review UI seems to produce fast, *rich*
  decisions (not just approve/reject clicks). Evidence: `dea5f24` + the six
  decision commits on 2026-07-11. Confidence: medium (one sitting, but a
  strong result: 100% of cards got a real note, not just a status flip).

- **Evidence-required cards with a named, current commercial/seasonal window
  get approved fast.** Both content approvals cited a specific, dated trigger
  (autumn allium pre-order season; high-summer sowing window) rather than an
  evergreen gap. Confidence: medium.

- **No Night Gardener or Groundskeeper output exists yet to judge.** The only
  built feature so far (the Christmas-dinner planner) shipped as a hand-built
  test *before* the approval pipeline existed, not as a Night Gardener PR —
  so it's evidence Kate likes the idea, but not yet evidence about the
  Night Gardener's build quality or Kate's PR-review behaviour. Don't
  conflate the two until real Night Gardener PRs exist.

---

## 3. Open threads

- **Watch how "Sow now, eat all winter" actually gets built.** Kate's note
  asked for a specific tie-in (postcode tool → cold-location detection →
  promote cold-weather kit). Next week: check whether the Night Gardener's
  build honoured that instruction, or built the generic version the Forager
  originally pitched. This is the first real test of whether specific notes
  on approval survive into the build.

- **Companion-planting playground may already have a home.** DIRECTION.md
  describes /my-garden's ReactGarden as "the page's charming heart" (Phase 6,
  currently unbuilt). The parked drag-and-drop companion bed and that
  ReactGarden heart could plausibly be the same feature Kate hasn't yet
  connected in her own head. Worth surfacing gently once /my-garden Phase 6
  is scheduled — not worth pitching cold, since it's parked, not open.

- **The F1/heirloom affiliate-conflict check is new and untested elsewhere.**
  Only tested once (seed-saving). Worth checking whether it generalises: does
  it also touch, e.g., potato-variety content (Suttons/Dobies sell mostly
  named commercial varieties, not heritage-only)? No evidence yet either way
  — flagged, not concluded.

- **Sample size is tiny.** Every rule above rests on one batch of six
  decisions made in one sitting on one day. Treat all of it as a working
  hypothesis for next week to confirm, sharpen, or overturn — not settled
  taste.

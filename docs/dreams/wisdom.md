# The Crew's Memory — Wisdom

_Consolidated weekly by The Dreamer. Bounded to ~400 lines — prune, don't grow._
_Last consolidated: 2026-08-01 (week 3)._

**A note on this week:** the quietest week yet — zero board decisions between
25 July and 1 August, so every taste rule below is carried forward unchanged
rather than re-tested. The real news is operational, not taste: the
Forager's write-to-main fix broke a second time (see §5), the board's
unreviewed pile has grown to seven cards, and PR #2 has now sat two full
weeks past its ordering window opening while the hosepipe-ban story it
answers has only gotten bigger. None of that is a taste signal, but all of
it is worth Kate's attention, so it leads the open threads below.

---

## 1. Kate's taste

### Weave personalisation into content, don't just describe it
- **Loves.** A pitch that promises to *use* the postcode/frost engine to give
  each reader a different answer, not sit beside it as static prose.
- **Confidence:** high.
- **Evidence:** three-for-three now, counting this week's stuck-but-real
  pitch — "Sow now, eat all winter" (frost tie-in, built), "Why your seeds
  won't come up" (heat tie-in, approved), and the still-unreviewed
  catch-crop finder (card 17, this week's run) reasoning from this exact
  rule. No new Kate verdict this week, so confidence holds rather than rises
  on the Forager's own pitch — but it's the crew's best-tested playbook.

### An approval note asking for a specific tie-in gets built exactly as asked
- **Confidence:** high.
- **Evidence:** unchanged since week 1 (`ColdSnapNote`, PR #1, merged and
  kept) — still the only build that has tested it.

### Content near an already-monetised hub gets an explicit revenue instruction — conditional, not universal
- **Confidence:** high.
- **Evidence:** unchanged since week 2 (cards 10/11 got the note on
  approval; card 12, no natural buy-point, got none).

### Kate wants real photography and video, said twice
- **Confidence:** medium, now a third week without a test. Starting to look
  less like "hasn't come up yet" and more like nothing has shipped that
  could test it either way. Worth downgrading if a fourth week passes with
  no evidence.
- **Evidence:** unchanged (cards 9, 10).

### Interactive features want a physical/visual metaphor, not just a form
- **Confidence:** medium.
- **Evidence:** unchanged (the Glut-o-meter's "weighing your harvest up"
  note) — and echoed independently this week: the stuck giant-vegetable
  pitch (card 18) reaches for the same instinct ("a filling bar or
  silhouette... the same instinct Kate asked for on the Glut-o-meter") on
  its own reading of the board, not a new Kate verdict. Confidence holds,
  but worth noting two different agents converging on it unprompted.

### Feature ideas that extend the calculator DNA land easily
- **Confidence:** medium. **Evidence:** unchanged (Glut-o-meter, Every Drop).

### Don't pitch content whose premise fights the site's own affiliate mix
- **Confidence:** medium. **Evidence:** unchanged (parked veg seed-saving).

### "Parked" can mean "not now, sequencing" rather than "no"
- **Confidence:** high. **Evidence:** unchanged (companion-planting
  playground).

### The Night Gardener defers undefined technical/design calls rather than guessing
- **Confidence:** medium. **Evidence:** unchanged (PR #1's choice of idea #1
  over idea #7).

### NEW, low confidence: a growing unreviewed pile may itself be suppressing decisions
- **Confidence:** low (n=1, a hypothesis, not a tested rule).
- **Evidence:** the board had at least one decision every week since 11
  July, then went to zero the same week the unreviewed pile grew past what
  fits in one sitting — seven cards now sit `proposed` (13–16, plus this
  week's 17–19 once recovered below). Correlation only; could just as
  easily be Kate's own calendar and nothing to do with pile size. Worth
  watching: if the pile keeps growing while decisions stay at zero, this is
  worth actually fixing (a shorter, better-triaged bench view); if a normal
  decision week follows, this was noise.

---

## 2. What works

- **The Potting Bench as the decision surface.** Confidence: medium-high
  (unchanged, untested this week — zero decisions to observe).
- **A build that follows a specific approval note exactly gets kept, not
  reverted.** Confidence: medium (n=1, unchanged — PR #2 still hasn't
  shipped to become a second data point; see §5).
- **Evidence-required cards with a named, current commercial/seasonal window
  get approved fast.** Confidence: high (unchanged, still four-for-four; no
  new decisions this week to extend the count).
- **Dreamt content connections (from-a-dream cards) land well.** Still 3/3
  approved (10, 11, 12) — unchanged this week, since card 16 (last week's
  dreamt addition) hasn't been decided yet. Confidence: high, but the sample
  hasn't grown; the next real test is whether card 16 gets the same clean
  yes.
- **Dreamt board pitches sometimes anticipate independent SEO research —
  now two-for-two.** Week 2 recorded the hosepipe-ban pre-echo (card 12 vs.
  the Watchdog's 21 July report). This week's Watchdog report (28 July)
  independently named "when to lift maincrop potatoes" (foliage die-back,
  skin-set wait) as a live content gap — and the curing/storage guide
  already sitting recovered-but-unbuilt on the board (card 13, from 19
  July) already plans to cover exactly that ground. Two different agents,
  two different evidence bases (Kate's own notes vs. live search data), same
  gap, twice running now. Confidence: medium (was low) — worth trusting the
  consolidated-memory method's gap-finding a little more each time this
  repeats.

---

## 3. Self-score (against the 2026-07-25 dream)

Nothing to score against real decisions this week — the first fully quiet
week since the crew started (zero board verdicts between 25 July and 1
August). Card 16 (the postcode-aware hosepipe addition, promoted last week)
is still sitting `proposed`, unscored a second week running — not because a
build hasn't happened yet, but because Kate hasn't been to the bench at all
this week. The Glut-o-meter prediction is now three weeks unscored. Net: 0
scoreable predictions this week, not because a guess was wrong, but because
there was nothing to check a guess against. Recorded honestly rather than
padded — see the new low-confidence taste hypothesis above about why the
pile might be stalling.

---

## 4. Noted but not taste signal

No Groundskeeper report landed this week (last one: 20 July, roughly a
fortnight gap now against its earlier weekly cadence) — worth checking next
week whether that's a scheduling gap or the same kind of pipeline miss the
Forager had; one missed week isn't yet enough to call it a pattern. The SEO
Watchdog ran cleanly on 28 July: five FIX NOW items (a stale build-date bug
on all 51 `/sow-in` city pages; FAQPage schema missing on 45/48 crop pages;
oversized meta descriptions/titles on crop templates; `keywords` arrays
still lingering in 54 files against CUT_LIST policy) and three seasonal
opportunities (sweetcorn ready-to-pick test, potato lifting timing, and
National Allotments Week — already covered above). None of this is a
Kate-taste signal — it's engineering/content backlog — but it's real,
evidenced work sitting ready for whoever picks it up next.

---

## 5. Open threads

- **Escalated: the Forager's write-to-main pipeline has now broken twice
  since the fix landed, not once.** `docs/agents/forager.md` was updated 12
  July (`dc6e15c`) to commit `docs/ideas-board.md` straight to `main`. The
  19 July run broke this and was recovered by last week's dream, cause
  unconfirmed. This week's 26 July run broke it again, the exact same way —
  pushed to `ideas/weekly-2026-07-26` instead of `main`, despite the fixed
  instructions being live on `main` for over two weeks by then. Two
  breaks out of two runs since the fix landed is a pattern, not a fluke —
  reading the branches by hand every week is catching it, but it means the
  board Kate actually looks at cannot currently be trusted to be complete
  without that manual check. Worth someone looking directly at *why* — a
  tooling/permissions issue in how that run commits, not a wording problem
  in the instructions, since the instructions are already correct.
- **The approved-but-unbuilt backlog, now three weeks running and worse.**
  PR #2 (autumn allium hub, cards #1 and #11) has been unmerged for 15 days
  (since 17 July), and the window it targets has tightened further since it
  was last flagged — Thames Water joined the hosepipe ban on 23 July (10.1m
  customers, the largest single restriction yet), which the Forager's own
  26 July run cited as a reason the older approved-but-unbuilt cards
  (7, 8, 9, 10, 11, 12) need shipping urgently rather than being re-pitched.
  The Glut-o-meter (approved 11 Jul) is unbuilt with glut season now past
  its peak. National Allotments Week (approved 13 Jul) has nine days left.
- **NEW: the board itself has stalled — zero decisions this week, pile now
  at seven cards.** See §1's new low-confidence hypothesis; the practical
  read is that the bench may need a smaller, better-triaged view rather
  than one long list, if this repeats.
- The photo/video ask colliding with a real asset gap — unchanged, a third
  week untested either way.
- The "SnapNote" pattern (`ColdSnapNote` + the still-unbuilt heat-check) —
  still just two, no third instance.
- The F1/heirloom affiliate-conflict check — still untested elsewhere.
- The companion-planting playground / ReactGarden overlap — still parked,
  still unscheduled.
- Groundskeeper report cadence — missing this week; watch for a pattern.

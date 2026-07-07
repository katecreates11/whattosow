# What To Sow — Design Taste

> **How to use this:** Read before building or restyling any UI. It sits alongside
> `docs/DIRECTION.md` (the visual taste checklist) and `docs/ANTI_PATTERNS.md` (never/instead).
> DIRECTION says *what goes where*; ANTI_PATTERNS says *what to never do*; this doc says
> **what "good" looks like and why** — the positive target. When they conflict, ANTI_PATTERNS
> and DIRECTION win on rules; this doc wins on craft.

These lessons were drawn from studying five best-in-class sites directly (screenshots, 7 Jul
2026): **Kinfolk**, **The Gentlewoman**, **Graza**, **Natoora**, **Poilâne**. Each taught one
thing we should steal. The point is not to copy them — it's to reach their level of *nerve*.

---

## The five references and the one lesson each

1. **Natoora — the produce IS the design.** A full-bleed, beautifully-lit overhead box of real
   seasonal veg (chard, courgettes, aubergines, peaches) carries every scrap of colour; the
   chrome is plain black-on-neutral and gets out of the way. *For us: a real, well-shot vegetable
   is worth more than any graphic. Let Kate's plot photos run big and carry the colour.*

2. **Kinfolk — whitespace is the luxury.** A letter-spaced serif wordmark, one hero given acres
   of air, black text on white, the photograph the only colour. *For us: restraint reads as
   quality. One thing at a time, given room. Silence around an element is a design choice.*

3. **The Gentlewoman — one accent colour, used fearlessly.** An electric teal wordmark against
   black-and-white and white space. Total conviction. *For us: we have Bright Green (#00d975-ish
   family / our `leaf`/`allotment`). Use ONE accent decisively for identity and action — not a
   timid rainbow of tints.*

4. **Graza — warmth + play, done with confidence.** A chunky characterful wordmark, appetising
   full-bleed food with real hands, a warm serif headline over it, a single lime CTA pill, and a
   **monospace ticker** of seasonal facts ("Harvesting Season: October–January"). *For us: this
   is almost our DNA already (mono labels, marquee, bright accent) — just braver and warmer.*

5. **Poilâne — a real human, and huge calm headings.** A cinematic founder-in-her-kitchen hero,
   enormous confident section headers ("OUT OF THE OVEN"), and commerce that stays calm —
   products on soft neutral tiles, small-caps labels, a quiet "SEE ALL". *For us: Kate is our
   Apollonia. Put the human in. Size headings bravely. Keep buying calm.*

---

## The principles (concrete and checkable)

### 1. Photography carries the page
- Real, warm, appetising, in-focus plot/food photography is the primary design material. When a
  good photo exists, **let it run full-bleed or large** and carry the colour.
- One image per moment, and it must carry information (a real carrot at the thinning step — not a
  stock mood shot). *(This restates COPY_REWRITES' image rule — it matters.)*
- Never let a graphic, icon, or gradient stand in where a real photograph would do the job better.

### 2. Typography with nerve
- **Display = Newsreader (serif).** Size it *bravely* — hero and section headings should feel
  confident and large (think Poilâne's "OUT OF THE OVEN"), not polite. Tight leading, tight
  tracking on big serif.
- **Body = Instrument Sans.** Quiet, readable, generous line-height, `max-width` ~60–66ch. Never
  fight the display.
- **Labels / eyebrows / tickers / CTAs = IBM Plex Mono**, uppercase, letter-spaced. This is our
  "behind-the-scenes / factual" voice — lean into it (Graza's ticker is the benchmark).
- One idea, one heading. No stutter (two headings for the same thing — see ANTI_PATTERNS).

### 3. One accent, used with conviction
- Warm neutrals do the heavy lifting (`cream`, `earth`, the paper background). **Bright/leaf
  green is the single identity+action accent** — use it decisively for the primary action and
  moments of life, not sprinkled everywhere.
- The functional accents (`amber`, `tomato`, `frost`, `rust`) are for *meaning* (status, season,
  warmth/cold) — not decoration. Avoid tint-soup: a page with six pale tints reads as timid.
- Colour should mostly come from photography, not fills.

### 4. Space and composition
- **Whitespace is a feature.** Give the lead element room; resist filling every gap.
- **Hierarchy over uniformity.** One clear lead (a showstopper), then quieter supporting elements
  — never a grid where every child is equal weight (ANTI_PATTERNS). Asymmetry is welcome.
- Generous vertical rhythm between sections; let the page breathe between ideas.

### 5. The human hand
- Put Kate in it — her voice, her photos, her plot, a handwritten-feeling aside (Natoora writes
  on the box; Poilâne shows the founder). Warmth comes from a real person, not a mascot.
- A small personal touch (a diary caption in mono, a real photo of *her* carrots) beats any
  polished-but-anonymous treatment.

### 6. Motion — restrained and purposeful
- One well-orchestrated moment beats scattered fidgeting: a staggered fade-up on load, a gentle
  reveal on expand. Always honour `prefers-reduced-motion`.
- Motion should feel like the season turning, not a UI showing off.

### 7. Calm commerce (this is where money lives — protect the trust)
- Products/affiliate on soft neutral tiles with room, small-caps label + price, one quiet link
  (Poilâne's "SEE ALL"). **Never** grey "VIEW ON AMAZON" pills or loud repeated buy buttons
  (ANTI_PATTERNS). One considered CTA per moment.
- Buy-points earn their place by being genuinely useful at that moment (kit *at the step you need
  it*), not by shouting.

### 8. Buttons
- **Primary action:** one solid, confident pill in the accent (Graza's lime → our green).
- **Secondary:** a thin outlined/ghost button (Poilâne's "DISCOVER…", our existing outlined
  style). Never more than one primary per view.

---

## Signature moves to reach for
- A **full-bleed real-plot photo** hero, headline laid over it in big Newsreader.
- A **mono ticker/eyebrow** carrying a live seasonal fact (what's in season, days to frost).
- One **bright-green** moment of life per page, everything else warm-neutral.
- **Huge, calm section headings** with real air above them.
- A **handwritten/diary aside** in Kate's voice near the human moments.

## The slop smell test (if any are true, redesign)
- [ ] Every card in a row is the same size and weight (no hero, no hierarchy).
- [ ] More than one accent colour is fighting for attention, or the page is a wash of pale tints.
- [ ] A gradient, icon, or graphic is standing in for a photo that would be better.
- [ ] Headings are timid — sized like body text with bold, not composed with nerve.
- [ ] Two headings say the same thing; or copy over-explains what the design already shows.
- [ ] The body font is doing display work, or Inter/Arial/system fonts crept in.
- [ ] A buy button is louder than the content around it.
- [ ] It could be any brand's page — nothing here says *What To Sow* specifically.

---

## How this plugs in
Both Claude and the Night Gardener read this before any UI build (add it to the agent
read-lists alongside DIRECTION/ANTI_PATTERNS). When Kate reacts to a build ("this bit's off"),
capture the lesson here so the taste compounds. This doc is meant to grow.

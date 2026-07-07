# The Forager — Ideas Agent design spec

**Date:** 2026-07-07
**Owner:** Kate Allen
**Repo:** `github.com/katecreates11/whattosow` (What To Sow, Next.js App Router, Netlify)
**Status:** Approved in brainstorming; pending Kate's spec review before planning.
**Pairs with:** `2026-07-07-night-gardener-design.md` (The Forager feeds the Night Gardener's queue).

---

## 1. Purpose

A weekly autonomous research agent that surveys the landscape — search demand, what's
already working, what competitors cover, what's coming into season — and pitches a **ranked
shortlist of evidenced ideas** to an ideas board in the repo. Kate approves the winners;
approved ideas flow into the Night Gardener's build queue.

It exists so What To Sow keeps generating its *own* next moves from real signal, not just
executing a fixed backlog. The machine does the tireless parts (research, gap-spotting,
drafting the pitch); Kate makes the one judgement only she can — which ideas are worth building.

**One-line contract:** *Once a week, research the world + WTS's own data, and pitch 3–5
ranked, evidence-backed ideas to `docs/ideas-board.md`. Never build. Never ship. Never
re-pitch something Kate has cut, parked, or binned.*

## 2. The pipeline (why this exists as a pair)

```
The Forager (researches → pitches idea-cards)
      → Kate approves / parks / bins
            → approved ideas become queue work
                  → The Night Gardener (builds one/night → preview PR)
                        → Kate promotes to live
```

Two human gates: Kate decides **which ideas** are worth building (taste on the idea) and
**which builds** go live (taste on the execution). Neither agent both invents and ships
unsupervised — that separation is the core safety property.

## 3. Scope

**In scope:** Research across defined senses; produce a ranked, evidenced shortlist of idea
cards on the board; classify each by type; keep the board as durable memory of past verdicts.

**Out of scope (hard):**
- Building, coding, or shipping anything. It proposes; the Night Gardener (and Kate) build.
- Pitching without evidence. Every card cites the real query/trend/gap/data that prompted it.
- Re-pitching anything on `CUT_LIST.md` or already marked `parked`/`binned` on the board.
- Pushing to `main`.

## 4. Remit (what it invents)

A **broad strategic ideator** that can pitch any of three types, tagging each card so it
routes correctly downstream:

- **Content / SEO** — new pages, guides, posts driven by search demand + gaps. → feeds
  Night Gardener directly.
- **Feature / interactive tool** — novel, shareable builds in the spirit of the daylight arc
  / frost map. → too big to one-shot; approval triggers a mini-brainstorm/spec before queuing.
- **Monetisation** — affiliate angles, buying guides, product round-ups from buy-intent
  search + seasonality. → often actioned by Kate directly; tracked on the board regardless.

## 5. The four senses

Launch sequencing keeps auth off the critical path:

**Phase 1 — no setup, works day one:**
- **Open web** — competitor gardening sites, forums (r/GardeningUK etc.), Google Trends,
  seasonality / what's coming into relevance.
- **Own repo** — every existing page/crop/guide, to find genuine gaps (demand the site
  can't yet answer).
- **Kate's notes & backlog** — `status.md`, `NEXT_PHASES.md`, the affiliate backlog,
  `CUT_LIST.md`, and the ideas board's own history — so it builds on Kate's thinking and
  never re-pitches parked/binned/cut items.

**Phase 2 — needs one-time API auth, added as fast-follow:**
- **Search Console** — the strongest signal: near-miss queries, high-impression/low-click
  pages, what's ranking. (Google Search Console API auth.)
- **umami analytics** — what's actually getting traffic and which affiliate links convert,
  so ideas build on proven winners. (umami API access.)

The agent works with whatever senses are live; it never blocks on a sense that isn't wired.

## 6. How a run works (Sunday, weekly)

1. **Load Kate's world.** Read repo inventory, `status.md`, `NEXT_PHASES.md`, affiliate
   backlog, `CUT_LIST.md`, `DIRECTION.md` (incl. the "never become" closer), and the current
   `docs/ideas-board.md` (past verdicts).
2. **Research across live senses** (§5).
3. **Find gaps & opportunities**, weighted to the **next 4–8 weeks** of seasonality so pitches
   are timely (blight season, a trending crop, the glut) — not out-of-season.
4. **Draft a ranked shortlist of 3–5 idea cards.** Each card:
   - Title + **type tag** (content / feature / monetisation)
   - **Evidence** — the actual query, trend, gap, or data point that prompted it (required)
   - The pitch — what to make and why it wins
   - **Payoff-vs-effort score** (drives the ranking)
   - For content: a ready-to-queue brief (target query, angle, internal links, voice notes)
   - Status: `proposed`
5. **Write the board + digest.** Update `docs/ideas-board.md` (on a branch, never `main`)
   and hand Kate a short "this week's shortlist and why" summary.

## 7. The board & the handoff

- **`docs/ideas-board.md`** — one file, each idea a card with a status field:
  `proposed` → Kate sets `approved` / `parked` / `binned`. The board is the agent's durable
  memory: parked/binned ideas are never re-pitched.
- **Handoff by type on `approved`:**
  - **Content** → becomes eligible Night Gardener queue work (the ready-to-queue brief is
    the build item).
  - **Feature** → flagged `needs-spec`; triggers a brainstorm/spec with Claude before it
    can enter the build queue (too big for a one-night one-shot).
  - **Monetisation** → tracked; typically actioned by Kate; may become a content build if it's
    a buying guide.
- **Night Gardener integration:** the Night Gardener's nightly pre-check treats board items
  marked `approved` + type `content` (or a spec'd feature) as eligible queue work, alongside
  `NEXT_PHASES.md`. Priority order between board ideas and NEXT_PHASES is Kate's to set
  (default: NEXT_PHASES first, then highest-scored approved board ideas).

## 8. Guardrails (non-negotiable)

- **Evidence-required** — no card without a real, cited signal.
- **No re-pitching** — respects `CUT_LIST.md` and every `parked`/`binned` board card.
- **On-brand** — honours `DIRECTION.md` (incl. "never become"), the voice rules (gentle
  friend, weather-obsessed, never snarky, **never personify nature**), and brand.
- **Shortlist only** — 3–5 ranked ideas per run; a signal, never a dumping ground.
- **Proposes only** — never builds, codes, or ships; never pushes `main`.

## 9. Cadence & mechanism

- **Cadence:** Sunday, weekly (timezone: UK). One research sweep a week; Monday's shortlist
  fuels the week's Night Gardener builds.
- **Mechanism:** a scheduled cloud agent / routine (via the `/schedule` skill) against the
  connected GitHub repo, with web-research tools plus (phase 2) Search Console + umami API
  access. Board updates land on a dedicated branch (e.g. `ideas/weekly`), never `main`.

## 10. Dependencies to confirm at build time

1. Cloud routine has repo access to read the tree and push the `ideas/…` branch.
2. Phase 2: Google Search Console API auth (property: whattosow.co.uk) and umami API access.
3. Schedule timezone set to UK.
4. First-run seeding of `docs/ideas-board.md` (empty board with the card template + status key).

## 11. Failure & edge handling

- **Thin week (no strong signal):** pitch fewer than 5 — or explicitly say "nothing above the
  bar this week" rather than padding with weak ideas.
- **A sense is down/unauthed:** proceed with the live senses; note in the digest which sense
  was unavailable.
- **Overlap with an existing NEXT_PHASES item or open idea:** don't duplicate — reference it
  and, if it adds something, note the delta.
- **Idea drifts off-brand under research pressure:** drop it; the guardrail docs win over an
  interesting-but-wrong pitch.

## 12. Success criteria

- Most Sundays, Kate wakes Monday to 3–5 ranked, evidence-backed ideas she can judge in minutes.
- Approved content ideas flow cleanly into the Night Gardener and appear as preview PRs that week.
- Zero re-pitches of cut/parked/binned ideas; zero un-evidenced pitches.
- Over time, a visible share of shipped WTS work traces back to a Forager card — the site is
  generating and acting on its own next moves.

## 13. Open questions for Kate's review

- Priority when both NEXT_PHASES items and approved board ideas are queued (§7) — default is
  NEXT_PHASES first; happy to flip to "highest-scored idea wins."
- Should the weekly digest land somewhere Kate reads first thing (a note/file), or is updating
  the board + a run summary enough?

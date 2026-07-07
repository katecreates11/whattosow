# The Night Gardener — design spec

**Date:** 2026-07-07
**Owner:** Kate Allen
**Repo:** `github.com/katecreates11/whattosow` (What To Sow, Next.js App Router, Netlify)
**Status:** Approved in brainstorming; pending Kate's spec review before planning.

---

## 1. Purpose

An autonomous scheduled agent that moves What To Sow forward overnight, hands-off,
and leaves Kate **rendered preview URLs** to review and promote. It exists to convert
the already-sequenced backlog in `docs/NEXT_PHASES.md` into real, built, previewable
progress — not reports, not to-do lists — while never putting anything live without Kate.

**One-line contract:** *Build one queued item per night, prove it compiles, push it to a
Netlify deploy preview via a PR, and stop. Never touch `main`. Never deploy to production.*

## 2. Scope

**In scope:** Building items from the defined work queue (whole pages, layouts, redesigns,
components, copy that follows the voice rules), on a branch, to a PR + preview URL.

**Out of scope (hard):**
- Pushing to `main` or deploying to production. Kate promotes; the agent never does.
- Starting any Kate-gated item (the 8 gated decisions in `NEXT_PHASES.md`).
- Inventing work not in the queue.
- Touching another agent's in-flight branches (Codex is active on this repo).

## 3. The autonomy model (decided)

Kate chose **aggressive build → preview URL**. The agent builds ambitiously (full phases,
new pages, redesigns) but the blast radius is controlled by routing *all* output through a
Netlify deploy preview that Kate clicks through and promotes. Aggression is in the *building*;
caution is in the *shipping*. Nothing reaches `whattosow.co.uk` between Kate's reviews.

## 4. How a night runs

1. **Wake + cheap pre-check.** Fires on the schedule. First action: read the work queue
   (`docs/NEXT_PHASES.md` + the state file in §6). If no un-gated item is ready, **stop
   immediately** and record a one-line "nothing queued" note. No build, minimal spend.
2. **Load the taste guardrails before touching code.** Read, as hard constraints:
   `PROJECT_CONTEXT.md`, `docs/DIRECTION.md`, `docs/ANTI_PATTERNS.md`,
   `docs/COPY_REWRITES.md` (incl. the **lyricism ceiling — never personify nature**;
   plain observation is the voice), `docs/CUT_LIST.md`, and `CLAUDE.md` (brand colours).
   The WTS voice is: gentle friend, positive, weather-obsessed, Pooh warmth + Nigel Slater
   rhythm — never snarky/superior, never personify nature.
3. **Pick exactly one item.** The next un-gated item in queue order. If the next item is
   Kate-gated, skip it, record that Kate owes a decision, and take the next un-gated one.
   **One item per night** — keeps the diff reviewable and cost bounded.
4. **Build it fully** on a fresh branch cut from `origin/main`.
5. **Prove it's green.** `npm run build` (Next's build type-checks) exit 0 **and**
   `npm test` (`vitest run`) passing. If it cannot get green: commit what exists, open the
   PR as a **draft**, and state plainly in the body why it isn't done. Never present broken
   work as finished.
6. **Push branch → open PR.** Branch namespace `night/<phase>-<slug>` so it never collides
   with Kate's or Codex's branches. Netlify builds the deploy preview and posts the URL on
   the PR. PR body includes: what was built, which phase/item, the item's QA checklist from
   `NEXT_PHASES.md` ticked, the preview URL, and any taste calls flagged for Kate's eye.
7. **Morning brief.** A concise digest delivered **first thing** (see §7a): what's on preview
   with links, what was skipped and why, what decisions Kate now owes.

## 7a. Morning brief delivery (decided 2026-07-07)

Kate wants a summary waiting first thing. Best practice for a brief read before she's at her
desk is **email** — so the default is a short morning email each build night (subject like
"Night Gardener · 1 preview ready", body = what shipped to preview + links + anything she owes
a decision on). Needs a one-time Gmail connection. **Fallback** if she'd rather not connect
Gmail: the same digest committed as `MORNING-BRIEF.md` on the branch, which she reads when she
opens the repo. The PR body always carries the full detail regardless.

## 5. Safety spine (non-negotiable invariants)

- Never pushes to `main`; never triggers a production deploy. Kate promotes.
- Never starts a Kate-gated item.
- Never invents work — queue only; empty queue → stop.
- Build+tests green, or it's a **draft** PR with an honest note.
- Exactly one item per night — bounded blast radius, bounded credit spend.
- Branches under `night/…` only; never commits to or rebases another agent's branch;
  cuts fresh from `origin/main` each run so it can't clobber in-flight local/Codex work.

## 6. Work queue & state

**Division of labour (decided 2026-07-07):** The Night Gardener builds **approved Forager
ideas only**. `docs/NEXT_PHASES.md` is **Codex's lane** — the Night Gardener does not touch
it. This removes any priority conflict: its only source of build work is the ideas board.

- **Source of truth for *what* to build:** items in `docs/ideas-board.md` marked
  `approved` and ready to build (content-type ideas, or feature ideas that have been spec'd).
  Highest payoff-vs-effort score first.
- **State file:** `docs/night-gardener-queue.md` — the agent's memory between nights.
  Records: which approved idea is next, which are done (with PR link + preview URL + date),
  which are blocked (build failing, or awaiting a Kate decision), and the last run's outcome.
  The agent updates this file as part of each run and commits it on its branch.
- Kate can re-order or veto by editing the board or this file; the agent obeys as written.

## 7. Cadence

**Weeknights, Sun–Thu** (i.e. before each work/school day; quiet Fri/Sat). Because the
pre-check bails cheaply on empty nights, scheduling more nights does not waste credits —
only nights with real queued work cost a full run. Timezone: Kate's local (UK).

## 8. Mechanism

A **scheduled cloud agent / routine** (managed via the `/schedule` skill) running against
the connected GitHub repo. It has GitHub access to push `night/…` branches and open PRs.
Netlify's existing GitHub integration auto-builds a deploy preview per PR and comments the
URL. No new production wiring; previews are additive and never touch `main`.

## 9. Dependencies to confirm at build time

1. Cloud routine has push + PR permission on `katecreates11/whattosow` (GitHub auth).
2. Netlify **Deploy Previews** are enabled for PRs (default for GitHub-linked sites; verify).
3. Schedule timezone set to UK.
4. First-run seeding of `docs/night-gardener-queue.md` from the current `NEXT_PHASES.md`
   state (Phase 1 = `/sow` redesign per the last handover, unless Kate re-points it).

## 10. Failure & edge handling

- **Can't build green:** draft PR + honest note; do not merge-signal; update state file "blocked: build".
- **Next item is gated:** skip, record the pending decision, take next un-gated item; if *all*
  remaining items are gated → stop and report "everything left needs you."
- **Empty / exhausted queue:** stop, report; do not invent work.
- **Previous night's PR still open:** **wait** (decided 2026-07-07). One open Night Gardener
  PR at a time — never stack unreviewed work. If last night's PR is unmerged, the agent skips
  building and just sends a brief nudge ("still one preview waiting for you").
- **Taste uncertainty:** when a copy/design call is genuinely a judgement Kate would want,
  build the safe version and *flag it in the PR* rather than guessing boldly.

## 11. Success criteria

- On a queued weeknight, Kate wakes to a PR with a working preview URL of one real
  advance, QA checklist ticked, nothing live she didn't promote.
- On an empty night, no run of consequence and no spurious PR.
- Zero production deploys initiated by the agent. Ever.
- No `ANTI_PATTERNS.md` / lyricism-ceiling violations reach a PR Kate approves (measured by
  Kate's review; repeated misses feed back into the guardrail docs).

## 12. Decisions (settled 2026-07-07)

- **Queue = approved Forager ideas only; NEXT_PHASES is Codex's** (§6).
- **One open PR at a time — wait, never stack** (§10).
- **Morning brief delivered first thing, email by default** (§7a).
- **Build the Forager first**, then the Night Gardener to consume its approved ideas.

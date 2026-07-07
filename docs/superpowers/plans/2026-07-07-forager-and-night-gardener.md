# The Forager + The Night Gardener — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up two paired scheduled cloud agents — The Forager (weekly, researches and pitches ideas) and The Night Gardener (weeknights, builds approved ideas to a preview PR) — with a human gate at each end.

**Architecture:** Two scheduled cloud routines running against `github.com/katecreates11/whattosow`. The Forager writes a ranked shortlist to `docs/ideas-board.md`; Kate approves; the Night Gardener builds approved ideas on `night/…` branches and opens PRs with Netlify preview URLs. Neither touches `main`; neither both invents *and* ships. Codex separately owns `NEXT_PHASES.md`.

**Tech Stack:** Claude Code scheduled cloud agents (`/schedule`), GitHub, Netlify deploy previews, Next.js (`next build` + `vitest`), Gmail (morning brief), later Google Search Console API + umami API.

**Specs:** `docs/superpowers/specs/2026-07-07-the-forager-ideas-agent-design.md`, `docs/superpowers/specs/2026-07-07-night-gardener-design.md`

## Global Constraints

- **Neither agent ever pushes `main` or deploys to production.** Kate promotes.
- **The Forager proposes only** — never builds, codes, or ships.
- **The Night Gardener builds only `approved` ideas from `docs/ideas-board.md`.** `NEXT_PHASES.md` is Codex's lane — off-limits to the Night Gardener.
- **Evidence-required:** every Forager idea cites a real query/trend/gap/data point.
- **No re-pitching** anything on `docs/CUT_LIST.md` or marked `parked`/`binned` on the board.
- **Shortlist only:** 3–5 ranked ideas per Forager run.
- **One item per Night Gardener night; one open Night Gardener PR at a time (wait, never stack).**
- **Build gate:** Night Gardener work must pass `npm run build` + `npm test` green, or it's a draft PR with an honest note.
- **On-brand always:** both agents obey `PROJECT_CONTEXT.md`, `docs/DIRECTION.md` (incl. "never become"), `docs/ANTI_PATTERNS.md`, `docs/COPY_REWRITES.md` (**lyricism ceiling — never personify nature**), voice rules, `CLAUDE.md` brand colours.
- **Branches only:** Forager → `ideas/…`; Night Gardener → `night/…`; each cut fresh from `origin/main`; never commit onto another agent's branch.
- **Morning brief** delivered first thing (email default; committed `MORNING-BRIEF.md` fallback).

**Legend:** each task is tagged **[Kate action]** (you grant access / connect an account / decide / review) or **[Claude action]** (I do the wiring). Kate-action tasks are walked through live, one at a time.

---

## PHASE A — The Forager, launch version (web + repo + notes, no auth)

### Task 1: The Forager's operating instructions — [Claude action]

**Files:**
- Create: `docs/agents/forager.md`

The reusable brief the Sunday routine runs. Encodes senses, run steps, output format, guardrails — pointing at the canonical docs rather than duplicating them.

- [ ] **Step 1: Write `docs/agents/forager.md`** with these sections:
  - **Mission:** once a week, research and pitch 3–5 ranked, evidence-backed ideas to `docs/ideas-board.md`. Propose only — never build or ship.
  - **Before anything, read:** `PROJECT_CONTEXT.md`, `docs/DIRECTION.md`, `docs/ANTI_PATTERNS.md`, `docs/COPY_REWRITES.md`, `docs/CUT_LIST.md`, `CLAUDE.md`, `status.md`, `NEXT_PHASES.md`, the affiliate backlog, and the current `docs/ideas-board.md` (past verdicts — never re-pitch parked/binned/cut).
  - **Senses (use whatever is live):** open web (competitors, r/GardeningUK & forums, Google Trends, what's coming into season); the repo inventory (existing pages/crops/guides → find gaps); Kate's notes/backlog. *(Search Console + umami added in Phase B.)*
  - **Run steps:** load world → research live senses → find gaps weighted to the next 4–8 weeks of seasonality → draft 3–5 ranked cards → write board + Monday brief.
  - **Card format & ranking:** exactly the template in Task 2.
  - **Guardrails:** the Global Constraints above, verbatim intent.
  - **Output discipline:** branch `ideas/weekly-<date>`, never `main`; commit only the board (+ MORNING-BRIEF.md if file-fallback).
- [ ] **Step 2: Verify against spec** — reread §5–§8 of the Forager spec; confirm every sense, guardrail, and the card format are represented. Fix gaps inline.
- [ ] **Step 3: Commit**
```bash
git add docs/agents/forager.md
git commit -m "feat: Forager operating instructions"
```

### Task 2: The ideas board — [Claude action]

**Files:**
- Create: `docs/ideas-board.md`

- [ ] **Step 1: Write the board** with a header explaining it, a status key, a blank card template, and an empty "Proposed" section. Card template:
```markdown
### [Idea title]
- **Type:** content | feature | monetisation
- **Status:** proposed        <!-- Kate sets: approved | parked | binned -->
- **Score:** payoff/effort (e.g. High payoff / Low effort)
- **Evidence:** <the real query, trend, gap, or data point that prompted this>
- **Pitch:** <what to make and why it wins>
- **Ready-to-queue brief (content only):** target query · angle · internal links · voice notes
- **Added:** YYYY-MM-DD · **Run:** <forager run id>
```
Status key: `proposed` (awaiting Kate) · `approved` (eligible for Night Gardener / action) · `parked` (not now, don't re-pitch) · `binned` (no, don't re-pitch). Feature-type approved ideas get an extra `needs-spec` note.
- [ ] **Step 2: Verify** the template carries every field the Night Gardener needs to build from (type, score, brief) and every field the Forager needs to avoid re-pitching (status).
- [ ] **Step 3: Commit**
```bash
git add docs/ideas-board.md
git commit -m "feat: seed the ideas board"
```

### Task 3: Connect the cloud agent to the repo — [Kate action, Claude guides]

Grant the scheduled cloud agent access to read the repo and push `ideas/…` branches.

- [ ] **Step 1 (Kate):** In Claude Code, connect GitHub for cloud agents and authorise access to `katecreates11/whattosow`. *Claude walks through the exact screens live.*
- [ ] **Step 2 (Claude):** Confirm the connection can read the tree and push a throwaway branch; delete the throwaway.
- [ ] **Step 3 (verify):** A test branch appears on GitHub and is then removed. If push is denied, resolve permissions before continuing.

### Task 4: Morning-brief channel — [Kate action, Claude guides]

- [ ] **Step 1 (Kate decides):** Email (recommended) or committed-file fallback.
- [ ] **Step 2a (if email, Kate + Claude):** Connect Gmail; Claude sends a one-line test email to `scrumpykate@gmail.com`.
- [ ] **Step 2b (if file):** No setup — the brief is committed as `MORNING-BRIEF.md` on the `ideas/…` branch. Skip to verify.
- [ ] **Step 3 (verify):** Test email received, or fallback confirmed chosen. Record the choice in `docs/agents/forager.md`.

### Task 5: Dry-run the Forager once — [Claude action, Kate watching] ← KEY GATE

Prove it produces good, on-brand, evidenced ideas *before* it runs unattended.

- [ ] **Step 1 (Claude):** Manually run the Forager brief once against the repo (phase-1 senses), producing a real shortlist to `docs/ideas-board.md` on `ideas/weekly-<date>` + a draft Monday brief.
- [ ] **Step 2 (Kate reviews):** Read the shortlist. Check: are ideas evidence-backed? On-voice (no personified nature)? Not re-pitching cut/parked items? Genuinely useful?
- [ ] **Step 3 (iterate):** Fix any drift by editing `docs/agents/forager.md` (tighten guardrails/output) and re-run until Kate is happy. **Do not schedule until this passes.**
- [ ] **Step 4 (verify):** Kate signs off on one real, quality shortlist.

### Task 6: Schedule the weekly run — [Claude action]

- [ ] **Step 1:** Use the `/schedule` skill to register the Forager routine: prompt = "follow `docs/agents/forager.md`", repo = `katecreates11/whattosow`, cadence = **Sunday weekly**, timezone = UK.
- [ ] **Step 2 (verify):** `/schedule` list shows the routine active with the right cadence/timezone. Confirm the next fire time is the coming Sunday.
- [ ] **Step 3:** Note the routine id in `docs/agents/forager.md`.

**→ Milestone: The Forager is live. Kate gets a Monday shortlist and approves ideas on the board.**

---

## PHASE B — The Forager's sharper senses (fast-follow, after Phase A proven)

### Task 7: Search Console access — [Kate action, Claude guides]

- [ ] **Step 1 (Kate + Claude, live walkthrough):** Create a Google Cloud project, enable the Search Console API, create a credential (service account or OAuth), and grant it read access to the `whattosow.co.uk` property. Store the credential as a routine secret.
- [ ] **Step 2 (Claude):** Verify the agent can pull one real query row (e.g. top 5 queries by impressions).
- [ ] **Step 3 (verify):** A real Search Console query list comes back. If auth is fiddly, park to next session — Phase A still runs without it.

### Task 8: umami access — [Kate action, Claude guides]

- [ ] **Step 1 (Kate):** Copy an API token from the umami dashboard; hand it over to store as a routine secret.
- [ ] **Step 2 (Claude):** Verify the agent can read one metric (e.g. top pages last 30 days + `affiliate-click` count).
- [ ] **Step 3 (verify):** A real umami metric comes back.

### Task 9: Teach the Forager its new senses — [Claude action]

- [ ] **Step 1:** Update `docs/agents/forager.md` — move Search Console + umami from "Phase B" into live senses, with how to use each (near-miss queries, high-impression/low-click pages; converting pages/links).
- [ ] **Step 2 (verify):** Dry-run once; confirm at least one card now cites Search Console or umami evidence.
- [ ] **Step 3: Commit**
```bash
git add docs/agents/forager.md
git commit -m "feat: Forager phase-2 senses (Search Console + umami)"
```

---

## PHASE C — The Night Gardener (built after the Forager is feeding it)

### Task 10: The Night Gardener's operating instructions — [Claude action]

**Files:**
- Create: `docs/agents/night-gardener.md`

- [ ] **Step 1: Write it** with: mission (build one approved idea per weeknight → preview PR); pre-check (read `docs/ideas-board.md` for `approved` build-ready ideas + `docs/night-gardener-queue.md`; if none, or a Night Gardener PR is still open, **stop** and send a one-line nudge); read-the-guardrails step; build steps; the build gate (`npm run build` + `npm test`, else draft PR); push `night/…` branch → open PR (body = what/which idea/QA checklist/preview URL/taste flags); update queue state; morning brief. Encode every Global Constraint.
- [ ] **Step 2: Verify against** the Night Gardener spec §4–§10. Fix gaps.
- [ ] **Step 3: Commit**
```bash
git add docs/agents/night-gardener.md
git commit -m "feat: Night Gardener operating instructions"
```

### Task 11: The queue state file — [Claude action]

**Files:**
- Create: `docs/night-gardener-queue.md`

- [ ] **Step 1: Write** an empty state file: sections for "Next up", "Done (PR + preview + date)", "Blocked (reason)", "Last run".
- [ ] **Step 2: Commit**
```bash
git add docs/night-gardener-queue.md
git commit -m "feat: seed Night Gardener queue state"
```

### Task 12: Confirm Netlify deploy previews — [Kate action, Claude guides]

- [ ] **Step 1 (Kate + Claude):** In Netlify → site → Build & deploy → Deploy Previews, confirm previews are enabled for pull requests. Toggle on if not.
- [ ] **Step 2 (verify):** Open a trivial test PR; confirm Netlify posts a working preview URL; close the PR.

### Task 13: Dry-run the Night Gardener on one approved idea — [Claude action, Kate watching] ← KEY GATE

- [ ] **Step 1 (Kate):** Mark one Forager idea `approved` on the board.
- [ ] **Step 2 (Claude):** Manually run the Night Gardener brief once: build that idea on `night/…`, pass the build gate, open a PR.
- [ ] **Step 3 (Kate reviews):** Open the Netlify **preview URL** — does it look right, on-voice, live-quality? Is `main` untouched?
- [ ] **Step 4 (iterate):** Fix drift in `docs/agents/night-gardener.md`; re-run until Kate is happy. **Do not schedule until this passes.**
- [ ] **Step 5 (verify):** Kate confirms a real preview PR of an approved idea, `main` clean.

### Task 14: Schedule the weeknight runs — [Claude action]

- [ ] **Step 1:** Use `/schedule` to register the Night Gardener routine: prompt = "follow `docs/agents/night-gardener.md`", repo = `katecreates11/whattosow`, cadence = **Sun–Thu nights**, timezone = UK.
- [ ] **Step 2 (verify):** `/schedule` list shows it active with the right cadence/timezone.
- [ ] **Step 3:** Note the routine id in `docs/agents/night-gardener.md`.

**→ Milestone: full pipeline live. Forager pitches Monday → Kate approves → Night Gardener builds weeknights → Kate promotes previews to live.**

---

## Self-review notes

- **Spec coverage:** Forager senses (T1/T9), board+handoff (T2, T5, T13), guardrails (Global + T1/T10), cadence (T6/T14), morning brief (T4), Codex division (Global + T10). Night Gardener build gate, one-PR-wait, preview-PR, never-main (Global + T10/T12/T13). Covered.
- **No auth blocks launch:** Phase A needs only GitHub + (optional) Gmail; Phase B senses are additive.
- **Verification is real:** dry-runs (T5, T13), test email (T4), test PR/preview (T12), live query pulls (T7/T8) — not synthetic tests.

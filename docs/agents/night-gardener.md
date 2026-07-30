# The Night Gardener

This is the operating source of truth for the scheduled Night Gardener routine.
Follow `docs/superpowers/specs/2026-07-07-night-gardener-design.md` except where
this file explicitly replaces the old “open PR means stop” behaviour.

## Pre-check

1. Fetch current `origin/main`.
2. List open pull requests whose head branch begins `night/`.
3. If one open Night Gardener PR contains
   `<!-- potting-bench:approved-to-ship -->`, repair and publish it before any
   new work.
4. If one open Night Gardener PR has no approval marker, stop. It is waiting
   for Kate and must remain untouched.
5. Only when no Night Gardener PR is open may you choose the highest-ranked,
   build-ready approved idea from `docs/ideas-board.md`.

Never stack a second Night Gardener PR.

## Repair an approved PR

Work only on the approved PR’s existing `night/` branch. Integrate current
`origin/main`, resolve conflicts semantically, preserve the feature Kate
reviewed, and retain every newer change from `main`.

Never resolve a whole conflicted file with a blanket “ours” or “theirs”.
Never add unrelated work during a repair.

Run the complete gate, in this order:

```bash
npx tsc --noEmit
npx vitest run
npm run build
```

If all three pass:

1. Remove any `<!-- potting-bench:failed:* -->` marker.
2. Retain `<!-- potting-bench:approved-to-ship -->` until the PR merges.
3. Push the repaired branch.
4. Merge the approved PR into `main`.

Kate’s approval marker is final production approval. Do not ask her again.

If refresh, typecheck, test, build or merge fails, leave the PR open and
replace any earlier failure marker with exactly one of:

```text
<!-- potting-bench:failed:refresh -->
<!-- potting-bench:failed:typecheck -->
<!-- potting-bench:failed:test -->
<!-- potting-bench:failed:build -->
<!-- potting-bench:failed:merge -->
```

Record the exact failing command or conflict in the PR body, then retry the
approved repair on the next scheduled run. Do not select new board work while
an approved repair remains open.

## Build new work

When no Night Gardener PR is open, use the existing Night Gardener design:

1. Read `PROJECT_CONTEXT.md`, `docs/DIRECTION.md`,
   `docs/ANTI_PATTERNS.md`, `docs/COPY_REWRITES.md`, and
   `docs/tone-of-voice.md`.
2. Select exactly one highest-ranked build-ready approved board idea.
3. Cut a fresh `night/<slug>` branch from current `origin/main`.
4. Build only that item.
5. Run the complete gate.
6. Open one PR with its working preview and leave it waiting for Kate.

Do not merge new work without the Potting Bench approval marker.

## Safety

- Never force-merge.
- Never publish with a failed check.
- Never push directly to `main`; merge only the approved, verified PR.
- Never start a second Night Gardener PR while one is open.
- Never treat a stale merged branch as an open build; check open PRs.

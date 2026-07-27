# Potting Bench ship recovery — design

**Date:** 2026-07-27  
**Status:** Approved by Kate  
**Scope:** The Potting Bench handoff from an approved Night Gardener preview to production

## Problem

The Potting Bench currently treats a GitHub merge conflict as a dead end. When Kate taps
**Ship it**, the API tries one direct merge into `main`; GitHub returns `409` if the Night
Gardener branch is stale, and the page says the build “needs the laptop”.

That failure also blocks the rest of the queue. The Night Gardener was instructed to stop
whenever one of its pull requests remains open, so the conflicted pull request is neither
repaired nor replaced and newly approved ideas accumulate behind it.

Pull request #2 (`night/autumn-garlic-onion-hub`) is the current instance of this deadlock.

## Product decision

Tapping **Ship it** is Kate's final production approval.

If the approved branch is already mergeable, it may publish immediately. If it needs to be
refreshed or repaired first, the approval remains valid: after the repair and all required
checks pass, the result publishes automatically without a second approval and without Kate
using a laptop.

The repaired build must preserve the feature Kate reviewed. Repairing means integrating it
with the current site, not redesigning it or adding unrelated work.

## Chosen approach: approval queue

The Bench will turn **Ship it** into a durable approval rather than a single merge attempt.

1. Validate that the request names an open pull request whose head branch begins `night/`.
2. Record the approval as a hidden `<!-- potting-bench:approved-to-ship -->` marker in the
   pull-request body.
3. Attempt the safe, immediate merge.
4. If GitHub reports that the branch needs updating or has conflicts, keep the pull request
   open and return a queued state to the Bench.
5. The Night Gardener treats an approved open pull request as its highest-priority job. It
   refreshes or repairs that same branch against current `main`, runs the full verification
   gate, and merges it only when green.
6. Merging to `main` triggers the normal production deployment.

The approval record must survive page refreshes and deployments. It cannot live only in
React state or server memory. Updating the pull-request body requires the deployment's
fine-grained GitHub token to have **Pull requests: read and write**; no broader repository
permission is required.

## Bench experience

An open Night Gardener build has one of three states:

- **Ready to review:** preview link and **Ship it** button are available.
- **Approved and being prepared:** Kate has tapped **Ship it**; the card stays visible with
  calm copy such as “Approved — refreshing it against today’s site, then publishing.”
- **Unable to publish:** automated repair or verification failed. The card names the failed
  stage in plain language and offers **Try again**. It must not say that a laptop is required.

For an immediately mergeable build, the existing success message remains appropriate:
“Shipped — live in a couple of minutes.”

Repeated taps must be safe. They must not create duplicate approval records, duplicate
comments, or multiple merge attempts that change the final result.

The Night Gardener records a failure by replacing any earlier hidden status marker in the
pull-request body with `<!-- potting-bench:failed:<stage> -->`, where `<stage>` is one of
`refresh`, `typecheck`, `test`, `build`, or `merge`. A successful retry removes the failure
marker while retaining the approval marker until the pull request merges.

## Night Gardener behaviour

The missing repository operating file `docs/agents/night-gardener.md` will be added as the
source of truth the scheduled Night Gardener was intended to follow.

At the start of every run:

1. Look for an open `night/` pull request.
2. If it carries Kate's ship approval, repair and publish it before considering new work.
3. If it has no ship approval, leave it waiting for Kate and do not stack another preview.
4. Only when no Night Gardener pull request is open may the agent select the next approved
   idea.

Repair means bringing the branch onto current `origin/main`, resolving conflicts
semantically, and retaining newer production changes. The agent then runs:

```text
npx tsc --noEmit
npx vitest run
npm run build
```

If all checks pass, it merges the approved pull request to `main`. If any check fails, it
leaves the pull request open, records the exact failed stage for the Bench, and tries the
repair again on its next scheduled run. It never force-pushes over unrelated work and never
publishes a red build.

## Current blocked build

Pull request #2 will be repaired once as part of this work:

- recreate its intended garlic-and-onion guide changes on top of current `origin/main`;
- retain all newer board decisions, guide-index entries, sitemap entries and other work;
- run the full verification gate;
- provide Kate with a working preview of the repaired branch;
- use the new approval flow to publish after Kate taps **Ship it**.

This one-off repair clears the deadlock; it does not bypass the new durable workflow.

## Security and scope

- The private Bench remains protected by `BENCH_KEY`.
- GitHub mutations remain restricted to the configured repository.
- Only open pull requests from `night/` branches can receive a ship approval through this
  endpoint.
- The server derives pull-request identity and current state from GitHub; it does not trust
  a client-supplied title, URL, mergeability result, or arbitrary branch.
- Approval does not waive tests, permit force-merging, or authorize unrelated changes.
- Existing uncommitted work in Kate's workspace is not used, overwritten, staged or
  committed. Implementation and repair happen in a clean worktree from current
  `origin/main`.

## Verification

Automated coverage will prove:

- only open `night/` pull requests can enter the ship flow;
- a clean build merges immediately;
- a conflict records one durable approval and returns the queued state;
- repeated taps are idempotent;
- GET returns ready, queued and failed states correctly;
- the client renders the right action and copy for each state;
- a failed verification cannot merge;
- existing Potting Bench verdict and Dreamer behaviour continues to pass.

The final browser check will cover the private mobile Bench journey: open the page, preview
the Night Gardener build, tap **Ship it**, see immediate or queued confirmation, refresh the
page without losing that state, and confirm that a successfully repaired build disappears
after publication.

## Not included

- Redesigning the Potting Bench.
- Allowing more than one unreviewed Night Gardener pull request.
- Force-merging conflicts or skipping checks.
- Moving hosting from Netlify to Cloudflare; that remains the separately approved migration
  and will consume host-independent preview links after this workflow is stable.

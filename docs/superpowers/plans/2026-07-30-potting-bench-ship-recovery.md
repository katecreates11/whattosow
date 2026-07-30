# Potting Bench Ship Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make a Potting Bench **Ship it** tap durable so a stale Night Gardener build is repaired, verified and published without Kate using a laptop or approving twice.

**Architecture:** Store Kate's approval and repair status as hidden markers in the Night Gardener pull request body. Keep the Next.js route responsible for GitHub authentication and mutations, put marker parsing/editing in a pure tested module, and teach the scheduled Night Gardener to repair an approved open PR before considering new work. Repair PR #2 on top of current `origin/main` and deliver the Bench fix and garlic guide together as one reviewed preview and one production deploy.

**Tech Stack:** Next.js App Router, React, TypeScript, GitHub REST API, Vitest, Netlify deploy previews

## Global Constraints

- Tapping **Ship it** is Kate's final production approval.
- A repaired build publishes automatically after `npx tsc --noEmit`, `npx vitest run`, and `npm run build` all pass.
- Never force-merge or publish a red build.
- Only open pull requests whose head branch starts with `night/` are shippable.
- Keep `BENCH_KEY` authentication and restrict all GitHub mutations to `katecreates11/whattosow`.
- Repeated taps are idempotent.
- Preserve the feature Kate reviewed and every newer change already on `main`.
- Do not stage, commit, overwrite or copy Kate's unrelated uncommitted workspace files.
- Work in a clean worktree created from the current GitHub `main`.
- Batch the repaired guide and Potting Bench recovery into one preview and one deploy.
- Never push without Kate's explicit say.

## File map

- Create `src/lib/bench-ship.ts`: pure parsing and editing of durable pull-request markers.
- Create `src/lib/bench-ship.test.ts`: marker-state, idempotency and failure-stage coverage.
- Modify `src/app/api/bench/route.ts`: return build state; validate the PR server-side; record approval; merge or queue.
- Create `src/app/api/bench/route.test.ts`: mocked-GitHub route coverage for clean, conflicted, invalid and repeated ship requests.
- Modify `src/app/bench/BenchClient.tsx`: send a PR number and render ready, queued and failed states.
- Create `docs/agents/night-gardener.md`: repository-owned operating instructions, including repair-before-new-work.
- Modify the six existing PR #2 files only as required to replay the garlic guide on current `main`.
- Include the approved design and this plan in the repaired branch so the workflow remains documented.

---

### Task 1: Create an isolated repair branch

**Files:**
- No product files changed

**Interfaces:**
- Consumes: remote refs `origin/main` and `origin/night/autumn-garlic-onion-hub`
- Produces: clean worktree `/private/tmp/whattosow-potting-bench` on branch `codex/potting-bench-recovery`

- [ ] **Step 1: Inspect worktrees and refresh remote refs**

Run:

```bash
git worktree list
git fetch origin main night/autumn-garlic-onion-hub
```

Expected: fetch succeeds and Kate's original workspace remains unchanged.

- [ ] **Step 2: Create the clean worktree**

Run:

```bash
git worktree add -b codex/potting-bench-recovery /private/tmp/whattosow-potting-bench origin/main
git -C /private/tmp/whattosow-potting-bench status --short
```

Expected: the second command prints nothing.

- [ ] **Step 3: Copy only the two approved documentation commits**

Run:

```bash
git -C /private/tmp/whattosow-potting-bench cherry-pick 4a35f36
cp /Users/kateallen/whattosow/docs/superpowers/plans/2026-07-30-potting-bench-ship-recovery.md /private/tmp/whattosow-potting-bench/docs/superpowers/plans/2026-07-30-potting-bench-ship-recovery.md
git -C /private/tmp/whattosow-potting-bench add docs/superpowers/plans/2026-07-30-potting-bench-ship-recovery.md
git -C /private/tmp/whattosow-potting-bench commit -m "Plan Potting Bench ship recovery"
```

Expected: only the approved design and implementation plan are added.

---

### Task 2: Add durable pull-request state markers

**Files:**
- Create: `src/lib/bench-ship.ts`
- Test: `src/lib/bench-ship.test.ts`

**Interfaces:**
- Produces:
  - `type BuildState = "ready" | "queued" | "failed"`
  - `type FailureStage = "refresh" | "typecheck" | "test" | "build" | "merge"`
  - `readBuildState(body: string | null): { state: BuildState; failureStage?: FailureStage }`
  - `approveBuild(body: string | null): string`
  - `markBuildFailed(body: string | null, stage: FailureStage): string`
  - `clearBuildFailure(body: string | null): string`

- [ ] **Step 1: Write failing marker tests**

Create `src/lib/bench-ship.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  approveBuild,
  clearBuildFailure,
  markBuildFailed,
  readBuildState,
} from "./bench-ship";

describe("Potting Bench ship markers", () => {
  it("treats an ordinary PR as ready", () => {
    expect(readBuildState("## Preview")).toEqual({ state: "ready" });
  });

  it("records approval once and reports queued", () => {
    const once = approveBuild("## Preview");
    const twice = approveBuild(once);
    expect(twice).toBe(once);
    expect(once.match(/potting-bench:approved-to-ship/g)).toHaveLength(1);
    expect(readBuildState(once)).toEqual({ state: "queued" });
  });

  it("records the exact failed stage while retaining approval", () => {
    const failed = markBuildFailed(approveBuild("## Preview"), "build");
    expect(readBuildState(failed)).toEqual({
      state: "failed",
      failureStage: "build",
    });
    expect(failed).toContain("potting-bench:approved-to-ship");
  });

  it("replaces an earlier failure and can clear it for retry", () => {
    const failed = markBuildFailed(
      markBuildFailed(approveBuild("## Preview"), "test"),
      "merge",
    );
    expect(failed.match(/potting-bench:failed:/g)).toHaveLength(1);
    expect(readBuildState(clearBuildFailure(failed))).toEqual({
      state: "queued",
    });
  });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npx vitest run src/lib/bench-ship.test.ts
```

Expected: FAIL because `./bench-ship` does not exist.

- [ ] **Step 3: Implement the pure marker module**

Create `src/lib/bench-ship.ts`:

```ts
export type BuildState = "ready" | "queued" | "failed";
export type FailureStage =
  | "refresh"
  | "typecheck"
  | "test"
  | "build"
  | "merge";

const APPROVED = "<!-- potting-bench:approved-to-ship -->";
const FAILURE = /(?:\r?\n)?<!-- potting-bench:failed:(refresh|typecheck|test|build|merge) -->/g;

export function readBuildState(
  body: string | null,
): { state: BuildState; failureStage?: FailureStage } {
  const text = body ?? "";
  const failure = [...text.matchAll(FAILURE)][0]?.[1] as
    | FailureStage
    | undefined;
  if (failure) return { state: "failed", failureStage: failure };
  if (text.includes(APPROVED)) return { state: "queued" };
  return { state: "ready" };
}

export function clearBuildFailure(body: string | null): string {
  return (body ?? "").replace(FAILURE, "").trimEnd();
}

export function approveBuild(body: string | null): string {
  const text = clearBuildFailure(body);
  if (text.includes(APPROVED)) return text;
  return `${text}${text ? "\n\n" : ""}${APPROVED}`;
}

export function markBuildFailed(
  body: string | null,
  stage: FailureStage,
): string {
  const text = approveBuild(body);
  return `${text}\n<!-- potting-bench:failed:${stage} -->`;
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```bash
npx vitest run src/lib/bench-ship.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit the marker unit**

Run:

```bash
git add src/lib/bench-ship.ts src/lib/bench-ship.test.ts
git commit -m "Add durable Potting Bench ship state"
```

---

### Task 3: Make the Bench API approve, merge or queue safely

**Files:**
- Modify: `src/app/api/bench/route.ts`
- Create: `src/app/api/bench/route.test.ts`

**Interfaces:**
- Consumes: `approveBuild()` and `readBuildState()` from Task 2
- Produces:
  - `Build.state: "ready" | "queued" | "failed"`
  - `Build.failureStage?: FailureStage`
  - POST body `{ k: string; ship: number }`
  - successful immediate response `{ ok: true, status: "shipped", number: number }`
  - accepted repair response with HTTP 202 and `{ ok: true, status: "queued", number: number }`

- [ ] **Step 1: Write mocked-GitHub route tests**

Create `src/app/api/bench/route.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function githubJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function shipRequest(number: number): NextRequest {
  return new NextRequest("http://localhost/api/bench", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ k: "test-key", ship: number }),
  });
}

describe("Potting Bench ship API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env.BENCH_KEY = "test-key";
    process.env.GITHUB_TOKEN = "test-token";
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    delete process.env.BENCH_KEY;
    delete process.env.GITHUB_TOKEN;
    vi.unstubAllGlobals();
  });

  it("rejects a PR whose branch is not night/", async () => {
    fetchMock.mockResolvedValueOnce(
      githubJson({
        state: "open",
        body: "## Preview",
        head: { ref: "feature/nope", sha: "head-sha" },
      }),
    );

    const response = await POST(shipRequest(7));

    expect(response.status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("records approval before merging a clean Night Gardener PR", async () => {
    fetchMock
      .mockResolvedValueOnce(
        githubJson({
          state: "open",
          body: "## Preview",
          head: { ref: "night/guide", sha: "head-sha" },
        }),
      )
      .mockResolvedValueOnce(githubJson({}))
      .mockResolvedValueOnce(githubJson({ merged: true }));

    const response = await POST(shipRequest(2));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toMatchObject({ ok: true, status: "shipped", number: 2 });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    const approval = fetchMock.mock.calls[1];
    expect(approval[0]).toContain("/pulls/2");
    expect(approval[1]?.method).toBe("PATCH");
    expect(JSON.parse(String(approval[1]?.body)).body).toContain(
      "<!-- potting-bench:approved-to-ship -->",
    );
    expect(fetchMock.mock.calls[2][0]).toContain("/pulls/2/merge");
  });

  it("returns queued after approval when GitHub cannot merge yet", async () => {
    fetchMock
      .mockResolvedValueOnce(
        githubJson({
          state: "open",
          body: "## Preview",
          head: { ref: "night/guide", sha: "head-sha" },
        }),
      )
      .mockResolvedValueOnce(githubJson({}))
      .mockResolvedValueOnce(githubJson({ merged: false }, 405));

    const response = await POST(shipRequest(2));

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      status: "queued",
      number: 2,
    });
  });

  it("keeps repeated approval idempotent", async () => {
    fetchMock
      .mockResolvedValueOnce(
        githubJson({
          state: "open",
          body: "## Preview\n\n<!-- potting-bench:approved-to-ship -->",
          head: { ref: "night/guide", sha: "head-sha" },
        }),
      )
      .mockResolvedValueOnce(githubJson({ merged: false }, 405));

    const response = await POST(shipRequest(2));

    expect(response.status).toBe(202);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain("/pulls/2/merge");
  });
});
```

- [ ] **Step 2: Run the route test and verify RED**

Run:

```bash
npx vitest run src/app/api/bench/route.test.ts
```

Expected: FAIL because the route still accepts a branch string and does not persist approval.

- [ ] **Step 3: Extend `Build` and `openBuilds()`**

Import:

```ts
import {
  approveBuild,
  readBuildState,
  type BuildState,
  type FailureStage,
} from "@/lib/bench-ship";
```

Change the interface to:

```ts
export interface Build {
  number: number;
  title: string;
  branch: string;
  date: string;
  previewUrl: string;
  state: BuildState;
  failureStage?: FailureStage;
}
```

Include `body: string | null` in the GitHub pull type and spread
`readBuildState(p.body)` into each mapped build.

- [ ] **Step 4: Replace the branch-based ship block**

Change the POST body type to use `ship?: number`. For a ship request:

```ts
if (body.ship !== undefined) {
  const number = body.ship;
  if (!Number.isInteger(number) || number <= 0) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const prRes = await fetch(`${GH}/pulls/${number}`, {
      headers: ghHeaders(),
      cache: "no-store",
    });
    if (!prRes.ok) {
      return NextResponse.json({ error: "build not found" }, { status: 404 });
    }

    const pr = (await prRes.json()) as {
      state: string;
      body: string | null;
      head: { ref: string; sha: string };
    };
    if (pr.state !== "open" || !pr.head.ref.startsWith(SHIPPABLE_PREFIX)) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    const approvedBody = approveBuild(pr.body);
    if (approvedBody !== (pr.body ?? "")) {
      const approvalRes = await fetch(`${GH}/pulls/${number}`, {
        method: "PATCH",
        headers: ghHeaders(),
        body: JSON.stringify({ body: approvedBody }),
      });
      if (!approvalRes.ok) {
        throw new Error(`GitHub approval write failed (${approvalRes.status})`);
      }
    }

    const mergeRes = await fetch(`${GH}/pulls/${number}/merge`, {
      method: "PUT",
      headers: ghHeaders(),
      body: JSON.stringify({
        sha: pr.head.sha,
        merge_method: "merge",
        commit_title: `bench: Kate shipped ${pr.head.ref} — live now`,
      }),
    });
    if (mergeRes.ok) {
      const result = (await mergeRes.json()) as { merged?: boolean };
      if (result.merged) {
        return NextResponse.json({ ok: true, status: "shipped", number });
      }
    }
    if ([405, 409, 422].includes(mergeRes.status)) {
      return NextResponse.json(
        { ok: true, status: "queued", number },
        { status: 202 },
      );
    }
    throw new Error(`GitHub merge failed (${mergeRes.status})`);
  } catch {
    return NextResponse.json(
      { error: "couldn't approve the build" },
      { status: 502 },
    );
  }
}
```

- [ ] **Step 5: Run focused API and marker tests**

Run:

```bash
npx vitest run src/lib/bench-ship.test.ts src/app/api/bench/route.test.ts
```

Expected: all tests pass.

- [ ] **Step 6: Commit the API recovery flow**

Run:

```bash
git add src/app/api/bench/route.ts src/app/api/bench/route.test.ts
git commit -m "Queue conflicted Potting Bench approvals"
```

---

### Task 4: Show durable build state on the mobile Bench

**Files:**
- Modify: `src/app/bench/BenchClient.tsx`

**Interfaces:**
- Consumes: `Build.state`, `Build.failureStage`, POST `{ ship: build.number }`
- Produces: ready, queued and failed card states without “needs the laptop” copy

- [ ] **Step 1: Change the ship request and response handling**

Send:

```ts
body: JSON.stringify({ k: key, ship: build.number }),
```

Handle responses:

```ts
const json = (await res.json()) as {
  status?: "shipped" | "queued";
};
if (res.ok && json.status === "shipped") {
  setBuilds((prev) => prev.filter((b) => b.number !== build.number));
  setToast("Shipped — live in a couple of minutes 🌱");
} else if (res.ok && json.status === "queued") {
  setBuilds((prev) =>
    prev.map((b) =>
      b.number === build.number ? { ...b, state: "queued" } : b,
    ),
  );
  setToast("Approved — the Night Gardener will repair it and publish it");
} else {
  setToast("Couldn't approve it just now — try again in a moment");
}
```

- [ ] **Step 2: Render state-specific copy and actions**

Use:

```ts
const FAILURE_COPY = {
  refresh: "It couldn't be refreshed against today's site.",
  typecheck: "A code check needs another pass.",
  test: "One of its checks failed.",
  build: "The fresh preview couldn't be built.",
  merge: "GitHub couldn't publish it after the checks passed.",
} as const;
```

For `queued`, replace the buttons with:

```tsx
<p className="mt-4 rounded-xl bg-white/60 px-4 py-3 text-sm text-earth">
  Approved — refreshing it against today&apos;s site, then publishing.
</p>
```

For `failed`, show the matching failure copy and a full-width **Try again** button that calls
`ship(b)`. For `ready`, retain **Preview** and **Ship it — take it live**.

- [ ] **Step 3: Prove the old dead-end copy is gone**

Run:

```bash
rg -n "needs the laptop|clashes with main" src/app/bench/BenchClient.tsx
npx tsc --noEmit
```

Expected: `rg` returns no matches and typecheck exits 0.

- [ ] **Step 4: Commit the mobile state UI**

Run:

```bash
git add src/app/bench/BenchClient.tsx
git commit -m "Show Potting Bench repair progress"
```

---

### Task 5: Add the missing Night Gardener recovery instructions

**Files:**
- Create: `docs/agents/night-gardener.md`

**Interfaces:**
- Consumes: hidden PR markers from Task 2
- Produces: one unambiguous scheduled-agent routine

- [ ] **Step 1: Write the operating file**

Create `docs/agents/night-gardener.md` with these mandatory sections and commands:

```markdown
# The Night Gardener

Follow `docs/superpowers/specs/2026-07-07-night-gardener-design.md` except where this
operating file explicitly replaces the old "open PR means stop" behaviour.

## Pre-check

1. Fetch current `origin/main` and list open pull requests whose branch begins `night/`.
2. If one open Night Gardener PR contains
   `<!-- potting-bench:approved-to-ship -->`, repair and publish it before any new work.
3. If one open Night Gardener PR has no approval marker, stop. It is waiting for Kate.
4. Only when no Night Gardener PR is open may you choose the highest-ranked build-ready
   approved board idea.

## Repair an approved PR

Work only on the approved PR's existing `night/` branch. Integrate current `origin/main`,
resolve conflicts semantically, preserve the reviewed feature and retain every newer main
change. Never use a blanket "ours" or "theirs" resolution.

Run, in order:

`npx tsc --noEmit`
`npx vitest run`
`npm run build`

If all three pass, remove any `potting-bench:failed:*` marker, push the repaired branch,
then merge the approved PR into `main`. Kate's approval marker is final approval; do not ask
again. If refresh, typecheck, test, build or merge fails, leave the PR open and replace its
failure marker with the exact stage. Retry it on the next scheduled run.

## Safety

Never force-merge. Never publish with a failed check. Never add unrelated work during a
repair. Never start a second Night Gardener PR while one is open.
```

- [ ] **Step 2: Check the new rule replaces the deadlock**

Run:

```bash
rg -n "approved-to-ship|repair and publish|do not ask again|Never force-merge" docs/agents/night-gardener.md
```

Expected: every required rule is present.

- [ ] **Step 3: Commit the operating instructions**

Run:

```bash
git add docs/agents/night-gardener.md
git commit -m "Teach Night Gardener to repair approved builds"
```

---

### Task 6: Replay and repair the garlic build on current main

**Files from PR #2:**
- Modify: `docs/ideas-board.md`
- Create: `src/app/guides/autumn-planting-garlic-onions/page.tsx`
- Modify: `src/app/guides/growing-onions-garlic-leeks/page.tsx`
- Modify: `src/app/guides/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify if still needed: `src/lib/bench.test.ts`

**Interfaces:**
- Consumes: commit `f9758374ded172f47ede6968d358e56f6847f867`
- Produces: the reviewed garlic-and-onion guide integrated with current `origin/main`

- [ ] **Step 1: Replay the Night Gardener commit without committing**

Run:

```bash
git cherry-pick --no-commit f9758374ded172f47ede6968d358e56f6847f867
git status --short
```

Expected: the six PR files are added/modified; shared files may show conflicts.

- [ ] **Step 2: Resolve shared files against current main**

Apply these exact rules:

- `docs/ideas-board.md`: start from current `origin/main`; retain all newer decisions; update
  ideas #1 and #11 only to `done — built in PR #2, awaiting Kate's Ship it approval`.
- `src/app/guides/page.tsx`: retain every current guide card and add the autumn allium guide
  exactly once.
- `src/app/sitemap.ts`: retain every current URL and add
  `/guides/autumn-planting-garlic-onions` exactly once.
- `src/app/guides/growing-onions-garlic-leeks/page.tsx`: retain all current content and add
  the PR's autumn-ordering cross-link exactly once.
- `src/lib/bench.test.ts`: retain current-main fixtures and enum coverage; include
  `"building"` only if it is not already present.
- New guide page: retain the reviewed PR version unless a current shared helper signature
  requires a mechanical adjustment.

Then run:

```bash
rg -n "^<<<<<<<|^=======|^>>>>>>>" docs/ideas-board.md src/app/guides src/app/sitemap.ts src/lib/bench.test.ts
git diff --check
```

Expected: no conflict markers and no whitespace errors.

- [ ] **Step 3: Run focused content checks**

Run:

```bash
rg -n "autumn-planting-garlic-onions" src/app/guides/page.tsx src/app/sitemap.ts src/app/guides/growing-onions-garlic-leeks/page.tsx
rg -n "awin1.com|AffiliateLink|awinLink" src/app/guides/autumn-planting-garlic-onions/page.tsx
```

Expected: each discovery surface links to the guide; affiliate links use existing helpers.

- [ ] **Step 4: Commit the repaired guide**

Run:

```bash
git add docs/ideas-board.md src/app/guides/autumn-planting-garlic-onions/page.tsx src/app/guides/growing-onions-garlic-leeks/page.tsx src/app/guides/page.tsx src/app/sitemap.ts src/lib/bench.test.ts
git commit -m "Repair autumn allium guide on current main"
```

---

### Task 7: Full verification and private Bench browser journey

**Files:**
- No source changes unless a verification failure exposes a scoped bug

**Interfaces:**
- Consumes: Tasks 1–6
- Produces: green branch ready for one preview deployment

- [ ] **Step 1: Run the full automated gate**

Run:

```bash
npx tsc --noEmit
npx vitest run
npm run build
```

Expected: all three commands exit 0.

- [ ] **Step 2: Start the production build locally**

Run:

```bash
npm run start -- --port 3020
```

Expected: server listens at `http://127.0.0.1:3020`.

- [ ] **Step 3: Verify the guide and Bench at a mobile viewport**

Using the in-app browser at 390px width:

1. Open `/guides/autumn-planting-garlic-onions`; check top, ordering rows, companion
   cross-link, FAQ and footer; confirm no clipping or horizontal overflow.
2. Open `/bench?k=<local BENCH_KEY>` with mocked GitHub responses or a non-mutating local
   fixture; verify ready, queued and failed cards.
3. Verify ready shows **Preview** and **Ship it**.
4. Verify queued survives reload and says it will refresh then publish.
5. Verify failed names the stage and offers **Try again**.
6. Verify the page contains no “needs the laptop” message.

- [ ] **Step 4: Review the final diff and commits**

Run:

```bash
git status --short
git diff --check origin/main...HEAD
git diff --stat origin/main...HEAD
git log --oneline origin/main..HEAD
```

Expected: clean status; only planned files; no image-slot or companion-photo changes.

---

### Task 8: Publish one repaired preview after Kate authorises the push

**Files:**
- No new source files

**Interfaces:**
- Consumes: verified `codex/potting-bench-recovery`
- Produces: updated `night/autumn-garlic-onion-hub` PR #2 and working Netlify preview

- [ ] **Step 1: Ask Kate for explicit push permission**

Report the green verification results and exact diff. Do not push until Kate says yes.

- [ ] **Step 2: Update the existing Night Gardener branch safely**

After approval, fetch the branch again and confirm its head is still
`f9758374ded172f47ede6968d358e56f6847f867`. Then run:

```bash
git push --force-with-lease=refs/heads/night/autumn-garlic-onion-hub:f9758374ded172f47ede6968d358e56f6847f867 origin HEAD:night/autumn-garlic-onion-hub
```

Expected: only PR #2's branch updates; `main` is untouched.

- [ ] **Step 3: Wait for the Netlify preview and checks**

Verify the new head's checks and open
`https://deploy-preview-2--whattosow.netlify.app` at mobile width. Repeat the guide and
Bench visual checks on the remote preview.

- [ ] **Step 4: Hand the final action to Kate**

Tell Kate to open the private Potting Bench bookmark, preview PR #2, and tap **Ship it**.
Because the repaired branch is current and green, it should merge immediately; the included
recovery flow then protects every later build.

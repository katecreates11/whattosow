import { NextRequest, NextResponse } from "next/server";
import { applyVerdict, proposedIdeas, type Verdict } from "@/lib/bench";
import {
  approveBuild,
  readBuildState,
  type BuildState,
  type FailureStage,
} from "@/lib/bench-ship";

// The Potting Bench API. GET lists the ideas awaiting Kate's call; POST records
// her verdict by committing the change to docs/ideas-board.md on main.
// Guarded by BENCH_KEY; writes via a fine-grained GITHUB_TOKEN (both Netlify env vars).

export const dynamic = "force-dynamic";

const REPO = "katecreates11/whattosow";
const BOARD_PATH = "docs/ideas-board.md";
const GH = `https://api.github.com/repos/${REPO}`;
const API = `${GH}/contents/${encodeURIComponent(BOARD_PATH)}`;

function ghHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function authorised(key: string | null): boolean {
  const expected = process.env.BENCH_KEY;
  return Boolean(expected && key && key === expected);
}

/** Branches Kate can merge from the bench — the Dreamer's, and nothing else. */
const MERGEABLE_PREFIX = "dreams/";

/** PRs the Bench can take live — the Night Gardener's finished builds, and nothing else. */
const SHIPPABLE_PREFIX = "night/";

export interface DreamBranch {
  name: string;
  message: string; // last commit's subject line
  date: string; // YYYY-MM-DD of the last commit
  commits: number;
}

export interface Build {
  number: number; // PR number
  title: string;
  branch: string; // head ref, e.g. "night/…"
  date: string; // YYYY-MM-DD the PR was opened
  previewUrl: string; // Netlify deploy preview — see it live before shipping
  state: BuildState;
  failureStage?: FailureStage;
}

/** The Dreamer's branches that haven't been merged into main yet. */
async function unmergedDreams(): Promise<DreamBranch[]> {
  const res = await fetch(`${GH}/branches?per_page=100`, { headers: ghHeaders(), cache: "no-store" });
  if (!res.ok) return [];
  const branches = (await res.json()) as { name: string }[];
  const out: DreamBranch[] = [];
  for (const b of branches.filter((b) => b.name.startsWith(MERGEABLE_PREFIX))) {
    const cmp = await fetch(`${GH}/compare/main...${encodeURIComponent(b.name)}`, { headers: ghHeaders(), cache: "no-store" });
    if (!cmp.ok) continue;
    const json = (await cmp.json()) as { ahead_by: number; commits: { commit: { message: string; author: { date: string } } }[] };
    if (json.ahead_by === 0) continue; // already in main — nothing to let in
    const last = json.commits[json.commits.length - 1]?.commit;
    out.push({
      name: b.name,
      message: (last?.message ?? "").split("\n")[0],
      date: (last?.author?.date ?? "").slice(0, 10),
      commits: json.ahead_by,
    });
  }
  return out;
}

/** The Night Gardener's finished builds — open PRs from night/ branches.
 *  Degrades quietly to [] if the token lacks "Pull requests: read", so the
 *  rest of the bench keeps working. */
async function openBuilds(): Promise<Build[]> {
  try {
    const res = await fetch(`${GH}/pulls?state=open&per_page=100`, { headers: ghHeaders(), cache: "no-store" });
    if (!res.ok) return [];
    const pulls = (await res.json()) as {
      number: number;
      title: string;
      body: string | null;
      created_at: string;
      head: { ref: string };
    }[];
    return pulls
      .filter((p) => p.head?.ref?.startsWith(SHIPPABLE_PREFIX))
      .map((p) => ({
        number: p.number,
        title: p.title,
        branch: p.head.ref,
        date: (p.created_at ?? "").slice(0, 10),
        previewUrl: `https://deploy-preview-${p.number}--whattosow.netlify.app`,
        ...readBuildState(p.body),
      }));
  } catch {
    return [];
  }
}

async function fetchBoard(): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${API}?ref=main`, { headers: ghHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const json = (await res.json()) as { content: string; sha: string };
  return { content: Buffer.from(json.content, "base64").toString("utf8"), sha: json.sha };
}

async function commitBoard(content: string, sha: string, message: string): Promise<Response> {
  return fetch(API, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({ message, content: Buffer.from(content, "utf8").toString("base64"), sha, branch: "main" }),
  });
}

export async function GET(req: NextRequest) {
  if (!authorised(req.nextUrl.searchParams.get("k"))) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  if (!process.env.GITHUB_TOKEN) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const [{ content }, dreams, builds] = await Promise.all([fetchBoard(), unmergedDreams(), openBuilds()]);
    return NextResponse.json({ ideas: proposedIdeas(content), dreams, builds });
  } catch {
    return NextResponse.json({ error: "couldn't reach the board" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  let body: {
    k?: string;
    heading?: string;
    verdict?: string;
    note?: string;
    merge?: string;
    ship?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!authorised(body.k ?? null)) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  if (!process.env.GITHUB_TOKEN) return NextResponse.json({ error: "not configured" }, { status: 503 });

  // Merge a dream branch into main — only the Dreamer's branches, nothing else.
  if (body.merge) {
    const branch = body.merge.trim();
    if (!branch.startsWith(MERGEABLE_PREFIX)) return NextResponse.json({ error: "bad request" }, { status: 400 });
    try {
      const res = await fetch(`${GH}/merges`, {
        method: "POST",
        headers: ghHeaders(),
        body: JSON.stringify({
          base: "main",
          head: branch,
          commit_message: `bench: Kate merged ${branch} — the crew reads this dream now`,
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, merged: branch });
      if (res.status === 204) return NextResponse.json({ ok: true, merged: branch, already: true });
      if (res.status === 409) return NextResponse.json({ error: "conflict" }, { status: 409 });
      throw new Error(`GitHub merge failed (${res.status})`);
    } catch {
      return NextResponse.json({ error: "couldn't merge the dream" }, { status: 502 });
    }
  }

  // Kate's tap is durable production approval. A clean Night Gardener PR merges
  // immediately; a stale one keeps the approval marker for the Night Gardener
  // to repair, verify and publish without asking Kate again.
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
          return NextResponse.json({
            ok: true,
            status: "shipped",
            number,
          });
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

  const verdict = body.verdict as Verdict;
  const heading = (body.heading ?? "").trim();
  const note = (body.note ?? "").slice(0, 500);
  if (!heading || !["approved", "parked", "binned"].includes(verdict)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    // Two attempts: if another commit lands between our read and write (409), re-read and retry once.
    for (let attempt = 0; attempt < 2; attempt++) {
      const { content, sha } = await fetchBoard();
      const updated = applyVerdict(content, heading, verdict, note, new Date().toISOString());
      if (updated === null) return NextResponse.json({ error: "already decided" }, { status: 409 });

      const message = `bench: Kate ${verdict} "${heading.slice(0, 60)}"${note ? " — with a note" : ""}`;
      const res = await commitBoard(updated, sha, message);
      if (res.ok) return NextResponse.json({ ok: true, verdict, heading });
      if (res.status !== 409) throw new Error(`GitHub write failed (${res.status})`);
    }
    return NextResponse.json({ error: "the board is busy — try again" }, { status: 409 });
  } catch {
    return NextResponse.json({ error: "couldn't write to the board" }, { status: 502 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { applyVerdict, proposedIdeas, type Verdict } from "@/lib/bench";

// The Potting Bench API. GET lists the ideas awaiting Kate's call; POST records
// her verdict by committing the change to docs/ideas-board.md on main.
// Guarded by BENCH_KEY; writes via a fine-grained GITHUB_TOKEN (both Netlify env vars).

export const dynamic = "force-dynamic";

const REPO = "katecreates11/whattosow";
const BOARD_PATH = "docs/ideas-board.md";
const API = `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(BOARD_PATH)}`;

function authorised(key: string | null): boolean {
  const expected = process.env.BENCH_KEY;
  return Boolean(expected && key && key === expected);
}

async function fetchBoard(): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${API}?ref=main`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const json = (await res.json()) as { content: string; sha: string };
  return { content: Buffer.from(json.content, "base64").toString("utf8"), sha: json.sha };
}

async function commitBoard(content: string, sha: string, message: string): Promise<Response> {
  return fetch(API, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ message, content: Buffer.from(content, "utf8").toString("base64"), sha, branch: "main" }),
  });
}

export async function GET(req: NextRequest) {
  if (!authorised(req.nextUrl.searchParams.get("k"))) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  if (!process.env.GITHUB_TOKEN) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const { content } = await fetchBoard();
    return NextResponse.json({ ideas: proposedIdeas(content) });
  } catch {
    return NextResponse.json({ error: "couldn't reach the board" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  let body: { k?: string; heading?: string; verdict?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!authorised(body.k ?? null)) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  if (!process.env.GITHUB_TOKEN) return NextResponse.json({ error: "not configured" }, { status: 503 });

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

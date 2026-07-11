// The Potting Bench — pure helpers for reading and editing docs/ideas-board.md.
// Kept free of I/O so they can be unit-tested against real board content.

export type Verdict = "approved" | "parked" | "binned";

export interface BenchIdea {
  heading: string; // exact heading text (without the "### "), used as the card's id
  type: string;
  status: string;
  score: string;
  evidence: string;
  pitch: string;
  added: string;
}

const FIELD = (block: string, name: string): string => {
  const m = block.match(new RegExp(`^- \\*\\*${name}:\\*\\* (.+)$`, "m"));
  return m ? m[1].replace(/\*\*/g, "").trim() : "";
};

/** Every card on the board (a card = a `### ` heading + its bullet fields). */
export function parseBoard(content: string): BenchIdea[] {
  const withoutFences = content.replace(/^```[\s\S]*?^```\s*$/gm, ""); // the card template lives in a code fence — not a real card
  const chunks = withoutFences.split(/^### /m).slice(1); // drop the preamble
  return chunks
    .map((chunk) => {
      const heading = (chunk.split("\n")[0] ?? "").trim();
      return {
        heading,
        type: FIELD(chunk, "Type"),
        status: FIELD(chunk, "Status").split(/[\s(]/)[0].toLowerCase(),
        score: FIELD(chunk, "Score"),
        evidence: FIELD(chunk, "Evidence"),
        pitch: FIELD(chunk, "Pitch"),
        added: FIELD(chunk, "Added"),
      };
    })
    .filter((c) => c.heading && c.status);
}

/** Cards still waiting for Kate's call. */
export function proposedIdeas(content: string): BenchIdea[] {
  return parseBoard(content).filter((c) => c.status === "proposed");
}

/**
 * Apply Kate's verdict to one card, in place. Returns the updated board, or
 * null if the card can't be found or is no longer `proposed` (already decided
 * elsewhere — the caller should treat that as a stale click, not an error).
 */
export function applyVerdict(content: string, heading: string, verdict: Verdict, note: string, dateISO: string): string | null {
  const headingLine = `### ${heading}`;
  const start = content.indexOf(`${headingLine}\n`);
  if (start === -1) return null;

  const afterHeading = start + headingLine.length + 1;
  const nextCard = content.indexOf("\n### ", afterHeading);
  const end = nextCard === -1 ? content.length : nextCard;
  const block = content.slice(start, end);

  const statusLine = /^- \*\*Status:\*\* proposed\s*$/m;
  if (!statusLine.test(block)) return null; // already decided

  const date = dateISO.slice(0, 10);
  const noteLine = note.trim() ? `\n- **Note (Kate):** ${note.trim().replace(/\r?\n+/g, " ")}` : "";
  const updatedBlock = block.replace(statusLine, `- **Status:** ${verdict}\n- **Decided:** ${date} · via the potting bench${noteLine}`);

  return content.slice(0, start) + updatedBlock + content.slice(end);
}

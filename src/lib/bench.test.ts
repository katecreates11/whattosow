import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { applyVerdict, parseBoard, proposedIdeas } from "./bench";

// Test against the real board so the parser and the Forager's format never drift apart.
const board = readFileSync(join(process.cwd(), "docs/ideas-board.md"), "utf8");

describe("parseBoard", () => {
  it("finds the board's cards with their fields", () => {
    const cards = parseBoard(board);
    expect(cards.length).toBeGreaterThanOrEqual(3);
    for (const c of cards) {
      expect(c.heading).toBeTruthy();
      expect(["content", "feature", "monetisation"]).toContain(c.type.split(/[\s|]/)[0]);
      expect(["proposed", "approved", "parked", "binned", "done"]).toContain(c.status);
      expect(c.pitch).toBeTruthy();
    }
  });

  it("does not treat the card template as a card", () => {
    // the template block uses "[Idea title]" — it must not appear as a real idea
    const headings = parseBoard(board).map((c) => c.heading);
    expect(headings).not.toContain("[Idea title]");
  });
});

describe("applyVerdict", () => {
  const target = proposedIdeas(board)[0];

  it("sets the status, stamps the date, and records the note", () => {
    const updated = applyVerdict(board, target.heading, "approved", "love this one", "2026-07-11T10:00:00Z");
    expect(updated).not.toBeNull();
    const card = parseBoard(updated!).find((c) => c.heading === target.heading)!;
    expect(card.status).toBe("approved");
    expect(updated!).toContain("**Decided:** 2026-07-11 · via the potting bench");
    expect(updated!).toContain("**Note (Kate):** love this one");
  });

  it("leaves every other card untouched", () => {
    const before = parseBoard(board);
    const updated = applyVerdict(board, target.heading, "binned", "", "2026-07-11T10:00:00Z")!;
    const after = parseBoard(updated);
    expect(after.length).toBe(before.length);
    for (const b of before) {
      if (b.heading === target.heading) continue;
      expect(after.find((a) => a.heading === b.heading)?.status).toBe(b.status);
    }
  });

  it("returns null for an unknown card or one already decided (stale click)", () => {
    expect(applyVerdict(board, "Not a real idea", "approved", "", "2026-07-11")).toBeNull();
    const once = applyVerdict(board, target.heading, "approved", "", "2026-07-11T10:00:00Z")!;
    expect(applyVerdict(once, target.heading, "binned", "", "2026-07-11T10:00:00Z")).toBeNull();
  });
});

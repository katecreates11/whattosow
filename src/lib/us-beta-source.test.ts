import { describe, expect, it } from "vitest";
import { normaliseUsBetaSource } from "@/lib/us-beta-source";

describe("normaliseUsBetaSource", () => {
  it("keeps known US beta sources for tracking", () => {
    expect(normaliseUsBetaSource("homepage-auto")).toBe("homepage-auto");
    expect(normaliseUsBetaSource("page-nudge")).toBe("page-nudge");
    expect(normaliseUsBetaSource("footer")).toBe("footer");
  });

  it("falls back to direct for missing or unknown sources", () => {
    expect(normaliseUsBetaSource(null)).toBe("direct");
    expect(normaliseUsBetaSource("newsletter")).toBe("direct");
  });
});

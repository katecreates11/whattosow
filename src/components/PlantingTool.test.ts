import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/PlantingTool.tsx", "utf8");

describe("PlantingTool sample location preview", () => {
  // The panel behind the postcode box is light now (17 Nov 2026 redesign);
  // the old white-on-dark example line had become invisible on cream.
  it("keeps the example line readable on the light page", () => {
    expect(source).toContain("For example, <span className=\"text-earth\">Bristol</span>");
    expect(source).not.toContain("text-sm text-white/85");
  });
});

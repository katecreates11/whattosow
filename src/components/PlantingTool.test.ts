import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/PlantingTool.tsx", "utf8");

describe("PlantingTool sample location preview", () => {
  it("keeps its text and pin readable against the dark postcode panel", () => {
    expect(source).toContain('text-leaf-light/80');
    expect(source).toContain('text-sm text-white/85');
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  new URL("./BenchClient.tsx", import.meta.url),
  "utf8",
);

describe("Potting Bench build recovery UI", () => {
  it("submits the pull request number rather than trusting a branch name", () => {
    expect(source).toContain("ship: build.number");
    expect(source).not.toContain("ship: build.branch");
  });

  it("shows queued and failed recovery states without requiring a laptop", () => {
    expect(source).toContain(
      "Approved — refreshing it against today&apos;s site, then publishing.",
    );
    expect(source).toContain("Try again");
    expect(source).not.toContain(
      "This build clashes with main — it needs the laptop",
    );
  });
});

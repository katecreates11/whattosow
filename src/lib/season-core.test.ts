import { describe, expect, it } from "vitest";
import { getCropStatus, ukAverageFrost } from "./season-core";
import { crops } from "@/data/crops";

const peas = crops.find((c) => c.slug === "peas")!;

describe("getCropStatus — sowing method by season", () => {
  // Bug: in mid-July the homepage advised "sow peas indoors", because the
  // sow-indoors window is left open until ~1 Aug and, on a days-left tie, the
  // earliest-opening window (indoors) wins. Once the soil is warm you direct sow.
  it("recommends DIRECT sow, not indoors, for a warm-soil July pea sowing", () => {
    const july = new Date(2026, 6, 16); // 16 July 2026
    const status = getCropStatus(peas, ukAverageFrost(july), july);
    expect(status.method).toBe("direct sow");
  });

  // Guard: before the last frost, starting indoors legitimately leads — the fix
  // must not touch spring behaviour.
  it("still leads with sow indoors before the last frost (early spring)", () => {
    const march = new Date(2026, 2, 1); // 1 March 2026 — before the ~15 Apr average frost
    const status = getCropStatus(peas, ukAverageFrost(march), march);
    expect(status.method).toBe("sow indoors");
  });
});

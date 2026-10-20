import { describe, expect, it } from "vitest";
import { frostPhase, ukAverageFrostPhase } from "@/lib/frost-phase";

const lastFrost = new Date(2026, 3, 18); // 18 Apr
const autumnFrost = new Date(2026, 10, 8); // 8 Nov

describe("frostPhase", () => {
  it("is spring before the last frost", () => {
    expect(frostPhase(lastFrost, autumnFrost, new Date(2026, 2, 1))).toBe("spring");
  });

  it("is summer in the frost-free stretch", () => {
    expect(frostPhase(lastFrost, autumnFrost, new Date(2026, 6, 15))).toBe("summer");
  });

  it("is autumn once the first frost is within six weeks", () => {
    expect(frostPhase(lastFrost, autumnFrost, new Date(2026, 9, 20))).toBe("autumn");
  });

  it("is winter once the first frost has passed, even with next spring's date rolled on", () => {
    const nextSpring = new Date(2027, 3, 18);
    expect(frostPhase(nextSpring, autumnFrost, new Date(2026, 10, 20))).toBe("winter");
  });
});

describe("ukAverageFrostPhase", () => {
  it("follows the UK-average calendar", () => {
    expect(ukAverageFrostPhase(new Date(2026, 1, 10))).toBe("spring");
    expect(ukAverageFrostPhase(new Date(2026, 7, 1))).toBe("summer");
    expect(ukAverageFrostPhase(new Date(2026, 9, 20))).toBe("autumn");
    expect(ukAverageFrostPhase(new Date(2026, 11, 1))).toBe("winter");
    expect(ukAverageFrostPhase(new Date(2027, 0, 5))).toBe("spring");
  });
});

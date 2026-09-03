import { describe, expect, it } from "vitest";
import { getSeasonalTime } from "./seasonal-time";

describe("getSeasonalTime", () => {
  it("uses the London month at the July-to-August boundary", () => {
    const time = getSeasonalTime(new Date("2026-07-31T23:30:00.000Z"));

    expect(time.monthIndex).toBe(7);
    expect(time.monthName).toBe("August");
    expect(time.monthSlug).toBe("august");
  });

  it("starts the gardening week on Monday in London", () => {
    const time = getSeasonalTime(new Date("2026-08-09T12:00:00.000Z"));

    expect(time.weekOf.toISOString()).toBe("2026-08-03T00:00:00.000Z");
  });

  it("keeps the correct calendar time through the UK clock change", () => {
    const time = getSeasonalTime(new Date("2026-10-25T00:30:00.000Z"));

    expect(time.now.toISOString()).toBe("2026-10-25T01:30:00.000Z");
  });
});

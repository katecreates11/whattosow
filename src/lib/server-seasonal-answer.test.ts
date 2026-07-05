import { describe, expect, it } from "vitest";
import { getServerSeasonalAnswer } from "./server-seasonal-answer";

describe("getServerSeasonalAnswer", () => {
  it("returns crawlable UK-average answer groups for early July", () => {
    const answer = getServerSeasonalAnswer(new Date(2026, 6, 5));

    expect(answer.monthName).toBe("July");
    expect(answer.sowNow.length).toBeGreaterThan(0);
    expect(answer.sowOutdoors.length).toBeGreaterThan(0);
    expect(answer.startIndoors.length).toBeGreaterThan(0);
    expect(answer.plantOutNow.length).toBeGreaterThan(0);
    expect(answer.avoidSowingNow.length).toBeGreaterThan(0);

    expect(answer.sowNow.map((entry) => entry.crop.slug)).toContain("french-beans");
    expect(answer.startIndoors.map((entry) => entry.crop.slug)).toContain("peas");
    expect(answer.sowOutdoors.map((entry) => entry.crop.slug)).toContain("french-beans");
    expect(answer.plantOutNow.map((entry) => entry.crop.slug)).toContain("leeks");
    expect(answer.avoidSowingNow.map((entry) => entry.crop.slug)).toContain("tomatoes");

    const combinedSlugs = answer.sowNow.map((entry) => entry.crop.slug);
    expect(new Set(combinedSlugs).size).toBe(combinedSlugs.length);
  });
});

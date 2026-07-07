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
    expect(answer.sowNow.map((entry) => entry.crop.slug)).toContain("basil");
    expect(answer.sowNow.map((entry) => entry.crop.slug)).toContain("courgettes");
    expect(answer.startIndoors.map((entry) => entry.crop.slug)).toContain("peas");
    expect(answer.sowOutdoors.map((entry) => entry.crop.slug)).toContain("french-beans");
    expect(answer.plantOutNow.map((entry) => entry.crop.slug)).toContain("leeks");
    expect(answer.plantOutNow.map((entry) => entry.crop.slug)).toContain("sweetcorn");
    expect(answer.plantOutNow.map((entry) => entry.crop.slug)).toContain("pumpkins");
    expect(answer.avoidSowingNow.map((entry) => entry.crop.slug)).toContain("tomatoes");
    expect(answer.avoidSowingNow.map((entry) => entry.crop.slug)).not.toContain("basil");
    expect(answer.avoidSowingNow.map((entry) => entry.crop.slug)).not.toContain("courgettes");
    expect(answer.avoidSowingNow.map((entry) => entry.crop.slug)).not.toContain("carrots");
    expect(answer.avoidSowingNow.map((entry) => entry.crop.slug)).not.toContain("french-beans");

    const combinedSlugs = answer.sowNow.map((entry) => entry.crop.slug);
    expect(new Set(combinedSlugs).size).toBe(combinedSlugs.length);
  });

  it("keeps closed tender crops precise about seed windows and next sowing months", () => {
    const answer = getServerSeasonalAnswer(new Date(2026, 6, 5));
    const tomato = answer.avoidSowingNow.find((entry) => entry.crop.slug === "tomatoes");
    const sweetcorn = answer.avoidSowingNow.find((entry) => entry.crop.slug === "sweetcorn");

    expect(tomato?.reasonKind).toBe("too-late-from-seed");
    expect(tomato?.reason).toBe("too late from seed this week");
    expect(tomato?.nextMonthSlug).toBe("february");
    expect(tomato?.nextMonthName).toBe("February");

    expect(sweetcorn?.reasonKind).toBe("too-late-from-seed");
    expect(sweetcorn?.nextMonthSlug).toBe("march");

    const pumpkin = answer.plantOutNow.find((entry) => entry.crop.slug === "pumpkins");
    expect(pumpkin?.status.label).toBe("a gamble now");

    const frenchBeans = answer.plantOutNow.find((entry) => entry.crop.slug === "french-beans");
    expect(frenchBeans?.status.label).not.toBe("late plant out");
    expect(frenchBeans?.status.label).toBe("plant out now");
  });
});

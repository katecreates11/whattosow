import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
import { getAvgFrostDate, getCropActionMonths, getCropsForMonth, MONTH_SLUGS } from "./calendar";

function crop(slug: string) {
  const found = crops.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Missing crop fixture: ${slug}`);
  return found;
}

function monthIndex(slug: string) {
  return MONTH_SLUGS.indexOf(slug as (typeof MONTH_SLUGS)[number]);
}

describe("getCropActionMonths", () => {
  it("includes succession sowing months up to the latest safe harvest window", () => {
    const carrots = crop("carrots");
    const actions = getCropActionMonths(carrots, getAvgFrostDate(2026));
    const directSow = actions.find((action) => action.action === "directSow");

    expect(directSow?.months).toContain(monthIndex("july"));
  });

  it("keeps one-off tender crops out of July sowing windows", () => {
    const tomatoes = crop("tomatoes");
    const actions = getCropActionMonths(tomatoes, getAvgFrostDate(2026));
    const sowIndoors = actions.find((action) => action.action === "sowIndoors");

    expect(sowIndoors?.months).not.toContain(monthIndex("july"));
  });
});

describe("getCropsForMonth", () => {
  it("lists carrots on the July direct-sow page when they are a last-chance succession crop", () => {
    const { directSow } = getCropsForMonth(monthIndex("july"), getAvgFrostDate(2026));

    expect(directSow.map((entry) => entry.slug)).toContain("carrots");
  });
});

import { describe, expect, it } from "vitest";
import { getCropBuyingAdvice, getCropKit } from "@/data/crop-kit";

describe("crop buying advice", () => {
  const currentRollout = [
    "tomatoes",
    "carrots",
    "basil",
    "courgettes",
    "maincrop-potatoes",
    "runner-beans",
  ];

  it("keeps the worth buying block to the current measured rollout", () => {
    for (const slug of currentRollout) {
      expect(getCropBuyingAdvice(slug)).toBeTruthy();
    }

    expect(getCropBuyingAdvice("lettuce")).toBeNull();
    expect(getCropBuyingAdvice("french-beans")).toBeNull();
  });

  it("gives basil a pot-focused buying note without selling a herb kit", () => {
    const advice = getCropBuyingAdvice("basil");

    expect(advice?.intro).toContain("warmth crop");
    expect(advice?.intro).toContain("Summer basil");
    expect(advice?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "worth-buying",
          name: "Small 9cm pots",
          product: "9cm square plant pots",
        }),
        expect.objectContaining({
          kind: "worth-buying",
          name: "Fresh basil seed",
          product: "basil seed",
        }),
        expect.objectContaining({
          kind: "skip-this",
          name: "Big indoor herb kits",
        }),
      ]),
    );
  });

  it("keeps linked recommendations bounded and skip items link-free", () => {
    for (const slug of currentRollout) {
      const advice = getCropBuyingAdvice(slug);
      expect(advice).toBeTruthy();
      if (!advice) continue;

      const worthBuying = advice.items.filter((item) => item.kind === "worth-buying");
      const skipItems = advice.items.filter((item) => item.kind === "skip-this");

      expect(worthBuying.length).toBeLessThanOrEqual(2);
      expect(skipItems.length).toBeLessThanOrEqual(1);
      expect(skipItems.length).toBeGreaterThan(0);

      for (const item of skipItems) {
        expect("href" in item).toBe(false);
      }
    }
  });

  it("uses specific editorial buy-lines rather than generic find labels", () => {
    for (const slug of currentRollout) {
      const advice = getCropBuyingAdvice(slug);
      expect(advice).toBeTruthy();
      if (!advice) continue;

      for (const item of advice.items) {
        if (item.kind !== "worth-buying") continue;

        expect(item.cta).not.toMatch(/^Find /);
        expect(item.cta.length).toBeGreaterThan(12);
      }
    }
  });

  it("uses real plot photos as trust proof on the expanded crop buying notes", () => {
    expect(getCropBuyingAdvice("carrots")?.photo).toEqual(
      expect.objectContaining({
        src: "/photos/blog/carrot-harvest-crate.webp",
      }),
    );
    expect(getCropBuyingAdvice("courgettes")?.photo).toEqual(
      expect.objectContaining({
        src: "/photos/blog/courgette-young-plant.webp",
      }),
    );
    expect(getCropBuyingAdvice("maincrop-potatoes")?.photo).toEqual(
      expect.objectContaining({
        src: "/photos/blog/potato-rows-june-2026.webp",
      }),
    );
    expect(getCropBuyingAdvice("runner-beans")?.photo).toEqual(
      expect.objectContaining({
        src: "/photos/crops/runner-beans-climbing.webp",
      }),
    );
  });

  it("keeps older crop kit rails aligned with trust-led skip advice", () => {
    expect(getCropKit("tomatoes").map((item) => item.name)).not.toContain(
      "Spiral tomato supports",
    );
    expect(getCropKit("maincrop-potatoes").map((item) => item.name)).not.toContain(
      "Chitting trays",
    );
    expect(getCropKit("maincrop-potatoes").map((item) => item.name)).toContain(
      "Hessian storage sacks",
    );
  });
});

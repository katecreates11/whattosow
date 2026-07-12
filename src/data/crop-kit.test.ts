import { describe, expect, it } from "vitest";
import { getCropBuyingAdvice, getCropKit } from "@/data/crop-kit";

describe("crop buying advice", () => {
  const currentRollout = [
    "tomatoes",
    "carrots",
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

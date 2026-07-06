import { describe, expect, it } from "vitest";
import { getCropBuyingAdvice } from "@/data/crop-kit";

describe("crop buying advice", () => {
  it("only rolls out the worth buying block to tomatoes and carrots for now", () => {
    expect(getCropBuyingAdvice("tomatoes")).toBeTruthy();
    expect(getCropBuyingAdvice("carrots")).toBeTruthy();
    expect(getCropBuyingAdvice("lettuce")).toBeNull();
  });

  it("keeps linked recommendations bounded and skip items link-free", () => {
    for (const slug of ["tomatoes", "carrots"]) {
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
});

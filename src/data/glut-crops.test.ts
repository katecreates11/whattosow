import { describe, expect, it } from "vitest";
import { GLUT_CROPS, glutReading, weightFor } from "@/data/glut-crops";

describe("glut-crops", () => {
  it("scopes the meter to exactly the crops that glut together in August", () => {
    expect(GLUT_CROPS.map((c) => c.slug).sort()).toEqual(
      ["beans", "courgettes", "cucumbers", "tomatoes"].sort()
    );
  });

  it("weighs nothing for an unselected crop and something for every level above none", () => {
    const courgettes = GLUT_CROPS.find((c) => c.slug === "courgettes")!;
    expect(weightFor(courgettes, "none")).toBe(0);
    expect(weightFor(courgettes, "a-few")).toBeGreaterThan(0);
    expect(weightFor(courgettes, "drowning-in-it")).toBeGreaterThan(weightFor(courgettes, "a-basketful"));
  });

  it("is honest that cucumbers don't freeze, unlike every other scoped crop", () => {
    const cucumbers = GLUT_CROPS.find((c) => c.slug === "cucumbers")!;
    expect(cucumbers.freeze).toBeNull();
    GLUT_CROPS.filter((c) => c.slug !== "cucumbers").forEach((c) => expect(c.freeze).not.toBeNull());
  });

  it("escalates the reading from empty through to properly drowning", () => {
    expect(glutReading(0).label).toBe("Nothing much yet");
    expect(glutReading(1).label).toBe("A gentle glut");
    expect(glutReading(5).label).toBe("A proper glut");
    expect(glutReading(10).label).toBe("Officially drowning in it");
  });

  it("carries one honest kit link per crop that has one, never inventing an ASIN", () => {
    GLUT_CROPS.forEach((crop) => {
      if (!crop.kit) return;
      expect(crop.kit.url).toContain("amazon.co.uk/s?k=");
      expect(crop.kit.url).not.toMatch(/\/dp\//);
    });
  });
});

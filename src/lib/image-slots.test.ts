import { describe, it, expect } from "vitest";
import { getSlot, shapeToAspect } from "./image-slots";

describe("image-slots", () => {
  it("returns null for an unassigned slot", () => {
    expect(getSlot("companion-does-not-exist")).toBeNull();
  });
  it("maps shapes to aspect ratios", () => {
    expect(shapeToAspect("wide")).toBe("16 / 9");
    expect(shapeToAspect("portrait")).toBe("3 / 4");
    expect(shapeToAspect("square")).toBe("1 / 1");
  });
});

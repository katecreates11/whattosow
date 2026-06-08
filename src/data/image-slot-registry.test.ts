import { describe, it, expect } from "vitest";
import { imageSlotRegistry, getSlotDef } from "./image-slot-registry";
import { companionTopics } from "./companion-topics";

describe("imageSlotRegistry", () => {
  it("has unique ids", () => {
    const ids = imageSlotRegistry.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("defines 4 slots for every companion topic", () => {
    for (const t of companionTopics) {
      const slots = imageSlotRegistry.filter((s) => s.id.startsWith(`companion-${t.slug}-`));
      expect(slots.length).toBe(4);
    }
  });
  it("only uses valid shapes", () => {
    for (const s of imageSlotRegistry) {
      expect(["wide", "portrait", "square"]).toContain(s.shape);
    }
  });
  it("getSlotDef finds a known slot", () => {
    const id = `companion-${companionTopics[0].slug}-hero`;
    expect(getSlotDef(id)?.shape).toBe("wide");
  });
});

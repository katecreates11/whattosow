import manifest from "@/data/image-slots.json";
import type { SlotShape } from "@/data/image-slot-registry";

export interface SlotAssignment {
  src: string;
  alt: string;
  caption?: string;
}

const data = manifest as Record<string, SlotAssignment>;

export function getSlot(id: string): SlotAssignment | null {
  return data[id] ?? null;
}

export function shapeToAspect(shape: SlotShape): string {
  return shape === "wide" ? "16 / 9" : shape === "portrait" ? "3 / 4" : "1 / 1";
}

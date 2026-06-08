import { companionTopics } from "./companion-topics";

export type SlotShape = "wide" | "portrait" | "square";

export interface SlotDef {
  id: string;       // "companion-companion-plants-for-tomatoes-hero"
  group: string;    // "Companion: Tomatoes"
  label: string;    // "Hero"
  purpose: string;  // human hint shown in the tool
  shape: SlotShape;
}

const PER_TOPIC: { suffix: string; label: string; purpose: string; shape: SlotShape }[] = [
  { suffix: "hero", label: "Hero", purpose: "Top-of-page banner", shape: "wide" },
  { suffix: "intro", label: "After intro", purpose: "Sits under the opening line", shape: "portrait" },
  { suffix: "companions", label: "Grow alongside", purpose: "Next to the companions list", shape: "wide" },
  { suffix: "practice", label: "On our plot", purpose: "Real photo before the FAQ", shape: "portrait" },
];

function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const topicSlots: SlotDef[] = companionTopics.flatMap((t) =>
  PER_TOPIC.map((p) => ({
    id: `companion-${t.slug}-${p.suffix}`,
    group: `Companion: ${titleCase(t.slug.replace(/^companion-plants-for-/, ""))}`,
    label: p.label,
    purpose: p.purpose,
    shape: p.shape,
  })),
);

const mainGuideSlots: SlotDef[] = [
  { id: "companion-main-hero", group: "Companion: Main guide", label: "Hero", purpose: "Top banner", shape: "wide" },
  { id: "companion-main-pairing-1", group: "Companion: Main guide", label: "Time-lapse 1", purpose: "Plugs in", shape: "portrait" },
  { id: "companion-main-pairing-2", group: "Companion: Main guide", label: "Time-lapse 2", purpose: "Bordering", shape: "portrait" },
  { id: "companion-main-pairing-3", group: "Companion: Main guide", label: "Time-lapse 3", purpose: "Filling out", shape: "portrait" },
  { id: "companion-main-pairing-4", group: "Companion: Main guide", label: "Time-lapse 4", purpose: "Full bloom", shape: "portrait" },
  { id: "companion-main-polyculture", group: "Companion: Main guide", label: "Polyculture", purpose: "A mixed bed", shape: "wide" },
];

export const imageSlotRegistry: SlotDef[] = [...mainGuideSlots, ...topicSlots];

export function getSlotDef(id: string): SlotDef | undefined {
  return imageSlotRegistry.find((s) => s.id === id);
}

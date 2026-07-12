import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FeaturedVariety from "@/components/FeaturedVariety";
import type { VarietyEntry } from "@/lib/variety-status";

const entry = {
  variety: {
    id: "tomatoes-gardeners-delight",
    cropSlug: "tomatoes",
    name: "Gardeners Delight",
    personality: "A reliable cherry tomato with proper allotment flavour.",
    rarity: "common",
  },
  crop: {
    name: "Tomatoes",
  },
  status: {
    state: "open",
    label: "good time",
    daysLeft: null,
    method: "Sow",
  },
  no: 7,
  supplier: {
    name: "Suttons",
    url: "https://www.suttons.co.uk/example-tomato-seed",
  },
  photo: null,
} as unknown as VarietyEntry;

describe("FeaturedVariety", () => {
  it("uses supplier-specific seed copy and a measurable position", () => {
    const html = renderToStaticMarkup(createElement(FeaturedVariety, { entry }));

    expect(html).toContain("Seeds at Suttons");
    expect(html).toContain('data-umami-event="affiliate-click"');
    expect(html).toContain('data-umami-event-type="seed"');
    expect(html).toContain('data-umami-event-position="featured-variety-seeds"');
  });
});

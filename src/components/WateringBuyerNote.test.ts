import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WateringBuyerNote from "@/components/WateringBuyerNote";

describe("WateringBuyerNote", () => {
  it("offers one rule-aware buying decision with two tracked links", () => {
    const html = renderToStaticMarkup(createElement(WateringBuyerNote));

    expect(html).toContain("Start with two good watering cans");
    expect(html).toContain("Check your allotment rules");
    expect(html).toContain("keep the water in your hand");
    expect(html).toContain("Skip the automatic setup");
    expect(html).not.toContain("Haws");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(2);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(2);
    expect(html.match(/data-umami-event-position="watering-buyer-note"/g)).toHaveLength(2);
  });
});

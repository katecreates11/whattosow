import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WateringBuyerNote from "@/components/WateringBuyerNote";

describe("WateringBuyerNote", () => {
  it("offers an early rule-aware watering kit shortlist with tracked links", () => {
    const html = renderToStaticMarkup(createElement(WateringBuyerNote));

    expect(html).toContain("The watering kit worth buying first");
    expect(html).toContain("Two 10-litre watering cans");
    expect(html).toContain("A long watering lance");
    expect(html).toContain("A water butt with a stand");
    expect(html).toContain("Buy if");
    expect(html).toContain("Skip if");
    expect(html).toContain("keep the water in your hand");
    expect(html).toContain("If your allotment tanks run dry or the hoses are always in use");
    expect(html).toContain("Skip timers and sprinklers");
    expect(html).toContain("Compare sturdy 10L cans with removable roses");
    expect(html).toContain("Compare the Gardena lance I use");
    expect(html).toContain("Compare 200L water butts");
    expect(html).not.toContain("Haws");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(3);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(3);
    expect(html).toContain('data-umami-event-position="watering-buyer-note-cans"');
    expect(html).toContain('data-umami-event-position="watering-buyer-note-lance"');
    expect(html).toContain('data-umami-event-position="watering-buyer-note-butt"');
    expect(html.match(/data-umami-event-merchant="amazon-uk"/g)).toHaveLength(3);
  });
});

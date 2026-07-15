import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WateringBuyerNote from "@/components/WateringBuyerNote";

describe("WateringBuyerNote", () => {
  it("offers an early rule-aware watering kit shortlist with tracked links", () => {
    const html = renderToStaticMarkup(createElement(WateringBuyerNote));

    expect(html).toContain("The watering kit worth buying first");
    expect(html).toContain("%2Fphotos%2Fblog%2Fwatering-lance-tomato-roots.webp");
    expect(html).toContain("Water at the roots first");
    expect(html).toContain("Start with the job, not the gadget");
    expect(html).toContain("If the problem is getting water from a shared tap to the bed");
    expect(html).toContain("If the problem is keeping rainwater close by");
    expect(html).toContain("If the problem is holiday watering");
    expect(html).toContain("Two 10-litre watering cans");
    expect(html).toContain("A long watering lance");
    expect(html).toContain("A water butt with a stand");
    expect(html).toContain("A lidded dip tank or water storage tub");
    expect(html).toContain("Buy if");
    expect(html).toContain("Skip if");
    expect(html).toContain("Check your own site rules");
    expect(html).toContain("If the tap queue is long or the hoses are always in use");
    expect(html).toContain("you want a small reserve you can dip cans from");
    expect(html).toContain("your site rules do not allow stored water");
    expect(html).toContain("Skip timers and sprinklers");
    expect(html).toContain("some allotments restrict hose use or unattended watering");
    expect(html).toContain("Do not buy a timer first");
    expect(html).toContain("Compare sturdy 10L cans with removable roses");
    expect(html).toContain("Compare the Gardena lance I use");
    expect(html).toContain("Compare 200L water butts");
    expect(html).toContain("Compare lidded water storage tubs");
    expect(html).not.toContain("Haws");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
    expect(html).toContain('data-umami-event-position="watering-buyer-note-cans"');
    expect(html).toContain('data-umami-event-position="watering-buyer-note-lance"');
    expect(html).toContain('data-umami-event-position="watering-buyer-note-butt"');
    expect(html).toContain('data-umami-event-position="watering-buyer-note-dip-tank"');
    expect(html.match(/data-umami-event-merchant="amazon-uk"/g)).toHaveLength(4);
  });
});

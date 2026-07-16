import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SeedStartingKitGuide from "./page";

describe("SeedStartingKitGuide", () => {
  it("keeps the detailed kit picks focused on the strongest buying decisions", () => {
    const html = renderToStaticMarkup(createElement(SeedStartingKitGuide));

    expect(html).toContain('data-umami-event-position="seed-kit-detail-module-trays"');
    expect(html).toContain('data-umami-event-position="seed-kit-detail-seed-compost"');
    expect(html).toContain('data-umami-event-position="seed-kit-detail-heated-propagator"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-watering-can"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-plant-labels"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-grow-light"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-one-litre-pots"');
    expect(html).toContain("The module trays to start with");
    expect(html).toContain("Fine compost for safer germination");
    expect(html).toContain("Bottom heat for true heat-lovers");
    expect(html).toContain("Water with what you already have first");
    expect(html).toContain("Label every tray, but do not buy a system");
    expect(html).toContain("Try the brightest windowsill before buying a light");
    expect(html).toContain("Reuse clean pots before buying another stack");
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-cd60-trays"');
    expect(html).not.toContain("Charles Dowding CD60 Module Trays");
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-open-seed-trays"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-vermiculite"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-spray-bottle"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-perlite"');
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(7);
    expect(html).toContain('href="/crops/tomatoes"');
    expect(html).toContain('href="/crops/basil"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
    expect(html).not.toContain("Compare Nutley");
    expect(html).not.toContain("Compare Levington");
    expect(html).not.toContain("Compare Garland");
  });
});

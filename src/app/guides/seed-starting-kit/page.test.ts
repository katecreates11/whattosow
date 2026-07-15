import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SeedStartingKitGuide from "./page";

describe("SeedStartingKitGuide", () => {
  it("tracks detailed kit picks with product-specific positions", () => {
    const html = renderToStaticMarkup(createElement(SeedStartingKitGuide));

    expect(html).toContain('data-umami-event-position="seed-kit-detail-module-trays"');
    expect(html).toContain('data-umami-event-position="seed-kit-detail-seed-compost"');
    expect(html).toContain('data-umami-event-position="seed-kit-detail-heated-propagator"');
    expect(html).toContain('data-umami-event-position="seed-kit-detail-watering-can"');
    expect(html).toContain('data-umami-event-position="seed-kit-detail-plant-labels"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-cd60-trays"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-open-seed-trays"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-vermiculite"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-spray-bottle"');
    expect(html).not.toContain('data-umami-event-position="seed-kit-detail-perlite"');
    expect(html).toContain('href="/crops/tomatoes"');
    expect(html).toContain('href="/crops/basil"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});

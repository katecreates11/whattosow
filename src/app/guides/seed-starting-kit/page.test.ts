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
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});

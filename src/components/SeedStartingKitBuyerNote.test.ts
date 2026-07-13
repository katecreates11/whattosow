import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SeedStartingKitBuyerNote from "@/components/SeedStartingKitBuyerNote";

describe("SeedStartingKitBuyerNote", () => {
  it("renders one tracked starter-kit buying moment with skip guidance", () => {
    const html = renderToStaticMarkup(createElement(SeedStartingKitBuyerNote));

    expect(html).toContain("The seed-starting kit worth buying first");
    expect(html).toContain("Essential");
    expect(html).toContain("Only for heat-lovers");
    expect(html).toContain("Module trays");
    expect(html).toContain("Seed compost");
    expect(html).toContain("Plant labels");
    expect(html).toContain("Heated propagator");
    expect(html).toContain("Skip for now");
    expect(html.match(/Buy if/g)).toHaveLength(4);
    expect(html.match(/Skip if/g)).toHaveLength(4);
    expect(html).toContain("Compare reusable 24-cell module trays");
    expect(html).toContain("Compare white labels and garden pencils");
    expect(html).toContain("grow lights");
    expect(html).toContain("Compare fine seed compost");
    expect(html).toContain("Compare heated propagators for chillies");
    expect(html).not.toContain("Get labels before you forget");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
    expect(html).toContain('data-umami-event-position="seed-starting-kit-module-trays"');
    expect(html).toContain('data-umami-event-position="seed-starting-kit-seed-compost"');
    expect(html).toContain('data-umami-event-position="seed-starting-kit-plant-labels"');
    expect(html).toContain('data-umami-event-position="seed-starting-kit-heated-propagator"');
    expect(html).not.toContain('data-umami-event-position="seed-starting-kit-top"');
    expect(html).not.toContain("View on Amazon");
  });
});

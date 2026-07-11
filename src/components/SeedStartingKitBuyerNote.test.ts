import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SeedStartingKitBuyerNote from "@/components/SeedStartingKitBuyerNote";

describe("SeedStartingKitBuyerNote", () => {
  it("renders one tracked starter-kit buying moment with skip guidance", () => {
    const html = renderToStaticMarkup(createElement(SeedStartingKitBuyerNote));

    expect(html).toContain("Buy these first");
    expect(html).toContain("Module trays");
    expect(html).toContain("Seed compost");
    expect(html).toContain("Plant labels");
    expect(html).toContain("Heated propagator");
    expect(html).toContain("Skip for now");
    expect(html).toContain("grow lights");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
    expect(html.match(/data-umami-event-position="seed-starting-kit-top"/g)).toHaveLength(4);
    expect(html).not.toContain("View on Amazon");
  });
});

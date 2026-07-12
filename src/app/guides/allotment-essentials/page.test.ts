import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AllotmentEssentialsGuide from "./page";

describe("AllotmentEssentialsGuide", () => {
  it("tracks detailed allotment kit picks with product-specific positions", () => {
    const html = renderToStaticMarkup(createElement(AllotmentEssentialsGuide));

    expect(html).toContain('data-umami-event-position="allotment-kit-detail-digging-fork"');
    expect(html).toContain('data-umami-event-position="allotment-kit-detail-watering-can"');
    expect(html).toContain('data-umami-event-position="allotment-kit-detail-fleece"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});

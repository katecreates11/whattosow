import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CompostingGuide from "./page";

describe("CompostingGuide", () => {
  it("tracks composting gear picks with product-specific positions", () => {
    const html = renderToStaticMarkup(createElement(CompostingGuide));

    expect(html).toContain('data-umami-event-position="composting-detail-blackwall-bin"');
    expect(html).toContain('data-umami-event-position="composting-detail-hotbin"');
    expect(html).toContain('data-umami-event-position="composting-detail-wormery"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});

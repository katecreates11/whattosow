import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AllotmentEssentialsBuyerNote from "@/components/AllotmentEssentialsBuyerNote";

describe("AllotmentEssentialsBuyerNote", () => {
  it("renders the first-kit links with unified affiliate tracking", () => {
    const html = renderToStaticMarkup(
      createElement(AllotmentEssentialsBuyerNote),
    );

    expect(html).toContain("Buy these first");
    expect(html).toContain("Check the classic Spear &amp; Jackson fork");
    expect(html).toContain("Get the gloves allotment people keep buying");
    expect(html).toContain("Compare simple 10L cans with roses");
    expect(html).toContain("Check lightweight horticultural fleece");
    expect(html).toContain("Skip for now");
    expect(html).toContain("full allotment starter bundle");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
    expect(
      html.match(/data-umami-event-position="allotment-essentials-top"/g),
    ).toHaveLength(4);
    expect(html).not.toContain("View on Amazon");
  });
});

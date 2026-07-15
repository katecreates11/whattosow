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
    expect(html).toContain("%2Fphotos%2Fblog%2Fwheelbarrow-loaded-tools.webp");
    expect(html).toContain("First-year kit should earn its space");
    expect(html).toContain("For the first month");
    expect(html).toContain("buy the things that remove friction");
    expect(html).toContain("Borrow before you buy");
    expect(html).toContain("borrow the expensive or bulky things once");
    expect(html).toContain("Check the classic Spear &amp; Jackson fork");
    expect(html).toContain("Get the gloves allotment people keep buying");
    expect(html).toContain("Compare simple 10L cans with roses");
    expect(html).toContain("Check lightweight horticultural fleece");
    expect(html).toContain("Skip for now");
    expect(html).toContain("full allotment starter bundle");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
    expect(html).toContain(
      'data-umami-event-position="allotment-essentials-top-spear-and-jackson-digging-fork"',
    );
    expect(html).toContain(
      'data-umami-event-position="allotment-essentials-top-showa-370-assembly-grip-gloves"',
    );
    expect(html).toContain(
      'data-umami-event-position="allotment-essentials-top-10l-watering-can-with-detachable-rose"',
    );
    expect(html).toContain(
      'data-umami-event-position="allotment-essentials-top-horticultural-fleece-17g"',
    );
    expect(
      html.match(/data-umami-event-position="allotment-essentials-top"/g),
    ).toBeNull();
    expect(html).not.toContain("View on Amazon");
  });
});

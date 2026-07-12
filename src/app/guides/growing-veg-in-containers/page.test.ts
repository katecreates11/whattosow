import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingInContainersGuide from "@/app/guides/growing-veg-in-containers/page";

describe("GrowingInContainersGuide", () => {
  it("uses specific, measurable affiliate labels for container growing", () => {
    const html = renderToStaticMarkup(createElement(GrowingInContainersGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain("Compare peat-free compost");
    expect(html).toContain("Compare potato grow bags");
    expect(html).toContain("Compare liquid feed");
    expect(html).toContain('data-umami-event-position="containers-seeds"');
    expect(html).toContain('data-umami-event-position="containers-compost"');
    expect(html).toContain('data-umami-event-position="containers-grow-bag"');
    expect(html).toContain('data-umami-event-position="containers-liquid-feed"');
    expect(html).not.toContain("Find seeds");
    expect(html).not.toContain("On Amazon");
  });
});

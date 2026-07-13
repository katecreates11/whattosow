import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingRootsGuide from "@/app/guides/growing-root-vegetables/page";

describe("GrowingRootsGuide", () => {
  it("uses clear, centrally tracked seed and carrot-fly mesh links", () => {
    const html = renderToStaticMarkup(createElement(GrowingRootsGuide));

    expect(html).toContain("Worth buying for carrots");
    expect(html).toContain("Skip seed tapes");
    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain("Compare fine insect mesh");
    expect(html).toContain('data-umami-event-position="root-vegetables-seeds-carrots"');
    expect(html).toContain('data-umami-event-position="root-vegetables-seeds-beetroot"');
    expect(html).not.toContain('data-umami-event-position="root-vegetables-seeds"');
    expect(html).toContain('data-umami-event-position="root-vegetables-carrot-fly-mesh"');
    expect(html).not.toContain("Find seeds");
    expect(html).not.toContain("On Amazon");
  });
});

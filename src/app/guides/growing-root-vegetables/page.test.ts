import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingRootsGuide from "@/app/guides/growing-root-vegetables/page";

describe("GrowingRootsGuide", () => {
  it("uses clear, centrally tracked seed and carrot-fly mesh links", () => {
    const html = renderToStaticMarkup(createElement(GrowingRootsGuide));

    expect(html).toContain("Worth buying for carrots");
    expect(html).toContain("Buy if");
    expect(html).toContain("Skip if");
    expect(html).toContain("Skip seed tapes");
    expect(html).toContain(" seed at T&amp;M");
    expect(html).not.toContain("Seeds at T&amp;M");
    expect(html).toContain("Mesh carrots before carrot fly finds them");
    expect(html).not.toContain("Compare fine mesh for carrot fly");
    expect(html).toContain("you have lost carrots to rust-coloured tunnels before");
    expect(html).toContain('data-umami-event-position="root-vegetables-seeds-carrots"');
    expect(html).toContain('data-umami-event-position="root-vegetables-seeds-beetroot"');
    expect(html).not.toContain('data-umami-event-position="root-vegetables-seeds"');
    expect(html).toContain('data-umami-event-position="root-vegetables-carrot-fly-mesh"');
    expect(html).not.toContain("Find seeds");
    expect(html).not.toContain("On Amazon");
  });
});

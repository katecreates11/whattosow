import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PestsGuide from "./page";

describe("PestsGuide", () => {
  it("tracks pest control kit picks with product-specific positions", () => {
    const html = renderToStaticMarkup(createElement(PestsGuide));

    expect(html).toContain('data-umami-event-position="pest-kit-slug-pellets"');
    expect(html).toContain('data-umami-event-position="pest-kit-enviromesh"');
    expect(html).toContain('data-umami-event-position="pest-kit-carrot-fly-barrier"');
    expect(html).not.toContain('data-umami-event-position="gear-pick"');
  });
});

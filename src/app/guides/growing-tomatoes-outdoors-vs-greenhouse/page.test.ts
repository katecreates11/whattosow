import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingTomatoesGuide from "@/app/guides/growing-tomatoes-outdoors-vs-greenhouse/page";

describe("GrowingTomatoesGuide", () => {
  it("uses positioned affiliate links for tomato seeds and feed", () => {
    const html = renderToStaticMarkup(createElement(GrowingTomatoesGuide));

    expect(html).toContain("Worth buying for tomatoes");
    expect(html).toContain("Buy if");
    expect(html).toContain("Skip if");
    expect(html).toContain("Skip feeding gadgets");
    expect(html).toContain("the first flowers have set into tiny tomatoes");
    expect(html).toContain("Cordon tomato seeds at T&amp;M");
    expect(html).toContain("Bush tomato seeds at T&amp;M");
    expect(html).toContain("Compare high-potash tomato feed");
    expect(html).toContain('data-umami-event-position="tomatoes-cordon-seeds"');
    expect(html).toContain('data-umami-event-position="tomatoes-bush-seeds"');
    expect(html).toContain('data-umami-event-position="tomatoes-feed"');
    expect(html.match(/data-umami-event-position="tomatoes-feed"/g)).toHaveLength(1);
  });
});

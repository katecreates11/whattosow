import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingTomatoesGuide from "@/app/guides/growing-tomatoes-outdoors-vs-greenhouse/page";

describe("GrowingTomatoesGuide", () => {
  it("uses positioned affiliate links for tomato seeds and feed", () => {
    const html = renderToStaticMarkup(createElement(GrowingTomatoesGuide));

    expect(html).toContain("Cordon tomato seeds at T&amp;M");
    expect(html).toContain("Bush tomato seeds at T&amp;M");
    expect(html).toContain("Compare tomato feed");
    expect(html).toContain('data-umami-event-position="tomatoes-cordon-seeds"');
    expect(html).toContain('data-umami-event-position="tomatoes-bush-seeds"');
    expect(html).toContain('data-umami-event-position="tomatoes-feed"');
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingTomatoesGuide from "@/app/guides/growing-tomatoes-outdoors-vs-greenhouse/page";

describe("GrowingTomatoesGuide", () => {
  it("uses positioned affiliate links for tomato seeds, feed and ties", () => {
    const html = renderToStaticMarkup(createElement(GrowingTomatoesGuide));

    expect(html).toContain("Worth buying / skip this");
    expect(html).toContain("High-potash tomato feed");
    expect(html).toContain("Soft ties or garden twine");
    expect(html).toContain("Skip tomato feeding gadgets");
    expect(html).toContain("Skip if you are growing bush tomatoes in pots");
    expect(html).toContain("the first flowers have set into tiny tomatoes");
    expect(html).toContain("Choose cordon tomato seeds at T&amp;M");
    expect(html).toContain("Choose bush tomato seeds at T&amp;M");
    expect(html).toContain("Tomato feed for fruiting plants");
    expect(html).toContain("Soft ties for cordon stems");
    expect(html).not.toContain("Compare tomato feed");
    expect(html).not.toContain("Compare soft plant ties");
    expect(html).toContain('data-umami-event-position="tomatoes-cordon-seeds"');
    expect(html).toContain('data-umami-event-position="tomatoes-bush-seeds"');
    expect(html).toContain('data-umami-event-position="tomatoes-feed"');
    expect(html).toContain('data-umami-event-position="tomatoes-soft-ties"');
    expect(html.match(/data-umami-event-position="tomatoes-feed"/g)).toHaveLength(1);
    expect(html.match(/data-umami-event-position="tomatoes-soft-ties"/g)).toHaveLength(1);
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
  });
});

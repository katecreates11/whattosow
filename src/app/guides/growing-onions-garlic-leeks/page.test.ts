import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingAlliumsGuide from "@/app/guides/growing-onions-garlic-leeks/page";

describe("GrowingAlliumsGuide", () => {
  it("uses specific, measurable allium affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(GrowingAlliumsGuide));

    expect(html).toContain("Allium stock at T&amp;M");
    expect(html).toContain('data-umami-event-position="allium-family-stock"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).not.toContain("Find seeds");
  });
});

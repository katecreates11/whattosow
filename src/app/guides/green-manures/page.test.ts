import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GreenManuresGuide from "@/app/guides/green-manures/page";

describe("GreenManuresGuide", () => {
  it("uses specific, measurable cover-crop seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(GreenManuresGuide));

    expect(html).toContain("Cover crop seeds at T&amp;M");
    expect(html).toContain('data-umami-event-position="green-manure-seeds-');
    expect(html).not.toContain('data-umami-event-position="green-manure-seeds"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).not.toContain("Find seeds");
  });
});

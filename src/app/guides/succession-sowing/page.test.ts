import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SuccessionSowingGuide from "@/app/guides/succession-sowing/page";

describe("SuccessionSowingGuide", () => {
  it("uses specific, measurable seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(SuccessionSowingGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain('data-umami-event-position="succession-sowing-seeds-lettuce"');
    expect(html).toContain('data-umami-event-position="succession-sowing-seeds-french-beans"');
    expect(html).not.toContain('data-umami-event-position="succession-sowing-seeds"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).not.toContain("Find seeds");
  });
});

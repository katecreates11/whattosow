import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SummerSowingGuide from "@/app/guides/what-to-sow-in-summer-uk/page";

describe("SummerSowingGuide", () => {
  it("uses specific, measurable seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(SummerSowingGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain('data-umami-event-position="summer-sowing-seeds"');
    expect(html).toContain('data-umami-event-position="summer-sowing-fleece"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).not.toContain("Find seeds");
  });
});

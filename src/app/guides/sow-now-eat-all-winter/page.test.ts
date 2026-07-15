import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SowNowEatAllWinterGuide from "@/app/guides/sow-now-eat-all-winter/page";

describe("SowNowEatAllWinterGuide", () => {
  it("uses specific, measurable seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(SowNowEatAllWinterGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain('data-umami-event-position="winter-sowing-seeds"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
  });

  it("shows the UK-average frost fallback and a quiet postcode invite before personalisation", () => {
    const html = renderToStaticMarkup(createElement(SowNowEatAllWinterGuide));

    expect(html).toContain("25 October");
    expect(html).toContain("Add your postcode");
  });

  it("links to the frost-protection guide instead of duplicating its content", () => {
    const html = renderToStaticMarkup(createElement(SowNowEatAllWinterGuide));

    expect(html).toContain('href="/guides/protecting-vegetables-from-frost"');
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import OverwinteringLegumesGuide from "@/app/guides/overwintering-broad-beans-and-peas/page";

describe("OverwinteringLegumesGuide", () => {
  it("uses specific, measurable seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(OverwinteringLegumesGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain('data-umami-event-position="overwinter-legumes-seeds"');
    expect(html).toContain('data-umami-event-merchant="thompson-morgan"');
    expect(html).not.toContain("Find seeds");
  });
});

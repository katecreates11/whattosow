import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CompanionPlantingGuide from "@/app/guides/companion-planting/page";

describe("CompanionPlantingGuide", () => {
  it("keeps the buyer note useful, tracked and not product-wall-like", () => {
    const html = renderToStaticMarkup(createElement(CompanionPlantingGuide));

    expect(html).toContain("Worth buying / skip this");
    expect(html).toContain("Check the Seeding Square seed spacer");
    expect(html).toContain('data-umami-event-position="companion-buyer-note"');
    expect(html.match(/data-umami-event-position="companion-buyer-note"/g)).toHaveLength(1);
    expect(html).toContain("Skip laminated companion charts");
  });
});

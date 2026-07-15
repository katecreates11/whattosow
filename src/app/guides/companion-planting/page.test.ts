import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CompanionPlantingGuide from "@/app/guides/companion-planting/page";

describe("CompanionPlantingGuide", () => {
  it("keeps the buyer note useful, tracked and not product-wall-like", () => {
    const html = renderToStaticMarkup(createElement(CompanionPlantingGuide));

    expect(html).toContain("Worth buying / skip this");
    expect(html).toContain("Buy if");
    expect(html).toContain("Skip if");
    expect(html).toContain("Compare marigold, calendula and nasturtium seeds");
    expect(html).toContain("marigolds, calendula, nasturtiums or borage");
    expect(html).toContain("you have bare edges, bed ends or gaps around tomatoes, beans and brassicas");
    expect(html).not.toContain("Compare companion flower seeds");
    expect(html).toContain('data-umami-event-position="companion-buyer-note-flower-seeds"');
    expect(html).not.toContain('data-umami-event-position="companion-buyer-note"');
    expect(html).toContain("Skip laminated companion charts");
  });
});

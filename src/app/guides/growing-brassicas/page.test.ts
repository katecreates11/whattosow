import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingBrassicasGuide from "@/app/guides/growing-brassicas/page";

describe("GrowingBrassicasGuide", () => {
  it("uses one trust-led brassica protection buyer note", () => {
    const html = renderToStaticMarkup(createElement(GrowingBrassicasGuide));

    expect(html).toContain("Worth buying for brassicas");
    expect(html).toContain("Buy if");
    expect(html).toContain("Skip if");
    expect(html).toContain("Skip butterfly decoys");
    expect(html).toContain("Compare brassica netting");
    expect(html).toContain("cabbage whites or pigeons have ruined a crop before");
    expect(html).toContain('data-umami-event-position="growing-brassicas-seeds-kale"');
    expect(html).toContain('data-umami-event-position="growing-brassicas-seeds-cabbage"');
    expect(html).toContain('data-umami-event-position="brassica-protection-inline"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html.match(/data-umami-event-position="brassica-protection-inline"/g)).toHaveLength(1);
    expect(html).not.toContain("On Amazon");
  });
});

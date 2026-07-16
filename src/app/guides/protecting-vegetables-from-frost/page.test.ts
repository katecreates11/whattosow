import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FrostProtectionGuide from "@/app/guides/protecting-vegetables-from-frost/page";

describe("FrostProtectionGuide", () => {
  it("uses specific, centrally tracked frost-protection buy lines", () => {
    const html = renderToStaticMarkup(createElement(FrostProtectionGuide));

    expect(html).toContain("Worth buying for frost protection");
    expect(html).toContain("Buy fleece if");
    expect(html).toContain("Add a cloche if");
    expect(html).toContain("Skip if the forecast is mild");
    expect(html).toContain("Skip emergency gadgets");
    expect(html).toContain("Fleece for sudden cold nights");
    expect(html).toContain("Cloches for salad rows");
    expect(html).not.toContain("Compare fleece for quick frost cover");
    expect(html).not.toContain("Compare cloche tunnels for salad rows");
    expect(html).toContain('data-umami-event-position="frost-protection-fleece"');
    expect(html).toContain('data-umami-event-position="frost-protection-cloche"');
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(2);
    expect(html).not.toContain("On Amazon");
  });
});

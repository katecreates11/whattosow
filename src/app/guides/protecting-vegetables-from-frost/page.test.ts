import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FrostProtectionGuide from "@/app/guides/protecting-vegetables-from-frost/page";

describe("FrostProtectionGuide", () => {
  it("uses specific, centrally tracked frost-protection buy lines", () => {
    const html = renderToStaticMarkup(createElement(FrostProtectionGuide));

    expect(html).toContain("Compare horticultural fleece");
    expect(html).toContain("Compare cloche tunnels");
    expect(html).toContain('data-umami-event-position="frost-protection-fleece"');
    expect(html).toContain('data-umami-event-position="frost-protection-cloche"');
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(2);
    expect(html).not.toContain("On Amazon");
  });
});

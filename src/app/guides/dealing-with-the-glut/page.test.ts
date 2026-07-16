import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GlutGuide from "@/app/guides/dealing-with-the-glut/page";

describe("GlutGuide", () => {
  it("uses specific, measurable harvest and preserving affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(GlutGuide));

    expect(html).toContain("Harvest trugs for heavy picking days");
    expect(html).toContain("Maslin pan for jam days");
    expect(html).not.toContain("Compare harvest trugs");
    expect(html).not.toContain("Compare maslin pans");
    expect(html).toContain('data-umami-event-position="glut-harvest-trug"');
    expect(html).toContain('data-umami-event-position="glut-maslin-pan"');
  });
});

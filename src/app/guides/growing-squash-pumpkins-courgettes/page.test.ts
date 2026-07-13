import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingSquashGuide from "@/app/guides/growing-squash-pumpkins-courgettes/page";

describe("GrowingSquashGuide", () => {
  it("uses specific, measurable seed and membrane affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(GrowingSquashGuide));

    expect(html).toContain("Worth buying for squash and courgettes");
    expect(html).toContain("Skip decorative supports");
    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain("Compare high-potash feed");
    expect(html).toContain("Compare ground cover membrane");
    expect(html).toContain('data-umami-event-position="squash-family-seeds-courgettes"');
    expect(html).toContain('data-umami-event-position="squash-family-seeds-pumpkins"');
    expect(html).not.toContain('data-umami-event-position="squash-family-seeds"');
    expect(html).toContain('data-umami-event-position="squash-family-feed"');
    expect(html).toContain('data-umami-event-position="squash-family-membrane"');
    expect(html).not.toContain("Find seeds");
  });
});

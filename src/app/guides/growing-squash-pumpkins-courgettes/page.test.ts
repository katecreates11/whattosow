import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GrowingSquashGuide from "@/app/guides/growing-squash-pumpkins-courgettes/page";

describe("GrowingSquashGuide", () => {
  it("uses specific, measurable seed and membrane affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(GrowingSquashGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain("Compare ground cover membrane");
    expect(html).toContain('data-umami-event-position="squash-family-seeds"');
    expect(html).toContain('data-umami-event-position="squash-family-membrane"');
    expect(html).not.toContain("Find seeds");
  });
});

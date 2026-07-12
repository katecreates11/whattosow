import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AutumnWinterGuide from "@/app/guides/autumn-winter-vegetables/page";

describe("AutumnWinterGuide", () => {
  it("uses clearer seed and frost-protection affiliate labels with measurable positions", () => {
    const html = renderToStaticMarkup(createElement(AutumnWinterGuide));

    expect(html).toContain("Seeds at T&amp;M");
    expect(html).toContain("Compare horticultural fleece");
    expect(html).toContain("Compare cloche tunnels");
    expect(html).toContain('data-umami-event-position="autumn-winter-seeds"');
    expect(html).toContain('data-umami-event-position="autumn-winter-fleece"');
    expect(html).toContain('data-umami-event-position="autumn-winter-cloche"');
    expect(html).not.toContain("Find seeds");
    expect(html).not.toContain("On Amazon");
  });
});

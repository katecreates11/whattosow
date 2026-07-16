import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WinterSaladGuide from "@/app/guides/growing-winter-salad-leaves/page";

describe("WinterSaladGuide", () => {
  it("uses clear, centrally tracked seed and cloche links", () => {
    const html = renderToStaticMarkup(createElement(WinterSaladGuide));

    expect(html).toContain("Worth buying for winter salad");
    expect(html).toContain("Skip heated gadgets");
    expect(html).toContain(" seed at T&amp;M");
    expect(html).not.toContain("Seeds at T&amp;M");
    expect(html).toContain("Cloches for winter salad rows");
    expect(html).not.toContain("Compare cloche tunnels");
    expect(html).toContain('data-umami-event-position="winter-salad-seeds-lambs-lettuce-corn-salad"');
    expect(html).toContain('data-umami-event-position="winter-salad-seeds-spinach-hardy-types"');
    expect(html).not.toContain('data-umami-event-position="winter-salad-seeds"');
    expect(html).toContain('data-umami-event-position="winter-salad-cloche"');
    expect(html.match(/data-umami-event-position="winter-salad-cloche"/g)).toHaveLength(1);
    expect(html).not.toContain("Find seeds");
    expect(html).not.toContain("On Amazon");
  });
});

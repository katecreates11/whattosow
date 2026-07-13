import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import KitPage from "./page";

describe("KitPage", () => {
  it("routes legacy kit links through the unified affiliate tracking fields", () => {
    const html = renderToStaticMarkup(createElement(KitPage));

    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html).toContain('data-umami-event-position="kit-pick-spear-and-jackson-digging-fork"');
    expect(html).toContain('data-umami-event-position="kit-pick-haws-8-8l-long-reach-watering-can"');
    expect(html).not.toContain('data-umami-event-merchant="amazon"');
  });
});

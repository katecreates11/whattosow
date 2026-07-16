import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WateringGuide from "@/app/guides/watering/page";

describe("WateringGuide", () => {
  it("links thirsty crop examples to live crop pages", () => {
    const html = renderToStaticMarkup(createElement(WateringGuide));

    expect(html).toContain('href="/crops/courgettes"');
    expect(html).toContain('href="/crops/cucumbers"');
    expect(html).not.toContain('href="/crops/courgette"');
    expect(html).not.toContain('href="/crops/cucumber"');
  });

  it("routes kit-minded readers to the existing watering shortlist", () => {
    const html = renderToStaticMarkup(createElement(WateringGuide));

    expect(html).toContain('href="#watering-kit"');
    expect(html).toContain("Jump to the watering kit shortlist");
  });
});

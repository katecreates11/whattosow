import { createElement } from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AffiliateButtons from "@/components/AffiliateButtons";

describe("AffiliateButtons", () => {
  it("uses a supplier-led seed heading instead of a generic buy prompt", () => {
    const html = renderToStaticMarkup(
      createElement(AffiliateButtons, {
        variety: "Aquadulce Claudia",
        rarity: "common",
        suppliers: [{ name: "Suttons", url: "https://www.suttons.co.uk/example" }],
      }),
    );

    expect(html).toContain("Seed suppliers");
    expect(html).toContain('data-umami-event-type="seed"');
    expect(html).toContain('data-umami-event-position="lucky-dip-seeds-aquadulce-claudia-suttons"');
    expect(html).not.toContain("Get the seeds");
  });

  it("does not fire a second legacy affiliate event in client code", () => {
    const source = readFileSync("src/components/AffiliateButtons.tsx", "utf8");

    expect(source).not.toContain("umami.track");
    expect(source).not.toContain("lucky-dip-affiliate-click");
    expect(source).not.toContain("card-detail-affiliate-click");
    expect(source).toContain('data-umami-event="affiliate-click"');
  });
});

import { createElement } from "react";
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
    expect(html).not.toContain("Get the seeds");
  });
});

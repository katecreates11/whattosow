import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CropBuyingAdvice from "@/components/CropBuyingAdvice";
import SeedStartingKitBuyerNote from "@/components/SeedStartingKitBuyerNote";
import WateringBuyerNote from "@/components/WateringBuyerNote";
import SowPage from "@/app/sow/page";
import GrowingSquashGuide from "@/app/guides/growing-squash-pumpkins-courgettes/page";
import GrowingTomatoesGuide from "@/app/guides/growing-tomatoes-outdoors-vs-greenhouse/page";

function affiliateAnchors(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*data-umami-event="affiliate-click"[^>]*>/g)].map((match) => match[0]);
}

describe("affiliate link health", () => {
  it("keeps core commercial surfaces tagged, sponsored and measurable", () => {
    const html = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(WateringBuyerNote),
        createElement(SeedStartingKitBuyerNote),
        createElement(CropBuyingAdvice, { slug: "tomatoes" }),
        createElement(CropBuyingAdvice, { slug: "basil" }),
        createElement(CropBuyingAdvice, { slug: "courgettes" }),
        createElement(SowPage),
        createElement(GrowingTomatoesGuide),
        createElement(GrowingSquashGuide),
      ),
    );
    const links = affiliateAnchors(html);

    expect(links.length).toBeGreaterThan(25);
    for (const link of links) {
      expect(link).toContain('rel="sponsored noopener noreferrer"');
      expect(link).toContain('data-umami-event-product="');
      expect(link).toContain('data-umami-event-merchant="');
      expect(link).toContain('data-umami-event-type="');
      expect(link).toContain('data-umami-event-position="');
      expect(link).not.toContain('data-umami-event-merchant="amazon"');
      expect(link).not.toContain('data-umami-event-product="unknown-product"');
      if (link.includes("amazon.co.uk")) {
        expect(link).toContain("tag=whattosow21-21");
      }
      if (link.includes("amazon.com")) {
        expect(link).toContain("tag=whattosowus-20");
      }
    }
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AffiliateLink, { affiliateUrl } from "@/components/AffiliateLink";

describe("AffiliateLink", () => {
  it("uses the UK store id for Amazon UK links", () => {
    expect(affiliateUrl("https://www.amazon.co.uk/s?k=watering+can")).toBe(
      "https://www.amazon.co.uk/s?k=watering+can&tag=whattosow21-21",
    );
  });

  it("uses the US store id for Amazon US links", () => {
    expect(affiliateUrl("https://www.amazon.com/s?k=watering+can")).toBe(
      "https://www.amazon.com/s?k=watering+can&tag=whattosowus-20",
    );
  });

  it("tracks Amazon UK and US merchants separately", () => {
    const ukHtml = renderToStaticMarkup(
      createElement(
        AffiliateLink,
        {
          href: "https://www.amazon.co.uk/s?k=watering+can",
          product: "watering can",
        },
        "UK watering cans",
      ),
    );
    const usHtml = renderToStaticMarkup(
      createElement(
        AffiliateLink,
        {
          href: "https://www.amazon.com/s?k=watering+can",
          product: "watering can",
        },
        "US watering cans",
      ),
    );

    expect(ukHtml).toContain('data-umami-event-merchant="amazon-uk"');
    expect(usHtml).toContain('data-umami-event-merchant="amazon-us"');
  });

  it("forwards extra tracking attributes without losing the core affiliate event", () => {
    const html = renderToStaticMarkup(
      createElement(
        AffiliateLink,
        {
          href: "https://search.thompson-morgan.com/seeds/Lettuce",
          product: "lettuce seeds",
          type: "seed",
          merchant: "thompson-morgan",
          position: "test-position",
          "data-umami-event-topic": "succession-sowing",
        },
        "Seeds at T&M",
      ),
    );

    expect(html).toContain('data-umami-event="affiliate-click"');
    expect(html).toContain('data-umami-event-position="test-position"');
    expect(html).toContain('data-umami-event-topic="succession-sowing"');
  });
});

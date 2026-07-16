import { describe, expect, it } from "vitest";
import { affiliateClickPayloadFromLink } from "@/lib/affiliate-click-browser";

describe("affiliateClickPayloadFromLink", () => {
  it("extracts the same affiliate fields Umami sees without reading href or personal data", () => {
    const attributes: Record<string, string> = {
      "data-umami-event": "affiliate-click",
      "data-umami-event-product": "High-potash tomato feed",
      "data-umami-event-merchant": "amazon-uk",
      "data-umami-event-type": "gear",
      "data-umami-event-position": "tomatoes-feed",
      href: "https://www.amazon.co.uk/s?k=tomato+feed&tag=whattosow21-21",
    };

    const payload = affiliateClickPayloadFromLink(
      { getAttribute: (name) => attributes[name] ?? null },
      "/guides/growing-tomatoes-outdoors-vs-greenhouse",
    );

    expect(payload).toEqual({
      product: "High-potash tomato feed",
      merchant: "amazon-uk",
      type: "gear",
      position: "tomatoes-feed",
      path: "/guides/growing-tomatoes-outdoors-vs-greenhouse",
    });
    expect(JSON.stringify(payload)).not.toContain("amazon.co.uk");
  });

  it("returns null for non-affiliate links", () => {
    expect(
      affiliateClickPayloadFromLink(
        { getAttribute: (name) => (name === "data-umami-event" ? "postcode-search" : null) },
        "/",
      ),
    ).toBeNull();
  });
});

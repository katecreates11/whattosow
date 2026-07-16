import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ChristmasPlate, {
  christmasAffiliateMerchant,
  christmasAffiliatePosition,
  christmasSeedCtaLabel,
} from "@/components/ChristmasPlate";

describe("ChristmasPlate", () => {
  it("uses specific, measurable Christmas seed affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(ChristmasPlate, { nowISO: "2026-07-12T09:00:00.000Z" }));

    expect(christmasSeedCtaLabel("https://www.suttons.co.uk/search?q=rocket")).toBe("Rocket seed at Suttons");
    expect(christmasSeedCtaLabel("https://www.amazon.co.uk/s?k=potato+grow+bags")).toBe("Seed for this crop");
    expect(christmasAffiliateMerchant("https://www.amazon.co.uk/s?k=potato+grow+bags")).toBe("amazon-uk");
    expect(christmasAffiliateMerchant("https://www.amazon.com/s?k=potato+grow+bags")).toBe("amazon-us");
    expect(christmasAffiliateMerchant("https://www.suttons.co.uk/search?q=rocket")).toBe("suttons");
    expect(christmasAffiliatePosition("Christmas new potatoes", "seeds")).toBe("christmas-plate-seeds-christmas-new-potatoes");
    expect(christmasAffiliatePosition("Christmas new potatoes", "kit")).toBe("christmas-plate-kit-christmas-new-potatoes");
    expect(christmasAffiliatePosition("Brussels sprouts", "seeds")).toBe("christmas-plate-seeds-brussels-sprouts");
    expect(html).not.toContain('data-umami-event-merchant="amazon"');
    expect(html).not.toContain("Compare seeds");
    expect(html).not.toContain("Buy the seeds");
  });
});

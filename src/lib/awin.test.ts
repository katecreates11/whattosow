import { describe, expect, it } from "vitest";
import { awinLink, repairMerchantUrl, thompsonMorganSearch } from "@/lib/awin";

describe("awinLink", () => {
  it("does not wrap an Awin deep link twice", () => {
    const destination = "https://search.thompson-morgan.com/seeds/Lettuce";
    const wrapped = awinLink(destination);

    expect(awinLink(wrapped)).toBe(wrapped);
  });
});

describe("Thompson & Morgan links that actually search", () => {
  const WORKING = "https://www.thompson-morgan.com/search-results?q=";

  it("repairs the search-subdomain link, which redirected to an empty results page", () => {
    expect(repairMerchantUrl("https://search.thompson-morgan.com/seeds/Cress")).toBe(`${WORKING}Cress`);
    // these were written pre-encoded and then encoded again
    expect(repairMerchantUrl("https://search.thompson-morgan.com/seeds/Lambs%2520Lettuce")).toBe(`${WORKING}Lambs%20Lettuce`);
    expect(repairMerchantUrl("https://search.thompson-morgan.com/seeds/Winter%20Lettuce")).toBe(`${WORKING}Winter%20Lettuce`);
  });

  it("repairs /search?q=, which searched for the literal text 'q=cress'", () => {
    expect(repairMerchantUrl("https://www.thompson-morgan.com/search?q=cress")).toBe(`${WORKING}cress`);
    expect(repairMerchantUrl("https://www.thompson-morgan.com/search?q=broad+beans+seeds")).toBe(`${WORKING}broad%20beans%20seeds`);
  });

  it("leaves product pages, working searches and other merchants exactly as they are", () => {
    for (const url of [
      "https://www.thompson-morgan.com/p/cress-extra-curled-seeds/623TM",
      "https://www.thompson-morgan.com/search-results?q=cress",
      "https://www.thompson-morgan.com/seeds/microgreens",
      "https://www.suttons.co.uk/search?q=peas",
      "https://www.amazon.co.uk/s?k=seed+trays",
    ]) {
      expect(repairMerchantUrl(url)).toBe(url);
    }
  });

  it("sends the repaired destination through Awin, so the click still earns", () => {
    const tracked = awinLink("https://www.thompson-morgan.com/search?q=radish+seeds");
    expect(tracked).toContain("awinmid=2283");
    expect(decodeURIComponent(tracked.split("ued=")[1])).toBe(`${WORKING}radish%20seeds`);
    expect(thompsonMorganSearch("pea shoots")).toBe(`${WORKING}pea%20shoots`);
  });
});

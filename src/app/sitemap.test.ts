import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

const urls = sitemap().map((entry) => entry.url);

describe("sitemap", () => {
  it("excludes redirected, non-canonical, noindex, and internal routes", () => {
    expect(urls).not.toContain("https://whattosow.co.uk/kit");
    expect(urls).not.toContain("https://whattosow.co.uk/lucky-dip");
    expect(urls).not.toContain("https://whattosow.co.uk/products");
    expect(urls).not.toContain("https://whattosow.co.uk/print");
    expect(urls).not.toContain("https://whattosow.co.uk/bed-planner");
    expect(urls).not.toContain("https://whattosow.co.uk/my-plot");
    expect(urls).not.toContain("https://whattosow.co.uk/my-garden");
    expect(urls.some((url) => url.startsWith("https://whattosow.co.uk/pins"))).toBe(false);
  });

  it("includes canonical SEO and commercial guide routes", () => {
    expect(urls).toContain("https://whattosow.co.uk/sow");
    expect(urls).toContain("https://whattosow.co.uk/us");
    expect(urls).toContain("https://whattosow.co.uk/calendar");
    expect(urls).toContain("https://whattosow.co.uk/guides/allotment-essentials");
    expect(urls).toContain("https://whattosow.co.uk/guides/seed-starting-kit");
    expect(urls).toContain("https://whattosow.co.uk/guides/watering-while-away");
    expect(urls).toContain("https://whattosow.co.uk/guides/dealing-with-the-glut");
    expect(urls).toContain("https://whattosow.co.uk/crops/tomatoes");
    expect(urls).toContain("https://whattosow.co.uk/sow/july");
  });
});

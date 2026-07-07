import { describe, it, expect } from "vitest";
import {
  isDirectSeedLink,
  directSupplier,
  isFeaturable,
  allEntries,
  featuredEntry,
} from "./variety-status";
import type { Variety } from "@/data/varieties";

describe("isDirectSeedLink", () => {
  it("accepts real product pages", () => {
    expect(isDirectSeedLink("https://www.thompson-morgan.com/p/pea-kelvedon-wonder-seeds/107TM")).toBe(true);
    expect(isDirectSeedLink("https://www.suttons.co.uk/vegetable-seeds/pea-seeds/pea-seeds-kelvedon-wonder_MH-1566")).toBe(true);
    expect(isDirectSeedLink("https://www.sarahraven.com/products/radish-french-breakfast")).toBe(true);
  });

  it("rejects search-results links", () => {
    expect(isDirectSeedLink("https://www.thompson-morgan.com/search?q=butternut+squash")).toBe(false);
    expect(isDirectSeedLink("https://www.suttons.co.uk/search?q=the+prince+french+beans")).toBe(false);
    expect(isDirectSeedLink("https://example.com/shop?foo=1&q=carrot")).toBe(false);
  });

  it("rejects empty urls", () => {
    expect(isDirectSeedLink("")).toBe(false);
  });
});

describe("directSupplier", () => {
  it("skips a leading search link and returns the first direct one", () => {
    const v = {
      seedSuppliers: [
        { name: "Search Co", url: "https://x.com/search?q=carrot" },
        { name: "Direct Co", url: "https://x.com/p/carrot/123" },
      ],
    } as Variety;
    expect(directSupplier(v)?.name).toBe("Direct Co");
  });

  it("returns null when every supplier is a search link", () => {
    const v = {
      seedSuppliers: [{ name: "Search Co", url: "https://x.com/search?q=carrot" }],
    } as Variety;
    expect(directSupplier(v)).toBeNull();
  });

  it("returns null when there are no suppliers", () => {
    const v = { seedSuppliers: [] } as unknown as Variety;
    expect(directSupplier(v)).toBeNull();
  });
});

describe("featuredEntry — the trust gate", () => {
  // Probe every ISO week of the year: the feature rotates weekly, so no single
  // date proves the gate holds. If any week surfaces a bad pick, fail loudly.
  const weeks = Array.from({ length: 53 }, (_, i) => new Date(2026, 0, 1 + i * 7));

  it("never features a variety without a direct seed link", () => {
    for (const now of weeks) {
      const e = featuredEntry(undefined, now);
      if (!e) continue;
      expect(e.supplier, `week of ${now.toDateString()}`).not.toBeNull();
      expect(isDirectSeedLink(e.supplier!.url)).toBe(true);
    }
  });

  it("never features a variety without a real photo", () => {
    for (const now of weeks) {
      const e = featuredEntry(undefined, now);
      if (!e) continue;
      expect(e.photo, `week of ${now.toDateString()}`).not.toBeNull();
      expect(e.photo!.src.startsWith("/")).toBe(true); // local asset, never a remote/stock URL
    }
  });
});

describe("isFeaturable", () => {
  it("requires both a supplier and a photo", () => {
    const base = allEntries()[0];
    expect(isFeaturable({ ...base, supplier: null })).toBe(false);
    expect(isFeaturable({ ...base, photo: null })).toBe(false);
    expect(isFeaturable({ ...base, supplier: { name: "X", url: "https://x/p/1" }, photo: { src: "/a.webp", alt: "a" } })).toBe(true);
  });
});

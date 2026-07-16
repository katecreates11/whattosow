import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { crops } from "@/data/crops";
import SeedSupplierLinks from "@/components/SeedSupplierLinks";

const tomatoes = crops.find((crop) => crop.slug === "tomatoes");

describe("SeedSupplierLinks", () => {
  it("uses supplier-specific seed CTAs in the sidebar", () => {
    if (!tomatoes) throw new Error("Tomatoes crop fixture missing");

    const html = renderToStaticMarkup(
      createElement(SeedSupplierLinks, { crop: tomatoes, variant: "sidebar" }),
    );

    expect(html).toContain("Where to buy seeds for tomatoes");
    expect(html).toContain("Seeds at ");
    expect(html).toContain("font-serif text-rust underline");
    expect(html).not.toContain("px-4 py-2.5 border border-earth/8");
    expect(html).toContain(
      'data-umami-event-position="seed-supplier-sidebar-tomatoes-thompson-morgan"',
    );
    expect(html).toContain('data-umami-event-type="seed"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
  });

  it("uses supplier-specific compact copy for repeated cards", () => {
    if (!tomatoes) throw new Error("Tomatoes crop fixture missing");

    const html = renderToStaticMarkup(
      createElement(SeedSupplierLinks, { crop: tomatoes, variant: "compact" }),
    );

    expect(html).toContain("Seeds at ");
    expect(html).toContain("font-serif text-rust underline");
    expect(html).toContain(
      'data-umami-event-position="seed-supplier-compact-tomatoes-thompson-morgan"',
    );
    expect(html).not.toContain("Buy seeds");
  });

  it("keeps inline crop-page seed links mobile-only to avoid desktop rail duplication", () => {
    if (!tomatoes) throw new Error("Tomatoes crop fixture missing");

    const html = renderToStaticMarkup(
      createElement(SeedSupplierLinks, { crop: tomatoes, variant: "inline" }),
    );

    expect(html).toContain("Get seeds for tomatoes");
    expect(html).toContain("font-serif text-rust underline");
    expect(html).toContain(
      'data-umami-event-position="seed-supplier-inline-tomatoes-thompson-morgan"',
    );
    expect(html).toContain("lg:hidden");
  });
});

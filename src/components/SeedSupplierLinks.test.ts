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

    expect(html).toContain("Where to buy tomatoes seeds");
    expect(html).toContain("Seeds at ");
    expect(html).toContain('data-umami-event-position="sidebar"');
    expect(html).toContain('data-umami-event-type="seed"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
  });

  it("uses supplier-specific compact copy for repeated cards", () => {
    if (!tomatoes) throw new Error("Tomatoes crop fixture missing");

    const html = renderToStaticMarkup(
      createElement(SeedSupplierLinks, { crop: tomatoes, variant: "compact" }),
    );

    expect(html).toContain("Seeds at ");
    expect(html).toContain('data-umami-event-position="variety-card"');
    expect(html).not.toContain("Buy seeds");
  });

  it("keeps inline crop-page seed links mobile-only to avoid desktop rail duplication", () => {
    if (!tomatoes) throw new Error("Tomatoes crop fixture missing");

    const html = renderToStaticMarkup(
      createElement(SeedSupplierLinks, { crop: tomatoes, variant: "inline" }),
    );

    expect(html).toContain("Get tomatoes seeds");
    expect(html).toContain('data-umami-event-position="inline"');
    expect(html).toContain("lg:hidden");
  });
});

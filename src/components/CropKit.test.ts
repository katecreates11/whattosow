import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CropKit from "@/components/CropKit";

describe("CropKit", () => {
  it("keeps crop kit links tracked without generic Amazon button copy", () => {
    const html = renderToStaticMarkup(
      createElement(CropKit, { slug: "tomatoes", cropName: "Tomatoes" }),
    );

    expect(html).toContain("What you&#x27;ll need for tomatoes");
    expect(html).toContain("Tomato feed");
    expect(html).toContain('data-umami-event="affiliate-click"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html).toContain('data-umami-event-position="crop-kit-tomatoes-tomato-feed-tomorite"');
    expect(html).toContain('data-umami-event-position="crop-kit-tomatoes-soft-plant-ties"');
    expect(html).toContain("Compare tomato feed");
    expect(html).toContain("Compare soft plant ties");
    expect(html).not.toContain("Compare options");
    expect(html).not.toContain(">Amazon<");
  });
});

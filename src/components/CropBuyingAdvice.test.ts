import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CropBuyingAdvice from "@/components/CropBuyingAdvice";

describe("CropBuyingAdvice", () => {
  it("renders tracked worth-buying links and unlinked skip guidance", () => {
    const html = renderToStaticMarkup(
      createElement(CropBuyingAdvice, { slug: "tomatoes" }),
    );

    expect(html).toContain("Worth buying, and what to skip");
    expect(html).toContain("Check Tomorite-style tomato feed");
    expect(html).toContain("Compare soft ties and tomato clips");
    expect(html).toContain("Gimmicky growbag frames");
    expect(html).toContain("data-crop-buying-skip");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(2);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(2);
    expect(
      html.match(/data-umami-event-position="crop-buying-advice-tomatoes"/g),
    ).toHaveLength(2);
    expect(html.match(/data-umami-event-merchant="amazon-uk"/g)).toHaveLength(2);
    expect(html).not.toContain("Find tomato feed");
  });
});

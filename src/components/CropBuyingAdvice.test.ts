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
    expect(html).toContain("%2Fphotos%2Fblog%2Ftomato-bed-marigold-ring.webp");
    expect(html).toContain("Tomatoes and marigolds on the plot");
    expect(html).toContain("Tomato feed for fruiting plants");
    expect(html).toContain("Soft ties for tying in cordons");
    expect(html).toContain("font-serif text-rust underline");
    expect(html).toContain("Gimmicky growbag frames");
    expect(html).toContain("data-crop-buying-skip");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(2);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(2);
    expect(html).toContain(
      'data-umami-event-position="crop-buying-advice-tomatoes-tomato-feed"',
    );
    expect(html).toContain(
      'data-umami-event-position="crop-buying-advice-tomatoes-soft-plant-ties"',
    );
    expect(
      html.match(/data-umami-event-position="crop-buying-advice-tomatoes"/g),
    ).toBeNull();
    expect(html.match(/data-umami-event-merchant="amazon-uk"/g)).toHaveLength(2);
    expect(html).not.toContain("Find tomato feed");
    expect(html).not.toContain("Compare high-potash tomato feed");
    expect(html).not.toContain("border border-earth/10 px-3 py-2");
  });

  it("tracks crop buying seed recommendations as seed links", () => {
    const html = renderToStaticMarkup(
      createElement(CropBuyingAdvice, { slug: "basil" }),
    );

    expect(html).toContain("Fresh Genovese basil seed");
    expect(html).toContain("Small pots for basil on a warm sill");
    expect(html).toContain("%2Fphotos%2Fcrops%2Fpurple-basil-seedling.webp");
    expect(html).toContain("Basil seedlings are small, quick and cheap");
    expect(html).toContain('data-umami-event-position="crop-buying-advice-basil-basil-seed"');
    expect(html).toContain('data-umami-event-type="seed"');
    expect(html).toContain("Big indoor herb kits");
  });

  it("uses plot photos on non-tomato buying blocks without adding more links", () => {
    const html = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(CropBuyingAdvice, { slug: "carrots" }),
        createElement(CropBuyingAdvice, { slug: "courgettes" }),
        createElement(CropBuyingAdvice, { slug: "maincrop-potatoes" }),
        createElement(CropBuyingAdvice, { slug: "runner-beans" }),
      ),
    );

    expect(html).toContain("%2Fphotos%2Fblog%2Fcarrot-harvest-crate.webp");
    expect(html).toContain("%2Fphotos%2Fblog%2Fcourgette-young-plant.webp");
    expect(html).toContain("%2Fphotos%2Fblog%2Fpotato-rows-june-2026.webp");
    expect(html).toContain("%2Fphotos%2Fcrops%2Frunner-beans-climbing.webp");
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(7);
  });

  it("keeps courgette feed tracking distinct from tomato feed", () => {
    const html = renderToStaticMarkup(
      createElement(CropBuyingAdvice, { slug: "courgettes" }),
    );

    expect(html).toContain("High-potash feed for pot-grown courgettes");
    expect(html).toContain(
      'data-umami-event-position="crop-buying-advice-courgettes-high-potash-feed"',
    );
    expect(html).not.toContain(
      'data-umami-event-position="crop-buying-advice-courgettes-tomato-feed"',
    );
  });
});

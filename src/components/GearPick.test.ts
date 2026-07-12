import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GearPick, { TopPicksGrid } from "@/components/GearPick";

describe("GearPick", () => {
  it("uses editorial button copy and unified affiliate tracking", () => {
    const html = renderToStaticMarkup(
      createElement(GearPick, {
        name: "Dutch hoe",
        price: "£12-20",
        description: "A useful hoe for dry-day weeding.",
        amazonUrl: "https://www.amazon.co.uk/s?k=dutch+hoe",
      }),
    );

    expect(html).toContain("Check this pick");
    expect(html).toContain("data-umami-event=\"affiliate-click\"");
    expect(html).toContain("data-umami-event-position=\"gear-pick\"");
    expect(html).toContain("rel=\"sponsored noopener noreferrer\"");
    expect(html).not.toContain("View on Amazon");
  });

  it("tracks top-picks grids separately from ordinary gear picks", () => {
    const html = renderToStaticMarkup(
      createElement(TopPicksGrid, {
        picks: [
          {
            name: "Compost bin",
            why: "For turning plot waste into mulch.",
            price: "£30",
            amazonUrl: "https://www.amazon.co.uk/s?k=compost+bin",
          },
        ],
      }),
    );

    expect(html).toContain("data-umami-event-position=\"top-picks-grid\"");
    expect(html).toContain("data-umami-event=\"affiliate-click\"");
    expect(html).toContain("rel=\"sponsored noopener noreferrer\"");
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ServerSeasonalAnswer from "@/components/ServerSeasonalAnswer";

describe("ServerSeasonalAnswer", () => {
  it("keeps the sow list seed links crawlable and measurable", () => {
    const html = renderToStaticMarkup(createElement(ServerSeasonalAnswer));

    expect(html).toContain("The sowing list");
    expect(html).toContain(" seeds at ");
    expect(html).toContain("data-umami-event=\"affiliate-click\"");
    expect(html).toContain("data-umami-event-type=\"seed\"");
    expect(html).toContain("data-umami-event-position=\"sow-list-seeds\"");
    expect(html).toContain("data-umami-event-crop=");
    expect(html).toContain("rel=\"sponsored noopener noreferrer\"");
  });
});

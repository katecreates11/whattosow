import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import ServerSeasonalAnswer from "@/components/ServerSeasonalAnswer";

describe("ServerSeasonalAnswer", () => {
  // The sow list follows the calendar, so pin the clock: a July week leads with
  // a seed crop, an October week leads with garlic bulbs.
  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps the sow list seed links crawlable and measurable", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-07-15T09:00:00Z"));
    const html = renderToStaticMarkup(createElement(ServerSeasonalAnswer));

    expect(html).toContain("The sowing list");
    expect(html).toContain(" seed at ");
    expect(html).not.toContain("Seeds at ");
    expect(html).not.toContain("Seeds · ");
    expect(html).toContain("data-umami-event=\"affiliate-click\"");
    expect(html).toContain("data-umami-event-type=\"seed\"");
    expect(html).toContain("data-umami-event-position=\"sow-list-seeds-lead-");
    expect(html).toContain("data-umami-event-position=\"sow-list-seeds-");
    expect(html).not.toContain("data-umami-event-position=\"sow-list-seeds\"");
    expect(html).toContain("data-umami-event-crop=");
    expect(html).toContain("rel=\"sponsored noopener noreferrer\"");
  });

  it("labels a bulb crop as bulbs, not seed", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-19T09:00:00Z"));
    const html = renderToStaticMarkup(createElement(ServerSeasonalAnswer));

    expect(html).toContain("Garlic bulbs at ");
    expect(html).not.toContain("Garlic seed");
  });
});

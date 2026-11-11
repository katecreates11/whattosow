import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import ServerSeasonalAnswer from "@/components/ServerSeasonalAnswer";

function renderOn(date: string): string {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(date));
  return renderToStaticMarkup(createElement(ServerSeasonalAnswer));
}

describe("ServerSeasonalAnswer", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  // Pinned to a July week so the list always holds true seed crops; in
  // November the only entry is garlic, which is sold as bulbs, not seed.
  it("keeps the sow list seed links crawlable and measurable", () => {
    const html = renderOn("2026-07-08T12:00:00");

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

  it("never tells the reader to wait on the crop it has just picked for the week", () => {
    const html = renderOn("2026-11-11T12:00:00");
    const waiting = html.slice(html.indexOf("id=\"waiting-heading\""), html.indexOf("id=\"deeper-heading\""));

    expect(html).toContain("If you sow one thing this week");
    expect(html).toContain("href=\"/crops/broad-beans\"");
    expect(waiting).not.toContain("/crops/broad-beans");
    expect(waiting).toContain("in <a href=\"/sow/january\"");
    expect(waiting).toContain(">January</a>");
    expect(html).not.toContain("keep young plants watered and ready");
    expect(html).toContain("href=\"/grow-your-christmas-dinner\"");
  });
});

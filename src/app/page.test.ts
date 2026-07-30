import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

describe("Home", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("tracks homepage plant-out affiliate links with specific positions", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain('data-umami-event-position="homepage-plant-out-fleece"');
    expect(html).toContain('data-umami-event-position="homepage-plant-out-young-plants"');
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import SowPage, { revalidate } from "./page";

describe("SowPage", () => {
  afterEach(() => vi.useRealTimers());

  it("regenerates the sowing list every hour", () => {
    expect(revalidate).toBe(3600);
  });

  it("keeps the August heading and seasonal kit together", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-01T12:00:00.000Z"));

    const html = renderToStaticMarkup(SowPage());

    expect(html).toContain("week of 1 August");
    expect(html).toContain("The August edit");
  });
});

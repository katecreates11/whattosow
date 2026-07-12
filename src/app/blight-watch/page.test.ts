import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlightWatchPage from "@/app/blight-watch/page";

describe("BlightWatchPage", () => {
  it("keeps blight commerce focused on resistant varieties rather than inline gear clutter", () => {
    const html = renderToStaticMarkup(createElement(BlightWatchPage));

    expect(html).toContain("Blight-resistant varieties worth growing");
    expect(html).toContain("Crimson Crush tomato seeds");
    expect(html).toContain("Sarpo Mira seed potatoes");
    expect(html).toContain("Crimson Cherry tomato seeds");
    expect(html).toContain('data-umami-event-position="blight-resistant-varieties"');
    expect(html).not.toContain('data-umami-event-position="blight-inline-prevention"');
    expect(html).not.toContain('data-umami-event-position="blight-inline-response"');
  });
});

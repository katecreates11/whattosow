import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import MicrogreensGuide from "@/app/guides/microgreens-and-windowsill-herbs/page";

describe("MicrogreensGuide", () => {
  const html = renderToStaticMarkup(createElement(MicrogreensGuide));

  it("tracks every seed link with its own position, through the shared affiliate link", () => {
    expect(html).toContain('data-umami-event-position="microgreens-seeds-cress"');
    expect(html).toContain('data-umami-event-position="microgreens-seeds-pea-shoots"');
    expect(html).toContain('data-umami-event-position="microgreens-buyer-note-sprouting-seed"');
    expect(html).toContain('data-umami-event-position="microgreens-seeds-red-amaranth"');
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(16);
    expect(html).toContain('rel="sponsored');
    expect(html).not.toContain("amazon.");
  });

  it("carries the safety warning, a real skip, and a disclosure", () => {
    expect(html).toContain("Never tomatoes, peppers, aubergines or potatoes");
    expect(html).toContain("Skip the kits and the lights");
    expect(html).toContain("The free version:");
    expect(html).toContain("The seed links are affiliate links");
  });

  it("keeps to the house voice: no exclamation marks, no claims the photos can't support", () => {
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    expect(text).not.toContain("!");
    expect(text).not.toMatch(/game-changer|must-have|superfood|survival|crisis|doomsday/i);
    // the tray photos are dated, not labelled with plant names nobody has confirmed
    expect(html).toContain("25 June");
    expect(html).toContain("29 June");
  });
});

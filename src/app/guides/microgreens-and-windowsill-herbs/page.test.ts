import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import MicrogreensGuide from "@/app/guides/microgreens-and-windowsill-herbs/page";

describe("MicrogreensGuide", () => {
  const html = renderToStaticMarkup(createElement(MicrogreensGuide));

  it("links straight to product pages, never to a search, each with its own tracked position", () => {
    expect(html).toContain('data-umami-event-position="microgreens-seeds-radish"');
    expect(html).toContain('data-umami-event-position="microgreens-seeds-pea-shoots"');
    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(14);
    expect(html).toContain('data-umami-event-position="microgreens-buyer-note-range"');
    expect(decodeURIComponent(html)).toContain("thompson-morgan.com/p/cress-extra-curled-seeds/623TM");
    // discontinued or never stocked at T&M: no link is better than a dead one
    expect(decodeURIComponent(html)).not.toContain("basil-genovese");
    expect(html).not.toContain('data-umami-event-position="microgreens-seeds-sunflower-shoots"');
    expect(html).toContain('rel="sponsored');
    expect(html).not.toContain("amazon.");
    // the search subdomain redirects to an empty results page and drops the term
    expect(html).not.toContain("search.thompson-morgan.com");
    expect(html).not.toContain("thompson-morgan.com%2Fsearch");
    expect(decodeURIComponent(html)).toContain("thompson-morgan.com/p/radish-french-breakfast-3-seeds/542TM");
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

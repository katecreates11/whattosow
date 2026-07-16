import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlightKit from "@/components/BlightKit";

describe("BlightKit", () => {
  it("keeps the defence kit restrained and prevention-led", () => {
    const html = renderToStaticMarkup(createElement(BlightKit));

    expect(html).toContain("Blight defence kit");
    expect(html).toContain("Worth buying now");
    expect(html).toContain("Plan for next season");
    expect(html).toContain("Soaker hose for soil-level watering");
    expect(html).toContain("where your site rules allow it");
    expect(html).not.toContain("Fleece for humid blight weeks");
    expect(html).not.toContain("Compare fleece for a humid week");
    expect(html).toContain("Jump to the resistant varieties");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(1);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(1);
    expect(html).toContain('data-umami-event-position="blight-defence-soaker-hose"');
    expect(html).not.toContain('data-umami-event-position="blight-defence-grafted-crimson-crush"');
    expect(html).not.toContain('data-umami-event-position="blight-defence-crimson-crush-seeds"');
    expect(html).not.toContain('data-umami-event-position="blight-defence-sarpo-mira"');
    expect(html).not.toContain('data-umami-event-position="blight-defence-kit"');
    expect(html).not.toContain("View on Amazon");
  });
});

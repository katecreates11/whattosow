import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlightKit from "@/components/BlightKit";

describe("BlightKit", () => {
  it("keeps the defence kit links tracked and specific", () => {
    const html = renderToStaticMarkup(createElement(BlightKit));

    expect(html).toContain("Blight defence kit");
    expect(html).toContain("Worth buying now");
    expect(html).toContain("Plan for next season");
    expect(html).toContain("Check fleece for a humid week");
    expect(html).toContain("Crimson Crush plants");

    expect(html.match(/data-umami-event="affiliate-click"/g)).toHaveLength(4);
    expect(html.match(/rel="sponsored noopener noreferrer"/g)).toHaveLength(4);
    expect(html.match(/data-umami-event-position="blight-defence-kit"/g)).toHaveLength(4);
    expect(html).not.toContain("View on Amazon");
  });
});

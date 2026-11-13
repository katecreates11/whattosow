import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GlutOMeterPage from "@/app/glut-o-meter/page";

describe("GlutOMeterPage", () => {
  it("renders the picker for every scoped glut crop with an empty-state reading", () => {
    const html = renderToStaticMarkup(createElement(GlutOMeterPage));

    expect(html).toContain("Drowning in courgettes?");
    expect(html).toContain("Courgettes");
    expect(html).toContain("Beans");
    expect(html).toContain("Tomatoes");
    expect(html).toContain("Cucumbers");
    expect(html).toContain("Tell it what");
    expect(html).toContain("application/ld+json");
  });
});

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import UsPage from "@/app/us/page";

describe("UsPage", () => {
  it("server-renders the US ZIP beta with crawlable crop links", () => {
    const html = renderToStaticMarkup(createElement(UsPage));

    expect(html).toContain("What can I sow now in my ZIP code?");
    expect(html).toContain("US ZIP beta");
    expect(html).toContain("/crops/basil");
    expect(html).toContain("/crops/french-beans");
    expect(html).toContain("data-umami-event=\"us-zip-start\"");
  });
});

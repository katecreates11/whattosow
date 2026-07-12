import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WateringWhileAwayGuide from "@/app/guides/watering-while-away/page";

describe("WateringWhileAwayGuide", () => {
  it("uses specific, measurable holiday watering affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(WateringWhileAwayGuide));

    expect(html).toContain("Worth buying / skip this");
    expect(html).toContain("Holiday watering kit, without the panic buys");
    expect(html).toContain("Compare watering spikes");
    expect(html).toContain("Compare tap timers");
    expect(html).toContain("Compare soaker hoses");
    expect(html).toContain("Compare drip kits");
    expect(html).toContain("Skip anything unattended if your site rules say water has to stay in your hand");
    expect(html).toContain('data-umami-event-position="holiday-watering-spikes"');
    expect(html).toContain('data-umami-event-position="holiday-watering-timer"');
    expect(html).toContain('data-umami-event-position="holiday-watering-soaker-hose"');
    expect(html).toContain('data-umami-event-position="holiday-watering-drip-kit"');
    expect(html.match(/data-umami-event-merchant="amazon-uk"/g)).toHaveLength(4);
  });
});

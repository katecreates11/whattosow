import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WateringWhileAwayGuide from "@/app/guides/watering-while-away/page";

describe("WateringWhileAwayGuide", () => {
  it("uses specific, measurable holiday watering affiliate labels", () => {
    const html = renderToStaticMarkup(createElement(WateringWhileAwayGuide));

    expect(html).toContain("Worth buying / skip this");
    expect(html).toContain("Holiday watering kit, without the panic buys");
    expect(html).toContain("Choose the smallest system that covers the real risk");
    expect(html).toContain("Leaving tomorrow?");
    expect(html).toContain("spikes and a neighbour beat a complicated timer");
    expect(html).toContain("Away for a fortnight?");
    expect(html).toContain("test the line for several days first");
    expect(html.match(/Buy if/g)).toHaveLength(4);
    expect(html.match(/Skip if/g)).toHaveLength(4);
    expect(html).toContain("Bottle spikes for a short trip");
    expect(html).toContain("Container drip kit for longer absences");
    expect(html).toContain("Tap timer where rules allow it");
    expect(html).toContain("Soaker hose for thirsty beds");
    expect(html).not.toContain("Compare bottle spikes for pots");
    expect(html).not.toContain("Compare container drip kits");
    expect(html).not.toContain("Compare tap timers for permitted unattended watering");
    expect(html).not.toContain("Compare soaker hoses for beds");
    expect(html).toContain("where your site rules allow unattended watering");
    expect(html).toContain("Skip anything unattended if your site rules do not allow it");
    expect(html).toContain("If watering needs a person");
    expect(html).not.toContain("water has to stay in your hand");
    expect(html).toContain('data-umami-event-position="holiday-watering-spikes"');
    expect(html).toContain('data-umami-event-position="holiday-watering-timer"');
    expect(html).toContain('data-umami-event-position="holiday-watering-soaker-hose"');
    expect(html).toContain('data-umami-event-position="holiday-watering-drip-kit"');
    expect(html.match(/data-umami-event-merchant="amazon-uk"/g)).toHaveLength(4);
  });
});

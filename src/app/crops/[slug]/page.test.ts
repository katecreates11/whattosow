import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CropPage from "@/app/crops/[slug]/page";
import { getMonthPhoto } from "@/data/month-photos";
import { getPlotPhotos } from "@/data/plot-photos";
import { crops } from "@/data/crops";
import { getCropPhoto } from "@/lib/crop-photos";

async function render(slug: string) {
  return renderToStaticMarkup(await CropPage({ params: Promise.resolve({ slug }) }));
}

describe("crop page top (approved 17 Nov 2026)", () => {
  it("answers 'can I sow it now?' once, not in three boxes", async () => {
    const html = await render("garlic");
    expect(html).toContain('data-crop-verdict-band="garlic"');
    expect(html).not.toContain("UK average answer");
    expect(html).not.toContain("Best next action");
    expect(html).not.toContain("Can I sow garlic now?");
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("When to plant garlic in the UK");
    // the facts that used to sit in the four-box grid, now on one line
    expect(html).toContain("15 cm apart");
    expect(html).toContain("soil from 5°C");
    expect(html).toContain('href="#your-dates-garlic"');
  });

  it("uses Kate's own photo for garlic, potatoes, spring onions and squash", async () => {
    for (const slug of ["garlic", "maincrop-potatoes", "early-potatoes", "spring-onions", "squash"]) {
      const photo = getCropPhoto(slug);
      expect(photo, slug).not.toBeNull();
      expect(existsSync(`public${photo!.hero}`), photo!.hero).toBe(true);
    }
    expect(await render("garlic")).toContain("garlic-scapes-hand.webp");
    // squash is named only as squash: Kate thinks patty pan but isn't sure
    expect(getCropPhoto("squash")!.alt).not.toMatch(/patty/i);
  });

  it("shows a 'from the plot' strip only where there are photos for it", async () => {
    const peas = await render("peas");
    expect(peas).toContain(`aria-label="Peas on our plot"`);
    expect(peas).toContain("peas-flowering-netting.webp");
    expect(await render("leeks")).not.toContain("on our plot\"");
    for (const crop of crops) {
      for (const photo of getPlotPhotos(crop.slug)) {
        expect(existsSync(`public${photo.src}`), photo.src).toBe(true);
        expect(photo.alt.length, photo.src).toBeGreaterThan(20);
      }
    }
  });
});

describe("month page photos (approved 17 Nov 2026)", () => {
  it("has a real photo of the plot for March, May, June and November only", () => {
    for (const month of [2, 4, 5, 10]) {
      const photo = getMonthPhoto(month);
      expect(photo, String(month)).not.toBeNull();
      expect(existsSync(`public${photo!.src}`), photo!.src).toBe(true);
    }
    expect([0, 1, 3, 6, 7, 8, 9, 11].map(getMonthPhoto).every((photo) => photo === null)).toBe(true);
  });
});

// Restored from the original file (17 Nov 2026): the redesign must not touch tracking.
describe("CropPage", () => {
  it("tracks playbook buy links and variety seed links with crop-specific positions", async () => {
    const html = await render("tomatoes");

    expect(html).toContain('data-umami-event-position="crop-playbook-tomatoes-soft-plant-ties"');
    expect(html).toContain('data-umami-event-position="crop-playbook-tomatoes-tomorite-tomato-feed"');
    expect(html).toContain('data-umami-event-position="crop-page-variety-seeds-tomatoes-sungold-thompson-and-morgan"');
  });
});

import { createElement } from "react";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { metadata as bedPlannerMetadata } from "@/app/bed-planner/page";
import CropsPage, { metadata as cropsMetadata } from "@/app/crops/page";
import { metadata as luckyDipMetadata } from "@/app/lucky-dip/page";
import { metadata as myGardenMetadata } from "@/app/my-garden/page";
import { metadata as myPlotMetadata } from "@/app/my-plot/page";
import { metadata as printMetadata } from "@/app/print/page";
import { metadata as productsMetadata } from "@/app/products/page";
import SowPage, { metadata as sowMetadata } from "@/app/sow/page";
import sitemap from "@/app/sitemap";
import Footer from "@/components/Footer";

const sitemapUrls = sitemap().map((entry) => entry.url);
const redirectedPublicRoutes = ["/kit", "/lucky-dip", "/my-garden", "/my-plot"];
const privateOrParkedMetadata = [
  myGardenMetadata,
  myPlotMetadata,
  luckyDipMetadata,
  productsMetadata,
  printMetadata,
  bedPlannerMetadata,
];

function isNoindex(robots: unknown): boolean {
  if (typeof robots === "string") return robots.includes("noindex");
  if (robots && typeof robots === "object" && "index" in robots) {
    return (robots as { index?: boolean }).index === false;
  }
  return false;
}

function sourceFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];

  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (["kit", "lucky-dip", "my-garden", "my-plot", "admin", "api", "pins"].includes(entry)) {
        return [];
      }
      return sourceFiles(fullPath);
    }

    if (!/\.(tsx?|jsx?)$/.test(entry) || /\.(test|spec)\./.test(entry)) {
      return [];
    }

    return [fullPath];
  });
}

describe("Search Console readiness guard", () => {
  it("keeps public money and SEO routes in the sitemap while excluding private/internal routes", () => {
    for (const url of [
      "https://whattosow.co.uk",
      "https://whattosow.co.uk/sow",
      "https://whattosow.co.uk/sow/july",
      "https://whattosow.co.uk/crops",
      "https://whattosow.co.uk/crops/basil",
      "https://whattosow.co.uk/crops/french-beans",
      "https://whattosow.co.uk/crops/sweetcorn",
      "https://whattosow.co.uk/crops/courgettes",
      "https://whattosow.co.uk/crops/pumpkins",
      "https://whattosow.co.uk/guides/growing-tomatoes-outdoors-vs-greenhouse",
      "https://whattosow.co.uk/guides/watering",
    ]) {
      expect(sitemapUrls).toContain(url);
    }

    for (const url of [
      "https://whattosow.co.uk/kit",
      "https://whattosow.co.uk/lucky-dip",
      "https://whattosow.co.uk/my-garden",
      "https://whattosow.co.uk/my-plot",
      "https://whattosow.co.uk/products",
    ]) {
      expect(sitemapUrls).not.toContain(url);
    }
    expect(sitemapUrls.some((url) => url.startsWith("https://whattosow.co.uk/pins"))).toBe(false);
  });

  it("server-renders crawlable /sow and /crops links without the old SEO grid language", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-15T12:00:00Z"));

    try {
      const sowHtml = renderToStaticMarkup(createElement(SowPage));
      const cropsHtml = renderToStaticMarkup(createElement(CropsPage));

      expect(sowMetadata.alternates).toEqual({ canonical: "/sow" });
      expect(cropsMetadata.alternates).toEqual({ canonical: "/crops" });
      expect(sowHtml).toContain("/crops/french-beans");
      expect(sowHtml).toContain("/crops/carrots");
      expect(sowHtml).toContain("/sow/july");
      expect(sowHtml).toContain("/calendar");
      expect(sowHtml).not.toContain("UK average answer");
      expect(sowHtml).not.toContain("What to start indoors");
      expect(cropsHtml).toContain("/crops/tomatoes");
      expect(cropsHtml).toContain("/crops/basil");
      expect(cropsHtml).toContain("/crops/french-beans");
    } finally {
      vi.useRealTimers();
    }
  });

  it("marks private, parked, and no-sitemap utility pages as noindex", () => {
    for (const metadata of privateOrParkedMetadata) {
      expect(isNoindex(metadata.robots)).toBe(true);
    }
  });

  it("keeps global footer routes pointed at the strongest live journeys", () => {
    const footerHtml = renderToStaticMarkup(createElement(Footer));

    expect(footerHtml).not.toContain('href="/still-time"');
    expect(footerHtml).not.toContain('href="/sow-in"');
    expect(footerHtml).not.toContain('href="/print"');
    expect(footerHtml).toContain('href="/sow"');
    expect(footerHtml).toContain('href="/guides/companion-planting-chart"');
  });

  it("does not leak links to redirected public routes from live app surfaces", () => {
    const files = [
      ...sourceFiles(path.join(process.cwd(), "src/app")),
      ...sourceFiles(path.join(process.cwd(), "src/components")),
    ];

    const offenders = files.flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return redirectedPublicRoutes.flatMap((route) => {
        const pattern = new RegExp(`href=\\{?["'\`]${route}(?:["'\`/?#]|$)`, "g");
        return pattern.test(source) ? [`${path.relative(process.cwd(), file)} -> ${route}`] : [];
      });
    });

    expect(offenders).toEqual([]);
  });
});

describe("internal crop links", () => {
  function tsxFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
      const fullPath = path.join(dir, entry);
      if (statSync(fullPath).isDirectory()) return tsxFiles(fullPath);
      return /\.(ts|tsx)$/.test(entry) && !/\.test\.tsx?$/.test(entry) ? [fullPath] : [];
    });
  }

  it("never hard-codes a link to a crop page that doesn't exist", async () => {
    const { crops } = await import("@/data/crops");
    const { allVarietyParams } = await import("@/lib/variety-routes");
    const cropSlugs = new Set(crops.map((crop) => crop.slug));
    const varietyPaths = new Set(allVarietyParams().map((route) => `${route.slug}/${route.variety}`));
    const broken: string[] = [];
    for (const file of tsxFiles("src")) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/["'`(]\/crops\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?["'`)#?]/g)) {
        const [, crop, variety] = match;
        if (!cropSlugs.has(crop) || (variety && !varietyPaths.has(`${crop}/${variety}`))) {
          broken.push(`${file}: /crops/${crop}${variety ? `/${variety}` : ""}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("resolves the everyday names posts use to real crop pages, and drops what we don't cover", async () => {
    const { resolveCrop } = await import("@/lib/crop-links");
    expect(resolveCrop("potatoes")?.slug).toBe("maincrop-potatoes");
    expect(resolveCrop("aubergines")?.slug).toBe("aubergine");
    expect(resolveCrop("onions")?.slug).toBe("onion-sets");
    expect(resolveCrop("tomatoes")?.slug).toBe("tomatoes");
    expect(resolveCrop("sunflowers")).toBeNull();
    expect(resolveCrop("marigolds")).toBeNull();
  });
});

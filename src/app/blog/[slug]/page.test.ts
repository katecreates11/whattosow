import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogPostPage from "@/app/blog/[slug]/page";

describe("BlogPostPage", () => {
  it("uses a calmer primary product CTA with affiliate tracking", async () => {
    const element = await BlogPostPage({ params: Promise.resolve({ slug: "watering-lance-allotment" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Compare watering lances");
    expect(html).toContain('data-umami-event-position="blog-primary-product-watering-lance-allotment-gardena-premium-watering-lance"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html).not.toContain("Compare on Amazon");
    expect(html).not.toContain("Check price on Amazon");
  });

  it("tracks inline blog product cards with post and product-specific positions", async () => {
    const element = await BlogPostPage({ params: Promise.resolve({ slug: "best-first-tools-new-allotment" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('data-umami-event-position="blog-product-best-first-tools-new-allotment-showa-370-gardening-gloves"');
    expect(html).toContain('data-umami-event-position="blog-product-best-first-tools-new-allotment-gardena-premium-watering-lance"');
  });

  it("tracks blog kit strip cards with post and kit-specific positions", async () => {
    const element = await BlogPostPage({ params: Promise.resolve({ slug: "broadfork-clay-bindweed" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('data-umami-event-position="blog-kit-broadfork-clay-bindweed-gloves"');
    expect(html).toContain('data-umami-event-position="blog-kit-broadfork-clay-bindweed-kneeler"');
    expect(html).toContain('data-umami-event-position="blog-kit-broadfork-clay-bindweed-weed-puller"');
  });

  it("tracks blog comparison table links with post and product-specific positions", async () => {
    const element = await BlogPostPage({ params: Promise.resolve({ slug: "best-allotment-tools-compared" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('data-umami-event-position="blog-table-best-allotment-tools-compared-showa-370-gloves"');
    expect(html).toContain('data-umami-event-position="blog-table-best-allotment-tools-compared-gardena-watering-lance"');
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BlogPostPage from "@/app/blog/[slug]/page";

describe("BlogPostPage", () => {
  it("uses a calmer primary product CTA with affiliate tracking", async () => {
    const element = await BlogPostPage({ params: Promise.resolve({ slug: "watering-lance-allotment" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Compare on Amazon");
    expect(html).toContain('data-umami-event-position="blog-primary-product"');
    expect(html).toContain('data-umami-event-merchant="amazon-uk"');
    expect(html).not.toContain("Check price on Amazon");
  });
});

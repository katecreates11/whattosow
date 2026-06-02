import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/data/blog-posts";
import { getPublishedEditorialPosts } from "@/data/editorial-posts";

export const metadata: Metadata = {
  title: "Blog — What To Sow",
  description:
    "Notes from a UK allotment — what's growing, what's working, and honest tool reviews for anyone with a few veg beds to tend. Plus month-by-month sowing guides.",
  keywords: [
    "what to sow this month",
    "monthly sowing guide UK",
    "sowing calendar blog",
    "when to plant vegetables UK",
    "allotment monthly planner",
  ],
  openGraph: {
    title: "Notes from the veg patch — What To Sow",
    description:
      "Dispatches from a UK allotment — what's growing, what's working, and honest reviews for anyone with a few veg beds.",
    type: "website",
    url: "https://whattosow.co.uk/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export default function BlogIndex() {
  const posts = getPublishedPosts();
  const editorialPosts = getPublishedEditorialPosts();

  // Group posts by year (newest first)
  const grouped = new Map<number, typeof posts>();
  for (const post of posts) {
    const yearPosts = grouped.get(post.year) ?? [];
    yearPosts.push(post);
    grouped.set(post.year, yearPosts);
  }
  const years = Array.from(grouped.keys()).sort((a, b) => b - a);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whattosow.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://whattosow.co.uk/blog",
      },
    ],
  };

  return (
    <>
      <Header backLink={{ href: "/", label: "Home" }} />
      <main id="main-content" className="bg-cream min-h-screen">
        {/* Hero */}
        <div className="bg-cream border-b border-earth/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-14">
            <div className="max-w-lg">
              <div className="bg-rust w-10 h-1 mb-5" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-rust/70 block mb-3">
                Blog
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif text-earth tracking-tight leading-[0.95] mb-4">
                Notes from the veg patch
              </h1>
              <p className="text-earth-light leading-relaxed text-[15px] sm:text-base font-serif italic max-w-md">
                Dispatches from a UK allotment — what&apos;s growing, what&apos;s working, and the odd honest review — for anyone with a few veg beds to tend.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial posts */}
        {editorialPosts.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-allotment mb-6">
              From the allotment
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {editorialPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-earth/8 hover:border-earth/20 transition-colors overflow-hidden"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-earth/5">
                    <img
                      src={post.heroImage}
                      alt={post.heroAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold tracking-[0.1em] uppercase text-allotment bg-sage/30 px-1.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-base text-earth group-hover:text-rust transition-colors leading-snug mb-1.5">
                      {post.title}
                    </h3>
                    <p className="text-xs text-earth-lighter leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Monthly sowing guides */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-rust mb-8">
            Monthly sowing guides
          </h2>
          {years.map((year) => {
            const yearPosts = grouped.get(year)!;
            return (
              <section key={year} className="mb-14 last:mb-0">
                <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-rust mb-6">
                  {year}
                </h2>
                <div className="grid gap-0">
                  {yearPosts.map((post) => {
                    const cropCount = new Set([
                      ...post.sowIndoors.map((c) => c.name),
                      ...post.directSow.map((c) => c.name),
                      ...post.plantOut.map((c) => c.name),
                    ]).size;

                    return (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group border-t border-earth/8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 transition-colors hover:bg-sage/20 -mx-4 sm:-mx-6 px-4 sm:px-6"
                      >
                        <div className="shrink-0 sm:w-28">
                          <span className="text-sm text-earth-light">
                            {MONTH_NAMES[post.month]} {post.year}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl text-earth group-hover:text-rust transition-colors mb-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-earth-light leading-relaxed mb-2 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-allotment bg-sage/40 px-2 py-0.5">
                              {cropCount} crops
                            </span>
                            <span className="text-sm text-rust font-medium group-hover:translate-x-0.5 transition-transform">
                              Read guide &rarr;
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {posts.length === 0 && (
            <p className="text-earth-light text-center py-20 font-serif italic">
              No guides published yet. Check back soon.
            </p>
          )}
        </div>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </main>
      <Footer />
    </>
  );
}

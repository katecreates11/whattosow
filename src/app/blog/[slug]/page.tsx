import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  generateBlogPosts,
  getPostBySlug,
  getNextPost,
  getPrevPost,
  type BlogPost,
  type CropEntry,
} from "@/data/blog-posts";
import { getEditorialPost, editorialPosts, type EditorialPost, type EditorialSection } from "@/data/editorial-posts";
import { ColorSection, SectionDivider, TipBox, WarningBox } from "@/components/GuideVisuals";

// ─── Static generation ──────────────────────────────────────────────────────

export async function generateStaticParams() {
  const autoSlugs = generateBlogPosts().map((post) => ({ slug: post.slug }));
  const editorialSlugs = editorialPosts.map((post) => ({ slug: post.slug }));
  return [...autoSlugs, ...editorialSlugs];
}

// ─── Metadata ───────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check editorial posts first
  const editorial = getEditorialPost(slug);
  if (editorial) {
    return {
      title: `${editorial.title} | What To Sow`,
      description: editorial.description,
      keywords: editorial.keywords,
      openGraph: {
        title: editorial.title,
        description: editorial.description,
        type: "article",
        url: `https://whattosow.co.uk/blog/${editorial.slug}`,
        locale: "en_GB",
        images: [{ url: editorial.heroImage, alt: editorial.heroAlt, width: 1200, height: 800 }],
      },
      alternates: {
        canonical: `/blog/${editorial.slug}`,
      },
    };
  }

  const post = getPostBySlug(slug);
  if (!post) return {};

  const monthName = MONTH_NAMES[post.month];
  const title = `What to Sow in ${monthName} ${post.year} — UK Sowing Guide | What To Sow`;

  return {
    title,
    description: post.description,
    keywords: [
      `what to sow in ${monthName.toLowerCase()}`,
      `what to plant ${monthName.toLowerCase()} UK`,
      `${monthName.toLowerCase()} sowing guide`,
      `${monthName.toLowerCase()} planting UK`,
      `${monthName.toLowerCase()} vegetable garden`,
    ],
    openGraph: {
      title: `What to Sow in ${monthName} ${post.year}`,
      description: post.description,
      type: "article",
      url: `https://whattosow.co.uk/blog/${post.slug}`,
      locale: "en_GB",
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

// ─── Crop card component ────────────────────────────────────────────────────

function CropCard({ crop }: { crop: CropEntry }) {
  return (
    <div className="border-t border-earth/8 pt-5 pb-6">
      <a
        href={`/crops/${crop.slug}`}
        className="font-serif text-lg text-earth hover:text-rust transition-colors"
      >
        {crop.name}
      </a>
      <p className="text-sm text-earth-light mt-1.5 leading-relaxed">
        {crop.tip}
      </p>
      {crop.needs && (
        <p className="text-xs text-earth-lighter mt-2">
          <span className="font-semibold text-earth-light">Needs:</span> {crop.needs}
        </p>
      )}
      {crop.varieties.length > 0 && (
        <div className="mt-3">
          <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-allotment block mb-1">
            Varieties to try
          </span>
          <ul className="text-sm text-earth-light space-y-0.5">
            {crop.varieties.slice(0, 2).map((v) => (
              <li key={v.name}>
                <span className="font-medium text-earth">{v.name}</span>
                {v.note && <span className="text-earth-lighter"> — {v.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {crop.companions.length > 0 && (
        <p className="text-xs text-earth-lighter mt-2">
          <span className="font-semibold text-earth-light">Companions:</span>{" "}
          {crop.companions.join(", ")}
        </p>
      )}
      {crop.hasKit && (
        <a
          href="/kit"
          className="inline-block text-xs text-rust font-medium mt-2 hover:underline"
        >
          See recommended kit &rarr;
        </a>
      )}
    </div>
  );
}

// ─── Section colors rotation ────────────────────────────────────────────────

const SECTION_COLORS = ["sage", "sky", "ochre", "sage", "sky"] as const;

// ─── Editorial post renderer ────────────────────────────────────────────────

function EditorialPostPage({ post }: { post: EditorialPost }) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate.toISOString(),
    image: `https://whattosow.co.uk${post.heroImage}`,
    author: {
      "@type": "Organization",
      name: "What To Sow",
      url: "https://whattosow.co.uk",
    },
  };

  return (
    <>
      <Header backLink={{ href: "/blog", label: "All guides" }} />
      <main id="main-content" className="bg-cream min-h-screen">
        {/* Hero image */}
        <div className="relative h-64 sm:h-80 md:h-[28rem] overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Title area */}
        <div className="bg-cream -mt-16 relative z-10">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-10 sm:pt-14 pb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-[0.1em] uppercase text-allotment bg-sage/40 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-serif text-earth tracking-tight leading-[1.05] mb-5">
              {post.title}
            </h1>
            <p className="text-earth-light leading-relaxed text-[15px] sm:text-base max-w-2xl">
              {post.intro}
            </p>
          </div>
        </div>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-6 sm:px-8 pb-16">
          {post.sections.map((section, i) => (
            <EditorialSectionRenderer key={i} section={section} />
          ))}

          {/* Related crops */}
          {post.relatedCrops.length > 0 && (
            <div className="border-t border-earth/10 pt-8 mt-12">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-3">
                Related growing guides
              </span>
              <div className="flex flex-wrap gap-2">
                {post.relatedCrops.map((slug) => (
                  <a
                    key={slug}
                    href={`/crops/${slug}`}
                    className="text-sm text-rust hover:text-earth font-medium underline decoration-rust/30 transition-colors"
                  >
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="my-14 border-t border-earth/10 pt-10 max-w-2xl">
            <h2 className="text-xl font-serif text-earth mb-2">
              Get personalised dates for your postcode
            </h2>
            <p className="text-sm text-earth-light mb-4 leading-relaxed">
              Every plot is different. Enter your postcode and we will calculate
              your frost date and tell you exactly what to sow right now.
            </p>
            <a
              href="/"
              className="inline-block text-[11px] font-bold tracking-[0.08em] uppercase text-white bg-allotment hover:bg-allotment-dark transition-colors px-5 py-2.5"
            >
              Enter your postcode
            </a>
          </div>

          {/* Back to blog */}
          <nav className="border-t border-earth/10 py-8">
            <a href="/blog" className="font-serif text-earth hover:text-rust transition-colors">
              &larr; All guides
            </a>
          </nav>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </main>
      <Footer />
    </>
  );
}

function EditorialSectionRenderer({ section }: { section: EditorialSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="text-2xl sm:text-3xl font-serif text-earth tracking-tight mt-12 mb-4">
          {section.content}
        </h2>
      );
    case "text":
      return (
        <div className="space-y-4 mb-6">
          {section.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-[15px] text-earth-light leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      );
    case "image":
      return (
        <figure className="-mx-6 sm:-mx-8 my-8 sm:my-10">
          <div className="aspect-[3/2] overflow-hidden bg-earth/5">
            <img
              src={section.src}
              alt={section.alt || ""}
              className="w-full h-full object-cover"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
            />
          </div>
          {section.caption && (
            <figcaption className="px-6 sm:px-8 mt-3">
              <span className="text-xs text-earth-light font-serif italic">
                {section.caption}
              </span>
            </figcaption>
          )}
        </figure>
      );
    case "tip":
      return (
        <TipBox>
          <p>{section.content}</p>
        </TipBox>
      );
    default:
      return null;
  }
}

// ─── Page component ─────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check editorial posts first
  const editorial = getEditorialPost(slug);
  if (editorial) return <EditorialPostPage post={editorial} />;

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const nextPost = getNextPost(slug);
  const prevPost = getPrevPost(slug);
  const monthName = MONTH_NAMES[post.month];

  const totalCrops = new Set([
    ...post.sowIndoors.map((c) => c.name),
    ...post.directSow.map((c) => c.name),
    ...post.plantOut.map((c) => c.name),
  ]).size;

  // Seasonal accent color for the hero bar
  const seasonAccent =
    post.month >= 2 && post.month <= 4
      ? "bg-leaf"
      : post.month >= 5 && post.month <= 7
        ? "bg-amber"
        : post.month >= 8 && post.month <= 10
          ? "bg-rust"
          : "bg-frost";

  let colorIdx = 0;
  function nextColor() {
    const c = SECTION_COLORS[colorIdx % SECTION_COLORS.length];
    colorIdx++;
    return c;
  }

  // Structured data
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${post.title} ${post.year}`,
        item: `https://whattosow.co.uk/blog/${post.slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${post.title} ${post.year}`,
    description: post.description,
    datePublished: post.publishDate.toISOString(),
    author: {
      "@type": "Organization",
      name: "What To Sow",
      url: "https://whattosow.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "What To Sow",
      url: "https://whattosow.co.uk",
    },
  };

  return (
    <>
      <Header backLink={{ href: "/blog", label: "All guides" }} />
      <main id="main-content" className="bg-cream min-h-screen">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <div className="bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-14">
            <div className="max-w-2xl">
              <div className={`${seasonAccent} w-12 h-1 mb-6`} />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-rust/70 block mb-3">
                {monthName} {post.year}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-serif text-earth tracking-tight leading-[0.95] mb-5">
                {post.title}
              </h1>
              <p className="text-earth-light leading-relaxed text-[15px] sm:text-base max-w-lg">
                {post.intro}
              </p>
              <div className="flex items-center gap-3 mt-5">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-allotment bg-sage/40 px-2 py-0.5">
                  {totalCrops} crops
                </span>
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-earth-lighter bg-earth/5 px-2 py-0.5">
                  {post.seasonName}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* ─── Regional frost dates ────────────────────────────────── */}
          <ColorSection color="sky">
            <h2 className="text-xl sm:text-2xl font-serif text-earth mb-1">
              Your timing depends on where you are
            </h2>
            <p className="text-sm text-earth-light mb-6 leading-relaxed">
              The last frost date in Cornwall can be three weeks earlier than
              the Highlands. That changes when you can safely plant out tender
              crops — and when you need to start seeds indoors.
            </p>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-earth/15">
                    <th className="text-left py-2 px-2 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-light">
                      Location
                    </th>
                    <th className="text-left py-2 px-2 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-light">
                      Last frost
                    </th>
                    <th className="text-right py-2 px-2 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-light">
                      Days behind Cornwall
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {post.regionalFrost.map((loc) => (
                    <tr key={loc.name} className="border-b border-earth/5">
                      <td className="py-2 px-2 text-earth font-medium">
                        {loc.name}
                        <span className="text-earth-lighter text-xs block sm:inline sm:ml-1.5">
                          {loc.note}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-earth tabular-nums">
                        {loc.lastFrostFormatted}
                      </td>
                      <td className="py-2 px-2 text-right text-earth-light tabular-nums">
                        {loc.daysAfterEarliest === 0
                          ? "—"
                          : `+${loc.daysAfterEarliest}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <TipBox>
              <p>
                These are estimates based on latitude and coastal proximity.{" "}
                <a href="/frost-map" className="text-rust font-medium hover:underline">
                  Enter your postcode on our frost map
                </a>{" "}
                for a date specific to your plot.
              </p>
            </TipBox>
          </ColorSection>

          {/* ─── Sow indoors ──────────────────────────────────────────── */}
          {post.sowIndoors.length > 0 && (
            <>
              <SectionDivider label="Start indoors" />
              <section id="sow-indoors">
                <h2 className="text-xl sm:text-2xl font-serif text-earth mb-1">
                  Sow indoors this month
                </h2>
                <p className="text-sm text-earth-light mb-6">
                  These crops want warmth to germinate. A windowsill, heated propagator, or greenhouse will do.
                </p>
                <div className="max-w-2xl">
                  {post.sowIndoors.map((crop) => (
                    <CropCard key={crop.slug} crop={crop} />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ─── Direct sow ───────────────────────────────────────────── */}
          {post.directSow.length > 0 && (
            <ColorSection color={nextColor()}>
              <section id="direct-sow">
                <h2 className="text-xl sm:text-2xl font-serif text-earth mb-1">
                  Sow directly outside
                </h2>
                <p className="text-sm text-earth-light mb-6">
                  Hardy enough for the soil temperature right now. Sow where they are going to grow.
                </p>
                {post.directSow.map((crop) => (
                  <CropCard key={crop.slug} crop={crop} />
                ))}
              </section>
            </ColorSection>
          )}

          {/* ─── Plant out ─────────────────────────────────────────────── */}
          {post.plantOut.length > 0 && (
            <>
              <SectionDivider label="Move outside" />
              <section id="plant-out">
                <h2 className="text-xl sm:text-2xl font-serif text-earth mb-1">
                  Plant out this month
                </h2>
                <p className="text-sm text-earth-light mb-6">
                  Seedlings started earlier that are ready to go into their final positions.
                </p>
                <div className="max-w-2xl">
                  {post.plantOut.map((crop) => (
                    <CropCard key={crop.slug} crop={crop} />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ─── Closing soon ──────────────────────────────────────────── */}
          {post.closingSoon.length > 0 && (
            <WarningBox title="Last chance this month">
              <p className="mb-3">
                These sowing windows close by the end of {monthName}. If you
                want them this year, now is the time.
              </p>
              <ul className="space-y-1.5">
                {post.closingSoon.map((crop) => (
                  <li key={crop.slug} className="flex items-baseline gap-2">
                    <a
                      href={`/crops/${crop.slug}`}
                      className="font-medium text-earth hover:text-rust transition-colors"
                    >
                      {crop.name}
                    </a>
                    <span className="text-earth-lighter text-xs">
                      {crop.action} — {crop.daysLeft} days left
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                <a
                  href="/still-time"
                  className="text-rust font-medium text-sm hover:underline"
                >
                  See all closing windows live &rarr;
                </a>
              </p>
            </WarningBox>
          )}

          {/* ─── Kit highlights ────────────────────────────────────────── */}
          {post.kitHighlights.length > 0 && (
            <ColorSection color={nextColor()}>
              <section id="kit">
                <h2 className="text-xl sm:text-2xl font-serif text-earth mb-1">
                  What kit you will need
                </h2>
                <p className="text-sm text-earth-light mb-4 leading-relaxed">
                  {post.sowIndoors.length > 0
                    ? "If you are starting seeds indoors this month, you will want a heated propagator, good seed compost, and decent modules. "
                    : "A few essentials for this month. "}
                  We have tested and reviewed the kit that actually matters.
                </p>
                <a
                  href="/kit"
                  className="inline-block text-sm text-rust font-medium hover:underline"
                >
                  Browse all recommended kit &rarr;
                </a>
              </section>
            </ColorSection>
          )}

          {/* ─── CTA ──────────────────────────────────────────────────── */}
          <div className="my-14 sm:my-20 border-t border-earth/10 pt-10 max-w-2xl">
            <h2 className="text-xl font-serif text-earth mb-2">
              Get personalised dates for your postcode
            </h2>
            <p className="text-sm text-earth-light mb-4 leading-relaxed">
              Every plot is different. Enter your postcode and we will calculate
              your frost date and tell you exactly what to sow right now.
            </p>
            <a
              href="/"
              className="inline-block text-[11px] font-bold tracking-[0.08em] uppercase text-white bg-allotment hover:bg-allotment-dark transition-colors px-5 py-2.5"
            >
              Enter your postcode
            </a>
          </div>

          {/* ─── Prev / Next navigation ───────────────────────────────── */}
          <nav
            aria-label="Previous and next guides"
            className="border-t border-earth/10 py-8 sm:py-10 flex justify-between items-start gap-4 max-w-2xl"
          >
            {prevPost ? (
              <a
                href={`/blog/${prevPost.slug}`}
                className="group text-left"
              >
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-1">
                  Previous
                </span>
                <span className="font-serif text-earth group-hover:text-rust transition-colors">
                  {prevPost.title}
                </span>
              </a>
            ) : (
              <div />
            )}
            {nextPost ? (
              <a
                href={`/blog/${nextPost.slug}`}
                className="group text-right"
              >
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-1">
                  Next
                </span>
                <span className="font-serif text-earth group-hover:text-rust transition-colors">
                  {nextPost.title}
                </span>
              </a>
            ) : (
              <div />
            )}
          </nav>
        </div>

        {/* ─── Structured data ─────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />
      </main>
      <Footer />
    </>
  );
}

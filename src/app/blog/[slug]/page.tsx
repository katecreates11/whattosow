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
import GearPick from "@/components/GearPick";
import PinButton from "@/components/PinButton";
import { getKit, amazonLink } from "@/data/kit";

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

  // Other hand-written posts, for the "more from the shed" cross-links
  const morePosts = editorialPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Review structured data — a genuine first-person review of a third-party
  // product, so Google can show star ratings (lifts click-through).
  const reviewJsonLd =
    post.primaryProduct && post.rating
      ? {
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Product", name: post.primaryProduct.name },
          reviewRating: { "@type": "Rating", ratingValue: post.rating, bestRating: 5 },
          author: { "@type": "Person", name: "Kate, What To Sow" },
          publisher: { "@type": "Organization", name: "What To Sow" },
          datePublished: post.publishDate.toISOString(),
          name: post.title,
          reviewBody: post.description,
        }
      : null;

  return (
    <>
      <Header backLink={{ href: "/blog", label: "All guides" }} />
      <main id="main-content" className="bg-cream min-h-screen">
        {/* Hero — a contained image, then a calm centred masthead */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
          <div className="relative aspect-[16/11] sm:aspect-[2/1] overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.heroAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover img-grade"
            />
          </div>
        </div>

        <header className="max-w-[44rem] mx-auto px-6 text-center pt-9 sm:pt-12 pb-2">
          {post.tags.length > 0 && (
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-allotment mb-5">
              {post.tags.join("  ·  ")}
            </div>
          )}
          <h1 className="font-serif text-[2rem] sm:text-5xl lg:text-[3.4rem] text-earth tracking-tight leading-[1.02] mb-6">
            {post.title}
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-earth-light leading-[1.4] max-w-[36ch] mx-auto">
            {post.intro}
          </p>
          <div className="mt-7 flex justify-center">
            <PinButton path={`/blog/${post.slug}`} image={post.heroImage} description={post.description} />
          </div>
          <div className="mt-9 mx-auto w-10 h-px bg-amber" />
        </header>

        {/* Above-the-fold buy CTA for single-product reviews */}
        {post.primaryProduct && (
          <div className="max-w-[44rem] mx-auto px-6 mb-2">
            <a
              href={post.primaryProduct.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              data-umami-event="affiliate-click" data-umami-event-type="gear" data-umami-event-merchant="amazon"
              data-umami-event-product={post.primaryProduct.name}
              className="group flex items-center justify-between gap-4 border border-allotment/20 bg-sage/20 px-5 py-4 hover:border-allotment hover:bg-sage/30 transition-colors"
            >
              <span className="font-serif text-earth leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-allotment block mb-1">What I use</span>
                {post.primaryProduct.name}
                {post.primaryProduct.price ? ` · ${post.primaryProduct.price}` : ""}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-cream bg-allotment px-4 py-2.5 whitespace-nowrap group-hover:bg-allotment-dark transition-colors">
                Check price on Amazon &rarr;
              </span>
            </a>
            <p className="text-[11px] text-earth-lighter mt-1.5">Affiliate link — we may earn a little, at no extra cost to you.</p>
          </div>
        )}

        {/* Article content — each section sets its own width (wide images, narrow text) */}
        <article className="pt-6 pb-16">
          {post.sections.map((section, i) => (
            <EditorialSectionRenderer
              key={i}
              section={section}
              dropcap={section.type === "text" && i === post.sections.findIndex((s) => s.type === "text")}
            />
          ))}

          <div className="max-w-[44rem] mx-auto px-6">
          {/* What I used — shoppable kit */}
          {post.kit && post.kit.length > 0 && (
            <div className="border-t border-earth/10 pt-10 mt-14">
              <div className="font-serif italic text-lg text-allotment mb-1">from the shed</div>
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-6">
                What I used in this post
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {getKit(post.kit).map((item) => (
                  <GearPick
                    key={item.id}
                    name={item.name}
                    price={item.price ?? ""}
                    description={item.description}
                    amazonUrl={amazonLink(item.asin)}
                    badge={item.badge}
                    tip={item.tip}
                    image={item.image}
                  />
                ))}
              </div>
              <p className="text-xs text-earth-lighter mt-4">
                Some links are affiliate links — we may earn a little, at no extra cost to you, towards the allotment shed.
              </p>
              <a
                href="/guides"
                className="inline-block mt-4 font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
              >
                Browse the kit we use &rarr;
              </a>
            </div>
          )}

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

          {/* More from the shed — cross-link other reviews */}
          {morePosts.length > 0 && (
            <div className="border-t border-earth/10 pt-9 mt-12">
              <div className="font-serif italic text-lg text-allotment mb-5">more from the shed</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {morePosts.map((p) => (
                  <a key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden mb-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.heroImage}
                        alt={p.heroAlt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover img-grade group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-serif text-lg text-earth leading-tight group-hover:text-allotment transition-colors">
                      {p.title}
                    </h3>
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
              Every veg patch is different. Enter your postcode and we&apos;ll work out
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
          </div>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        {reviewJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

// Small refined caption used under every image/group
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-2.5 font-mono text-[10px] tracking-[0.12em] uppercase text-earth-light/70 leading-relaxed">
      {children}
    </figcaption>
  );
}

/**
 * A considered group of 2–4 photos — for progress and change. Uniform square
 * crops keep it tidy and premium; on mobile a group of three becomes a clean
 * 2-up with the third spanning full width beneath.
 */
const ASPECT: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/10]",
};
// Spanning third image: wide on mobile, its chosen crop on desktop.
// Full literal strings so Tailwind's scanner picks up the sm: variants.
const SPAN_ASPECT: Record<string, string> = {
  square: "aspect-[16/10] sm:aspect-square",
  portrait: "aspect-[16/10] sm:aspect-[4/5]",
  wide: "aspect-[16/10] sm:aspect-[16/10]",
};

function GalleryGroup({
  images,
  groupCaption,
}: {
  images: { src: string; alt?: string; caption?: string; aspect?: "square" | "portrait" | "wide" }[];
  groupCaption?: string;
}) {
  const valid = images.filter((im) => im.src);
  const n = valid.length;
  if (n === 0) return null;
  const cols = n === 2 ? "grid-cols-2" : n >= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1";
  return (
    <figure className="max-w-4xl mx-auto px-5 sm:px-6 my-11 sm:my-14">
      <div className={`grid ${cols} gap-2.5 sm:gap-4 items-start`}>
        {valid.map((im, i) => {
          const spanThird = n >= 3 && i === 2;
          const key = im.aspect ?? "square";
          const aspectClass = spanThird ? SPAN_ASPECT[key] : ASPECT[key];
          return (
            <figure key={i} className={spanThird ? "col-span-2 sm:col-span-1" : ""}>
              <div className={`relative overflow-hidden ${aspectClass}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={im.src}
                  alt={im.alt || ""}
                  className="absolute inset-0 w-full h-full object-cover img-grade"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {im.caption && <Caption>{im.caption}</Caption>}
            </figure>
          );
        })}
      </div>
      {groupCaption && (
        <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.12em] uppercase text-earth-light/70">
          {groupCaption}
        </figcaption>
      )}
    </figure>
  );
}

function EditorialSectionRenderer({ section, dropcap }: { section: EditorialSection; dropcap?: boolean }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="max-w-[40rem] mx-auto px-6 font-serif text-2xl sm:text-[2rem] text-earth tracking-tight leading-tight mt-16 mb-5">
          {section.content}
        </h2>
      );
    case "text":
      return (
        <div className="max-w-[40rem] mx-auto px-6 space-y-6 mb-9">
          {section.content.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-[18px] text-earth leading-[1.8] ${
                dropcap && i === 0
                  ? "first-letter:float-left first-letter:font-serif first-letter:text-[68px] first-letter:leading-[0.66] first-letter:pr-3 first-letter:pt-1 first-letter:text-allotment"
                  : ""
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      );
    case "quote":
      return (
        <figure className="max-w-[42rem] mx-auto px-6 my-14 sm:my-16 text-center">
          <div className="mx-auto w-8 h-px bg-amber mb-7" />
          <blockquote className="font-serif text-[1.6rem] sm:text-[2rem] text-earth leading-[1.32] tracking-tight">
            {section.content}
          </blockquote>
          <div className="mx-auto w-8 h-px bg-amber mt-7" />
        </figure>
      );
    case "ownedSince":
      return (
        <div className="max-w-[44rem] mx-auto px-6 my-10">
          <div className="border border-allotment/25 bg-sage/15 px-5 py-5 sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-allotment">
              &#9632; Owned since {section.since} &middot; still in use
            </p>
            <div className={`mt-4 grid gap-3 ${(section.images?.length ?? 0) >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {section.images?.map((img, j) => (
                <figure key={j}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt ?? ""} loading="lazy" className="aspect-square w-full object-cover" />
                  <figcaption className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-earth-light">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            {section.note && <p className="mt-4 text-[0.9rem] leading-relaxed text-earth-light">{section.note}</p>}
          </div>
        </div>
      );
    case "pair":
      return (
        <GalleryGroup
          images={[
            { src: section.src ?? "", alt: section.alt, caption: section.caption },
            { src: section.src2 ?? "", alt: section.alt2, caption: section.caption2 },
          ]}
        />
      );
    case "gallery":
      return <GalleryGroup images={section.images ?? []} groupCaption={section.caption} />;
    case "table":
      return (
        <div className="max-w-3xl mx-auto px-6 my-10">
          <div className="border-t border-earth/15">
            {(section.rows ?? []).map((r) => (
              <div
                key={r.name}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-earth/10 py-4"
              >
                <div className="sm:w-[42%]">
                  <div className="font-serif text-lg text-earth leading-tight">{r.name}</div>
                  <div className="text-sm text-earth-light leading-snug">{r.use}</div>
                </div>
                {r.price && <div className="font-mono text-sm text-rust sm:w-[14%] tabular-nums">{r.price}</div>}
                <div className="sm:ml-auto">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    data-umami-event="affiliate-click" data-umami-event-type="gear" data-umami-event-merchant="amazon"
                    data-umami-event-product={r.name}
                    className="inline-block font-mono text-[11px] uppercase tracking-[0.07em] text-cream bg-allotment px-4 py-2 hover:bg-allotment-dark transition-colors whitespace-nowrap"
                  >
                    View on Amazon &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "image":
      if (section.fullBleed) {
        return (
          <figure className="my-12 sm:my-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={section.src} alt={section.alt || ""} className="w-full h-auto block img-grade" loading="lazy" decoding="async" />
            {section.caption && (
              <div className="max-w-[40rem] mx-auto px-6">
                <Caption>{section.caption}</Caption>
              </div>
            )}
          </figure>
        );
      }
      return (
        <figure className="max-w-3xl mx-auto px-5 sm:px-6 my-11 sm:my-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={section.src} alt={section.alt || ""} className="w-full h-auto block img-grade" loading="lazy" decoding="async" />
          {section.caption && <Caption>{section.caption}</Caption>}
        </figure>
      );
    case "tip":
      return (
        <div className="max-w-[40rem] mx-auto px-6 my-8">
          <TipBox>
            <p>{section.content}</p>
          </TipBox>
        </div>
      );
    case "product":
      return (
        <div className="max-w-[40rem] mx-auto px-6 my-10">
          <GearPick
            name={section.productName ?? ""}
            price={section.productPrice ?? ""}
            description={section.content}
            amazonUrl={section.productUrl ?? "#"}
            badge={section.productBadge}
            tip={section.caption}
          />
        </div>
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
              Every veg patch is different. Enter your postcode and we&apos;ll work out
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

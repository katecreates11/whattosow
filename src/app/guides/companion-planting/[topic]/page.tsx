import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import PinButton from "@/components/PinButton";
import SlotImage from "@/components/SlotImage";
import { companionTopics, getCompanionTopic } from "@/data/companion-topics";
import { crops } from "@/data/crops";
import { awinLink } from "@/lib/awin";

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
  return companionTopics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = getCompanionTopic(topic);
  if (!t) return {};
  return {
    title: `${t.metaTitle} | What To Sow`,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.metaTitle,
      description: t.description,
      type: "article",
      url: `https://whattosow.co.uk/guides/companion-planting/${t.slug}`,
      locale: "en_GB",
      images: [{ url: t.heroImage, alt: t.heroAlt, width: 1200, height: 800 }],
    },
    alternates: { canonical: `/guides/companion-planting/${t.slug}` },
  };
}

export default async function CompanionTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = getCompanionTopic(topic);
  if (!t) notFound();

  // Only link crop pages that actually exist
  const cropBySlug = new Map(crops.map((c) => [c.slug, c]));
  const related = (t.relatedCrops ?? [])
    .map((slug) => cropBySlug.get(slug))
    .filter((c): c is (typeof crops)[number] => Boolean(c));

  const siblings = companionTopics.filter((s) => s.slug !== t.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Companion planting", item: "https://whattosow.co.uk/guides/companion-planting" },
      { "@type": "ListItem", position: 4, name: t.title, item: `https://whattosow.co.uk/guides/companion-planting/${t.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.description,
    image: `https://whattosow.co.uk${t.heroImage}`,
    url: `https://whattosow.co.uk/guides/companion-planting/${t.slug}`,
    datePublished: "2026-06-04",
    dateModified: "2026-06-04",
    author: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header backLink={{ href: "/guides/companion-planting", label: "← Companion planting" }} />
      <main id="main-content" className="bg-cream">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
          <SlotImage
            id={`companion-${t.slug}-hero`}
            priority
            showCaption={false}
            fallbackSrc={t.heroImage}
            fallbackAlt={t.heroAlt}
          />
        </div>

        <header className="max-w-[44rem] mx-auto px-6 text-center pt-9 sm:pt-12 pb-2">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-allotment mb-5">Companion planting</div>
          <h1 className="font-serif text-[2rem] sm:text-5xl text-earth tracking-tight leading-[1.04] mb-6">{t.title}</h1>
          <p className="font-serif italic text-xl sm:text-2xl text-earth-light leading-[1.4] max-w-[40ch] mx-auto">{t.intro}</p>
          <div className="mt-7 flex justify-center">
            <PinButton path={`/guides/companion-planting/${t.slug}`} image={t.heroImage} description={t.description} />
          </div>
          <div className="mt-9 mx-auto w-10 h-px bg-amber" />
        </header>

        <div className="max-w-[40rem] mx-auto px-6">
          <SlotImage id={`companion-${t.slug}-intro`} sizes="(max-width: 640px) 100vw, 40rem" />
        </div>

        <article className="max-w-[44rem] mx-auto px-6 pb-4 text-earth-light leading-relaxed text-[17px]">
          {/* Written body */}
          {t.sections.map((s, i) => (
            <section key={i} className="mb-8">
              {s.heading && <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-3">{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mb-4">{p}</p>
              ))}
            </section>
          ))}

          {/* Good companions */}
          {t.goodCompanions && t.goodCompanions.length > 0 && (
            <section className="mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-5">Grow these alongside</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {t.goodCompanions.map((c) => (
                  <div key={c.name} className="border-l-2 border-leaf/50 pl-4">
                    <span className="font-serif text-lg text-earth block">{c.name}</span>
                    <p className="text-[15px] text-earth-light leading-snug mt-1">{c.why}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <SlotImage id={`companion-${t.slug}-companions`} sizes="(max-width: 640px) 100vw, 40rem" />
              </div>
            </section>
          )}

          {/* Avoid */}
          {t.avoid && t.avoid.length > 0 && (
            <section className="mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-5">Keep these apart</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {t.avoid.map((c) => (
                  <div key={c.name} className="border-l-2 border-rust/50 pl-4">
                    <span className="font-serif text-lg text-earth block">{c.name}</span>
                    <p className="text-[15px] text-earth-light leading-snug mt-1">{c.why}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Flowers to tuck in */}
          {t.flowers && t.flowers.length > 0 && (
            <section className="mb-10 bg-amber/10 border border-amber/30 -mx-6 sm:mx-0 px-6 sm:px-7 py-7">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-2">Flowers worth tucking in</h2>
              <p className="text-[15px] text-earth-light mb-5">The blooms that pull pests away and bring in the bees — beauty that earns its keep.</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {t.flowers.map((f) => (
                  <div key={f.name}>
                    <span className="font-serif text-lg text-earth block">{f.name}</span>
                    <p className="text-[15px] text-earth-light leading-snug mt-1">{f.why}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Seed buy-points */}
          {t.seedLinks && t.seedLinks.length > 0 && (
            <section className="mb-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter">Seeds that fit this plan</span>
                {t.seedLinks.map((l) => (
                  <AffiliateLink
                    key={l.label}
                    href={awinLink(l.url)}
                    product={l.label}
                    type="seed"
                    merchant="thompson-morgan"
                    position={`companion-topic-seeds-${t.slug}-${trackingSlug(l.label)}`}
                    className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                  >
                    {l.label} &rarr;
                  </AffiliateLink>
                ))}
              </div>
            </section>
          )}

          {/* On our plot */}
          <div className="mb-10">
            <SlotImage id={`companion-${t.slug}-practice`} sizes="(max-width: 640px) 100vw, 40rem" />
          </div>

          {/* FAQ */}
          {t.faqs.length > 0 && (
            <section className="mb-10 border-t border-earth/10 pt-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-earth tracking-tight mb-5">Common questions</h2>
              <div className="space-y-5">
                {t.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-serif text-lg text-earth mb-1.5">{f.q}</h3>
                    <p className="text-[15px] text-earth-light leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related crops */}
          {related.length > 0 && (
            <section className="mb-10 border-t border-earth/10 pt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter block mb-3">Grow them well</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {related.map((c) => (
                  <Link key={c.slug} href={`/crops/${c.slug}`} className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors">
                    {c.name} &rarr;
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to the hub — the link-equity funnel */}
          <section className="mb-10 bg-sage/30 border border-earth/10 -mx-6 sm:mx-0 px-6 sm:px-7 py-7 text-center">
            <p className="font-serif italic text-lg text-earth mb-3">Want the whole picture?</p>
            <Link href="/guides/companion-planting" className="font-serif text-xl text-allotment border-b-2 border-amber pb-0.5 hover:text-allotment-dark transition-colors">
              The complete companion planting guide &rarr;
            </Link>
          </section>

          {/* Sibling topics */}
          <section className="border-t border-earth/10 pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-earth-lighter block mb-3">More companion guides</span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {siblings.map((s) => (
                <Link key={s.slug} href={`/guides/companion-planting/${s.slug}`} className="text-[15px] text-allotment hover:text-rust transition-colors">
                  {s.title}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

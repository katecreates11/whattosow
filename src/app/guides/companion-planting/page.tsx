import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { crops } from "@/data/crops";
import Image from "next/image";
import { getCropImagePath } from "@/lib/crop-images";

export const metadata: Metadata = {
  title:
    "Companion Planting Guide UK — What Grows Well Together | What To Sow",
  description:
    "Complete UK companion planting chart for 40 vegetables. See what to grow together and what to keep apart on your allotment, based on real growing experience.",
  keywords: [
    "companion planting UK",
    "companion planting chart",
    "what to plant together",
    "companion planting vegetables",
    "allotment companion planting",
    "plants that grow well together UK",
    "companion planting guide",
  ],
  openGraph: {
    title: "Companion Planting Guide — What Grows Well Together",
    description:
      "Complete companion planting chart for 40 UK vegetables. What to grow together and what to keep apart.",
    type: "article",
    url: "https://whattosow.co.uk/guides/companion-planting",
  },
  alternates: {
    canonical: "/guides/companion-planting",
  },
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export default function CompanionPlantingGuide() {
  // Build companion data from crop records
  const cropsWithCompanions = crops.filter(
    (c) =>
      (c.companionPlants && c.companionPlants.length > 0) ||
      (c.avoidPlants && c.avoidPlants.length > 0)
  );

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
        name: "Guides",
        item: "https://whattosow.co.uk/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Companion Planting",
        item: "https://whattosow.co.uk/guides/companion-planting",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is companion planting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Companion planting is growing certain crops near each other because they benefit from the relationship. Benefits include pest deterrence, improved pollination, better use of space, and nutrient sharing. For example, carrots and onions planted together help repel each other's pests.",
        },
      },
      {
        "@type": "Question",
        name: "What vegetables should not be planted together?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some common combinations to avoid: potatoes and tomatoes (both nightshades, share blight), onions and beans (onions inhibit bean growth), fennel near most vegetables (inhibits growth), and brassicas near strawberries. Check our chart above for specific combinations.",
        },
      },
      {
        "@type": "Question",
        name: "Does companion planting actually work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some companion planting effects are well-documented by research — carrots and onions confusing each other's pests, marigolds repelling aphids, and nitrogen-fixing by beans. Others are based on generations of gardener observation rather than controlled studies. The low-risk, high-reward nature means it's worth doing even when the evidence is anecdotal.",
        },
      },
    ],
  };

  // Find if a companion name matches a crop slug
  function findCropSlug(name: string): string | null {
    const match = crops.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    return match ? match.slug : null;
  }

  function CompanionTag({
    name,
    type,
  }: {
    name: string;
    type: "good" | "bad";
  }) {
    const slug = findCropSlug(name);
    const imgPath = slug ? getCropImagePath(slug) : null;
    const colors =
      type === "good"
        ? "border-leaf/20 bg-leaf-bg/30 text-earth"
        : "border-tomato/20 bg-tomato-bg/30 text-earth";

    const content = (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-xs font-medium ${colors}`}
      >
        {imgPath && (
          <Image
            src={imgPath}
            alt=""
            width={16}
            height={16}
            className="rounded-full"
          />
        )}
        {name}
      </span>
    );

    if (slug) {
      return (
        <a href={`/crops/${slug}`} className="hover:opacity-80 transition-opacity">
          {content}
        </a>
      );
    }
    return content;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
          Growing guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-earth tracking-tight mb-4">
          Companion planting guide
        </h1>
        <p className="text-earth-light leading-relaxed mb-10">
          Some crops grow better together. Others are best kept apart. This
          chart covers all 40 vegetables in our database &mdash; what to plant
          next to each one and what to avoid. Scroll down or jump to a
          specific crop.
        </p>

        <div className="space-y-12 text-earth-light leading-relaxed">
          {/* Quick explanation */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Why companion planting works
            </h2>
            <div className="space-y-3">
              <p>
                Plants interact. Some partnerships have proven benefits:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span>
                  <span><strong className="text-earth">Pest confusion</strong> &mdash; Carrots and onions mask each other&apos;s scent from carrot fly and onion fly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span>
                  <span><strong className="text-earth">Nitrogen fixing</strong> &mdash; Beans and peas pull nitrogen from the air and store it in the soil. Plant brassicas where legumes grew last year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span>
                  <span><strong className="text-earth">Living mulch</strong> &mdash; Low-growing lettuce or spinach under taller beans shades the soil, reducing weeds and keeping roots cool</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span>
                  <span><strong className="text-earth">Physical support</strong> &mdash; The classic &ldquo;three sisters&rdquo;: sweetcorn supports beans, which fix nitrogen for squash, which shades the soil</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Jump links */}
          <section>
            <h2 className="text-lg font-semibold text-earth mb-3">
              Jump to a crop
            </h2>
            <div className="flex flex-wrap gap-2">
              {cropsWithCompanions.map((crop) => (
                <a
                  key={crop.slug}
                  href={`#${crop.slug}`}
                  className="text-xs text-allotment hover:text-allotment-dark underline decoration-allotment/30"
                >
                  {crop.name}
                </a>
              ))}
            </div>
          </section>

          {/* Crop-by-crop companion chart */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-6">
              Companion planting chart
            </h2>
            <div className="space-y-6">
              {cropsWithCompanions.map((crop) => {
                const imgPath = getCropImagePath(crop.slug);
                return (
                  <div
                    key={crop.slug}
                    id={crop.slug}
                    className="border border-earth/6 p-4 sm:p-5 scroll-mt-20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {imgPath && (
                        <Image
                          src={imgPath}
                          alt=""
                          width={36}
                          height={36}
                          className="rounded-full shrink-0"
                        />
                      )}
                      <a
                        href={`/crops/${crop.slug}`}
                        className="font-semibold text-earth hover:text-allotment transition-colors"
                      >
                        {crop.name}
                      </a>
                      <span
                        className={`text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 ${
                          crop.category === "hardy"
                            ? "bg-allotment/10 text-allotment"
                            : crop.category === "half-hardy"
                            ? "bg-amber/10 text-amber"
                            : "bg-tomato/10 text-tomato"
                        }`}
                      >
                        {crop.category}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {crop.companionPlants && crop.companionPlants.length > 0 && (
                        <div>
                          <span className="text-xs text-earth-lighter block mb-1.5">
                            Grows well with
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {crop.companionPlants.map((name) => (
                              <CompanionTag
                                key={name}
                                name={name}
                                type="good"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {crop.avoidPlants && crop.avoidPlants.length > 0 && (
                        <div>
                          <span className="text-xs text-earth-lighter block mb-1.5">
                            Keep apart from
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {crop.avoidPlants.map((name) => (
                              <CompanionTag
                                key={name}
                                name={name}
                                type="bad"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl font-semibold text-earth mb-3">
              Practical tips
            </h2>
            <div className="space-y-3">
              <p>
                Don&apos;t overthink it. Companion planting is a helpful
                guideline, not a rule book. If you only have one bed and need
                to grow beans next to onions, do it &mdash; they&apos;ll still
                grow.
              </p>
              <p>
                The most reliable companions are the ones that solve a specific
                problem: carrots next to onions to confuse pests, lettuce under
                sweetcorn for shade, marigolds around tomatoes for whitefly.
              </p>
              <p>
                If you&apos;re new to growing, focus on{" "}
                <a
                  href="/guides/beginners"
                  className="text-allotment hover:text-allotment-dark underline decoration-allotment/30"
                >
                  getting things in the ground
                </a>{" "}
                first. Companion planting is refinement, not a prerequisite.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-6">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What is companion planting?
                </h3>
                <p className="text-sm">
                  Growing certain crops near each other because they benefit
                  from the relationship. Benefits include pest deterrence,
                  improved pollination, better use of space, and nutrient
                  sharing.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  What vegetables should not be planted together?
                </h3>
                <p className="text-sm">
                  Some common combinations to avoid: potatoes and tomatoes
                  (both nightshades, share blight), onions and beans (onions
                  inhibit bean growth), fennel near most vegetables (inhibits
                  growth), and brassicas near strawberries.
                </p>
              </div>
              <div className="pl-6 border-l border-earth/10">
                <h3 className="font-medium text-earth mb-2">
                  Does companion planting actually work?
                </h3>
                <p className="text-sm">
                  Some effects are well-documented &mdash; carrots and onions
                  confusing each other&apos;s pests, marigolds repelling
                  aphids, nitrogen-fixing by beans. Others are based on
                  generations of gardener observation rather than controlled
                  studies. The low-risk, high-reward nature means it&apos;s
                  worth doing.
                </p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-xl font-semibold text-earth mb-4">
              More tools
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  What to sow this week &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Personalised to your postcode.
                </p>
              </a>
              <a
                href="/calendar"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Sowing calendar &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  All 40 crops across 12 months at a glance.
                </p>
              </a>
              <a
                href="/guides/spring-vegetables"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  Spring vegetables &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  Every crop you can sow this season.
                </p>
              </a>
              <a
                href="/frost-map"
                className="p-4 border border-earth/6 hover:border-earth/15 transition-colors"
              >
                <span className="font-semibold text-earth">
                  UK frost map &rarr;
                </span>
                <p className="text-sm text-earth-light mt-1">
                  See frost dates across every region.
                </p>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

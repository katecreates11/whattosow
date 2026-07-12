import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { crops } from "@/data/crops";
import Image from "next/image";
import SlotImage from "@/components/SlotImage";
import { getCropImagePath } from "@/lib/crop-images";
import { SectionDivider } from "@/components/GuideVisuals";
import PinButton from "@/components/PinButton";
import BedDiagram from "@/components/BedDiagram";
import { companionTopics } from "@/data/companion-topics";
import AffiliateLink from "@/components/AffiliateLink";

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

// Flowers worth tucking in alongside each crop (not in the crop data, since
// flowers aren't crops). Falls back to the all-rounders for anything unlisted.
const flowerCompanions: Record<string, string[]> = {
  tomatoes: ["Marigolds", "Basil", "Nasturtiums"],
  peppers: ["Marigolds", "Basil", "Nasturtiums"],
  chillies: ["Marigolds", "Basil"],
  aubergine: ["Marigolds", "Nasturtiums"],
  cucumbers: ["Nasturtiums", "Borage", "Dill"],
  courgettes: ["Nasturtiums", "Borage", "Marigolds"],
  pumpkins: ["Nasturtiums", "Borage"],
  squash: ["Nasturtiums", "Borage"],
  sweetcorn: ["Nasturtiums"],
  "runner-beans": ["Nasturtiums", "Borage", "Sweet peas"],
  "french-beans": ["Nasturtiums", "Borage"],
  "broad-beans": ["Nasturtiums", "Calendula"],
  peas: ["Nasturtiums", "Sweet peas"],
  lettuce: ["Marigolds", "Calendula", "Poached egg plant"],
  beetroot: ["Marigolds", "Nasturtiums"],
  carrots: ["Calendula", "Marigolds"],
  potatoes: ["Marigolds", "Calendula"],
  "maincrop-potatoes": ["Marigolds", "Calendula"],
  cabbage: ["Nasturtiums", "Marigolds", "Calendula"],
  broccoli: ["Nasturtiums", "Marigolds"],
  cauliflower: ["Nasturtiums", "Marigolds"],
  "brussels-sprouts": ["Nasturtiums", "Marigolds"],
  kale: ["Nasturtiums", "Marigolds"],
  "pak-choi": ["Nasturtiums"],
  radishes: ["Nasturtiums"],
  spinach: ["Marigolds"],
  "swiss-chard": ["Marigolds", "Nasturtiums"],
  strawberries: ["Borage"],
  "onion-sets": ["Calendula"],
  garlic: ["Calendula"],
  leeks: ["Calendula"],
};
const DEFAULT_FLOWERS = ["Marigolds", "Calendula", "Poached egg plant"];

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
      {
        "@type": "Question",
        name: "What can I plant with tomatoes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Good tomato companions include basil (said to improve flavour and repel whitefly), marigolds and nasturtiums (which lure aphids away and bring in pollinators), plus carrots, lettuce and onions. Keep tomatoes away from potatoes — they share blight — and from fennel.",
        },
      },
      {
        "@type": "Question",
        name: "What grows well with carrots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Carrots do well next to onions, leeks and garlic — their strong scent helps mask carrots from carrot fly, and vice versa. Lettuce, radishes and peas are also good neighbours. Avoid planting carrots near dill or fennel.",
        },
      },
      {
        "@type": "Question",
        name: "Do marigolds really repel pests?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, to a useful degree. French marigolds (Tagetes) attract hoverflies and ladybirds that eat aphids, and their roots release a compound that deters root-knot nematodes. They also work as a trap crop, drawing slugs and aphids to themselves. They're one of the few companion flowers with real evidence behind them.",
        },
      },
      {
        "@type": "Question",
        name: "Can I companion plant in a small bed or containers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Square-foot growing — dividing a bed into a grid and giving each square its own crop — is companion planting on a small scale, and works brilliantly in raised beds and large containers. Pair a tall crop with a low one, and tuck a few flowers in among the veg.",
        },
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Companion Planting Guide & Chart (UK)",
    description:
      "Complete UK companion planting chart for 40 vegetables — what to grow together, what to keep apart, the flowers worth tucking in, polyculture, and which old pairings actually hold up.",
    image: "https://whattosow.co.uk/photos/blog/marigold-lettuce-midsummer-2025.webp",
    author: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    publisher: { "@type": "Organization", name: "What To Sow" },
    datePublished: "2025-03-01",
    dateModified: "2026-06-03",
    mainEntityOfPage: "https://whattosow.co.uk/guides/companion-planting",
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
            alt={name}
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
        <Link href={`/crops/${slug}`} className="hover:opacity-80 transition-opacity">
          {content}
        </Link>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header backLink={{ href: "/guides", label: "\u2190 Guides" }} />
      <main id="main-content">
        <div className="px-6 sm:px-10 lg:px-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
            Growing guide
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth tracking-tight leading-[0.98] mb-3 max-w-3xl">
            Companion planting guide &amp; chart
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter mb-4">
            UK &middot; updated June 2026
          </p>
          <p className="text-earth-light leading-relaxed mb-6 max-w-2xl">
            Some crops grow better together; others are best kept apart. This is the complete chart for all 40
            vegetables in our database &mdash; what to plant next to each one, what to keep away, the flowers
            worth tucking in, and which old pairings actually hold up. Written from a real UK allotment, not
            copied from an almanac.
          </p>
        </div>

        {/* Hero — real companions on the plot, and a save-to-Pinterest hook */}
        <div className="px-6 sm:px-10 lg:px-16 mb-12">
          <figure className="max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/photos/blog/marigold-lettuce-midsummer-2025.webp"
                alt="Lettuces growing alongside bright marigolds in a raised allotment bed — companion planting in practice"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover img-grade"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-earth-light/70">
                Lettuce and marigolds, side by side on our plot
              </span>
              <PinButton
                path="/guides/companion-planting"
                image="/photos/blog/marigold-lettuce-midsummer-2025.webp"
                description="Companion planting chart for UK vegetables — what to grow together and what to keep apart. #companionplanting #vegetablegarden #allotment #ukgardening"
              />
            </figcaption>
          </figure>
        </div>

        <div className="space-y-12 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Quick explanation */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
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
                  className="text-xs text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  {crop.name}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm">
              Prefer it on paper?{" "}
              <a
                href="/guides/companion-planting-chart"
                className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
              >
                Print the quick-reference chart &rarr;
              </a>{" "}
              &mdash; the whole grid on one page, made for the shed door.
            </p>
          </section>

          {/* Crop-by-crop companion chart */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Companion planting combinations, in detail
            </h2>
            <p className="mb-6 text-sm max-w-2xl">
              Crop by crop &mdash; what to grow alongside each one, the flowers worth tucking in, and what to keep
              apart. These are the pairings that have actually earned their place on our plot.
            </p>
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
                          alt={`Illustration of ${crop.name}`}
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
                      <div>
                        <span className="text-xs text-earth-lighter block mb-1.5">
                          Flowers to tuck in
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(flowerCompanions[crop.slug] ?? DEFAULT_FLOWERS).map((name) => (
                            <span
                              key={name}
                              className="inline-flex items-center text-xs px-2 py-1 border border-amber/30 bg-amber/10 text-earth"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Flower companions */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Flowers that belong on the veg patch
            </h2>
            <p className="mb-6">
              Flowers aren&apos;t just decorative on an allotment &mdash;
              they&apos;re some of the hardest-working companions you can
              plant. They attract pollinators, repel pests, and make the
              whole plot look better. These four earn their place on our plot
              every single year:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 not-prose max-w-3xl">
              {[
                { src: "/photos/blog/marigolds-close-up.webp", label: "Marigolds" },
                { src: "/photos/blog/marigold-nasturtium-arch-2025.webp", label: "Nasturtiums" },
                { src: "/photos/crops/borage-flowers-bee.webp", label: "Borage" },
                { src: "/photos/blog/sunflower-with-bee.webp", label: "Sunflowers" },
              ].map((f) => (
                <figure key={f.label}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={f.src} alt={`${f.label} growing on the allotment`} fill sizes="(max-width:640px) 50vw, 22vw" className="object-cover img-grade" />
                  </div>
                  <figcaption className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-earth-light/70">{f.label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="space-y-4">
              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Marigolds <span className="text-xs font-normal text-earth-lighter">(Tagetes)</span>
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  The allotment essential. French marigolds repel whitefly from
                  tomatoes and deter aphids. Their roots also release a
                  chemical that discourages root-knot nematodes. Plant them
                  around the edges of beds or between rows of tomatoes,
                  peppers, and brassicas.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Tomatoes, peppers, aubergines, beans, courgettes, cucumbers, brassicas
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Nasturtiums <span className="text-xs font-normal text-earth-lighter">(Tropaeolum)</span>
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  Brilliant as a &ldquo;trap crop&rdquo; &mdash; blackfly and
                  caterpillars prefer nasturtiums to your actual vegetables.
                  The classic UK trick: grow a few near your <Link href="/crops/broad-beans" className="text-rust underline decoration-rust/30 hover:text-earth">broad beans</Link>,
                  whose growing tips get swarmed with blackfly &mdash; the nasturtiums (and a pinch-out of the
                  bean tips) draw them off. Plant near brassicas too, to lure cabbage whites away. The
                  leaves and flowers are edible &mdash; peppery in salads.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Broad beans, brassicas, courgettes, beans, cucumbers, squash
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Borage
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  A pollinator magnet with striking blue flowers. Bees can&apos;t
                  resist it. Plant near courgettes, squash, and runner beans to
                  boost pollination rates. It also attracts hoverflies, whose
                  larvae eat aphids. Self-seeds generously &mdash; you&apos;ll
                  only need to plant it once.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Courgettes, squash, runner beans, strawberries, tomatoes
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Lavender
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  Attracts pollinators and repels carrot fly, moths, and fleas.
                  Best planted along paths or bed edges where you&apos;ll brush
                  past it, releasing the scent. Works well as a semi-permanent
                  border plant.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Carrots, brassicas, lettuce. Good as a bed border plant
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Calendula <span className="text-xs font-normal text-earth-lighter">(Pot marigold)</span>
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  Not the same as French marigolds but equally useful. Attracts
                  hoverflies and ladybirds (aphid predators), and acts as a
                  trap crop for aphids. The petals are edible and make a
                  natural food colouring. Easy from seed, self-sows freely.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Tomatoes, peppers, asparagus, broad beans
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Sweet alyssum
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  Low-growing (5&ndash;10cm) ground cover that attracts
                  parasitic wasps and hoverflies. Excellent sown as a living
                  mulch under taller crops. Flowers all summer with minimal
                  care.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Brassicas, potatoes, onions. Use as ground cover between rows
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Sunflowers
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  Tall varieties act as a windbreak and support for climbing
                  beans. They attract pollinators and seed-eating birds that
                  also eat pests. Plant at the back of beds or along
                  north-facing edges where they won&apos;t shade other crops.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Sweetcorn, runner beans, courgettes, squash
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Phacelia
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  One of the best bee plants you can grow. Purple flowers
                  attract a huge range of pollinators. Also works as a green
                  manure &mdash; sow in autumn on empty beds, dig in before
                  spring planting. Fast-growing and unfussy.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Any crop. Brilliant as a bed border or green manure
                </p>
              </div>

              <div className="border border-earth/6 p-4 sm:p-5">
                <h3 className="font-semibold text-earth mb-1">
                  Poached egg plant <span className="text-xs font-normal text-earth-lighter">(Limnanthes)</span>
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-2">
                  A British favourite and one of the most useful flowers you can sow. Its white-and-yellow
                  blooms are irresistible to hoverflies, whose larvae are voracious aphid-eaters &mdash; a living
                  pest-control patrol. Low, spreading, hardy, and it self-seeds happily once you have it.
                </p>
                <p className="text-xs text-earth-lighter">
                  <strong className="text-earth">Plant with:</strong> Anything prone to aphids &mdash; brassicas, beans, along bed edges
                </p>
              </div>
            </div>

            {/* From the plot — companions worth sowing */}
            <div className="mt-7 border-t border-b border-earth/10 bg-sage/15 py-5 sm:py-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-allotment block mb-2">
                From the plot
              </span>
              <p className="text-sm text-earth-light leading-relaxed max-w-[62ch]">
                Marigolds and nasturtiums earn their place every year on our plot &mdash; we tuck them around the
                tomatoes and along the bed edges, and they pull their weight all summer. Start with one small patch;
                if they self-sow, let them.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href="/blog/companion-planting-marigolds-allotment"
                  className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                >
                  How we grow marigolds &rarr;
                </Link>
                <Link
                  href="/blog/square-foot-growing-allotment"
                  className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                >
                  Try square-foot growing &rarr;
                </Link>
              </div>
            </div>
          </section>

          {/* Polyculture — companion planting taken to its conclusion */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              Beyond pairs: polyculture
            </h2>
            <div className="space-y-3 mb-6">
              <p>
                Companion planting is really just the first step towards <strong className="text-earth">polyculture</strong> &mdash;
                growing a diverse mix of crops together in the same bed, rather than neat rows of a single
                vegetable (a monoculture). It&apos;s how nature actually grows, and on an allotment it pays off:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span><span><strong className="text-earth">Pests get confused</strong> &mdash; when a crop is dotted among others rather than lined up in a block, pests struggle to find and move between their target plants.</span></li>
                <li className="flex items-start gap-2"><span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span><span><strong className="text-earth">The soil stays covered</strong> &mdash; mixing tall, low and sprawling crops shades out weeds and keeps moisture in.</span></li>
                <li className="flex items-start gap-2"><span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span><span><strong className="text-earth">You harvest more from the space</strong> &mdash; quick crops (radish, lettuce) fill the gaps while slow ones (brassicas, leeks) get going.</span></li>
                <li className="flex items-start gap-2"><span className="text-allotment mt-0.5 shrink-0" aria-hidden="true">&#10003;</span><span><strong className="text-earth">There&apos;s always something for the pollinators</strong> &mdash; especially with flowers woven through.</span></li>
              </ul>
              <p>
                The easiest way to do it on purpose is <strong className="text-earth">square planting</strong> &mdash;
                dividing a bed into a grid and giving each square its own crop. You get all the diversity of a
                polyculture, but tidy enough to keep track of.{" "}
                <Link href="/blog/square-foot-growing-allotment" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
                  Here&apos;s how I plant my beds the square-foot way &rarr;
                </Link>{" "}
                A simple marked-out grid is enough; the point is rhythm, not a perfect drawing.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/photos/blog/square-growing-bed.webp" alt="A raised bed divided into a grid, each square sown with a different crop — square-foot polyculture" fill sizes="(max-width:640px) 100vw, 45vw" className="object-cover img-grade" />
                </div>
                <figcaption className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-earth-light/70">One bed, gridded into squares — a crop in each</figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/photos/blog/courgette-marigold-bed-june.webp" alt="Courgettes planted with a border of marigolds — a mixed polyculture bed" fill sizes="(max-width:640px) 100vw, 45vw" className="object-cover img-grade" />
                </div>
                <figcaption className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-earth-light/70">Courgettes edged with marigolds</figcaption>
              </figure>
            </div>
          </section>

          {/* How to lay them out — bed-plan diagrams for the best combinations */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              How to lay them out
            </h2>
            <p className="mb-6 max-w-2xl">
              Knowing what goes together is one thing &mdash; here&apos;s how to actually arrange a few of the best
              combinations in a standard bed. Tall things go to the back or middle so they don&apos;t shade the
              rest; flowers go to the edges where they can do their work.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <BedDiagram
                title="Tomatoes, basil & marigolds"
                note="Tomatoes along the back (they grow tall), basil tucked between them, marigolds edging the front to pull whitefly and bring in hoverflies."
                plantings={[
                  { name: "Tomatoes", color: "#C9543E", initial: "To", positions: [[22, 22], [50, 20], [78, 22]] },
                  { name: "Basil", color: "#4A9A5B", initial: "Ba", positions: [[36, 48], [64, 48]] },
                  { name: "Marigolds", color: "#D4943A", initial: "Ma", positions: [[14, 80], [38, 82], [62, 82], [86, 80]], r: 11 },
                ]}
              />
              <BedDiagram
                title="Carrots & onions, in alternating rows"
                note="Sow each in its own dense row and alternate them down the bed — a row of carrots, a row of onions, and so on. Each row's scent masks the other, confusing carrot fly and onion fly."
                plantings={[
                  { name: "Carrots (row)", color: "#C9772E", initial: "Ca", rows: [16, 50, 84] },
                  { name: "Onions (row)", color: "#8E7CB0", initial: "On", rows: [33, 67] },
                ]}
              />
            </div>

            <aside className="mt-6 border-t border-b border-earth/10 py-5 sm:py-6" aria-labelledby="companion-buyer-note">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-lighter block mb-2">
                Worth buying / skip this
              </span>
              <h3 id="companion-buyer-note" className="font-serif text-xl sm:text-2xl text-earth tracking-tight mb-4">
                One thing that can help with bed planning
              </h3>
              <div className="divide-y divide-earth/10">
                <div className="py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-allotment mb-2 sm:mb-0">
                    Worth buying
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-earth-light leading-relaxed max-w-[62ch]">
                      If you grow in square-foot blocks and like a guide under your hand, a seed spacer can earn its
                      place. It keeps carrots, salads and spring onions even without measuring every row.
                    </p>
                    <AffiliateLink
                      href="https://www.amazon.co.uk/dp/B00US8ESWK"
                      product="Seeding Square"
                      type="gear"
                      merchant="amazon"
                      position="companion-buyer-note"
                      className="inline-flex min-h-11 items-center font-serif italic text-rust border-b border-rust/30 pb-0.5 hover:text-earth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust transition-colors"
                    >
                      Check the Seeding Square seed spacer &rarr;
                    </AffiliateLink>
                  </div>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-rust mb-2 sm:mb-0">
                    Skip this
                  </p>
                  <p className="text-sm text-earth-light leading-relaxed max-w-[62ch]">
                    Skip laminated companion charts and expensive planting kits. The pairings on this page, a length
                    of string and a few labels will do the job for most beds.
                  </p>
                </div>
              </div>
              <p className="text-xs text-earth-lighter mt-3 max-w-[62ch]">
                If you buy through the link above, a little goes towards the allotment shed. The advice is the same
                either way.
              </p>
            </aside>

            {/* The Three Sisters — a worked example, with its UK caveat + seeds */}
            <div className="mt-6 grid sm:grid-cols-2 gap-5 items-start">
              <BedDiagram
                title="The Three Sisters"
                note="Sweetcorn in a block in the middle (it pollinates better in a block), climbing French beans planted to scramble up the corn, and squash around the outside to sprawl and cover the soil."
                plantings={[
                  { name: "Sweetcorn", color: "#E0B93C", initial: "Co", positions: [[38, 32], [50, 30], [62, 32], [38, 52], [50, 54], [62, 52]] },
                  { name: "Climbing French beans", color: "#2D5F3E", initial: "Be", positions: [[44, 42], [56, 42], [50, 62]], r: 9 },
                  { name: "Squash", color: "#8A9A4E", initial: "Sq", positions: [[15, 18], [85, 18], [15, 82], [85, 82]] },
                ]}
              />
              <div className="bg-sage/30 border border-earth/10 p-5 sm:p-6">
                <h3 className="font-serif text-lg text-earth tracking-tight mb-2">A North American classic &mdash; with a UK caveat</h3>
                <p className="text-sm text-earth-light leading-relaxed mb-3">
                  The Three Sisters is the oldest companion planting of all, from Indigenous North American gardens.
                  Use <Link href="/crops/french-beans" className="text-rust underline decoration-rust/30 hover:text-earth">climbing French beans</Link>, not
                  runners (runners swamp the corn). Sow the <Link href="/crops/sweetcorn" className="text-rust underline decoration-rust/30 hover:text-earth">corn</Link> first,
                  add beans when it&apos;s a hand high, and tuck <Link href="/crops/pumpkins" className="text-rust underline decoration-rust/30 hover:text-earth">squash</Link> around the edge.
                </p>
                <p className="text-sm text-earth-light leading-relaxed border-l-2 border-amber pl-4 mb-4">
                  <strong className="text-earth">Honest word for UK growers:</strong> it comes from a warmer climate, and
                  in a cool British summer the corn and squash can struggle to ripen. Worth a go for the fun of it &mdash;
                  give it your sunniest spot, start under cover, and treat a good crop as a bonus.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-earth-light max-w-2xl">
              Laying out beds from scratch this year?{" "}
              <Link
                href="/blog/best-raised-beds-uk"
                className="font-serif italic text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
              >
                Our honest guide to the best raised beds in the UK &rarr;
              </Link>{" "}
              covers sizes, timber against recycled plastic, and what&apos;s actually worth paying for.
            </p>
          </section>

          {/* Evidence vs folklore — the honest, differentiating bit */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              What actually holds up &mdash; and what&apos;s folklore
            </h2>
            <p className="mb-4">
              Plenty of companion charts online repeat the same pairings without saying which are backed by
              evidence and which are simply tradition. Here&apos;s the honest split, so you can spend your effort
              where it counts.
            </p>
            <figure className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-rust mb-3">
                From plugs to full bloom — the same beds, one season
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {["companion-main-pairing-1", "companion-main-pairing-2", "companion-main-pairing-3", "companion-main-pairing-4"].map((id) => (
                  <SlotImage key={id} id={id} sizes="(max-width: 640px) 50vw, 22vw" />
                ))}
              </div>
              <figcaption className="mt-3 text-sm text-earth-light leading-relaxed max-w-2xl">
                Tomatoes staked down the middle, French marigolds edging the beds. Plant the marigolds as plugs in
                late spring and by August they&apos;ll have filled out like this — that&apos;s the whole trick, and
                it&apos;s an easy one to copy.
              </figcaption>
            </figure>
            <p className="mb-4 text-sm">
              This is one of the better-evidenced pairings in a UK context: RHS trials found French marigolds
              (Tagetes) growing among greenhouse tomatoes measurably reduced whitefly. Out on the plot they also
              pull in the hoverflies and ladybirds that deal with aphids.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-allotment/5 border border-allotment/15 p-5">
                <h3 className="font-semibold text-allotment mb-2">Worth doing &mdash; good evidence</h3>
                <ul className="space-y-1.5 text-sm">
                  <li>Legumes (beans, peas) fixing nitrogen for hungry crops that follow.</li>
                  <li>Tall + low layering for space and shade (the three sisters; lettuce under taller crops).</li>
                  <li>Strong-scented alliums and herbs masking a crop&apos;s scent &mdash; carrots with onions against carrot &amp; onion fly.</li>
                  <li>Flowers (marigolds, nasturtiums, calendula) pulling in pollinators and predatory insects, and luring aphids away as a trap crop.</li>
                </ul>
              </div>
              <div className="bg-blush/40 border border-tomato/15 p-5">
                <h3 className="font-semibold text-tomato mb-2">Treat with a pinch of salt</h3>
                <ul className="space-y-1.5 text-sm">
                  <li>Most specific &ldquo;X hates Y&rdquo; rules &mdash; largely traditional, rarely tested. Won&apos;t hurt to follow, but don&apos;t fret.</li>
                  <li><strong className="text-earth">Real exceptions worth respecting:</strong> keep <Link href="/crops/tomatoes" className="underline decoration-tomato/30 hover:text-earth">tomatoes</Link> and <Link href="/crops/maincrop-potatoes" className="underline decoration-tomato/30 hover:text-earth">potatoes</Link> apart (shared blight), and keep fennel in its own corner (it genuinely suppresses neighbours).</li>
                  <li>No amount of companion planting replaces healthy soil, decent spacing, and <Link href="/guides/crop-rotation" className="underline decoration-tomato/30 hover:text-earth">crop rotation</Link>.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* UK myths worth retiring */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
              A few UK myths worth retiring
            </h2>
            <p className="mb-4">
              Some companion &ldquo;rules&rdquo; get repeated endlessly on British gardening sites but don&apos;t
              stand up. Save yourself the bother:
            </p>
            <div className="space-y-3">
              <div className="border-l-2 border-tomato/40 pl-4">
                <p className="text-sm"><strong className="text-earth">&ldquo;Marigolds keep carrot fly away.&rdquo;</strong> They don&apos;t. Carrot fly finds carrots by scent, low to the ground &mdash; the things that actually work are <Link href="/guides/pests" className="text-rust underline decoration-rust/30 hover:text-earth">fine insect mesh or fleece</Link>, sowing thinly to avoid thinning (the bruised foliage is what draws them), and growing alongside <Link href="/crops/onion-sets" className="text-rust underline decoration-rust/30 hover:text-earth">onions</Link> or garlic.</p>
              </div>
              <div className="border-l-2 border-tomato/40 pl-4">
                <p className="text-sm"><strong className="text-earth">&ldquo;Basil makes tomatoes taste better.&rdquo;</strong> A lovely idea with no evidence behind it. Basil is still a fine neighbour for <Link href="/crops/tomatoes" className="text-rust underline decoration-rust/30 hover:text-earth">tomatoes</Link> &mdash; it may deter a few flies, and it crops in the same warm spot &mdash; but it won&apos;t change the flavour of the fruit.</p>
              </div>
              <div className="border-l-2 border-tomato/40 pl-4">
                <p className="text-sm"><strong className="text-earth">&ldquo;Borage improves strawberry flavour.&rdquo;</strong> Borage is genuinely worth growing &mdash; it&apos;s a magnet for bees, and better pollination can mean better-set <Link href="/crops/strawberries" className="text-rust underline decoration-rust/30 hover:text-earth">strawberries</Link>. But it&apos;s the pollinators doing the work, not some change to the taste.</p>
              </div>
              <div className="border-l-2 border-tomato/40 pl-4">
                <p className="text-sm"><strong className="text-earth">&ldquo;Plant mint to repel pests.&rdquo;</strong> Strong-scented mint may muddle a few pests, but it spreads ferociously and will take over a bed in a season. If you grow it, keep it in a buried pot &mdash; never loose in the ground.</p>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-4 tracking-tight">
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
                For the full picture on dealing with pests, see our{" "}
                <a
                  href="/guides/pests"
                  className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  pest prevention guide
                </a>.
              </p>
              <p>
                If you&apos;re new to growing, focus on{" "}
                <a
                  href="/guides/beginners"
                  className="text-rust hover:text-earth underline decoration-rust/30 transition-colors"
                >
                  getting things in the ground
                </a>{" "}
                first. Companion planting is refinement, not a prerequisite.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-earth/6 pt-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-8 tracking-tight">
              Common questions
            </h2>
            <div className="space-y-6">
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  What is companion planting?
                </h3>
                <p className="text-sm">
                  Growing certain crops near each other because they benefit
                  from the relationship. Benefits include pest deterrence,
                  improved pollination, better use of space, and nutrient
                  sharing.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
                  What vegetables should not be planted together?
                </h3>
                <p className="text-sm">
                  Some common combinations to avoid: potatoes and tomatoes
                  (both nightshades, share blight), onions and beans (onions
                  inhibit bean growth), fennel near most vegetables (inhibits
                  growth), and brassicas near strawberries.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">
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
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">What can I plant with tomatoes?</h3>
                <p className="text-sm">
                  Basil, marigolds and nasturtiums are the classic friends &mdash; plus carrots, lettuce and
                  onions. Keep <Link href="/crops/tomatoes" className="text-rust hover:text-earth underline decoration-rust/30">tomatoes</Link> away
                  from potatoes (shared blight) and fennel.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">What grows well with carrots?</h3>
                <p className="text-sm">
                  Onions, leeks and garlic &mdash; their scent helps hide carrots from carrot fly, and vice
                  versa &mdash; along with lettuce, radishes and peas. Keep <Link href="/crops/carrots" className="text-rust hover:text-earth underline decoration-rust/30">carrots</Link> away
                  from dill and fennel.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">Do marigolds really repel pests?</h3>
                <p className="text-sm">
                  Yes, usefully so &mdash; French marigolds draw in aphid-eating hoverflies and ladybirds,
                  deter root-knot nematodes, and act as a trap crop. One of the few companion flowers with real
                  evidence behind it.
                </p>
              </div>
              <div className="pb-0">
                <h3 className="font-serif text-lg text-earth mb-2">Can I companion plant in a small bed or pots?</h3>
                <p className="text-sm">
                  Definitely &mdash; <Link href="/blog/square-foot-growing-allotment" className="text-rust hover:text-earth underline decoration-rust/30">square-foot growing</Link> is
                  companion planting on a small scale. Pair a tall crop with a low one and tuck a few flowers in
                  among the veg.
                </p>
              </div>
            </div>
          </section>

          {/* Go deeper — the companion-planting cluster (crop-by-crop satellites) */}
          <SectionDivider label="Go deeper" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Companion planting, crop by crop
            </h2>
            <p className="mb-6 max-w-2xl">
              Want the detail for one crop? These go deeper than the chart above &mdash; the best partners for each,
              the flowers worth tucking in, and the neighbours to keep well apart.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 max-w-2xl">
              {companionTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/guides/companion-planting/${t.slug}`}
                  className="flex items-center justify-between py-4 border-b border-earth/8 group"
                >
                  <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors pr-4">
                    {t.title}
                  </span>
                  <span className="text-earth/20 group-hover:text-rust transition-colors text-xl shrink-0">&rarr;</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link
                href="/"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  What to sow this week
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link
                href="/calendar"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  Sowing calendar
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link
                href="/guides/spring-vegetables"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  Spring vegetables
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link
                href="/frost-map"
                className="flex items-center justify-between py-5 border-b border-earth/8 group"
              >
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">
                  UK frost map
                </span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateLink from "@/components/AffiliateLink";
import { SectionDivider, TipBox, WarningBox, GuideHero, GuidePair } from "@/components/GuideVisuals";
import { awinLink } from "@/lib/awin";

const tm = (q: string) => awinLink(`https://search.thompson-morgan.com/seeds/${encodeURIComponent(q)}`);

function trackingSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const metadata: Metadata = {
  title: "Overwintering Broad Beans & Peas — Autumn Sowing (UK) | What To Sow",
  description:
    "How to overwinter broad beans and peas in the UK: sow hardy varieties in autumn for a harvest weeks ahead of spring sowings. The best varieties, how to protect them, and the pitfalls to avoid.",
  keywords: [
    "overwintering broad beans",
    "autumn sown broad beans",
    "overwintering peas",
    "broad beans aquadulce",
    "autumn sowing peas UK",
    "hardy peas to sow in autumn",
  ],
  openGraph: {
    title: "Overwintering Broad Beans & Peas — Autumn Sowing for an Early Crop",
    description:
      "Sow hardy broad beans and peas in autumn for a harvest weeks ahead of spring sowings. Varieties, protection and pitfalls.",
    type: "article",
    url: "https://whattosow.co.uk/guides/overwintering-broad-beans-and-peas",
  },
  alternates: { canonical: "/guides/overwintering-broad-beans-and-peas" },
};

interface VarItem {
  name: string;
  note: string;
  seeds?: string;
}

const beanVars: VarItem[] = [
  { name: "Aquadulce Claudia", note: "The classic overwintering broad bean — exceptionally hardy and the most reliable for an autumn sowing. If you grow one, grow this.", seeds: tm("Broad%20Bean%20Aquadulce%20Claudia") },
  { name: "The Sutton (dwarf)", note: "A compact, sturdy bean that copes well with wind and exposure — good for breezy plots and smaller beds.", seeds: tm("Broad%20Bean%20The%20Sutton") },
];

const peaVars: VarItem[] = [
  { name: "Meteor", note: "Short, tough and one of the hardiest peas there is — the safest choice for an autumn sowing.", seeds: tm("Pea%20Meteor") },
  { name: "Douce Provence", note: "A sweet, dependable overwintering pea that stands the cold well and crops early.", seeds: tm("Pea%20Douce%20Provence") },
];

function VarRow({ item, topic }: { item: VarItem; topic: string }) {
  return (
    <div className="border-t border-earth/8 py-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <span className="font-serif text-lg text-earth">{item.name}</span>
        {item.seeds && (
          <AffiliateLink
            href={item.seeds}
            product={`${item.name} seeds`}
            type="seed"
            merchant="thompson-morgan"
            position={`overwinter-legumes-seeds-${trackingSlug(item.name)}`}
            data-umami-event-topic={topic}
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors shrink-0"
          >
            {item.name} seed at T&amp;M &rarr;
          </AffiliateLink>
        )}
      </div>
      <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{item.note}</p>
    </div>
  );
}

export default function OverwinteringLegumesGuide() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://whattosow.co.uk" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://whattosow.co.uk/guides" },
      { "@type": "ListItem", position: 3, name: "Overwintering Broad Beans & Peas", item: "https://whattosow.co.uk/guides/overwintering-broad-beans-and-peas" },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Overwintering Broad Beans & Peas — Autumn Sowing for an Early Crop",
    description:
      "How to sow hardy broad beans and peas in autumn for a harvest weeks ahead of spring sowings.",
    url: "https://whattosow.co.uk/guides/overwintering-broad-beans-and-peas",
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
    datePublished: "2026-06-07",
    dateModified: "2026-06-07",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can you sow broad beans in autumn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — hardy varieties like Aquadulce Claudia are bred for it. Sown in late October or November, they germinate, make a little growth, then sit through winter and romp away in spring for a crop several weeks ahead of spring-sown beans. They also tend to dodge the worst of the blackfly, which arrives after the autumn-sown plants are already cropping.",
        },
      },
      {
        "@type": "Question",
        name: "When should I sow overwintering broad beans and peas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Late October into November is the sweet spot — late enough that the plants don't grow too soft before winter, early enough to establish roots. Aim for plants a few inches tall going into the cold. In the coldest, wettest areas, many growers prefer to start them in pots or wait for an early spring sowing instead.",
        },
      },
      {
        "@type": "Question",
        name: "Do autumn-sown beans and peas need protection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The hardy varieties survive most UK winters unprotected, but a cloche or a layer of fleece in the hardest frosts helps, and protection from pigeons and mice matters more than the cold. The real risk is waterlogging, so good drainage — or a raised bed — does more than any amount of fleece.",
        },
      },
      {
        "@type": "Question",
        name: "What's the advantage of overwintering peas and beans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An earlier crop — broad beans and peas weeks ahead of anything you could sow in spring, filling the 'hungry gap' of late spring when little else is ready. Autumn-sown broad beans also often escape the blackfly that plagues spring sowings, and getting them in now is one less job in the spring rush.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header backLink={{ href: "/guides", label: "← Guides" }} />
      <main id="main-content">
        <GuideHero
          eyebrow="Seasonal guide"
          title="Overwintering broad beans & peas"
          subtitle="One of growing's loveliest sleights of hand — tuck hardy broad beans and peas in as the year winds down, all but forget them, and they hand you a crop in late spring, weeks before anything sown in March."
          image="/photos/guides/beanspeas-hero-trellis.webp"
          color="allotment"
        />

        <div className="px-6 sm:px-10 lg:px-16">
          <p className="text-earth-light leading-relaxed mb-10 max-w-2xl">
            It works best in milder, well-drained spots, so let your own weather guide you &mdash;{" "}
            <Link href="/" className="text-rust hover:text-earth underline decoration-rust/30 transition-colors">
              check your frost dates
            </Link>{" "}
            before you sow.
          </p>
        </div>

        <div className="space-y-4 text-earth-light leading-relaxed px-6 sm:px-10 lg:px-16 [&>section]:max-w-2xl">
          {/* Why */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Why sow them in autumn
            </h2>
            <p className="mb-3">
              The pull is an earlier harvest. Autumn-sown broad beans and peas crop several weeks ahead of spring
              sowings, right in the &ldquo;hungry gap&rdquo; of late spring when the winter veg is finishing and the
              summer crops are nowhere near. There&apos;s a second prize with broad beans: by cropping early, they often
              get the pods set before blackfly arrives in force &mdash; the pest that torments so many spring-sown plants.
              And it&apos;s one job off the towering spring to-do list.
            </p>
          </section>

          <GuidePair
            images={[
              { src: "/photos/guides/beanspeas-pair-pods.webp", alt: "Pea plants heavy with pods against a jute net trellis" },
              { src: "/photos/guides/beanspeas-pair-split.webp", alt: "Three pea pods split open showing rows of sweet green peas" },
            ]}
            caption="Sown in autumn, they surge away when the light returns — pods hanging heavy on the netting by late spring, and peas sweet enough to eat straight from the pod."
            aspect="portrait"
          />

          {/* Varieties */}
          <SectionDivider label="The right varieties" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Choose hardy varieties &mdash; this matters
            </h2>
            <p className="mb-3">
              This is the one thing you can&apos;t fudge. Ordinary spring varieties won&apos;t stand a winter; you need
              the tough, hardy types bred for autumn sowing. Get this right and the rest is easy.
            </p>
            <h3 className="font-serif text-xl text-earth mb-1 mt-5">Broad beans</h3>
            <div>
              {beanVars.map((v) => (
                <VarRow key={v.name} item={v} topic="overwinter-beans" />
              ))}
            </div>
            <h3 className="font-serif text-xl text-earth mb-1 mt-7">Peas</h3>
            <div>
              {peaVars.map((v) => (
                <VarRow key={v.name} item={v} topic="overwinter-peas" />
              ))}
            </div>
          </section>

          {/* How */}
          <SectionDivider label="Sowing them" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              When and how to sow
            </h2>
            <p className="mb-3">
              Aim for <strong className="text-earth">late October into November</strong>. The goal is plants a few inches
              tall going into the deep cold &mdash; established enough to be tough, but not so lush and soft that the
              frost damages them. Sow before the window and they grow leggy; sow after it and they barely get going.
            </p>
            <p className="mb-3">
              Sow broad beans about 5cm deep and 20cm apart in a double row; sow hardy peas a little shallower in a wide,
              dense band. Choose your sunniest, best-drained bed &mdash; and if your ground lies wet over winter, that&apos;s
              the single biggest thing to fix, because cold wet soil rots the seeds before they ever get going.
            </p>
          </section>

          <TipBox title="Start them in pots if your soil lies wet">
            On heavy, cold or very wet ground, sowing straight into the soil in autumn is a gamble. The neat trick is to
            start them in pots or root trainers in a cold frame or unheated greenhouse, then plant the young plants out
            once they&apos;re sturdy &mdash; you get the early-crop benefit without losing the seed to rot. It also keeps
            them safely out of reach of the mice that love to dig up autumn-sown beans and peas.
          </TipBox>

          {/* Protection */}
          <SectionDivider label="Through the winter" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-3 tracking-tight">
              Carrying them through
            </h2>
            <ul className="space-y-3 mb-2">
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Drainage first</span> &mdash; the real winter killer is
                waterlogging, not cold. A free-draining bed, or a{" "}
                <Link href="/blog/best-raised-beds-uk" className="text-rust underline decoration-rust/30 hover:text-earth">raised bed</Link>,
                does more than any cover.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">A little cover in the hardest frosts</span> &mdash; the hardy
                varieties cope with most winters, but a cloche or fleece helps in a brutal cold snap or an exposed,
                northern garden. See{" "}
                <Link href="/guides/protecting-vegetables-from-frost" className="text-rust underline decoration-rust/30 hover:text-earth">protecting crops from frost</Link>.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Guard against mice &amp; pigeons</span> &mdash; mice dig up the
                seeds and pigeons strip the young shoots. Netting, or starting in pots, keeps both off.
              </li>
              <li className="border-l-2 border-leaf/50 pl-4">
                <span className="font-serif text-earth">Support and pinch out in spring</span> &mdash; when growth surges,
                support peas with twiggy sticks, and once broad beans are flowering well, pinch out the soft growing tips
                &mdash; it discourages blackfly and pushes the plant into podding.
              </li>
            </ul>
          </section>

          <WarningBox title="It's not for every garden">
            It&apos;s worth being led by your own ground. On cold, wet, heavy or very exposed sites, autumn-sown beans and
            peas can simply rot or freeze, and an early spring sowing under cover does better &mdash; no harm done, just
            something the soil has told you. If in doubt, hedge your bets: sow a small batch in autumn and another in late
            winter, and let your own beds show you what works.
          </WarningBox>

          {/* FAQ */}
          <SectionDivider label="Questions" />
          <section>
            <h2 className="text-2xl sm:text-3xl font-serif text-earth mb-5 tracking-tight">Common questions</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Can you sow broad beans in autumn?</h3>
                <p className="text-[15px]">Yes — hardy varieties like Aquadulce Claudia are bred for it. Sown in late October or November, they make a little growth, sit through winter and romp away in spring for a crop weeks ahead of spring-sown beans, often dodging the worst of the blackfly too.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">When should I sow overwintering broad beans and peas?</h3>
                <p className="text-[15px]">Late October into November is the sweet spot — late enough that plants don&apos;t grow too soft, early enough to root well. Aim for plants a few inches tall going into the cold. In the coldest, wettest areas, start them in pots or wait for an early spring sowing.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">Do autumn-sown beans and peas need protection?</h3>
                <p className="text-[15px]">The hardy varieties survive most UK winters unprotected, though a cloche or fleece helps in hard frosts. Protection from mice and pigeons matters more than the cold — and good drainage (or a raised bed) does more than any fleece, since waterlogging is the real risk.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-earth mb-1.5">What&apos;s the advantage of overwintering peas and beans?</h3>
                <p className="text-[15px]">An earlier crop — weeks ahead of spring sowings, filling the hungry gap of late spring. Autumn-sown broad beans also often escape the blackfly that plagues spring sowings, and getting them in now is one less job in the spring rush.</p>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <SectionDivider label="Next" />
          <section>
            <div>
              <Link href="/crops/broad-beans" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow broad beans</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/crops/peas" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">How to grow peas</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/autumn-winter-vegetables" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">What to sow in autumn &amp; winter</span>
                <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
              </Link>
              <Link href="/guides/protecting-vegetables-from-frost" className="flex items-center justify-between py-5 border-b border-earth/8 group">
                <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Protecting crops from frost</span>
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

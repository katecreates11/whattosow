import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChristmasPlate from "@/components/ChristmasPlate";
import ChristmasCountdown from "@/components/ChristmasCountdown";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Grow Your Christmas Dinner — What's Still Time to Sow | What To Sow",
  description:
    "A countdown to Christmas dinner and an honest guide to what you can still grow for the table — from midwinter new potatoes to windowsill herbs. Sow now, eat on the day.",
  keywords: [
    "grow your own christmas dinner uk",
    "christmas vegetables to grow",
    "new potatoes for christmas",
    "what to sow for winter uk",
    "grow christmas dinner",
  ],
  openGraph: {
    title: "Grow Your Christmas Dinner",
    description:
      "How many days to Christmas dinner — and what you can still grow for the table, told honestly.",
    type: "article",
    locale: "en_GB",
    url: "https://whattosow.co.uk/grow-your-christmas-dinner",
  },
  alternates: { canonical: "/grow-your-christmas-dinner" },
};

const faqs = [
  {
    q: "Can you really grow your own Christmas dinner?",
    a: "Some of it, yes — and more than you'd think. New potatoes tipped out on Christmas Eve, winter salad leaves, windowsill herbs and a peppery radish or two are all within reach if you start at the right time. The showpiece roots and sprouts, though, are sown back in spring, so those are best bought in this year.",
  },
  {
    q: "When do you plant potatoes for Christmas?",
    a: "Plant cold-stored seed potatoes into a deep bag by the end of August. Keep them fed and watered, and move the bag somewhere frost-free before the first hard frost. Tip them out on Christmas Eve for new potatoes in the depths of winter.",
  },
  {
    q: "Is it too late to grow vegetables for Christmas?",
    a: "It depends what you fancy on the plate. Sprouts, parsnips and red cabbage need a spring start, so they've sailed for this year. But salad leaves, oriental greens, radishes and herbs can all still be sown for the table — the countdown above shows which windows are open.",
  },
];

export default function ChristmasDinnerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Grow Your Christmas Dinner",
    description:
      "A countdown to Christmas dinner and an honest guide to what you can still grow for the table.",
    about: "Growing vegetables for Christmas dinner in the UK",
    url: "https://whattosow.co.uk/grow-your-christmas-dinner",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "What To Sow", url: "https://whattosow.co.uk" },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main id="main-content">
        {/* Hero — atmospheric, no photo needed */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% -10%, #FDF6EC 0%, #F5EFE0 45%, #E8F0EB 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(212,148,58,0.35), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-6 pb-10 pt-16 text-center sm:pt-20">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-rust">
              The midwinter plot
            </span>
            <h1 className="mb-5 font-serif text-5xl leading-[0.95] tracking-tight text-earth sm:text-6xl lg:text-7xl">
              Grow your
              <br />
              Christmas dinner
            </h1>
            <p className="mx-auto max-w-[46ch] font-serif text-lg italic leading-snug text-earth-light sm:text-xl">
              You can&rsquo;t hurry a sprout — but you&rsquo;d be surprised how much of the table you
              can still grow yourself. Here&rsquo;s what&rsquo;s in time, told straight.
            </p>
            <div className="mt-12">
              <ChristmasCountdown nowISO={new Date().toISOString()} />
            </div>
          </div>
        </section>

        <div className="py-10 sm:py-14">
          <ChristmasPlate nowISO={new Date().toISOString()} />
        </div>

        {/* A warm word */}
        <div className="mx-auto max-w-3xl px-6 pb-4">
          <p className="mx-auto max-w-[60ch] text-earth-light leading-relaxed">
            There&rsquo;s a particular pleasure in carrying something to the Christmas table that you
            started with your own hands — a bowl of buttered new potatoes in the dead of winter, a
            handful of sharp leaves cut that morning. None of it&rsquo;s hard. It&rsquo;s mostly a
            matter of doing the small thing now, while there&rsquo;s still time.
          </p>
        </div>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <h2 className="mb-6 font-serif text-2xl tracking-tight text-earth sm:text-3xl">
            Common questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-serif text-lg text-earth">{f.q}</h3>
                <p className="mt-1 max-w-[62ch] leading-relaxed text-earth-light">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

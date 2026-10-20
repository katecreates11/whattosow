import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlutOMeter from "@/components/GlutOMeter";

export const metadata: Metadata = {
  title: "The Glut-o-meter — Drowning in Courgettes? | What To Sow",
  description:
    "Pick what's piling up on the kitchen table — courgettes, beans, tomatoes, cucumbers — and how much, and we'll weigh the haul and tell you what to eat now, freeze, or rescue before it turns.",
  keywords: [
    "what to do with a glut of courgettes",
    "too many tomatoes what to do",
    "glut of vegetables uk",
    "freezing courgettes beans tomatoes",
  ],
  openGraph: {
    title: "The Glut-o-meter",
    description: "Drowning in courgettes? Weigh the haul, and get the eat-now, freeze and rescue plan for each crop.",
    type: "website",
    url: "https://whattosow.co.uk/glut-o-meter",
  },
  alternates: { canonical: "/glut-o-meter" },
};

const faqs = [
  {
    q: "What can I do with a glut of courgettes?",
    a: "Pick them small and eat them within a day or two, then grate and freeze the rest in meal-sized bags — no blanching needed. They go straight into winter soups and courgette cake.",
  },
  {
    q: "Can you freeze cucumbers?",
    a: "No — the texture turns to mush once thawed. Eat cucumbers fresh or give them away, and turn to a quick pickle (vinegar, sugar, salt, a few hours in the fridge) if you're properly overrun.",
  },
  {
    q: "How much of a glut counts as 'a lot'?",
    a: "The meter above is deliberately rough rather than exact — a few kilos across a couple of crops is a proper glut for most kitchens, and it's the moment to start freezing and preserving rather than just eating fresh.",
  },
];

export default function GlutOMeterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "The Glut-o-meter",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    description:
      "An interactive tool that weighs a vegetable glut and triages it into what to eat now, freeze, or preserve.",
    url: "https://whattosow.co.uk/glut-o-meter",
    isAccessibleForFree: true,
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
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header backLink={{ href: "/guides/dealing-with-the-glut", label: "← Dealing with the glut" }} />
      <main id="main-content">
        <div className="px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-10 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">The glut-o-meter</span>
          <h1 className="mt-3 mx-auto max-w-xl font-serif text-4xl sm:text-5xl text-earth tracking-tight leading-[1.0]">
            Drowning in courgettes?
          </h1>
          <p className="mt-4 mx-auto max-w-[54ch] font-serif italic text-lg text-earth-light leading-[1.4]">
            Tell it what&rsquo;s piled up on the kitchen table and roughly how much. It&rsquo;ll weigh the haul and
            say plainly what to eat this week, what to freeze, and what needs rescuing before it turns.
          </p>
        </div>

        <div className="px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <GlutOMeter />
        </div>

        <div className="px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <div className="mx-auto max-w-2xl border-t border-earth/8 pt-10">
            <h2 className="font-serif text-2xl text-earth tracking-tight mb-5">Common questions</h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-serif text-lg text-earth mb-1.5">{f.q}</h3>
                  <p className="text-[15px] text-earth-light leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <div className="mx-auto max-w-2xl">
            <Link href="/guides/dealing-with-the-glut" className="flex items-center justify-between py-5 border-b border-earth/8 group">
              <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">The full glut guide — freezing, preserving, giving away</span>
              <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
            </Link>
            <Link href="/guides/succession-sowing" className="flex items-center justify-between py-5 border-b border-earth/8 group">
              <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Succession sowing — a gentler wave next year</span>
              <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
            </Link>
            <Link href="/guides/watering-while-away" className="flex items-center justify-between py-5 border-b border-earth/8 group">
              <span className="font-serif text-lg text-earth group-hover:text-rust transition-colors">Going away when the glut breaks? Keep it all watered</span>
              <span className="text-earth/20 group-hover:text-rust transition-colors text-xl">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

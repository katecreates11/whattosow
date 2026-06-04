import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PinThumb from "@/components/PinThumb";
import { crops } from "@/data/crops";
import { varietiesForCrop } from "@/lib/variety-routes";
import { MONTH_SLUGS, MONTH_NAMES } from "@/lib/calendar";
import { companionTopics } from "@/data/companion-topics";

export const metadata: Metadata = {
  title: "Pin board (internal)",
  robots: { index: false, follow: false },
};

const TAGS = "#gardening #ukgardening #growyourown #allotment #vegetablegarden";

function cropDesc(name: string) {
  return `When to sow ${name.toLowerCase()} in the UK — sowing dates for your postcode, varieties worth growing, and where to find the seeds. ${TAGS}`;
}
function seasonDesc(month: string) {
  return `What to sow in ${month} in the UK — everything worth sowing this month, tuned to your local frost date. ${TAGS}`;
}
function companionDesc(title: string) {
  return `${title} — the UK companion planting pairings that actually work, what to grow alongside and what to keep apart. ${TAGS} #companionplanting`;
}

export default function PinsBoard() {
  const thisMonth = new Date().getMonth();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content" className="px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-allotment">Internal · not indexed</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-earth tracking-tight leading-[0.95] mt-3 mb-3">
            The pin board
          </h1>
          <p className="font-serif italic text-lg text-earth-light max-w-[60ch] mb-8">
            Every pin the site generates, ready to save. Thumbnails preview locally; the Save button pins the real
            page with its image once the site is live. Pin a few fresh ones each week — Pinterest rewards the habit.
          </p>

          {/* Pinterest playbook — keyworded boards are a ranking signal */}
          <details className="mb-12 border border-earth/15 bg-sage/20 p-5 sm:p-6 max-w-[70ch]">
            <summary className="font-mono text-[11px] uppercase tracking-[0.12em] text-allotment cursor-pointer">
              Pinning playbook — read me
            </summary>
            <div className="mt-4 text-sm text-earth-light leading-relaxed space-y-3">
              <p>
                <strong className="text-earth">Set up keyworded boards first.</strong> Board names are a ranking
                signal, so be specific. Create these and give each a one-line keyworded description, then save pins
                into the matching board:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-[12px] text-earth">
                <li>· What to Sow Each Month (UK)</li>
                <li>· Companion Planting</li>
                <li>· Grow Your Own Vegetables UK</li>
                <li>· Allotment Tools &amp; Kit</li>
                <li>· Allotment Tips for Beginners</li>
                <li>· Vegetable Varieties to Grow</li>
              </ul>
              <p>
                <strong className="text-earth">When you pin:</strong> a few <em>fresh</em> pins a week beats a big
                batch (Pinterest rewards new images). Put the keyword at the <em>start</em> of the pin title, save to
                the most relevant board, and lean on <strong className="text-earth">saves</strong> — they&apos;re the
                strongest signal. The descriptions below are already keyword-front-loaded for you.
              </p>
            </div>
          </details>

          {/* This week's routine — make the weekly habit a 10-minute job */}
          <section className="mb-14 border border-amber/40 bg-amber/10 p-5 sm:p-6 max-w-[70ch]">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-allotment">This week&apos;s 10 minutes</span>
            <p className="text-sm text-earth-light leading-relaxed mt-3">
              Fresh pins beat re-pins, and a steady trickle beats a big batch. Aim for{" "}
              <strong className="text-earth">7&ndash;10 fresh pins a week</strong> — a mix keeps the boards lively and
              gives the algorithm something new each time. An easy weekly spread:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-earth">
              <li>· <strong>2 seasonal</strong> — this month&apos;s list + next month&apos;s (pin ahead of the season)</li>
              <li>· <strong>2 crops</strong> — rotate through; pin the editorial <em>and</em> the full-bleed for variety</li>
              <li>· <strong>2 companion</strong> — from the new set below (great savers)</li>
              <li>· <strong>1&ndash;2 guides</strong> — a buying guide or seasonal guide, saved from its own page</li>
            </ul>
            <p className="text-xs text-earth-lighter mt-3 leading-relaxed">
              Put the keyword at the <em>start</em> of the title, save to the matching keyworded board, and space them
              out across a few days rather than all at once. Buying guides &amp; the autumn guide don&apos;t have a
              board pin here yet — open the page and use its own &ldquo;Save to Pinterest&rdquo; button.
            </p>
          </section>

          {/* This month */}
          <section className="mb-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment border-b border-earth/15 pb-3 mb-7">
              This month · {MONTH_NAMES[thisMonth]}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-md">
              <PinThumb
                pinPath={`/pins/seasonal/${MONTH_SLUGS[thisMonth]}`}
                contentPath={`/sow/${MONTH_SLUGS[thisMonth]}`}
                label={`${MONTH_NAMES[thisMonth]} list`}
                description={seasonDesc(MONTH_NAMES[thisMonth])}
              />
            </div>
          </section>

          {/* Sow by month */}
          <section className="mb-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment border-b border-earth/15 pb-3 mb-7">
              Sow by month <span className="text-earth-lighter">· {MONTH_SLUGS.length}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {MONTH_SLUGS.map((slug, i) => (
                <PinThumb
                  key={slug}
                  pinPath={`/pins/seasonal/${slug}`}
                  contentPath={`/sow/${slug}`}
                  label={MONTH_NAMES[i]}
                  description={seasonDesc(MONTH_NAMES[i])}
                />
              ))}
            </div>
          </section>

          {/* Companion planting — pins off the #1 page's new cluster */}
          <section className="mb-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment border-b border-earth/15 pb-3 mb-7">
              Companion planting <span className="text-earth-lighter">· {companionTopics.length}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {companionTopics.map((t) => (
                <PinThumb
                  key={t.slug}
                  pinPath={`/pins/companion/${t.slug}`}
                  contentPath={`/guides/companion-planting/${t.slug}`}
                  label={t.title}
                  description={companionDesc(t.title)}
                />
              ))}
            </div>
          </section>

          {/* Crops */}
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment border-b border-earth/15 pb-3 mb-7">
              Crops <span className="text-earth-lighter">· {crops.length} × 2 styles</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {crops.map((crop) => {
                const vCount = varietiesForCrop(crop.slug).length;
                return (
                  <div key={crop.slug}>
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="font-serif text-xl text-earth">{crop.name}</h3>
                      {vCount > 0 && (
                        <a
                          href={`/pins/c/${crop.slug}`}
                          className="font-mono text-[10px] uppercase tracking-[0.08em] text-allotment border-b border-amber pb-0.5 hover:text-allotment-dark transition-colors"
                        >
                          + {vCount} variety pins &rarr;
                        </a>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <PinThumb
                        pinPath={`/pins/crops/${crop.slug}`}
                        contentPath={`/crops/${crop.slug}`}
                        label="Editorial"
                        description={cropDesc(crop.name)}
                      />
                      <PinThumb
                        pinPath={`/pins/crops/${crop.slug}/full`}
                        contentPath={`/crops/${crop.slug}`}
                        label="Full bleed"
                        description={cropDesc(crop.name)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

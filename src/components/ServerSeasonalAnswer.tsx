import { getServerSeasonalAnswer, type AvoidSowingEntry } from "@/lib/server-seasonal-answer";
import type { CropEntry } from "@/lib/season-core";

const linkClass = "text-rust hover:text-earth underline decoration-rust/30 transition-colors";

function seasonalGuide(monthIndex: number) {
  if (monthIndex >= 2 && monthIndex <= 4) {
    return { href: "/guides/spring-vegetables", label: "spring vegetable guide" };
  }
  if (monthIndex >= 5 && monthIndex <= 7) {
    return { href: "/guides/what-to-sow-in-summer-uk", label: "summer sowing guide" };
  }
  if (monthIndex >= 8 && monthIndex <= 10) {
    return { href: "/guides/autumn-winter-vegetables", label: "autumn and winter veg guide" };
  }
  return { href: "/guides/seed-starting", label: "seed-starting guide" };
}

function cropLinks(entries: CropEntry[], limit = 8) {
  if (entries.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {entries.slice(0, limit).map((entry) => (
        <li key={`${entry.status.method}-${entry.crop.slug}`}>
          <a
            href={`/crops/${entry.crop.slug}`}
            className="inline-flex items-center gap-1.5 border border-earth/10 bg-white/55 px-3 py-1.5 text-sm text-earth hover:border-allotment/30 hover:text-allotment transition-colors"
          >
            {entry.crop.name}
            {entry.status.state === "closing" && (
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-rust">closing</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

function avoidLinks(entries: AvoidSowingEntry[]) {
  if (entries.length === 0) return null;
  return (
    <ul className="mt-4 space-y-2.5">
      {entries.map((entry) => (
        <li key={entry.crop.slug} className="text-sm text-earth-light leading-relaxed">
          <a href={`/crops/${entry.crop.slug}`} className={linkClass}>
            {entry.crop.name}
          </a>
          {": "}
          {entry.reason}
          {entry.nextMonthSlug && entry.nextMonthName ? (
            <>
              {" "}
              <a href={`/sow/${entry.nextMonthSlug}`} className={linkClass}>
                Plan for {entry.nextMonthName.toLowerCase()}
              </a>
              .
            </>
          ) : (
            "."
          )}
        </li>
      ))}
    </ul>
  );
}

function AnswerBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-earth/10 bg-cream/70 p-5 sm:p-6">
      <h3 className="font-serif text-2xl text-earth tracking-tight">{title}</h3>
      {children}
    </section>
  );
}

export default function ServerSeasonalAnswer({
  className = "",
  context = "sow",
}: {
  className?: string;
  context?: "home" | "sow";
}) {
  const answer = getServerSeasonalAnswer();
  const guide = seasonalGuide(answer.monthIndex);
  const sowNames = answer.sowNow.slice(0, 3).map((entry) => entry.crop.name.toLowerCase());
  const sowSentence =
    sowNames.length > 0
      ? `${answer.monthName} is still useful for ${sowNames.join(", ")}${answer.sowNow.length > 3 ? " and a few quick follow-on crops" : ""}.`
      : `${answer.monthName} is a quieter sowing month on the UK average, so focus on planning and caring for crops already growing.`;
  const intro =
    context === "home"
      ? {
          eyebrow: "Before you add your postcode",
          heading: "The UK answer for right now",
          body: `${sowSentence} Use this as your quick national baseline, then add your postcode above if you want the dates tightened to your own frost risk.`,
        }
      : {
          eyebrow: "UK average answer",
          heading: "What can I sow now?",
          body: `${sowSentence} This is the plain UK answer, based on an average last frost around mid-April. Add your postcode afterwards to tune the dates to your own patch.`,
        };

  return (
    <section className={className} aria-labelledby="server-seasonal-answer-heading">
      <div className="mb-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment mb-2">
          {intro.eyebrow}
        </div>
        <h2
          id="server-seasonal-answer-heading"
          className="font-serif text-3xl sm:text-4xl text-earth tracking-tight leading-none"
        >
          {intro.heading}
        </h2>
        <p className="mt-3 text-earth-light leading-relaxed max-w-[68ch]">
          {intro.body}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnswerBlock title="What to sow now">
          <p className="mt-2 text-sm text-earth-light leading-relaxed">
            Start with crops that still have enough season left to grow, crop, and earn their space.
          </p>
          {cropLinks(answer.sowNow, 10) ?? (
            <p className="mt-4 text-sm text-earth-light">No urgent seed sowing on the UK average this week.</p>
          )}
          <p className="mt-4 text-sm text-earth-light">
            See the full{" "}
            <a href={`/sow/${answer.monthSlug}`} className={linkClass}>
              what to sow in {answer.monthName}
            </a>{" "}
            page.
          </p>
        </AnswerBlock>

        <AnswerBlock title="What to start indoors">
          <p className="mt-2 text-sm text-earth-light leading-relaxed">
            Use modules or pots for crops that benefit from a protected start before they meet slugs, heat, or rough weather.
          </p>
          {cropLinks(answer.startIndoors) ?? (
            <p className="mt-4 text-sm text-earth-light">
              Nothing really needs starting indoors on the UK average right now.
            </p>
          )}
        </AnswerBlock>

        <AnswerBlock title="What to sow outdoors">
          <p className="mt-2 text-sm text-earth-light leading-relaxed">
            Direct sow where the soil is warm enough and the crop is quick enough to finish before cold weather returns.
          </p>
          {cropLinks(answer.sowOutdoors) ?? (
            <p className="mt-4 text-sm text-earth-light">
              Outdoor sowing is quiet just now; use the time for watering, feeding, and clearing space.
            </p>
          )}
        </AnswerBlock>

        <AnswerBlock title="What to plant out now">
          <p className="mt-2 text-sm text-earth-light leading-relaxed">
            If you have sturdy young plants ready, plant them out on a damp evening and water them in well.
          </p>
          {cropLinks(answer.plantOutNow) ?? (
            <p className="mt-4 text-sm text-earth-light">
              No major plant-out jobs on the UK average this week.
            </p>
          )}
        </AnswerBlock>

        <AnswerBlock title="What to avoid sowing now">
          <p className="mt-2 text-sm text-earth-light leading-relaxed">
            Some crops need a longer run-up than the season now gives them. Buy young plants, harvest what is already growing,
            or plan them for the next window.
          </p>
          {avoidLinks(answer.avoidSowingNow)}
        </AnswerBlock>

        <AnswerBlock title="What to read next">
          <p className="mt-2 text-sm text-earth-light leading-relaxed">
            For the month-by-month view, use the{" "}
            <a href="/calendar" className={linkClass}>
              UK sowing calendar
            </a>
            . For the wider seasonal jobs, read the{" "}
            <a href={guide.href} className={linkClass}>
              {guide.label}
            </a>
            .
          </p>
        </AnswerBlock>
      </div>
    </section>
  );
}

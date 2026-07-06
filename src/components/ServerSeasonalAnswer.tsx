import Image from "next/image";
import AffiliateLink, { merchantSlug } from "@/components/AffiliateLink";
import { weeklyListForMonth } from "@/data/weekly-list";
import { cropImage } from "@/lib/crop-image";
import { getServerSeasonalAnswer, type AvoidSowingEntry } from "@/lib/server-seasonal-answer";
import type { Crop } from "@/data/crops";
import type { CropEntry } from "@/lib/season-core";

const cropLinkClass =
  "font-serif text-xl sm:text-2xl leading-tight text-earth underline decoration-amber/45 underline-offset-4 hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment";

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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pickLineWithoutPrefix(name: string, line: string): string {
  const withoutIntro = line.replace(/^If you (sow|plant) one thing (this week|this month):\s*/i, "");
  return withoutIntro.replace(new RegExp(`^${escapeRegExp(name)}\\s+[—-]\\s*`, "i"), "");
}

function methodTag(methods: Set<string>): "DIRECT" | "MODULES" | "EITHER" {
  const direct = methods.has("direct sow");
  const modules = methods.has("sow indoors");
  if (direct && modules) return "EITHER";
  if (modules) return "MODULES";
  return "DIRECT";
}

interface SowingRow {
  crop: Crop;
  methods: Set<string>;
  daysLeft: number | null;
  closing: boolean;
  note?: string;
  isPick: boolean;
}

function buildSowingRows(entries: CropEntry[], notes: Record<string, string> | undefined, pickSlug: string): SowingRow[] {
  const byCrop = new Map<string, SowingRow>();

  for (const entry of entries) {
    const row = byCrop.get(entry.crop.slug) ?? {
      crop: entry.crop,
      methods: new Set<string>(),
      daysLeft: null,
      closing: false,
      note: notes?.[entry.crop.slug],
      isPick: entry.crop.slug === pickSlug,
    };
    if (entry.status.method) row.methods.add(entry.status.method);
    if (entry.status.daysLeft != null) {
      row.daysLeft = row.daysLeft == null ? entry.status.daysLeft : Math.min(row.daysLeft, entry.status.daysLeft);
    }
    row.closing = row.closing || entry.status.state === "closing";
    byCrop.set(entry.crop.slug, row);
  }

  return Array.from(byCrop.values()).sort((a, b) => {
    if (a.isPick !== b.isPick) return a.isPick ? -1 : 1;
    if (a.closing !== b.closing) return a.closing ? -1 : 1;
    if ((a.daysLeft ?? 9999) !== (b.daysLeft ?? 9999)) return (a.daysLeft ?? 9999) - (b.daysLeft ?? 9999);
    return a.crop.name.localeCompare(b.crop.name);
  });
}

function SeedLink({ crop }: { crop: Crop }) {
  const seed = crop.seedSuppliers?.[0];
  if (!seed) return <span className="hidden sm:block" aria-hidden="true" />;

  return (
    <AffiliateLink
      href={seed.url}
      product={crop.name}
      type="seed"
      merchant={merchantSlug(seed.name)}
      className="inline-flex min-h-[44px] items-center justify-end font-mono text-[10px] uppercase tracking-[0.12em] text-allotment underline decoration-amber/60 underline-offset-4 hover:text-allotment-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment"
    >
      Seeds &rarr;
    </AffiliateLink>
  );
}

function LeadThumb({ crop }: { crop: Crop }) {
  const img = cropImage(crop);
  if (!img) return null;

  return (
    <a
      href={`/crops/${crop.slug}`}
      className="relative hidden h-16 w-16 shrink-0 overflow-hidden sm:block focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment"
      aria-label={`${crop.name} growing guide`}
    >
      <Image
        src={img.src}
        alt=""
        fill
        sizes="64px"
        className="object-cover img-grade"
      />
    </a>
  );
}

function SowingRowItem({ row, lead }: { row: SowingRow; lead: boolean }) {
  return (
    <li className="border-t border-earth/10 py-3 sm:py-4">
      <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        {lead && <LeadThumb crop={row.crop} />}
        <div className={lead ? "" : "sm:col-start-2"}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <a href={`/crops/${row.crop.slug}`} className={cropLinkClass}>
              {row.crop.name}
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth-light">
              {methodTag(row.methods)}
            </span>
            {row.closing && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-rust">
                closing{row.daysLeft != null ? ` · ${row.daysLeft}d` : ""}
              </span>
            )}
          </div>
          {row.note && (
            <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-earth-light">
              {row.note}
            </p>
          )}
        </div>
        <SeedLink crop={row.crop} />
      </div>
    </li>
  );
}

function PlantOutRows({ entries }: { entries: CropEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-earth-light">
        Nothing urgent to plant out on the UK average this week; keep young plants watered and ready.
      </p>
    );
  }

  return (
    <ul className="mt-3">
      {entries.slice(0, 8).map((entry) => (
        <li key={entry.crop.slug} className="border-t border-earth/10 py-3">
          <div className="flex min-h-[44px] items-center justify-between gap-4">
            <a href={`/crops/${entry.crop.slug}`} className="font-serif text-lg text-earth underline decoration-amber/35 underline-offset-4 hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment">
              {entry.crop.name}
            </a>
            <span className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-earth-light">
              {entry.status.state === "closing" ? "closing" : "plant out"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function joinLinkedCrops(entries: AvoidSowingEntry[]) {
  return entries.map((entry, index) => (
    <span key={entry.crop.slug}>
      {index > 0 ? (index === entries.length - 1 ? " and " : ", ") : ""}
      <a href={`/crops/${entry.crop.slug}`} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
        {entry.crop.name.toLowerCase()}
      </a>
    </span>
  ));
}

function joinLinkedNextWindows(entries: AvoidSowingEntry[]) {
  return entries
    .filter((entry) => entry.nextMonthSlug && entry.nextMonthName)
    .map((entry, index) => (
      <span key={`${entry.crop.slug}-next-window`}>
        {index > 0 ? (index === entries.length - 1 ? " and " : ", ") : ""}
        <a href={`/crops/${entry.crop.slug}`} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
          {entry.crop.name.toLowerCase()}
        </a>{" "}
        in{" "}
        <a href={`/sow/${entry.nextMonthSlug}`} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
          {entry.nextMonthName?.toLowerCase()}
        </a>
      </span>
    ));
}

function WorthWaitingOn({ entries }: { entries: AvoidSowingEntry[] }) {
  const tooLateFromSeed = entries.filter((entry) => entry.reasonKind === "too-late-from-seed");
  const waiting = entries.filter((entry) => entry.reasonKind === "wait-for-window");
  const nextSeedWindows = joinLinkedNextWindows(tooLateFromSeed);

  if (entries.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-earth-light">
        Worth waiting on: nothing much this week. The seed box is still open.
      </p>
    );
  }

  return (
    <div className="space-y-2 text-sm leading-relaxed text-earth-light">
      {tooLateFromSeed.length > 0 && (
        <p>
          <span className="font-medium text-earth">Worth waiting on:</span>{" "}
          {joinLinkedCrops(tooLateFromSeed)} from seed. They need more season than this week can reliably give; sturdy young plants can still make sense where your season is warm enough, and plants already in the ground are worth feeding and watering on.
        </p>
      )}
      {nextSeedWindows.length > 0 && (
        <p>
          Next seed windows: {nextSeedWindows}.
        </p>
      )}
      {waiting.length > 0 && (
        <p>
          Next windows:{" "}
          {waiting.map((entry, index) => (
            <span key={entry.crop.slug}>
              {index > 0 ? (index === waiting.length - 1 ? " and " : ", ") : ""}
              <a href={`/crops/${entry.crop.slug}`} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
                {entry.crop.name.toLowerCase()}
              </a>
              {entry.nextMonthSlug && entry.nextMonthName ? (
                <>
                  {" "}
                  in{" "}
                  <a href={`/sow/${entry.nextMonthSlug}`} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
                    {entry.nextMonthName.toLowerCase()}
                  </a>
                </>
              ) : null}
            </span>
          ))}
          .
        </p>
      )}
    </div>
  );
}

export default function ServerSeasonalAnswer({ className = "" }: { className?: string }) {
  const answer = getServerSeasonalAnswer();
  const weekly = weeklyListForMonth(answer.monthIndex);
  const guide = seasonalGuide(answer.monthIndex);
  const sowRows = buildSowingRows([...answer.sowOutdoors, ...answer.startIndoors], weekly.notes, weekly.pick.slug);
  const weekOf = answer.now.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const pickLine = pickLineWithoutPrefix(weekly.pick.name, weekly.pick.line);

  return (
    <section className={className} aria-labelledby="sow-list-heading">
      <div className="mb-8 border-y border-earth/10 py-6 sm:py-8">
        <p className="max-w-[62ch] font-serif text-xl sm:text-2xl leading-snug text-earth-light">
          {weekly.standfirst}
        </p>
        <div className="mt-6 max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust">
            If you sow one thing this week
          </div>
          <p className="mt-2 font-serif text-2xl sm:text-3xl leading-tight text-earth">
            <a href={`/crops/${weekly.pick.slug}`} className="underline decoration-amber/45 underline-offset-4 hover:text-allotment focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-allotment">
              {weekly.pick.name}
            </a>
            {" - "}
            {pickLine}
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
        <div>
          <h2 id="sow-list-heading" className="font-mono text-[11px] uppercase tracking-[0.16em] text-allotment">
            The sowing list · week of {weekOf}
          </h2>
          {sowRows.length > 0 ? (
            <ul className="mt-3">
              {sowRows.map((row, index) => (
                <SowingRowItem
                  key={row.crop.slug}
                  row={row}
                  lead={index < 3 && (row.isPick || row.closing || index < 2)}
                />
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-[48ch] font-serif text-xl leading-snug text-earth-light">
              A quiet week for seed sowing on the UK average; use it to water, clear a little space, and plan the next good window.
            </p>
          )}
        </div>

        <aside className="lg:border-l lg:border-earth/10 lg:pl-8">
          <section aria-labelledby="plant-out-heading">
            <h2 id="plant-out-heading" className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
              And plant out
            </h2>
            <PlantOutRows entries={answer.plantOutNow} />
          </section>

          <section className="mt-8 border-t border-earth/10 pt-6" aria-labelledby="waiting-heading">
            <h2 id="waiting-heading" className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
              Worth waiting on
            </h2>
            <div className="mt-3">
              <WorthWaitingOn entries={answer.avoidSowingNow} />
            </div>
          </section>

          <section className="mt-8 border-t border-earth/10 pt-6" aria-labelledby="deeper-heading">
            <h2 id="deeper-heading" className="font-mono text-[11px] uppercase tracking-[0.16em] text-earth-light">
              Go deeper
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-earth-light">
              The full{" "}
              <a href={`/sow/${answer.monthSlug}`} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
                {answer.monthName} sowing page
              </a>{" "}
              covers the whole month. The{" "}
              <a href="/calendar" className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
                calendar
              </a>{" "}
              gives the year at a glance, and the{" "}
              <a href={guide.href} className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
                {guide.label}
              </a>{" "}
              has the slower jobs around the edges. Seeds and kit are gathered below in the{" "}
              <a href="#kit" className="text-rust underline decoration-rust/30 underline-offset-4 hover:text-earth">
                monthly kit edit
              </a>
              .
            </p>
          </section>
        </aside>
      </div>
    </section>
  );
}

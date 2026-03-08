/**
 * Visual components for guide pages.
 * Editorial, asymmetric, grid-breaking — Ghibli-warm color palette.
 */

// ─── Colored section block — Ghibli-inspired warm backgrounds ───────────────
export function ColorSection({
  children,
  color = "sage",
  className = "",
}: {
  children: React.ReactNode;
  color?: "blush" | "sage" | "sky" | "ochre" | "lavender" | "earth" | "allotment" | "moss";
  className?: string;
}) {
  const bgMap = {
    blush: "bg-blush text-earth",
    sage: "mesh-sage text-earth",
    sky: "bg-sky text-earth",
    ochre: "mesh-ochre text-earth",
    lavender: "bg-lavender text-earth",
    earth: "mesh-sunset text-white",
    allotment: "mesh-deep text-white",
    moss: "mesh-deep text-white",
  };

  return (
    <div className={`${bgMap[color]} -mx-6 sm:-mx-10 lg:-mx-16 px-6 sm:px-10 lg:px-16 py-10 sm:py-14 my-12 ${className}`}>
      <div className="max-w-2xl">{children}</div>
    </div>
  );
}

// ─── Hero banner — offset type, dramatic scale ──────────────────────────────
export function GuideHero({
  eyebrow,
  title,
  subtitle,
  icon,
  color = "allotment",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  color?: "allotment" | "amber" | "frost" | "tomato";
}) {
  const bgMap = {
    allotment: "mesh-garden",
    amber: "mesh-sunset",
    frost: "mesh-morning",
    tomato: "mesh-sunset",
  };
  const accentMap = {
    allotment: "text-leaf-light",
    amber: "text-amber",
    frost: "text-frost-light",
    tomato: "text-rust-light",
  };
  const lineMap = {
    allotment: "bg-leaf",
    amber: "bg-amber",
    frost: "bg-frost",
    tomato: "bg-rust",
  };

  return (
    <div className={`${bgMap[color]} px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 sm:pb-16 mb-14 relative overflow-hidden`}>
      {/* Oversized number watermark */}
      <div
        className="absolute -right-4 sm:right-6 -top-8 text-[12rem] sm:text-[16rem] font-serif leading-none text-white/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        &lowast;
      </div>

      <div className="relative max-w-lg">
        {/* Accent line */}
        <div className={`${lineMap[color]} w-12 h-1 mb-6`} />

        <span className={`text-[10px] font-semibold tracking-[0.3em] uppercase ${accentMap[color]} opacity-70 mb-4 block`}>
          {eyebrow}
        </span>

        {icon && (
          <div className={`${accentMap[color]} mb-4 opacity-60`}>
            {icon}
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif text-white tracking-tight leading-[0.95] mb-6">
          {title}
        </h1>

        <p className="text-white/55 leading-relaxed max-w-md text-base sm:text-[17px] font-serif italic">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ─── Pull quote — offset left, dramatic serif ───────────────────────────────
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="relative my-14 sm:my-20 max-w-2xl">
      <div className="flex">
        {/* Thick left bar */}
        <div className="w-1 sm:w-1.5 bg-rust shrink-0" />
        <div className="pl-6 sm:pl-8 py-4 sm:py-6">
          <p className="font-serif italic text-2xl sm:text-3xl lg:text-[2rem] text-earth leading-[1.3] max-w-[26rem]">
            {children}
          </p>
        </div>
      </div>
    </aside>
  );
}

// ─── Section divider — asymmetric, not centered ─────────────────────────────
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="my-14 sm:my-20 max-w-2xl" role="separator">
      {label && (
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-rust block mb-3">
          {label}
        </span>
      )}
      <div className="h-px bg-earth/10 w-24" />
    </div>
  );
}

// ─── Tip callout — warm sage background ──────────────────────────────────────
export function TipBox({ children, title = "Top tip" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-10 -mx-6 sm:-mx-10 lg:-mx-16 bg-sage px-6 sm:px-10 lg:px-16 py-6 sm:py-8">
      <div className="max-w-2xl">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-allotment block mb-2">{title}</span>
        <div className="text-[15px] text-earth leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ─── Warning callout — warm blush background ────────────────────────────────
export function WarningBox({ children, title = "Watch out" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-10 -mx-6 sm:-mx-10 lg:-mx-16 bg-blush px-6 sm:px-10 lg:px-16 py-6 sm:py-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-rust/10 rounded-bl-full" aria-hidden="true" />
      <div className="max-w-2xl">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-rust block mb-2 relative">{title}</span>
        <div className="text-[15px] text-earth leading-relaxed relative">{children}</div>
      </div>
    </div>
  );
}

// ─── Full-bleed dark section ────────────────────────────────────────────────
export function FullBleedSection({
  children,
  color = "earth",
}: {
  children: React.ReactNode;
  color?: "earth" | "allotment";
}) {
  return (
    <div className={`${color === "allotment" ? "mesh-deep" : "mesh-sunset"} -mx-6 sm:-mx-10 lg:-mx-16 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 my-14`}>
      <div className="max-w-2xl">{children}</div>
    </div>
  );
}

// ─── Editorial photo break — full-bleed, asymmetric caption ─────────────────
export function GuideImage({
  src,
  alt,
  caption,
  credit,
  aspect = "cinematic",
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspect?: "cinematic" | "landscape" | "square";
}) {
  const aspectMap = {
    cinematic: "aspect-[2.4/1]",
    landscape: "aspect-[3/2]",
    square: "aspect-square",
  };

  return (
    <figure className="-mx-6 sm:-mx-10 lg:-mx-16 my-12 sm:my-16">
      <div className={`${aspectMap[aspect]} overflow-hidden bg-earth/5`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="px-6 sm:px-10 lg:px-16 mt-3">
          <div className="max-w-2xl">
            {caption && <span className="text-xs text-earth-light font-serif italic">{caption}</span>}
            {credit && <span className="text-[10px] text-earth-lighter block mt-0.5">{credit}</span>}
          </div>
        </figcaption>
      )}
    </figure>
  );
}

// ─── "In this guide" — warm sky background ──────────────────────────────────
export function InThisGuide({ items }: { items: { label: string; anchor: string }[] }) {
  return (
    <nav className="bg-sky px-6 sm:px-10 lg:px-16 py-6 sm:py-8 my-10" aria-label="In this guide">
      <div className="max-w-2xl">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-frost block mb-4">
          In this guide
        </span>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={`#${item.anchor}`}
                className="text-sm text-earth hover:text-rust transition-colors py-1 inline-block"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ─── Pest/topic card — editorial, not SaaS ──────────────────────────────────
export function TopicCard({
  children,
  title,
  image,
  imageAlt,
  level,
}: {
  children: React.ReactNode;
  title: string;
  image?: string;
  imageAlt?: string;
  level?: "low" | "medium" | "high";
}) {
  const levelColors = {
    low: "bg-allotment text-white",
    medium: "bg-amber text-white",
    high: "bg-rust text-white",
  };
  const levelLabels = { low: "Manageable", medium: "Common", high: "Major threat" };

  return (
    <div className="border-t border-earth/10 pt-6 pb-8">
      {image && (
        <div className="aspect-[2.5/1] overflow-hidden bg-earth/5 mb-5 -mx-4 sm:mx-0">
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-serif text-earth">{title}</h3>
        {level && (
          <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 ${levelColors[level]} shrink-0`}>
            {levelLabels[level]}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Numbered steps — tighter, more editorial ───────────────────────────────
export function StepList({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <div className="my-10">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-5 border-t border-earth/8 py-5 first:border-t-0 first:pt-0">
          <span className="text-3xl font-serif text-rust/40 leading-none shrink-0 w-8 tabular-nums pt-0.5">
            {i + 1}
          </span>
          <div>
            <span className="font-semibold text-earth block text-[15px]">{step.title}</span>
            <p className="text-sm text-earth-light mt-1.5 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Process diagram — horizontal flow ──────────────────────────────────────
export function ProcessDiagram({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <div className="my-10 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
      <div className="flex items-stretch gap-0 min-w-max py-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch">
            <div className="text-center w-32 sm:w-36 flex flex-col items-center">
              <span className="text-2xl font-serif text-rust/50 mb-2">{i + 1}</span>
              <div className="border border-earth/10 px-3 py-3 w-full">
                <span className="text-xs font-bold text-earth block">{step.label}</span>
                <span className="text-[10px] text-earth-lighter block mt-1 leading-snug">{step.detail}</span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center px-2 pt-6">
                <div className="w-6 h-px bg-earth/20" />
                <svg className="w-2 h-3 text-earth/20 -ml-px" viewBox="0 0 8 12" fill="currentColor" aria-hidden="true">
                  <path d="M2 0l6 6-6 6V0z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual comparison grid ─────────────────────────────────────────────────
export function ComparisonCard({
  title,
  items,
  color = "allotment",
}: {
  title: string;
  items: { label: string; value: string }[];
  color?: string;
}) {
  return (
    <div className="border-t-2 border-earth/15 pt-5 pb-2">
      <span className="text-sm font-bold text-earth block mb-4">{title}</span>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm border-b border-earth/5 pb-2.5 last:border-0">
            <span className="text-earth-light">{item.label}</span>
            <span className="font-semibold text-earth tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual stat block ──────────────────────────────────────────────────────
export function StatBlock({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-3 text-allotment/40">{icon}</div>
      <div className="text-3xl font-serif text-earth">{value}</div>
      <div className="text-[10px] text-earth-lighter mt-2 tracking-[0.15em] uppercase">{label}</div>
    </div>
  );
}

// ─── Severity/Rating indicator ──────────────────────────────────────────────
export function SeverityBadge({ level }: { level: "low" | "medium" | "high" }) {
  const styles = {
    low: "text-allotment",
    medium: "text-amber",
    high: "text-rust",
  };
  const labels = { low: "Low risk", medium: "Medium risk", high: "High risk" };

  return (
    <span className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase ${styles[level]}`}>
      <span className="w-2 h-2 rounded-full bg-current" />
      {labels[level]}
    </span>
  );
}

// ─── Big number stat — oversized, dramatic ──────────────────────────────────
export function BigNumber({ number, label, suffix }: { number: string; label: string; suffix?: string }) {
  return (
    <div className="py-4">
      <div className="text-6xl sm:text-8xl font-serif text-earth leading-none tracking-tight">
        {number}
        {suffix && <span className="text-2xl sm:text-3xl text-earth/30 ml-1">{suffix}</span>}
      </div>
      <div className="text-[10px] text-rust mt-3 tracking-[0.2em] uppercase font-bold">{label}</div>
    </div>
  );
}

// ─── Icon set for guides ────────────────────────────────────────────────────
export function WateringCanIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 16v-4a4 4 0 014-4h6a4 4 0 014 4v4" />
      <path d="M3 16h18v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" />
      <path d="M15 8l3-3" />
      <path d="M17 3l2 2" />
    </svg>
  );
}

export function BugIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="6" width="8" height="14" rx="4" />
      <path d="M8 10H4" />
      <path d="M16 10h4" />
      <path d="M8 16H5" />
      <path d="M16 16h3" />
      <path d="M9 6V4" />
      <path d="M15 6V4" />
      <line x1="12" y1="10" x2="12" y2="20" />
    </svg>
  );
}

export function SoilIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 22h20" />
      <path d="M4 22v-4c0-1 1-2 2-2h12c1 0 2 1 2 2v4" />
      <path d="M6 16c1-3 2-5 6-5s5 2 6 5" />
      <path d="M12 11V7" />
      <path d="M9 9c0-2 1-3 3-3s3 1 3 3" />
    </svg>
  );
}

export function SeedIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c-4-4-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 8-8 12z" />
      <path d="M12 10v6" />
      <path d="M9 13l3-3 3 3" />
    </svg>
  );
}

export function RotationIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 11-6.219-8.56" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

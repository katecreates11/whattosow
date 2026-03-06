/**
 * Visual components for guide pages.
 * Editorial-style callouts, diagrams, and decorative elements.
 */

// ─── Hero banner for guide pages ────────────────────────────────────────────
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
    allotment: "bg-allotment-bg/40",
    amber: "bg-amber-bg/40",
    frost: "bg-frost-bg/40",
    tomato: "bg-tomato-bg/40",
  };
  const accentMap = {
    allotment: "text-allotment",
    amber: "text-amber",
    frost: "text-frost",
    tomato: "text-tomato",
  };

  return (
    <div className={`${bgMap[color]} -mx-4 sm:-mx-6 px-4 sm:px-6 py-10 sm:py-14 mb-10 relative overflow-hidden`}>
      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="guide-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#guide-dots)" />
        </svg>
      </div>
      <div className="relative">
        {icon && (
          <div className={`${accentMap[color]} opacity-60 mb-4`}>
            {icon}
          </div>
        )}
        <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${accentMap[color]} opacity-70 mb-3 block`}>
          {eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-earth tracking-tight leading-[0.95] mb-4">
          {title}
        </h1>
        <p className="text-earth-light leading-relaxed max-w-lg text-base sm:text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ─── Pull quote — breaks text density ───────────────────────────────────────
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="relative py-8 sm:py-10 my-8 border-y border-earth/8">
      <div className="absolute -top-4 left-0 text-6xl text-allotment/10 font-serif leading-none select-none" aria-hidden="true">
        &ldquo;
      </div>
      <p className="font-serif text-xl sm:text-2xl text-earth leading-[1.3] pl-2 max-w-[28rem]">
        {children}
      </p>
    </aside>
  );
}

// ─── Section divider with optional label ────────────────────────────────────
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 my-10 sm:my-14">
      <div className="flex-1 h-px bg-earth/8" />
      {label && (
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-earth-lighter shrink-0">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-earth/8" />
      <svg className="w-4 h-4 text-allotment/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8zM14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    </div>
  );
}

// ─── Tip callout — prominent card with icon ─────────────────────────────────
export function TipBox({ children, title = "Top tip" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="relative bg-allotment-bg/40 p-5 sm:p-6 my-8 overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-allotment/8" />
      </div>
      <div className="relative flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-allotment/15 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-allotment" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          </svg>
        </div>
        <div className="min-w-0">
          <span className="text-sm font-semibold text-allotment-dark block mb-1.5">{title}</span>
          <div className="text-sm text-earth-light leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Warning callout — amber accent ─────────────────────────────────────────
export function WarningBox({ children, title = "Watch out" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="relative bg-amber-bg/40 border-l-4 border-amber p-5 sm:p-6 my-8">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-amber/15 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="min-w-0">
          <span className="text-sm font-semibold text-earth block mb-1.5">{title}</span>
          <div className="text-sm text-earth-light leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Numbered step indicator — vertical timeline ────────────────────────────
export function StepList({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <div className="my-8 pl-1">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-5 group">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-allotment text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm shadow-allotment/20 group-last:ring-2 group-last:ring-allotment/20">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-allotment/30 to-allotment/5 my-1" />
            )}
          </div>
          <div className="pb-8 pt-1.5">
            <span className="font-semibold text-earth block text-base">{step.title}</span>
            <p className="text-sm text-earth-light mt-1.5 leading-relaxed max-w-md">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Process diagram — horizontal flow with visual weight ───────────────────
export function ProcessDiagram({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <div className="my-8 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
      <div className="flex items-stretch gap-0 min-w-max py-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch">
            <div className="text-center w-32 sm:w-36 flex flex-col items-center">
              {/* Circle with number */}
              <div className="w-14 h-14 rounded-full bg-allotment text-white flex items-center justify-center text-lg font-bold shadow-md shadow-allotment/20 mb-3">
                {i + 1}
              </div>
              {/* Label card */}
              <div className="bg-white/60 border border-earth/8 px-3 py-2.5 w-full">
                <span className="text-xs font-bold text-earth block tracking-wide">{step.label}</span>
                <span className="text-[10px] text-earth-lighter block mt-1 leading-snug">{step.detail}</span>
              </div>
            </div>
            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <div className="flex items-start pt-5 px-2">
                <svg className="w-8 h-5 text-allotment/40" viewBox="0 0 32 20" fill="none" aria-hidden="true">
                  <path d="M2 10h24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
                  <path d="M22 5l6 5-6 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
  const borderColor = color === "allotment" ? "border-allotment/20" : color === "amber" ? "border-amber/20" : "border-earth/10";
  const bgColor = color === "allotment" ? "bg-allotment-bg/20" : color === "amber" ? "bg-amber-bg/20" : "bg-white/40";
  const dotColor = color === "allotment" ? "bg-allotment" : color === "amber" ? "bg-amber" : "bg-earth/40";

  return (
    <div className={`border ${borderColor} ${bgColor} p-5`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
        <span className="text-sm font-bold text-earth">{title}</span>
      </div>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm border-b border-earth/4 pb-2 last:border-0 last:pb-0">
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
    <div className="text-center p-5 border border-earth/6 bg-white/30">
      <div className="flex justify-center mb-3 text-allotment/50">{icon}</div>
      <div className="text-3xl font-serif text-earth">{value}</div>
      <div className="text-[11px] text-earth-lighter mt-1.5 tracking-wide">{label}</div>
    </div>
  );
}

// ─── Severity/Rating indicator ──────────────────────────────────────────────
export function SeverityBadge({ level }: { level: "low" | "medium" | "high" }) {
  const styles = {
    low: "bg-leaf-bg text-allotment border-allotment/20",
    medium: "bg-amber-bg text-amber border-amber/20",
    high: "bg-tomato-bg text-tomato border-tomato/20",
  };
  const labels = { low: "Low risk", medium: "Medium risk", high: "High risk" };

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border ${styles[level]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[level]}
    </span>
  );
}

// ─── Numbered fact/stat — big number with label ─────────────────────────────
export function BigNumber({ number, label, suffix }: { number: string; label: string; suffix?: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-5xl sm:text-6xl font-serif text-allotment/80 leading-none">
        {number}
        {suffix && <span className="text-2xl text-allotment/50">{suffix}</span>}
      </div>
      <div className="text-xs text-earth-lighter mt-2 tracking-wide uppercase font-semibold">{label}</div>
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

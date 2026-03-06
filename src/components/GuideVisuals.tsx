/**
 * Reusable visual components for guide pages.
 * Adds visual impact with icons, callouts, step indicators, and visual cards.
 */

// ─── Tip callout with leaf icon ─────────────────────────────────────────────
export function TipBox({ children, title = "Top tip" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="bg-allotment-bg/30 border-l-4 border-allotment/40 p-4 sm:p-5 my-6">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-allotment/70 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
        <div>
          <span className="text-sm font-semibold text-allotment-dark block mb-1">{title}</span>
          <div className="text-sm text-earth-light leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Warning callout ────────────────────────────────────────────────────────
export function WarningBox({ children, title = "Watch out" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="bg-amber-bg/30 border-l-4 border-amber/40 p-4 sm:p-5 my-6">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-amber mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <span className="text-sm font-semibold text-amber-dark block mb-1">{title}</span>
          <div className="text-sm text-earth-light leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Numbered step indicator ────────────────────────────────────────────────
export function StepList({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <div className="space-y-0 my-6">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-allotment text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-allotment/20 my-1" />
            )}
          </div>
          <div className="pb-6">
            <span className="font-semibold text-earth block">{step.title}</span>
            <p className="text-sm text-earth-light mt-1 leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
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

  return (
    <div className={`border ${borderColor} ${bgColor} p-4`}>
      <span className="text-sm font-semibold text-earth block mb-3">{title}</span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-earth-light">{item.label}</span>
            <span className="font-medium text-earth">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual stat block ──────────────────────────────────────────────────────
export function StatBlock({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center p-4 border border-earth/6">
      <div className="flex justify-center mb-2 text-allotment/60">{icon}</div>
      <div className="text-2xl font-light text-earth">{value}</div>
      <div className="text-xs text-earth-lighter mt-1">{label}</div>
    </div>
  );
}

// ─── Process diagram (horizontal steps) ─────────────────────────────────────
export function ProcessDiagram({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start">
            <div className="text-center w-28 sm:w-32">
              <div className="w-10 h-10 rounded-full bg-allotment/10 border-2 border-allotment/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-sm font-semibold text-allotment">{i + 1}</span>
              </div>
              <span className="text-xs font-semibold text-earth block">{step.label}</span>
              <span className="text-[10px] text-earth-lighter block mt-1 leading-tight">{step.detail}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center h-10 px-1">
                <svg className="w-6 h-4 text-earth/20" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M2 8h16M14 3l5 5-5 5" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Severity/Rating indicator ──────────────────────────────────────────────
export function SeverityBadge({ level }: { level: "low" | "medium" | "high" }) {
  const styles = {
    low: "bg-leaf-bg text-leaf-dark",
    medium: "bg-amber-bg text-amber-dark",
    high: "bg-tomato-bg text-tomato",
  };
  const labels = { low: "Low risk", medium: "Medium risk", high: "High risk" };

  return (
    <span className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 ${styles[level]}`}>
      {labels[level]}
    </span>
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

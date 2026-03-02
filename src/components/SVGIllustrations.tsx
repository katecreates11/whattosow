// Bold multi-color line-art SVG illustrations in the McRae style
// All SVGs: fill="none", strokeLinecap="round", strokeLinejoin="round", strokeWidth={2.5}

const shared = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2.5,
};

// ─── Hero cluster: composite vegetable illustration ─────────────────────────

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      {/* Tomato */}
      <g transform="translate(160, 80)">
        <path d="M0,-8 C-3,-14 -2,-20 2,-22" stroke="#3D7A52" {...shared} />
        <path d="M0,-8 C3,-14 6,-18 4,-22" stroke="#3D7A52" {...shared} />
        <ellipse cx="0" cy="8" rx="28" ry="26" stroke="#C9543E" {...shared} />
        <path d="M-12,-6 Q0,-12 12,-6" stroke="#C9543E" {...shared} strokeWidth={1.5} />
      </g>

      {/* Carrot */}
      <g transform="translate(80, 160)">
        <path d="M0,-30 L-6,30 L6,30 Z" stroke="#D4943A" {...shared} />
        <path d="M-3,0 L3,0" stroke="#D4943A" {...shared} strokeWidth={1.5} />
        <path d="M-2,10 L2,10" stroke="#D4943A" {...shared} strokeWidth={1.5} />
        <path d="M-1,20 L1,20" stroke="#D4943A" {...shared} strokeWidth={1.5} />
        {/* Carrot top leaves */}
        <path d="M0,-30 C-8,-42 -14,-38 -10,-30" stroke="#7BB369" {...shared} />
        <path d="M0,-30 C0,-44 -4,-46 -2,-36" stroke="#3D7A52" {...shared} />
        <path d="M0,-30 C8,-42 14,-38 10,-30" stroke="#7BB369" {...shared} />
      </g>

      {/* Pea pod */}
      <g transform="translate(240, 160)">
        <path d="M-20,0 Q0,-20 20,0 Q0,20 -20,0" stroke="#7BB369" {...shared} />
        <circle cx="-8" cy="0" r="4" stroke="#3D7A52" {...shared} />
        <circle cx="2" cy="0" r="4" stroke="#3D7A52" {...shared} />
        <circle cx="12" cy="0" r="4" stroke="#3D7A52" {...shared} />
        {/* Tendril */}
        <path d="M18,-4 C24,-10 28,-6 24,0" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      </g>

      {/* Sun */}
      <g transform="translate(260, 60)">
        <circle cx="0" cy="0" r="16" stroke="#D4943A" {...shared} />
        <line x1="0" y1="-24" x2="0" y2="-20" stroke="#D4943A" {...shared} />
        <line x1="17" y1="-17" x2="14" y2="-14" stroke="#D4943A" {...shared} />
        <line x1="24" y1="0" x2="20" y2="0" stroke="#D4943A" {...shared} />
        <line x1="17" y1="17" x2="14" y2="14" stroke="#D4943A" {...shared} />
        <line x1="0" y1="24" x2="0" y2="20" stroke="#D4943A" {...shared} />
        <line x1="-17" y1="17" x2="-14" y2="14" stroke="#D4943A" {...shared} />
        <line x1="-24" y1="0" x2="-20" y2="0" stroke="#D4943A" {...shared} />
        <line x1="-17" y1="-17" x2="-14" y2="-14" stroke="#D4943A" {...shared} />
      </g>

      {/* Leaf sprig bottom-left */}
      <g transform="translate(60, 260)">
        <path d="M0,20 C0,0 0,-10 0,-20" stroke="#3D7A52" {...shared} />
        <path d="M0,0 C-14,-6 -18,-14 -12,-20" stroke="#7BB369" {...shared} />
        <path d="M0,-10 C14,-16 18,-24 12,-30" stroke="#7BB369" {...shared} />
        <path d="M0,10 C-12,4 -16,-2 -10,-8" stroke="#A8D49A" {...shared} strokeWidth={2} />
      </g>

      {/* Broad bean pod */}
      <g transform="translate(180, 250)">
        <path d="M-8,-22 Q-18,0 -8,22 Q0,26 8,22 Q18,0 8,-22 Q0,-26 -8,-22" stroke="#7BB369" {...shared} />
        <ellipse cx="0" cy="-8" rx="5" ry="6" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
        <ellipse cx="0" cy="6" rx="5" ry="6" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      </g>

      {/* Small decorative leaves top-left */}
      <g transform="translate(50, 60)">
        <path d="M0,10 C-8,0 -6,-10 0,-14 C6,-10 8,0 0,10" stroke="#A8D49A" {...shared} strokeWidth={2} />
        <path d="M0,10 L0,-14" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      </g>
    </svg>
  );
}

// ─── Vegetable mini-icons (24x24) ───────────────────────────────────────────

export function TomatoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,5 C10,2 11,1 13,1" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <ellipse cx="12" cy="13" rx="8" ry="7.5" stroke="#C9543E" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function CarrotIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,7 L9,22 L15,22 Z" stroke="#D4943A" {...shared} strokeWidth={2} />
      <path d="M12,7 C9,2 7,3 9,6" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,7 C15,2 17,3 15,6" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function PeaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4,12 Q12,4 20,12 Q12,20 4,12" stroke="#7BB369" {...shared} strokeWidth={2} />
      <circle cx="9" cy="12" r="2.5" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      <circle cx="15" cy="12" r="2.5" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function LettuceIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,20 C6,20 3,16 4,12 C2,10 3,6 6,5 C7,2 11,1 12,3 C13,1 17,2 18,5 C21,6 22,10 20,12 C21,16 18,20 12,20Z" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,20 L12,10" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function BroadBeanIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9,3 Q4,12 9,21 Q12,23 15,21 Q20,12 15,3 Q12,1 9,3" stroke="#7BB369" {...shared} strokeWidth={2} />
      <ellipse cx="12" cy="10" rx="2.5" ry="3" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function RunnerBeanIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8,2 Q5,12 8,22" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M8,8 C12,6 16,8 14,12" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M8,14 C12,12 16,14 14,18" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function CourgetteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="13" rx="5" ry="9" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,4 C10,2 11,0 13,1" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function PotatoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="13" rx="9" ry="7" stroke="#D4943A" {...shared} strokeWidth={2} />
      <circle cx="9" cy="11" r="1" stroke="#9A8D85" {...shared} strokeWidth={1.5} />
      <circle cx="14" cy="10" r="1" stroke="#9A8D85" {...shared} strokeWidth={1.5} />
      <circle cx="11" cy="15" r="1" stroke="#9A8D85" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function BroccoliIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,22 L12,12" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <circle cx="12" cy="8" r="5" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <circle cx="8" cy="9" r="3" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <circle cx="16" cy="9" r="3" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <circle cx="12" cy="5" r="3" stroke="#7BB369" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function CabbageIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="13" r="8" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M8,11 Q12,7 16,11" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      <path d="M9,14 Q12,10 15,14" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function CauliflowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6,16 Q4,12 6,10 Q7,6 12,5 Q17,6 18,10 Q20,12 18,16" stroke="#7BB369" {...shared} strokeWidth={2} />
      <circle cx="10" cy="10" r="2.5" stroke="#F5EFE0" {...shared} strokeWidth={1.5} />
      <circle cx="14" cy="10" r="2.5" stroke="#F5EFE0" {...shared} strokeWidth={1.5} />
      <circle cx="12" cy="13" r="2.5" stroke="#F5EFE0" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function BrusselsSproutsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,3 L12,21" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <circle cx="10" cy="8" r="2.5" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <circle cx="14" cy="12" r="2.5" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <circle cx="10" cy="16" r="2.5" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,3 C10,1 8,2 9,4" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,3 C14,1 16,2 15,4" stroke="#7BB369" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function GarlicIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,3 L12,7" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M8,10 Q8,7 12,7 Q16,7 16,10 Q16,20 12,22 Q8,20 8,10" stroke="#D4943A" {...shared} strokeWidth={2} />
      <path d="M12,7 L12,16" stroke="#D4943A" {...shared} strokeWidth={1.5} />
      <path d="M10,9 L10,14" stroke="#D4943A" {...shared} strokeWidth={1} />
      <path d="M14,9 L14,14" stroke="#D4943A" {...shared} strokeWidth={1} />
    </svg>
  );
}

export function ParsleyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,22 L12,10" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,10 C8,6 4,6 5,2 C9,3 10,6 12,10" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,10 C16,6 20,6 19,2 C15,3 14,6 12,10" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,14 C8,11 6,9 8,6" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function CorianderIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,22 L12,8" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,8 C8,4 6,2 8,1" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,8 C12,3 11,1 12,0" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,8 C16,4 18,2 16,1" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,14 C9,11 7,10 9,8" stroke="#A8D49A" {...shared} strokeWidth={1.5} />
      <path d="M12,14 C15,11 17,10 15,8" stroke="#A8D49A" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,22 L12,6" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,6 C8,4 5,6 6,10 L12,8 L18,10 C19,6 16,4 12,6" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,12 C9,11 7,12 8,15 L12,14" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      <path d="M12,12 C15,11 17,12 16,15 L12,14" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function PakChoiIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8,22 Q6,14 8,10 Q10,6 12,4 Q14,6 16,10 Q18,14 16,22" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M10,22 Q10,14 12,8 Q14,14 14,22" stroke="#F5EFE0" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function FennelIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="18" rx="6" ry="4" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,14 L12,4" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,6 C8,2 6,1 7,0" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,6 C16,2 18,1 17,0" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,10 C9,7 7,7 8,5" stroke="#A8D49A" {...shared} strokeWidth={1.5} />
      <path d="M12,10 C15,7 17,7 16,5" stroke="#A8D49A" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function CeleryIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9,22 L9,8 C9,4 10,2 11,1" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,22 L12,6 C12,3 12,1 12,0" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M15,22 L15,8 C15,4 14,2 13,1" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function BasilIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,22 L12,10" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,10 C8,8 6,4 8,2 C10,3 11,6 12,10" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,10 C16,8 18,4 16,2 C14,3 13,6 12,10" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,16 C9,14 8,11 10,9" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      <path d="M12,16 C15,14 16,11 14,9" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function DillIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12,22 L12,4" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,4 C9,2 8,1 9,0" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,4 C15,2 16,1 15,0" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,4 L12,1" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,10 C9,8 8,7 9,5" stroke="#A8D49A" {...shared} strokeWidth={1.5} />
      <path d="M12,10 C15,8 16,7 15,5" stroke="#A8D49A" {...shared} strokeWidth={1.5} />
      <path d="M12,16 C10,14 9,13 10,11" stroke="#7BB369" {...shared} strokeWidth={1} />
      <path d="M12,16 C14,14 15,13 14,11" stroke="#7BB369" {...shared} strokeWidth={1} />
    </svg>
  );
}

// Map crop slugs to icons
const cropIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  tomatoes: TomatoIcon,
  carrots: CarrotIcon,
  peas: PeaIcon,
  lettuce: LettuceIcon,
  "broad-beans": BroadBeanIcon,
  "runner-beans": RunnerBeanIcon,
  courgettes: CourgetteIcon,
  "early-potatoes": PotatoIcon,
  broccoli: BroccoliIcon,
  cabbage: CabbageIcon,
  cauliflower: CauliflowerIcon,
  "brussels-sprouts": BrusselsSproutsIcon,
  garlic: GarlicIcon,
  parsley: ParsleyIcon,
  coriander: CorianderIcon,
  rocket: RocketIcon,
  "pak-choi": PakChoiIcon,
  fennel: FennelIcon,
  celery: CeleryIcon,
  basil: BasilIcon,
  dill: DillIcon,
};

export function getCropIcon(slug: string): React.ComponentType<{ className?: string }> | null {
  return cropIconMap[slug] || null;
}

// ─── Section divider ────────────────────────────────────────────────────────

export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 py-2 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-earth/10" />
      <svg viewBox="0 0 40 20" className="w-10 h-5 text-leaf shrink-0">
        <path d="M20,17 C20,10 20,5 20,3" stroke="currentColor" {...shared} strokeWidth={1.5} />
        <path d="M20,10 C14,6 12,2 16,0" stroke="currentColor" {...shared} strokeWidth={1.5} />
        <path d="M20,10 C26,6 28,2 24,0" stroke="currentColor" {...shared} strokeWidth={1.5} />
        <path d="M20,14 C15,12 13,8 16,6" stroke="#A8D49A" {...shared} strokeWidth={1} />
        <path d="M20,14 C25,12 27,8 24,6" stroke="#A8D49A" {...shared} strokeWidth={1} />
      </svg>
      <div className="flex-1 h-px bg-earth/10" />
    </div>
  );
}

// ─── Feature icons ──────────────────────────────────────────────────────────

export function MapPinPlantIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* Map pin */}
      <path d="M16,2 C10,2 6,6.5 6,12 C6,20 16,30 16,30 C16,30 26,20 26,12 C26,6.5 22,2 16,2Z" stroke="currentColor" {...shared} />
      {/* Plant inside pin */}
      <path d="M16,18 L16,12" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M16,14 C13,11 12,8 14,7" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M16,12 C19,9 20,6 18,5" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function CalendarSeedlingIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* Calendar */}
      <rect x="4" y="6" width="24" height="22" rx="3" stroke="currentColor" {...shared} />
      <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" {...shared} />
      <line x1="10" y1="3" x2="10" y2="8" stroke="currentColor" {...shared} />
      <line x1="22" y1="3" x2="22" y2="8" stroke="currentColor" {...shared} />
      {/* Seedling */}
      <path d="M16,24 L16,18" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M16,20 C13,17 14,15 16,15 C18,15 19,17 16,20" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function SnowflakeShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* Shield */}
      <path d="M16,3 L5,8 L5,16 C5,22 10,27 16,29 C22,27 27,22 27,16 L27,8 Z" stroke="currentColor" {...shared} />
      {/* Snowflake */}
      <line x1="16" y1="10" x2="16" y2="22" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <line x1="10" y1="13" x2="22" y2="19" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <line x1="22" y1="13" x2="10" y2="19" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <line x1="14" y1="11" x2="16" y2="13" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <line x1="18" y1="11" x2="16" y2="13" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <line x1="14" y1="21" x2="16" y2="19" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <line x1="18" y1="21" x2="16" y2="19" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

// ─── Decorative elements ────────────────────────────────────────────────────

export function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden="true">
      <path d="M12,30 C12,20 12,12 12,4" stroke="#3D7A52" {...shared} strokeWidth={2} />
      <path d="M12,8 C7,4 5,0 8,-2" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,8 C17,4 19,0 16,-2" stroke="#7BB369" {...shared} strokeWidth={2} />
      <path d="M12,16 C7,12 5,8 8,6" stroke="#A8D49A" {...shared} strokeWidth={2} />
      <path d="M12,16 C17,12 19,8 16,6" stroke="#A8D49A" {...shared} strokeWidth={2} />
      <path d="M12,22 C8,19 7,16 9,14" stroke="#7BB369" {...shared} strokeWidth={1.5} />
      <path d="M12,22 C16,19 17,16 15,14" stroke="#7BB369" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="12" y1="2" x2="12" y2="5" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="12" y1="19" x2="12" y2="22" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="2" y1="12" x2="5" y2="12" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="19" y1="12" x2="22" y2="12" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="4.9" y1="4.9" x2="7" y2="7" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="17" y1="17" x2="19.1" y2="19.1" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="4.9" y1="19.1" x2="7" y2="17" stroke="#D4943A" {...shared} strokeWidth={2} />
      <line x1="17" y1="7" x2="19.1" y2="4.9" stroke="#D4943A" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function SnowflakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <line x1="4" y1="7" x2="20" y2="17" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <line x1="20" y1="7" x2="4" y2="17" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <line x1="10" y1="3.5" x2="12" y2="5.5" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <line x1="14" y1="3.5" x2="12" y2="5.5" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <line x1="10" y1="20.5" x2="12" y2="18.5" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <line x1="14" y1="20.5" x2="12" y2="18.5" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
    </svg>
  );
}

export function WateringCanIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6,10 L6,20 L18,20 L18,10 Z" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <path d="M18,14 L22,10" stroke="#7BA7C2" {...shared} strokeWidth={2} />
      <path d="M22,10 L23,8 L22,7 L21,8" stroke="#7BA7C2" {...shared} strokeWidth={1.5} />
      <path d="M10,10 C10,6 8,4 6,4 L14,4 C12,4 10,6 10,10" stroke="#7BA7C2" {...shared} strokeWidth={2} />
    </svg>
  );
}

// ─── Category illustrations for crop pages ──────────────────────────────────

export function HardyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      {/* Pea pod */}
      <path d="M20,40 Q40,20 60,40 Q40,60 20,40" stroke="#7BB369" {...shared} />
      <circle cx="33" cy="40" r="4" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      <circle cx="45" cy="40" r="4" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      {/* Leaf */}
      <path d="M80,50 C74,38 76,26 84,20 C92,26 94,38 88,50" stroke="#7BB369" {...shared} />
      <path d="M84,20 L84,50" stroke="#3D7A52" {...shared} strokeWidth={1.5} />
      {/* Small carrot */}
      <path d="M105,25 L100,55 L110,55 Z" stroke="#D4943A" {...shared} strokeWidth={2} />
      <path d="M105,25 C101,18 103,16 105,18 C107,16 109,18 105,25" stroke="#7BB369" {...shared} strokeWidth={2} />
    </svg>
  );
}

export function HalfHardyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      {/* Courgette */}
      <ellipse cx="40" cy="40" rx="12" ry="28" stroke="#3D7A52" {...shared} />
      <path d="M40,12 C36,6 38,2 42,4" stroke="#7BB369" {...shared} />
      {/* Sun partial */}
      <circle cx="90" cy="35" r="14" stroke="#D4943A" {...shared} />
      <line x1="90" y1="15" x2="90" y2="19" stroke="#D4943A" {...shared} />
      <line x1="104" y1="35" x2="108" y2="35" stroke="#D4943A" {...shared} />
      <line x1="100" y1="25" x2="103" y2="22" stroke="#D4943A" {...shared} />
    </svg>
  );
}

export function TenderIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      {/* Tomato */}
      <path d="M40,20 C37,14 39,10 43,10" stroke="#3D7A52" {...shared} />
      <ellipse cx="40" cy="38" rx="22" ry="20" stroke="#C9543E" {...shared} />
      <path d="M28,30 Q40,22 52,30" stroke="#C9543E" {...shared} strokeWidth={1.5} />
      {/* Chilli */}
      <path d="M90,15 C92,12 96,12 95,16" stroke="#3D7A52" {...shared} />
      <path d="M90,15 C85,25 82,40 86,55 C90,60 94,55 92,40 C90,30 92,20 90,15" stroke="#C9543E" {...shared} />
    </svg>
  );
}

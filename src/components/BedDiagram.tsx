/**
 * Top-down "how to lay it out" diagram for a veg bed, drawn to look like a real
 * raised bed: timber frame, textured soil, leaf-marked plants and densely-sown
 * rows. Server-rendered SVG, no JS — on-brand (Ghibli palette).
 */
export interface BedPlanting {
  name: string;
  color: string;
  initial: string;
  positions?: [number, number][]; // individually-spaced plants: [x%, y%]
  rows?: number[]; // densely-sown rows: a y% for each row (drawn as a line of seedlings)
  r?: number; // optional marker radius for `positions` (default 13)
  spacing?: string; // optional note shown in the legend, e.g. "20cm apart"
}

const PAD = 14; // outer margin
const FRAME = 9; // timber frame thickness
const W = 400;
const H = 250;
const innerX = PAD + FRAME;
const innerY = PAD + FRAME;
const innerW = W - (PAD + FRAME) * 2;
const innerH = H - (PAD + FRAME) * 2;

const SOIL = "#E4D6BB";
const SOIL_DARK = "#CDB98F";
const WOOD = "#C2A678";
const WOOD_DARK = "#9A7C4F";

// A tiny sprout glyph (two leaves), centred on (cx, cy)
function Sprout({ cx, cy, s, color }: { cx: number; cy: number; s: number; color: string }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <path d={`M0 ${s * 0.5} C ${-s} ${s * 0.1}, ${-s} ${-s * 0.7}, 0 ${-s * 0.5} C ${s} ${-s * 0.7}, ${s} ${s * 0.1}, 0 ${s * 0.5} Z`} fill={color} opacity={0.9} />
      <path d={`M0 ${s * 0.5} L0 ${-s * 0.4}`} stroke={color} strokeWidth={Math.max(0.6, s * 0.16)} strokeLinecap="round" />
    </g>
  );
}

export default function BedDiagram({
  title,
  note,
  plantings,
  subtitle,
}: {
  title: string;
  note: string;
  plantings: BedPlanting[];
  subtitle?: string; // optional, e.g. "Standard bed · 1.2m × 2.4m"
}) {
  const xPct = (px: number) => innerX + (px / 100) * innerW;
  const yPct = (py: number) => innerY + (py / 100) * innerH;

  return (
    <figure className="border border-earth/10 bg-cream p-4 sm:p-5">
      <h3 className="font-serif text-lg text-earth tracking-tight mb-0.5">{title}</h3>
      {subtitle && <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth-lighter mb-2">{subtitle}</p>}
      <p className="text-sm text-earth-light leading-snug mb-4">{note}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Bed layout: ${title}`}>
        <defs>
          <pattern id="soilTexture" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <circle cx="3" cy="3" r="1" fill={SOIL_DARK} opacity="0.5" />
            <circle cx="9" cy="9" r="0.8" fill={SOIL_DARK} opacity="0.4" />
          </pattern>
        </defs>

        {/* Timber frame */}
        <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} rx={5} fill={WOOD} stroke={WOOD_DARK} strokeWidth={2} />
        {/* plank lines on the frame */}
        <rect x={PAD + FRAME * 0.35} y={PAD + FRAME * 0.35} width={W - PAD * 2 - FRAME * 0.7} height={H - PAD * 2 - FRAME * 0.7} rx={3} fill="none" stroke={WOOD_DARK} strokeWidth={0.6} opacity={0.5} />

        {/* Soil */}
        <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={2} fill={SOIL} />
        <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={2} fill="url(#soilTexture)" />

        {/* Densely-sown rows: a furrow + evenly spaced sprouts + a label tag */}
        {plantings.flatMap((p) =>
          (p.rows ?? []).map((ry, ri) => {
            const cy = yPct(ry);
            const n = 12;
            const x0 = 7;
            const x1 = 93;
            return (
              <g key={`${p.name}-row-${ri}`}>
                {/* furrow shadow line */}
                <line x1={xPct(x0)} y1={cy} x2={xPct(x1)} y2={cy} stroke={SOIL_DARK} strokeWidth={2} opacity={0.5} />
                {Array.from({ length: n }).map((_, k) => {
                  const px = x0 + (k * (x1 - x0)) / (n - 1);
                  return <Sprout key={k} cx={xPct(px)} cy={cy} s={5.2} color={p.color} />;
                })}
                {/* label tag at the start of the row */}
                <g transform={`translate(${innerX + 3} ${cy})`}>
                  <rect x={0} y={-8.5} width={22} height={17} rx={3} fill={p.color} />
                  <text x={11} y={4} textAnchor="middle" fontSize={9} fontFamily="monospace" fontWeight={700} fill="#fff">{p.initial}</text>
                </g>
              </g>
            );
          })
        )}

        {/* Individually-spaced plants */}
        {plantings.flatMap((p) =>
          (p.positions ?? []).map(([px, py], i) => {
            const cx = xPct(px);
            const cy = yPct(py);
            const r = p.r ?? 13;
            return (
              <g key={`${p.name}-pos-${i}`}>
                {/* soil dish / shadow */}
                <ellipse cx={cx} cy={cy + r * 0.45} rx={r * 0.95} ry={r * 0.42} fill={SOIL_DARK} opacity={0.45} />
                {/* plant footprint */}
                <circle cx={cx} cy={cy} r={r} fill={p.color} stroke="rgba(0,0,0,0.14)" strokeWidth={1} />
                {/* highlight */}
                <circle cx={cx - r * 0.3} cy={cy - r * 0.32} r={r * 0.42} fill="#fff" opacity={0.18} />
                {/* leaves */}
                <Sprout cx={cx} cy={cy - r * 0.05} s={r * 0.5} color="#ffffff" />
                <text x={cx} y={cy + r * 0.62} textAnchor="middle" fontSize={Math.max(7, r * 0.55)} fontFamily="monospace" fontWeight={700} fill="#fff" opacity={0.92}>
                  {p.initial}
                </text>
              </g>
            );
          })
        )}
      </svg>

      {/* legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {plantings.map((p) => (
          <span key={p.name} className="inline-flex items-center gap-1.5 text-xs text-earth-light">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: p.color }} />
            {p.name}
            {p.spacing && <span className="text-earth-lighter">· {p.spacing}</span>}
          </span>
        ))}
      </div>
    </figure>
  );
}

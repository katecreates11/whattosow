/**
 * Top-down "how to lay it out" diagram for a companion-planting combination,
 * drawn as a simple veg-bed plan. Positions are percentages (0–100) within the
 * bed; each planting gets a colour, an initial, and one or more positions.
 * On-brand (Ghibli palette), server-rendered SVG — no JS.
 */
export interface BedPlanting {
  name: string;
  color: string;
  initial: string;
  positions?: [number, number][]; // individually-spaced plants: [x%, y%]
  rows?: number[]; // densely-sown rows: a y% for each row (drawn as a line of seedlings)
  r?: number; // optional marker radius for `positions` (default 13)
}

const PAD = 12;
const W = 400;
const H = 250;
const innerW = W - PAD * 2;
const innerH = H - PAD * 2;

export default function BedDiagram({
  title,
  note,
  plantings,
}: {
  title: string;
  note: string;
  plantings: BedPlanting[];
}) {
  return (
    <figure className="border border-earth/10 bg-cream p-4 sm:p-5">
      <h3 className="font-serif text-lg text-earth tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-earth-light leading-snug mb-4">{note}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Bed layout: ${title}`}>
        {/* soil bed */}
        <rect x={PAD} y={PAD} width={innerW} height={innerH} rx={4} fill="#E7DCC4" stroke="#9A8763" strokeWidth={3} />
        {/* Individually-spaced plants */}
        {plantings.flatMap((p) =>
          (p.positions ?? []).map(([px, py], i) => {
            const cx = PAD + (px / 100) * innerW;
            const cy = PAD + (py / 100) * innerH;
            const r = p.r ?? 13;
            return (
              <g key={`${p.name}-pos-${i}`}>
                <circle cx={cx} cy={cy} r={r} fill={p.color} stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
                <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize={10} fontFamily="monospace" fontWeight={700} fill="#fff">
                  {p.initial}
                </text>
              </g>
            );
          })
        )}
        {/* Densely-sown rows: a line of little seedlings + a label at the start */}
        {plantings.flatMap((p) =>
          (p.rows ?? []).map((ry, ri) => {
            const cy = PAD + (ry / 100) * innerH;
            const n = 13;
            const x0 = 10;
            const x1 = 90;
            return (
              <g key={`${p.name}-row-${ri}`}>
                {Array.from({ length: n }).map((_, k) => {
                  const px = x0 + (k * (x1 - x0)) / (n - 1);
                  const cx = PAD + (px / 100) * innerW;
                  return <circle key={k} cx={cx} cy={cy} r={4.5} fill={p.color} stroke="rgba(0,0,0,0.1)" strokeWidth={0.5} />;
                })}
                <text x={PAD + 2} y={cy - 8} fontSize={9} fontFamily="monospace" fontWeight={700} fill={p.color}>
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
          </span>
        ))}
      </div>
    </figure>
  );
}

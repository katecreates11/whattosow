/**
 * A single bed "plate" for the Bed Planner — a top-down planting plan drawn as
 * an editorial object: timber frame, textured soil, and organic DRIFTS of
 * hand-drawn plant glyphs (by growth habit, tinted per crop), with a taped
 * serif label and margin annotations. Server-rendered SVG, on-brand Ghibli
 * palette. No raster images, no drag libraries.
 */

export type Habit =
  | "rosette"
  | "climber"
  | "root"
  | "beet"
  | "fruit"
  | "allium"
  | "bloom"
  | "marigold"
  | "nasturtium"
  | "borage"
  | "calendula"
  | "cover";

export interface Drift {
  name: string;
  habit: Habit;
  color: string;
  /** region within the soil, as [x0, y0, x1, y1] in 0–100 % */
  region: [number, number, number, number];
  count: number;
  glyphScale?: number; // marker radius in svg units (default 13)
  fruitColor?: string; // for the fruiting-bush habit
  spacing?: string; // legend note, e.g. "30cm"
  cols?: number; // force columns, so drawn spacing reflects real spacing
}

export interface Annotation {
  text: string;
  x: number; // % across the plate
  y: number; // % down the plate
}

const W = 440;
const H = 320;
const PAD = 16;
const FRAME = 11;
const innerX = PAD + FRAME;
const innerY = PAD + FRAME;
const innerW = W - (PAD + FRAME) * 2;
const innerH = H - (PAD + FRAME) * 2;

const SOIL = "#E4D6BB";
const SOIL_DARK = "#CDB98F";
const WOOD = "#C2A678";
const WOOD_DARK = "#9A7C4F";
const STEM = "#5C7B4A";
const AMBER = "#D4943A";

// which edge of the drawn plan is North
export type Dir = "top" | "right" | "bottom" | "left";

const STROKE = "rgba(0,0,0,0.16)";

// ── Glyphs (top-down), each centred on (0,0), sized by s ────────────────────
function leafPath(s: number, w = 0.34, h = 1) {
  return `M0 0 Q ${w * s} ${-0.5 * h * s} 0 ${-h * s} Q ${-w * s} ${-0.5 * h * s} 0 0 Z`;
}
function broadLeaf(s: number) {
  return `M0 0 C ${0.52 * s} ${-0.28 * s}, ${0.42 * s} ${-0.9 * s}, 0 ${-s} C ${-0.42 * s} ${-0.9 * s}, ${-0.52 * s} ${-0.28 * s}, 0 0 Z`;
}

function Rosette({ s, color }: { s: number; color: string }) {
  return (
    <g>
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={`o${i}`} d={leafPath(s, 0.46)} transform={`rotate(${(i * 360) / 9})`} fill={color} stroke={STROKE} strokeWidth={0.6} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={`m${i}`} d={leafPath(s * 0.6, 0.42)} transform={`rotate(${(i * 360) / 6 + 30})`} fill="#ffffff" opacity={0.2} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={`i${i}`} d={leafPath(s * 0.34, 0.5)} transform={`rotate(${(i * 360) / 5 + 18})`} fill={color} stroke={STROKE} strokeWidth={0.4} />
      ))}
    </g>
  );
}

function Climber({ s, color }: { s: number; color: string }) {
  return (
    <g>
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={`l${i}`} d={broadLeaf(s * 0.92)} transform={`rotate(${(i * 360) / 5})`} fill={color} stroke={STROKE} strokeWidth={0.5} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={`s${i}`} d={broadLeaf(s * 0.5)} transform={`rotate(${(i * 360) / 5 + 36})`} fill="#3E7A4E" stroke={STROKE} strokeWidth={0.4} />
      ))}
      {([[0.34, -0.18], [-0.28, 0.26], [0.1, 0.36]] as const).map(([fx, fy], i) => (
        <ellipse key={`f${i}`} cx={fx * s} cy={fy * s} rx={0.12 * s} ry={0.08 * s} fill="#C9543E" />
      ))}
      <circle r={s * 0.12} fill="#8A6E45" />
      <path d={`M ${s * 0.55} ${-s * 0.35} q ${s * 0.4} ${-s * 0.05} ${s * 0.3} ${s * 0.35}`} fill="none" stroke={STEM} strokeWidth={0.8} strokeLinecap="round" />
    </g>
  );
}

function Root({ s, color }: { s: number; color: string }) {
  const blades = 7;
  return (
    <g>
      {/* tapered orange root body, clearly visible */}
      <path d={`M ${-0.3 * s} ${-0.02 * s} Q ${-0.36 * s} ${0.28 * s} 0 ${0.98 * s} Q ${0.36 * s} ${0.28 * s} ${0.3 * s} ${-0.02 * s} Z`} fill={color} stroke="#B86A1E" strokeWidth={0.7} />
      <path d={`M ${-0.24 * s} ${0.04 * s} Q 0 ${-0.06 * s} ${0.24 * s} ${0.04 * s}`} fill="none" stroke="#F0A84E" strokeWidth={0.06 * s} strokeLinecap="round" />
      {[0.28, 0.5, 0.72].map((ry, i) => (
        <path key={`r${i}`} d={`M ${-0.2 * s * (1 - ry * 0.5)} ${ry * s} Q 0 ${(ry + 0.05) * s} ${0.2 * s * (1 - ry * 0.5)} ${ry * s}`} fill="none" stroke="#C9772E" strokeWidth={0.5} opacity={0.7} />
      ))}
      {/* feathery green top */}
      {Array.from({ length: blades }).map((_, i) => {
        const sp = (i - (blades - 1) / 2) / blades;
        return <path key={i} d={`M ${sp * 0.16 * s} ${-0.02 * s} Q ${sp * 0.55 * s} ${-0.5 * s} ${sp * 0.62 * s} ${-0.98 * s}`} fill="none" stroke={STEM} strokeWidth={0.07 * s} strokeLinecap="round" />;
      })}
    </g>
  );
}

function Beet({ s, color }: { s: number; color: string }) {
  const n = 5;
  return (
    <g>
      <path d={`M0 ${0.6 * s} Q ${0.07 * s} ${0.85 * s} 0 ${1.02 * s} Q ${-0.07 * s} ${0.85 * s} 0 ${0.6 * s} Z`} fill={color} />
      <ellipse cx={0} cy={0.34 * s} rx={0.44 * s} ry={0.42 * s} fill={color} stroke="#6E2A4A" strokeWidth={0.7} />
      <ellipse cx={-0.15 * s} cy={0.2 * s} rx={0.16 * s} ry={0.12 * s} fill="#ffffff" opacity={0.2} />
      {Array.from({ length: n }).map((_, i) => {
        const sp = (i - (n - 1) / 2) / n;
        const tx = sp * 0.6 * s;
        const ty = -0.92 * s;
        return (
          <g key={i}>
            <path d={`M ${sp * 0.12 * s} ${-0.02 * s} Q ${sp * 0.5 * s} ${-0.5 * s} ${tx} ${ty}`} stroke="#A8425F" strokeWidth={0.07 * s} fill="none" strokeLinecap="round" />
            <ellipse cx={tx} cy={ty} rx={0.16 * s} ry={0.22 * s} fill="#4F8A3C" stroke={STROKE} strokeWidth={0.4} transform={`rotate(${sp * 35} ${tx} ${ty})`} />
          </g>
        );
      })}
    </g>
  );
}

function FruitBush({ s, color, fruitColor }: { s: number; color: string; fruitColor?: string }) {
  const lobes = 6;
  return (
    <g>
      {Array.from({ length: lobes }).map((_, i) => (
        <path key={i} d={leafPath(s, 0.6)} transform={`rotate(${(i * 360) / lobes})`} fill={color} stroke={STROKE} strokeWidth={0.6} />
      ))}
      <circle r={s * 0.34} fill={color} stroke={STROKE} strokeWidth={0.5} />
      {fruitColor &&
        [
          [-0.4, 0.35],
          [0.45, 0.1],
          [0.05, 0.5],
        ].map(([fx, fy], i) => <ellipse key={i} cx={fx * s} cy={fy * s} rx={s * 0.2} ry={s * 0.12} fill={fruitColor} stroke={STROKE} strokeWidth={0.5} transform={`rotate(${i * 40} ${fx * s} ${fy * s})`} />)}
    </g>
  );
}

function Allium({ s, color }: { s: number; color: string }) {
  const blades = 7;
  return (
    <g>
      <ellipse cx={0} cy={s * 0.5} rx={s * 0.34} ry={s * 0.26} fill="#EDE3CB" stroke={STROKE} strokeWidth={0.5} />
      <ellipse cx={0} cy={s * 0.5} rx={s * 0.34} ry={s * 0.26} fill="#C9B68F" opacity={0.5} />
      {Array.from({ length: blades }).map((_, i) => {
        const sp = (i - (blades - 1) / 2) / blades;
        const h = -s * (0.78 + 0.18 * (1 - Math.abs(sp) * 1.4));
        return <path key={i} d={`M ${sp * s * 0.42} ${s * 0.45} Q ${sp * s * 0.9} ${-s * 0.2} ${sp * s} ${h}`} fill="none" stroke={color} strokeWidth={s * 0.1} strokeLinecap="round" />;
      })}
    </g>
  );
}

function Bloom({ s, color }: { s: number; color: string }) {
  const petals = 8;
  return (
    <g>
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse key={i} cx={0} cy={-s * 0.6} rx={s * 0.26} ry={s * 0.42} fill={color} stroke={STROKE} strokeWidth={0.5} transform={`rotate(${(i * 360) / petals})`} />
      ))}
      <circle r={s * 0.3} fill="#7A5A1E" />
    </g>
  );
}

// A dense, ruffled gold pompom — drawn to read unmistakably as a marigold.
function Marigold({ s }: { s: number }) {
  const rings = [
    { rad: 0.6, len: 0.42, col: "#E8B33A", n: 12 },
    { rad: 0.42, len: 0.34, col: "#D98A2E", n: 12 },
    { rad: 0.24, len: 0.26, col: "#C9772E", n: 10 },
  ];
  return (
    <g>
      {rings.flatMap((r, ri) =>
        Array.from({ length: r.n }).map((_, i) => (
          <g key={`${ri}-${i}`} transform={`rotate(${(i * 360) / r.n + ri * 14})`}>
            <ellipse cx={0} cy={-r.rad * s} rx={0.12 * s} ry={r.len * 0.5 * s} fill={r.col} stroke={STROKE} strokeWidth={0.5} />
          </g>
        ))
      )}
      <circle r={0.16 * s} fill="#8A5A1E" />
    </g>
  );
}

// Five rounded petals, a yellow throat and round lily-pad leaves behind.
function Nasturtium({ s, color = "#E0701E" }: { s: number; color?: string }) {
  return (
    <g>
      <circle cx={-0.55 * s} cy={0.4 * s} r={0.42 * s} fill="#4A9A5B" stroke={STROKE} strokeWidth={0.5} />
      <circle cx={0.55 * s} cy={0.45 * s} r={0.36 * s} fill="#3E8E50" stroke={STROKE} strokeWidth={0.5} />
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / 5})`}>
          <ellipse cx={0} cy={-0.52 * s} rx={0.3 * s} ry={0.42 * s} fill={color} stroke={STROKE} strokeWidth={0.5} />
        </g>
      ))}
      <circle r={0.2 * s} fill="#F2C53D" />
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={`n${i}`} transform={`rotate(${(i * 360) / 5})`}>
          <line x1={0} y1={0} x2={0} y2={-0.4 * s} stroke="#C9543E" strokeWidth={0.04 * s} />
        </g>
      ))}
    </g>
  );
}

// The unmistakable blue five-pointed star with a dark central 'beak'.
function Borage({ s, color = "#4F7FC4" }: { s: number; color?: string }) {
  return (
    <g>
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / 5})`}>
          <path d={`M0 ${0.05 * s} Q ${0.26 * s} ${-0.45 * s} 0 ${-s} Q ${-0.26 * s} ${-0.45 * s} 0 ${0.05 * s} Z`} fill={color} stroke="#33548A" strokeWidth={0.6} />
        </g>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={`b${i}`} transform={`rotate(${(i * 360) / 5})`}>
          <path d={`M0 ${0.04 * s} L ${0.06 * s} ${-0.22 * s} L ${-0.06 * s} ${-0.22 * s} Z`} fill="#2C2C44" />
        </g>
      ))}
      <circle r={0.07 * s} fill="#EAF0FA" />
    </g>
  );
}

// Daisy of fine rays around a floret disc.
function Calendula({ s, color = "#E8A52E" }: { s: number; color?: string }) {
  const n = 22;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / n})`}>
          <ellipse cx={0} cy={-0.6 * s} rx={0.05 * s} ry={0.42 * s} fill={color} stroke={STROKE} strokeWidth={0.4} />
        </g>
      ))}
      <circle r={0.3 * s} fill="#D98A2E" />
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={`c${i}`} transform={`rotate(${(i * 360) / 10})`}>
          <circle cx={0} cy={-0.16 * s} r={0.04 * s} fill="#A8661F" />
        </g>
      ))}
    </g>
  );
}

function CoverSprout({ s, color }: { s: number; color: string }) {
  return (
    <g stroke={color} strokeWidth={1.1} strokeLinecap="round" fill="none">
      <path d={`M0 ${s * 0.5} L0 ${-s * 0.3}`} />
      <path d={`M0 ${-s * 0.1} q ${-s * 0.4} ${-s * 0.15} ${-s * 0.5} ${-s * 0.5}`} />
      <path d={`M0 ${-s * 0.1} q ${s * 0.4} ${-s * 0.15} ${s * 0.5} ${-s * 0.5}`} />
    </g>
  );
}

function Glyph({ habit, s, color, fruitColor }: { habit: Habit; s: number; color: string; fruitColor?: string }) {
  switch (habit) {
    case "rosette":
      return <Rosette s={s} color={color} />;
    case "climber":
      return <Climber s={s} color={color} />;
    case "root":
      return <Root s={s} color={color} />;
    case "beet":
      return <Beet s={s} color={color} />;
    case "fruit":
      return <FruitBush s={s} color={color} fruitColor={fruitColor} />;
    case "allium":
      return <Allium s={s} color={color} />;
    case "bloom":
      return <Bloom s={s} color={color} />;
    case "marigold":
      return <Marigold s={s} />;
    case "nasturtium":
      return <Nasturtium s={s} color={color} />;
    case "borage":
      return <Borage s={s} color={color} />;
    case "calendula":
      return <Calendula s={s} color={color} />;
    case "cover":
      return <CoverSprout s={s} color={color} />;
  }
}

export default function BedPlate({
  label,
  caption,
  drifts,
  annotations = [],
  widthLabel,
  lengthLabel,
  north,
}: {
  label: string; // taped serif label, e.g. "Bed 1 · The salad & roots bed"
  caption?: string; // small line under the plate
  drifts: Drift[];
  annotations?: Annotation[];
  widthLabel?: string; // overall bed width, e.g. "1.2m" (drawn on the top frame)
  lengthLabel?: string; // overall bed length, e.g. "2.4m" (drawn on the left frame)
  north?: Dir; // which edge of the plan is North — draws a compass, sun & light gradient
}) {
  const xPct = (p: number) => innerX + (p / 100) * innerW;
  const yPct = (p: number) => innerY + (p / 100) * innerH;

  // Lay each crop out on a REGULAR spacing grid within its region — even rows
  // and columns, so the plan genuinely shows correct plant spacing (square-foot
  // style), not artistic scatter. Cells are kept ~square so spacing reads the
  // same in both directions.
  const layouts = drifts.map((d, di) => {
    const [x0, y0, x1, y1] = d.region;
    const cols = d.cols ?? Math.max(1, Math.round(Math.sqrt(d.count * ((x1 - x0) / Math.max(1, y1 - y0)))));
    const rows = Math.max(1, Math.ceil(d.count / cols));
    const cw = (x1 - x0) / cols;
    const ch = (y1 - y0) / rows;
    const pts = Array.from({ length: d.count }).map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return { px: x0 + (col + 0.5) * cw, py: y0 + (row + 0.5) * ch };
    });
    // a single spacing indicator per crop: the gap between two adjacent plants
    let dim: { a: { px: number; py: number }; b: { px: number; py: number }; label: string } | null = null;
    const showable = d.spacing && d.spacing !== "—" && d.spacing !== "";
    if (showable && cols >= 2) dim = { a: pts[0], b: pts[1], label: d.spacing! };
    else if (showable && rows >= 2 && pts[cols]) dim = { a: pts[0], b: pts[cols], label: d.spacing! };
    return { d, di, pts, dim };
  });

  const placed = layouts.flatMap((l) => l.pts.map((p, i) => ({ key: `${l.di}-${i}`, px: p.px, py: p.py, d: l.d, depth: p.py })));
  // paint back-to-front so nearer plants overlap further ones cleanly
  placed.sort((a, b) => a.depth - b.depth);

  // Sun/orientation: the sun tracks the south, so the south edge (opposite
  // North) is the sunniest. We draw a light→shade gradient, a sun on the south
  // edge, and a compass pointing North.
  const cxMid = innerX + innerW / 2;
  const cyMid = innerY + innerH / 2;
  const sunMap: Record<Dir, { grad: [number, number, number, number]; sun: [number, number]; arrow: [number, number] }> = {
    top: { grad: [0.5, 1, 0.5, 0], sun: [cxMid, innerY + innerH - 15], arrow: [0, -1] },
    bottom: { grad: [0.5, 0, 0.5, 1], sun: [cxMid, innerY + 15], arrow: [0, 1] },
    left: { grad: [1, 0.5, 0, 0.5], sun: [innerX + innerW - 15, cyMid], arrow: [-1, 0] },
    right: { grad: [0, 0.5, 1, 0.5], sun: [innerX + 15, cyMid], arrow: [1, 0] },
  };
  const sun = north ? sunMap[north] : null;

  return (
    <figure className="relative">
      {/* taped serif label */}
      <div className="absolute z-10 left-1/2 -translate-x-1/2 -top-2 sm:-top-3">
        <span className="inline-block bg-amber/35 px-4 py-1.5 rotate-[-1deg] font-serif text-earth text-sm sm:text-base shadow-sm">
          {label}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Planting plan: ${label}`}>
        <defs>
          <pattern id="soilTex" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(9)">
            <circle cx="3" cy="3" r="1" fill={SOIL_DARK} opacity="0.45" />
            <circle cx="10" cy="9" r="0.8" fill={SOIL_DARK} opacity="0.35" />
          </pattern>
          {sun && (
            <linearGradient id="sunGrad" x1={sun.grad[0]} y1={sun.grad[1]} x2={sun.grad[2]} y2={sun.grad[3]}>
              <stop offset="0" stopColor="#FFD27A" stopOpacity="0.34" />
              <stop offset="0.55" stopColor="#FFD27A" stopOpacity="0.06" />
              <stop offset="1" stopColor="#2A2018" stopOpacity="0.14" />
            </linearGradient>
          )}
        </defs>

        {/* timber frame */}
        <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} rx={6} fill={WOOD} stroke={WOOD_DARK} strokeWidth={2} />
        <rect x={PAD + FRAME * 0.4} y={PAD + FRAME * 0.4} width={W - PAD * 2 - FRAME * 0.8} height={H - PAD * 2 - FRAME * 0.8} rx={4} fill="none" stroke={WOOD_DARK} strokeWidth={0.6} opacity={0.5} />

        {/* soil */}
        <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={3} fill={SOIL} />
        <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={3} fill="url(#soilTex)" />
        {sun && <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={3} fill="url(#sunGrad)" />}

        {/* plants */}
        {placed.map((p) => (
          <g key={p.key} transform={`translate(${xPct(p.px)} ${yPct(p.py)})`}>
            <ellipse cx={0} cy={(p.d.glyphScale ?? 13) * 0.5} rx={(p.d.glyphScale ?? 13) * 0.55} ry={(p.d.glyphScale ?? 13) * 0.24} fill={SOIL_DARK} opacity={0.4} />
            <Glyph habit={p.d.habit} s={p.d.glyphScale ?? 13} color={p.d.color} fruitColor={p.d.fruitColor} />
          </g>
        ))}

        {/* spacing indicators — a dimension line + measurement, on the patch */}
        {layouts.map((l) => {
          if (!l.dim) return null;
          const ax = xPct(l.dim.a.px);
          const ay = yPct(l.dim.a.py);
          const bx = xPct(l.dim.b.px);
          const by = yPct(l.dim.b.py);
          const midx = (ax + bx) / 2;
          const midy = (ay + by) / 2;
          const dx = bx - ax;
          const dy = by - ay;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const t = 3.5; // tick half-length
          const w = l.dim.label.length * 4.7 + 9;
          const cx = midx + nx * 9;
          const cy = midy + ny * 9;
          return (
            <g key={`dim-${l.di}`}>
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke={WOOD_DARK} strokeWidth={1} opacity={0.8} />
              <line x1={ax - nx * t} y1={ay - ny * t} x2={ax + nx * t} y2={ay + ny * t} stroke={WOOD_DARK} strokeWidth={1} opacity={0.8} />
              <line x1={bx - nx * t} y1={by - ny * t} x2={bx + nx * t} y2={by + ny * t} stroke={WOOD_DARK} strokeWidth={1} opacity={0.8} />
              <rect x={cx - w / 2} y={cy - 6.5} width={w} height={13} rx={2.5} fill={SOIL} stroke={WOOD_DARK} strokeOpacity={0.4} strokeWidth={0.6} />
              <text x={cx} y={cy + 3} textAnchor="middle" fontSize={8.5} fontFamily="monospace" fontWeight={700} fill={WOOD_DARK}>{l.dim.label}</text>
            </g>
          );
        })}

        {/* overall bed dimensions on the frame */}
        {widthLabel && (
          <g>
            <rect x={W / 2 - 16} y={PAD - 1} width={32} height={FRAME + 2} rx={2} fill={SOIL} stroke={WOOD_DARK} strokeOpacity={0.5} strokeWidth={0.6} />
            <text x={W / 2} y={PAD + FRAME / 2 + 3} textAnchor="middle" fontSize={8.5} fontFamily="monospace" fontWeight={700} fill={WOOD_DARK}>{widthLabel}</text>
          </g>
        )}
        {lengthLabel && (
          <g transform={`rotate(-90 ${PAD + FRAME / 2} ${H / 2})`}>
            <rect x={PAD + FRAME / 2 - 16} y={H / 2 - FRAME / 2 - 1} width={32} height={FRAME + 2} rx={2} fill={SOIL} stroke={WOOD_DARK} strokeOpacity={0.5} strokeWidth={0.6} />
            <text x={PAD + FRAME / 2} y={H / 2 + 3} textAnchor="middle" fontSize={8.5} fontFamily="monospace" fontWeight={700} fill={WOOD_DARK}>{lengthLabel}</text>
          </g>
        )}

        {/* sun + compass */}
        {sun &&
          (() => {
            const [sx, sy] = sun.sun;
            const [ax, ay] = sun.arrow;
            const lx = sx + ax * 17;
            const ly = sy + ay * 17;
            // compass at top-left inside corner
            const cx0 = innerX + 18;
            const cy0 = innerY + 18;
            const tip: [number, number] = [cx0 + ax * 15, cy0 + ay * 15];
            const b1: [number, number] = [cx0 + ax * 9 + -ay * 3.5, cy0 + ay * 9 + ax * 3.5];
            const b2: [number, number] = [cx0 + ax * 9 - -ay * 3.5, cy0 + ay * 9 - ax * 3.5];
            return (
              <g>
                {/* light-direction sun on the south edge */}
                <g transform={`translate(${sx} ${sy})`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={i} x1={0} y1={7} x2={0} y2={10.5} stroke={AMBER} strokeWidth={1.4} strokeLinecap="round" transform={`rotate(${i * 45})`} />
                  ))}
                  <circle r={6} fill={AMBER} stroke="#B87A22" strokeWidth={0.6} />
                </g>
                <text x={lx} y={ly + 3} textAnchor="middle" fontSize={7.5} fontFamily="monospace" fontWeight={700} fill="#B87A22" letterSpacing={0.5}>MOST SUN</text>
                {/* compass */}
                <circle cx={cx0} cy={cy0} r={13} fill="#F5EFE0" fillOpacity={0.9} stroke={WOOD_DARK} strokeOpacity={0.5} strokeWidth={0.8} />
                <polygon points={`${tip[0]},${tip[1]} ${b1[0]},${b1[1]} ${b2[0]},${b2[1]}`} fill="#C9543E" />
                <text x={cx0} y={cy0 + 3.5} textAnchor="middle" fontSize={9} fontFamily="monospace" fontWeight={700} fill={WOOD_DARK}>N</text>
              </g>
            );
          })()}
      </svg>

      {/* margin annotations */}
      {annotations.map((a, i) => (
        <div key={i} className="absolute z-10 max-w-[42%]" style={{ left: `${a.x}%`, top: `${a.y}%`, transform: "translate(-50%,-50%)" }}>
          <span className="inline-block bg-cream/90 border border-earth/15 px-2 py-1 font-serif italic text-[11px] sm:text-xs text-earth leading-tight shadow-sm">
            {a.text}
          </span>
        </div>
      ))}

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {drifts.map((d) => (
          <span key={d.name} className="inline-flex items-center gap-1.5 text-xs text-earth-light">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
            {d.name}
            {d.spacing && <span className="text-earth-lighter">· {d.spacing}</span>}
          </span>
        ))}
      </div>

      {caption && <figcaption className="mt-2 text-xs text-earth-lighter font-serif italic">{caption}</figcaption>}
    </figure>
  );
}

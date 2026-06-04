/**
 * An animated side-on demonstration of why tall crops shade shorter ones:
 * the sun arcs east → south → west, and a tall plant's shadow lengthens and
 * sweeps across the shorter plants beside it. Pure declarative SVG/SMIL — no
 * JavaScript — so it just works in the page and degrades to a static scene.
 */

const AMBER = "#D4943A";
const STEM = "#4E7A3E";
const DUR = "9s";

// shadow streak along the ground, tip sweeping right → centre → left
const shadow = (tipX: number) => `M240,191 L${tipX},193 L${tipX},199 L240,199 Z`;

export default function SunPathDemo() {
  return (
    <figure className="my-8 -mx-6 sm:mx-0">
      <svg
        viewBox="0 0 480 250"
        className="w-full h-auto border border-earth/10"
        role="img"
        aria-label="Animation of the sun moving from east to west across the sky. A tall plant in the middle of a bed casts a long shadow in the morning and evening that sweeps across the shorter plants beside it, showing why tall crops should go on the north side."
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#CFE4EC" />
            <stop offset="1" stopColor="#F2EAD7" />
          </linearGradient>
        </defs>

        {/* sky + ground */}
        <rect x="0" y="0" width="480" height="196" fill="url(#sky)" />
        <rect x="0" y="194" width="480" height="56" fill="#E4D6BB" />
        <line x1="0" y1="194" x2="480" y2="194" stroke="#CDB98F" strokeWidth="1.5" />

        {/* sun path guide + compass words */}
        <path d="M40,196 Q240,18 440,196" fill="none" stroke={AMBER} strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
        <text x="40" y="212" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight={700} fill="#9A7C4F">E</text>
        <text x="40" y="224" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#9A8763">morning</text>
        <text x="240" y="32" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight={700} fill="#9A7C4F">S · midday</text>
        <text x="440" y="212" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight={700} fill="#9A7C4F">W</text>
        <text x="440" y="224" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#9A8763">evening</text>

        {/* moving shadow of the tall plant */}
        <path fill="#2A2A40" opacity="0.26">
          <animate attributeName="d" dur={DUR} repeatCount="indefinite" calcMode="linear" keyTimes="0;0.5;1" values={`${shadow(432)};${shadow(276)};${shadow(48)}`} />
        </path>

        {/* short plant (left) — dims as the evening shadow reaches it */}
        <g transform="translate(135 0)">
          <g>
            <ellipse cx="0" cy="190" rx="15" ry="7" fill="#6FA84F" />
            <ellipse cx="-6" cy="186" rx="8" ry="6" fill="#7DB85C" />
            <ellipse cx="6" cy="186" rx="8" ry="6" fill="#5E9942" />
            <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.65;1" values="1;1;0.45" />
          </g>
        </g>
        {/* short plant (right) — dims as the morning shadow reaches it */}
        <g transform="translate(345 0)">
          <g>
            <ellipse cx="0" cy="190" rx="15" ry="7" fill="#6FA84F" />
            <ellipse cx="-6" cy="186" rx="8" ry="6" fill="#7DB85C" />
            <ellipse cx="6" cy="186" rx="8" ry="6" fill="#5E9942" />
            <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.35;1" values="0.45;1;1" />
          </g>
        </g>

        {/* tall plant (sunflower) in the middle */}
        <g transform="translate(240 0)">
          <line x1="0" y1="195" x2="0" y2="92" stroke={STEM} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M0 150 Q -22 140 -30 150 Q -16 158 0 154 Z" fill={STEM} />
          <path d="M0 128 Q 22 118 30 128 Q 16 136 0 132 Z" fill="#5E9942" />
          <g transform="translate(0 86)">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={i} cx="0" cy="-15" rx="4.5" ry="9" fill={AMBER} transform={`rotate(${i * 30})`} />
            ))}
            <circle r="9" fill="#7A5A1E" />
          </g>
        </g>

        {/* the sun, arcing across with gently rotating rays */}
        <g>
          <g>
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="0" y1="-10" x2="0" y2="-15" stroke={AMBER} strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${i * 45})`} />
            ))}
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
          </g>
          <circle r="11" fill={AMBER} stroke="#B87A22" strokeWidth="0.8" />
          <animateMotion dur={DUR} repeatCount="indefinite" calcMode="linear" path="M40,196 Q240,18 440,196" />
        </g>
      </svg>
      <figcaption className="mt-2 px-6 sm:px-0 text-xs text-earth-lighter font-serif italic">
        The sun never crosses the northern sky, so a tall plant&apos;s shadow always falls to the north &mdash; long in
        the morning and evening, short at midday. Watch it sweep across the shorter plants: that&apos;s why the tall
        crops belong on the north side.
      </figcaption>
    </figure>
  );
}

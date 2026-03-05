import { cities, type City } from "@/data/cities";
import { calculateLastFrostDate } from "@/lib/frost";

/**
 * Convert lat/lng to SVG x/y coordinates on a simplified UK map.
 * Uses a basic Mercator-like projection tuned for the UK bounding box.
 */
function project(lat: number, lng: number): { x: number; y: number } {
  // UK bounds: lat 49.9-58.7, lng -8.2-1.8
  const minLat = 49.9, maxLat = 58.7;
  const minLng = -8.2, maxLng = 1.8;

  // SVG viewBox is 0 0 300 480
  const padding = 20;
  const width = 300 - padding * 2;
  const height = 480 - padding * 2;

  const x = padding + ((lng - minLng) / (maxLng - minLng)) * width;
  const y = padding + ((maxLat - lat) / (maxLat - minLat)) * height;

  return { x, y };
}

// Simplified UK outline as SVG path data — major coastline only
const UK_OUTLINE = `
M 165 25 C 160 30, 155 28, 150 32 C 145 36, 148 42, 152 45
C 156 48, 145 55, 140 52 C 135 49, 128 52, 130 58
C 132 64, 138 62, 142 65 C 146 68, 140 72, 135 70
C 130 68, 125 72, 128 78 C 131 84, 137 80, 142 82
C 147 84, 145 90, 140 88 C 135 86, 128 90, 132 96
C 136 102, 143 98, 148 100 C 153 102, 155 108, 150 112
C 145 116, 148 122, 155 120 C 162 118, 158 125, 152 128
C 146 131, 150 138, 158 140 C 166 142, 160 148, 152 150
C 144 152, 148 160, 156 162 C 164 164, 158 170, 150 172
C 142 174, 140 180, 146 185 C 152 190, 148 195, 140 198
C 132 201, 128 208, 135 215 C 142 222, 138 228, 130 232
C 122 236, 118 242, 125 248 C 132 254, 128 260, 120 264
C 112 268, 108 275, 115 280 C 122 285, 118 290, 110 295
C 102 300, 95 308, 100 315 C 105 322, 100 328, 92 332
C 84 336, 80 342, 85 348 C 90 354, 86 360, 78 365
C 70 370, 75 378, 82 382 C 89 386, 85 392, 90 398
C 95 404, 102 400, 108 405 C 114 410, 120 415, 128 412
C 136 409, 142 415, 148 420 C 154 425, 160 422, 165 428
C 170 434, 178 430, 185 435 C 192 440, 198 438, 195 445
C 192 452, 188 456, 195 458 C 202 460, 210 455, 215 450
C 220 445, 218 438, 222 432 C 226 426, 230 430, 228 422
C 226 414, 222 408, 225 400 C 228 392, 232 385, 228 378
C 224 371, 220 365, 224 358 C 228 351, 232 345, 228 338
C 224 331, 220 325, 218 318 C 216 311, 218 305, 215 298
C 212 291, 210 284, 212 278 C 214 272, 218 265, 215 258
C 212 251, 208 245, 210 238 C 212 231, 215 225, 212 218
C 209 211, 206 205, 208 198 C 210 191, 212 185, 210 178
C 208 171, 205 165, 202 158 C 199 151, 196 145, 198 138
C 200 131, 196 125, 192 118 C 188 111, 185 105, 188 98
C 191 91, 186 85, 182 78 C 178 71, 175 65, 178 58
C 181 51, 176 45, 172 38 C 168 31, 165 28, 165 25 Z
`;

// Ireland rough outline (for context)
const IRELAND_OUTLINE = `
M 48 248 C 42 255, 35 262, 30 272 C 25 282, 22 295, 25 308
C 28 321, 25 335, 30 348 C 35 361, 32 375, 38 388
C 44 401, 50 410, 58 415 C 66 420, 72 412, 78 405
C 84 398, 90 388, 88 378 C 86 368, 82 358, 78 348
C 74 338, 72 328, 75 318 C 78 308, 75 298, 70 288
C 65 278, 60 268, 55 258 C 52 252, 48 248, 48 248 Z
`;

function getFrostColor(dayOfYear: number): string {
  // Early frost-free (< day 100 / ~Apr 10) = green
  // Mid (100-120 / Apr 10-30) = amber
  // Late (> 120 / May+) = frost blue
  if (dayOfYear < 100) return "#7BB369"; // leaf
  if (dayOfYear < 120) return "#D4943A"; // amber
  return "#7BA7C2"; // frost
}

interface UKCityMapProps {
  /** Highlight a single city (for city detail pages) */
  highlightSlug?: string;
  /** Size variant */
  size?: "full" | "mini";
}

export default function UKCityMap({ highlightSlug, size = "full" }: UKCityMapProps) {
  const isMini = size === "mini";
  const svgWidth = isMini ? 150 : 300;
  const svgHeight = isMini ? 240 : 480;

  const year = new Date().getFullYear();

  return (
    <svg
      viewBox="0 0 300 480"
      width={svgWidth}
      height={svgHeight}
      className={isMini ? "w-full max-w-[150px]" : "w-full max-w-[300px]"}
      role="img"
      aria-label={highlightSlug
        ? `Map of the UK showing ${cities.find(c => c.slug === highlightSlug)?.name ?? "location"}`
        : "Map of the UK showing 50 cities with frost date indicators"
      }
    >
      {/* Ireland outline (faded context) */}
      <path
        d={IRELAND_OUTLINE}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth/10"
      />

      {/* UK outline */}
      <path
        d={UK_OUTLINE}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-earth/20"
      />

      {/* City dots */}
      {cities.map((city) => {
        const { x, y } = project(city.latitude, city.longitude);
        const frostDate = calculateLastFrostDate(city.latitude, city.longitude);
        const dayOfYear = Math.floor((frostDate.getTime() - new Date(year, 0, 1).getTime()) / 86400000);
        const color = getFrostColor(dayOfYear);
        const isHighlighted = highlightSlug === city.slug;
        const isOther = highlightSlug && !isHighlighted;

        if (isMini && isOther) {
          return (
            <circle
              key={city.slug}
              cx={x}
              cy={y}
              r={2}
              fill={color}
              opacity={0.2}
            />
          );
        }

        return (
          <g key={city.slug}>
            {isHighlighted && (
              <>
                <circle cx={x} cy={y} r={12} fill={color} opacity={0.15} />
                <circle cx={x} cy={y} r={7} fill={color} opacity={0.25} />
              </>
            )}
            <circle
              cx={x}
              cy={y}
              r={isHighlighted ? 4 : isMini ? 2.5 : 3}
              fill={color}
              opacity={isOther ? 0.2 : 0.9}
            />
            {!isMini && !isOther && (
              <text
                x={x + 5}
                y={y + 1}
                fontSize="7"
                fill="currentColor"
                className="text-earth/50"
                dominantBaseline="middle"
              >
                {city.name}
              </text>
            )}
          </g>
        );
      })}

      {/* Legend (full size only) */}
      {!isMini && !highlightSlug && (
        <g transform="translate(10, 450)">
          <circle cx={0} cy={0} r={3} fill="#7BB369" />
          <text x={6} y={1} fontSize="7" fill="currentColor" className="text-earth/50" dominantBaseline="middle">Early (before Apr 10)</text>
          <circle cx={95} cy={0} r={3} fill="#D4943A" />
          <text x={101} y={1} fontSize="7" fill="currentColor" className="text-earth/50" dominantBaseline="middle">Mid (Apr 10-30)</text>
          <circle cx={180} cy={0} r={3} fill="#7BA7C2" />
          <text x={186} y={1} fontSize="7" fill="currentColor" className="text-earth/50" dominantBaseline="middle">Late (May+)</text>
        </g>
      )}
    </svg>
  );
}

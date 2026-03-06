import type { Crop } from "@/data/crops";
import Image from "next/image";
import { getCropImagePath } from "@/lib/crop-images";

/**
 * Visual spacing diagram showing how plants should be arranged in a row.
 * Renders an SVG-based top-down view of a bed section with plants at correct spacing.
 */
export default function SpacingDiagram({ crop }: { crop: Crop }) {
  const spacing = crop.spacingCm;
  const imgPath = getCropImagePath(crop.slug);

  // Calculate how many plants to show — aim for 3-5 in the row
  const maxPlants = 5;
  const minPlants = 3;
  const plantCount = Math.min(maxPlants, Math.max(minPlants, Math.floor(200 / spacing)));

  // Diagram dimensions
  const diagramWidth = 320;
  const diagramHeight = 160;
  const bedPadding = 30;
  const plantY = diagramHeight / 2;

  // Scale: fit plants within the diagram
  const totalSpacing = spacing * (plantCount - 1);
  const availableWidth = diagramWidth - bedPadding * 2;
  const scale = Math.min(1, availableWidth / totalSpacing);
  const scaledSpacing = spacing * scale;
  const startX = (diagramWidth - scaledSpacing * (plantCount - 1)) / 2;

  // Plant dot size based on spacing (smaller spacing = smaller dots)
  const dotRadius = Math.max(6, Math.min(14, spacing * scale * 0.35));

  // Row spacing (between rows) — typically same as plant spacing or wider
  const rowSpacing = spacing >= 30 ? spacing : Math.max(spacing, 20);

  return (
    <div className="mb-10">
      <h2 className="font-semibold text-earth mb-3">
        Spacing
      </h2>
      <div className="border border-earth/6 p-4 sm:p-6">
        {/* SVG diagram */}
        <div className="flex justify-center mb-4">
          <svg
            viewBox={`0 0 ${diagramWidth} ${diagramHeight}`}
            className="w-full max-w-xs h-auto"
            role="img"
            aria-label={`Spacing diagram showing ${crop.name.toLowerCase()} planted ${spacing}cm apart`}
          >
            {/* Soil background */}
            <rect
              x="10"
              y="20"
              width={diagramWidth - 20}
              height={diagramHeight - 40}
              rx="8"
              fill="#F0E8D8"
              stroke="#D4C9B8"
              strokeWidth="1"
            />

            {/* Soil texture lines */}
            {[0.3, 0.5, 0.7].map((pct) => (
              <line
                key={pct}
                x1="20"
                y1={20 + (diagramHeight - 40) * pct}
                x2={diagramWidth - 20}
                y2={20 + (diagramHeight - 40) * pct}
                stroke="#D4C9B8"
                strokeWidth="0.5"
                strokeDasharray="4 6"
              />
            ))}

            {/* Plants in a row */}
            {Array.from({ length: plantCount }).map((_, i) => {
              const cx = startX + i * scaledSpacing;
              return (
                <g key={i}>
                  {/* Plant circle */}
                  <circle
                    cx={cx}
                    cy={plantY}
                    r={dotRadius}
                    fill="#2D5F3E"
                    opacity={0.85}
                  />
                  {/* Tiny leaf */}
                  <circle
                    cx={cx}
                    cy={plantY}
                    r={dotRadius * 0.5}
                    fill="#4A8C5C"
                  />
                </g>
              );
            })}

            {/* Spacing arrows between first two plants */}
            {plantCount >= 2 && (() => {
              const x1 = startX;
              const x2 = startX + scaledSpacing;
              const arrowY = plantY + dotRadius + 16;
              return (
                <g>
                  {/* Line */}
                  <line
                    x1={x1}
                    y1={arrowY}
                    x2={x2}
                    y2={arrowY}
                    stroke="#3B2F28"
                    strokeWidth="1"
                    markerStart="url(#arrowLeft)"
                    markerEnd="url(#arrowRight)"
                  />
                  {/* Label */}
                  <text
                    x={(x1 + x2) / 2}
                    y={arrowY + 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#3B2F28"
                    fontFamily="system-ui, sans-serif"
                  >
                    {spacing}cm
                  </text>
                </g>
              );
            })()}

            {/* Arrow markers */}
            <defs>
              <marker
                id="arrowLeft"
                viewBox="0 0 6 6"
                refX="6"
                refY="3"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 6 0 L 0 3 L 6 6" fill="none" stroke="#3B2F28" strokeWidth="1" />
              </marker>
              <marker
                id="arrowRight"
                viewBox="0 0 6 6"
                refX="0"
                refY="3"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 6 3 L 0 6" fill="none" stroke="#3B2F28" strokeWidth="1" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Text summary */}
        <div className="text-center space-y-1">
          <p className="text-sm text-earth">
            <strong>{spacing}cm</strong> between plants
            {rowSpacing !== spacing && (
              <> &middot; <strong>{rowSpacing}cm</strong> between rows</>
            )}
          </p>
          <p className="text-xs text-earth-lighter">
            {spacing <= 5 && "Sow thinly in rows and thin to this spacing once seedlings emerge."}
            {spacing > 5 && spacing <= 15 && "Space evenly in rows. Thin seedlings early to avoid crowding."}
            {spacing > 15 && spacing <= 30 && "Give each plant room to spread. Overcrowding reduces yield."}
            {spacing > 30 && spacing <= 60 && "These are larger plants — give them plenty of space for air circulation."}
            {spacing > 60 && "These plants need serious room. Plan for at least a square metre each."}
          </p>
        </div>
      </div>
    </div>
  );
}

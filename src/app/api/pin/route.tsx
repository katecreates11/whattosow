import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

/**
 * Pinterest pin image generator.
 * Usage: /api/pin?title=Seed+Starting+Kit&subtitle=Everything+you+need&color=green
 * Generates a 1000x1500 tall image optimised for Pinterest.
 */

const COLORS: Record<string, string> = {
  green: "#2D5F3E",
  amber: "#D4943A",
  rust: "#B85C38",
  earth: "#8B6F47",
  leaf: "#4A9A5B",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Growing Guide";
  const subtitle = searchParams.get("subtitle") || "whattosow.co.uk";
  const color = COLORS[searchParams.get("color") || "green"] || COLORS.green;
  const bullets = searchParams.get("bullets")?.split("|").filter(Boolean) || [];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5EFE0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 60px",
        }}
      >
        {/* Top accent */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2D5F3E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </svg>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#3D2E1F" }}>
              What To Sow
            </span>
          </div>
          <div
            style={{
              width: "80px",
              height: "6px",
              background: color,
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1, justifyContent: "center" }}>
          <h1
            style={{
              fontSize: title.length > 30 ? "56px" : "64px",
              fontWeight: 700,
              color: "#3D2E1F",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: "28px", color: "#6B5D4F", margin: 0, lineHeight: 1.4 }}>
            {subtitle}
          </p>

          {/* Bullet points */}
          {bullets.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
              {bullets.map((bullet, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      background: color,
                      borderRadius: "50%",
                      marginTop: "10px",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "24px", color: "#6B5D4F", lineHeight: 1.3 }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "20px", color: "#8C7D6D" }}>
            whattosow.co.uk
          </span>
          <div
            style={{
              width: "40px",
              height: "6px",
              background: color,
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    ),
    { width: 1000, height: 1500 }
  );
}

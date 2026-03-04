import { ImageResponse } from "next/og";

export const alt = "UK Frost Date Map — See when spring arrives where you are";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  // Simplified choropleth gradient blocks to suggest a map
  const regions = [
    { label: "Highlands", frost: "Mid Jun", color: "#7BA7C2", y: 60 },
    { label: "Central Scotland", frost: "Late May", color: "#4885F7", y: 130 },
    { label: "Northern England", frost: "Mid May", color: "#00A29B", y: 200 },
    { label: "Midlands", frost: "Late Apr", color: "#3D9A5B", y: 270 },
    { label: "South East", frost: "Mid Apr", color: "#5DB86A", y: 340 },
    { label: "South West", frost: "Late Mar", color: "#7BB369", y: 410 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5EFE0",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "60px",
        }}
      >
        {/* Left side: text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                width: "80px",
                height: "6px",
                background: "#6B8E9B",
                borderRadius: "3px",
              }}
            />
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#3D2E1F",
                lineHeight: 1.1,
                margin: 0,
                maxWidth: "550px",
              }}
            >
              UK frost date map
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "#6B5D4F",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              See when spring arrives across every region — from late March in
              Cornwall to mid-June in the Highlands
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <span style={{ fontSize: "18px", color: "#8C7D6D" }}>
              whattosow.co.uk/frost-map
            </span>
          </div>
        </div>

        {/* Right side: stylised colour gradient representing the map */}
        <div
          style={{
            width: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          {regions.map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: r.color,
                borderRadius: "12px",
                padding: "14px 18px",
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {r.label}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                }}
              >
                {r.frost}
              </span>
            </div>
          ))}
          {/* Legend label */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 8px 0",
              fontSize: "12px",
              color: "#8C7D6D",
            }}
          >
            <span>Milder</span>
            <span>Colder</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

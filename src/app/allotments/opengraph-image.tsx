import { ImageResponse } from "next/og";

export const alt = "Find Allotments Near You — What To Sow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg
            width="36"
            height="36"
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
          <span style={{ fontSize: "22px", fontWeight: 700, color: "#3D2E1F" }}>
            What To Sow
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              width: "80px",
              height: "6px",
              background: "#4A9A5B",
              borderRadius: "3px",
            }}
          />
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#3D2E1F",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Find Allotments Near You
          </h1>
          <p style={{ fontSize: "24px", color: "#6B5D4F", margin: 0 }}>
            Interactive map of UK allotment sites — enter your postcode
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
            whattosow.co.uk/allotments
          </span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A9A5B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontSize: "18px", color: "#4A9A5B", fontWeight: 600 }}>
              300,000+ plots across the UK
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

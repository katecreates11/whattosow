import { ImageResponse } from "next/og";
import { MONTH_SLUGS, MONTH_NAMES, monthSlugToIndex } from "@/lib/calendar";

export const alt = "What To Sow — Monthly sowing guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return MONTH_SLUGS.map((month) => ({ month }));
}

const seasonColors: Record<string, string> = {
  december: "#6B8E9B",
  january: "#6B8E9B",
  february: "#6B8E9B",
  march: "#4A9A5B",
  april: "#4A9A5B",
  may: "#4A9A5B",
  june: "#D4A439",
  july: "#D4A439",
  august: "#D4A439",
  september: "#C0392B",
  october: "#C0392B",
  november: "#C0392B",
};

export default async function OGImage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const idx = monthSlugToIndex(month);
  if (idx === null) {
    return new ImageResponse(
      <div style={{ background: "#F5EFE0", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "32px", color: "#3D2E1F" }}>Month not found</span>
      </div>,
      { ...size }
    );
  }

  const name = MONTH_NAMES[idx];
  const accent = seasonColors[month] || "#4A9A5B";

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
              background: accent,
              borderRadius: "3px",
            }}
          />
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#3D2E1F",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            What to sow in {name}
          </h1>
          <p style={{ fontSize: "24px", color: "#6B5D4F", margin: 0 }}>
            UK sowing guide — personalised to your postcode
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
            whattosow.co.uk
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {MONTH_NAMES.map((m, i) => (
              <div
                key={m}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: i === idx ? accent : "#D5CFC4",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

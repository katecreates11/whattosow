import { ImageResponse } from "next/og";
import { crops } from "@/data/crops";
import { getCropUrgencies } from "@/lib/urgency";
import { getAvgFrostDate } from "@/lib/calendar";

export const alt = "What Can You Still Sow? — Closing sowing windows this week";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const now = new Date();
  const frostDate = getAvgFrostDate();
  const { urgent } = getCropUrgencies(crops, now, frostDate);
  const count = urgent.length;

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
              background: "#C9543E",
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
              maxWidth: "900px",
            }}
          >
            {count} crop{count !== 1 ? "s" : ""} you can still sow this week
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#6B5D4F",
              margin: 0,
            }}
          >
            Sowing windows are closing — check what&apos;s left
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
            whattosow.co.uk/still-time
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#C9543E",
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#D4943A",
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#7BB369",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

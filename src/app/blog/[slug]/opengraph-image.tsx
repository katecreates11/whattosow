import { ImageResponse } from "next/og";
import { generateBlogPosts, getPostBySlug } from "@/data/blog-posts";
import { getEditorialPost, editorialPosts } from "@/data/editorial-posts";

export const alt = "What To Sow — Monthly Sowing Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/** Seasonal accent color */
function getSeasonColor(month: number): string {
  if (month >= 2 && month <= 4) return "#4A9A5B"; // spring green
  if (month >= 5 && month <= 7) return "#D4A439"; // summer amber
  if (month >= 8 && month <= 10) return "#C0392B"; // autumn rust
  return "#5B8FAF"; // winter frost blue
}

export async function generateStaticParams() {
  const autoSlugs = generateBlogPosts().map((post) => ({ slug: post.slug }));
  const editorialSlugs = editorialPosts.map((post) => ({ slug: post.slug }));
  return [...autoSlugs, ...editorialSlugs];
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Editorial posts use their hero image via metadata, so generate a text-based fallback
  const editorial = getEditorialPost(slug);
  if (editorial) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#2D5F3E",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>
              What To Sow
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ width: "80px", height: "6px", background: "#D4A439" }} />
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {editorial.title}
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              {editorial.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    background: "rgba(255,255,255,0.15)",
                    padding: "4px 12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)" }}>
            whattosow.co.uk
          </span>
        </div>
      ),
      { ...size }
    );
  }

  const post = getPostBySlug(slug);

  const monthName = post ? MONTH_NAMES[post.month] : "Month";
  const year = post?.year ?? 2026;
  const accent = post ? getSeasonColor(post.month) : "#4A9A5B";

  const totalCrops = post
    ? new Set([
        ...post.sowIndoors.map((c) => c.name),
        ...post.directSow.map((c) => c.name),
        ...post.plantOut.map((c) => c.name),
      ]).size
    : 0;

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
        {/* Logo */}
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

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              width: "80px",
              height: "6px",
              background: accent,
            }}
          />
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#3D2E1F",
              lineHeight: 1.1,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            What to Sow in {monthName} {year}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#6B5D4F",
              margin: 0,
            }}
          >
            {totalCrops} crops to start this month
          </p>
        </div>

        {/* Footer */}
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
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: accent,
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#D4A439",
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#C0392B",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

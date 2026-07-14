import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/kit", destination: "/guides", permanent: true },
      // Taken down 2026-07-14 (Kate) — the garden dashboard is not public for now;
      // page code is kept for a possible revisit. Restore = remove these three lines.
      { source: "/my-plot", destination: "/", permanent: false },
      { source: "/my-garden", destination: "/", permanent: false },
      { source: "/lucky-dip", destination: "/", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

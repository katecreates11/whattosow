"use client";

import dynamic from "next/dynamic";

const FrostZoneMap = dynamic(() => import("@/components/FrostZoneMap"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-allotment-bg rounded-2xl animate-pulse" />,
});

export default function FrostZoneMapLoader() {
  return <FrostZoneMap />;
}

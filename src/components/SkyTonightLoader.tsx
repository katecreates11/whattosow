"use client";

import dynamic from "next/dynamic";

const SkyTonight = dynamic(() => import("@/components/SkyTonight"), {
  ssr: false,
  loading: () => <div className="h-40 bg-allotment-bg/30 rounded-xl animate-pulse" />,
});

export default function SkyTonightLoader() {
  return <SkyTonight />;
}

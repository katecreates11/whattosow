"use client";

import dynamic from "next/dynamic";

const AllotmentMap = dynamic(() => import("@/components/AllotmentMap"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-allotment-bg rounded-2xl animate-pulse" />,
});

export default function AllotmentMapLoader() {
  return <AllotmentMap />;
}

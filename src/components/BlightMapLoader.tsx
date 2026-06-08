"use client";

import dynamic from "next/dynamic";
import { SnowflakeIcon } from "@/components/SVGIllustrations";

const BlightMap = dynamic(() => import("@/components/BlightMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] sm:h-[550px] lg:h-[650px] bg-allotment-bg rounded-2xl flex flex-col items-center justify-center text-center gap-3 px-6">
      <SnowflakeIcon className="w-8 h-8 text-amber animate-pulse" />
      <p className="font-serif italic text-earth-light text-lg">Reading the blight conditions&hellip;</p>
    </div>
  ),
});

export default function BlightMapLoader() {
  return <BlightMap />;
}

"use client";

import dynamic from "next/dynamic";

const PhaserGarden = dynamic(() => import("@/game/PhaserGarden"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px] bg-[#F5EFE0]">
      <p className="text-earth-lighter font-serif italic animate-pulse">
        Preparing your allotment...
      </p>
    </div>
  ),
});

export default function GameWrapper() {
  return <PhaserGarden />;
}

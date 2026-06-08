"use client";

import dynamic from "next/dynamic";
import { SnowflakeIcon } from "@/components/SVGIllustrations";
import type { FrostMapFocus } from "@/components/FrostZoneMap";

function Skeleton({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`${
        compact ? "h-[320px] sm:h-[420px]" : "h-[400px] sm:h-[550px] lg:h-[650px]"
      } bg-allotment-bg rounded-2xl flex flex-col items-center justify-center text-center gap-3 px-6`}
    >
      <SnowflakeIcon className="w-8 h-8 text-frost animate-pulse" />
      <p className="font-serif italic text-earth-light text-lg">
        Drawing the frost lines&hellip;
      </p>
    </div>
  );
}

const loadMap = () => import("@/components/FrostZoneMap");

const FrostZoneMapFull = dynamic(loadMap, { ssr: false, loading: () => <Skeleton /> });
const FrostZoneMapCompact = dynamic(loadMap, { ssr: false, loading: () => <Skeleton compact /> });

interface FrostZoneMapLoaderProps {
  focus?: FrostMapFocus;
  showPostcodeSearch?: boolean;
  compact?: boolean;
}

export default function FrostZoneMapLoader(props: FrostZoneMapLoaderProps) {
  const Map = props.compact ? FrostZoneMapCompact : FrostZoneMapFull;
  return <Map {...props} />;
}

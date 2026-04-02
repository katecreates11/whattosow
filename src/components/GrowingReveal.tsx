"use client";

import { useEffect, useRef } from "react";
import type { Rarity } from "@/data/varieties";
import "./GrowingReveal.css";

interface GrowingRevealProps {
  rarity: Rarity;
  illustrationSrc?: string;
  illustrationAlt?: string;
  onComplete: () => void;
}

const ANIMATION_DURATION: Record<Rarity, number> = {
  common: 2000,
  uncommon: 2000,
  rare: 2200,
  legendary: 3200,
};

const RARITY_LABELS: Record<Rarity, string> = {
  common: "A good pick.",
  uncommon: "Nice find!",
  rare: "Rare find!",
  legendary: "Legendary!",
};

export default function GrowingReveal({
  rarity,
  illustrationSrc,
  illustrationAlt,
  onComplete,
}: GrowingRevealProps) {
  const completedRef = useRef(false);

  const complete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    // Reduced motion: skip immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      complete();
      return;
    }

    // Auto-complete after animation finishes
    const timer = setTimeout(complete, ANIMATION_DURATION[rarity]);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rarity]);

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      (window as any).umami?.track("lucky-dip-animation-skip");
    }
    complete();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSkip();
    }
  };

  const showLabel = rarity !== "common";

  return (
    <div
      className={`growing-reveal growing-reveal--${rarity}`}
      role="button"
      tabIndex={0}
      aria-label="Growing reveal animation — tap to skip"
      onClick={handleSkip}
      onKeyDown={handleKeyDown}
    >
      {/* Rarity label — fades in after bloom, not shown for common */}
      {showLabel && (
        <div className="growing-reveal__label" aria-hidden="true">
          {RARITY_LABELS[rarity]}
        </div>
      )}

      {/* Bloom — crop icon pops in at the top of the stem */}
      <div className="growing-reveal__bloom" aria-hidden="true">
        {illustrationSrc ? (
          <img src={illustrationSrc} alt={illustrationAlt ?? ""} />
        ) : (
          <div className="growing-reveal__bloom-placeholder" />
        )}
      </div>

      {/* Leaves */}
      <div className="growing-reveal__leaf-left" aria-hidden="true" />
      <div className="growing-reveal__leaf-right" aria-hidden="true" />

      {/* Stem */}
      <div className="growing-reveal__stem" aria-hidden="true" />

      {/* Soil */}
      <div className="growing-reveal__soil" aria-hidden="true" />

      {/* Seed — drops in first, then fades */}
      <div className="growing-reveal__seed" aria-hidden="true" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { getVarietyById, type Rarity } from "@/data/varieties";
import RecipeSection from "@/components/RecipeSection";
import AffiliateButtons from "@/components/AffiliateButtons";

interface CardDetailProps {
  varietyId: string;
  onClose: () => void;
  onPlant: (varietyId: string) => void;
  isPlanted: boolean;
  gardenFull: boolean;
  collectedAt?: string;
}

const RARITY_BADGE: Record<Rarity, string> = {
  common: "bg-earth/10 text-earth-lighter",
  uncommon: "bg-leaf/15 text-allotment",
  rare: "bg-amber/15 text-amber",
  legendary: "bg-amber/20 text-amber",
};

export default function CardDetail({
  varietyId,
  onClose,
  onPlant,
  isPlanted,
  gardenFull,
  collectedAt,
}: CardDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const variety = getVarietyById(varietyId);

  // Track view on mount
  useEffect(() => {
    if (variety && typeof window !== "undefined" && window.umami) {
      window.umami.track("card-detail-view", { variety: varietyId, rarity: variety.rarity });
    }
  }, [varietyId, variety]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!variety) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-cream p-8 text-center">
          <p className="text-earth-lighter">Variety not found.</p>
          <button onClick={onClose} className="mt-4 text-sm text-allotment underline">Close</button>
        </div>
      </div>
    );
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const canPlant = !isPlanted && !gardenFull;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label={`${variety.name} details`}
    >
      <div
        ref={panelRef}
        className="bg-cream w-full max-w-lg my-4 sm:my-8 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-earth-lighter hover:text-earth transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-5 pr-8">
            <h2 className="text-3xl font-serif text-earth tracking-tight leading-tight mb-1">
              {variety.name}
            </h2>
            <p className="text-sm text-earth-lighter">{variety.cropSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
          </div>

          {/* Rarity badge */}
          <div className="mb-5">
            <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 ${RARITY_BADGE[variety.rarity]}`}>
              {variety.rarity}
            </span>
          </div>

          {/* Personality */}
          <p className="text-[15px] text-earth-light leading-relaxed font-serif italic mb-5">
            {variety.personality}
          </p>

          {/* Date collected */}
          {collectedAt && (
            <p className="text-xs text-earth-lighter mb-6">
              Discovered {new Date(collectedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}

          {/* Recipes */}
          <RecipeSection recipes={variety.recipes} />

          {/* Suppliers */}
          <AffiliateButtons
            suppliers={variety.seedSuppliers}
            variety={variety.id}
            rarity={variety.rarity}
            eventPrefix="card-detail"
          />

          {/* Plant / Garden actions */}
          <div className="mt-6 space-y-3">
            {isPlanted ? (
              <div className="w-full text-center text-sm font-medium text-allotment bg-allotment/10 px-5 py-3">
                Already growing in your garden
              </div>
            ) : gardenFull ? (
              <div className="w-full text-center text-sm font-medium text-earth-lighter bg-earth/8 px-5 py-3">
                Garden full — remove a crop to plant this
              </div>
            ) : (
              <button
                onClick={() => { onPlant(varietyId); onClose(); }}
                className="w-full text-sm font-semibold text-white bg-allotment hover:bg-allotment-dark transition-colors px-5 py-3"
              >
                Plant in garden
              </button>
            )}

            <a
              href={`/crops/${variety.cropSlug}`}
              className="block w-full text-center text-sm text-allotment hover:text-allotment-dark transition-colors py-2"
            >
              Read growing guide &rarr;
            </a>
          </div>

          {/* Bottom close */}
          <div className="mt-8 pt-6 border-t border-earth/8 text-center">
            <button
              onClick={onClose}
              className="text-sm text-earth-lighter hover:text-earth transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

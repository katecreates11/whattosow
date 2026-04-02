"use client";

import { useState } from "react";
import Link from "next/link";
import { useGarden } from "@/hooks/useGarden";
import CollectionGrid from "@/components/CollectionGrid";
import CardDetail from "@/components/CardDetail";
import GardenGrid from "@/components/GardenGrid";
import HarvestLog from "@/components/HarvestLog";

type Tab = "garden" | "collection";

export default function MyGardenClient() {
  const [activeTab, setActiveTab] = useState<Tab>("garden");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const {
    garden,
    loaded,
    plant,
    harvest,
    activePlots,
    harvestedPlots,
    gardenFull,
    isPlanted,
  } = useGarden();

  // Don't flash empty states before localStorage has hydrated
  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <p className="text-earth-lighter text-sm font-medium">
          Loading your garden&hellip;
        </p>
      </div>
    );
  }

  const collectedIds = new Set(garden.collection.map((c) => c.varietyId));
  const gardenName = garden.settings.gardenName ?? "My Allotment";

  const handleSlotTap = (slotIndex: number, varietyId?: string) => {
    // Occupied slots: could surface variety detail in future.
    // Empty slots: nudge toward Lucky Dip.
    if (!varietyId) {
      window.location.href = "/lucky-dip";
    }
    // Suppress unused-var lint — slotIndex kept for future use
    void slotIndex;
  };

  const handleHarvest = (slotIndex: number) => {
    harvest(slotIndex);
  };

  const gardenEmpty = garden.plots.length === 0;
  const collectionEmpty = garden.collection.length === 0;

  // Find collectedAt for selected card
  const selectedCollectedAt = selectedCardId
    ? garden.collection.find((c) => c.varietyId === selectedCardId)?.collectedAt
    : undefined;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-allotment-bg border-b border-earth/8 px-6 pt-12 pb-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl text-earth tracking-tight leading-[1.1] mb-4">
            {gardenName}
          </h1>
          <div className="flex flex-wrap gap-5 text-sm text-earth-lighter">
            <span>
              <strong className="text-earth font-semibold">
                {collectedIds.size}
              </strong>{" "}
              {collectedIds.size === 1 ? "variety" : "varieties"} discovered
            </span>
            <span>
              <strong className="text-earth font-semibold">
                {activePlots.length}
              </strong>{" "}
              {activePlots.length === 1 ? "crop" : "crops"} growing
            </span>
          </div>
        </div>
      </section>

      {/* ── Tab bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-earth/10 bg-cream sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 flex gap-0">
          {(["garden", "collection"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "px-5 py-4 text-sm font-semibold capitalize transition-colors duration-150",
                "border-b-2 -mb-px",
                activeTab === tab
                  ? "border-allotment text-allotment"
                  : "border-transparent text-earth-lighter hover:text-earth",
              ].join(" ")}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Garden tab */}
        {activeTab === "garden" && (
          <div>
            {gardenEmpty ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-3xl">🌱</p>
                <p className="text-earth font-serif text-xl leading-snug">
                  Your garden is waiting.
                </p>
                <p className="text-earth-lighter text-sm leading-relaxed max-w-xs mx-auto">
                  Discover your first seed to get started.
                </p>
                <Link
                  href="/lucky-dip"
                  className="
                    inline-block mt-2
                    text-[11px] font-bold tracking-[0.08em] uppercase
                    bg-allotment text-cream
                    px-5 py-2.5
                    hover:bg-allotment-dark transition-colors duration-150
                  "
                >
                  Try Lucky Dip
                </Link>
              </div>
            ) : (
              <>
                <GardenGrid
                  plots={activePlots}
                  totalSlots={garden.settings.totalSlots}
                  gardenFull={gardenFull}
                  onSlotTap={handleSlotTap}
                  onHarvest={handleHarvest}
                />
                <HarvestLog plots={harvestedPlots} />
              </>
            )}
          </div>
        )}

        {/* Collection tab */}
        {activeTab === "collection" && (
          <div>
            {collectionEmpty ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-3xl">🎲</p>
                <p className="text-earth font-serif text-xl leading-snug">
                  No varieties yet.
                </p>
                <p className="text-earth-lighter text-sm leading-relaxed max-w-xs mx-auto">
                  You haven&rsquo;t discovered any varieties yet. Try the Lucky
                  Dip!
                </p>
                <Link
                  href="/lucky-dip"
                  className="
                    inline-block mt-2
                    text-[11px] font-bold tracking-[0.08em] uppercase
                    bg-allotment text-cream
                    px-5 py-2.5
                    hover:bg-allotment-dark transition-colors duration-150
                  "
                >
                  Lucky Dip
                </Link>
              </div>
            ) : (
              <CollectionGrid
                collectedIds={collectedIds}
                onCardClick={(id) => setSelectedCardId(id)}
              />
            )}
          </div>
        )}
      </div>

      {/* ── Card detail modal ─────────────────────────────────────────── */}
      {selectedCardId && (
        <CardDetail
          varietyId={selectedCardId}
          onClose={() => setSelectedCardId(null)}
          onPlant={(id) => {
            plant(id);
            setSelectedCardId(null);
          }}
          isPlanted={isPlanted(selectedCardId)}
          gardenFull={gardenFull}
          collectedAt={selectedCollectedAt}
        />
      )}
    </>
  );
}

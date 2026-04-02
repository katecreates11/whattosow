"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useGarden } from "@/hooks/useGarden";
import CollectionGrid from "@/components/CollectionGrid";
import CardDetail from "@/components/CardDetail";
import HarvestLog from "@/components/HarvestLog";
import { varieties } from "@/data/varieties";

// Load Phaser garden dynamically (can't run server-side)
const PhaserGarden = dynamic(() => import("@/game/PhaserGarden"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px] bg-[#F5EFE0]">
      <p className="text-earth-lighter font-serif italic animate-pulse">
        Loading your allotment...
      </p>
    </div>
  ),
});

type Tab = "garden" | "collection" | "harvested";

export default function MyGardenClient() {
  const [activeTab, setActiveTab] = useState<Tab>("garden");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const {
    garden,
    loaded,
    plant,
    harvestedPlots,
    gardenFull,
    isPlanted,
  } = useGarden();

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-earth-lighter font-serif italic animate-pulse">
          Loading your garden...
        </p>
      </div>
    );
  }

  const collectedIds = new Set(garden.collection.map((c) => c.varietyId));
  const collectionEmpty = garden.collection.length === 0;

  const selectedCollectedAt = selectedCardId
    ? garden.collection.find((c) => c.varietyId === selectedCardId)?.collectedAt
    : undefined;

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "garden", label: "Garden" },
    { id: "collection", label: "Collection", count: collectedIds.size },
    { id: "harvested", label: "Harvested", count: harvestedPlots.length },
  ];

  return (
    <div className="bg-[#F5EFE0] min-h-screen">
      {/* Stats bar */}
      <div className="bg-cream border-b border-earth/8 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-earth tracking-tight">
              {garden.settings.gardenName}
            </h1>
          </div>
          <div className="flex gap-4 text-xs text-earth-lighter">
            <span>
              <strong className="text-earth font-semibold">{collectedIds.size}</strong>
              <span className="hidden sm:inline"> / {varieties.length}</span> found
            </span>
            <span>
              <strong className="text-earth font-semibold">{harvestedPlots.length}</strong> harvested
            </span>
          </div>
        </div>
      </div>

      {/* Tab bar — game-style, not corporate */}
      <div className="bg-[#2D5F3E] px-4">
        <div className="max-w-lg mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 py-3 text-xs font-bold tracking-[0.1em] uppercase text-center transition-all duration-200
                ${activeTab === tab.id
                  ? "bg-[#3D7A52] text-white"
                  : "text-white/50 hover:text-white/80"
                }
              `}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? "bg-white/20" : "bg-white/10"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "garden" && (
        <div>
          <PhaserGarden />
          <div className="text-center py-6 px-6">
            <Link
              href="/lucky-dip"
              className="text-sm text-allotment font-semibold hover:underline"
            >
              Discover new varieties &rarr;
            </Link>
          </div>
        </div>
      )}

      {activeTab === "collection" && (
        <div className="max-w-lg mx-auto px-4 py-6">
          {collectionEmpty ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-earth/10 flex items-center justify-center">
                <span className="text-2xl text-earth/30">?</span>
              </div>
              <p className="text-earth font-serif text-xl">
                No varieties discovered yet
              </p>
              <p className="text-earth-lighter text-sm max-w-xs mx-auto">
                Plant mystery seeds in your garden to discover and collect varieties.
              </p>
              <Link
                href="/lucky-dip"
                className="inline-block mt-2 text-[11px] font-bold tracking-[0.08em] uppercase bg-allotment text-white px-5 py-2.5 hover:bg-allotment-dark transition-colors"
              >
                Try Lucky Dip
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

      {activeTab === "harvested" && (
        <div className="max-w-lg mx-auto px-4 py-6">
          {harvestedPlots.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-earth/10 flex items-center justify-center">
                <span className="text-2xl text-earth/30">~</span>
              </div>
              <p className="text-earth font-serif text-xl">
                Nothing harvested yet
              </p>
              <p className="text-earth-lighter text-sm max-w-xs mx-auto">
                When your crops are ready, tap them in the garden to harvest.
              </p>
            </div>
          ) : (
            <HarvestLog plots={harvestedPlots} />
          )}
        </div>
      )}

      {/* Card detail modal */}
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
    </div>
  );
}

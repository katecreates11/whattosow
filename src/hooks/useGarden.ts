"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  type GardenData,
  loadGarden,
  saveGarden,
  createEmptyGarden,
} from "@/lib/garden-storage";
import { getVarietyById } from "@/data/varieties";
import { crops } from "@/data/crops";

export function useGarden() {
  const [garden, setGarden] = useState<GardenData>(createEmptyGarden);
  const [loaded, setLoaded] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setGarden(loadGarden());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveGarden(garden), 2000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [garden, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const handleBlur = () => saveGarden(garden);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBlur);
    };
  }, [garden, loaded]);

  const collect = useCallback((varietyId: string, source: "lucky-dip" | "manual" = "lucky-dip") => {
    setGarden((prev) => {
      if (prev.collection.some((c) => c.varietyId === varietyId)) return prev;
      return {
        ...prev,
        collection: [
          ...prev.collection,
          { varietyId, collectedAt: new Date().toISOString(), source },
        ],
        lastVarietyId: varietyId,
      };
    });
  }, []);

  const plant = useCallback((varietyId: string) => {
    setGarden((prev) => {
      const usedSlots = new Set(prev.plots.filter((p) => !p.harvested).map((p) => p.slotIndex));
      let nextSlot = -1;
      for (let i = 0; i < prev.settings.totalSlots; i++) {
        if (!usedSlots.has(i)) { nextSlot = i; break; }
      }
      if (nextSlot === -1) return prev;

      const variety = getVarietyById(varietyId);
      if (!variety) return prev;
      const crop = crops.find((c) => c.slug === variety.cropSlug);
      if (!crop) return prev;

      const sowDate = new Date();
      const harvestDate = new Date(sowDate.getTime() + crop.harvestWeeks * 7 * 24 * 60 * 60 * 1000);

      return {
        ...prev,
        plots: [
          ...prev.plots,
          {
            slotIndex: nextSlot,
            varietyId,
            sowDate: sowDate.toISOString(),
            plantOutDate: null,
            expectedHarvest: harvestDate.toISOString(),
            harvested: false,
            harvestedAt: null,
            lastTended: null,
            notes: "",
          },
        ],
      };
    });
  }, []);

  const tend = useCallback((slotIndex: number) => {
    setGarden((prev) => {
      const plot = prev.plots.find((p) => p.slotIndex === slotIndex && !p.harvested);
      if (!plot) return prev;

      // Can only tend once per day
      const now = new Date();
      if (plot.lastTended) {
        const lastDate = new Date(plot.lastTended);
        if (lastDate.toDateString() === now.toDateString()) return prev; // Already tended today
      }

      // Tending speeds up harvest by 12 hours
      const currentHarvest = new Date(plot.expectedHarvest);
      const speedUpMs = 12 * 60 * 60 * 1000;
      const newHarvest = new Date(currentHarvest.getTime() - speedUpMs);

      return {
        ...prev,
        plots: prev.plots.map((p) =>
          p.slotIndex === slotIndex
            ? { ...p, lastTended: now.toISOString(), expectedHarvest: newHarvest.toISOString() }
            : p
        ),
      };
    });
  }, []);

  const canTend = useCallback(
    (slotIndex: number) => {
      const plot = garden.plots.find((p) => p.slotIndex === slotIndex && !p.harvested);
      if (!plot || !plot.lastTended) return true;
      return new Date(plot.lastTended).toDateString() !== new Date().toDateString();
    },
    [garden.plots]
  );

  const harvest = useCallback((slotIndex: number) => {
    setGarden((prev) => ({
      ...prev,
      plots: prev.plots.map((p) =>
        p.slotIndex === slotIndex
          ? { ...p, harvested: true, harvestedAt: new Date().toISOString() }
          : p
      ),
    }));
  }, []);

  const unlockSlots = useCallback((count: number) => {
    setGarden((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        totalSlots: Math.min(prev.settings.totalSlots + count, 24),
      },
    }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setGarden((prev) => ({
      ...prev,
      settings: { ...prev.settings, email },
    }));
  }, []);

  const isCollected = useCallback(
    (varietyId: string) => garden.collection.some((c) => c.varietyId === varietyId),
    [garden.collection]
  );

  const isPlanted = useCallback(
    (varietyId: string) => garden.plots.some((p) => p.varietyId === varietyId && !p.harvested),
    [garden.plots]
  );

  const activePlots = garden.plots.filter((p) => !p.harvested);
  const harvestedPlots = garden.plots.filter((p) => p.harvested);
  const gardenFull = activePlots.length >= garden.settings.totalSlots;

  return {
    garden,
    loaded,
    collect,
    plant,
    tend,
    canTend,
    harvest,
    unlockSlots,
    setEmail,
    isCollected,
    isPlanted,
    activePlots,
    harvestedPlots,
    gardenFull,
  };
}

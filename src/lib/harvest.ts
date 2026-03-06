import { type Crop } from "@/data/crops";

export type SowingMethod = "indoors" | "outdoors" | "planted-out";

export interface HarvestEntry {
  crop: Crop;
  method: SowingMethod;
  sowDate: Date;
  plantOutDate: Date | null;
  harvestDate: Date;
  nextSowDate: Date | null;
  warnings: HarvestWarning[];
}

export interface HarvestWarning {
  type: "frost-risk" | "wrong-method" | "window-closed";
  message: string;
}

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

/**
 * Calculate harvest dates for a crop entry.
 */
export function calculateHarvest(
  crop: Crop,
  method: SowingMethod,
  sowDate: Date,
  lastFrostDate: Date
): HarvestEntry {
  const warnings: HarvestWarning[] = [];
  let plantOutDate: Date | null = null;
  let harvestDate: Date;

  if (method === "indoors") {
    if (crop.plantOutWeeks !== null) {
      plantOutDate = addWeeks(lastFrostDate, crop.plantOutWeeks);
      // If plant-out date is before sow date (they sowed late), shift it
      if (plantOutDate < sowDate) {
        plantOutDate = addWeeks(sowDate, 6);
      }
      harvestDate = addWeeks(plantOutDate, crop.harvestWeeks);
    } else {
      warnings.push({
        type: "wrong-method",
        message: `${crop.name} is best direct sown outdoors. We've calculated your harvest as if direct sown.`,
      });
      harvestDate = addWeeks(sowDate, crop.harvestWeeks);
    }

    if (crop.category !== "hardy" && plantOutDate && plantOutDate < lastFrostDate) {
      warnings.push({
        type: "frost-risk",
        message: `Your plant-out date falls before your last frost (${formatDateShort(lastFrostDate)}). Wait until after this date to plant out ${crop.name.toLowerCase()}.`,
      });
    }
  } else if (method === "outdoors") {
    harvestDate = addWeeks(sowDate, crop.harvestWeeks);

    if (crop.category !== "hardy" && sowDate < lastFrostDate) {
      warnings.push({
        type: "frost-risk",
        message: `You sowed ${crop.name.toLowerCase()} outdoors before your last frost date (${formatDateShort(lastFrostDate)}). Tender crops risk frost damage — consider covering them.`,
      });
    }
  } else {
    // planted-out
    harvestDate = addWeeks(sowDate, crop.harvestWeeks);

    if (crop.category !== "hardy" && sowDate < lastFrostDate) {
      warnings.push({
        type: "frost-risk",
        message: `You planted out ${crop.name.toLowerCase()} before your last frost date (${formatDateShort(lastFrostDate)}). Protect with fleece if frost is forecast.`,
      });
    }
  }

  const nextSowDate = crop.successionWeeks
    ? addWeeks(sowDate, crop.successionWeeks)
    : null;

  return {
    crop,
    method,
    sowDate,
    plantOutDate,
    harvestDate,
    nextSowDate,
    warnings,
  };
}

/**
 * Check which sowing methods are valid for a crop.
 */
export function getValidMethods(crop: Crop): { method: SowingMethod; disabled: boolean; reason?: string }[] {
  return [
    {
      method: "indoors",
      disabled: crop.sowIndoorsWeeks === null,
      reason: crop.sowIndoorsWeeks === null ? `${crop.name} is direct sown — it doesn't do well started indoors` : undefined,
    },
    {
      method: "outdoors",
      disabled: crop.directSowWeeks === null,
      reason: crop.directSowWeeks === null ? `${crop.name} should be started indoors first` : undefined,
    },
    {
      method: "planted-out",
      disabled: false,
    },
  ];
}

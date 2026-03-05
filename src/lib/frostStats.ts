/**
 * Precomputed frost statistics for the scrollytelling intro.
 * All values verified from the GeoJSON frost model — no runtime fetch needed.
 */

export interface FrostRegion {
  name: string;
  dayOfYear: number;
  dateLabel: string;
  seasonDays: number;
  color: string;
  caption: string;
}

// Day-of-year range for bar positioning
export const FROST_DAY_MIN = 95; // Isles of Scilly (5 April)
export const FROST_DAY_MAX = 161; // Shetland (10 June)

// Hero stat
export const FROST_HERO_DAYS = 66; // Shetland (161) − Scilly (95)

// Bookend regions for personalised comparison
export const FROST_CORNWALL_DAY = 97; // 7 April
export const FROST_SHETLAND_DAY = 161; // 10 June

export const FROST_STEPS: FrostRegion[] = [
  {
    name: "Cornwall",
    dayOfYear: 97,
    dateLabel: "7 April",
    seasonDays: 203,
    color: "#7BB369", // leaf green
    caption: "Growing season starts early. 203 days to play with.",
  },
  {
    name: "Manchester",
    dayOfYear: 120,
    dateLabel: "30 April",
    seasonDays: 161,
    color: "#00A29B", // teal
    caption: "Three weeks later. 161 frost-free days.",
  },
  {
    name: "Highland",
    dayOfYear: 141,
    dateLabel: "21 May",
    seasonDays: 123,
    color: "#7BA7C2", // frost blue
    caption: "Seven weeks after Cornwall. Every day counts.",
  },
];

import { type Crop } from "@/data/crops";
import { type WeekWeatherProfile } from "@/lib/weather-history";
import { type HarvestEntry } from "@/lib/harvest";
import { getDaylightHours, getDaylightDescription } from "@/lib/daylight";

export interface HarvestWeatherAdvice {
  summary: string; // "Warm and dry — good picking conditions"
  details: string[]; // crop-specific advice lines
  tempHigh: number;
  tempLow: number;
  rainMm: number;
  rainDays: number;
  sunshineHours: number;
  daylightHours: number;
  daylightNote: string;
}

/**
 * Generate crop-specific weather advice for a harvest date.
 * Combines historical weather profile with crop trait flags.
 */
export function generateHarvestAdvice(
  entries: HarvestEntry[],
  weather: WeekWeatherProfile,
  latitude: number,
  harvestDate: Date,
  firstAutumnFrostDate: Date
): HarvestWeatherAdvice {
  const details: string[] = [];
  const daylightHours = getDaylightHours(harvestDate, latitude);
  const daylightNote = getDaylightDescription(daylightHours);

  // General summary
  const summary = buildSummary(weather);

  // Crop-specific advice
  for (const entry of entries) {
    const crop = entry.crop;

    // Blight risk
    if (crop.blightRisk && weather.blightYears > 0) {
      const risk = weather.blightYears >= 3 ? "high" : weather.blightYears >= 2 ? "moderate" : "low";
      if (risk === "high") {
        details.push(
          `${crop.name}: Blight conditions occurred in ${weather.blightYears} of the last ${weather.yearsAnalysed} years around this date. Pick at the first sign of brown patches — don't wait for everything to ripen.`
        );
      } else if (risk === "moderate") {
        details.push(
          `${crop.name}: Blight is possible — it's occurred ${weather.blightYears} of the last ${weather.yearsAnalysed} years this week. Check leaves regularly and pick early if spots appear.`
        );
      } else {
        details.push(
          `${crop.name}: Blight risk is low for this week historically, but stay vigilant in warm humid spells.`
        );
      }
    }

    // Curing crops need dry conditions
    if (crop.needsCuring) {
      if (weather.avgRainMm > 15) {
        details.push(
          `${crop.name}: This week typically sees ${weather.avgRainMm}mm of rain. Cure indoors in a dry, airy spot rather than on the plot.`
        );
      } else if (weather.avgRainDays >= 3) {
        details.push(
          `${crop.name}: Expect ${weather.avgRainDays} days of rain this week on average. Have somewhere dry and ventilated ready for curing.`
        );
      } else {
        details.push(
          `${crop.name}: Typically dry enough to cure outdoors this week. Lay them out in the sun for a few days before storing.`
        );
      }
    }

    // Bolting risk for successional sowings
    if (crop.boltsInHeat && entry.nextSowDate) {
      if (weather.avgHighC >= 25) {
        details.push(
          `${crop.name}: Your next sowing falls in a week that typically hits ${weather.avgHighC}°C. Sow in partial shade and water well to prevent bolting.`
        );
      } else if (weather.avgHighC >= 22) {
        details.push(
          `${crop.name}: Warm weather ahead (avg ${weather.avgHighC}°C). Pick leaves young before they turn bitter, and sow the next batch in a shadier spot.`
        );
      }
    }

    // Root veg lifting conditions
    if (crop.liftFromSoil) {
      if (weather.avgSoilMoisture > 0.35) {
        details.push(
          `${crop.name}: Soil tends to be moist this week — good for lifting without snapping roots. If it's been very wet, let them dry before storing.`
        );
      } else if (weather.avgSoilMoisture < 0.2) {
        details.push(
          `${crop.name}: Soil is often dry this week. Water the bed the evening before you dig to make lifting easier.`
        );
      }
    }

    // Tall crops and wind
    if (crop.tallCrop && weather.avgWindGustsKmh > 40) {
      details.push(
        `${crop.name}: Wind gusts average ${weather.avgWindGustsKmh}km/h this week. Check stakes and ties — harvest before any storm if pods or cobs are ready.`
      );
    }

    // Autumn frost proximity
    const daysToAutumnFrost = Math.round(
      (firstAutumnFrostDate.getTime() - entry.harvestDate.getTime()) /
        (24 * 60 * 60 * 1000)
    );
    if (daysToAutumnFrost <= 14 && daysToAutumnFrost > 0 && crop.category !== "hardy") {
      details.push(
        `${crop.name}: Your first autumn frost is typically around ${firstAutumnFrostDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} — only ${daysToAutumnFrost} days after this harvest. Don't leave tender crops out too long.`
      );
    } else if (daysToAutumnFrost <= 0 && crop.category !== "hardy") {
      details.push(
        `${crop.name}: This harvest falls after your typical first autumn frost. Pick everything before the cold arrives, or protect with fleece.`
      );
    }
  }

  return {
    summary,
    details,
    tempHigh: weather.avgHighC,
    tempLow: weather.avgLowC,
    rainMm: weather.avgRainMm,
    rainDays: weather.avgRainDays,
    sunshineHours: weather.avgSunshineHours,
    daylightHours,
    daylightNote,
  };
}

function buildSummary(w: WeekWeatherProfile): string {
  const warm = w.avgHighC >= 20;
  const hot = w.avgHighC >= 25;
  const cool = w.avgHighC < 15;
  const dry = w.avgRainMm < 8;
  const wet = w.avgRainMm > 20;
  const sunny = w.avgSunshineHours >= 6;

  if (hot && dry) return "Hot and dry — water crops well before harvesting";
  if (warm && dry && sunny) return "Warm and sunny — ideal picking conditions";
  if (warm && dry) return "Warm and dry — good conditions for harvesting";
  if (warm && wet) return "Warm but wet — pick between showers and dry crops before storing";
  if (cool && wet) return "Cool and damp — harvest promptly and dry everything indoors";
  if (cool && dry) return "Cool but dry — decent conditions for a harvest day";
  if (wet) return "A wet week typically — plan for indoor drying and don't leave crops on wet soil";
  if (sunny) return "Good sunshine — nice conditions for a day at the plot";
  return "Mixed conditions — check the forecast closer to the date";
}

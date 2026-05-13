"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useGarden } from "@/hooks/useGarden";
import { selectVariety, type SelectedVariety } from "@/lib/lucky-dip-selection";
import { getWeatherBonus, type WeatherBonus } from "@/lib/weather-bonus";
import GrowingReveal from "@/components/GrowingReveal";
import VarietyCard from "@/components/VarietyCard";
import RecipeSection from "@/components/RecipeSection";
import AffiliateButtons from "@/components/AffiliateButtons";
import EmailCapture from "@/components/EmailCapture";
import { varieties } from "@/data/varieties";
import { crops, type Crop } from "@/data/crops";
import { loadLocation } from "@/lib/location-storage";

type Phase = "hero" | "animating" | "result";

// Existing crop illustrations — will be replaced with custom botanical illustrations
const CROP_ILLUSTRATIONS: Record<string, string> = {
  tomatoes: "/images/crops/tomatoes.png",
  carrots: "/images/crops/carrots.png",
  peas: "/images/crops/peas.png",
  beetroot: "/images/crops/beetroot.png",
  "broad-beans": "/images/crops/broad-beans.png",
  courgettes: "/images/crops/courgette.png",
  kale: "/images/crops/kale.png",
  lettuce: "/images/crops/lettuce.png",
  "onion-sets": "/images/crops/onions.png",
  "early-potatoes": "/images/crops/potato.png",
  "maincrop-potatoes": "/images/crops/potato.png",
  radishes: "/images/crops/radishes.png",
  spinach: "/images/crops/spinach.png",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function categoryLabel(cat: Crop["category"]): string {
  switch (cat) {
    case "hardy":
      return "Hardy";
    case "half-hardy":
      return "Half-hardy";
    case "tender":
      return "Tender";
  }
}

function generateWhyNow(crop: Crop, varietyName: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const avgLastFrost = new Date(year, 3, 15);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksToFrost = (avgLastFrost.getTime() - now.getTime()) / msPerWeek;
  const weeksAfterFrost = -weeksToFrost;
  const window = 3;
  const month = MONTH_NAMES[now.getMonth()];

  // Check which sowing action is currently active
  if (crop.sowIndoorsWeeks !== null) {
    const target = -crop.sowIndoorsWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) {
      return `${month} is the perfect time to start ${varietyName} indoors. Get them going on a warm windowsill now and they'll be ready to plant out after the last frost.`;
    }
  }

  if (crop.directSowWeeks !== null) {
    const target = -crop.directSowWeeks;
    const diff = weeksToFrost - target;
    if (diff >= -window && diff <= window) {
      return `${varietyName} can go straight in the ground right now. ${month} conditions are just right — sow directly where they're going to grow and let nature do the rest.`;
    }
  }

  if (crop.plantOutWeeks !== null) {
    const diff = weeksAfterFrost - crop.plantOutWeeks;
    if (diff >= -window && diff <= window) {
      return `Time to get ${varietyName} outside. The frost risk is fading and they'll love the longer days. Plant them out now and they'll establish quickly.`;
    }
  }

  // Fallback
  return `${varietyName} is sowable right now. ${month} is a great time to get started — you'll thank yourself later in the season.`;
}

export default function LuckyDipClient() {
  const garden = useGarden();
  const [phase, setPhase] = useState<Phase>("hero");
  const [selected, setSelected] = useState<SelectedVariety | null>(null);
  const [weatherBonus, setWeatherBonus] = useState<WeatherBonus>({
    type: null,
    label: null,
    boostedSlugs: [],
  });
  const [isFirstEver, setIsFirstEver] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [plantConfirmation, setPlantConfirmation] = useState<string | null>(null);
  const [nothingSowable, setNothingSowable] = useState(false);

  // Track first-ever state from garden data
  useEffect(() => {
    if (garden.loaded) {
      setIsFirstEver(garden.garden.collection.length === 0);
    }
  }, [garden.loaded, garden.garden.collection.length]);

  // Fetch weather bonus on mount
  useEffect(() => {
    const loc = loadLocation();
    if (loc) {
      getWeatherBonus(loc.latitude, loc.longitude).then(setWeatherBonus);
    } else {
      getWeatherBonus(null, null).then(setWeatherBonus);
    }
  }, []);

  const handlePlantSeed = useCallback(() => {
    const result = selectVariety(
      garden.garden.lastVarietyId,
      weatherBonus,
      isFirstEver
    );

    if (!result) {
      setNothingSowable(true);
      return;
    }

    setSelected(result);
    setNothingSowable(false);
    setPhase("animating");

    // Track umami event
    if (typeof window !== "undefined" && (window as unknown as { umami?: { track: (event: string, data: Record<string, string>) => void } }).umami) {
      (window as unknown as { umami: { track: (event: string, data: Record<string, string>) => void } }).umami.track("lucky-dip-discover", {
        variety: result.variety.id,
        rarity: result.displayRarity,
        cropSlug: result.variety.cropSlug,
        weatherBonus: weatherBonus.type ?? "none",
      });
    }
  }, [garden.garden.lastVarietyId, weatherBonus, isFirstEver]);

  const handleRevealComplete = useCallback(() => {
    if (!selected) return;

    garden.collect(selected.variety.id);

    if (isFirstEver) {
      garden.plant(selected.variety.id);
      setShowWelcome(true);
    }

    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selected, garden, isFirstEver]);

  const handlePlantInGarden = useCallback(() => {
    if (!selected) return;
    garden.plant(selected.variety.id);
    setPlantConfirmation(`${selected.variety.name} is now growing in your garden!`);
    setTimeout(() => setPlantConfirmation(null), 3000);
  }, [selected, garden]);

  const handlePlantAnother = useCallback(() => {
    setPhase("hero");
    setSelected(null);
    setShowWelcome(false);
    setPlantConfirmation(null);
    setIsFirstEver(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Hero state
  if (phase === "hero") {
    return (
      <section className="relative min-h-[85vh] flex flex-col items-center justify-end text-center overflow-hidden">
        {/* Allotment illustration background */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <img
            src="/images/headers/hero-allotment.webp"
            alt=""
            aria-hidden="true"
            className="w-full max-w-4xl object-contain object-bottom opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/80 to-cream/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-16 sm:pb-24 flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-allotment/60 mb-4 block">
            The Lucky Dip
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-earth tracking-tight leading-[0.95] mb-5">
            Not sure what<br />to grow?
          </h1>
          <p className="text-lg text-earth-light max-w-sm mb-10 leading-relaxed">
            Plant a mystery seed and see what comes up. Discover varieties you&apos;d never have tried.
          </p>

          {weatherBonus.label && (
            <div className="mb-6 inline-flex items-center gap-2.5 bg-leaf/10 border border-leaf/20 text-allotment text-sm font-semibold px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
              {weatherBonus.label}
            </div>
          )}

          {nothingSowable ? (
            <div className="max-w-md">
              <p className="text-earth-light mb-4">
                The garden rests in winter — check back soon.
              </p>
              <Link
                href="/calendar"
                className="text-allotment font-semibold hover:underline"
              >
                View the sowing calendar &rarr;
              </Link>
            </div>
          ) : (
            <button
              onClick={handlePlantSeed}
              className="group relative bg-allotment text-white text-lg font-semibold px-12 py-5 hover:bg-allotment-dark transition-all duration-300 hover:shadow-lg hover:shadow-allotment/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 focus:ring-offset-cream"
            >
              <span className="relative z-10">Plant a mystery seed</span>
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {garden.loaded && (
            <p className="text-sm text-earth-lighter mt-8">
              {garden.garden.collection.length === 0 ? (
                <>182 varieties waiting to be discovered</>
              ) : (
                <>
                  {garden.garden.collection.length} of {varieties.length} varieties discovered
                </>
              )}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Animating state
  if (phase === "animating" && selected) {
    return (
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1a2a1a] via-[#1e3320] to-[#2a3a20]">
        {/* Subtle starfield / atmosphere */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.25), transparent), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.15), transparent)",
        }} />
        <GrowingReveal
          rarity={selected.displayRarity}
          illustrationSrc={
            CROP_ILLUSTRATIONS[selected.variety.cropSlug] || undefined
          }
          illustrationAlt={selected.variety.name}
          onComplete={handleRevealComplete}
        />
        <p className="text-white/30 text-sm mt-8 animate-pulse">
          Tap to skip
        </p>
      </section>
    );
  }

  // Result state
  if (phase === "result" && selected) {
    const crop = selected.crop;
    const alreadyPlanted = garden.isPlanted(selected.variety.id);
    const rarityLabel = selected.displayRarity === "legendary" ? "Legendary!" : selected.displayRarity === "rare" ? "Rare find!" : selected.displayRarity === "uncommon" ? "Nice find!" : "A good pick.";
    const rarityColour = selected.displayRarity === "legendary" || selected.displayRarity === "rare" ? "text-amber" : selected.displayRarity === "uncommon" ? "text-leaf" : "text-earth-lighter";

    return (
      <div>
        {/* Rarity announcement bar */}
        <div className={`text-center py-3 ${selected.displayRarity === "legendary" ? "bg-amber/10" : selected.displayRarity === "rare" ? "bg-amber/5" : "bg-sage/30"}`}>
          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${rarityColour}`}>
            {rarityLabel}
          </span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        {/* Welcome banner for first-timers */}
        {showWelcome && (
          <div className="bg-allotment/5 border border-allotment/15 p-6 mb-10">
            <p className="font-serif text-lg text-earth mb-1">
              Welcome to your garden.
            </p>
            <p className="text-sm text-earth-light mb-4">
              You&apos;ve planted your first seed. Visit your garden to watch it grow.
            </p>
            <div className="flex gap-4">
              <Link
                href="/my-garden"
                className="text-sm font-semibold text-allotment hover:underline"
              >
                Go to my garden &rarr;
              </Link>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-sm text-earth-lighter hover:text-earth-light"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* a. Variety card */}
        <VarietyCard
          variety={selected.variety}
          displayRarity={selected.displayRarity}
          seasonalBadge={selected.seasonalBadge}
          cropName={crop.name}
          categoryLabel={categoryLabel(crop.category)}
        />

        {/* b. Why now section */}
        <div className="my-10">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-3">
            Why now
          </span>
          <p className="text-[15px] text-earth-light leading-relaxed font-serif">
            {generateWhyNow(crop, selected.variety.name)}
          </p>
        </div>

        {/* c. Affiliate buttons */}
        <AffiliateButtons
          suppliers={selected.variety.seedSuppliers}
          variety={selected.variety.id}
          rarity={selected.displayRarity}
        />

        {/* d. Quick stats grid */}
        <div className="grid grid-cols-2 gap-3 my-10">
          <div className="bg-sage/20 p-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-1">
              Harvest
            </span>
            <p className="text-earth font-semibold">
              {crop.harvestWeeks} weeks
            </p>
          </div>
          <div className="bg-sage/20 p-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-1">
              Spacing
            </span>
            <p className="text-earth font-semibold">{crop.spacingCm}cm</p>
          </div>
          <div className="bg-sage/20 p-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-1">
              Category
            </span>
            <p className="text-earth font-semibold">
              {categoryLabel(crop.category)}
            </p>
          </div>
          <div className="bg-sage/20 p-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-1">
              Rarity
            </span>
            <p className="text-earth font-semibold capitalize">
              {selected.displayRarity}
            </p>
          </div>
        </div>

        {/* e. Recipes */}
        <RecipeSection recipes={selected.variety.recipes} />

        {/* f. Plant in garden button */}
        <div className="my-10">
          {plantConfirmation ? (
            <p className="text-allotment font-semibold text-center py-3">
              {plantConfirmation}
            </p>
          ) : alreadyPlanted ? (
            <p className="text-earth-lighter text-center text-sm py-3">
              Already growing in your garden
            </p>
          ) : garden.gardenFull ? (
            <div className="text-center">
              <p className="text-earth-light text-sm mb-2">
                Your allotment is thriving! Save your garden to unlock more space.
              </p>
              <Link
                href="/my-garden"
                className="text-sm font-semibold text-allotment hover:underline"
              >
                Manage your garden &rarr;
              </Link>
            </div>
          ) : (
            <button
              onClick={handlePlantInGarden}
              className="w-full bg-leaf/10 text-allotment font-semibold py-3 hover:bg-leaf/20 transition-colors focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2"
            >
              Plant in your garden
            </button>
          )}
        </div>

        {/* g. Growing guide link */}
        <div className="my-8 text-center">
          <Link
            href={`/crops/${selected.variety.cropSlug}`}
            className="text-allotment font-semibold hover:underline"
          >
            Read the full growing guide &rarr;
          </Link>
        </div>

        {/* h. Email capture */}
        <div className="my-10">
          {garden.garden.settings.email ? (
            <div className="bg-allotment-bg rounded-xl p-5 sm:p-6">
              <h3 className="text-lg font-bold text-earth mb-1">
                Get a mystery seed every week
              </h3>
              <p className="text-sm text-earth-light">
                You&apos;re already signed up — check your inbox each Monday for a new discovery.
              </p>
            </div>
          ) : (
            <EmailCapture variant="full" />
          )}
        </div>

        {/* i. Plant another */}
        {/* Plant another */}
        <div className="text-center pt-8 pb-10 border-t border-earth/8 mt-10">
          <button
            onClick={handlePlantAnother}
            className="group relative bg-allotment text-white text-lg font-semibold px-12 py-5 hover:bg-allotment-dark transition-all duration-300 hover:shadow-lg hover:shadow-allotment/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2"
          >
            Plant another mystery seed
          </button>
          <p className="text-sm text-earth-lighter mt-6">
            {garden.garden.collection.length} of {varieties.length} varieties discovered
          </p>
        </div>
        </div>
      </div>
    );
  }

  return null;
}

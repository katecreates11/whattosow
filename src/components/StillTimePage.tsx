"use client";

import { useState, useEffect, useCallback } from "react";
import { crops } from "@/data/crops";
import { getCropUrgencies, CropUrgency } from "@/lib/urgency";
import { calculateLastFrostDate, LocationData } from "@/lib/frost";
import { getAvgFrostDate } from "@/lib/calendar";
import ContextualEmailCapture from "@/components/ContextualEmailCapture";
import Link from "next/link";

type GroupName = "All" | "Alliums" | "Legumes" | "Brassicas" | "Roots" | "Potatoes" | "Salads" | "Tender" | "Stems" | "Herbs";

const CROP_GROUPS: Record<string, GroupName> = {
  "garlic": "Alliums",
  "onion-sets": "Alliums",
  "leeks": "Alliums",
  "spring-onions": "Alliums",
  "broad-beans": "Legumes",
  "peas": "Legumes",
  "french-beans": "Legumes",
  "runner-beans": "Legumes",
  "broccoli": "Brassicas",
  "brussels-sprouts": "Brassicas",
  "cabbage": "Brassicas",
  "cauliflower": "Brassicas",
  "kale": "Brassicas",
  "pak-choi": "Brassicas",
  "beetroot": "Roots",
  "carrots": "Roots",
  "parsnips": "Roots",
  "radishes": "Roots",
  "turnips": "Roots",
  "early-potatoes": "Potatoes",
  "maincrop-potatoes": "Potatoes",
  "lettuce": "Salads",
  "rocket": "Salads",
  "spinach": "Salads",
  "swiss-chard": "Salads",
  "aubergine": "Tender",
  "chillies": "Tender",
  "courgettes": "Tender",
  "cucumbers": "Tender",
  "peppers": "Tender",
  "pumpkins": "Tender",
  "squash": "Tender",
  "sweetcorn": "Tender",
  "tomatoes": "Tender",
  "celery": "Stems",
  "fennel": "Stems",
  "basil": "Herbs",
  "coriander": "Herbs",
  "dill": "Herbs",
  "parsley": "Herbs",
};

const GROUP_COLOURS: Record<GroupName, string> = {
  "All":      "bg-earth/8 text-earth border-earth/15 hover:bg-earth/15",
  "Alliums":  "bg-[#E8D5C4]/60 text-[#7A4A38] border-[#D4A8A0]/40 hover:bg-[#D4A8A0]/60",
  "Legumes":  "bg-[#D4E8C4]/60 text-[#3A6A30] border-[#A8C4A0]/40 hover:bg-[#A8C4A0]/60",
  "Brassicas":"bg-[#C4D8E8]/60 text-[#2A5070] border-[#A0B8CC]/40 hover:bg-[#A0B8CC]/60",
  "Roots":    "bg-[#E8E0C4]/60 text-[#6A5820] border-[#D4C490]/40 hover:bg-[#D4C490]/60",
  "Potatoes": "bg-[#E0D4E8]/60 text-[#5A3A70] border-[#B8A8CC]/40 hover:bg-[#B8A8CC]/60",
  "Salads":   "bg-[#C4E8D8]/60 text-[#2A6A50] border-[#A0C4B4]/40 hover:bg-[#A0C4B4]/60",
  "Tender":   "bg-[#E8D4C4]/60 text-[#7A4A28] border-[#D4B090]/40 hover:bg-[#D4B090]/60",
  "Stems":    "bg-[#D8E8C4]/60 text-[#3A5A28] border-[#B4C4A0]/40 hover:bg-[#B4C4A0]/60",
  "Herbs":    "bg-[#E8C4D4]/60 text-[#6A2A48] border-[#C4A0B0]/40 hover:bg-[#C4A0B0]/60",
};

const GROUP_ACTIVE: Record<GroupName, string> = {
  "All":      "!bg-earth text-cream border-earth",
  "Alliums":  "!bg-[#D4A8A0] text-white border-[#D4A8A0]",
  "Legumes":  "!bg-[#A8C4A0] text-white border-[#A8C4A0]",
  "Brassicas":"!bg-[#A0B8CC] text-white border-[#A0B8CC]",
  "Roots":    "!bg-[#D4C490] text-white border-[#D4C490]",
  "Potatoes": "!bg-[#B8A8CC] text-white border-[#B8A8CC]",
  "Salads":   "!bg-[#A0C4B4] text-white border-[#A0C4B4]",
  "Tender":   "!bg-[#D4B090] text-white border-[#D4B090]",
  "Stems":    "!bg-[#B4C4A0] text-white border-[#B4C4A0]",
  "Herbs":    "!bg-[#C4A0B0] text-white border-[#C4A0B0]",
};

const ALL_GROUPS: GroupName[] = ["All", "Alliums", "Legumes", "Brassicas", "Roots", "Potatoes", "Salads", "Tender", "Stems", "Herbs"];

const STORAGE_KEY = "whattosow_location";

function UrgencyBadge({ level, daysLeft }: { level: CropUrgency["level"]; daysLeft: number }) {
  const colors = {
    red: "bg-tomato/15 text-tomato border-tomato/20",
    amber: "bg-amber/15 text-amber border-amber/20",
    green: "bg-leaf/15 text-allotment border-leaf/20",
  };

  const label =
    daysLeft <= 1
      ? "Last day"
      : daysLeft <= 7
        ? `${daysLeft} days left`
        : daysLeft <= 14
          ? `${Math.ceil(daysLeft / 7)} weeks left`
          : `${Math.ceil(daysLeft / 7)} weeks left`;

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[level]}`}>
      {label}
    </span>
  );
}

function ActionLabel({ action }: { action: CropUrgency["action"] }) {
  const icons: Record<string, string> = {
    "sow indoors": "🏠",
    "direct sow": "🌱",
    "plant out": "🌿",
  };
  return (
    <span className="text-xs text-earth-lighter">
      {icons[action]} {action.charAt(0).toUpperCase() + action.slice(1)}
    </span>
  );
}

export default function StillTimePage() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [ready, setReady] = useState(false);
  const [activeGroup, setActiveGroup] = useState<GroupName>("All");

  const loadLocation = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setLocation(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    loadLocation();
    window.addEventListener("whattosow:location-updated", loadLocation);
    return () => window.removeEventListener("whattosow:location-updated", loadLocation);
  }, [loadLocation]);

  const now = new Date();
  const frostDate = location
    ? calculateLastFrostDate(location.latitude, location.longitude)
    : getAvgFrostDate();

  const { urgent, justMissed } = getCropUrgencies(crops, now, frostDate);
  const district = location?.adminDistrict;

  const filteredUrgent = activeGroup === "All"
    ? urgent
    : urgent.filter(item => CROP_GROUPS[item.crop.slug] === activeGroup);

  const filteredJustMissed = activeGroup === "All"
    ? justMissed
    : justMissed.filter(item => CROP_GROUPS[item.crop.slug] === activeGroup);

  const availableGroups = ALL_GROUPS.filter(g =>
    g === "All" || urgent.some(item => CROP_GROUPS[item.crop.slug] === g)
  );

  if (!ready) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-earth/5 rounded w-3/4" />
          <div className="h-6 bg-earth/5 rounded w-1/2" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-earth/5 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero stat */}
      <div className="mb-10 sm:mb-14">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-tomato/70 mb-3 sm:mb-4 block">
          Closing windows
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-earth tracking-tight leading-tight mb-3">
          You have{" "}
          <span className="text-allotment font-normal">{urgent.length} crop{urgent.length !== 1 ? "s" : ""}</span>{" "}
          you can still sow this week
          {district ? (
            <span className="text-earth-light"> in {district}</span>
          ) : (
            <span className="text-earth-light"> in the UK</span>
          )}
        </h1>
        {!location && (
          <p className="text-sm text-earth-lighter">
            <Link href="/#main-content" className="text-allotment hover:text-allotment-dark underline underline-offset-2">
              Enter your postcode
            </Link>{" "}
            for dates personalised to your area.
          </p>
        )}
        {location && (
          <p className="text-sm text-earth-lighter">
            Based on your frost date in {district}.{" "}
            <Link href="/#main-content" className="text-allotment hover:text-allotment-dark underline underline-offset-2">
              Change location
            </Link>
          </p>
        )}
      </div>

      {/* Group filters */}
      {urgent.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {availableGroups.map(group => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`px-3.5 py-1.5 text-xs font-semibold border rounded-full transition-all duration-150 ${
                activeGroup === group
                  ? GROUP_ACTIVE[group]
                  : GROUP_COLOURS[group]
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      )}

      {/* Urgency cards */}
      {filteredUrgent.length > 0 ? (
        <div className="space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          {filteredUrgent.map((item) => (
            <Link
              key={`${item.crop.slug}-${item.action}`}
              href={`/crops/${item.crop.slug}`}
              onClick={() => {
                if (typeof window !== 'undefined' && window.umami) {
                  window.umami.track('urgency-crop-click', {
                    crop: item.crop.name,
                    action: item.action,
                    daysLeft: item.daysLeft,
                    level: item.level,
                  });
                }
              }}
              className="block border border-earth/8 hover:border-earth/20 transition-colors duration-200 p-5 sm:p-6 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold text-earth text-lg group-hover:text-allotment transition-colors">
                    {item.crop.name}
                  </h2>
                  <ActionLabel action={item.action} />
                  <p className="text-sm text-earth-lighter mt-1.5 line-clamp-2">
                    Deadline: {item.deadline.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
                  </p>
                </div>
                <div className="shrink-0">
                  <UrgencyBadge level={item.level} daysLeft={item.daysLeft} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-earth/8 p-8 text-center mb-12 sm:mb-16">
          <p className="text-earth-light">
            {activeGroup === "All"
              ? "No crops with closing sowing windows right now. Check back soon — new windows open every week."
              : `No ${activeGroup.toLowerCase()} with closing sowing windows right now.`}
          </p>
        </div>
      )}

      {/* Just missed */}
      {filteredJustMissed.length > 0 && (
        <div className="mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-earth-lighter mb-4 block">
            Just missed
          </span>
          <div className="space-y-2">
            {filteredJustMissed.map((item) => (
              <div
                key={`${item.crop.slug}-${item.action}-missed`}
                className="border border-earth/6 p-4 opacity-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-medium text-earth text-sm">{item.crop.name}</span>
                    <span className="text-xs text-earth-lighter ml-2">
                      {item.action}
                    </span>
                  </div>
                  <span className="text-xs text-earth-lighter">
                    Too late this year
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email capture */}
      <section aria-label="Newsletter signup" className="mb-10">
        <div className="bg-allotment-bg/40 p-6 sm:p-8 rounded-xl">
          <p className="text-center text-sm text-earth-lighter mb-4">
            Never miss a sowing window — get weekly reminders
          </p>
          <div className="max-w-lg mx-auto">
            <ContextualEmailCapture />
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-allotment hover:text-allotment-dark transition-colors"
        >
          &larr; Back to What To Sow
        </Link>
      </div>
    </div>
  );
}

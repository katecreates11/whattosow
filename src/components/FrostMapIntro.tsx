"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  FROST_HERO_DAYS,
  FROST_STEPS,
  FROST_DAY_MIN,
  FROST_DAY_MAX,
  FROST_CORNWALL_DAY,
  FROST_SHETLAND_DAY,
} from "@/lib/frostStats";
import {
  calculateLastFrostDate,
  calculateFirstAutumnFrostDate,
} from "@/lib/frost";

const STORAGE_KEY = "whattosow_location";

interface StoredLocation {
  latitude: number;
  longitude: number;
  postcode: string;
  adminDistrict: string;
}

interface PersonalisedData {
  adminDistrict: string;
  frostDateLabel: string;
  frostDayOfYear: number;
  seasonDays: number;
  daysBehindCornwall: number;
  daysAheadOfShetland: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function loadPersonalised(): PersonalisedData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const loc: StoredLocation = JSON.parse(raw);
    if (!loc.latitude || !loc.longitude || !loc.adminDistrict) return null;

    const springDate = calculateLastFrostDate(loc.latitude, loc.longitude);
    const autumnDate = calculateFirstAutumnFrostDate(
      loc.latitude,
      loc.longitude
    );
    const springDay = getDayOfYear(springDate);
    const autumnDay = getDayOfYear(autumnDate);

    return {
      adminDistrict: loc.adminDistrict,
      frostDateLabel: springDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      }),
      frostDayOfYear: springDay,
      seasonDays: autumnDay - springDay,
      daysBehindCornwall: Math.max(0, springDay - FROST_CORNWALL_DAY),
      daysAheadOfShetland: Math.max(0, FROST_SHETLAND_DAY - springDay),
    };
  } catch {
    return null;
  }
}

export default function FrostMapIntro() {
  const [heroCount, setHeroCount] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [personalised, setPersonalised] = useState<PersonalisedData | null>(
    null
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countStarted = useRef(false);

  // Load personalisation on mount
  useEffect(() => {
    setPersonalised(loadPersonalised());
  }, []);

  // Count-up animation (used for generic hero only)
  const startCount = useCallback(() => {
    if (countStarted.current) return;
    countStarted.current = true;

    const duration = 1500;
    let start: number | null = null;

    function tick(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setHeroCount(Math.round(eased * FROST_HERO_DAYS));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setHeroVisible(true);
      setHeroCount(FROST_HERO_DAYS);
      const stepCount = personalised ? 1 : FROST_STEPS.length;
      setActiveStep(stepCount - 1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === heroRef.current) {
            setHeroVisible(true);
            if (!personalised) startCount();
            return;
          }

          const stepIndex = stepRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (stepIndex !== -1) {
            setActiveStep((prev) => Math.max(prev, stepIndex));
          }
        });
      },
      { threshold: 0.4 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [startCount, personalised]);

  // Steps to render
  const steps = personalised ? [] : FROST_STEPS;

  // Bar width
  const barWidth = personalised
    ? activeStep >= 0
      ? ((personalised.frostDayOfYear - FROST_DAY_MIN) /
          (FROST_DAY_MAX - FROST_DAY_MIN)) *
        100
      : 0
    : activeStep < 0
      ? 0
      : ((FROST_STEPS[activeStep].dayOfYear - FROST_DAY_MIN) /
          (FROST_DAY_MAX - FROST_DAY_MIN)) *
        100;

  return (
    <div className="frost-intro">
      {/* Hero stat — full viewport */}
      <div
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      >
        <div
          className={`frost-hero-content ${heroVisible ? "frost-hero-revealed" : ""}`}
        >
          {personalised ? (
            <>
              <p
                className="font-bold tabular-nums"
                style={{
                  fontSize: "clamp(3.5rem, 12vw, 7rem)",
                  lineHeight: 1,
                  color: "#00A29B",
                }}
              >
                {personalised.frostDateLabel}
              </p>
              <p className="text-xl sm:text-2xl text-earth-light max-w-md mx-auto mt-4 leading-relaxed">
                Your estimated last frost in {personalised.adminDistrict}.{" "}
                {personalised.seasonDays} frost-free days ahead.
              </p>
            </>
          ) : (
            <>
              <p
                className="font-bold text-earth tabular-nums"
                style={{
                  fontSize: "clamp(6rem, 20vw, 12rem)",
                  lineHeight: 1,
                }}
              >
                {heroCount}
              </p>
              <p className="text-xl sm:text-2xl text-earth-light max-w-md mx-auto mt-4 leading-relaxed">
                days. That&rsquo;s how much longer Shetland waits for spring
                than the Isles of Scilly.
              </p>
            </>
          )}
        </div>

        {/* Scroll indicator + skip link */}
        <div
          className={`frost-scroll-indicator mt-12 flex flex-col items-center gap-3 ${heroVisible ? "frost-hero-revealed" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-earth-lighter"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <a
            href="#frost-map"
            className="text-xs text-earth-lighter hover:text-allotment transition-colors"
          >
            Skip to map &darr;
          </a>
        </div>
      </div>

      {/* Scrollytelling steps */}
      <div className="relative">
        {personalised ? (
          // Personalised: single comparison step
          <div
            ref={(el) => {
              stepRefs.current[0] = el;
            }}
            className="flex items-center justify-center px-4"
            style={{ minHeight: "45vh" }}
          >
            <div
              className={`frost-step-content max-w-lg text-center ${activeStep >= 0 ? "frost-step-revealed" : ""}`}
            >
              <p className="text-sm font-medium text-earth-lighter uppercase tracking-wider mb-2">
                Where you sit
              </p>
              <p className="text-lg text-earth-light leading-relaxed">
                {personalised.daysBehindCornwall > 0 ? (
                  <>
                    <span
                      className="font-semibold"
                      style={{ color: "#7BB369" }}
                    >
                      {personalised.daysBehindCornwall} days
                    </span>{" "}
                    behind Cornwall.{" "}
                  </>
                ) : (
                  <>
                    <span
                      className="font-semibold"
                      style={{ color: "#7BB369" }}
                    >
                      As early as Cornwall.
                    </span>{" "}
                  </>
                )}
                <span className="font-semibold" style={{ color: "#7BA7C2" }}>
                  {personalised.daysAheadOfShetland} days
                </span>{" "}
                ahead of Shetland.
              </p>
            </div>
          </div>
        ) : (
          // Generic: three region steps
          steps.map((step, i) => (
            <div
              key={step.name}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex items-center justify-center px-4"
              style={{ minHeight: "45vh" }}
            >
              <div
                className={`frost-step-content max-w-lg text-center ${activeStep >= i ? "frost-step-revealed" : ""}`}
              >
                <p className="text-sm font-medium text-earth-lighter uppercase tracking-wider mb-2">
                  {step.name}
                </p>
                <p
                  className="font-bold mb-3"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    lineHeight: 1.1,
                    color: step.color,
                  }}
                >
                  {step.dateLabel}
                </p>
                <p className="text-lg text-earth-light leading-relaxed">
                  {step.caption}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Gradient bar — sticky at bottom of steps */}
        <div className="sticky bottom-0 left-0 right-0 pb-6 pt-2 pointer-events-none">
          <div className="max-w-lg mx-auto px-4">
            <div className="h-2 rounded-full bg-cream/60 overflow-hidden">
              <div
                className="frost-bar-fill h-full rounded-full"
                style={{
                  width: `${barWidth}%`,
                  background:
                    "linear-gradient(to right, #7BB369, #00A29B, #7BA7C2)",
                }}
              />
            </div>
            {/* Region labels */}
            <div className="relative h-5 mt-1">
              {personalised ? (
                <span
                  className={`absolute text-[10px] text-earth-lighter transition-opacity duration-500 -translate-x-1/2 ${activeStep >= 0 ? "opacity-100" : "opacity-0"}`}
                  style={{
                    left: `${((personalised.frostDayOfYear - FROST_DAY_MIN) / (FROST_DAY_MAX - FROST_DAY_MIN)) * 100}%`,
                  }}
                >
                  {personalised.adminDistrict}
                </span>
              ) : (
                FROST_STEPS.map((step, i) => {
                  const pos =
                    ((step.dayOfYear - FROST_DAY_MIN) /
                      (FROST_DAY_MAX - FROST_DAY_MIN)) *
                    100;
                  return (
                    <span
                      key={step.name}
                      className={`absolute text-[10px] text-earth-lighter transition-opacity duration-500 -translate-x-1/2 ${activeStep >= i ? "opacity-100" : "opacity-0"}`}
                      style={{ left: `${pos}%` }}
                    >
                      {step.name}
                    </span>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

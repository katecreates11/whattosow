/**
 * App orchestrator — init, render, event handling.
 * Vanilla JS rewrite of PlantingTool.tsx for the Chrome extension.
 */

import { lookupPostcode, calculateFrostData, getFrostForecast, formatDate } from "./frost.js";
import { crops, getCropsByAction, getCropIconSvg } from "./crops.js";
import { loadLocation, saveLocation, clearLocation } from "./storage.js";

// ─── DOM references ──────────────────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const screens = {
  loading: $("screen-loading"),
  setup: $("screen-setup"),
  dashboard: $("screen-dashboard"),
};

// ─── Screen management ───────────────────────────────────────────────────────

function showScreen(name) {
  for (const [key, el] of Object.entries(screens)) {
    el.style.display = key === name ? "" : "none";
  }
}

// ─── Category helpers ────────────────────────────────────────────────────────

function categoryLabel(cat) {
  switch (cat) {
    case "hardy": return "Hardy";
    case "half-hardy": return "Half-hardy";
    case "tender": return "Tender";
    default: return cat;
  }
}

function categoryClasses(cat) {
  switch (cat) {
    case "hardy": return { badge: "badge-hardy", tile: "tile-hardy" };
    case "half-hardy": return { badge: "badge-half-hardy", tile: "tile-half-hardy" };
    case "tender": return { badge: "badge-tender", tile: "tile-tender" };
    default: return { badge: "", tile: "" };
  }
}

// ─── Crop tile rendering ─────────────────────────────────────────────────────

function createCropTile(crop, actionText) {
  const classes = categoryClasses(crop.category);
  const iconSvg = getCropIconSvg(crop.slug);

  const tile = document.createElement("div");
  tile.className = `crop-tile ${classes.tile}`;
  tile.innerHTML = `
    <div class="crop-tile-main">
      <div class="crop-tile-icon">${iconSvg}</div>
      <div class="crop-tile-info">
        <div class="crop-tile-name-row">
          <span class="crop-tile-name">${crop.name}</span>
          <span class="crop-tile-badge ${classes.badge}">${categoryLabel(crop.category)}</span>
        </div>
        ${actionText ? `<p class="crop-tile-action">${actionText}</p>` : ""}
      </div>
    </div>
  `;
  return tile;
}

function renderCropTiles(container, cropList, actionFn) {
  container.innerHTML = "";
  for (const crop of cropList) {
    const action = typeof actionFn === "function" ? actionFn(crop) : actionFn;
    container.appendChild(createCropTile(crop, action));
  }
}

// ─── Frost card ──────────────────────────────────────────────────────────────

function renderFrostCard(frostData) {
  $("frost-location").textContent = "";

  if (frostData.isSafe) {
    $("frost-headline").innerHTML = "Frost season is over";
  } else {
    $("frost-headline").innerHTML = `<span class="frost-highlight">${frostData.daysUntilSafe} days</span> until it\u2019s safe to plant out`;
  }

  $("frost-last").textContent = formatDate(frostData.lastFrostDate);
  $("frost-autumn").textContent = formatDate(frostData.firstAutumnFrostDate);
  $("frost-season").textContent = `${frostData.growingSeasonDays} days`;

  // Progress bar
  const progressEl = $("frost-progress");
  if (!frostData.isSafe) {
    progressEl.style.display = "";
    const pct = Math.max(5, Math.min(95, 100 - (frostData.daysUntilSafe / 90) * 100));
    $("frost-progress-bar").style.width = `${pct}%`;
  } else {
    progressEl.style.display = "none";
  }
}

// ─── Location bar ────────────────────────────────────────────────────────────

function renderLocationBar(location) {
  $("location-name").textContent = `${location.adminDistrict}, ${location.region}`;
  $("location-postcode").textContent = `(${location.postcode})`;
  $("location-coords").textContent = `${Math.abs(location.latitude).toFixed(2)}\u00b0${location.latitude >= 0 ? "N" : "S"}, ${Math.abs(location.longitude).toFixed(2)}\u00b0${location.longitude >= 0 ? "E" : "W"}`;
}

// ─── Conditions cards ────────────────────────────────────────────────────────

function renderConditions(forecast) {
  if (!forecast) {
    $("conditions-row").style.display = "none";
    return;
  }

  $("conditions-row").style.display = "";

  // Frost risk card
  const frostCard = $("condition-frost");
  const hasRisk = forecast.nextThreeDays.some((d) => d.frostRisk);

  if (hasRisk) {
    const riskDays = forecast.nextThreeDays.filter((d) => d.frostRisk);
    frostCard.className = "condition-card condition-frost-risk";
    frostCard.innerHTML = `
      <div class="condition-header">
        <svg class="condition-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <line x1="12" y1="2" x2="12" y2="22" stroke="#7BA7C2" fill="none" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="7" x2="20" y2="17" stroke="#7BA7C2" fill="none" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="7" x2="4" y2="17" stroke="#7BA7C2" fill="none" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <strong>Frost risk ahead</strong>
      </div>
      ${riskDays.map((d) => `<p class="condition-detail">${new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}: low of <strong>${d.min}\u00b0C</strong></p>`).join("")}
      <p class="condition-hint">Cover tender seedlings or bring pots indoors tonight.</p>
    `;
  } else {
    frostCard.className = "condition-card condition-frost-clear";
    const lowestMin = Math.min(...forecast.nextThreeDays.map((d) => d.min));
    frostCard.innerHTML = `
      <div class="condition-header">
        <svg class="condition-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="5" stroke="#D4943A" fill="none" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="2" x2="12" y2="5" stroke="#D4943A" fill="none" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="22" stroke="#D4943A" fill="none" stroke-width="2" stroke-linecap="round"/>
          <line x1="2" y1="12" x2="5" y2="12" stroke="#D4943A" fill="none" stroke-width="2" stroke-linecap="round"/>
          <line x1="19" y1="12" x2="22" y2="12" stroke="#D4943A" fill="none" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <strong>No frost expected</strong>
      </div>
      <p class="condition-detail">Next 3 nights look clear. Lowest forecast: <strong>${lowestMin}\u00b0C</strong></p>
    `;
  }
  frostCard.style.display = "";

  // Soil temp card
  const soilCard = $("condition-soil");
  if (forecast.soilTemp !== undefined) {
    let soilText;
    if (forecast.soilTemp >= 10) soilText = "Warm enough for most seeds";
    else if (forecast.soilTemp >= 7) soilText = "OK for hardy crops";
    else if (forecast.soilTemp >= 5) soilText = "Too cold for most seeds";
    else soilText = "Soil is very cold \u2014 wait to sow";

    soilCard.innerHTML = `
      <div class="condition-header">
        <svg class="condition-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" fill="none" stroke="#D4943A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="condition-label">Soil temp</span>
      </div>
      <p class="condition-value">${forecast.soilTemp}\u00b0C</p>
      <p class="condition-hint">${soilText}</p>
    `;
    soilCard.style.display = "";
  } else {
    soilCard.style.display = "none";
  }

  // Rainfall card
  const rainCard = $("condition-rain");
  if (forecast.rainfall3Days !== undefined) {
    let rainText;
    if (forecast.rainfall3Days === 0) rainText = "No rain forecast \u2014 water if dry";
    else if (forecast.rainfall3Days < 5) rainText = "Light rain \u2014 may still need watering";
    else if (forecast.rainfall3Days < 15) rainText = "Good rainfall expected";
    else rainText = "Heavy rain \u2014 avoid sowing outdoors";

    rainCard.innerHTML = `
      <div class="condition-header">
        <svg class="condition-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="#7BA7C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="condition-label">Rain (3 days)</span>
      </div>
      <p class="condition-value">${forecast.rainfall3Days}mm</p>
      <p class="condition-hint">${rainText}</p>
    `;
    rainCard.style.display = "";
  } else {
    rainCard.style.display = "none";
  }
}

// ─── Crop sections ───────────────────────────────────────────────────────────

function renderCropSections(frostData) {
  const today = new Date();
  const actions = getCropsByAction(crops, today, frostData.lastFrostDate);

  const hasNow = actions.sowIndoorsNow.length > 0 || actions.directSowNow.length > 0 || actions.plantOutNow.length > 0;

  // Sow now section
  const sowNowSection = $("sow-now-section");
  sowNowSection.style.display = hasNow ? "" : "none";

  // Sow indoors
  const indoorsGroup = $("sow-indoors-group");
  if (actions.sowIndoorsNow.length > 0) {
    indoorsGroup.style.display = "";
    renderCropTiles($("sow-indoors-tiles"), actions.sowIndoorsNow, "Sow indoors now");
  } else {
    indoorsGroup.style.display = "none";
  }

  // Direct sow
  const directGroup = $("direct-sow-group");
  if (actions.directSowNow.length > 0) {
    directGroup.style.display = "";
    renderCropTiles($("direct-sow-tiles"), actions.directSowNow, "Direct sow outside now");
  } else {
    directGroup.style.display = "none";
  }

  // Plant out
  const plantOutGroup = $("plant-out-group");
  if (actions.plantOutNow.length > 0) {
    plantOutGroup.style.display = "";
    renderCropTiles($("plant-out-tiles"), actions.plantOutNow, "Safe to plant outside now");
  } else {
    plantOutGroup.style.display = "none";
  }

  // Coming soon
  const comingSoonSection = $("coming-soon-section");
  if (actions.comingSoon.length > 0) {
    comingSoonSection.style.display = "";
    const container = $("coming-soon-tiles");
    container.innerHTML = "";
    for (const { crop, action, inWeeks } of actions.comingSoon) {
      const text = `${action} in ~${inWeeks} week${inWeeks === 1 ? "" : "s"}`;
      container.appendChild(createCropTile(crop, text));
    }
  } else {
    comingSoonSection.style.display = "none";
  }
}

// ─── Dashboard render ────────────────────────────────────────────────────────

async function renderDashboard(location) {
  // Sync rendering (offline)
  const frostData = calculateFrostData(location);
  renderLocationBar(location);
  renderFrostCard(frostData);
  renderCropSections(frostData);

  // Show dashboard immediately with offline data
  showScreen("dashboard");

  // Async: fetch live conditions
  const forecast = await getFrostForecast(location.latitude, location.longitude);
  renderConditions(forecast);
}

// ─── Postcode submission ─────────────────────────────────────────────────────

let lastSubmitTime = 0;

async function handlePostcodeSubmit(e) {
  e.preventDefault();

  const now = Date.now();
  if (now - lastSubmitTime < 2000) return;
  lastSubmitTime = now;

  const input = $("postcode-input");
  const btn = $("postcode-btn");
  const errorEl = $("postcode-error");
  const postcode = input.value.trim().toUpperCase();

  if (!postcode) return;

  btn.disabled = true;
  btn.textContent = "Looking up\u2026";
  errorEl.textContent = "";

  const result = await lookupPostcode(postcode);

  if (typeof result === "string") {
    errorEl.textContent = result === "network"
      ? "Could not reach the postcode service. Please check your connection and try again."
      : "Couldn\u2019t find that postcode. Please check and try again.";
    btn.disabled = false;
    btn.textContent = "Go";
    return;
  }

  await saveLocation(result);
  btn.disabled = false;
  btn.textContent = "Go";
  renderDashboard(result);
}

// ─── Change location ─────────────────────────────────────────────────────────

async function handleChangeLocation() {
  await clearLocation();
  $("postcode-input").value = "";
  $("postcode-error").textContent = "";
  showScreen("setup");
}

// ─── Uppercase postcode input ────────────────────────────────────────────────

function handlePostcodeInput(e) {
  e.target.value = e.target.value.toUpperCase();
}

// ─── Init ────────────────────────────────────────────────────────────────────

async function init() {
  // Bind events
  $("postcode-form").addEventListener("submit", handlePostcodeSubmit);
  $("change-btn").addEventListener("click", handleChangeLocation);
  $("postcode-input").addEventListener("input", handlePostcodeInput);

  // Check for saved location
  const saved = await loadLocation();

  if (saved) {
    renderDashboard(saved);
  } else {
    showScreen("setup");
  }
}

init();

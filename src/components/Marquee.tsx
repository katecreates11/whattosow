"use client";

import { useEffect, useState } from "react";
import { loadLocation } from "@/lib/location-storage";

interface WeatherState {
  temp: number;
  code: number;
  precip: number;
  wind: number;
  cloud: number;
  location: string;
}

function getMessages(w: WeatherState, month: number): string[] {
  const { temp, code, precip, wind, cloud, location } = w;
  const place = location || "out there";

  const isRaining = code >= 51 && code <= 82;
  const isStormy = code >= 95;
  const isFoggy = code === 45 || code === 48;
  const isClear = code <= 1;
  const isPartlyCloudy = code >= 2 && code <= 3;
  const isSnowing = code >= 71 && code <= 77;
  const isHot = temp >= 24;
  const isWarm = temp >= 18 && temp < 24;
  const isMild = temp >= 12 && temp < 18;
  const isCool = temp >= 6 && temp < 12;
  const isCold = temp < 6;
  const isWindy = wind > 30;

  const messages: string[] = [];

  // Temperature-based
  if (isHot) {
    messages.push(
      `${Math.round(temp)}° in ${place}. The soil is baking. Water at the roots, not the leaves.`,
      "Too hot to plant out. Wait for the cool of the evening.",
      "The courgettes are thriving. Everything else needs a drink.",
      "Days like this ripen tomatoes and punish seedlings in equal measure."
    );
  } else if (isWarm) {
    messages.push(
      `${Math.round(temp)}° and the ground is finally warm. This is what runner beans have been waiting for.`,
      "A good evening for the allotment. The kind of warmth that stays in the soil overnight.",
      "Plant out after six. The roots won't be shocked and the slugs won't yet be awake."
    );
  } else if (isMild) {
    messages.push(
      `${Math.round(temp)}° in ${place}. Good planting weather — mild enough that nothing will panic.`,
      "Overcast and mild. Ideal for putting out new plugs. They'll barely notice the transition.",
      "A grey day, but the soil is working. Something is always growing, even when you can't see it."
    );
  } else if (isCool) {
    messages.push(
      `${Math.round(temp)}° — cool enough to keep the slugs happy tonight. Check your lettuce.`,
      "Not quite planting-out weather yet. Give it another week.",
      "The soil is cautious. Pay attention to it."
    );
  } else if (isCold) {
    messages.push(
      `${Math.round(temp)}° in ${place}. Too cold for anything tender. Keep the tomatoes in.`,
      "A night for frost. Not the night for new seedlings.",
      "The ground is not ready. Patience is the first skill of the kitchen garden."
    );
  }

  // Weather condition
  if (isRaining || precip > 0.5) {
    messages.push(
      "Rain overnight. The slugs will be out. Go early and check everything.",
      "Three days of rain turn bindweed into something magnificent and terrible.",
      "The beans will be grateful. The strawberries less so.",
      "Good rain, if you're not standing in it. The soil has been waiting."
    );
  }

  if (isStormy) {
    messages.push(
      "Stake your tomatoes before you leave tonight.",
      "Wind like this will snap a courgette stem. Check the supports.",
      "A bad night for the allotment. Not much to do but wait it out."
    );
  }

  if (isFoggy) {
    messages.push(
      "Fog and damp — the slugs' favourite weather. Pellets down if you have them.",
      "A grey morning. The kind that makes the allotment feel very far away, then suddenly very close."
    );
  }

  if (isClear && isWarm) {
    messages.push(
      "Clear and warm. A rare thing. The allotment will be worth visiting this evening.",
      "The kind of evening that makes you stay later than you meant to."
    );
  }

  if (isWindy) {
    messages.push(
      "Windy today. Anything tall needs checking. Canes in, frames secured.",
      "Too gusty for sowing outside. But inside, on a windowsill, seeds don't care about the wind."
    );
  }

  if (isSnowing) {
    messages.push(
      "Snow on the way. Nothing to plant. Everything to protect.",
      "Cover the brassicas. Bring in anything in pots."
    );
  }

  // Month-specific additions
  if (month === 5) { // June
    messages.push(
      "June is running away. If your French beans aren't in yet, they need to be.",
      "The longest days are nearly here. The garden knows.",
      "Courgettes, cucumbers, squash — June is their month. Give them space."
    );
  } else if (month === 6) { // July
    messages.push(
      "July. The real business of summer. Keep watering and keep harvesting.",
      "First early potatoes should be ready. Dig down beside a plant and find out.",
      "The tomatoes need feeding now. Every week, without fail."
    );
  } else if (month === 7) { // August
    messages.push(
      "August glut. The courgettes are out of control. Give them away.",
      "Pick beans every two days or they stop producing. The plant thinks it's done.",
      "The season is turning, even if it doesn't feel like it yet."
    );
  } else if (month >= 8 && month <= 9) { // Sept/Oct
    messages.push(
      "The days are shortening. Get winter salads in now.",
      "A frost could come any week. Note what still needs harvesting.",
      "The best time to plant garlic is approaching. Think about where it will go."
    );
  } else if (month >= 10 && month <= 11) { // Nov/Dec
    messages.push(
      "The ground is resting. So should you. Plan next year.",
      "Bare-root season. The best time to plant fruit trees and bushes.",
      "Garlic in by the solstice. Everything else can wait."
    );
  } else if (month >= 0 && month <= 1) { // Jan/Feb
    messages.push(
      "The soil is cold and the light is thin. Seeds are dreaming.",
      "Chilli seeds want starting now. Give them heat.",
      "February. The month that feels like nothing is happening. It isn't. Be patient."
    );
  } else if (month >= 2 && month <= 3) { // March/April
    messages.push(
      "The first sowings of the year. Don't rush them.",
      "Cold nights still. Keep an eye on the forecast.",
      "The soil is waking up. So is everything that wants to eat your seedlings."
    );
  } else if (month === 4) { // May
    messages.push(
      "May frosts catch people out every year. Don't be one of them.",
      "The last frost date is near. Hold your nerve a little longer.",
      "Everything wants to go outside. Not yet. Nearly."
    );
  }

  // Always include these
  messages.push(
    "Enter your postcode — sowing dates personalised to your frost date.",
    "What to grow. When to grow it. Where you are.",
    "The allotment is never finished. That's the point of it."
  );

  return messages;
}

export default function Marquee() {
  const [messages, setMessages] = useState([
    "The allotment is never finished. That's the point of it.",
    "What to grow. When to grow it. Where you are.",
    "Enter your postcode for sowing dates personalised to your frost date.",
  ]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const saved = loadLocation();
        const lat = saved?.latitude ?? 52.48;
        const lng = saved?.longitude ?? -1.89;
        const locationName = saved?.adminDistrict ?? "the UK";

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,precipitation,wind_speed_10m,cloud_cover&timezone=Europe/London`
        );
        if (!res.ok) return;
        const data = await res.json();
        const current = data.current;

        const weather: WeatherState = {
          temp: current.temperature_2m,
          code: current.weather_code,
          precip: current.precipitation,
          wind: current.wind_speed_10m,
          cloud: current.cloud_cover,
          location: locationName,
        };

        const month = new Date().getMonth();
        const generated = getMessages(weather, month);
        // Pick 5 varied messages
        const shuffled = generated.sort(() => Math.random() - 0.5).slice(0, 6);
        setMessages(shuffled);
      } catch {
        // Keep fallback messages
      }
    }

    fetchWeather();
  }, []);

  const items = [...messages, ...messages];

  return (
    <div className="bg-[#003b44] overflow-hidden py-2.5 select-none" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((msg, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-8">
            <span className="font-mono text-[11px] tracking-[0.1em] text-[#f2f2eb]/60">
              {msg}
            </span>
            <span className="text-[#00d975]/50 text-[7px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

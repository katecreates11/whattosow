import { describe, expect, it } from "vitest";
import {
  answerGreeting,
  answerInterpretation,
  answerProvenance,
  answerSeason,
  degrees,
  showIndoorSowing,
} from "@/lib/local-answer";
import type { NightLow } from "@/lib/weather-brain";

/** A Barnet-like frost year: last frost 20 April, first autumn frost from 17 October. */
function frostYear(now: Date) {
  const year = now.getFullYear();
  const autumn = new Date(year, 9, 17);
  const afterAutumn = now > autumn;
  return {
    now,
    lastFrost: new Date(afterAutumn ? year + 1 : year, 3, 20),
    firstAutumnFrost: autumn,
    growingSeasonDays: 180,
  };
}

const night = (date: string, min: number): NightLow => ({ date, min, frostRisk: min <= 2 });
const mild = [night("2026-11-16", 6), night("2026-11-17", 7.4), night("2026-11-18", 5)];

describe("the Answer — season awareness", () => {
  it("places every month in the right part of the frost year", () => {
    expect(answerSeason(new Date(2026, 1, 10), new Date(2026, 3, 20), new Date(2026, 9, 17)).phase).toBe("before-last-frost");
    expect(answerSeason(new Date(2026, 5, 10), new Date(2026, 3, 20), new Date(2026, 9, 17)).phase).toBe("open");
    expect(answerSeason(new Date(2026, 8, 20), new Date(2026, 3, 20), new Date(2026, 9, 17)).phase).toBe("closing");
    expect(answerSeason(new Date(2026, 10, 16), new Date(2027, 3, 20), new Date(2026, 9, 17)).phase).toBe("frost-season");
  });

  it("never tells a November gardener the season is open", () => {
    const greeting = answerGreeting({ place: "Barnet", ...frostYear(new Date(2026, 10, 16)) });
    expect(greeting).toBe("Growing in Barnet, then — frost can come any night from now until around 20 April.");

    const line = answerInterpretation({ ...frostYear(new Date(2026, 10, 16)) });
    expect(line).not.toMatch(/soil has warmed|season's properly open/);
  });

  it("speaks to each part of the year", () => {
    expect(answerGreeting({ place: "Barnet", ...frostYear(new Date(2026, 1, 9)) })).toBe(
      "Growing in Barnet, then — your last frost is usually gone by 20 April, about ten weeks off."
    );
    expect(answerGreeting({ place: "Barnet", ...frostYear(new Date(2026, 3, 14)) })).toBe(
      "Growing in Barnet, then — your last frost is usually gone by 20 April, only days off now."
    );
    expect(answerGreeting({ place: "Barnet", ...frostYear(new Date(2026, 5, 10)) })).toBe(
      "Growing in Barnet, then — your last frost is usually gone by 20 April, so the season's properly open."
    );
    expect(answerGreeting({ place: "Barnet", ...frostYear(new Date(2026, 8, 19)) })).toBe(
      "Growing in Barnet, then — your first frost can come from 17 October, so the season has about four weeks left."
    );
  });

  it("holds the voice rules for every week of the year, with and without weather", () => {
    const banned = /!|unfortunately|oops|success|paradise|magical|journey|yearn|whisper|dance|thirsty/i;
    for (let week = 0; week < 53; week++) {
      const now = new Date(2026, 0, 1 + week * 7, 12);
      const year = frostYear(now);
      const phase = answerSeason(now, year.lastFrost, year.firstAutumnFrost).phase;
      const greeting = answerGreeting({ place: "Barnet", ...year });
      const lines = [
        greeting,
        answerInterpretation(year),
        answerInterpretation({ ...year, nights: mild, soilTemp: 6 }),
        answerInterpretation({ ...year, nights: [night("2026-11-16", -2), ...mild.slice(1)], soilTemp: 6 }),
      ];
      for (const line of lines) {
        expect(line, `week ${week}`).not.toMatch(banned);
        expect(line.length, `week ${week}: ${line}`).toBeLessThan(190);
        expect(line.trim().endsWith("."), `week ${week}: ${line}`).toBe(true);
      }
      expect(greeting.startsWith("Growing in Barnet, then — "), `week ${week}`).toBe(true);
      if (phase !== "open") {
        expect(greeting, `week ${week}`).not.toContain("properly open");
        expect(lines[1], `week ${week}`).not.toContain("soil has warmed");
      }
    }
  });
});

describe("the Answer — the weather speaks, frost first", () => {
  const year = frostYear(new Date(2026, 10, 16));

  it("leads with a frost tonight, whatever else is true", () => {
    expect(answerInterpretation({ ...year, nights: [night("2026-11-16", -1.4), ...mild.slice(1)], soilTemp: 3 })).toBe(
      "A frost tonight, down to −1°. Fleece anything tender, or bring the pots in."
    );
    expect(answerInterpretation({ ...year, nights: [night("2026-11-16", 1.6), ...mild.slice(1)] })).toBe(
      "Down to 2° tonight, cold enough for frost on the ground. Fleece anything tender, or bring the pots in."
    );
  });

  it("warns of a frost later in the week by its night", () => {
    expect(
      answerInterpretation({ ...year, nights: [night("2026-11-16", 6), night("2026-11-17", 5), night("2026-11-18", -0.4)] })
    ).toBe("No frost tonight, but Wednesday night drops to 0°. Keep the fleece handy.");
  });

  it("says so plainly when the nights are clear", () => {
    expect(answerInterpretation({ ...year, nights: mild })).toBe(
      "No frost in the next three nights — the lowest is 5°. Anything tender still outside is safe for now."
    );
    expect(answerInterpretation({ ...frostYear(new Date(2026, 2, 2)), nights: mild })).toBe(
      "No frost in the next three nights — the lowest is 5°. Seedlings hardening off can stay out."
    );
  });

  it("falls back to the season when the weather isn't answering", () => {
    expect(answerInterpretation(year)).toBe("The sowing list is short in the cold months, and that's as it should be.");
    expect(answerInterpretation({ ...frostYear(new Date(2026, 5, 10)), nights: [] })).toBe(
      "Hardy things can get on with it, and tender crops are happiest now the soil has warmed."
    );
  });

  it("writes temperatures the way a person would", () => {
    expect(degrees(-1.4)).toBe("−1°");
    expect(degrees(-0.4)).toBe("0°");
    expect(degrees(5.5)).toBe("6°");
  });
});

describe("the Answer — soil temperature talks about the list on the page", () => {
  const march = frostYear(new Date(2026, 2, 9));
  const carrots = { name: "carrots", minSoilTemp: 5 };
  const frenchBeans = { name: "french beans", minSoilTemp: 8 };

  it("says when the soil is ready for what we're telling them to sow", () => {
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 9, directSow: [carrots, frenchBeans] })).toBe(
      "The soil is 9° at seed depth — warm enough to sow carrots and french beans straight out."
    );
  });

  it("splits the list when the soil is ready for some and not others", () => {
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 6, directSow: [carrots, frenchBeans] })).toBe(
      "The soil is 6° at seed depth — warm enough for carrots, not yet for french beans."
    );
  });

  it("says wait, kindly, when the soil is too cold for the whole list — in any month", () => {
    const expected = "The soil is 3° at seed depth, still too cold for carrots — a few days' wait costs nothing.";
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 3, directSow: [carrots] })).toBe(expected);
    expect(answerInterpretation({ ...frostYear(new Date(2026, 10, 16)), nights: mild, soilTemp: 3, directSow: [carrots] })).toBe(expected);
  });

  it("gives a general reading in spring when nothing on the list is direct-sown", () => {
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 4 })).toContain("Even hardy seed wants 5°");
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 6 })).toContain("warm enough for hardy sowings");
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 10 })).toContain("The tender crops want 12°");
    expect(answerInterpretation({ ...march, nights: mild, soilTemp: 14 })).toContain("tender crops included");
  });

  it("stops talking about soil once summer has settled, unless it contradicts the list", () => {
    const july = frostYear(new Date(2026, 6, 6));
    expect(answerInterpretation({ ...july, nights: mild, soilTemp: 18, directSow: [carrots] })).toBe(
      "Hardy things can get on with it, and tender crops are happiest now the soil has warmed."
    );
  });
});

describe("the Answer — provenance", () => {
  const base = {
    place: "Buxton",
    ...frostYear(new Date(2026, 2, 9)),
    years: 10,
    elevation: 294,
    latestLastFrost: new Date(2026, 4, 15),
    earliestFirstFrost: new Date(2026, 9, 3),
  };

  it("credits the place's own record, with the fact that matters this season", () => {
    expect(answerProvenance({ ...base, source: "record" })).toBe(
      "worked from ten years of frosts around Buxton · 294 m up · latest spring frost 15 May"
    );
    expect(answerProvenance({ ...base, ...frostYear(new Date(2026, 8, 19)), source: "record" })).toBe(
      "worked from ten years of frosts around Buxton · 294 m up · earliest autumn frost 3 Oct"
    );
  });

  it("says nothing while the dates are still the latitude model's", () => {
    expect(answerProvenance({ ...base, source: "model", years: 0 })).toBeNull();
  });
});

describe("the Answer — indoors is always in season", () => {
  const at = (date: Date, listLength: number) => {
    const year = frostYear(date);
    return showIndoorSowing(date, year.lastFrost, year.firstAutumnFrost, listLength);
  };

  it("offers the windowsill through the frost season and the quiet weeks before spring", () => {
    expect(at(new Date(2026, 10, 16), 1)).toBe(true); // November
    expect(at(new Date(2026, 11, 20), 0)).toBe(true); // December
    expect(at(new Date(2026, 0, 12), 0)).toBe(true); // January
    expect(at(new Date(2026, 1, 9), 2)).toBe(true); // early February, ten weeks out
  });

  it("stays quiet once the outdoor list has plenty on it", () => {
    expect(at(new Date(2026, 2, 23), 4)).toBe(false); // late March, four weeks out
    expect(at(new Date(2026, 5, 10), 4)).toBe(false); // June
    expect(at(new Date(2026, 8, 19), 4)).toBe(false); // September
  });

  it("always speaks up when there is nothing at all to sow outside", () => {
    expect(at(new Date(2026, 5, 10), 0)).toBe(true);
  });
});

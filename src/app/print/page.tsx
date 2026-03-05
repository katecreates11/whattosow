import type { Metadata } from "next";
import { crops } from "@/data/crops";
import { getCropActionMonths, MONTH_NAMES, getAvgFrostDate, type SowingAction } from "@/lib/calendar";
import PrintButton from "@/components/PrintButton";
import EmailCapture from "@/components/EmailCapture";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Printable UK Sowing Chart — What To Sow",
  description:
    "Print-friendly sowing calendar showing when to sow, plant, and harvest every crop across 12 months.",
  robots: "noindex",
};

const dotColor: Record<SowingAction, string> = {
  sowIndoors: "bg-amber",
  directSow: "bg-leaf",
  plantOut: "bg-allotment",
  harvest: "bg-amber-light",
};

// Seasonal background tints for month columns (screen only)
const seasonBg: Record<number, string> = {
  0: "bg-frost-bg/40",    // Jan — winter
  1: "bg-frost-bg/40",    // Feb — winter
  2: "bg-leaf-bg/30",     // Mar — spring
  3: "bg-leaf-bg/40",     // Apr — spring
  4: "bg-leaf-bg/50",     // May — spring
  5: "bg-amber-bg/30",    // Jun — summer
  6: "bg-amber-bg/40",    // Jul — summer
  7: "bg-amber-bg/40",    // Aug — summer
  8: "bg-amber-bg/30",    // Sep — autumn
  9: "bg-tomato-bg/20",   // Oct — autumn
  10: "bg-frost-bg/30",   // Nov — winter
  11: "bg-frost-bg/40",   // Dec — winter
};

export default function PrintPage() {
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const frostDate = getAvgFrostDate(year);

  const sortedCrops = [...crops].sort((a, b) => {
    const order = { hardy: 0, "half-hardy": 1, tender: 2 };
    return order[a.category] - order[b.category] || a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="print:hidden">
        <Header backLink={{ href: "/calendar", label: "\u2190 Sowing calendar" }} />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Screen-only premium preview */}
        <div className="print:hidden py-12 sm:py-16">
          {/* Preview card */}
          <div className="relative border border-earth/8 bg-white/60 p-6 sm:p-10 mb-10 shadow-sm">
            <div className="mb-8">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-allotment/70 mb-3 block">
                Printable chart
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-earth tracking-tighter leading-tight mb-3">
                UK Sowing Chart <span className="text-allotment">{year}</span>
              </h1>
              <p className="text-earth-light leading-relaxed max-w-lg">
                Every crop, every month — at a glance. Based on the UK average frost date (mid-April).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <PrintButton />
              <div className="max-w-sm flex-1">
                <EmailCapture variant="compact" />
              </div>
            </div>
          </div>
        </div>

        {/* Print header */}
        <div className="hidden print:block mb-4">
          <h1 className="text-lg font-bold">What To Sow — UK Sowing Chart {year}</h1>
          <p className="text-xs text-gray-500">
            Based on UK average last frost date (mid-April). whattosow.co.uk
          </p>
        </div>

        {/* The chart */}
        <div className="overflow-x-auto mb-8 print:mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 sm:p-2.5 border-b-2 border-earth/20 font-semibold text-earth">
                  Crop
                </th>
                <th className="text-left p-2 sm:p-2.5 border-b-2 border-earth/20 font-semibold text-earth-lighter w-16">
                  Type
                </th>
                {MONTH_NAMES.map((m, i) => (
                  <th
                    key={m}
                    className={`text-center p-1.5 border-b-2 border-earth/20 font-semibold w-12 ${
                      i === currentMonth ? "text-allotment print:text-inherit" : "text-earth"
                    } print:bg-transparent ${seasonBg[i] ?? ""}`}
                  >
                    {m.slice(0, 3)}
                    {i === currentMonth && (
                      <span className="block w-1 h-1 rounded-full bg-allotment mx-auto mt-0.5 print:hidden" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCrops.map((crop, idx) => {
                const actions = getCropActionMonths(crop, frostDate);
                const prevCategory = idx > 0 ? sortedCrops[idx - 1].category : null;
                const isNewCategory = crop.category !== prevCategory;
                return (
                  <tr
                    key={crop.slug}
                    className={`border-b border-earth/8 ${isNewCategory && idx > 0 ? "border-t-2 border-t-earth/15" : ""}`}
                  >
                    <td className="p-2 sm:p-2.5 font-medium text-earth">
                      <a href={`/crops/${crop.slug}`} className="hover:text-allotment print:no-underline print:text-inherit">
                        {crop.name}
                      </a>
                    </td>
                    <td className="p-2 sm:p-2.5 text-earth-lighter capitalize text-[10px]">
                      {crop.category}
                    </td>
                    {Array.from({ length: 12 }, (_, m) => {
                      const cellActions = actions
                        .filter((a) => a.months.includes(m))
                        .map((a) => a.action);
                      return (
                        <td
                          key={m}
                          className={`p-1 text-center print:bg-transparent ${
                            m === currentMonth ? "print:bg-transparent" : ""
                          } ${seasonBg[m] ?? ""}`}
                        >
                          <div className="flex items-center justify-center gap-1">
                            {cellActions.map((a) => (
                              <span
                                key={a}
                                className={`inline-block w-2.5 h-2.5 rounded-full ${dotColor[a]} print:w-2 print:h-2 print:border print:border-gray-400`}
                                title={a === "sowIndoors" ? "Sow indoors" : a === "directSow" ? "Direct sow" : a === "plantOut" ? "Plant out" : "Harvest"}
                              />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="text-xs text-earth-lighter mb-12 print:mb-4">
          <div className="flex gap-5 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber print:w-2 print:h-2" aria-hidden="true" />
              Sow indoors
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-leaf print:w-2 print:h-2" aria-hidden="true" />
              Direct sow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-allotment print:w-2 print:h-2" aria-hidden="true" />
              Plant out
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-light print:w-2 print:h-2" aria-hidden="true" />
              Harvest
            </span>
          </div>
          <p className="mt-2 hidden print:block">
            whattosow.co.uk — Enter your postcode for personalised dates.
          </p>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

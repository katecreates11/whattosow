import type { Metadata } from "next";
import { crops } from "@/data/crops";
import { getCropActionMonths, MONTH_NAMES, getAvgFrostDate, type SowingAction } from "@/lib/calendar";
import PrintButton from "@/components/PrintButton";
import EmailCapture from "@/components/EmailCapture";

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

export default function PrintPage() {
  const year = new Date().getFullYear();
  const frostDate = getAvgFrostDate(year);

  const sortedCrops = [...crops].sort((a, b) => {
    const order = { hardy: 0, "half-hardy": 1, tender: 2 };
    return order[a.category] - order[b.category] || a.name.localeCompare(b.name);
  });

  return (
    <div className="print-page">
      {/* Screen-only controls */}
      <div className="print:hidden p-6 text-center">
        <h1 className="text-2xl font-bold text-earth mb-2">
          Printable sowing chart
        </h1>
        <p className="text-earth-light mb-4">
          Based on UK average frost date (mid-April {year})
        </p>
        <PrintButton />
        <div className="mt-6 max-w-sm mx-auto">
          <EmailCapture variant="compact" />
        </div>
        <a
          href="/calendar"
          className="block mt-4 text-sm text-allotment hover:text-allotment-dark"
        >
          &larr; Back to sowing calendar
        </a>
      </div>

      {/* Print header */}
      <div className="hidden print:block mb-4">
        <h1 className="text-lg font-bold">What To Sow — UK Sowing Chart {year}</h1>
        <p className="text-xs text-gray-500">
          Based on UK average last frost date (mid-April). whattosow.co.uk
        </p>
      </div>

      {/* The chart */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left p-1.5 border-b-2 border-earth/20 font-semibold">
                Crop
              </th>
              <th className="text-left p-1.5 border-b-2 border-earth/20 font-semibold w-16">
                Type
              </th>
              {MONTH_NAMES.map((m) => (
                <th
                  key={m}
                  className="text-center p-1 border-b-2 border-earth/20 font-semibold w-12"
                >
                  {m.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCrops.map((crop) => {
              const actions = getCropActionMonths(crop, frostDate);
              return (
                <tr key={crop.slug} className="border-b border-earth/10">
                  <td className="p-1.5 font-medium">{crop.name}</td>
                  <td className="p-1.5 text-earth-lighter capitalize">
                    {crop.category}
                  </td>
                  {Array.from({ length: 12 }, (_, m) => {
                    const cellActions = actions
                      .filter((a) => a.months.includes(m))
                      .map((a) => a.action);
                    return (
                      <td key={m} className="p-1 text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          {cellActions.map((a) => (
                            <span
                              key={a}
                              className={`inline-block w-2 h-2 rounded-full ${dotColor[a]} print:border print:border-gray-400`}
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
      <div className="mt-4 text-xs text-earth-lighter">
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber" /> Sow
            indoors
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-leaf" /> Direct
            sow
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-allotment" />{" "}
            Plant out
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-light" />{" "}
            Harvest
          </span>
        </div>
        <p className="mt-2 hidden print:block">
          whattosow.co.uk — Enter your postcode for personalised dates.
        </p>
      </div>
    </div>
  );
}

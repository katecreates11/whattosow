import { LeafSprig } from "./SVGIllustrations";

export default function Footer() {
  return (
    <footer className="bg-allotment-dark text-white/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-7 h-7 text-leaf-light"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
              </svg>
              <span className="font-bold text-lg text-white">What To Sow</span>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              Free UK planting calendar by postcode. Know exactly what to sow, right now, where you are.
            </p>
            <p className="text-xs text-white/50">
              Frost data calibrated against Met Office HadUK-Grid climate observations. Forecasts from Open-Meteo.
            </p>
          </div>
          <div className="hidden sm:block opacity-30">
            <LeafSprig className="w-16 h-20" />
          </div>
        </div>
      </div>
    </footer>
  );
}

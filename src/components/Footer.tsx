import { LeafSprig } from "./SVGIllustrations";

function StickyNavBar() {
  return (
    <div className="hidden sm:block sticky bottom-0 z-10 bg-allotment-dark/95 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav aria-label="Quick navigation" className="flex items-center justify-between py-2.5 text-xs">
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/70 hover:text-white transition-colors">Home</a>
            <a href="/calendar" className="text-white/70 hover:text-white transition-colors">Calendar</a>
            <a href="/frost-map" className="text-white/70 hover:text-white transition-colors">Frost map</a>
            <a href="/guides" className="text-white/70 hover:text-white transition-colors">Guides</a>
            <a href="/sow-in" className="text-white/70 hover:text-white transition-colors">By location</a>
            <a href="/allotments" className="text-white/70 hover:text-white transition-colors">Allotments</a>
          </div>
          <a
            href="https://ko-fi.com/whattosow"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="ko-fi-click"
            data-umami-event-location="sticky-nav"
            className="text-white/70 hover:text-white transition-colors"
          >
            Support this tool &rarr;
          </a>
        </nav>
      </div>
    </div>
  );
}

function SeasonalTagline() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "It\u2019s spring \u2014 the soil is waking up.";
  if (month >= 5 && month <= 7) return "It\u2019s summer \u2014 keep sowing, keep watering.";
  if (month >= 8 && month <= 10) return "It\u2019s autumn \u2014 harvest and plan ahead.";
  return "It\u2019s winter \u2014 rest, plan, dream.";
}

export default function Footer() {
  return (
    <>
    <StickyNavBar />
    <footer className="bg-allotment-dark text-white/90">
      {/* Gradient transition from page to footer */}
      <div className="h-px bg-gradient-to-r from-allotment via-leaf to-amber" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-7 h-7 text-leaf-light"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
              </svg>
              <span className="font-serif text-xl text-white">What To Sow</span>
            </div>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed mb-4">
              Free UK planting calendar by postcode. Know exactly what to sow, right now, where you are.
            </p>
            <p className="text-xs text-white/60 italic">
              <SeasonalTagline />
            </p>
          </div>

          {/* Grow */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 mb-4">Grow</h3>
            <nav aria-label="Grow links" className="flex flex-col gap-2 text-sm">
              <a href="/#explore-crops" className="text-white/70 hover:text-white transition-colors">Explore crops</a>
              <a href="/calendar" className="text-white/70 hover:text-white transition-colors">Sowing calendar</a>
              <a href="/still-time" className="text-white/70 hover:text-white transition-colors">Still time to sow</a>
              <a href="/guides" className="text-white/70 hover:text-white transition-colors">Guides</a>
              <a href="/sow-in" className="text-white/70 hover:text-white transition-colors">Sow by location</a>
              <a href="/print" className="text-white/70 hover:text-white transition-colors">Print chart</a>
            </nav>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 mb-4">Explore</h3>
            <nav aria-label="Explore links" className="flex flex-col gap-2 text-sm">
              <a href="/frost-map" className="text-white/70 hover:text-white transition-colors">Frost map</a>
              <a href="/allotments" className="text-white/70 hover:text-white transition-colors">Find allotments</a>
              <a href="/#common-questions" className="text-white/70 hover:text-white transition-colors">FAQ</a>
              <a href="/about" className="text-white/70 hover:text-white transition-colors">About</a>
              <a href="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy</a>
              <a
                href="https://ko-fi.com/whattosow"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="ko-fi-click"
                data-umami-event-location="footer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Support this tool
              </a>
            </nav>
          </div>
        </div>

        {/* Data sources */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="text-xs text-white/60 space-y-1">
              <p className="text-white/70 font-medium mb-1">Data sources</p>
              <p>
                <a href="https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-climate-averages" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline decoration-white/20">Met Office</a>
                {" \u00B7 "}
                <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline decoration-white/20">Open-Meteo</a>
                {" \u00B7 "}
                <a href="https://postcodes.io/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline decoration-white/20">Postcodes.io</a>
                {" \u00B7 "}
                <a href="https://environment.data.gov.uk/flood-monitoring/doc/rainfall" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline decoration-white/20">Environment Agency</a>
                {" \u00B7 Photos from "}
                <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline decoration-white/20">Unsplash</a>
              </p>
            </div>
            <div className="hidden sm:block opacity-20" aria-hidden="true">
              <LeafSprig className="w-12 h-16" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60">
          <p>
            Some links are affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

const AllotmentMap = dynamic(() => import("@/components/AllotmentMap"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-allotment-bg rounded-2xl animate-pulse" />,
});

class MapErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[500px] bg-allotment-bg rounded-2xl flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-earth font-semibold mb-2">Map couldn&apos;t load</p>
            <p className="text-sm text-earth-light mb-4">
              Try refreshing the page. If the problem persists, your browser may be blocking map resources.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-allotment text-white text-sm font-semibold rounded-lg hover:bg-allotment-dark transition-colors"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function AllotmentMapLoader() {
  return (
    <MapErrorBoundary>
      <AllotmentMap />
    </MapErrorBoundary>
  );
}

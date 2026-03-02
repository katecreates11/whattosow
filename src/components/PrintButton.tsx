"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-allotment text-white px-6 py-3 rounded-xl font-semibold hover:bg-allotment-dark transition-colors"
    >
      Print this chart
    </button>
  );
}

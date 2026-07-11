import type { Metadata } from "next";
import BenchClient from "./BenchClient";

// Kate's private verdict page — never indexed, guarded by the bench key.
export const metadata: Metadata = {
  title: "The Potting Bench",
  robots: { index: false, follow: false },
};

export default function BenchPage() {
  return <BenchClient />;
}

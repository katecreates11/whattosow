"use client";

import { useState } from "react";

interface EmailCaptureContext {
  district?: string;
  frostDate?: string;
  cropName?: string;
}

interface EmailCaptureProps {
  variant?: "full" | "compact";
  context?: EmailCaptureContext;
}

export default function EmailCapture({ variant = "full", context }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!consent) {
      setErrorMsg("Please tick the consent box to subscribe.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Signup failed");
      }

      setStatus("success");

      // Track successful email signup with context
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('email-signup', {
          variant: variant,
          location: context?.district || 'unknown',
          crop: context?.cropName || 'none',
        });
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className={`bg-leaf-bg rounded-xl p-5 ${variant === "compact" ? "text-center" : ""}`}>
        <p className="font-semibold text-allotment">You&apos;re in!</p>
        <p className="text-sm text-earth-light mt-1">
          Check your email to confirm your subscription.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="bg-allotment-bg rounded-xl p-5">
        <p className="font-semibold text-earth mb-1">Get this chart as a PDF</p>
        <p className="text-sm text-earth-light mb-3">
          We&apos;ll email you a printable PDF version — free.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              autoComplete="email"
              required
              className="flex-1 px-3 py-2 rounded-lg border border-earth/15 bg-white text-earth placeholder:text-earth-lighter text-sm focus:outline-none focus:ring-2 focus:ring-allotment focus:border-transparent"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              data-umami-event="email-signup"
              data-umami-event-variant="compact"
              className="px-4 py-2 bg-allotment text-white font-medium rounded-lg hover:bg-allotment-dark text-sm disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {status === "submitting" ? "Sending..." : "Send PDF"}
            </button>
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 rounded border-earth/30"
            />
            <span className="text-xs text-earth-lighter">
              I agree to receive monthly sowing emails.{" "}
              <a href="/privacy" className="text-allotment hover:underline">
                Privacy policy
              </a>
            </span>
          </label>
          {status === "error" && (
            <p className="text-xs text-tomato" role="alert">{errorMsg}</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="bg-allotment-bg rounded-xl p-5 sm:p-6">
      <h3 className="text-lg font-bold text-earth mb-1">
        {context?.cropName
          ? `Get reminders about ${context.cropName.toLowerCase()}`
          : context?.district
            ? `Get monthly reminders for ${context.district}`
            : "Get monthly sowing reminders for your area"}
      </h3>
      <p className="text-sm text-earth-light mb-4">
        {context?.frostDate
          ? `We'll remind you when it's safe to plant out in ${context.district ?? "your area"} (around ${context.frostDate}). No spam, unsubscribe anytime.`
          : "We\u2019ll send you what to sow each month, personalised to your frost date. No spam, unsubscribe anytime."}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            autoComplete="email"
            required
            className="flex-1 px-4 py-3 rounded-xl border border-earth/15 bg-white text-earth placeholder:text-earth-lighter focus:outline-none focus:ring-2 focus:ring-allotment focus:border-transparent text-base"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            data-umami-event="email-signup"
            data-umami-event-variant="full"
            className="px-6 py-3 bg-allotment text-white font-semibold rounded-xl hover:bg-allotment-dark focus:outline-none focus:ring-2 focus:ring-allotment focus:ring-offset-2 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {status === "submitting" ? "Signing up..." : "Sign up"}
          </button>
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-earth/30"
          />
          <span className="text-xs text-earth-lighter">
            I agree to receive monthly sowing emails. You can unsubscribe
            anytime.{" "}
            <a href="/privacy" className="text-allotment hover:underline">
              Privacy policy
            </a>
          </span>
        </label>
        {status === "error" && (
          <p className="text-sm text-tomato" role="alert">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { affiliateClickPayloadFromLink } from "@/lib/affiliate-click-browser";

function sendAffiliateClick(payload: object) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/affiliate-click", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/affiliate-click", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Affiliate navigation must never be blocked by measurement.
  });
}

export default function AffiliateClickLedger() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[data-umami-event="affiliate-click"]');
      if (!link) return;

      const payload = affiliateClickPayloadFromLink(link, window.location.pathname);
      if (payload) sendAffiliateClick(payload);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

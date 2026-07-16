import Script from "next/script";
import { ANALYTICS_BOT_PATTERN_SOURCE } from "@/lib/analytics-bot-filter";

export default function AnalyticsScript() {
  return (
    <Script
      id="umami-bot-aware-loader"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            var ua = navigator.userAgent || "";
            var isBot = !ua.trim() || navigator.webdriver || new RegExp(${JSON.stringify(ANALYTICS_BOT_PATTERN_SOURCE)}, "i").test(ua);
            if (isBot) return;
            var script = document.createElement("script");
            script.async = true;
            script.defer = true;
            script.src = "https://cloud.umami.is/script.js";
            script.setAttribute("data-website-id", "586b28c5-fbaf-49af-9b2a-03d8fa56e325");
            document.head.appendChild(script);
          })();
        `,
      }}
    />
  );
}

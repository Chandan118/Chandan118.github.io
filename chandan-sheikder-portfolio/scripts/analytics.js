const analyticsConfig = window.siteConfig?.analytics;

if (analyticsConfig?.enabled) {
  const provider = analyticsConfig.provider?.toLowerCase();

  if (provider === "plausible") {
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("defer", "");
    script.setAttribute("data-domain", analyticsConfig.domain);
    script.src = "https://plausible.io/js/plausible.js";
    document.head.appendChild(script);
  } else if (provider === "google") {
    const tag = document.createElement("script");
    tag.setAttribute("async", "");
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", analyticsConfig.measurementId);
  } else {
    console.warn(`Analytics provider "${analyticsConfig.provider}" is not implemented.`);
  }
} else {
  console.info("Analytics disabled. Enable via config/site-config.js when ready.");
}

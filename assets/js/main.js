(() => {
const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const year = document.querySelector("[data-year]");
const trackedLinks = document.querySelectorAll("[data-track-event]");
const expressLinks = document.querySelectorAll('a[href="volquete-express/"]');
const adsClickEvents = new Set([
  "click_whatsapp_express",
  "click_phone_express",
  "click_whatsapp_home",
  "click_phone_home",
  "click_whatsapp_404",
]);
const campaignKeys = [
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];
const googleAdsConversions = {
  click_phone_express: "AW-16660048232/qrq3CKz9tNscEOjSkIg-",
  click_whatsapp_express: "AW-16660048232/K7XJCLDFtNscEOjSkIg-",
};
const googleAdsNote = "Vi el anuncio en Google.";

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

const preserveCampaignParams = (link) => {
  const currentParams = new URLSearchParams(window.location.search);
  const campaignParams = new URLSearchParams();

  currentParams.forEach((value, key) => {
    if (campaignKeys.includes(key)) {
      campaignParams.set(key, value);
    }
  });

  if (!campaignParams.toString()) return;

  const url = new URL(link.getAttribute("href"), window.location.href);
  campaignParams.forEach((value, key) => url.searchParams.set(key, value));
  link.href = url.pathname + url.search + url.hash;
};

expressLinks.forEach(preserveCampaignParams);

const isPaidGoogleVisit = () => {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";

  return (
    params.has("gclid") ||
    params.has("gbraid") ||
    params.has("wbraid") ||
    params.has("gad_source") ||
    (utmSource.toLowerCase() === "google" && utmMedium.toLowerCase() === "cpc")
  );
};

const appendGoogleAdsNote = (link) => {
  if (!isPaidGoogleVisit()) return;

  const href = link.getAttribute("href") || "";
  if (!href.includes("wa.me")) return;

  const url = new URL(href, window.location.href);
  const currentMessage = url.searchParams.get("text") || "";

  if (currentMessage.includes(googleAdsNote)) return;

  const trimmedMessage = currentMessage.trim();
  const separator = trimmedMessage.endsWith(".") ? " " : ". ";
  const message = trimmedMessage ? `${currentMessage}${separator}${googleAdsNote}` : googleAdsNote;
  url.searchParams.set("text", message);
  link.href = url.toString();
};

document.querySelectorAll('a[data-track-event][href*="wa.me"]').forEach(appendGoogleAdsNote);

const sendTrackingEvent = (eventName, callback) => {
  if (typeof window.gtag !== "function" || !eventName) {
    return false;
  }

  try {
    window.gtag("event", eventName, {
      event_callback: callback,
      event_timeout: 500,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const sendConversionEvent = (eventName, callback) => {
  const sendTo = googleAdsConversions[eventName];
  if (typeof window.gtag !== "function" || !sendTo) {
    return false;
  }

  try {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      event_callback: callback,
      event_timeout: 500,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const navigateAfterTracking = (href, eventName) => {
  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = href;
  };
  const conversionSendStarted = sendConversionEvent(eventName, navigate);

  if (conversionSendStarted) {
    window.setTimeout(navigate, 550);
    return;
  }

  if (sendTrackingEvent(eventName, navigate)) {
    window.setTimeout(navigate, 550);
    return;
  }

  navigate();
};

trackedLinks.forEach((link) => {
  if (link.dataset.trackingReady === "true") return;
  link.dataset.trackingReady = "true";

  link.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;

    appendGoogleAdsNote(link);

    const eventName = link.dataset.trackEvent;
    const href = link.href;
    const shouldDelayNavigation = adsClickEvents.has(eventName) && !link.target && href;

    if (shouldDelayNavigation) {
      event.preventDefault();
      if (googleAdsConversions[eventName]) {
        sendTrackingEvent(eventName);
      }
      navigateAfterTracking(href, eventName);
      return;
    }

    sendTrackingEvent(eventName);
    sendConversionEvent(eventName);
  });
});

if (document.body.classList.contains("express-page")) {
  sendTrackingEvent("view_express");
}
})();

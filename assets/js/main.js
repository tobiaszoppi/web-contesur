const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const year = document.querySelector("[data-year]");
const trackedLinks = document.querySelectorAll("[data-track-event]");
const expressLinks = document.querySelectorAll('a[href="volquete-express/"]');

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
    if (key.startsWith("utm_") || key === "gclid" || key === "gbraid" || key === "wbraid") {
      campaignParams.set(key, value);
    }
  });

  if (!campaignParams.toString()) return;

  const url = new URL(link.getAttribute("href"), window.location.href);
  campaignParams.forEach((value, key) => url.searchParams.set(key, value));
  link.href = url.pathname + url.search + url.hash;
};

expressLinks.forEach(preserveCampaignParams);

const sendTrackingEvent = (eventName) => {
  if (typeof window.gtag === "function" && eventName) {
    window.gtag("event", eventName);
  }
};

trackedLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sendTrackingEvent(link.dataset.trackEvent);
  });
});

/**
 * GDPR cookie consent for kartina.
 * Single on-page gate; barcode and ads load only after "Pieņemt visas".
 */
(function () {
  var STORAGE_KEY = "kartina_cookie_consent";
  var CONSENT_ESSENTIAL = "essential";
  var CONSENT_ALL = "all";

  var GATE_COPY = {
    pending: {
      title: "Svītrkods ir aizsargāts",
      text: "Lai skaidri redzētu svītrkodu, lūdzu pieņemiet sīkdatnes.",
    },
    essential: {
      title: "Sīkdatnes noraidītas",
      text: "Jūs noraidījāt sīkdatnes — svītrkods paliek aizsargāts. Lai to skaidri redzētu, pieņemiet sīkdatnes.",
    },
  };

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* storage blocked */
    }
  }

  function hasAdConsent() {
    return getConsent() === CONSENT_ALL;
  }

  function syncConsentState() {
    var consent = getConsent();
    var level = consent === CONSENT_ALL ? "all" : consent === CONSENT_ESSENTIAL ? "essential" : "pending";
    document.documentElement.setAttribute("data-consent", level);
    updateGateUI(level);
  }

  function updateGateUI(level) {
    var titleEl = document.getElementById("gate-title");
    var textEl = document.getElementById("gate-text");
    if (!titleEl || !textEl) return;

    var copy = level === "essential" ? GATE_COPY.essential : GATE_COPY.pending;
    titleEl.textContent = copy.title;
    textEl.textContent = copy.text;
  }

  function acceptAll() {
    setConsent(CONSENT_ALL);
    syncConsentState();
    loadAdvertisingIfConfigured();
  }

  function rejectNonEssential() {
    setConsent(CONSENT_ESSENTIAL);
    syncConsentState();
  }

  function changeChoice(e) {
    if (e) e.preventDefault();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {}
    syncConsentState();
  }

  function loadAdvertisingIfConfigured() {
    if (!hasAdConsent()) return;
    var cfg = window.kartinaAdConfig;
    if (!cfg || !cfg.client || /X{4,}/.test(cfg.client)) return;

    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
      encodeURIComponent(cfg.client);
    script.crossOrigin = "anonymous";
    script.onload = function () {
      var slot = document.getElementById("ad-slot");
      if (!slot) return;
      var placeholder = slot.querySelector(".ad-placeholder");
      if (placeholder) placeholder.remove();

      if (cfg.slot && !/X{4,}/.test(String(cfg.slot))) {
        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", cfg.client);
        ins.setAttribute("data-ad-slot", String(cfg.slot));
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        slot.appendChild(ins);
      }

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };
    document.head.appendChild(script);
  }

  window.kartinaCookieConsent = {
    getConsent: getConsent,
    hasAdConsent: hasAdConsent,
    changeChoice: changeChoice,
    loadAdvertisingIfConfigured: loadAdvertisingIfConfigured,
  };

  document.addEventListener("DOMContentLoaded", function () {
    syncConsentState();

    if (getConsent() === CONSENT_ALL) {
      loadAdvertisingIfConfigured();
    }

    document.querySelectorAll("[data-cookie-accept]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        acceptAll();
      });
    });

    document.querySelectorAll("[data-cookie-reject]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        rejectNonEssential();
      });
    });

    document.querySelectorAll("[data-cookie-change]").forEach(function (el) {
      el.addEventListener("click", changeChoice);
    });
  });
})();

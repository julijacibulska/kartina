/**
 * GDPR / ePrivacy cookie consent for kartina.
 * Stores choice in localStorage. Advertising scripts load only after "Accept".
 */
(function () {
  var STORAGE_KEY = "kartina_cookie_consent";
  var CONSENT_ESSENTIAL = "essential";
  var CONSENT_ALL = "all";

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

  function createBanner() {
    if (document.getElementById("cookie-banner")) return;

    var banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.setAttribute("aria-live", "polite");

    var inner = document.createElement("div");
    inner.className = "cookie-banner-inner";

    var p = document.createElement("p");
    var linkCookies = document.createElement("a");
    linkCookies.href = "cookies.html";
    linkCookies.textContent = "Cookie policy";
    var linkPrivacy = document.createElement("a");
    linkPrivacy.href = "privacy.html";
    linkPrivacy.textContent = "Privacy policy";
    p.appendChild(
      document.createTextNode(
        "We use essential storage to remember your choice. With your permission, advertising partners (e.g. Google) may use cookies for ads and measurement. "
      )
    );
    p.appendChild(linkCookies);
    p.appendChild(document.createTextNode(" · "));
    p.appendChild(linkPrivacy);

    var actions = document.createElement("div");
    actions.className = "cookie-banner-actions";

    var acceptBtn = document.createElement("button");
    acceptBtn.type = "button";
    acceptBtn.className = "cookie-btn cookie-btn-accept";
    acceptBtn.id = "cookie-accept";
    acceptBtn.textContent = "Accept all";

    var rejectBtn = document.createElement("button");
    rejectBtn.type = "button";
    rejectBtn.className = "cookie-btn cookie-btn-reject";
    rejectBtn.id = "cookie-reject";
    rejectBtn.textContent = "Reject non-essential";

    var settingsBtn = document.createElement("button");
    settingsBtn.type = "button";
    settingsBtn.className = "cookie-btn cookie-btn-settings";
    settingsBtn.id = "cookie-settings";
    settingsBtn.textContent = "Change cookie choice";

    actions.appendChild(acceptBtn);
    actions.appendChild(rejectBtn);
    actions.appendChild(settingsBtn);
    inner.appendChild(p);
    inner.appendChild(actions);
    banner.appendChild(inner);
    document.body.appendChild(banner);

    acceptBtn.addEventListener("click", function () {
      setConsent(CONSENT_ALL);
      hideBanner();
      loadAdvertisingIfConfigured();
    });

    rejectBtn.addEventListener("click", function () {
      setConsent(CONSENT_ESSENTIAL);
      hideBanner();
    });

    settingsBtn.addEventListener("click", function () {
      showBanner();
    });
  }

  function showBanner() {
    if (!document.getElementById("cookie-banner")) createBanner();
    var banner = document.getElementById("cookie-banner");
    banner.hidden = false;
    requestAnimationFrame(function () {
      banner.classList.add("is-visible");
    });
  }

  function hideBanner() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;
    banner.classList.remove("is-visible");
    setTimeout(function () {
      banner.hidden = true;
    }, 260);
  }

  /**
   * After AdSense approval, set before this script loads:
   * window.kartinaAdConfig = { client: "ca-pub-XXX", slot: "YYYY" };
   */
  function loadAdvertisingIfConfigured() {
    if (!hasAdConsent()) return;
    var cfg = window.kartinaAdConfig;
    if (!cfg || !cfg.client) return;

    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
      encodeURIComponent(cfg.client);
    script.crossOrigin = "anonymous";
    script.onload = function () {
      var slot = document.getElementById("ad-slot");
      if (!slot || !cfg.slot) return;
      var placeholder = slot.querySelector(".ad-placeholder");
      if (placeholder) placeholder.remove();
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", cfg.client);
      ins.setAttribute("data-ad-slot", cfg.slot);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      slot.appendChild(ins);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };
    document.head.appendChild(script);
  }

  window.kartinaCookieConsent = {
    getConsent: getConsent,
    hasAdConsent: hasAdConsent,
    showBanner: showBanner,
    revoke: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      showBanner();
    },
    loadAdvertisingIfConfigured: loadAdvertisingIfConfigured,
  };

  document.addEventListener("DOMContentLoaded", function () {
    createBanner();
    var consent = getConsent();
    if (!consent) {
      showBanner();
    } else if (consent === CONSENT_ALL) {
      loadAdvertisingIfConfigured();
    }

    document.querySelectorAll("[data-cookie-settings]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner();
      });
    });
  });
})();

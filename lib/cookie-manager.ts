/**
 * Cookie Manager - Handles real cookie consent management
 * Automatically detects and manages cookies based on user consent
 */

export type ConsentKey = "essential" | "marketing" | "analytics" | "functional";
export type ConsentDecision = "accepted-all" | "rejected-all" | "custom";
export type ConsentMap = Record<ConsentKey, boolean>;

const STORAGE_KEY = "uxbits.cookie-consent";

export interface CookieConfig {
  name: string;
  category: ConsentKey;
  description?: string;
  domain?: string;
  pattern?: RegExp; // For matching cookie patterns like "ga_*"
}

/**
 * Default cookie configurations
 * Add your app's cookies here or they'll be auto-detected
 */
export const DEFAULT_COOKIE_CONFIGS: CookieConfig[] = [
  // Essential cookies
  {
    name: "sidebar:state",
    category: "essential",
    description: "Stores sidebar state preference",
  },
  {
    name: STORAGE_KEY,
    category: "essential",
    description: "Stores cookie consent preferences",
  },
  {
    name: "theme",
    category: "essential",
    description: "Stores theme preference (light/dark mode)",
  },

  // Analytics cookies (Google Analytics example)
  {
    name: "_ga",
    category: "analytics",
    description: "Google Analytics - Main cookie",
    pattern: /^_ga/,
  },
  {
    name: "_gid",
    category: "analytics",
    description: "Google Analytics - Session ID",
  },
  {
    name: "_gat",
    category: "analytics",
    description: "Google Analytics - Throttle requests",
    pattern: /^_gat/,
  },

  // Marketing cookies (example)
  {
    name: "_fbp",
    category: "marketing",
    description: "Facebook Pixel",
  },
  {
    name: "_gcl_au",
    category: "marketing",
    description: "Google AdSense",
  },

  // Functional cookies
  {
    name: "lang",
    category: "functional",
    description: "Language preference",
  },
  {
    name: "region",
    category: "functional",
    description: "Region/location preference",
  },
];

/**
 * Get all cookies from the browser
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === "undefined") return {};

  const cookies: Record<string, string> = {};
  const cookieString = document.cookie;

  if (!cookieString) return cookies;

  cookieString.split(";").forEach((cookie) => {
    const [name, ...valueParts] = cookie.split("=");
    const value = valueParts.join("=");
    if (name && value) {
      cookies[name.trim()] = decodeURIComponent(value.trim());
    }
  });

  return cookies;
}

/**
 * Detect cookies and categorize them based on configuration
 */
export function detectCookies(
  configs: CookieConfig[] = DEFAULT_COOKIE_CONFIGS
): Map<ConsentKey, Set<string>> {
  const categorized = new Map<ConsentKey, Set<string>>([
    ["essential", new Set()],
    ["marketing", new Set()],
    ["analytics", new Set()],
    ["functional", new Set()],
  ]);

  const currentCookies = getAllCookies();
  const cookieNames = Object.keys(currentCookies);

  // Categorize known cookies
  cookieNames.forEach((cookieName) => {
    const config = configs.find(
      (c) => c.name === cookieName || (c.pattern && c.pattern.test(cookieName))
    );

    if (config) {
      categorized.get(config.category)?.add(cookieName);
    } else {
      // Unknown cookies go to functional by default (most conservative)
      categorized.get("functional")?.add(cookieName);
    }
  });

  return categorized;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, domain?: string) {
  if (typeof document === "undefined") return;

  const paths = ["/", window.location.pathname];
  const domains = domain
    ? [domain, `.${domain}`]
    : [window.location.hostname, `.${window.location.hostname}`];

  // Try multiple combinations to ensure deletion
  paths.forEach((path) => {
    domains.forEach((dom) => {
      document.cookie = `${name}=; path=${path}; domain=${dom}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;
      document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;
    });
  });

  // Final cleanup without domain
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;
}

/**
 * Enforce consent by removing cookies that are not allowed
 */
export function enforceConsent(
  consents: ConsentMap,
  configs: CookieConfig[] = DEFAULT_COOKIE_CONFIGS
) {
  if (typeof window === "undefined") return;

  const categorized = detectCookies(configs);

  // Check each category
  (Object.keys(consents) as ConsentKey[]).forEach((category) => {
    if (!consents[category] && category !== "essential") {
      // User rejected this category, delete all cookies in it
      const cookiesInCategory = categorized.get(category);

      cookiesInCategory?.forEach((cookieName) => {
        // Don't delete if it's actually in localStorage
        if (cookieName === STORAGE_KEY) return;

        const config = configs.find((c) => c.name === cookieName);
        deleteCookie(cookieName, config?.domain);
      });
    }
  });

  // Block scripts based on consent
  blockScripts(consents);
}

/**
 * Block or unblock tracking scripts based on consent
 */
export function blockScripts(consents: ConsentMap) {
  if (typeof window === "undefined") return;

  // Block Google Analytics if analytics not consented
  if (!consents.analytics) {
    // @ts-expect-error - GA disable flag
    window["ga-disable-GA_MEASUREMENT_ID"] = true;
    // @ts-expect-error - gtag may not be defined
    if (window.gtag) {
      // @ts-expect-error - gtag consent API
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  } else {
    // @ts-expect-error - GA disable flag
    window["ga-disable-GA_MEASUREMENT_ID"] = false;
    // @ts-expect-error - gtag may not be defined
    if (window.gtag) {
      // @ts-expect-error - gtag consent API
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  // Block marketing scripts
  if (!consents.marketing) {
    // @ts-expect-error - gtag may not be defined
    if (window.gtag) {
      // @ts-expect-error - gtag consent API
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  } else {
    // @ts-expect-error - gtag may not be defined
    if (window.gtag) {
      // @ts-expect-error - gtag consent API
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  }
}

/**
 * Get stored consent from localStorage
 */
export function getStoredConsent(): {
  consents: ConsentMap;
  decision: ConsentDecision;
} | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return {
      consents: parsed.consents || null,
      decision: parsed.decision || "custom",
    };
  } catch (error) {
    console.error("Failed to parse cookie consent:", error);
    return null;
  }
}

/**
 * Save consent to localStorage
 */
export function saveConsent(consents: ConsentMap, decision: ConsentDecision) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        consents,
        decision,
        updatedAt: new Date().toISOString(),
      })
    );

    // Enforce the consent immediately
    enforceConsent(consents);

    // Dispatch custom event for other parts of the app to listen to
    window.dispatchEvent(
      new CustomEvent("cookieConsentChange", {
        detail: { consents, decision },
      })
    );
  } catch (error) {
    console.error("Failed to save cookie consent:", error);
  }
}

/**
 * Hook to listen for consent changes
 */
export function onConsentChange(
  callback: (consents: ConsentMap, decision: ConsentDecision) => void
) {
  if (typeof window === "undefined") return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{
      consents: ConsentMap;
      decision: ConsentDecision;
    }>;
    callback(customEvent.detail.consents, customEvent.detail.decision);
  };

  window.addEventListener("cookieConsentChange", handler);

  return () => {
    window.removeEventListener("cookieConsentChange", handler);
  };
}

/**
 * Get cookie statistics for display
 */
export function getCookieStats(
  configs: CookieConfig[] = DEFAULT_COOKIE_CONFIGS
): Record<ConsentKey, number> {
  const categorized = detectCookies(configs);

  return {
    essential: categorized.get("essential")?.size || 0,
    marketing: categorized.get("marketing")?.size || 0,
    analytics: categorized.get("analytics")?.size || 0,
    functional: categorized.get("functional")?.size || 0,
  };
}

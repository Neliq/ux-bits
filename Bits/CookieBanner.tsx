"use client";

import * as React from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  type ConsentKey,
  type ConsentDecision,
  getStoredConsent,
  saveConsent,
  getCookieStats,
  enforceConsent,
} from "@/lib/cookie-manager";

type ConsentMap = Record<ConsentKey, boolean>;

const CONSENT_CATEGORIES = [
  {
    key: "essential" as const,
    label: "Essential",
    description:
      "Essential cookies and services are used to enable core website features, such as ensuring the security of the website.",
    required: true,
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description:
      "Marketing cookies and services are used to deliver personalized advertisements, promotions, and offers by collecting information about your interests and online activities.",
    required: false,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    description:
      "Analytics cookies and services collect statistical information about how visitors interact with the site to help us understand performance and improve the experience.",
    required: false,
  },
  {
    key: "functional" as const,
    label: "Functional",
    description:
      "Functional cookies and services provide enhanced and personalized features, such as remembering language preferences or customized layouts.",
    required: false,
  },
];

const defaultConsents: ConsentMap = {
  essential: true,
  marketing: false,
  analytics: false,
  functional: false,
};

function buildConsents(value: boolean): ConsentMap {
  return CONSENT_CATEGORIES.reduce<ConsentMap>(
    (acc, category) => {
      acc[category.key] = category.required ? true : value;
      return acc;
    },
    { ...defaultConsents }
  );
}

export function CookieBanner() {
  const [isBannerVisible, setIsBannerVisible] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [consents, setConsents] = React.useState<ConsentMap>(defaultConsents);
  const [cookieStats, setCookieStats] = React.useState<
    Record<ConsentKey, number>
  >({
    essential: 0,
    marketing: 0,
    analytics: 0,
    functional: 0,
  });

  // Load stored consent and detect cookies
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = getStoredConsent();

      if (stored?.consents) {
        const nextConsents: ConsentMap = { ...defaultConsents };

        for (const key of Object.keys(nextConsents) as ConsentKey[]) {
          const value = stored.consents[key];
          nextConsents[key] = key === "essential" ? true : Boolean(value);
        }

        setConsents(nextConsents);
        setIsBannerVisible(false);

        // Enforce consent on page load
        enforceConsent(nextConsents);
        return;
      }

      setIsBannerVisible(true);
    } catch (error) {
      console.error("Failed to parse cookie consent state", error);
      setIsBannerVisible(true);
    }
  }, []);

  // Update cookie stats when dialog opens
  React.useEffect(() => {
    if (isDialogOpen) {
      setCookieStats(getCookieStats());
    }
  }, [isDialogOpen]);

  const persistConsent = React.useCallback(
    (nextConsents: ConsentMap, decision: ConsentDecision) => {
      setConsents(nextConsents);
      saveConsent(nextConsents, decision);
    },
    []
  );

  const handleAcceptAll = React.useCallback(() => {
    const next = buildConsents(true);
    persistConsent(next, "accepted-all");
    setIsDialogOpen(false);
    setIsBannerVisible(false);
  }, [persistConsent]);

  const handleRejectAll = React.useCallback(() => {
    const next = buildConsents(false);
    persistConsent(next, "rejected-all");
    setIsDialogOpen(false);
    setIsBannerVisible(false);
  }, [persistConsent]);

  const handleSavePreferences = React.useCallback(() => {
    const next: ConsentMap = { ...consents, essential: true };
    persistConsent(next, "custom");
    setIsDialogOpen(false);
    setIsBannerVisible(false);
  }, [consents, persistConsent]);

  const handleToggleChange = React.useCallback(
    (key: ConsentKey, value: boolean) => {
      setConsents((prev) => ({
        ...prev,
        [key]: key === "essential" ? true : value,
      }));
    },
    []
  );

  if (!isBannerVisible) {
    return null;
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="gap-3 text-left">
            <DialogTitle className="sr-only">Cookie preferences</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              This site uses tracking technologies. You may opt in or opt out of
              the use of these technologies.
            </DialogDescription>
          </DialogHeader>

          <Accordion
            type="multiple"
            className="mt-4 divide-y rounded-lg border"
          >
            {CONSENT_CATEGORIES.map((category) => {
              const switchId = `cookie-toggle-${category.key}`;

              return (
                <AccordionItem
                  key={category.key}
                  value={category.key}
                  className="border-border/70 px-4"
                >
                  <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <AccordionTrigger className="flex-1 items-center justify-between gap-3 px-0 py-0 text-left text-base font-semibold hover:no-underline focus-visible:ring-offset-0 [&_svg]:hidden">
                      <span className="flex items-center gap-2">
                        {category.label}
                        {cookieStats[category.key] > 0 && (
                          <span className="text-xs font-normal text-muted-foreground">
                            ({cookieStats[category.key]} cookie
                            {cookieStats[category.key] !== 1 ? "s" : ""})
                          </span>
                        )}
                      </span>
                    </AccordionTrigger>

                    <div className="flex items-center gap-3">
                      <Switch
                        id={switchId}
                        checked={consents[category.key]}
                        disabled={category.required}
                        onCheckedChange={(checked) =>
                          handleToggleChange(category.key, checked)
                        }
                      />
                      <label
                        htmlFor={switchId}
                        className="text-sm font-medium text-muted-foreground"
                      >
                        {consents[category.key] ? "On" : "Off"}
                      </label>
                    </div>
                  </div>

                  <AccordionContent className="px-0 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSavePreferences}
            >
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleRejectAll}>
              Deny
            </Button>
            <Button size="sm" onClick={handleAcceptAll}>
              Accept all
            </Button>
            <Link
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        className="fixed bottom-0 left-0 z-50 flex justify-start px-4 pb-4 sm:px-6"
      >
        <div className="relative w-full max-w-sm rounded-2xl border bg-background p-5 shadow-xl sm:w-[360px]">
          <button
            type="button"
            aria-label="Close banner"
            className="absolute right-4 top-4 rounded-md border border-transparent p-2 text-muted-foreground transition hover:border-border hover:text-foreground"
            onClick={handleRejectAll}
          >
            <XIcon className="size-4" />
          </button>

          <div className="space-y-4">
            <p
              id="cookie-banner-title"
              className="text-sm text-muted-foreground"
            >
              This site uses tracking technologies. You may opt in or opt out of
              the use of these technologies.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleRejectAll}>
                Deny
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept all
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="px-2 text-primary hover:bg-transparent hover:underline"
                onClick={() => setIsDialogOpen(true)}
              >
                Consent Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookieBanner;

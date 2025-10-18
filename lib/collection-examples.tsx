import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { renderWordCountingShowcase } from "@/Examples/WordCountingCardExample";
import { renderCookieBannerShowcase } from "@/Examples/CookieBannerExample";
import { renderMultiFormatPhoneNumberShowcase } from "@/Examples/MultiFormatPhoneNumberExample";

export type CLICommand = {
  label: string;
  code: string;
};

export type CollectionExample = {
  slug: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl?: string;
  tags: string[];
  heroLogo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    wrapperClassName?: ClassValue;
    className?: ClassValue;
  };
  externalLink?: {
    url: string;
    label: string;
  };
  tagline: string;
  features: string[];
  previewImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: ClassValue;
  };
  whyItWorks: {
    description: string;
    keyBenefits: string[];
    perfectFor: string[];
  };
  highlight?: {
    heading?: string;
    description?: string;
    cardClassName?: ClassValue;
    render: () => ReactNode;
    previewLabel?: string;
    codeLabel?: string;
    codePath?: string;
  };
  quickStart: {
    title?: string;
    steps?: string[];
  };
  cliInstallUrl?: string;
  propsTable?: {
    title?: string;
    description?: string;
    props: {
      name: string;
      type: string;
      description: string;
      required?: boolean;
    }[];
  };
  codeExamplePath?: string;
  codeExamplePaths?: {
    label: string;
    path: string;
  }[];
};

export const DEFAULT_CLI_COMMANDS: CLICommand[] = [
  { label: "npm", code: "npx next-forge@latest init" },
  { label: "yarn", code: "yarn dlx next-forge@latest init" },
  { label: "pnpm", code: "pnpx next-forge@latest init" },
  { label: "bun", code: "bunx next-forge@latest init" },
];

export const collectionExamples: CollectionExample[] = [
  {
    slug: "omarchy",
    title: "Omarchy Word Count Preview",
    summary: "Preview the word count before writers enter the editor.",
    source: "Omarchy.com",
    tags: ["Reduce Clicks", "Simplify Decision Making"],
    heroLogo: {
      src: "/omarchy-logo.jpg",
      alt: "Omarchy logo",
      width: 200,
      height: 200,
      wrapperClassName: "size-48",
      className:
        "w-full h-full bg-secondary border-border border-1 rounded-xl p-8",
    },
    externalLink: {
      url: "https://omarchy.com/",
      label: "Original example from Omarchy",
    },
    tagline: "Preview the word count before writers enter the editor.",
    features: ["Reduce Clicks", "Simplify Decision Making"],
    previewImage: {
      src: "/omarchy-thumb.png",
      alt: "Omarchy interface preview",
      width: 1200,
      height: 800,
    },
    whyItWorks: {
      description:
        "Helps users make informed decisions about content engagement by showing the time commitment upfront. This reduces friction and manages expectations before the click, therefore reducing bouce rate.",
      keyBenefits: [
        "Users can estimate reading time before committing",
        "Reduces bounce rate by setting proper expectations",
        "Helps users prioritize content based on available time",
        "Builds trust through transparency",
      ],
      perfectFor: [
        "Documentation sites with varying article lengths.",
        "Blog post listings.",
        "Educational content libraries.",
        "News aggregators.",
      ],
    },
    highlight: {
      render: renderWordCountingShowcase,
      codePath: "Examples/WordCountingCardExample.tsx",
    },
    quickStart: {
      title: "Quick Start",
      steps: [
        "1. Install component with dependencies using the CLI command above.",
        "2. Use <WordsCountingCard /> component in your codebase.",
        "3. Point the `href` prop to any article page to see it in action.",
      ],
    },
    cliInstallUrl: "https://ux.koszyka.com/r/WordsCountingCard.json",
    propsTable: {
      title: "WordsCountingCard Props",
      props: [
        {
          name: "href",
          type: "string",
          description:
            "Absolute or relative URL to the article whose word count should be displayed.",
          required: true,
        },
        {
          name: "title",
          type: "string",
          description:
            "Heading shown at the top of the card. Defaults to `Word count`.",
        },
        {
          name: "description",
          type: "string",
          description:
            "Supporting copy rendered beneath the title to explain the preview.",
        },
        {
          name: "className",
          type: "string",
          description:
            "Tailwind class names merged into the card root for custom layout.",
        },
        {
          name: "image",
          type: "string",
          description:
            "Optional hero image URL displayed above the content to reinforce context.",
        },
      ],
    },
    codeExamplePath: "Bits/WordsCountingCard.tsx",
  },
  {
    slug: "cookie-banner",
    title: "GDPR Cookie Consent Banner",
    summary: "A non-frustrating cookie banner that actually manages cookies.",
    source: "Vercel",
    tags: ["Privacy", "GDPR", "Cookie Management", "Compliance"],
    heroLogo: {
      src: "/vercel-logo.png",
      alt: "Vercel Logo",
      width: 200,
      height: 200,
      wrapperClassName: "size-48",
      className:
        "w-full h-full bg-secondary border-border border-1 rounded-xl p-8",
    },
    tagline:
      "Full-featured cookie consent with automatic detection and real cookie management.",
    features: [
      "Auto-detects cookies",
      "GDPR Compliant",
      "Actually deletes cookies",
      "Blocks tracking scripts",
    ],
    externalLink: {
      url: "https://vercel.com/",
      label: "Original example from Vercel",
    },
    previewImage: {
      src: "/vercel-thumb.png",
      alt: "Cookie consent interface",
      width: 1200,
      height: 800,
    },
    whyItWorks: {
      description:
        "Unlike basic cookie banners that only show a UI, this component actually manages cookies by detecting them, categorizing them, and deleting non-consented cookies in real-time. It integrates with Google Analytics consent mode and other tracking scripts.",
      keyBenefits: [
        "Automatically detects all cookies in your application",
        "Actually enforces user consent by deleting cookies",
        "Integrates with Google Analytics Consent Mode",
        "Shows live count of cookies per category",
        "Plug-and-play - just add to your layout",
        "Stores preferences across sessions",
      ],
      perfectFor: [
        "Any website that needs GDPR compliance",
        "Applications with analytics tracking",
        "Sites with marketing cookies",
        "Privacy-conscious applications",
      ],
    },
    highlight: {
      heading: "See It In Action",
      description:
        "The banner automatically detects cookies and lets users control them by category. Clear your browser cookies to see the initial banner.",
      render: renderCookieBannerShowcase,
      codePath: "Examples/CookieBannerExample.tsx",
    },
    quickStart: {
      title: "Quick Start",
      steps: [
        "1. Install the component using the CLI command above.",
        "2. Add <CookieBanner /> to your root layout.",
        "3. Customize cookie categories in lib/cookie-manager.ts if needed.",
        "4. The component will automatically detect and manage all cookies.",
      ],
    },
    cliInstallUrl: "https://ux.koszyka.com/r/CookieBanner.json",
    propsTable: {
      title: "Configuration",
      description:
        "The Cookie Banner works out of the box with no props required. Customize by editing DEFAULT_COOKIE_CONFIGS in lib/cookie-manager.ts.",
      props: [
        {
          name: "DEFAULT_COOKIE_CONFIGS",
          type: "CookieConfig[]",
          description:
            "Array of cookie configurations that define which cookies belong to which category. Edit in lib/cookie-manager.ts.",
          required: false,
        },
      ],
    },
    codeExamplePaths: [
      {
        label: "CookieBanner.tsx",
        path: "Bits/CookieBanner.tsx",
      },
      {
        label: "cookie-manager.ts",
        path: "lib/cookie-manager.ts",
      },
    ],
  },
  {
    slug: "multi-format-phone-number",
    title: "Multi-format Phone Number Form",
    summary:
      "Collect global phone numbers without forcing a strict format upfront.",
    source: "UX Bits",
    tags: ["Forms", "Internationalization", "Validation"],
    heroLogo: {
      src: "/favicon.svg",
      alt: "UX Bits logo",
      width: 200,
      height: 200,
      wrapperClassName: "size-48",
      className:
        "w-full h-full bg-secondary border border-border rounded-xl p-6",
    },
    tagline:
      "Parse country codes directly from what users type or from a quick selector.",
    features: [
      "Supports typed or selected country codes",
      "Normalizes whitespace automatically",
      "Guards against invalid characters",
    ],
    previewImage: {
      src: "/phone-format-thumb.png",
      alt: "Phone number form preview",
      width: 1200,
      height: 800,
    },
    whyItWorks: {
      description:
        "Combining a country picker with forgiving input parsing means customers can share their number the way they naturally would while you still receive clean, structured data.",
      keyBenefits: [
        "Accepts numbers with or without spaces",
        "Extracts country codes from typed input automatically",
        "Prevents alphabetic or special characters from slipping through",
      ],
      perfectFor: [
        "Multi-region signup and onboarding flows.",
        "Support intake or call-back request forms.",
        "Checkout experiences that require a contact number.",
      ],
    },
    highlight: {
      heading: "See The Parsing In Action",
      description:
        "Pick a country or type an international number like +44 7700 900123 to watch the component normalise it.",
      render: renderMultiFormatPhoneNumberShowcase,
      codePath: "Examples/MultiFormatPhoneNumberExample.tsx",
    },
    quickStart: {
      title: "Quick Start",
      steps: [
        "1. Install the component using the CLI command above.",
        "2. Drop <PhoneNumberForm /> into any form that captures phone numbers.",
        "3. Extend the `countries` list to cover every market you support.",
      ],
    },
    cliInstallUrl: "https://ux.koszyka.com/r/MultiFormatPhoneNumber.json",
    codeExamplePaths: [
      {
        label: "MultiFormatPhoneNumber.tsx",
        path: "Bits/MultiFormatPhoneNumber.tsx",
      },
    ],
  },
];

const collectionExampleMap = new Map<string, CollectionExample>(
  collectionExamples.map((example) => [example.slug, example])
);

export function getCollectionExample(
  slug: string
): CollectionExample | undefined {
  return collectionExampleMap.get(slug);
}

export const collectionExampleSlugs = collectionExamples.map((example) => ({
  slug: example.slug,
}));

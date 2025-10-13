import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { renderWordCountingShowcase } from "@/Examples/WordCountingCardExample";

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
    description?: string;
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
  codeExamplePath: string;
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
        "Omarchy leverages responsive layouts and real-time analytics to surface metrics ahead of engagement, helping teams reduce churn and improve content quality.",
      keyBenefits: [
        "Highlights word counts inline so writers can gauge scope instantly.",
        "Keeps the interface lightweight by calculating metrics server-side.",
        "Adapts to any CMS thanks to client-agnostic UI primitives.",
      ],
      perfectFor: [
        "Editorial dashboards that coach contributors.",
        "Knowledge bases tracking structured content goals.",
        "Product education flows with progressive disclosure.",
      ],
    },
    highlight: {
      render: renderWordCountingShowcase,
      codePath: "Examples/WordCountingCardExample.tsx",
    },
    quickStart: {
      title: "Quick Start",
      description: "Roll out the preview pattern in minutes.",
      steps: [
        "1. Install component with dependencies using the CLI command above.",
        "2. Use <WordsCountingCard /> component in your codebase.",
        "3. Point the `href` prop to any article page to see it in action.",
      ],
    },
    cliInstallUrl: "https://ux.koszyka.com/r/WordsCountingCard.json",
    propsTable: {
      title: "WordsCountingCard Props",
      description:
        "Use these props to tailor the preview card to your content workflow.",
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

import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { UsageChartHighlight } from "@/components/examples/usage-chart-highlight";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  };
  quickStart: {
    title?: string;
    description?: string;
    steps?: string[];
  };
  cliCommands?: CLICommand[];
  codeExamplePath: string;
};

export const DEFAULT_CLI_COMMANDS: CLICommand[] = [
  { label: "npm", code: "npx next-forge@latest init" },
  { label: "yarn", code: "yarn dlx next-forge@latest init" },
  { label: "pnpm", code: "pnpx next-forge@latest init" },
  { label: "bun", code: "bunx next-forge@latest init" },
];

const onboardingAccordionItems = [
  {
    value: "profile",
    title: "Complete workspace profile",
    content:
      "Personalize the team hub so everyone lands on the right projects immediately.",
  },
  {
    value: "templates",
    title: "Install launch templates",
    content:
      "Pick three starter automations to help new teammates ship value on day one.",
  },
  {
    value: "notifications",
    title: "Tune notification channels",
    content:
      "Choose which nudges arrive in Slack versus email to reduce noise.",
  },
];

const renderButtonShowcase = () => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    <Button size="lg">Start writing</Button>
    <Button variant="secondary" size="lg">
      Preview draft
    </Button>
    <Button variant="outline" size="lg">
      Share link
    </Button>
    <Button variant="ghost" size="lg">
      View analytics
    </Button>
  </div>
);

const renderAccordionShowcase = () => (
  <Accordion
    type="single"
    collapsible
    className="w-full max-w-md rounded-xl border border-border bg-background"
    defaultValue="profile"
  >
    {onboardingAccordionItems.map((item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger className="text-left text-base">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="text-sm text-secondary-foreground">
          {item.content}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const renderTabsShowcase = () => (
  <Tabs defaultValue="tokens" className="w-full max-w-lg">
    <TabsList className="mx-auto">
      <TabsTrigger value="tokens">Tokens</TabsTrigger>
      <TabsTrigger value="components">Components</TabsTrigger>
      <TabsTrigger value="handoff">Handoff</TabsTrigger>
    </TabsList>
    <div className="rounded-xl border border-border bg-background p-6 text-left shadow-sm">
      <TabsContent
        value="tokens"
        className="space-y-2 text-sm text-secondary-foreground"
      >
        <p className="font-medium text-foreground">Sync live tokens</p>
        <p>
          Export color, type, and spacing decisions directly into your codebase
          with a single commit.
        </p>
      </TabsContent>
      <TabsContent
        value="components"
        className="space-y-2 text-sm text-secondary-foreground"
      >
        <p className="font-medium text-foreground">Map Figma components</p>
        <p>
          Automatically link documented variants to their React counterparts so
          engineers never guess props again.
        </p>
      </TabsContent>
      <TabsContent
        value="handoff"
        className="space-y-2 text-sm text-secondary-foreground"
      >
        <p className="font-medium text-foreground">Share handoff packets</p>
        <p>
          Generate Storybook stories and pull request summaries co-authored by
          design specs.
        </p>
      </TabsContent>
    </div>
  </Tabs>
);

const renderChartShowcase = () => <UsageChartHighlight />;

export const collectionExamples: CollectionExample[] = [
  {
    slug: "omarchy",
    title: "Omarchy Word Count Preview",
    summary: "Preview the word count before writers enter the editor.",
    source: "Omarchy.com",
    tags: ["New", "Featured"],
    heroLogo: {
      src: "/Next.js.svg",
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
    tagline:
      "Bridge the gap between content length and readability before editors start typing.",
    features: ["Copy-Paste Ready", "CLI Install", "UX Data Driven"],
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
      heading: "Preview primary button states",
      description:
        "Ship the Word Count action bar with production-ready button variants and spatial rhythm baked in.",
      cardClassName:
        "bg-secondary flex flex-col items-center justify-center gap-6 p-10 text-center",
      render: renderButtonShowcase,
    },
    quickStart: {
      title: "Quick Start",
      description: "Roll out the preview pattern in minutes.",
      steps: [
        "Install dependencies with the CLI commands above.",
        "Copy the WordCount component into your UI library.",
        "Bind the component to your content source and thresholds.",
      ],
    },
    cliCommands: DEFAULT_CLI_COMMANDS,
    codeExamplePath: "components/ui/button.tsx",
  },
  {
    slug: "tailwind-onboarding",
    title: "Tailwind Signup Onboarding",
    summary: "Guide new users through tailored setup tasks on first login.",
    source: "Tailwind CSS",
    tags: ["Lifecycle", "Activation"],
    heroLogo: {
      src: "/Tailwind CSS.svg",
      alt: "Tailwind CSS logo",
      width: 200,
      height: 200,
      wrapperClassName: "size-48",
      className:
        "w-full h-full rounded-xl border-1 border-border bg-secondary p-6",
    },
    externalLink: {
      url: "https://tailwindcss.com/",
      label: "Tailwind CSS inspiration",
    },
    tagline:
      "Launch an onboarding checklist that nudges new teams toward their first success metric.",
    features: ["Personalized Tasks", "Progress Tracking", "Responsive Layout"],
    previewImage: {
      src: "/omarchy-thumb.png",
      alt: "Tailwind onboarding preview",
      width: 1200,
      height: 800,
      className: "border-dashed border-1",
    },
    whyItWorks: {
      description:
        "Segmented milestones keep attention on quick wins and reduce the cognitive load of long-form configuration.",
      keyBenefits: [
        "Highlights only the next best action for each persona.",
        "Pairs contextual education with inline execution.",
        "Surfaces celebration states to reinforce momentum.",
      ],
      perfectFor: [
        "SaaS dashboards that must drive early retention.",
        "Community products introducing moderation tooling.",
        "Internal platforms with role-specific launch tasks.",
      ],
    },
    highlight: {
      heading: "Walkthrough accordion in motion",
      description:
        "Give new members focused tasks paired with tooling links, all in a single collapsible surface.",
      cardClassName:
        "bg-secondary flex flex-col items-center justify-center gap-6 p-10 text-center",
      render: renderAccordionShowcase,
    },
    quickStart: {
      title: "Spin it up fast",
      description: "Connect the checklist to your existing auth state.",
      steps: [
        "Add the OnboardingChecklist component to your dashboard shell.",
        "Pass persona tags from your identity provider.",
        "Persist completion in feature flag storage or your primary DB.",
      ],
    },
    cliCommands: DEFAULT_CLI_COMMANDS,
    codeExamplePath: "components/ui/accordion.tsx",
  },
  {
    slug: "figma-handoff",
    title: "Figma Design Handoff",
    summary: "Translate design tokens into coded components automatically.",
    source: "Figma",
    tags: ["Design Systems", "Automation"],
    heroLogo: {
      src: "/figma-logo-svgrepo-com.svg",
      alt: "Figma logo",
      width: 200,
      height: 200,
      wrapperClassName: "size-48",
      className:
        "w-full h-full rounded-xl border-1 border-border bg-secondary p-8",
    },
    externalLink: {
      url: "https://www.figma.com/community",
      label: "Reference Figma file",
    },
    tagline:
      "Shape a repeatable spec-to-code workflow that bridges designers and engineers without manual exports.",
    features: ["Live Tokens", "Linters", "Component Mapping"],
    previewImage: {
      src: "/omarchy-thumb.png",
      alt: "Design handoff dashboard",
      width: 1200,
      height: 800,
    },
    whyItWorks: {
      description:
        "Designers maintain a single source of truth while engineers pull typed components, keeping parity high and churn low.",
      keyBenefits: [
        "Automates spec diffs with pull request previews.",
        "Flags mismatched tokens before merge.",
        "Exports Storybook-ready documentation instantly.",
      ],
      perfectFor: [
        "Design system guilds supporting multiple product squads.",
        "Agencies handing off sprint increments weekly.",
        "Teams migrating legacy UI kits to modern stacks.",
      ],
    },
    highlight: {
      heading: "Switch between handoff stages",
      description:
        "Tabs keep designers and engineers aligned on what ships next—with tokens, components, and rollout all present.",
      cardClassName:
        "bg-secondary flex flex-col items-center justify-center gap-6 p-10 text-center",
      render: renderTabsShowcase,
    },
    quickStart: {
      steps: [
        "Sync design tokens through the Figma REST API.",
        "Normalize token names with your design system schema.",
        "Generate component diffs and share them in Storybook.",
      ],
    },
    cliCommands: DEFAULT_CLI_COMMANDS,
    codeExamplePath: "components/ui/tabs.tsx",
  },
  {
    slug: "typescript-reporting",
    title: "TypeScript Usage Reporting",
    summary: "Monitor component adoption across product surfaces.",
    source: "Internal Platform Team",
    tags: ["Analytics"],
    heroLogo: {
      src: "/TypeScript.svg",
      alt: "TypeScript logo",
      width: 200,
      height: 200,
      wrapperClassName: "size-48",
      className:
        "w-full h-full rounded-xl border-1 border-border bg-secondary p-8",
    },
    tagline:
      "Quantify how often design system primitives appear so you can focus maintenance where it matters.",
    features: ["Usage Heatmaps", "API Coverage", "Adoption Goals"],
    previewImage: {
      src: "/omarchy-thumb.png",
      alt: "Usage reporting dashboard",
      width: 1200,
      height: 800,
    },
    whyItWorks: {
      description:
        "A centralized telemetry layer tracks imports and props, equipping teams with the insights required to evolve shared UI.",
      keyBenefits: [
        "Surfaces breaking changes before they ripple across apps.",
        "Ranks components needing refactors using weighted scoring.",
        "Feeds ROI metrics into planning rituals.",
      ],
      perfectFor: [
        "Design system councils monitoring adoption.",
        "Platform leads negotiating roadmap tradeoffs.",
        "Open source maintainers balancing contributor demand.",
      ],
    },
    highlight: {
      heading: "Usage trendlines stay visible",
      description:
        "Compare design versus engineering adoption over time to keep investments aligned.",
      cardClassName:
        "bg-secondary flex flex-col items-center justify-center gap-6 p-10 text-center",
      render: renderChartShowcase,
    },
    quickStart: {
      title: "Instrument quickly",
      steps: [
        "Wrap your component library barrel file with telemetry hooks.",
        "Emit metadata to your analytics pipeline (PostHog, Snowplow, Segment).",
        "Plot usage in a Recharts timeseries widget for visibility.",
      ],
    },
    cliCommands: [
      { label: "npm", code: "npm install @uxbits/usage-tracker" },
      { label: "yarn", code: "yarn add @uxbits/usage-tracker" },
      { label: "pnpm", code: "pnpm add @uxbits/usage-tracker" },
    ],
    codeExamplePath: "components/ui/chart.tsx",
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

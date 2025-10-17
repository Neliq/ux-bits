import CLIExample from "@/components/cli-install";
import CodeExample from "@/components/code";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  collectionExampleSlugs,
  getCollectionExample,
} from "@/lib/collection-examples";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronsDown,
  ExternalLink,
  Lightbulb,
  Sparkles,
  SquareDashedMousePointer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return collectionExampleSlugs;
}

export default async function CollectionExamplePage({ params }: PageProps) {
  const { slug } = await params;
  const example = getCollectionExample(slug);

  if (!example) {
    return notFound();
  }

  const {
    title,
    tagline,
    features,
    heroLogo,
    externalLink,
    previewImage,
    whyItWorks,
    highlight,
    quickStart,
    cliInstallUrl,
    propsTable,
    codeExamplePath,
    codeExamplePaths,
  } = example;

  // No longer need to compute commands, just use cliInstallUrl
  const quickStartSteps = quickStart.steps ?? [];
  const propsTableRows = propsTable?.props ?? [];

  // Determine which code examples to show
  const codeExamples =
    codeExamplePaths ||
    (codeExamplePath ? [{ label: "Source Code", path: codeExamplePath }] : []);

  return (
    <main className="container mx-auto px-4 pt-8">
      <Link href="/">
        <Button variant="link" className="p-0!">
          <ChevronLeft />
          Back to Home
        </Button>
      </Link>

      <div className="mx-auto mb-32 flex max-w-5xl flex-col gap-16">
        <section className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center">
          <div
            className={cn("relative", heroLogo.wrapperClassName ?? "size-48")}
          >
            <Image
              src={heroLogo.src}
              alt={heroLogo.alt}
              width={heroLogo.width}
              height={heroLogo.height}
              className={cn(
                "h-full w-full rounded-xl border-1 border-border bg-secondary p-8",
                heroLogo.className
              )}
            />
          </div>

          {externalLink && (
            <div className="flex justify-center gap-2 pt-4">
              <Link href={externalLink.url} target="_blank" rel="noreferrer">
                <Button variant="link" className="p-0!">
                  {externalLink.label}
                  <ExternalLink />
                </Button>
              </Link>
            </div>
          )}

          <h1 className="text-3xl font-semibold leading-[32px] text-foreground sm:text-5xl sm:leading-[48px]">
            {title}
          </h1>

          {tagline && (
            <p className="text-base text-secondary-foreground">{tagline}</p>
          )}

          {features.length > 0 && (
            <ul className="m-0 flex list-none flex-wrap justify-center gap-4 p-0 sm:gap-8">
              {features.map((label) => (
                <li key={label}>
                  <Badge variant="outline">{label}</Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Image
        src={previewImage.src}
        alt={previewImage.alt}
        width={previewImage.width}
        height={previewImage.height}
        className={cn(
          "h-auto w-full rounded-lg border border-border",
          previewImage.className
        )}
      />

      {(whyItWorks.description ||
        whyItWorks.keyBenefits.length > 0 ||
        whyItWorks.perfectFor.length > 0) && (
        <>
          <ChevronsDown className="mx-auto mt-8 size-16 animate-bounce text-muted" />
          <Card className="mx-auto mt-8 p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
              <Lightbulb className="text-yellow-500" />
              Why it works?
            </h2>
            {whyItWorks.description && (
              <p className="mt-4 max-w-3xl text-secondary-foreground">
                {whyItWorks.description}
              </p>
            )}
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {whyItWorks.keyBenefits.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-medium">
                    <BadgeCheck className="text-blue-500" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-2 pl-4 text-sm text-secondary-foreground list-disc">
                    {whyItWorks.keyBenefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              {whyItWorks.perfectFor.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-medium">
                    <Sparkles className="text-indigo-500" />
                    Perfect for
                  </h3>
                  <ul className="space-y-2 pl-4 text-sm text-secondary-foreground list-disc">
                    {whyItWorks.perfectFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {highlight && (
        <>
          <ChevronsDown className="mx-auto mt-8 size-16 animate-bounce text-muted" />
          <Tabs defaultValue="preview" className="mx-auto w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="preview">
                  {highlight.previewLabel ?? "Preview"}
                </TabsTrigger>
                {highlight.codePath && (
                  <TabsTrigger value="code">
                    {highlight.codeLabel ?? "Code"}
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            <TabsContent value="preview" className="mt-4">
              <Card
                className={cn(
                  "w-full bg-secondary p-10",
                  highlight.cardClassName
                )}
              >
                <div className="flex flex-col gap-6">
                  {highlight.heading && (
                    <h2 className="text-2xl font-semibold text-foreground text-center">
                      {highlight.heading}
                    </h2>
                  )}
                  {highlight.description && (
                    <p className="text-sm text-secondary-foreground text-center">
                      {highlight.description}
                    </p>
                  )}
                  <div className="flex justify-center">
                    {highlight.render()}
                  </div>
                </div>
              </Card>
            </TabsContent>
            {highlight.codePath && (
              <TabsContent value="code" className="mt-4">
                <CodeExample path={highlight.codePath} />
              </TabsContent>
            )}
          </Tabs>
        </>
      )}

      <ChevronsDown className="mx-auto mt-8 size-16 animate-bounce text-muted" />

      <CLIExample cliInstallUrl={cliInstallUrl} />

      <Card className="mx-auto mt-8 p-8">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
          <SquareDashedMousePointer />
          {quickStart.title ?? "Quick Start"}
        </h2>
        {quickStartSteps.length > 0 && (
          <ul className="space-y-2 text-sm text-secondary-foreground">
            {quickStartSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        )}
      </Card>

      {propsTableRows.length > 0 && (
        <Card className="mx-auto mt-8 p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {propsTable?.title ?? "Component Props"}
          </h2>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead className="min-w-[16rem]">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propsTableRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-mono text-sm">
                      {row.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {row.type}
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.required ? "Required" : "Optional"}
                    </TableCell>
                    <TableCell className="text-sm text-secondary-foreground">
                      {row.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {codeExamples.length > 0 && (
        <>
          <ChevronsDown className="mx-auto mt-8 size-16 animate-bounce text-muted" />
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Source Code
          </h2>
          {codeExamples.length === 1 ? (
            <CodeExample path={codeExamples[0].path} />
          ) : (
            <Tabs defaultValue={codeExamples[0].path} className="w-full">
              <TabsList className="w-full justify-start">
                {codeExamples.map((example) => (
                  <TabsTrigger key={example.path} value={example.path}>
                    {example.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {codeExamples.map((example) => (
                <TabsContent
                  key={example.path}
                  value={example.path}
                  className="mt-4"
                >
                  <CodeExample path={example.path} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </>
      )}
    </main>
  );
}

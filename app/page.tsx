import { FeaturedComponents } from "@/components/FeaturedComponents";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeXml, Github, Rocket, SearchCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    { Icon: CodeXml, label: "Copy‑Paste Ready", iconClass: "text-blue-500" },
    { Icon: Rocket, label: "CLI Install", iconClass: "text-yellow-500" },
    { Icon: SearchCheck, label: "UX Data Driven", iconClass: "text-green-500" },
  ];

  return (
    <main className="container mx-auto px-4 pt-16">
      <div className="h-[calc(100svh-4rem-4rem)] max-h-[1080px] flex flex-col justify-between max-w-5xl mx-auto gap-16 mb-32">
        <section className="max-w-2xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="mx-auto">
            <Sparkles />
            100% Free | Curated UX Patterns
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-semibold leading-[32px] sm:leading-[48px] text-foreground">
            Implement <span className="text-primary">UX</span> solutions that
            work with a single click
          </h1>

          <p className="text-base text-secondary-foreground">
            We bridge the gap between{" "}
            <span className="font-medium">Design</span> &amp;{" "}
            <span className="font-medium">Development</span> — a growing library
            of real UX solutions from the best products that you can instantly
            bring to life with our <span className="font-medium">ShadCN</span>{" "}
            components.
          </p>

          <ul className="flex flex-wrap justify-center gap-8 list-none p-0 m-0">
            {features.map(({ Icon, label, iconClass }) => (
              <li key={label}>
                <Badge variant="ghost">
                  <Icon className={iconClass} />
                  {label}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-2 pt-4">
            <Link href="/collection">
              <Button>Browse Collection</Button>
            </Link>
            <Link
              href="https://github.com/Neliq/ux-bits"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary">
                <Github className="mr-2" />
                Star on Github
              </Button>
            </Link>
          </div>
        </section>
        <Hero />
      </div>
      <FeaturedComponents />
    </main>
  );
}

import { ComponentCard } from "@/components/ComponentCard";
import { Button } from "@/components/ui/button";
import { collectionExamples } from "@/lib/collection-examples";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Collection() {
  return (
    <main className="container mx-auto px-4 pt-8">
      <Link href="/">
        <Button variant="link" className="p-0!">
          <ChevronLeft />
          Back to Home
        </Button>
      </Link>
      <div className="container mx-auto my-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold sm:text-2xl">All Bits</h2>
          <p className="text-sm text-muted-foreground">
            {collectionExamples.length} curated pattern
            {collectionExamples.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-16 gap-x-16 md:grid-cols-3 md:gap-y-8 md:gap-x-4">
          {collectionExamples.map((example) => (
            <ComponentCard key={example.slug} example={example} />
          ))}
        </div>
      </div>
    </main>
  );
}

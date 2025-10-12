import { collectionExamples } from "@/lib/collection-examples";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ComponentCard } from "./ComponentCard";
import { Button } from "./ui/button";

const FEATURED_COUNT = 3;

export const FeaturedComponents = () => {
  const featuredExamples = collectionExamples.slice(0, FEATURED_COUNT);

  return (
    <div className="container mx-auto my-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold sm:text-2xl">Recent Bits</h2>
        <Link href="/collection">
          <Button variant="link" className="p-0!">
            View All Bits ({collectionExamples.length})
            <ChevronRight />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-4">
        {featuredExamples.map((example) => (
          <ComponentCard key={example.slug} example={example} />
        ))}
      </div>
    </div>
  );
};

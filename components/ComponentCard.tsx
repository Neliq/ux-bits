import type { CollectionExample } from "@/lib/collection-examples";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface ComponentCardProps {
  example: CollectionExample;
}

export const ComponentCard = ({ example }: ComponentCardProps) => {
  const { slug, title, summary, source, tags, previewImage } = example;

  return (
    <Link
      href={`/collection/${slug}`}
      aria-label={`View ${title}`}
      className="block transition-all hover:scale-[1.025]"
    >
      <Card className="flex w-full flex-col border-none bg-transparent p-0 shadow-none">
        <CardHeader
          className={cn(
            "relative h-64 w-full overflow-hidden rounded-xl border-1 border-border px-0",
            previewImage.className
          )}
        >
          <Image
            src={previewImage.src}
            alt={previewImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-0">
          <p className="font-medium">{summary}</p>
          <p className="text-sm text-primary">{source}</p>
        </CardContent>
        {tags.length > 0 && (
          <CardFooter className="flex flex-wrap gap-2 p-0">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

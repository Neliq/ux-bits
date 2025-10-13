"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type WordsCountingCardProps = {
  href: string;
  title?: string;
  description?: string;
  className?: string;
  image?: string; // URL for the image (optional)
};

const ARTICLE_CONTENT_SELECTOR = [
  "article p",
  "article h1",
  "article h2",
  "article h3",
  "article h4",
  "article h5",
  "article h6",
  "article ul",
  "article ol",
  "article li",
  "article blockquote",
  "article span",
].join(", ");

const WORD_COUNT_FORMATTER = new Intl.NumberFormat();

type WordCountState = {
  words: number | null;
  error: string | null;
  isLoading: boolean;
};

const COUNT_WHITESPACE = /\s+/g;

function countWordsFromText(text?: string | null) {
  const trimmed = text?.trim();
  return trimmed ? trimmed.split(COUNT_WHITESPACE).length : 0;
}

function countWordsInArticles(markup: string) {
  if (!markup) return 0;

  const parser = new DOMParser();
  const doc = parser.parseFromString(markup, "text/html");
  const parserError = doc.querySelector("parsererror");

  if (parserError) {
    return 0;
  }

  const nodes = doc.querySelectorAll(ARTICLE_CONTENT_SELECTOR);

  if (!nodes.length) {
    return countWordsFromText(doc.body?.textContent);
  }

  let total = 0;
  nodes.forEach((node) => {
    total += countWordsFromText(node.textContent);
  });

  return total;
}

// Fetch remote markup and return its article word count state.
function useArticleWordCount(href: string) {
  const [state, setState] = useState<WordCountState>({
    words: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!href) {
      setState({
        words: null,
        error: "Missing content link",
        isLoading: false,
      });
      return;
    }

    const controller = new AbortController();
    let active = true;

    setState({ words: null, error: null, isLoading: true });

    (async () => {
      try {
        const response = await fetch(href, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType && !contentType.includes("text/html")) {
          throw new Error("Unsupported content type");
        }

        const html = await response.text();
        const total = countWordsInArticles(html);

        if (!active) return;

        setState({ words: total, error: null, isLoading: false });
      } catch {
        if (!active || controller.signal.aborted) {
          return;
        }

        setState({
          words: null,
          error: "Unable to load content",
          isLoading: false,
        });
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [href]);

  return state;
}

export function WordsCountingCard({
  href,
  title = "Word count",
  description,
  className,
  image,
}: WordsCountingCardProps) {
  const { words, error, isLoading } = useArticleWordCount(href);
  const formattedWordCount =
    words === null ? null : WORD_COUNT_FORMATTER.format(words);

  return (
    <Card
      className={cn(
        "transition-all hover:scale-[1.025] pt-0 overflow-hidden",
        className
      )}
    >
      <Link href={href} className="block">
        <CardHeader className="p-0 text-left">
          {image && (
            <div className="w-full h-64 relative overflow-hidden">
              <Image
                src={image}
                alt={title || "Card image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={false}
              />
            </div>
          )}
          <div className="px-6 py-2 space-y-2 text-left">
            <CardTitle>{title}</CardTitle>
            {description ? (
              <CardDescription>{description}</CardDescription>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="text-left">
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <p className="text-sm font-semibold">{formattedWordCount} words</p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

import { WordsCountingCard } from "@/Bits/WordsCountingCard";

export const renderWordCountingShowcase = () => (
  <WordsCountingCard
    href="/utilities/sample-article"
    title="Sample Article"
    description="It links to /utilities/sample-article and counts on words inside <article> tag"
    image="/omarchy-thumb.png"
    className="max-w-lg w-full"
  />
);

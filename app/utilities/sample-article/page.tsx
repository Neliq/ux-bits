export default function SampleArticlePage() {
  return (
    <main className="container py-12">
      <article className="prose dark:prose-invert max-w-3xl">
        <h1>Design Systems for Busy Teams</h1>
        <p>
          Building a design system is more than documenting colors and spacing.
          It is a shared language that connects product designers, engineers,
          and stakeholders so features can ship with confidence.
        </p>

        <h2>Start with Core Principles</h2>
        <p>
          Successful systems start with clearly articulated principles that act
          as guardrails for every decision. These principles help teams move
          faster without sacrificing quality.
        </p>
        <ul>
          <li>Clarity over cleverness.</li>
          <li>Consistency enabled by reusable primitives.</li>
          <li>Accessibility as a default state.</li>
        </ul>

        <h3>Measure What Matters</h3>
        <p>
          Track adoption by monitoring the percentage of new interfaces using
          approved components, time saved on design reviews, and customer
          feedback trends.
        </p>
        <blockquote>
          “When everyone speaks the same language, iteration becomes
          effortless.”
        </blockquote>

        <h2>Implementation Checklist</h2>
        <ol>
          <li>
            Audit existing UI patterns and highlight overlapping or redundant
            variants.
          </li>
          <li>Define a token strategy for colors, typography, and spacing.</li>
          <li>
            Publish usage guidelines alongside code snippets for every
            component.
          </li>
        </ol>

        <p>
          With intentional planning and clear ownership, even small teams can
          launch a design system that scales with their product.
        </p>
      </article>
    </main>
  );
}

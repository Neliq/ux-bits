import CookieBanner from "@/Bits/CookieBanner";

export const renderCookieBannerShowcase = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-gradient-to-br from-background to-muted/20">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold">Cookie Banner Demo</h3>
          <p className="text-muted-foreground">
            Clear your cookies and localStorage, then refresh to see the banner
          </p>
          <p className="text-sm text-muted-foreground">
            Or check browser console for cookie management logs
          </p>
        </div>
      </div>
      <CookieBanner />
    </div>
  );
};

export default function CookieBannerExample() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Cookie Banner Example</h1>
          <p className="text-lg text-muted-foreground">
            This component automatically detects and manages cookies in your
            application. Open your browser&apos;s developer console to see
            cookies being managed in real-time.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>✅ Automatically detects all cookies in your app</li>
            <li>
              ✅ Categorizes cookies by type (Essential, Analytics, Marketing,
              Functional)
            </li>
            <li>✅ Actually deletes cookies when user denies consent</li>
            <li>
              ✅ Blocks tracking scripts (Google Analytics, Facebook Pixel,
              etc.)
            </li>
            <li>✅ Shows live cookie count for each category</li>
            <li>✅ Stores preferences in localStorage</li>
            <li>✅ Plug-and-play - just add the component to your layout</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-6">
          <h2 className="text-2xl font-semibold">Testing Instructions</h2>
          <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
            <li>Clear your browser&apos;s cookies and localStorage</li>
            <li>Refresh the page - you&apos;ll see the cookie banner</li>
            <li>
              Click &ldquo;Consent Settings&rdquo; to see detected cookies per
              category
            </li>
            <li>Try accepting/denying different categories</li>
            <li>
              Check browser DevTools → Application → Cookies to see them being
              deleted
            </li>
            <li>Refresh the page - your preferences are remembered</li>
          </ol>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h2 className="text-2xl font-semibold">Customization</h2>
          <p className="text-muted-foreground">
            To add your own cookies to the configuration, edit{" "}
            <code className="rounded bg-muted px-2 py-1">
              lib/cookie-manager.ts
            </code>{" "}
            and add them to the{" "}
            <code className="rounded bg-muted px-2 py-1">
              DEFAULT_COOKIE_CONFIGS
            </code>{" "}
            array.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
            {`{
  name: "my_custom_cookie",
  category: "analytics",
  description: "My custom analytics cookie"
}`}
          </pre>
        </div>
      </div>

      {/* The Cookie Banner Component */}
      <CookieBanner />
    </div>
  );
}

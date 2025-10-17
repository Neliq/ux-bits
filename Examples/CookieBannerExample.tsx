import CookieBanner from "@/Bits/CookieBanner";

export const renderCookieBannerShowcase = () => {
  return (
    <div className="relative h-auto w-full overflow-hidden rounded-lg border bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="flex items-center justify-center mt-8">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold">Cookie Banner Demo</h3>
          <p className="text-muted-foreground">
            Check browser console for cookie management logs
          </p>
        </div>
      </div>
      <CookieBanner preview={true} />
    </div>
  );
};

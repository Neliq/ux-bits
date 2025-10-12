"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted
    ? theme === "dark" || (theme === "system" && resolvedTheme === "dark")
    : false;

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative overflow-hidden motion-reduce:transform-none hover:scale-[1.03] active:scale-95 transition-transform duration-200"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      title="Toggle theme"
    >
      <span className="relative inline-flex h-[1.2rem] w-[1.2rem] items-center justify-center">
        <Sun
          aria-hidden={true}
          style={{ willChange: "transform, opacity" }}
          className={`absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] flex items-center justify-center pointer-events-none transform-gpu transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            isDark
              ? "scale-0 -translate-y-3 rotate-90 opacity-0 z-10"
              : "scale-100 translate-y-0 rotate-0 opacity-100 z-20"
          }`}
        />
        <Moon
          aria-hidden={true}
          style={{ willChange: "transform, opacity" }}
          className={`absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] flex items-center justify-center pointer-events-none transform-gpu transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            isDark
              ? "scale-100 translate-y-0 rotate-0 opacity-100 z-20"
              : "scale-0 translate-y-3 rotate-90 opacity-0 z-10"
          }`}
        />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

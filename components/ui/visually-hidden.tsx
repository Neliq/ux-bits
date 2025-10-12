"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function VisuallyHidden({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sr-only", className)} {...props}>
      {children}
    </div>
  );
}

export { VisuallyHidden };

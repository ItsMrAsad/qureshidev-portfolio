"use client";

import { useState, useEffect } from "react";
import { Preloader } from "./preloader";
import { ScrollProgress } from "./scroll-progress";
import { CustomCursor } from "./custom-cursor";
import { CursorTrail } from "./cursor-trail";
import { ErrorBoundary } from "./error-boundary";
import { Toaster } from "sonner";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [enableCursor, setEnableCursor] = useState(true);

  useEffect(() => {
    // Check if cursor effects should be enabled
    const cursorPref = process.env.NEXT_PUBLIC_ENABLE_CURSOR_EFFECTS;
    if (cursorPref === "false") {
      setEnableCursor(false);
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setEnableCursor(false);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Preloader onLoadingComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <>
          <ScrollProgress />
          {enableCursor && (
            <>
              <CustomCursor />
              <CursorTrail />
            </>
          )}
        </>
      )}
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />
    </ErrorBoundary>
  );
}

"use client";

import { useState } from "react";
import { Preloader } from "./preloader";
import { ScrollProgress } from "./scroll-progress";
import { ErrorBoundary } from "./error-boundary";
import { Toaster } from "sonner";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ErrorBoundary>
      <Preloader onLoadingComplete={() => setIsLoaded(true)} />
      {isLoaded && <ScrollProgress />}
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

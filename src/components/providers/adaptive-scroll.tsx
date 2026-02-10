"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { shouldEnableSmoothScroll } from "@/lib/performance";

interface AdaptiveScrollProviderProps {
  children: ReactNode;
}

/**
 * Adaptive scroll provider that only enables smooth scroll on capable devices
 * - Desktop devices: Lenis smooth scroll enabled
 * - Mobile/low-end devices: Native scroll (better performance)
 * - Reduced motion users: Native scroll (respects accessibility)
 */
export function AdaptiveScrollProvider({ children }: AdaptiveScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const isEnabled = useRef(false);

  useEffect(() => {
    // Only enable Lenis on capable devices
    if (!shouldEnableSmoothScroll()) {
      if (process.env.NODE_ENV === "development") {
        console.log("📜 Smooth scroll disabled (mobile/low-end/reduced-motion)");
      }
      return;
    }

    // Check if already enabled
    if (isEnabled.current) {
      return;
    }

    isEnabled.current = true;

    if (process.env.NODE_ENV === "development") {
      console.log("📜 Smooth scroll enabled (desktop)");
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      isEnabled.current = false;
    };
  }, []);

  return <>{children}</>;
}

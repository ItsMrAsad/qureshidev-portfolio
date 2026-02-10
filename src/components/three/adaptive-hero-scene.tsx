"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { shouldEnable3D, getDeviceCapabilities } from "@/lib/performance";

/**
 * CSS gradient fallback (no 3D)
 * Shown when 3D is disabled or device is not capable
 */
const CSSFallback = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(94,234,212,0.08),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(129,140,248,0.08),transparent_40%)]" />
  </div>
);

/**
 * Simplified 3D scene for low-end desktop devices
 * Optimized for performance with minimal particle count
 */
const Simple3DScene = dynamic(
  () =>
    import("@/components/three/simple-hero-scene").then(
      (m) => ({ default: m.SimpleHeroScene })
    ),
  {
    ssr: false,
    loading: () => <CSSFallback />,
  }
);

/**
 * Full 3D scene for high-end desktop devices
 * Complete scene with all effects
 */
const Full3DScene = dynamic(
  () =>
    import("@/components/three/hero-scene").then(
      (m) => ({ default: m.HeroScene })
    ),
  {
    ssr: false,
    loading: () => <CSSFallback />,
  }
);

/**
 * Adaptive hero scene that adjusts based on device capabilities
 * - ALWAYS starts with CSS gradient for instant load
 * - Mobile/Low-end: Stays with CSS gradient only
 * - High-end desktop: Loads 3D after first user interaction/scroll
 */
export function AdaptiveHeroScene() {
  const [sceneType, setSceneType] = useState<"css" | "simple" | "full">("css");
  const [canLoad3D, setCanLoad3D] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize with CSS only for instant page load
    setIsInitialized(true);

    // Determine if device CAN support 3D (but don't load yet)
    const capabilities = getDeviceCapabilities();
    const canSupport3D = shouldEnable3D() && !capabilities.isMobile;

    if (process.env.NODE_ENV === "development") {
      console.group("🎨 3D Scene Deferred Loading");
      console.log("Capabilities:", capabilities);
      console.log("Can Support 3D:", canSupport3D);
      console.log("Will load after interaction");
      console.groupEnd();
    }

    // Store the decision but don't load yet
    setCanLoad3D(canSupport3D);
  }, []);

  // Load 3D after user interaction (scroll, click, or keydown)
  useEffect(() => {
    if (!canLoad3D) return;

    const load3DScene = () => {
      const capabilities = getDeviceCapabilities();

      if (capabilities.isLowEnd) {
        setSceneType("simple");
      } else {
        setSceneType("full");
      }

      if (process.env.NODE_ENV === "development") {
        console.log("✅ Loading 3D scene after user interaction");
      }
    };

    // Listen for first interaction, then load 3D
    const events = ["scroll", "click", "keydown"] as const;
    const handlers = events.map((event) => {
      const handler = () => {
        load3DScene();
        // Remove all listeners after first interaction
        events.forEach((e) => window.removeEventListener(e, handlers[events.indexOf(e)]));
      };
      window.addEventListener(event, handler, { once: true, passive: true });
      return handler;
    });

    return () => {
      events.forEach((event, index) => {
        window.removeEventListener(event, handlers[index]);
      });
    };
  }, [canLoad3D]);

  // Don't render anything during SSR
  if (!isInitialized) {
    return <CSSFallback />;
  }

  return (
    <div className="absolute inset-0 z-0">
      {sceneType === "css" && <CSSFallback />}
      {sceneType === "simple" && (
        <Suspense fallback={<CSSFallback />}>
          <Simple3DScene />
        </Suspense>
      )}
      {sceneType === "full" && (
        <Suspense fallback={<CSSFallback />}>
          <Full3DScene />
        </Suspense>
      )}
    </div>
  );
}

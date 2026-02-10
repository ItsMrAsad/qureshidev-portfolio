"use client";

/**
 * Performance utilities for device detection and capability checks
 * Used to conditionally enable/disable features based on device performance
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isSlowConnection: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  canHandleWebGL: boolean;
}

/**
 * Get device capabilities with feature detection
 * Returns a comprehensive object of device performance characteristics
 */
export const getDeviceCapabilities = (): DeviceCapabilities => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isSlowConnection: false,
      isLowEnd: false,
      prefersReducedMotion: false,
      canHandleWebGL: false,
    };
  }

  // Mobile detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Network connection detection
  const connection = (navigator as any).connection;
  const isSlowConnection = connection
    ? connection.saveData ||
      (connection.effectiveType && connection.effectiveType.includes("2g"))
    : false;

  // Hardware detection
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const isLowEnd = hardwareConcurrency < 4 || deviceMemory < 4;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // WebGL capability check
  const canHandleWebGL = (() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  })();

  return {
    isMobile,
    isSlowConnection,
    isLowEnd,
    prefersReducedMotion,
    canHandleWebGL,
  };
};

/**
 * Determine if 3D should be enabled based on device capabilities
 * 3D is only enabled on capable desktop devices with user consent
 */
export const shouldEnable3D = (): boolean => {
  const capabilities = getDeviceCapabilities();

  return (
    !capabilities.isMobile &&
    !capabilities.isLowEnd &&
    !capabilities.prefersReducedMotion &&
    !capabilities.isSlowConnection &&
    capabilities.canHandleWebGL
  );
};

/**
 * Determine if smooth scroll should be enabled
 * Lenis smooth scroll is only enabled on capable desktop devices
 */
export const shouldEnableSmoothScroll = (): boolean => {
  const capabilities = getDeviceCapabilities();

  return (
    !capabilities.isMobile &&
    !capabilities.isLowEnd &&
    !capabilities.prefersReducedMotion
  );
};

/**
 * Get device pixel ratio cap for performance
 * Returns a lower DPR on mobile devices to improve performance
 */
export const getDevicePixelRatioCap = (): number => {
  const capabilities = getDeviceCapabilities();

  if (capabilities.isMobile || capabilities.isLowEnd) {
    return 1; // Cap at 1x on mobile/low-end
  }

  return 1.5; // Cap at 1.5x on desktop (saves GPU)
};

/**
 * Get particle count multiplier for 3D scenes
 * Reduces particle count on mobile/low-end devices
 */
export const getParticleCountMultiplier = (): number => {
  const capabilities = getDeviceCapabilities();

  if (capabilities.isMobile) {
    return 0.3; // 30% of particles on mobile
  }

  if (capabilities.isLowEnd) {
    return 0.5; // 50% of particles on low-end
  }

  return 1.0; // 100% of particles on capable devices
};

/**
 * Check if we should use antialiasing in 3D scenes
 * Disabled on mobile for performance
 */
export const shouldUseAntialiasing = (): boolean => {
  const capabilities = getDeviceCapabilities();

  return !capabilities.isMobile && !capabilities.isLowEnd;
};

/**
 * Get animation duration multiplier based on reduced motion preference
 * Returns 0 to disable animations, or a multiplier to slow them down
 */
export const getAnimationDurationMultiplier = (): number => {
  const capabilities = getDeviceCapabilities();

  if (capabilities.prefersReducedMotion) {
    return 0; // Disable animations
  }

  return 1; // Normal animation speed
};

/**
 * Performance budget management
 * Returns whether a feature should be enabled based on current performance
 */
export const isWithinPerformanceBudget = (budgetType: "js" | "css"): boolean => {
  if (typeof window === "undefined") return true;

  const capabilities = getDeviceCapabilities();

  if (budgetType === "js") {
    // JavaScript budget: more restrictive on low-end devices
    return !capabilities.isLowEnd;
  }

  if (budgetType === "css") {
    // CSS budget: always allow, but reduced motion might disable animations
    return !capabilities.prefersReducedMotion;
  }

  return true;
};

/**
 * Log performance metrics (development only)
 * Helps debug performance issues during development
 */
export const logPerformanceMetrics = () => {
  if (process.env.NODE_ENV !== "development") return;

  const capabilities = getDeviceCapabilities();

  console.group("🔍 Device Performance Capabilities");
  console.log("Is Mobile:", capabilities.isMobile);
  console.log("Is Slow Connection:", capabilities.isSlowConnection);
  console.log("Is Low-End:", capabilities.isLowEnd);
  console.log("Prefers Reduced Motion:", capabilities.prefersReducedMotion);
  console.log("Can Handle WebGL:", capabilities.canHandleWebGL);
  console.log("3D Enabled:", shouldEnable3D());
  console.log("Smooth Scroll Enabled:", shouldEnableSmoothScroll());
  console.log("DPR Cap:", getDevicePixelRatioCap());
  console.log("Particle Multiplier:", getParticleCountMultiplier());
  console.groupEnd();
};

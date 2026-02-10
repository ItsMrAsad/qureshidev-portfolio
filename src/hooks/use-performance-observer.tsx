"use client";

import { useEffect, useState } from "react";

/**
 * Performance metrics tracked by the observer
 */
export interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint (target: < 2.5s)
  fid: number | null; // First Input Delay (target: < 100ms)
  cls: number | null; // Cumulative Layout Shift (target: < 0.1)
  isPoorPerformance: boolean;
  isLoading: boolean;
}

/**
 * Hook to observe Core Web Vitals in real-time
 * Detects when to disable features based on performance metrics
 *
 * @returns Performance metrics object
 */
export const usePerformanceObserver = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    isPoorPerformance: false,
    isLoading: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      setMetrics((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    // Check if PerformanceObserver is supported
    if (!("PerformanceObserver" in window)) {
      setMetrics((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    const metricsData: PerformanceMetrics = {
      lcp: null,
      fid: null,
      cls: null,
      isPoorPerformance: false,
      isLoading: false,
    };

    // Observe Largest Contentful Paint
    let lcpObserver: PerformanceObserver | undefined;
    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcpValue = lastEntry?.renderTime || lastEntry?.loadTime || null;
        metricsData.lcp = lcpValue;
        setMetrics((prev) => ({ ...prev, lcp: lcpValue }));
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("LCP observer not supported");
    }

    // Observe First Input Delay
    let fidObserver: PerformanceObserver | undefined;
    try {
      fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[0] as any;
        const fidValue = fid?.processingStart - fid?.startTime || null;
        metricsData.fid = fidValue;
        setMetrics((prev) => ({ ...prev, fid: fidValue }));
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.warn("FID observer not supported");
    }

    // Observe Cumulative Layout Shift
    let clsValue = 0;
    let clsObserver: PerformanceObserver | undefined;
    try {
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            metricsData.cls = clsValue;
            setMetrics((prev) => ({ ...prev, cls: clsValue }));
          }
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("CLS observer not supported");
    }

    // Determine if performance is poor
    // Thresholds based on Web Vitals recommendations
    const checkPerformance = () => {
      const isPoor =
        (metricsData.lcp !== null && metricsData.lcp > 2500) ||
        (metricsData.fid !== null && metricsData.fid > 100) ||
        (metricsData.cls !== null && metricsData.cls > 0.1);

      setMetrics((prev) => ({ ...prev, isPoorPerformance: isPoor }));
    };

    // Check performance immediately and periodically
    checkPerformance();
    const performanceCheckInterval = setInterval(checkPerformance, 5000);

    // Cleanup
    return () => {
      clearInterval(performanceCheckInterval);
      lcpObserver?.disconnect();
      fidObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, []);

  return metrics;
};

/**
 * Hook to get performance-based feature flags
 * Returns which features should be enabled/disabled based on performance
 */
export const usePerformanceFlags = () => {
  const metrics = usePerformanceObserver();
  const capabilities = typeof window !== "undefined" ? {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    hardwareConcurrency: navigator.hardwareConcurrency || 2,
  } : { isMobile: false, hardwareConcurrency: 2 };

  return {
    // Disable advanced features on poor performance
    reducedEffects: metrics.isPoorPerformance || capabilities.isMobile,
    // Enable 3D only on good performance desktop
    enable3D: !metrics.isPoorPerformance && !capabilities.isMobile && !metrics.isLoading,
    // Enable animations based on CLS (layout shift indicates slow device)
    enableAnimations: !metrics.isPoorPerformance && metrics.cls === null,
    // Smooth scroll only on desktop
    enableSmoothScroll: !capabilities.isMobile && !metrics.isPoorPerformance,
    // Metrics for debugging
    metrics,
    isLoading: metrics.isLoading,
  };
};

/**
 * Hook to log performance metrics in development
 * Automatically logs Core Web Vitals after they're measured
 */
export const usePerformanceLogging = () => {
  const metrics = usePerformanceObserver();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Log when all metrics are available
    if (metrics.lcp !== null && metrics.fid !== null && metrics.cls !== null) {
      console.group("🎯 Core Web Vitals");
      console.log(`LCP: ${metrics.lcp?.toFixed(0)}ms ${metrics.lcp < 2500 ? "✅" : "❌"} (target: < 2500ms)`);
      console.log(`FID: ${metrics.fid?.toFixed(0)}ms ${metrics.fid < 100 ? "✅" : "❌"} (target: < 100ms)`);
      console.log(`CLS: ${metrics.cls?.toFixed(3)} ${metrics.cls && metrics.cls < 0.1 ? "✅" : "❌"} (target: < 0.1)`);
      console.log(`Overall: ${metrics.isPoorPerformance ? "Poor Performance ❌" : "Good Performance ✅"}`);
      console.groupEnd();
    }
  }, [metrics]);

  return metrics;
};

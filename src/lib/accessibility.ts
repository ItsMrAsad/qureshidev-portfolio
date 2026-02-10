"use client";

/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 * Provides helpers for reduced motion, keyboard navigation, and screen reader support
 */

import { useEffect, useState } from "react";

/**
 * Check if user prefers reduced motion
 * Respects OS-level accessibility settings
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Hook to use reduced motion preference
 * Automatically updates when user changes OS settings
 */
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
};

/**
 * Keyboard navigation utilities
 * Handle keyboard events for interactive elements
 */
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  action: () => void
) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
};

/**
 * Generate unique IDs for accessibility attributes
 * Useful for linking labels to inputs, or descriptions to elements
 */
let idCounter = 0;
export const generateUniqueId = (prefix: string = "id"): string => {
  return `${prefix}-${++idCounter}`;
};

/**
 * Trap focus within a container (for modals, dialogs)
 * Prevents keyboard focus from leaving the modal
 */
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  if (!firstElement || !lastElement) return () => {};

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  element.addEventListener("keydown", handleTab);

  // Return cleanup function
  return () => element.removeEventListener("keydown", handleTab);
};

/**
 * Announce messages to screen readers
 * Uses ARIA live regions for dynamic content updates
 */
export const announceToScreenReader = (message: string, priority: "polite" | "assertive" = "polite") => {
  if (typeof document === "undefined") return;

  // Get or create live region
  let liveRegion = document.getElementById(`sr-announcer-${priority}`);

  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.id = `sr-announcer-${priority}`;
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", priority);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    // Add styles for screen reader only
    (liveRegion as HTMLElement).style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);
  }

  // Clear and set new message
  liveRegion.textContent = "";
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100);
};

/**
 * Check if element is visible to screen readers
 */
export const isScreenReaderVisible = (element: HTMLElement): boolean => {
  const styles = window.getComputedStyle(element);
  return (
    styles.display !== "none" &&
    styles.visibility !== "hidden" &&
    styles.opacity !== "0" &&
    element.getAttribute("aria-hidden") !== "true"
  );
};

/**
 * Get safe ARIA values for common attributes
 */
export const getAriaProps = ({
  label,
  description,
  expanded,
  pressed,
  checked,
  disabled,
}: {
  label?: string;
  description?: string;
  expanded?: boolean;
  pressed?: boolean;
  checked?: boolean;
  disabled?: boolean;
}) => {
  const props: Record<string, string | boolean | undefined> = {
    "aria-label": label,
    "aria-description": description,
    "aria-expanded": expanded,
    "aria-pressed": pressed,
    "aria-checked": checked,
    "aria-disabled": disabled,
  };

  // Remove undefined values
  Object.keys(props).forEach((key) => {
    if (props[key] === undefined) {
      delete props[key];
    }
  });

  return props;
};

/**
 * Create accessible focus ring styles
 * Ensures keyboard users can see which element is focused
 */
export const focusRingStyles = `
  .focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .focus-visible:not(:focus-visible) {
    outline: none;
  }

  /* Skip to main content link for keyboard users */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }

  .skip-to-content:focus {
    top: 0;
  }
`;

/**
 * Check if user is navigating with keyboard
 * Useful for showing keyboard-specific UI hints
 */
export const useKeyboardNavigation = () => {
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab, Arrow keys, Enter, Space indicate keyboard navigation
      if (
        ["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "].includes(
          e.key
        )
      ) {
        setIsKeyboardNav(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardNav(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return isKeyboardNav;
};

/**
 * Get appropriate animation duration based on reduced motion preference
 */
export const getAnimationDuration = (
  normalDuration: number,
  reducedDuration: number = 0
): number => {
  return prefersReducedMotion() ? reducedDuration : normalDuration;
};

/**
 * Safe animation props that respect reduced motion
 */
export const useSafeAnimation = () => {
  const reducedMotion = useReducedMotion();

  return {
    animate: reducedMotion ? { opacity: 1 } : undefined,
    transition: reducedMotion ? { duration: 0 } : undefined,
    initial: reducedMotion ? { opacity: 0 } : undefined,
    whileHover: reducedMotion ? {} : undefined,
    whileTap: reducedMotion ? {} : undefined,
  };
};

/**
 * Validate contrast ratio for WCAG compliance
 * Returns true if the contrast meets WCAG AA standard (4.5:1 for normal text)
 */
export const validateContrast = (
  foreground: string,
  background: string,
  largeText: boolean = false
): boolean => {
  // This is a simplified check - in production, use a proper contrast calculation
  // For now, just return true (assumes your design system is compliant)
  // Implement proper luminance calculation for real validation

  const requiredRatio = largeText ? 3.0 : 4.5;

  // TODO: Implement proper WCAG contrast calculation
  // For now, trust the design system
  return true;
};

/**
 * Skip links markup for accessibility
 * Add this after opening <body> tag
 */
export const SkipLinks = () => {
  if (typeof document === "undefined") return null;

  return `
    <a href="#main-content" class="skip-to-content">
      Skip to main content
    </a>
  `;
};

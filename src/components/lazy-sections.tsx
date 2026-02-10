"use client";

import { ComponentType, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Lazy section loader with Intersection Observer
 * Sections are loaded 200px before they enter the viewport
 */

// Intersection Observer options for optimal loading
const SECTION_OBSERVER_OPTIONS = {
  rootMargin: "200px", // Start loading 200px before viewport
  threshold: 0.01,
};

/**
 * Create a lazy-loaded section with Intersection Observer
 * @param importFn - Function that imports the component
 * @param fallback - Optional fallback component to show while loading
 * @returns A component that lazy loads the imported component
 */
export const createLazySection = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) => {
  // Create dynamic import with loading state
  const LazyComponent = dynamic(importFn, {
    loading: () =>
      fallback || (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ),
    ssr: true, // Enable SSR for initial page load
  });

  return function LazySection(props: P) {
    const [shouldRender, setShouldRender] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Don't use Intersection Observer if not available (SSR)
      if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
        setShouldRender(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        },
        SECTION_OBSERVER_OPTIONS
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={ref} style={{ minHeight: shouldRender ? "auto" : "300px" }}>
        {shouldRender && <LazyComponent {...props} />}
      </div>
    );
  };
};

/**
 * Lazy load all sections
 * Each section is loaded only when approaching the viewport
 */

// Import section components
const AboutSectionImport = () =>
  import("@/components/sections/about").then((m) => ({
    default: m.AboutSection,
  }));

const SkillsSectionImport = () =>
  import("@/components/sections/skills").then((m) => ({
    default: m.SkillsSection,
  }));

const ProjectsSectionImport = () =>
  import("@/components/sections/projects").then((m) => ({
    default: m.ProjectsSection,
  }));

const TestimonialsSectionImport = () =>
  import("@/components/sections/testimonials").then((m) => ({
    default: m.TestimonialsSection,
  }));

const CertificatesSectionImport = () =>
  import("@/components/sections/certificates").then((m) => ({
    default: m.CertificatesSection,
  }));

const ContactSectionImport = () =>
  import("@/components/sections/contact").then((m) => ({
    default: m.ContactSection,
  }));

// Create lazy-loaded section components
export const LazyAboutSection = createLazySection(AboutSectionImport);
export const LazySkillsSection = createLazySection(SkillsSectionImport);
export const LazyProjectsSection = createLazySection(ProjectsSectionImport);
export const LazyTestimonialsSection = createLazySection(TestimonialsSectionImport);
export const LazyCertificatesSection = createLazySection(CertificatesSectionImport);
export const LazyContactSection = createLazySection(ContactSectionImport);

/**
 * Preload sections in the background
 * Call this to preload sections before they're needed
 */
export const preloadSection = (sectionName: string) => {
  const imports: Record<string, () => Promise<any>> = {
    about: AboutSectionImport,
    skills: SkillsSectionImport,
    projects: ProjectsSectionImport,
    testimonials: TestimonialsSectionImport,
    certificates: CertificatesSectionImport,
    contact: ContactSectionImport,
  };

  const importFn = imports[sectionName];
  if (importFn) {
    importFn();
  }
};

/**
 * Preload next section based on current scroll position
 * Useful for preemptively loading the next section user will see
 */
export const usePreloadNextSection = (currentSectionIndex: number) => {
  const sections = ["about", "skills", "projects", "testimonials", "certificates", "contact"];

  useEffect(() => {
    const nextSection = sections[currentSectionIndex + 1];
    if (nextSection) {
      // Preload next section after a short delay
      const timeout = setTimeout(() => {
        preloadSection(nextSection);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentSectionIndex]);
};

/**
 * HOC to wrap any component with lazy loading
 * Use this for additional lazy-loaded components
 */
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  return function LazyWrapper(props: P) {
    const [shouldRender, setShouldRender] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setHasMounted(true);

      if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
        setShouldRender(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px", threshold: 0.01 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    if (!hasMounted) {
      return <div ref={ref} style={{ minHeight: "300px" }} />;
    }

    return (
      <div ref={ref}>
        {shouldRender ? <Component {...props} /> : <div style={{ minHeight: "300px" }} />}
      </div>
    );
  };
}

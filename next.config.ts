import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================================================
  // TURBOPACK CONFIGURATION
  // ============================================================================
  // Next.js 16 uses Turbopack by default
  turbopack: {},

  // ============================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================================================

  // React strict mode for better error detection
  reactStrictMode: true,

  // Enable gzip compression
  compress: true,

  // ============================================================================
  // IMAGE OPTIMIZATION
  // ============================================================================
  images: {
    // Modern image formats for better compression
    formats: ["image/avif", "image/webp"],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Remote image patterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    // Minimum cache TTL for optimized images
    minimumCacheTTL: 60,
  },

  // ============================================================================
  // EXPERIMENTAL FEATURES
  // ============================================================================
  experimental: {
    // Optimize package imports for smaller bundle size
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "motion",
    ],
  },

  // ============================================================================
  // HEADERS FOR SECURITY & PERFORMANCE
  // ============================================================================
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains",
                },
              ]
            : []),
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ============================================================================
  // PRODUCTION SOURCE MAPS (DISABLED FOR PERFORMANCE)
  // ============================================================================
  productionBrowserSourceMaps: false,
};

export default nextConfig;

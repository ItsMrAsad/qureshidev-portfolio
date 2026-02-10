import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdaptiveScrollProvider } from "@/components/providers/adaptive-scroll";
import { ClientWrapper } from "@/components/client-wrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://qureshidev.com"),
  title: {
    default: "Asad Ur Rehman | AI & Agentic Engineer - Qureshidev",
    template: "%s | Qureshidev",
  },
  description:
    "Building Intelligent Systems That Think, Learn & Act. Specializing in LLM integrations, multi-agent systems, RAG pipelines, and full-stack development.",
  keywords: [
    "AI Engineer",
    "Agentic Engineer",
    "Full Stack Developer",
    "LLM",
    "Machine Learning",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "LangChain",
    "LangGraph",
    "RAG",
    "Multi-Agent Systems",
    "OpenAI",
    "Claude",
    "GPT-4",
  ],
  authors: [{ name: "Asad Ur Rehman", url: "https://qureshidev.com" }],
  creator: "Asad Ur Rehman",
  publisher: "Qureshidev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qureshidev.com",
    title: "Asad Ur Rehman | AI & Agentic Engineer",
    description:
      "Building Intelligent Systems That Think, Learn & Act. Specializing in LLM integrations, multi-agent systems, and full-stack development.",
    siteName: "Qureshidev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qureshidev - AI & Agentic Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad Ur Rehman | AI & Agentic Engineer",
    description:
      "Building Intelligent Systems That Think, Learn & Act. Specializing in LLM integrations, multi-agent systems, and full-stack development.",
    creator: "@qureshidev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://qureshidev.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://qureshidev.com/#person",
        name: "Asad Ur Rehman",
        alternateName: "Qureshidev",
        description: "AI & Agentic Engineer specializing in LLM integrations, multi-agent systems, and full-stack development.",
        url: "https://qureshidev.com",
        image: "https://qureshidev.com/avatar.jpg",
        sameAs: [
          "https://github.com/qureshidev",
          "https://linkedin.com/in/qureshidev",
          "https://twitter.com/qureshidev",
          "https://instagram.com/qureshidev",
          "https://youtube.com/@qureshidev",
        ],
        jobTitle: "AI & Agentic Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Qureshidev",
        },
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Large Language Models",
          "Full-Stack Development",
          "Multi-Agent Systems",
          "LangChain",
          "LangGraph",
          "RAG Systems",
          "Python",
          "TypeScript",
          "Next.js",
          "React",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://qureshidev.com/#website",
        url: "https://qureshidev.com",
        name: "Qureshidev - AI & Agentic Engineer Portfolio",
        description: "Building Intelligent Systems That Think, Learn & Act.",
        publisher: {
          "@id": "https://qureshidev.com/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://qureshidev.com/#webpage",
        url: "https://qureshidev.com",
        name: "Asad Ur Rehman | AI & Agentic Engineer - Qureshidev",
        isPartOf: {
          "@id": "https://qureshidev.com/#website",
        },
        about: {
          "@id": "https://qureshidev.com/#person",
        },
        description: "Portfolio of Asad Ur Rehman - AI & Agentic Engineer",
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        dateCreated: "2024-01-01T00:00:00+00:00",
        dateModified: new Date().toISOString(),
        mainEntity: {
          "@id": "https://qureshidev.com/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-192.svg" sizes="192x192" type="image/svg+xml" />
        <link rel="icon" href="/icon-512.svg" sizes="512x512" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdaptiveScrollProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </AdaptiveScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

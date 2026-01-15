import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asad Ur Rehman | AI & Agentic Engineer - Qureshidev",
  description:
    "Building Intelligent Systems That Think, Learn & Act. Specializing in LLM integrations, multi-agent systems, and full-stack development.",
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
  ],
  authors: [{ name: "Asad Ur Rehman", url: "https://qureshidev.com" }],
  creator: "Asad Ur Rehman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qureshidev.com",
    title: "Asad Ur Rehman | AI & Agentic Engineer",
    description:
      "Building Intelligent Systems That Think, Learn & Act. Specializing in LLM integrations, multi-agent systems, and full-stack development.",
    siteName: "Qureshidev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad Ur Rehman | AI & Agentic Engineer",
    description:
      "Building Intelligent Systems That Think, Learn & Act. Specializing in LLM integrations, multi-agent systems, and full-stack development.",
    creator: "@qureshidev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Qureshidev - AI & Agentic Engineer Portfolio",
        short_name: "Qureshidev",
        description:
            "Building Intelligent Systems That Think, Learn & Act. Portfolio of Asad Ur Rehman, AI & Agentic Engineer.",
        start_url: "/",
        display: "standalone",
        background_color: "#09090b",
        theme_color: "#3b82f6",
        orientation: "portrait-primary",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
        categories: ["portfolio", "technology", "ai", "development"],
        lang: "en-US",
        dir: "ltr",
        prefer_related_applications: false,
    };
}

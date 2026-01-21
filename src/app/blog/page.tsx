import type { Metadata } from "next";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, machine learning, and full-stack development from Asad Ur Rehman - AI & Agentic Engineer.",
  openGraph: {
    title: "Blog | Qureshidev",
    description: "Thoughts on AI, machine learning, and full-stack development.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}

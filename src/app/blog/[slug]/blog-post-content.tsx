"use client";

import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, Tag, Share2, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/config/blog";
import { blogPosts } from "@/config/blog";
import { toast } from "sonner";

interface BlogPostContentProps {
  post: BlogPost;
}

function ShareButton({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/10 transition-colors group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={label}
    >
      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </motion.button>
  );
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass-strong border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
          <div className="flex items-center gap-2">
            <ShareButton icon={LinkIcon} label="Copy link" onClick={handleCopyLink} />
            <ShareButton icon={Twitter} label="Share on Twitter" onClick={handleShareTwitter} />
            <ShareButton icon={Linkedin} label="Share on LinkedIn" onClick={handleShareLinkedIn} />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Article Header */}
          <header className="mb-12 text-center">
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Simple markdown-like rendering */}
              {post.content.split("\n").map((line, index) => {
                const trimmedLine = line.trim();

                if (trimmedLine.startsWith("# ")) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
                      {trimmedLine.slice(2)}
                    </h1>
                  );
                }
                if (trimmedLine.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold text-foreground mt-8 mb-4">
                      {trimmedLine.slice(3)}
                    </h2>
                  );
                }
                if (trimmedLine.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                      {trimmedLine.slice(4)}
                    </h3>
                  );
                }
                if (trimmedLine.startsWith("- ")) {
                  return (
                    <li key={index} className="text-muted-foreground ml-6">
                      {trimmedLine.slice(2)}
                    </li>
                  );
                }
                if (trimmedLine.startsWith("- [ ] ")) {
                  return (
                    <li key={index} className="text-muted-foreground ml-6 flex items-center gap-2">
                      <input type="checkbox" disabled className="rounded" />
                      {trimmedLine.slice(6)}
                    </li>
                  );
                }
                if (trimmedLine.match(/^\d+\. /)) {
                  return (
                    <li key={index} className="text-muted-foreground ml-6 list-decimal">
                      {trimmedLine.replace(/^\d+\. /, "")}
                    </li>
                  );
                }
                if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
                  return (
                    <p key={index} className="font-semibold text-foreground">
                      {trimmedLine.slice(2, -2)}
                    </p>
                  );
                }
                if (trimmedLine === "") {
                  return <br key={index} />;
                }

                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {trimmedLine}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl">
              AR
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-semibold text-foreground">Asad Ur Rehman</h3>
              <p className="text-primary text-sm mb-2">AI & Agentic Engineer</p>
              <p className="text-muted-foreground text-sm">
                Building intelligent systems that think, learn & act. Specializing in LLM integrations and multi-agent systems.
              </p>
            </div>
            <Button asChild variant="outline" className="flex-shrink-0">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-xl font-semibold text-foreground mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <motion.div
                      className="glass rounded-xl p-6 h-full group hover:border-primary/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </motion.article>
      </main>
    </div>
  );
}

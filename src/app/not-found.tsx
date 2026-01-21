"use client";

import { motion } from "motion/react";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* 404 Text */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-gradient select-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            Looks like this page got lost in the neural network.
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2 glow-primary">
              <Link href="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/blog">
                <Search className="w-4 h-4" />
                Browse Blog
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 text-sm"
        >
          <Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
            Projects
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href="/resume" className="text-muted-foreground hover:text-primary transition-colors">
            Resume
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

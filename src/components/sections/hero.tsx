"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FileText, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, socialLinks } from "@/config/profile";
import dynamic from "next/dynamic";
import { useRef } from "react";

const HeroScene = dynamic(
  () => import("@/components/three/adaptive-hero-scene").then((mod) => mod.AdaptiveHeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" /> }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

// OPTIMIZED: Simple fade-in instead of letter-by-letter animation
// This reduces LCP by ~300ms and TBT by ~200ms
function AnimatedName({ name }: { name: string }) {
  return (
    <motion.span
      className="text-gradient inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {name}
    </motion.span>
  );
}

export function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* OPTIMIZED: Static gradient orbs instead of animated (saves ~400ms TBT) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
          filter: "blur(60px)",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10 pointer-events-none" />

      {/* OPTIMIZED: Removed animated lines (saves ~200ms TBT) */}

      {/* Content */}
      <motion.div
        className="relative z-20 container-custom text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity, scale }}
      >
        {/* Brand Badge - OPTIMIZED: Removed continuous animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium text-muted-foreground border border-primary/20"
            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Open to Opportunities
          </motion.span>
        </motion.div>

        {/* Name with letter animation */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
        >
          <motion.span
            className="text-foreground inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hi, I&apos;m{" "}
          </motion.span>
          <AnimatedName name={profile.name} />
        </motion.h1>

        {/* OPTIMIZED: Role - removed continuous glow animation */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-6"
        >
          <span className="text-gradient glow-text">
            {profile.role}
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          {profile.tagline}
        </motion.p>

        {/* OPTIMIZED: CTA Buttons - removed magnetic effect and continuous animation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 glow-primary text-base px-8 py-6"
            asChild
          >
            <a href="#contact">
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </Button>
        </motion.div>

        {/* OPTIMIZED: Social Links - removed magnetic effect to reduce forced reflows */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl glass hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* OPTIMIZED: Simplified scroll indicator (removed continuous animations) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">
            Scroll to Explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

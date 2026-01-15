"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { FileText, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, socialLinks } from "@/config/profile";
import { Magnetic } from "@/components/animations";
import dynamic from "next/dynamic";
import { useRef } from "react";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: "easeOut" as const,
    },
  }),
};

// Animated text that reveals letter by letter
function AnimatedName({ name }: { name: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {name.split("").map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block text-gradient"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
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

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
          y,
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10 pointer-events-none" />

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 container-custom text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity, scale }}
      >
        {/* Brand Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium text-muted-foreground border border-primary/20"
            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
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

        {/* Role with glowing effect */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-6"
        >
          <motion.span
            className="text-gradient glow-text"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {profile.role}
          </motion.span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          {profile.tagline}
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Magnetic strength={0.2}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 glow-primary text-base px-8 py-6 relative overflow-hidden group"
              asChild
            >
              <a href="#contact">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="relative flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </span>
              </a>
            </Button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 hover:bg-primary/5 gap-2 text-base px-8 py-6 transition-all duration-300"
              asChild
            >
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="w-5 h-5" />
                View Resume
              </a>
            </Button>
          </Magnetic>
        </motion.div>

        {/* Social Links with stagger */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3"
        >
          {socialLinks.map((social, index) => (
            <Magnetic key={social.name} strength={0.3}>
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl glass hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <motion.span
            className="text-xs uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to Explore
          </motion.span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
            animate={{ borderColor: ["rgba(161,161,170,0.5)", "rgba(59,130,246,0.8)", "rgba(161,161,170,0.5)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-current"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}

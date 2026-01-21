"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/config/profile";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

export function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress - faster
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Faster accelerating progress curve
        const increment = Math.max(3, Math.floor((100 - prev) / 5));
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Reduced display time to 1.2s
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.8,
              }}
              className="mb-8"
            >
              {/* Outer ring */}
              <motion.div
                className="relative w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Inner ring */}
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-accent/30"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Center dot */}
                <motion.div
                  className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent"
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginTop: -4,
                      marginLeft: -4,
                    }}
                    animate={{
                      x: [0, Math.cos((i * 120 * Math.PI) / 180) * 40],
                      y: [0, Math.sin((i * 120 * Math.PI) / 180) * 40],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Brand name with letter animation */}
            <motion.div className="flex overflow-hidden mb-6">
              {profile.brand.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="text-3xl font-bold text-gradient"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-secondary/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Loading experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

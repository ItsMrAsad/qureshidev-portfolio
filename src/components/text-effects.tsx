"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

// Characters used for scramble effect
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

interface TextScrambleProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

export function TextScramble({
    text,
    className = "",
    delay = 0,
    speed = 50,
}: TextScrambleProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayText, setDisplayText] = useState(text);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        if (!isInView || isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        let iteration = 0;
        const maxIterations = text.length;

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " ";
                            if (index < iteration) return text[index];
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                iteration += 1 / 3;

                if (iteration >= maxIterations) {
                    clearInterval(interval);
                    setDisplayText(text);
                    isAnimatingRef.current = false;
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, text, delay, speed]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
}

// Cinematic text reveal with mask
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.33, 1, 0.68, 1],
                }}
            >
                {text}
            </motion.div>
        </div>
    );
}

// Split text animation - each letter/word animates separately
interface SplitTextProps {
    text: string;
    className?: string;
    letterClassName?: string;
    delay?: number;
    staggerDelay?: number;
    type?: "letter" | "word";
}

export function SplitText({
    text,
    className = "",
    letterClassName = "",
    delay = 0,
    staggerDelay = 0.03,
    type = "letter",
}: SplitTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const items = type === "letter" ? text.split("") : text.split(" ");

    return (
        <motion.span
            ref={ref}
            className={`inline-flex flex-wrap ${className}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {items.map((item, i) => (
                <span
                    key={i}
                    className={`inline-block overflow-hidden ${type === "word" ? "mr-[0.25em]" : ""}`}
                >
                    <motion.span
                        className={`inline-block ${letterClassName}`}
                        variants={{
                            hidden: {
                                y: "110%",
                                rotateX: -80,
                                opacity: 0,
                            },
                            visible: {
                                y: 0,
                                rotateX: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.6,
                                    ease: [0.33, 1, 0.68, 1],
                                },
                            },
                        }}
                    >
                        {item === " " ? "\u00A0" : item}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

// Gradient text animation
interface GradientTextProps {
    text: string;
    className?: string;
}

export function GradientText({ text, className = "" }: GradientTextProps) {
    return (
        <motion.span
            className={`inline-block bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: "linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)",
                backgroundSize: "300% 100%",
            }}
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {text}
        </motion.span>
    );
}

// Counter animation with spring physics
interface CountUpProps {
    value: number;
    suffix?: string;
    prefix?: string;
    className?: string;
    duration?: number;
}

export function CountUp({
    value,
    suffix = "",
    prefix = "",
    className = "",
    duration = 2,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const startTime = performance.now();
        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {count}
            {suffix}
        </span>
    );
}

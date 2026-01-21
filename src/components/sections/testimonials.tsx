"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/config/profile";
import { Button } from "@/components/ui/button";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
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

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Star
                        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                            }`}
                    />
                </motion.div>
            ))}
        </div>
    );
}

function TestimonialCard({
    testimonial,
    isActive,
}: {
    testimonial: (typeof testimonials)[0];
    isActive: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.85,
                filter: isActive ? "blur(0px)" : "blur(2px)",
            }}
            transition={{ duration: 0.5 }}
            className={`relative ${isActive ? "z-10" : "z-0"}`}
        >
            <div className="glass-strong rounded-2xl p-8 h-full">
                {/* Quote icon */}
                <motion.div
                    className="absolute -top-4 -left-2"
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                        <Quote className="w-6 h-6 text-primary" />
                    </div>
                </motion.div>

                {/* Content */}
                <div className="mt-4">
                    <p className="text-lg text-foreground leading-relaxed mb-6 italic">
                        &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <motion.div
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            {testimonial.name.charAt(0)}
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">
                                {testimonial.title} at{" "}
                                <span className="text-primary">{testimonial.company}</span>
                            </p>
                        </div>

                        {/* Rating */}
                        <StarRating rating={testimonial.rating} />
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>
        </motion.div>
    );
}

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextTestimonial, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextTestimonial]);

    return (
        <section id="testimonials" className="section relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            {/* Floating orb */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                    top: "20%",
                    left: "-15%",
                }}
                animate={{
                    y: [-30, 30, -30],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="container-custom relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <motion.span
                            className="text-primary text-sm font-medium uppercase tracking-widest inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Testimonials
                        </motion.span>
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            What <span className="text-gradient">Clients Say</span>
                        </motion.h2>
                        <motion.p
                            className="text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Trusted by innovative companies and leaders building the future with AI
                        </motion.p>
                    </motion.div>

                    {/* Carousel */}
                    <div
                        className="relative max-w-4xl mx-auto"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        {/* Main testimonial */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[currentIndex]}
                                    isActive={true}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevTestimonial}
                                className="rounded-full hover:bg-primary/10 hover:border-primary/50"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex
                                            ? "bg-primary"
                                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                            }`}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.9 }}
                                        animate={{
                                            scale: index === currentIndex ? 1.2 : 1,
                                        }}
                                    />
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextTestimonial}
                                className="rounded-full hover:bg-primary/10 hover:border-primary/50"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

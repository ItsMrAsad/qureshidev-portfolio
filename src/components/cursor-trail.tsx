"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
}

export function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);
    const isTouch = useRef(false);

    const createParticle = useCallback((x: number, y: number, vx: number, vy: number) => {
        const hue = 200 + Math.random() * 60; // Blue to cyan range
        particles.current.push({
            x,
            y,
            vx: vx * 0.2 + (Math.random() - 0.5) * 2,
            vy: vy * 0.2 + (Math.random() - 0.5) * 2,
            life: 1,
            maxLife: 1,
            size: Math.random() * 3 + 1,
            hue,
        });
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate velocity
        const vx = mousePos.current.x - lastMousePos.current.x;
        const vy = mousePos.current.y - lastMousePos.current.y;

        // Create particles based on movement speed
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > 2) {
            const numParticles = Math.min(Math.floor(speed / 3), 5);
            for (let i = 0; i < numParticles; i++) {
                createParticle(mousePos.current.x, mousePos.current.y, vx, vy);
            }
        }

        // Update last position
        lastMousePos.current = { ...mousePos.current };

        // Update and draw particles
        particles.current = particles.current.filter((p) => {
            p.life -= 0.02;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.vy += 0.05; // Gravity

            if (p.life <= 0) return false;

            const alpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${alpha})`;
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${alpha * 0.5})`;

            return true;
        });

        ctx.shadowBlur = 0;
        animationFrameId.current = requestAnimationFrame(animate);
    }, [createParticle]);

    useEffect(() => {
        // Check for touch device
        isTouch.current =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches;

        if (isTouch.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Start animation
        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [animate]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && isTouch.current) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9997]"
            style={{ mixBlendMode: "screen" }}
        />
    );
}

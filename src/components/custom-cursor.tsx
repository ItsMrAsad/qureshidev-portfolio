"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const cursorRef = useRef<HTMLDivElement>(null);

    // Spring physics for smooth cursor movement
    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    const ringX = useSpring(0, { stiffness: 200, damping: 25 });
    const ringY = useSpring(0, { stiffness: 200, damping: 25 });

    useEffect(() => {
        // Check if touch device
        const checkTouchDevice = () => {
            setIsTouchDevice(
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia("(pointer: coarse)").matches
            );
        };

        checkTouchDevice();
        window.addEventListener("resize", checkTouchDevice);

        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Handle hover on interactive elements
        const handleElementMouseEnter = () => setIsHovering(true);
        const handleElementMouseLeave = () => setIsHovering(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleElementMouseEnter);
            el.addEventListener("mouseleave", handleElementMouseLeave);
        });

        return () => {
            window.removeEventListener("resize", checkTouchDevice);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleElementMouseEnter);
                el.removeEventListener("mouseleave", handleElementMouseLeave);
            });
        };
    }, [isTouchDevice, cursorX, cursorY, ringX, ringY]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 0.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="relative -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                    style={{
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                    }}
                />
            </motion.div>

            {/* Cursor ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className="relative -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary/50"
                    style={{
                        transition: "border-color 0.2s",
                        borderColor: isHovering
                            ? "rgba(59, 130, 246, 0.8)"
                            : "rgba(59, 130, 246, 0.3)",
                    }}
                />
            </motion.div>

            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
        </>
    );
}

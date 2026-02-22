"use client";

import { useRef, useEffect } from "react";
import { useSpring, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
}

/**
 * A physics-based animated counter that counts up when it enters the viewport.
 * @param value The target value to count to.
 * @param suffix Optional string to append after the number (e.g. "+", "K").
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = "" }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 30,
    });

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString() + suffix;
            }
        });
        return () => unsubscribe();
    }, [springValue, suffix]);

    return <span ref={ref}>0{suffix}</span>;
};

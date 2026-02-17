"use client";

import React, { useEffect, useRef } from "react";

interface Leaf {
    x: number;
    y: number;
    r: number; // rotation
    s: number; // speed
    size: number;
    w: number; // swing
    color: string;
}

interface Ripple {
    x: number;
    y: number;
    r: number; // radius
    a: number; // alpha
}

export const SakuraBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const leavesRef = useRef<Leaf[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const lastLeafTimeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const colors = ["#ffb7c5", "#ffc0cb", "#ffd1dc", "#ffb7c5ee"]; // More opaque pinks

        const createLeaf = (initialY = -20) => {
            const size = Math.random() * 10 + 8; // Slightly larger
            return {
                x: Math.random() * canvas.width,
                y: initialY,
                r: Math.random() * Math.PI * 2,
                s: Math.random() * 0.5 + 0.8, // Slightly faster
                size,
                w: Math.random() * 2 - 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        };

        // Pre-populate with a few leaves at different heights
        for (let i = 0; i < 3; i++) {
            leavesRef.current.push(createLeaf(Math.random() * canvas.height));
        }

        const createRipple = (x: number, y: number) => {
            return { x, y, r: 0, a: 0.8 };
        };

        const drawLeaf = (leaf: Leaf) => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.r + Math.sin(leaf.y / 50) * 0.5); // Add wobbling rotation
            ctx.beginPath();

            // Draw a more "petal-like" shape
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
                leaf.size / 2, -leaf.size / 2,
                leaf.size, -leaf.size / 4,
                leaf.size, 0
            );
            ctx.bezierCurveTo(
                leaf.size, leaf.size / 4,
                leaf.size / 2, leaf.size / 2,
                0, 0
            );

            ctx.fillStyle = leaf.color;
            ctx.fill();

            // Optional: add a slight shadow
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(0,0,0,0.2)";

            ctx.restore();
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new leaf every 2.5 to 5 seconds
            if (time - lastLeafTimeRef.current > 3000 + Math.random() * 2000) {
                if (leavesRef.current.length < 8) { // Increased slightly for better feel
                    leavesRef.current.push(createLeaf());
                    lastLeafTimeRef.current = time;
                }
            }

            // Update and draw ripples first (bottom layer)
            ripplesRef.current = ripplesRef.current.filter((ripple) => {
                ripple.r += 1.2;
                ripple.a -= 0.004;

                ctx.beginPath();
                ctx.ellipse(ripple.x, ripple.y, ripple.r, ripple.r * 0.4, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.a})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                return ripple.a > 0;
            });

            // Update and draw leaves
            leavesRef.current = leavesRef.current.filter((leaf) => {
                leaf.y += leaf.s;
                leaf.x += Math.sin(leaf.y / 40) * leaf.w * 2; // More pronounced swaying
                leaf.r += 0.015;

                // Ripple trigger: when leaf hits "water body" (let's say bottom 15% of screen)
                const waterLine = canvas.height * 0.85;
                if (leaf.y > waterLine && leaf.y < waterLine + leaf.s + 1) {
                    // Create ripple when crossing the water line
                    ripplesRef.current.push(createRipple(leaf.x, leaf.y));
                }

                drawLeaf(leaf);

                return leaf.y < canvas.height + 20;
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
        />
    );
};

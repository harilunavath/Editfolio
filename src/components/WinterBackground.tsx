"use client";

import React, { useEffect, useRef } from "react";

interface Flake {
    x: number;
    y: number;
    size: number;
    vy: number;
    vx: number;
    alpha: number;
    wobble: number;
}

interface WinterBackgroundProps {
    active?: boolean;
}

export const WinterBackground: React.FC<WinterBackgroundProps> = ({ active = true }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const flakesRef = useRef<Flake[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Enable alpha for transparent background support
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const createFlake = (y = -20) => ({
            x: Math.random() * canvas.width,
            y,
            size: Math.random() * 2 + 0.5,
            vy: Math.random() * 2.5 + 1.2,
            vx: (Math.random() - 0.5) * 0.7,
            alpha: Math.random() * 0.5 + 0.2,
            wobble: Math.random() * Math.PI * 2,
        });

        if (flakesRef.current.length === 0) {
            for (let i = 0; i < 150; i++) {
                flakesRef.current.push(createFlake(Math.random() * canvas.height));
            }
        }

        if (active) {
            flakesRef.current.forEach(f => {
                f.y = -Math.random() * 200;
            });
        }

        const animate = (time: number) => {
            // Clear for transparency to show the CSS background underneath
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!active) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.globalCompositeOperation = "lighter";

            const flakes = flakesRef.current;
            for (let i = 0; i < flakes.length; i++) {
                const f = flakes[i];
                f.y += f.vy;
                f.x += f.vx + Math.sin(time / 1000 + f.wobble) * 0.3;

                if (f.y > canvas.height) {
                    f.y = -20;
                    f.x = Math.random() * canvas.width;
                }

                ctx.globalAlpha = f.alpha;

                // Draw glow (larger, faint)
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "#64c8ff";
                ctx.fill();

                // Draw core
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";

            // Ambient frost glow
            const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 400);
            grad.addColorStop(0, "rgba(100, 200, 255, 0.05)");
            grad.addColorStop(1, "rgba(100, 200, 255, 0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, canvas.height - 400, canvas.width, 400);

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("resize", resize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0 w-full h-full"
        />
    );
};

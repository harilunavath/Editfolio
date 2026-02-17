"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    decay: number;
    color: string;
    wobble: number;
}

interface FireBackgroundProps {
    active?: boolean;
}

export const FireBackground: React.FC<FireBackgroundProps> = ({ active = true }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const colors = [
            "rgba(255, 60, 0, ",
            "rgba(255, 120, 0, ",
            "rgba(255, 200, 0, ",
            "rgba(255, 40, 0, ",
            "rgba(100, 20, 0, ", // Darker embers
        ];

        const createParticle = (yPos?: number) => ({
            x: Math.random() * canvas.width,
            y: yPos ?? (canvas.height + 20),
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(Math.random() * 3.5 + 2.0),
            size: Math.random() * 3 + 0.5,
            alpha: Math.random() * 0.7 + 0.3,
            decay: Math.random() * 0.0015 + 0.001,
            wobble: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        });

        // Reset or initialize particles when active
        if (active) {
            particlesRef.current = [];
            for (let i = 0; i < 80; i++) {
                particlesRef.current.push(createParticle(Math.random() * canvas.height));
            }
        }

        const animate = (time: number) => {
            if (!active) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            // Clear canvas for transparency
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (particlesRef.current.length < 250) {
                particlesRef.current.push(createParticle());
            }

            ctx.globalCompositeOperation = "lighter";

            const particles = particlesRef.current;
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx + Math.sin(time / 500 + p.wobble) * 0.5;
                p.y += p.vy;
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                const alpha = p.alpha;

                // Draw glow
                ctx.globalAlpha = alpha * 0.3;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = p.color + "1)";
                ctx.fill();

                // Draw core
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color + "1)";
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";

            // Ambient heat glow at bottom - optimized
            const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 300);
            grad.addColorStop(0, "rgba(255, 50, 0, 0.08)");
            grad.addColorStop(1, "rgba(5, 2, 0, 0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, canvas.height - 300, canvas.width, 400);

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

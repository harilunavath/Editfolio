"use client";

import React from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { Smartphone, Film } from "lucide-react";
import { AnimatedCounter } from "../AnimatedCounter";

interface HeroProps {
    isPremium: boolean;
    theme: "winter" | "fire";
    thoneOpacity: MotionValue<number>;
    throneScale: MotionValue<number>;
    subjectScale: MotionValue<number>;
    subjectOpacity: MotionValue<number>;
    subjectY: MotionValue<number>;
    heroHariY: MotionValue<number>;
    heroHariScale: MotionValue<number>;
    scrollToSection: (ref: React.RefObject<HTMLDivElement | null>) => void;
    reelsRef: React.RefObject<HTMLDivElement | null>;
    videosRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * The Hero section component with both Minimal and Premium modes.
 */
export const Hero: React.FC<HeroProps> = ({
    isPremium,
    theme,
    thoneOpacity,
    throneScale,
    subjectScale,
    subjectOpacity,
    subjectY,
    heroHariY,
    heroHariScale,
    scrollToSection,
    reelsRef,
    videosRef
}) => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Cinematic Iron Throne Backdrop for Hero Only */}
            <AnimatePresence>
                {isPremium && (
                    <motion.div
                        key="premium-backdrop"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ opacity: thoneOpacity, scale: throneScale, willChange: "transform, opacity" }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <img
                            src="/bg.png"
                            alt="Iron Throne"
                            className="w-full h-full object-cover object-[center_35%] md:object-center transition-all duration-1000 grayscale contrast-125 brightness-[0.6]"
                        />
                        <div className={`absolute inset-0 ${theme === 'winter' ? 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)]'} opacity-50`} />
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 ${theme === 'winter' ? 'to-blue-950/40' : 'to-orange-950/40'}`} />
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimal Mode — Off-center spotlight */}
            {!isPremium && (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-white/[0.025] blur-[140px]" />
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[80px]" />
                </div>
            )}

            {/* ── MINIMAL HERO ── */}
            {!isPremium ? (
                <motion.div
                    key="minimal-hero"
                    style={{ scale: subjectScale, opacity: subjectOpacity, y: subjectY }}
                    className="relative z-10 w-full h-full flex flex-col"
                >
                    {/* Subject.jpg in Hero - Absolute Bottom Center */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                        className="absolute bottom-[-10%] right-[-15%] md:left-1/2 md:-translate-x-1/2 w-[140%] md:w-full max-w-xl z-[-1] pointer-events-none md:translate-y-0"
                    >
                        <img
                            src="/Subject.jpg"
                            alt="Subject"
                            className="w-full h-full object-contain grayscale md:brightness-75 transition-all duration-700 opacity-30 md:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                    </motion.div>


                    {/* Main Content Area — Repositioned for Mobile */}
                    <div className="flex-1 flex flex-col justify-start md:justify-end w-full max-w-[1400px] mx-auto px-6 md:px-20 pt-32 md:pb-32 relative z-10">

                        {/* Name and Tagline Stack */}
                        <div className="flex flex-col items-start gap-4">
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.7 }}
                                className="text-[12px] font-black tracking-[0.4em] text-white/80 uppercase shadow-sm"
                            >
                                Hi, I am Hari Lunavath
                            </motion.p>

                            <motion.h1
                                style={{ y: heroHariY, scale: heroHariScale }}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[clamp(3rem,12vw,6rem)] md:text-[clamp(4rem,12vw,10rem)] font-black tracking-[-0.05em] leading-[0.82] uppercase italic hero-glow-text text-white"
                            >
                                HARI
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col gap-6 max-w-xl"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                                        Techie Turned Video Editor & Visual Storyteller
                                    </h3>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-lg [text-shadow:0_1px_5px_rgba(0,0,0,0.3)]">
                                        I create cinematic visuals and engaging narratives through professional video editing, motion graphics, and color grading—delivering high-quality content that captures attention and connects with audiences.
                                    </p>
                                </div>

                                {/* Stats row */}
                                <div className="flex gap-6">
                                    {[
                                        { v: 50, s: "+", l: "Projects" },
                                        { v: 3, s: "+", l: "Years" },
                                        { v: 4, s: "K", l: "Quality" }
                                    ].map(({ v, s, l }) => (
                                        <div key={l} className="flex flex-col gap-1">
                                            <span className="text-2xl font-black text-white italic tracking-tighter">
                                                <AnimatedCounter value={v} suffix={s} />
                                            </span>
                                            <span className="text-[8px] font-bold tracking-[0.35em] text-white/40 uppercase">{l}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA buttons */}
                                <div className="hidden md:flex items-center gap-4 pt-4">
                                    <button
                                        onClick={() => scrollToSection(reelsRef)}
                                        className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-full text-[11px] tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                                    >
                                        <Smartphone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        Watch Reels
                                    </button>
                                    <button
                                        onClick={() => scrollToSection(videosRef)}
                                        className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 font-black rounded-full text-[11px] tracking-[0.2em] uppercase hover:border-white/40 hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                    >
                                        <Film className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Portfolio
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex md:hidden items-center justify-center gap-3 pb-24 px-6 mt-16"
                    >
                        <button onClick={() => scrollToSection(reelsRef)} className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-white text-black font-black rounded-full text-[10px] tracking-[0.15em] uppercase cursor-pointer whitespace-nowrap">
                            <Smartphone className="w-3.5 h-3.5" /> Reels
                        </button>
                        <button onClick={() => scrollToSection(videosRef)} className="flex-1 flex items-center justify-center gap-2 px-5 py-4 border border-white/15 text-white/70 font-black rounded-full text-[10px] tracking-[0.15em] uppercase cursor-pointer whitespace-nowrap">
                            <Film className="w-3.5 h-3.5" /> Portfolio
                        </button>
                    </motion.div>

                    {/* Bottom ticker strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] overflow-hidden"
                    >
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="flex whitespace-nowrap py-3"
                        >
                            {[...Array(2)].map((_, i) => (
                                <span key={i} className="text-[9px] font-bold tracking-[0.5em] text-white/15 uppercase">
                                    {["Video Editing", "Color Grading", "Motion Design", "Post Production", "Visual Storytelling", "Cinematic Cuts", "4K Quality"].map(t => (
                                        <span key={t} className="mr-12">{t} <span className="mr-12">◆</span></span>
                                    ))}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 right-10 flex flex-col items-center gap-2 pointer-events-none"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
                        />
                        <span className="text-[8px] font-bold tracking-[0.5em] text-white/15 uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
                    </motion.div>
                </motion.div>

            ) : (
                /* ── PREMIUM HERO ── */
                <header className="relative z-10 w-full max-w-7xl px-8 h-full flex flex-col justify-end items-start text-left pb-32">

                    <motion.div
                        key="premium-hero"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center px-4 py-1 rounded-full glass-deep text-[11px] font-black tracking-[0.3em] uppercase text-white/60 border-white/10"
                            >
                                <span className={`w-1.5 h-1.5 rounded-full mr-3 animate-pulse ${theme === 'fire' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`} />
                                Techie Turned Video Editor & Visual Storyteller
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className={`text-5xl sm:text-7xl md:text-[12rem] font-bold tracking-tighter leading-[0.75] uppercase px-8 overflow-visible ${theme === 'fire' ? 'fire-text-glow italic' : 'winter-text-glow italic'}`}
                            >
                                HARI<br />
                                <span className={`inline-block text-transparent bg-clip-text ${theme === 'fire' ? 'bg-gradient-to-b from-orange-500 to-red-800' : 'bg-gradient-to-b from-blue-100 to-blue-500/30'} opacity-80 pr-[0.25em] -mr-[0.25em]`}>LUNAVATH</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1.5 }}
                            className="max-w-2xl text-sm md:text-lg leading-relaxed text-balance tracking-wide uppercase text-white/90 font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]"
                        >
                            I create cinematic visuals and engaging narratives through professional video editing, motion graphics, and color grading—delivering high-quality content that captures attention and connects with audiences.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap items-center justify-start gap-4 md:gap-6 pt-8 md:pt-12"
                    >
                        <button
                            onClick={() => scrollToSection(reelsRef)}
                            className={`group relative flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 glass-deep text-white font-black rounded-full transition-all duration-700 hover:scale-105 border-white/10 cursor-pointer ${theme === 'fire' ? 'hover:shadow-[0_0_80px_rgba(239,68,68,0.2)]' : 'hover:shadow-[0_0_80px_rgba(59,130,246,0.2)]'}`}
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
                            <Smartphone className="w-4 h-4 md:w-5 md:h-5 opacity-40 group-hover:rotate-12 transition-transform" />
                            <span className="tracking-widest uppercase text-[10px] md:text-[12px]">Watch Reels</span>
                        </button>
                        <button
                            onClick={() => scrollToSection(videosRef)}
                            className="group relative flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 bg-white/5 text-white/60 font-black rounded-full transition-all duration-700 hover:bg-white/10 hover:text-white border-white/5 cursor-pointer"
                        >
                            <Film className="w-4 h-4 md:w-5 md:h-5 opacity-40 group-hover:scale-110 transition-transform" />
                            <span className="tracking-widest uppercase text-[10px] md:text-[12px]">Portfolio</span>
                        </button>
                    </motion.div>
                </header>
            )}
        </section>
    );
};



"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { reels } from "@/lib/videos";
import { VideoModal } from "@/components/VideoModal";
import { Reel } from "@/lib/videos";


interface ShortFormProps {
    handleManualScroll: (type: "reels" | "videos") => void;
    scrollCarousel: (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right", type: "reels" | "videos") => void;
    isScrollingReels: boolean;
    isPremium: boolean;
    theme: "winter" | "fire";
    onSelectVideo: (reel: Reel) => void;
}

/**
 * The Short Form Content / Reels section.
 */
export const ShortForm = React.forwardRef<HTMLDivElement, ShortFormProps>(({
    handleManualScroll,
    scrollCarousel,
    isScrollingReels,
    isPremium,
    theme,
    onSelectVideo
}, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <section ref={ref} className="py-20 md:py-32 space-y-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-baseline justify-between overflow-hidden">
                <div className="flex items-baseline gap-4">
                    <h2 className="text-white font-bold tracking-tighter text-5xl md:text-7xl uppercase italic">Short Form</h2>
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 whitespace-nowrap">Narrative Reels</span>
                </div>
                <div className="h-px bg-white/10 flex-grow mx-12 hidden md:block" />
                <div className="flex items-center gap-4">
                    <button onClick={() => scrollCarousel(scrollRef, "left", "reels")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
                    <button onClick={() => scrollCarousel(scrollRef, "right", "reels")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
                </div>
            </div>

            <div
                ref={scrollRef}
                onScroll={() => handleManualScroll("reels")}
                className={`flex gap-6 md:gap-10 overflow-x-auto pb-16 px-6 md:px-24 custom-scrollbar select-none transition-all duration-700 ${isScrollingReels ? `active-glow-${theme}` : ''}`}
            >
                {reels.map((reel) => (
                    <motion.div
                        key={reel.id}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        onClick={() => onSelectVideo(reel)}
                        className="relative flex-shrink-0 w-[70vw] md:w-[350px] aspect-[9/16] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden liquid-glass group cursor-pointer border-white/5 transition-all duration-700 hover:border-white/20"
                    >
                        {reel.path ? (
                            <video
                                src={`${reel.path}#t=0.001`}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out ${isPremium
                                    ? 'transform scale-110 group-hover:scale-100 filter brightness-75 group-hover:brightness-100 grayscale group-hover:grayscale-0'
                                    : `filter ${isScrollingReels ? 'grayscale-0 brightness-105 contrast-100 scale-105 saturate-110' : 'grayscale brightness-40 contrast-[1.2] scale-100 group-hover:grayscale-0 group-hover:brightness-105 group-hover:contrast-100 group-hover:scale-105 group-hover:saturate-110'}`
                                    }`}
                                playsInline
                                muted
                                preload="metadata"
                            />
                        ) : (
                            <img
                                src={reel.thumbnail}
                                // alt={reel.title}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out ${isPremium
                                    ? 'transform scale-110 group-hover:scale-100 filter brightness-75 group-hover:brightness-100 grayscale group-hover:grayscale-0'
                                    : `filter ${isScrollingReels ? 'grayscale-0 brightness-105 contrast-100 scale-105 saturate-110' : 'grayscale brightness-40 contrast-[1.2] scale-100 group-hover:grayscale-0 group-hover:brightness-105 group-hover:contrast-100 group-hover:scale-105 group-hover:saturate-110'}`
                                    }`}
                            />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 transition-all duration-700 ${!isPremium && !isScrollingReels ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                            {/* <h3 className="text-white text-xl md:text-3xl font-bold tracking-tight mb-2 uppercase italic leading-none">{reel.title}</h3> */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full glass-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500 border-white/10 backdrop-blur-3xl`}><Play className={`w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-1 ${theme === 'fire' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'}`} /></div>
                        </div>
                    </motion.div>
                ))}
                <div className="flex-shrink-0 w-12 md:w-24 h-full" />
            </div>
        </section>
    );
});

ShortForm.displayName = "ShortForm";

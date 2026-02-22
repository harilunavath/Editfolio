"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const VIDEOS = [
    { id: 1, title: "Cinematic Urban Flow", category: "Commercial", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Mountain Peak Journey", category: "Nature", thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { id: 9, title: "Neon Glitch Reel", category: "VFX / Edit", thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
    { id: 10, title: "Neon Abstract", category: "Experimental", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Modern Architecture", category: "Real Estate", thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Future Tech Expo", category: "Corporate", thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
];

interface LongFormProps {
    handleManualScroll: (type: "reels" | "videos") => void;
    scrollCarousel: (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right", type: "reels" | "videos") => void;
    isScrollingVideos: boolean;
    isPremium: boolean;
    theme: "winter" | "fire";
}

/**
 * The Long Form Content / Videos section.
 */
export const LongForm = React.forwardRef<HTMLDivElement, LongFormProps>(({
    handleManualScroll,
    scrollCarousel,
    isScrollingVideos,
    isPremium,
    theme
}, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <section ref={ref} className="py-20 md:py-32 space-y-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-baseline justify-between overflow-hidden">
                <div className="flex items-baseline gap-4">
                    <h2 className="text-white font-bold tracking-tighter text-5xl md:text-7xl uppercase italic">Long Form</h2>
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 whitespace-nowrap">Director&apos;s Cut</span>
                </div>
                <div className="h-px bg-white/10 flex-grow mx-12 hidden md:block" />
                <div className="flex items-center gap-4">
                    <button onClick={() => scrollCarousel(scrollRef, "left", "videos")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
                    <button onClick={() => scrollCarousel(scrollRef, "right", "videos")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
                </div>
            </div>

            <div
                ref={scrollRef}
                onScroll={() => handleManualScroll("videos")}
                className={`flex gap-6 md:gap-12 overflow-x-auto pb-12 px-6 md:px-24 custom-scrollbar select-none transition-all duration-700 ${isScrollingVideos ? `active-glow-${theme}` : ''}`}
            >
                {VIDEOS.map((video) => (
                    <motion.div
                        key={video.id}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        className="relative flex-shrink-0 w-[85vw] md:w-[750px] aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden liquid-glass group cursor-pointer border-white/5 hover:border-white/20 transition-all duration-700"
                    >
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out ${isPremium
                                ? 'transform scale-110 group-hover:scale-100 filter brightness-50 group-hover:brightness-100 grayscale group-hover:grayscale-0'
                                : `filter ${isScrollingVideos ? 'grayscale-0 brightness-105 contrast-100 scale-105 saturate-110' : 'grayscale brightness-30 contrast-[1.3] scale-100'}`
                                }`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 transition-all duration-700 ${!isPremium && !isScrollingVideos ? 'opacity-0' : 'opacity-100'}`}>
                            <span className={`text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase mb-2 md:mb-4 ${!isPremium ? 'text-white/40' : (theme === 'fire' ? 'text-red-600/60' : 'text-blue-500/60')}`}>{video.category}</span>
                            <h3 className="text-white text-2xl md:text-5xl font-bold tracking-tight mb-2 uppercase italic leading-none">{video.title}</h3>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-28 md:h-28 rounded-full glass-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500 border-white/10 backdrop-blur-2xl"><Play className={`w-6 h-6 md:w-10 md:h-10 text-white fill-white ml-1 ${theme === 'fire' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'}`} /></div>
                        </div>
                    </motion.div>
                ))}
                <div className="flex-shrink-0 w-12 md:w-24 h-full" />
            </div>
        </section>
    );
});

LongForm.displayName = "LongForm";

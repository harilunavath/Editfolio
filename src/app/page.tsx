"use client";

import { useRef, useEffect, useState } from "react";
import { WinterBackground } from "@/components/WinterBackground";
import { FireBackground } from "@/components/FireBackground";
import { Film, ChevronLeft, ChevronRight, Smartphone, Mail, ArrowUpRight, Instagram, MessageCircle, Play } from "lucide-react";
import { Onboarding } from "@/components/Onboarding";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const VIDEOS = [
    { id: 1, title: "Cinematic Urban Flow", category: "Commercial", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Mountain Peak Journey", category: "Nature", thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { id: 9, title: "Neon Glitch Reel", category: "VFX / Edit", thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
    { id: 10, title: "Neon Abstract", category: "Experimental", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Modern Architecture", category: "Real Estate", thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Future Tech Expo", category: "Corporate", thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
];

const REELS = [
    { id: 5, title: "Lifestyle Reveal", thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600" },
    { id: 4, title: "Product Promo", thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "Travel Byte", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "Fitness Edit", thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600" },
    { id: 1, title: "Glow Night", thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600" },
];

export default function Home() {
    const [theme, setTheme] = useState<"winter" | "fire" | null>(null);
    const [appState, setAppState] = useState<"onboarding" | "ready">("onboarding");

    const reelsRef = useRef<HTMLDivElement>(null);
    const videosRef = useRef<HTMLDivElement>(null);
    const reelsScrollRef = useRef<HTMLDivElement>(null);
    const videosScrollRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const [isScrollingReels, setIsScrollingReels] = useState(false);
    const [isScrollingVideos, setIsScrollingVideos] = useState(false);

    const reelsTimeout = useRef<NodeJS.Timeout | null>(null);
    const videosTimeout = useRef<NodeJS.Timeout | null>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleManualScroll = (type: "reels" | "videos") => {
        if (type === "reels") {
            setIsScrollingReels(true);
            if (reelsTimeout.current) clearTimeout(reelsTimeout.current);
            reelsTimeout.current = setTimeout(() => setIsScrollingReels(false), 1000);
        } else {
            setIsScrollingVideos(true);
            if (videosTimeout.current) clearTimeout(videosTimeout.current);
            videosTimeout.current = setTimeout(() => setIsScrollingVideos(false), 1000);
        }
    };

    const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right", type: "reels" | "videos") => {
        if (ref.current) {
            const scrollAmount = direction === "left" ? -600 : 600;
            ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            handleManualScroll(type);
        }
    };

    const { scrollY } = useScroll();
    const throneOpacity = useTransform(scrollY, [0, 500], [theme === "fire" ? 0.85 : 0.75, 0]);
    const throneScale = useTransform(scrollY, [0, 500], [1, 1.15]);

    const selectTheme = (selected: "winter" | "fire") => {
        setTheme(selected);
        setAppState("ready");
    };

    return (
        <AnimatePresence mode="wait">
            {appState === "onboarding" ? (
                <Onboarding selectTheme={selectTheme} />
            ) : (
                <motion.main
                    key="portfolio"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative min-h-screen w-full bg-black selection:bg-white selection:text-black overflow-x-hidden"
                >
                    {/* Background Layer (Fixed) */}
                    <div
                        className="fixed inset-0 z-0 pointer-events-none"
                        style={{
                            background: theme === "winter"
                                ? "radial-gradient(circle at 50% 100%, #111827 0%, #030712 100%)"
                                : "radial-gradient(circle at 50% 100%, #1c0a00 0%, #050200 100%)"
                        }}
                    />

                    {/* Background Components */}
                    <div className="z-[12] fixed inset-0 pointer-events-none">
                        {theme === "winter" ? <WinterBackground /> : <FireBackground />}
                    </div>

                    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
                        <div className="pointer-events-auto">
                            <span className="text-white font-bold tracking-tighter text-xl cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>HARI<span className="text-white/50 pr-2">EDITS</span></span>
                        </div>
                        <div className="pointer-events-auto flex items-center gap-4">
                            <button
                                onClick={() => setAppState("onboarding")}
                                className="glass-deep px-4 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-white/40 hover:text-white transition-all border-white/5"
                            >
                                Switch Realm
                            </button>
                            <button
                                onClick={() => scrollToSection(contactRef)}
                                className="glass-deep px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-white/60 hover:text-white hover:border-white/20 transition-all border-white/5"
                            >
                                Contact
                            </button>
                        </div>
                    </nav>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full">

                        {/* Hero Section */}
                        <section className="relative h-screen flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                            {/* Cinematic Iron Throne Backdrop for Hero Only */}
                            <motion.div
                                style={{ opacity: throneOpacity, scale: throneScale }}
                                className="absolute inset-0 z-0 pointer-events-none will-change-transform"
                            >
                                <img
                                    src="/bg.png"
                                    alt="Iron Throne"
                                    className="w-full h-full object-cover transition-all duration-1000 brightness-[0.7]"
                                />
                                <div className={`absolute inset-0 ${theme === 'winter' ? 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)]'} opacity-50`} />
                                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 ${theme === 'winter' ? 'to-blue-950/40' : 'to-orange-950/40'}`} />
                                <div className="absolute inset-0 bg-black/40" />
                            </motion.div>

                            <header className="relative z-10 max-w-5xl space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center px-4 py-1 rounded-full glass-deep text-[11px] font-black tracking-[0.4em] uppercase text-white/40 mb-2 border-white/10"
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full mr-3 animate-pulse ${theme === 'fire' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`} />
                                    Visual Storyteller
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className={`text-8xl md:text-[12rem] font-black tracking-[-0.06em] leading-[0.85] uppercase italic drop-shadow-2xl ${theme === 'fire' ? 'fire-text-glow' : 'winter-text-glow'}`}
                                >
                                    HARI<br />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-b ${theme === 'fire' ? 'from-orange-500 to-red-800' : 'from-blue-100 to-blue-500/30'} opacity-80 tracking-tighter pr-7`}>EDITS</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 1.5 }}
                                    className="max-w-2xl text-xl md:text-2xl text-white/40 leading-relaxed font-medium mx-auto text-balance tracking-tight"
                                >
                                    Precision cutting for modern narratives. Transforming raw energy into cinematic impact.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-wrap items-center justify-center gap-6 pt-10"
                                >
                                    <button
                                        onClick={() => scrollToSection(reelsRef)}
                                        className={`group relative flex items-center gap-4 px-10 py-5 glass-deep text-white font-black rounded-full transition-all duration-700 hover:scale-105 border-white/10 ${theme === 'fire' ? 'hover:shadow-[0_0_80px_rgba(239,68,68,0.2)]' : 'hover:shadow-[0_0_80px_rgba(59,130,246,0.2)]'}`}
                                    >
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
                                        <Smartphone className="w-5 h-5 opacity-40 group-hover:rotate-12 transition-transform" />
                                        <span className="tracking-widest uppercase text-[12px]">Watch Reels</span>
                                    </button>

                                    <button
                                        onClick={() => scrollToSection(videosRef)}
                                        className="group relative flex items-center gap-4 px-10 py-5 bg-white/5 text-white/60 font-black rounded-full transition-all duration-700 hover:bg-white/10 hover:text-white border-white/5"
                                    >
                                        <Film className="w-5 h-5 opacity-40 group-hover:scale-110 transition-transform" />
                                        <span className="tracking-widest uppercase text-[12px]">Portfolio</span>
                                    </button>
                                </motion.div>
                            </header>
                        </section>

                        {/* Reels Section */}
                        <section ref={reelsRef} className="py-24 space-y-16">
                            <div className="px-12 md:px-24 flex items-end justify-between">
                                <div className="space-y-6">
                                    <span className={`text-[12px] font-black tracking-[0.6em] uppercase ${theme === 'fire' ? 'text-red-500/40' : 'text-blue-500/40'}`}>Short Form Narrative</span>
                                    <h2 className="text-white font-black tracking-[-0.05em] text-7xl md:text-9xl uppercase italic leading-none">Featured<br />Reels</h2>
                                </div>
                                <div className="hidden md:flex items-center gap-6">
                                    <button onClick={() => scrollCarousel(reelsScrollRef, "left", "reels")} className="p-6 glass-deep rounded-full hover:bg-white/10 transition-all border-white/5 group"><ChevronLeft className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" /></button>
                                    <button onClick={() => scrollCarousel(reelsScrollRef, "right", "reels")} className="p-6 glass-deep rounded-full hover:bg-white/10 transition-all border-white/5 group"><ChevronRight className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" /></button>
                                </div>
                            </div>

                            <div
                                ref={reelsScrollRef}
                                onScroll={() => handleManualScroll("reels")}
                                className={`flex gap-10 overflow-x-auto pb-16 px-12 md:px-24 custom-scrollbar select-none transition-all duration-700 ${isScrollingReels ? `active-glow-${theme}` : ''}`}
                            >
                                {REELS.map((reel) => (
                                    <motion.div
                                        key={reel.id}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 40 }}
                                        viewport={{ once: true }}
                                        className="relative flex-shrink-0 w-[300px] md:w-[400px] aspect-[9/16] rounded-[3.5rem] overflow-hidden glass-deep group cursor-pointer border-white/5 transition-all duration-700"
                                    >
                                        <img src={reel.thumbnail} alt={reel.title} className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-all duration-1000 filter brightness-75 group-hover:brightness-100 grayscale group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent flex flex-col justify-end p-10 transition-all duration-700">
                                            <h3 className="text-white text-2xl md:text-4xl font-black tracking-tight mb-2 uppercase italic leading-none">{reel.title}</h3>
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 duration-700 border-white/10 backdrop-blur-3xl`}><Play className={`w-8 h-8 text-white fill-white ml-2 ${theme === 'fire' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'}`} /></div>
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-12 md:w-24 h-full" />
                            </div>
                        </section>

                        {/* Videos Section */}
                        <section ref={videosRef} className="py-40 space-y-16">
                            <div className="px-12 md:px-24 flex items-end justify-between">
                                <div className="space-y-6">
                                    <span className={`text-[12px] font-black tracking-[0.6em] uppercase ${theme === 'fire' ? 'text-red-600/50' : 'text-blue-500/50'}`}>Curated Collections</span>
                                    <h2 className="text-white font-black tracking-[-0.05em] text-7xl md:text-9xl uppercase italic leading-none">Selected<br />Videos</h2>
                                </div>
                                <div className="hidden md:flex items-center gap-6">
                                    <button onClick={() => scrollCarousel(videosScrollRef, "left", "videos")} className="p-6 glass-deep rounded-full hover:bg-white/10 transition-all border-white/5 group"><ChevronLeft className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" /></button>
                                    <button onClick={() => scrollCarousel(videosScrollRef, "right", "videos")} className="p-6 glass-deep rounded-full hover:bg-white/10 transition-all border-white/5 group"><ChevronRight className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" /></button>
                                </div>
                            </div>

                            <div
                                ref={videosScrollRef}
                                onScroll={() => handleManualScroll("videos")}
                                className={`flex gap-12 overflow-x-auto pb-12 px-12 md:px-24 custom-scrollbar select-none transition-all duration-700 ${isScrollingVideos ? `active-glow-${theme}` : ''}`}
                            >
                                {VIDEOS.map((video) => (
                                    <motion.div
                                        key={video.id}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 40 }}
                                        viewport={{ once: true }}
                                        className="relative flex-shrink-0 w-[450px] md:w-[850px] aspect-video rounded-[3rem] overflow-hidden glass-deep group cursor-pointer border-white/5"
                                    >
                                        <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-all duration-1000 filter brightness-50 group-hover:brightness-100 grayscale group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12 transition-all duration-700">
                                            <span className={`text-[11px] font-black tracking-[0.4em] uppercase mb-4 ${theme === 'fire' ? 'text-red-600/60' : 'text-blue-500/60'}`}>{video.category}</span>
                                            <h3 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-2 uppercase italic leading-none">{video.title}</h3>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glass-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 duration-700 border-white/10 backdrop-blur-2xl"><Play className={`w-12 h-12 text-white fill-white ml-2 ${theme === 'fire' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'}`} /></div>
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-12 md:w-24 h-full" />
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section ref={contactRef} className="min-h-screen flex flex-col items-center justify-center p-8 md:p-24 text-center">
                            <div className="max-w-4xl space-y-16">
                                <div className="space-y-6">
                                    <motion.span
                                        whileInView={{ opacity: 1 }}
                                        initial={{ opacity: 0 }}
                                        className={`text-[10px] font-bold tracking-[0.5em] uppercase ${theme === 'fire' ? 'text-orange-500' : 'text-blue-400'}`}
                                    >
                                        Available for new projects
                                    </motion.span>
                                    <motion.h2
                                        whileInView={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 40 }}
                                        className={`text-6xl md:text-9xl font-bold tracking-tighter text-white uppercase leading-none ${theme === 'fire' ? 'drop-shadow-[0_0_50px_rgba(249,115,22,0.2)]' : ''}`}
                                    >
                                        Let&apos;s Make<br />Magic
                                    </motion.h2>
                                </div>

                                <motion.div
                                    whileInView={{ opacity: 1, y: 0 }}
                                    initial={{ opacity: 0, y: 40 }}
                                    className="flex flex-wrap items-center justify-center gap-8"
                                >
                                    <a href="mailto:harilunavath02@gmail.com" className={`group relative flex items-center gap-8 px-16 py-10 glass-deep rounded-full border-white/10 hover:scale-105 transition-all duration-1000 ${theme === 'fire' ? 'hover:shadow-[0_0_100px_rgba(239,68,68,0.2)]' : 'hover:shadow-[0_0_100px_rgba(59,130,246,0.2)]'}`}>
                                        <span className="text-3xl md:text-5xl font-black tracking-[-0.04em] uppercase italic">Start a Project</span>
                                        <ArrowUpRight className="w-10 h-10 group-hover:rotate-45 transition-transform duration-700" />
                                    </a>
                                </motion.div>

                                <div className="flex flex-wrap items-center justify-center gap-12 pt-12">
                                    <a href="https://www.instagram.com/harilunavath__00/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                                        <Instagram className={`w-8 h-8 text-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110 ${theme === 'fire' ? 'group-hover:text-orange-500' : ''}`} />
                                        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white transition-colors">Instagram</span>
                                        <div className="h-px w-0 bg-white group-hover:w-full transition-all duration-500" />
                                    </a>
                                    <a href="https://wa.me/917989383506" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                                        <MessageCircle className={`w-8 h-8 text-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110 ${theme === 'fire' ? 'group-hover:text-orange-500' : ''}`} />
                                        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white transition-colors">WhatsApp</span>
                                        <div className="h-px w-0 bg-white group-hover:w-full transition-all duration-500" />
                                    </a>
                                </div>

                                <div className="pt-24 text-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
                                    © 2026 HARI EDITS • ALL RIGHTS RESERVED
                                </div>
                            </div>
                        </section>

                    </div>

                    <style jsx global>{`
                        /* Cinematic Quality */
                        body { background: #000; overflow-x: hidden; font-family: var(--font-outfit), sans-serif; }
                        
                        .glass-deep {
                            background: ${theme === 'fire' ? 'rgba(28, 10, 0, 0.4)' : 'rgba(17, 24, 39, 0.4)'};
                            backdrop-filter: blur(40px) saturate(180%);
                            -webkit-backdrop-filter: blur(40px) saturate(180%);
                            border: 1px solid ${theme === 'fire' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
                        }

                        .fire-text-glow {
                            text-shadow: 0 0 30px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.1);
                        }
                        
                        .winter-text-glow {
                            text-shadow: 0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1);
                        }

                        .blue-filter { filter: sepia(0.2) hue-rotate(180deg) brightness(0.4) contrast(1.2) !important; }
                        .red-filter { filter: sepia(0.5) hue-rotate(-15deg) brightness(0.3) contrast(1.3) !important; }

                        /* Hide Scrollbars */
                        ::-webkit-scrollbar { display: none; width: 0; height: 0; }
                        body { scrollbar-width: none; -ms-overflow-style: none; }
                        .custom-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

                        .active-glow-winter img { opacity: 1 !important; filter: contrast(1.1) brightness(1.1) !important; scale: 1.05; transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                        .active-glow-fire img { opacity: 1 !important; filter: contrast(1.1) brightness(1.1) !important; scale: 1.05; transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                        
                        ::selection { background-color: ${theme === 'winter' ? '#3b82f6' : '#991b1b'}; color: white; }
                        
                        /* Hardware acceleration */
                        section { will-change: transform, opacity; }
                    `}</style>
                </motion.main>
            )}
        </AnimatePresence>
    );
}

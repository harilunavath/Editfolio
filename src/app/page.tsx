"use client";

import { useRef, useEffect, useState } from "react";
import { WinterBackground } from "@/components/WinterBackground";
import { FireBackground } from "@/components/FireBackground";
import { Onboarding } from "@/components/Onboarding";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Section Components
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { MyWork } from "@/components/sections/MyWork";
import { LongForm } from "@/components/sections/LongForm";
import { ShortForm } from "@/components/sections/ShortForm";
import { WhatIOffer } from "@/components/sections/WhatIOffer";
import { Contact } from "@/components/sections/Contact";
import { VideoModal } from "@/components/VideoModal";
import { Reel, Video } from "@/lib/videos";

export default function Home() {
    const [theme, setTheme] = useState<"winter" | "fire">("winter");
    const [appState, setAppState] = useState<"onboarding" | "ready">("ready");
    const [isPremium, setIsPremium] = useState(false);

    // Section Refs
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const whatIDoRef = useRef<HTMLDivElement>(null);
    const myWorkRef = useRef<HTMLDivElement>(null);
    const longFormRef = useRef<HTMLDivElement>(null);
    const shortFormRef = useRef<HTMLDivElement>(null);
    const whatIOfferRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [isScrollingReels, setIsScrollingReels] = useState(false);
    const [isScrollingVideos, setIsScrollingVideos] = useState(false);
    const [isScrollingGlobal, setIsScrollingGlobal] = useState(false);

    // Global Modal State
    const [selectedVideo, setSelectedVideo] = useState<Video | Reel | null>(null);
    const [isModalReel, setIsModalReel] = useState(false);

    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollingGlobal(true);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => setIsScrollingGlobal(false), 150);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
    const thoneOpacity = useTransform(scrollY, [0, 500], [theme === "fire" ? 0.85 : 0.75, 0]);
    const throneScale = useTransform(scrollY, [0, 500], [0.95, 1.05]); // Reduced scale to prevent excessive zoom on mobile

    const subjectScale = useTransform(scrollY, [0, 1000], [1.1, 0.85]);
    const subjectOpacity = useTransform(scrollY, [0, 500, 1000], [1, 0.9, 0]);
    const subjectY = useTransform(scrollY, [0, 1000], [0, 150]);

    const heroHariY = useTransform(scrollY, [0, 400], [0, -300]);
    const heroHariScale = useTransform(scrollY, [0, 400], [1, 0.5]);


    const navBg = useTransform(scrollY, [0, 300], ["rgba(0, 0, 0, 0.5)", "rgba(255, 255, 255, 0.01)"]);
    const navBorder = useTransform(scrollY, [0, 300], ["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.04)"]);

    const toggleTheme = () => {
        setTheme(prev => prev === "winter" ? "fire" : "winter");
    };

    const togglePremium = () => {
        setIsPremium(prev => !prev);
    };

    return (
        <AnimatePresence mode="wait">
            {appState === "onboarding" ? (
                <Onboarding selectTheme={(t) => { setTheme(t); setAppState("ready"); }} />
            ) : (
                <motion.main
                    key="portfolio"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative min-h-screen w-full bg-[#050505] selection:bg-white selection:text-black overflow-x-hidden"
                >
                    <div className="grain-overlay" />
                    <div
                        className="fixed inset-0 z-0 pointer-events-none"
                        style={{
                            background: !isPremium
                                ? "radial-gradient(circle at 50% 100%, #111111 0%, #000000 100%)"
                                : theme === "winter"
                                    ? "radial-gradient(circle at 50% 100%, #111827 0%, #030712 100%)"
                                    : "radial-gradient(circle at 50% 100%, #1c0a00 0%, #050200 100%)"
                        }}
                    />

                    <div className="z-1 fixed inset-0 pointer-events-none">
                        {isPremium && (theme === "winter" ? <WinterBackground /> : <FireBackground />)}
                    </div>

                    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl z-50 pointer-events-none">
                        <motion.div
                            style={{ backgroundColor: navBg, borderColor: navBorder }}
                            className="liquid-glass rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between pointer-events-auto border backdrop-blur-xl relative"
                        >
                            <div className="flex items-center gap-12">
                                <span className={`text-white font-bold tracking-tighter text-lg cursor-pointer hover:opacity-50 transition-all duration-500 ${isScrollingGlobal ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                    HARI
                                </span>
                            </div>


                            <div className="flex items-center gap-2 md:gap-3">
                                <button
                                    onClick={togglePremium}
                                    className={`px-3 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase transition-all duration-500 relative overflow-hidden group ${isPremium
                                        ? 'bg-white/5 text-white/40 border border-white/5 hover:text-white'
                                        : 'bg-white text-black border-white hover:bg-white/90'
                                        }`}
                                >
                                    <span className="relative z-10">{isPremium ? "Premium" : "Cinema"}</span>
                                    {!isPremium && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                                            animate={{ x: ["100%", "-100%"] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        />
                                    )}
                                </button>

                                {isPremium && (
                                    <button
                                        onClick={toggleTheme}
                                        className="px-3 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-white/40 hover:text-white hover:bg-white/5 transition-all border border-white/10"
                                    >
                                        {theme === "winter" ? "Ice" : "Fire"}
                                    </button>
                                )}

                                <div className="h-4 w-px bg-white/10 hidden md:block" />

                                <button
                                    onClick={() => scrollToSection(aboutRef)}
                                    className="hidden md:block px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all border border-transparent hover:border-white/10"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => scrollToSection(contactRef)}
                                    className="px-3 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all border border-white/10 hover:border-white/30"
                                >
                                    Contact
                                </button>
                            </div>
                        </motion.div>
                    </nav>

                    <div className="relative z-10 w-full">
                        <Hero
                            isPremium={isPremium}
                            theme={theme}
                            thoneOpacity={thoneOpacity}
                            throneScale={throneScale}
                            subjectScale={subjectScale}
                            subjectOpacity={subjectOpacity}
                            subjectY={subjectY}
                            heroHariY={heroHariY}
                            heroHariScale={heroHariScale}
                            scrollToSection={scrollToSection}
                            reelsRef={shortFormRef}
                            videosRef={longFormRef}
                        />

                        <MyWork ref={myWorkRef} />

                        <LongForm
                            ref={longFormRef}
                            handleManualScroll={handleManualScroll}
                            scrollCarousel={scrollCarousel}
                            isScrollingVideos={isScrollingVideos}
                            isPremium={isPremium}
                            theme={theme}
                            onSelectVideo={(v) => {
                                setSelectedVideo(v);
                                setIsModalReel(false);
                            }}
                        />

                        <ShortForm
                            ref={shortFormRef}
                            handleManualScroll={handleManualScroll}
                            scrollCarousel={scrollCarousel}
                            isScrollingReels={isScrollingReels}
                            isPremium={isPremium}
                            theme={theme}
                            onSelectVideo={(r) => {
                                setSelectedVideo(r);
                                setIsModalReel(true);
                            }}
                        />

                        <WhatIDo ref={whatIDoRef} />

                        <WhatIOffer ref={whatIOfferRef} />

                        <About
                            ref={aboutRef}
                            isScrollingGlobal={isScrollingGlobal}
                            contactRef={contactRef}
                            scrollToSection={scrollToSection}
                        />

                        <Contact ref={contactRef} theme={theme} />
                    </div>

                    <AnimatePresence>
                        {selectedVideo && (
                            <VideoModal
                                isOpen={!!selectedVideo}
                                onClose={() => setSelectedVideo(null)}
                                videoTitle={selectedVideo?.title || ""}
                                videoLink={selectedVideo.link}
                                videoPath={selectedVideo.path}
                                isReel={isModalReel}
                            />
                        )}
                    </AnimatePresence>

                    <style jsx global>{`
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

                        ::-webkit-scrollbar { display: none; width: 0; height: 0; }
                        body { scrollbar-width: none; -ms-overflow-style: none; }
                        .custom-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

                        .active-glow-winter img { opacity: 1 !important; filter: contrast(1.1) brightness(1.1) !important; scale: 1.05; transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                        .active-glow-fire img { opacity: 1 !important; filter: contrast(1.1) brightness(1.1) !important; scale: 1.05; transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                        
                        ::selection { background-color: ${theme === 'winter' ? '#3b82f6' : '#991b1b'}; color: white; }
                        
                        section { will-change: transform, opacity; }

                        @keyframes pulse-glow {
                            0%, 100% {
                                text-shadow:
                                    0 0 20px rgba(255,255,255,0.8),
                                    0 0 40px rgba(255,255,255,0.4),
                                    0 0 80px rgba(255,255,255,0.2);
                            }
                            50% {
                                text-shadow:
                                    0 0 40px rgba(255,255,255,1),
                                    0 0 80px rgba(255,255,255,0.6),
                                    0 0 120px rgba(255,255,255,0.3),
                                    0 0 200px rgba(255,255,255,0.1);
                            }
                        }
                        .hero-glow-text {
                            animation: pulse-glow 3s ease-in-out infinite;
                        }
                    `}</style>
                </motion.main>
            )
            }
        </AnimatePresence >
    );
}

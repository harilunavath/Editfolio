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
    const [theme, setTheme] = useState<"winter" | "fire">("winter"); // Default to winter
    const [appState, setAppState] = useState<"onboarding" | "ready">("ready"); // Start directly
    const [isPremium, setIsPremium] = useState(false); // Default to minimal mode

    const reelsRef = useRef<HTMLDivElement>(null);
    const videosRef = useRef<HTMLDivElement>(null);
    const reelsScrollRef = useRef<HTMLDivElement>(null);
    const videosScrollRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const [isScrollingReels, setIsScrollingReels] = useState(false);
    const [isScrollingVideos, setIsScrollingVideos] = useState(false);
    const [isScrollingGlobal, setIsScrollingGlobal] = useState(false);

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
    const throneOpacity = useTransform(scrollY, [0, 500], [theme === "fire" ? 0.85 : 0.75, 0]);
    const throneScale = useTransform(scrollY, [0, 500], [1, 1.15]);

    // Minimal Mode Subject Transforms - Zoomed out more
    const subjectScale = useTransform(scrollY, [0, 1000], [1.1, 0.85]);
    const subjectOpacity = useTransform(scrollY, [0, 500, 1000], [1, 0.9, 0]);
    const subjectY = useTransform(scrollY, [0, 1000], [0, 150]);

    // New Merging Text Transforms
    const heroHariY = useTransform(scrollY, [0, 400], [0, -300]);
    const heroHariOpacity = useTransform(scrollY, [0, 200, 400], [0.2, 1, 0]);
    const heroHariScale = useTransform(scrollY, [0, 400], [1, 0.5]);

    const navCentralHariOpacity = useTransform(scrollY, [350, 500], [0, 1]);
    const navCentralHariY = useTransform(scrollY, [350, 500], [20, 0]);

    const navBg = useTransform(scrollY, [0, 300], ["rgba(0, 0, 0, 0.5)", "rgba(255, 255, 255, 0.01)"]);
    const navBorder = useTransform(scrollY, [0, 300], ["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.04)"]);

    const brandingOpacity = useTransform(scrollY, [0, 300], [1, 0]);

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
                    {/* Texture Layer */}
                    <div className="grain-overlay" />
                    {/* Background Layer (Fixed) */}
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

                    {/* Background Components */}
                    <div className="z-[12] fixed inset-0 pointer-events-none">
                        {isPremium && (theme === "winter" ? <WinterBackground /> : <FireBackground />)}
                    </div>

                    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-7xl z-50 pointer-events-none">
                        <motion.div
                            style={{ backgroundColor: navBg, borderColor: navBorder }}
                            className="liquid-glass rounded-full px-8 py-4 flex items-center justify-between pointer-events-auto border backdrop-blur-xl relative"
                        >
                            <div className="flex items-center gap-12">
                                <span className={`text-white font-bold tracking-tighter text-lg cursor-pointer hover:opacity-50 transition-all duration-500 ${isScrollingGlobal ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                    HARI<span className="text-white/30">EDITS</span>
                                </span>
                            </div>

                            <motion.div
                                style={{ opacity: navCentralHariOpacity, y: navCentralHariY }}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                            >
                                <span className="text-white font-bold tracking-[0.4em] text-xs uppercase italic mr-[-0.4em]">HARI</span>
                            </motion.div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={togglePremium}
                                    className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-500 relative overflow-hidden group ${isPremium
                                        ? 'bg-white/5 text-white/40 border border-white/5 hover:text-white'
                                        : 'bg-white text-black border-white hover:bg-white/90'
                                        }`}
                                >
                                    <span className="relative z-10">{isPremium ? "Minimal" : "Unlock Cinematic"}</span>
                                    {!isPremium && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                                            animate={{ x: ["100%", "-100%"] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        />
                                    )}
                                </button>
                                {isPremium && (
                                    <>
                                        <button
                                            onClick={toggleTheme}
                                            className="hidden md:block px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 hover:text-white hover:bg-white/5 transition-all border border-transparent"
                                        >
                                            {theme === "winter" ? "Ice" : "Fire"}
                                        </button>
                                        <div className="h-4 w-px bg-white/10 mx-2 hidden md:block" />
                                    </>
                                )}
                                <button
                                    onClick={() => scrollToSection(contactRef)}
                                    className="px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all border border-white/10 hover:border-white/30"
                                >
                                    Contact
                                </button>
                            </div>
                        </motion.div>
                    </nav>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full">

                        {/* Hero Section */}
                        <section className="relative h-screen flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                            {/* Cinematic Iron Throne Backdrop for Hero Only */}
                            <AnimatePresence>
                                {isPremium && (
                                    <motion.div
                                        key="premium-backdrop"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        style={{ opacity: throneOpacity, scale: throneScale, willChange: "transform, opacity" }}
                                        className="absolute inset-0 z-0 pointer-events-none"
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
                                )}
                            </AnimatePresence>

                            {/* Minimal Mode Subtle Ambient */}
                            {!isPremium && (
                                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
                            )}

                            <header className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center">
                                <AnimatePresence mode="wait">
                                    {!isPremium ? (
                                        <motion.div
                                            key="minimal-hero"
                                            style={{ scale: subjectScale, opacity: subjectOpacity, y: subjectY }}
                                            className="relative w-full h-[60vh] rounded-[4rem] overflow-hidden liquid-glass group"
                                        >
                                            <img
                                                src="/Subject.jpg"
                                                alt="Subject"
                                                className={`w-full h-full object-contain transition-all duration-[800ms] ease-out ${isScrollingGlobal ? 'grayscale brightness-50 contrast-[1.2]' : 'grayscale-0 brightness-110'
                                                    }`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                                            {/* Left flowing text panel */}
                                            <div className="absolute left-0 top-0 h-full w-[18%] overflow-hidden flex items-center justify-center pointer-events-none bg-black/30 backdrop-blur-sm">
                                                <motion.div
                                                    animate={{ y: ["0%", "-50%"] }}
                                                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                                                    className="flex flex-col gap-6"
                                                >
                                                    {[...Array(2)].map((_, i) => (
                                                        <div key={i} className="flex flex-col gap-6">
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Visual Storyteller</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Lorem ipsum dolor sit amet</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Cinematic Precision</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Consectetur adipiscing elit</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Frame by Frame</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Sed do eiusmod tempor</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Light &amp; Shadow</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Incididunt ut labore</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </div>

                                            {/* Right flowing text panel */}
                                            <div className="absolute right-0 top-0 h-full w-[18%] overflow-hidden flex items-center justify-center pointer-events-none bg-black/30 backdrop-blur-sm">
                                                <motion.div
                                                    animate={{ y: ["-50%", "0%"] }}
                                                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                                    style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                                    className="flex flex-col gap-6"
                                                >
                                                    {[...Array(2)].map((_, i) => (
                                                        <div key={i} className="flex flex-col gap-6">
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Motion Design</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Et dolore magna aliqua</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Color Grading</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Ut enim ad minim veniam</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Post Production</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Quis nostrud exercitation</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase whitespace-nowrap">Edit Suite</span>
                                                            <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap">Ullamco laboris nisi</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </div>

                                            {/* Minimal Branding Layered over Image */}
                                            <motion.div
                                                className="absolute inset-x-0 bottom-24 flex flex-col items-center space-y-4"
                                            >
                                                <motion.h1
                                                    style={{ y: heroHariY, opacity: heroHariOpacity, scale: heroHariScale }}
                                                    className="text-7xl md:text-9xl font-bold tracking-tighter text-white uppercase italic"
                                                >
                                                    HARI
                                                </motion.h1>
                                                <motion.div style={{ opacity: brandingOpacity }} className="flex flex-col items-center space-y-4">
                                                    <div className="h-px w-12 bg-white/20" />
                                                    <p className="text-[10px] font-bold tracking-[0.8em] text-white/30 uppercase">Subject • 001</p>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="premium-hero"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="space-y-12"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="inline-flex items-center px-4 py-1 rounded-full glass-deep text-[11px] font-black tracking-[0.4em] uppercase text-white/40 mb-2 border-white/10"
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full mr-3 animate-pulse ${!isPremium ? 'bg-white shadow-[0_0_10px_white]' : (theme === 'fire' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]')}`} />
                                                {isPremium ? "King of Edits" : "Visual Storyteller"}
                                            </motion.div>

                                            <motion.h1
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                                className={`text-8xl md:text-[18rem] font-bold tracking-tighter leading-[0.7] uppercase ${isPremium ? (theme === 'fire' ? 'fire-text-glow italic' : 'winter-text-glow italic') : 'text-white'}`}
                                            >
                                                HARI<br />
                                                <span className={`text-transparent bg-clip-text ${!isPremium ? 'bg-gradient-to-b from-white via-white/50 to-transparent' : (theme === 'fire' ? 'bg-gradient-to-b from-orange-500 to-red-800' : 'bg-gradient-to-b from-blue-100 to-blue-500/30')} ${isPremium ? 'opacity-80' : 'opacity-100'}`}>EDITS</span>
                                            </motion.h1>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 1.5 }}
                                                className={`max-w-md text-sm md:text-base leading-relaxed mx-auto text-balance tracking-widest uppercase ${isPremium ? 'text-white/40 font-medium' : 'text-white/20 font-light'}`}
                                            >
                                                {isPremium
                                                    ? "Bending light and shadow to my will. The realm's finest visuals, forged in fire and ice."
                                                    : "Crafting visual rhythm. Precise edits for high-end narratives."}
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-wrap items-center justify-center gap-6 pt-16"
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
                        <section ref={reelsRef} className="py-32 space-y-12">
                            <div className="max-w-7xl mx-auto px-12 flex items-baseline justify-between overflow-hidden">
                                <div className="flex items-baseline gap-4">
                                    <h2 className="text-white font-bold tracking-tighter text-5xl md:text-7xl uppercase italic">Reels</h2>
                                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 whitespace-nowrap">Short Form Narrative</span>
                                </div>
                                <div className="h-px bg-white/10 flex-grow mx-12 hidden md:block" />
                                <div className="flex items-center gap-4">
                                    <button onClick={() => scrollCarousel(reelsScrollRef, "left", "reels")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
                                    <button onClick={() => scrollCarousel(reelsScrollRef, "right", "reels")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
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
                                        className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[9/16] rounded-[4rem] overflow-hidden liquid-glass group cursor-pointer border-white/5 transition-all duration-700 hover:border-white/20"
                                    >
                                        <img
                                            src={reel.thumbnail}
                                            alt={reel.title}
                                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out ${isPremium
                                                ? 'transform scale-110 group-hover:scale-100 filter brightness-75 group-hover:brightness-100 grayscale group-hover:grayscale-0'
                                                : `filter ${isScrollingReels ? 'grayscale-0 brightness-105 contrast-100 scale-105 saturate-110' : 'grayscale brightness-40 contrast-[1.2] scale-100'}`
                                                }`}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-10 transition-all duration-700 ${!isPremium && !isScrollingReels ? 'opacity-0' : 'opacity-100'}`}>
                                            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2 uppercase italic leading-none">{reel.title}</h3>
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full glass-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500 border-white/10 backdrop-blur-3xl`}><Play className={`w-6 h-6 text-white fill-white ml-1 ${theme === 'fire' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'}`} /></div>
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-12 md:w-24 h-full" />
                            </div>
                        </section>

                        {/* Videos Section */}
                        <section ref={videosRef} className="py-32 space-y-12">
                            <div className="max-w-7xl mx-auto px-12 flex items-baseline justify-between overflow-hidden">
                                <div className="flex items-baseline gap-4">
                                    <h2 className="text-white font-bold tracking-tighter text-5xl md:text-7xl uppercase italic">Videos</h2>
                                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 whitespace-nowrap">Curated Collections</span>
                                </div>
                                <div className="h-px bg-white/10 flex-grow mx-12 hidden md:block" />
                                <div className="flex items-center gap-4">
                                    <button onClick={() => scrollCarousel(videosScrollRef, "left", "videos")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
                                    <button onClick={() => scrollCarousel(videosScrollRef, "right", "videos")} className="w-12 h-12 flex items-center justify-center liquid-glass rounded-full hover:bg-white/5 transition-all group"><ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></button>
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
                                        className="relative flex-shrink-0 w-[400px] md:w-[750px] aspect-video rounded-[4rem] overflow-hidden liquid-glass group cursor-pointer border-white/5 hover:border-white/20 transition-all duration-700"
                                    >
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out ${isPremium
                                                ? 'transform scale-110 group-hover:scale-100 filter brightness-50 group-hover:brightness-100 grayscale group-hover:grayscale-0'
                                                : `filter ${isScrollingVideos ? 'grayscale-0 brightness-105 contrast-100 scale-105 saturate-110' : 'grayscale brightness-30 contrast-[1.3] scale-100'}`
                                                }`}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 transition-all duration-700 ${!isPremium && !isScrollingVideos ? 'opacity-0' : 'opacity-100'}`}>
                                            <span className={`text-[11px] font-bold tracking-[0.4em] uppercase mb-4 ${!isPremium ? 'text-white/40' : (theme === 'fire' ? 'text-red-600/60' : 'text-blue-500/60')}`}>{video.category}</span>
                                            <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-2 uppercase italic leading-none">{video.title}</h3>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full glass-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500 border-white/10 backdrop-blur-2xl"><Play className={`w-10 h-10 text-white fill-white ml-1 ${theme === 'fire' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'}`} /></div>
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-12 md:w-24 h-full" />
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section ref={contactRef} className="py-48 flex flex-col items-center justify-center text-center">
                            <div className="max-w-4xl px-8 space-y-24">
                                <div className="space-y-8">
                                    <motion.h2
                                        whileInView={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        className="text-6xl md:text-9xl font-bold tracking-tighter text-white uppercase italic leading-none"
                                    >
                                        Let&apos;s talk
                                    </motion.h2>
                                    <div className="h-px w-24 bg-white/20 mx-auto" />
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

"use client";

import { useRef, useEffect, useState } from "react";
import { SakuraBackground } from "@/components/SakuraBackground";
import { Github, Twitter, Linkedin, Play, ChevronLeft, ChevronRight, Smartphone, Film, Mail, ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const VIDEOS = [
    { id: 1, title: "Cinematic Urban Flow", category: "Commercial", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Mountain Peak Journey", category: "Nature", thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { id: 9, title: "Neon Glitch Reel", category: "VFX / Edit", thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
    { id: 10, title: "Neon Abstract", category: "Experimental", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Modern Architecture", category: "Real Estate", thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Future Tech Expo", category: "Corporate", thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
];

const TOOLS = [
    { name: "Premiere Pro", icon: "/icons/premiere.png" },
    { name: "After Effects", icon: "/icons/ae.png" },
    { name: "DaVinci Resolve", icon: "/icons/davinci.svg" },
];

const REELS = [
    { id: 1, title: "Lifestyle Reveal", thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "Product Promo", thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "Travel Byte", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600" },
    { id: 4, title: "Fitness Edit", thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600" },
    { id: 5, title: "Glow Night", thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600" },
];

export default function Home() {
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
            const scrollAmount = direction === "left" ? -400 : 400;
            ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            handleManualScroll(type);
        }
    };

    return (
        <main className="relative min-h-screen w-full bg-background selection:bg-white selection:text-black overflow-x-hidden"
            style={{ background: "radial-gradient(circle at 50% 100%, #1a1a1a 0%, #09090b 100%)" }}>

            {/* Sticky Header */}
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <span className="text-white font-bold tracking-tighter text-xl cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>HARI<span className="text-white/20">EDITS</span></span>
                </div>
                <div className="pointer-events-auto">
                    <button
                        onClick={() => scrollToSection(contactRef)}
                        className="glass px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white/60 hover:text-white hover:border-white/20 transition-all border-white/5"
                    >
                        Contact
                    </button>
                </div>
            </nav>

            {/* Background Layer */}
            <div className="z-0 fixed inset-0 pointer-events-none">
                <SakuraBackground />
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full">

                {/* Hero Section */}
                <section className="relative h-screen flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                    <header className="max-w-4xl space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center px-4 py-1.5 rounded-full glass text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 border-white/5"
                        >
                            Professional Video Editor
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-none"
                        >
                            HARI<br /><span className="text-white/20">EDITS</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl text-lg md:text-xl text-white/40 leading-relaxed font-light text-balance mx-auto"
                        >
                            Crafting visual narratives through precision cutting and rhythmic storytelling. Transforming raw footage into cinematic experiences that resonate.
                        </motion.p>

                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-3 pt-4"
                        >
                            {TOOLS.map((tool) => (
                                <div
                                    key={tool.name}
                                    className="flex items-center gap-2.5 px-4 py-2 glass rounded-full border-white/5 text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white hover:border-white/10 transition-all duration-500 cursor-default group/tool"
                                >
                                    <img
                                        src={tool.icon}
                                        alt={tool.name}
                                        className="w-4 h-4 opacity-40 grayscale brightness-[2] group-hover/tool:opacity-100 group-hover/tool:grayscale-0 group-hover/tool:brightness-100 transition-all duration-500"
                                    />
                                    {tool.name}
                                </div>
                            ))}
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center gap-4 pt-8"
                        >
                            <button
                                onClick={() => scrollToSection(reelsRef)}
                                className="group relative flex items-center gap-3 px-8 py-4 glass text-white font-bold rounded-full transition-all duration-500 hover:bg-white hover:text-black border-white/10"
                            >
                                <Smartphone className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                                Watch Reels
                            </button>
                            <button
                                onClick={() => scrollToSection(videosRef)}
                                className="group relative flex items-center gap-3 px-8 py-4 bg-black/40 text-white font-bold rounded-full border border-white/5 transition-all duration-500 hover:bg-black/60"
                            >
                                <Film className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                                Main Videos
                            </button>
                            <button
                                onClick={() => scrollToSection(contactRef)}
                                className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 text-white/60 font-bold rounded-full border border-white/5 transition-all duration-500 hover:bg-white/10 hover:text-white"
                            >
                                <Mail className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                                Let&apos;s Talk
                            </button>
                        </motion.div>
                    </header>


                </section>

                {/* Reels Section */}
                <section ref={reelsRef} className="py-24 space-y-12">
                    <div className="px-12 md:px-24 flex items-end justify-between">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">Social Media Content</span>
                            <h2 className="text-white font-bold tracking-tighter text-5xl md:text-7xl uppercase">Featured Reels</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <button onClick={() => scrollCarousel(reelsScrollRef, "left", "reels")} className="p-4 glass rounded-full hover:bg-white/10 transition-all border-white/10 group"><ChevronLeft className="w-6 h-6 text-white/40 group-hover:text-white" /></button>
                            <button onClick={() => scrollCarousel(reelsScrollRef, "right", "reels")} className="p-4 glass rounded-full hover:bg-white/10 transition-all border-white/10 group"><ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white" /></button>
                        </div>
                    </div>

                    <div
                        ref={reelsScrollRef}
                        onScroll={() => handleManualScroll("reels")}
                        className={`flex gap-8 overflow-x-auto pb-12 px-12 md:px-24 custom-scrollbar snap-x select-none transition-all duration-700 ${isScrollingReels ? 'active-glow' : ''}`}
                    >
                        {REELS.map((reel) => (
                            <motion.div
                                key={reel.id}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 40 }}
                                viewport={{ once: true }}
                                className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[9/16] rounded-[32px] overflow-hidden glass group cursor-pointer border-white/5 snap-center"
                            >
                                <img src={reel.thumbnail} alt={reel.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 filter grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-white text-xl font-bold tracking-tight mb-2 uppercase">{reel.title}</h3>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 duration-500 border-white/20"><Play className="w-6 h-6 text-white fill-white ml-1" /></div>
                                </div>
                            </motion.div>
                        ))}
                        <div className="flex-shrink-0 w-12 md:w-24 h-full" />
                    </div>
                </section>

                {/* Videos Section */}
                <section ref={videosRef} className="py-24 space-y-12">
                    <div className="px-12 md:px-24 flex items-end justify-between">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">Video Editor Portfolio</span>
                            <h2 className="text-white font-bold tracking-tighter text-5xl md:text-7xl uppercase">Selected Videos</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <button onClick={() => scrollCarousel(videosScrollRef, "left", "videos")} className="p-4 glass rounded-full hover:bg-white/10 transition-all border-white/10 group"><ChevronLeft className="w-6 h-6 text-white/40 group-hover:text-white" /></button>
                            <button onClick={() => scrollCarousel(videosScrollRef, "right", "videos")} className="p-4 glass rounded-full hover:bg-white/10 transition-all border-white/10 group"><ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white" /></button>
                        </div>
                    </div>

                    <div
                        ref={videosScrollRef}
                        onScroll={() => handleManualScroll("videos")}
                        className={`flex gap-12 overflow-x-auto pb-12 px-12 md:px-24 custom-scrollbar snap-x select-none transition-all duration-700 ${isScrollingVideos ? 'active-glow' : ''}`}
                    >
                        {VIDEOS.map((video) => (
                            <motion.div
                                key={video.id}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 40 }}
                                viewport={{ once: true }}
                                className="relative flex-shrink-0 w-[450px] md:w-[750px] aspect-video rounded-[32px] overflow-hidden glass group cursor-pointer border-white/5 snap-center"
                            >
                                <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 filter grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12">
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-3">{video.category}</span>
                                    <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2 uppercase">{video.title}</h3>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 duration-500 border-white/20"><Play className="w-10 h-10 text-white fill-white ml-1.5" /></div>
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
                                className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase"
                            >
                                Available for new projects
                            </motion.span>
                            <motion.h2
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 40 }}
                                className="text-6xl md:text-9xl font-bold tracking-tighter text-white uppercase leading-none"
                            >
                                Let&apos;s Make<br />Magic
                            </motion.h2>
                        </div>

                        <motion.div
                            whileInView={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-wrap items-center justify-center gap-6"
                        >
                            <a href="mailto:hello@haridits.com" className="group flex items-center gap-6 px-12 py-8 glass rounded-full border-white/10 hover:bg-white hover:text-black transition-all duration-700">
                                <span className="text-2xl md:text-4xl font-bold tracking-tighter uppercase">Start a Project</span>
                                <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
                            </a>
                        </motion.div>

                        <div className="flex flex-wrap items-center justify-center gap-12 pt-12">
                            <a href="https://www.instagram.com/harilunavath__00/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                                <Instagram className="w-8 h-8 text-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                                <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white transition-colors">Instagram</span>
                                <div className="h-px w-0 bg-white group-hover:w-full transition-all duration-500" />
                            </a>
                            <a href="https://wa.me/917989383506" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                                <MessageCircle className="w-8 h-8 text-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                                <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white transition-colors">WhatsApp</span>
                                <div className="h-px w-0 bg-white group-hover:w-full transition-all duration-500" />
                            </a>
                        </div>

                        <div className="pt-24 text-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
                            © 2024 HARI EDITS • ALL RIGHTS RESERVED
                        </div>
                    </div>
                </section>

            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; transition: all 0.5s; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
                
                .active-glow.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.4); box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
                .active-glow img { opacity: 1 !important; filter: grayscale(0) !important; scale: 1.01; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .active-glow .glass { border-color: rgba(255, 255, 255, 0.2) !important; box-shadow: 0 0 20px rgba(255, 255, 255, 0.05); }

                .custom-scrollbar { -ms-overflow-style: auto; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.02); }
                html { scroll-behavior: smooth; }
                ::selection { background-color: #FFFDD0; color: #1a1a1a; }
            `}</style>
        </main>
    );
}

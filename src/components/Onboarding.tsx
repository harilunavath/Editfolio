"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WinterBackground } from "./WinterBackground";
import { FireBackground } from "./FireBackground";
import { Sparkles, Flame, Snowflake } from "lucide-react";

interface OnboardingProps {
    selectTheme: (theme: "winter" | "fire") => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ selectTheme }) => {
    const [hoveredSide, setHoveredSide] = useState<"winter" | "fire" | null>(null);

    return (
        <motion.main
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "brightness(0) blur(40px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden font-sans"
        >
            {/* Dynamic Atmosphere Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    {hoveredSide === "winter" && (
                        <motion.div
                            key="winter-bg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-blue-900/20"
                        >
                            <WinterBackground active={true} />
                        </motion.div>
                    )}
                    {hoveredSide === "fire" && (
                        <motion.div
                            key="fire-bg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-orange-950/20"
                        >
                            <FireBackground active={true} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Default Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            </div>

            {/* Grain/Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Central Content */}
            <div className="relative z-20 max-w-7xl w-full px-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-20 space-y-4"
                >
                    <span className="text-[10px] font-black tracking-[1em] text-white/30 uppercase block">The Great War Returns</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                        Choose Your <span className="text-white/20">Realm</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
                    {/* Winter Card */}
                    <motion.div
                        onMouseEnter={() => setHoveredSide("winter")}
                        onMouseLeave={() => setHoveredSide(null)}
                        onClick={() => selectTheme("winter")}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative cursor-pointer"
                    >
                        <div className="relative z-10 p-1 rounded-[3rem] transition-all duration-700 group-hover:bg-blue-500/20 bg-white/5 overflow-hidden">
                            <div className="relative rounded-[2.8rem] bg-black/80 backdrop-blur-3xl p-12 flex flex-col items-center space-y-8 h-full border border-white/5 transition-all duration-700 group-hover:border-blue-500/30 overflow-hidden">
                                {/* Emblem */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="relative w-32 h-32 flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <img src="/GOT.png" alt="House Stark" className="w-full h-full object-contain relative z-10 brightness-110 contrast-125 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                                </motion.div>

                                <div className="text-center space-y-2">
                                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tight">Winter</h2>
                                    <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.4em] text-blue-400/60 uppercase">
                                        <Snowflake size={12} className="opacity-50" />
                                        <span>Ice • Precision • Flow</span>
                                    </div>
                                </div>

                                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                    <button className="px-8 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all">
                                        Enter North
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Fire Card */}
                    <motion.div
                        onMouseEnter={() => setHoveredSide("fire")}
                        onMouseLeave={() => setHoveredSide(null)}
                        onClick={() => selectTheme("fire")}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative cursor-pointer"
                    >
                        <div className="relative z-10 p-1 rounded-[3rem] transition-all duration-700 group-hover:bg-orange-600/20 bg-white/5 overflow-hidden">
                            <div className="relative rounded-[2.8rem] bg-black/80 backdrop-blur-3xl p-12 flex flex-col items-center space-y-8 h-full border border-white/5 transition-all duration-700 group-hover:border-orange-500/30 overflow-hidden">
                                {/* Emblem */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    className="relative w-32 h-32 flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <img src="/targaryen.png" alt="House Targaryen" className="w-full h-full object-contain relative z-10 brightness-110 contrast-125 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
                                </motion.div>

                                <div className="text-center space-y-2">
                                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tight">Fire</h2>
                                    <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.4em] text-orange-500/60 uppercase">
                                        <Flame size={12} className="opacity-50" />
                                        <span>Power • Energy • Impact</span>
                                    </div>
                                </div>

                                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                    <button className="px-8 py-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black tracking-widest uppercase hover:bg-orange-500 hover:text-white transition-all">
                                        House of the Dragon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
                .glass-deep {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(40px) saturate(180%);
                    -webkit-backdrop-filter: blur(40px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </motion.main>
    );
};

"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "../AnimatedCounter";

interface AboutProps {
    isScrollingGlobal: boolean;
    contactRef: React.RefObject<HTMLDivElement | null>;
    scrollToSection: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

/**
 * The About Me section component.
 */
export const About = React.forwardRef<HTMLDivElement, AboutProps>(({ isScrollingGlobal, contactRef, scrollToSection }, ref) => {
    return (
        <section ref={ref} className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                    {/* Image */}
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-[3rem] overflow-hidden liquid-glass aspect-[3/4] group"
                    >
                        <img
                            src="/Subject1.jpg"
                            alt="Hari"
                            className={`w-full h-full object-contain transition-all duration-[800ms] ease-out group-hover:scale-105 ${isScrollingGlobal ? 'grayscale brightness-50 contrast-125' : 'brightness-105'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-10"
                    >
                        <div className="space-y-4">
                            <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase">About Me</span>
                            <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-[1.1]">
                                Transforming Ideas Into <br />
                                <span className="text-white/30">Powerful Visual Stories</span>
                            </h2>
                        </div>

                        <div className="h-px w-16 bg-white/10" />

                        <div className="space-y-6">
                            <p className="text-white/80 text-lg leading-relaxed font-light max-w-xl">
                                I am a <strong className="text-white font-bold">tech professional turned freelance video editor</strong> and visual storyteller based in India. With a strong foundation in technology and a passion for cinematic storytelling, I combine creativity and precision to transform raw footage into compelling visual narratives.
                            </p>
                            <p className="text-white/40 text-sm leading-relaxed font-light max-w-xl">
                                My journey into video editing began with a deep curiosity about how powerful stories are crafted on screen. What started as an interest soon evolved into a full-time creative pursuit. Today, I specialize in short-form content, long-form cinematic edits, motion graphics, and professional color grading.
                            </p>
                            <p className="text-white/40 text-sm leading-relaxed font-light max-w-xl italic">
                                For me, every project is more than just an edit—it’s an opportunity to create impactful content that connects with audiences and delivers meaningful results.
                            </p>
                        </div>


                        <button
                            onClick={() => scrollToSection(contactRef)}
                            className="self-start flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-500 text-[11px] font-bold tracking-[0.3em] uppercase group"
                        >
                            <span>Work with me</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});

About.displayName = "About";

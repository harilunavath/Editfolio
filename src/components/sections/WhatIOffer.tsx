"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Target } from "lucide-react";

/**
 * The "What I Offer" section.
 */
export const WhatIOffer = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
    const offers = [
        {
            title: "Audience Connection",
            desc: "Every edit is designed to capture attention and connect deeply with your target audience.",
            icon: <Sparkles className="w-8 h-8" />
        },
        {
            title: "High-Energy Results",
            desc: "Fast-paced, impactful visuals delivered with high-quality cinematic production standards.",
            icon: <Zap className="w-8 h-8" />
        },
        {
            title: "Meaningful Narratives",
            desc: "Turning raw ideas into structured stories that deliver impactful messages and results.",
            icon: <Target className="w-8 h-8" />
        }
    ];

    return (
        <section ref={ref} className="py-20 md:py-32 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase">Values</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
                                What <br />
                                <span className="text-white/30">I Offer</span>
                            </h2>
                        </div>
                        <p className="text-white/50 text-lg leading-relaxed font-light max-w-md">
                            I provide a complete post-production ecosystem focused on high-end results and cinematic excellence.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {offers.map((o, i) => (
                            <motion.div
                                key={o.title}
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 50 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="flex items-start gap-6 md:gap-8 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 bg-black/40 group hover:border-white/10 transition-all"
                            >
                                <div className="text-white/30 group-hover:text-white transition-colors">
                                    {o.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase italic tracking-tight">{o.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{o.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

WhatIOffer.displayName = "WhatIOffer";

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Layers, Palette } from "lucide-react";

/**
 * The "What I Do" section.
 */
export const WhatIDo = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
    const services = [
        {
            title: "Cinematic Editing",
            desc: "Shaping raw footage into rhythmic, narrative masterpieces through precise cuts and intentional pacing.",
            icon: <Play className="w-10 h-10" />
        },
        {
            title: "Motion Graphics",
            desc: "Adding dynamic visual layers and fluid animations that enhance the storytelling experience.",
            icon: <Layers className="w-10 h-10" />
        },
        {
            title: "Color Grading",
            desc: "Bending light and shadow to create evocative atmospheres that define the mood of every project.",
            icon: <Palette className="w-10 h-10" />
        }
    ];

    return (
        <section ref={ref} className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="space-y-4 mb-20">
                    <span className="text-[10px] font-black tracking-[0.6em] text-white/30 uppercase">Expertise</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
                        What <span className="text-white/30">I Do</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] liquid-glass border border-white/5 space-y-6 md:space-y-8 group hover:border-white/20 transition-all duration-500"
                        >
                            <div className="text-white/20 group-hover:text-white transition-colors duration-500">
                                {s.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">{s.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                                    {s.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

WhatIDo.displayName = "WhatIDo";

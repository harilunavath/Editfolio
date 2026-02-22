"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * The "My Work" intro section.
 */
export const MyWork = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
    return (
        <section ref={ref} className="pt-24 md:pt-48 pb-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center text-center space-y-6">
                    <span className="text-[10px] font-black tracking-[1em] text-white/20 uppercase block mb-4">Portfolio</span>
                    <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-none">
                        Selected <span className="text-white/20">Work</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base tracking-[0.2em] uppercase font-bold max-w-xl">
                        A curation of cinematic narratives and short-form impact.
                    </p>
                </div>
            </div>
        </section>
    );
});

MyWork.displayName = "MyWork";

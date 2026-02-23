"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, MessageCircle, Linkedin } from "lucide-react";

interface ContactProps {
    theme: "winter" | "fire";
}

/**
 * The Contact / Get in touch section.
 */
export const Contact = React.forwardRef<HTMLDivElement, ContactProps>(({ theme }, ref) => {
    return (
        <section ref={ref} className="py-24 md:py-48 flex flex-col items-center justify-center text-center">
            <div className="max-w-4xl px-6 md:px-8 space-y-16 md:space-y-24">
                <div className="space-y-8">
                    <motion.h2
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        className="text-5xl md:text-9xl font-bold tracking-tighter text-white uppercase italic leading-none"
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
                    <a href="mailto:harilunavath02@gmail.com" className={`group relative flex items-center gap-6 md:gap-8 px-10 md:px-16 py-6 md:py-10 glass-deep rounded-full border-white/10 hover:scale-105 transition-all duration-1000 ${theme === 'fire' ? 'hover:shadow-[0_0_100px_rgba(239,68,68,0.2)]' : 'hover:shadow-[0_0_100px_rgba(59,130,246,0.2)]'}`}>
                        <span className="text-xl md:text-5xl font-black tracking-[-0.04em] uppercase italic">Start a Project</span>
                        <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 group-hover:rotate-45 transition-transform duration-700" />
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
                    <a href="https://www.linkedin.com/in/hari-lunavath-a20ab8229/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                        <Linkedin className={`w-8 h-8 text-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110 ${theme === 'fire' ? 'group-hover:text-orange-500' : ''}`} />
                        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white transition-colors">LinkedIn</span>
                        <div className="h-px w-0 bg-white group-hover:w-full transition-all duration-500" />
                    </a>
                </div>

                <div className="pt-24 text-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
                    © 2026 HARI  • ALL RIGHTS RESERVED
                </div>
            </div>
        </section>
    );
});

Contact.displayName = "Contact";

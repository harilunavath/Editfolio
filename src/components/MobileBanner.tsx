"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X } from "lucide-react";

const SESSION_KEY = "mobile-banner-dismissed";

/**
 * Detects mobile viewports (<768px) and renders a dismissable bottom-sheet
 * asking the user to switch to desktop for the full cinematic experience.
 * Dismissed state persists for the browser session via sessionStorage.
 */
export function MobileBanner() {
    const [isMobile, setIsMobile] = useState(false);
    const [dismissed, setDismissed] = useState(true); // start hidden to avoid SSR flash

    useEffect(() => {
        // Skip if already dismissed this session
        if (sessionStorage.getItem(SESSION_KEY)) return;

        const mq = window.matchMedia("(max-width: 767px)");
        const update = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
            setDismissed(!e.matches); // auto-show when mobile, auto-hide when desktop
        };

        update(mq);
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const dismiss = () => {
        setDismissed(true);
        sessionStorage.setItem(SESSION_KEY, "1");
    };

    const show = isMobile && !dismissed;

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                        onClick={dismiss}
                        aria-hidden="true"
                    />

                    {/* Bottom sheet */}
                    <motion.div
                        key="mobile-sheet"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Desktop experience recommended"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="fixed bottom-0 left-0 right-0 z-[9999] px-5 pb-8 pt-6 rounded-t-3xl border-t border-white/10"
                        style={{
                            background:
                                "linear-gradient(160deg, rgba(12,12,18,0.97) 0%, rgba(8,8,14,0.99) 100%)",
                            boxShadow: "0 -24px 80px rgba(0,0,0,0.7), 0 -1px 0 rgba(200,216,255,0.08)",
                        }}
                    >
                        {/* Dismiss button */}
                        <button
                            onClick={dismiss}
                            aria-label="Dismiss"
                            className="absolute top-4 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all duration-200 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Handle bar */}
                        <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6" />

                        {/* Icon */}
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                            style={{
                                background: "linear-gradient(135deg, rgba(200,216,255,0.1), rgba(200,216,255,0.04))",
                                border: "1px solid rgba(200,216,255,0.12)",
                                boxShadow: "0 0 24px rgba(200,216,255,0.08) inset",
                            }}
                        >
                            <Monitor className="w-6 h-6 text-[#c8d8ff]" />
                        </div>

                        {/* Headline */}
                        <h2
                            className="text-center text-[17px] font-black tracking-tight leading-snug mb-2"
                            style={{
                                background:
                                    "linear-gradient(90deg, #fff 0%, #c8d8ff 50%, #fff 100%)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Best on Desktop
                        </h2>

                        {/* Body */}
                        <p className="text-center text-[13px] text-white/40 leading-relaxed max-w-xs mx-auto mb-7 font-light tracking-wide">
                            This portfolio is crafted for a cinematic, full-screen experience.
                            Open it on a <span className="text-white/70 font-semibold">laptop or desktop</span> to enjoy the full visual story.
                        </p>

                        {/* CTA row */}
                        <div className="flex flex-col gap-3 max-w-xs mx-auto">
                            <button
                                onClick={dismiss}
                                className="w-full py-3.5 rounded-2xl text-[12px] font-black tracking-[0.2em] uppercase text-black cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #e8f0ff 0%, #c8d8ff 100%)",
                                }}
                            >
                                Continue Anyway
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

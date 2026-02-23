"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoTitle: string;
    videoLink?: string;
    videoPath?: string;
    isReel?: boolean;
}

/**
 * A modal that plays either a local video or an embedded YouTube video.
 * Prioritizes the local video path if available.
 */
export const VideoModal: React.FC<VideoModalProps> = ({
    isOpen,
    onClose,
    videoTitle,
    videoLink,
    videoPath,
    isReel
}) => {
    const [ytId, setYtId] = useState<string | null>(null);

    useEffect(() => {
        if (videoLink) {
            const match = videoLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            setYtId(match ? match[1] : null);
        } else {
            setYtId(null);
        }
    }, [videoLink]);

    // Construct the absolute path for local videos
    const absoluteVideoPath = videoPath
        ? (videoPath.startsWith('/') ? videoPath : `/videos/${videoPath}`)
        : null;

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-12 isolate"
            style={{ transform: "translateZ(9999px)" }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative w-full ${isReel ? 'max-w-md' : 'max-w-6xl'} flex flex-col gap-4`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top Header Bar — Now outside the video area */}
                <div className="flex justify-end items-center px-4 md:px-0">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/10 group shadow-2xl shrink-0"
                    >
                        <X className="w-6 h-6 md:w-7 md:h-7" />
                    </motion.button>
                </div>

                {/* Video Container — Clean and isolated */}
                <div className={`relative w-full ${isReel ? 'aspect-[9/16]' : 'aspect-video'} rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-[#050505] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10`}>
                    <div className="w-full h-full">
                        {absoluteVideoPath ? (
                            <video
                                src={absoluteVideoPath}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        ) : ytId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white/5 gap-4">
                                <p className="text-4xl font-black uppercase tracking-[0.5em] italic">Source Missing</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

import data from "./videos.json";

/** A short-form reel (9:16 aspect, typically ≤ 60 s). */
export interface Reel {
    /** Unique numeric identifier. */
    id: number;
    /** Display title shown on the card. */
    title: string;
    /**
     * Full YouTube URL.
     * Used if `path` is not provided.
     */
    link?: string;
    /**
     * Path to a local video file in /public/videos.
     * If provided, this source takes priority.
     */
    path?: string;
    /** Thumbnail URL — Unsplash / CDN or local /public path. */
    thumbnail: string;
}

/** A long-form video (16:9 aspect, typically > 60 s). */
export interface Video {
    /** Unique numeric identifier. */
    id: number;
    /** Display title shown on the card. */
    title: string;
    /** Editorial category label (e.g. "Commercial", "Nature"). */
    category: string;
    /**
     * Full YouTube URL.
     * Used if `path` is not provided.
     */
    link?: string;
    /**
     * Path to a local video file in /public/videos.
     * If provided, this source takes priority.
     */
    path?: string;
    /** Thumbnail URL — Unsplash / CDN or local /public path. */
    thumbnail: string;
}

export interface VideoData {
    reels: Reel[];
    videos: Video[];
}

/** All portfolio video content sourced from videos.json. */
const videoData = data as VideoData;

export const reels: Reel[] = videoData.reels;
export const videos: Video[] = videoData.videos;

export default videoData;

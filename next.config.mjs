/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Optional: Add a trailing slash for better GitHub Pages compatibility
    trailingSlash: true,
};

export default nextConfig;

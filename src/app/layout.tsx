import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { MobileBanner } from "@/components/MobileBanner";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    variable: "--font-outfit"
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
});

export const metadata: Metadata = {
    title: "Hari  | Video Editor Portfolio",
    description: "Professional video editing portfolio of Hari. Crafting visual narratives and cinematic experiences.",
    icons: {
        icon: "/GOT.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
            <body className="antialiased font-outfit">
                {children}
                <MobileBanner />
            </body>
        </html>
    );
}

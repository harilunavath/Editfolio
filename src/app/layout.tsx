import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hari Edits | Video Editor Portfolio",
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
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

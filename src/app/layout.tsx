import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import CommandPalette from "@/components/ui/CommandPalette";
import MagneticCursor from "@/components/ui/MagneticCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ABDULLAH | Mobile App & Full Stack Web Developer",
  description: "I build powerful web & mobile experiences that make a difference. Specialized in Next.js, Flutter, and Full Stack development.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "ABDULLAH",
  "jobTitle": "Mobile App & Full Stack Web Developer",
  "url": "https://abdullah.dev",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gazipur",
    "addressRegion": "Dhaka",
    "postalCode": "1730",
    "addressCountry": "Bangladesh"
  },
  "sameAs": [
    "https://github.com",
    "https://linkedin.com",
    "https://facebook.com"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans scroll-smooth grid-bg`}>
        <ScrollProgress />
        <MagneticCursor />
        <CommandPalette />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CommandPalette from "@/components/ui/CommandPalette";
import MagneticCursor from "@/components/ui/MagneticCursor";
import FixedSidebar from "@/components/ui/FixedSidebar";
import MobileFloatingNav from "@/components/ui/MobileFloatingNav";
import MobileHeader from "@/components/ui/MobileHeader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import IntroScreen from "@/components/ui/IntroScreen";
import BackToTop from "@/components/ui/BackToTop";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Abdullah | Frontend Developer | React & Next.js",
  description: "Passionate frontend developer specializing in React, Next.js, and high-performance web experiences.",
  keywords: ["frontend developer", "react developer", "nextjs", "bangladesh", "freelance"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abdullah",
  "jobTitle": "Frontend Developer",
  "url": "https://abdullah.dev",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gazipur",
    "addressRegion": "Dhaka",
    "postalCode": "1730",
    "addressCountry": "Bangladesh"
  },
  "sameAs": [
    "https://github.com/abdullah472-wq",
    "https://linkedin.com/in/abdullah",
    "https://www.facebook.com/share/18BSa9YpyK/",
    "https://t.me/abdullahbd427"
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
      <body suppressHydrationWarning className={`${orbitron.variable} ${exo2.variable} ${jetbrainsMono.variable} font-body scroll-smooth grid-bg`}>
        <IntroScreen />
        <SmoothScroll />
        <ScrollProgress />
        <MagneticCursor />
        <CommandPalette />
        
        {/* Split Layout */}
        <div className="flex min-h-screen">
          {/* Fixed Sidebar - Desktop Only */}
          <FixedSidebar />
          
          {/* Main Scrollable Content */}
          <main className="flex-1 min-h-screen lg:ml-[35%] lg:pt-0 pt-[140px]">
            {children}
          </main>
        </div>
        
        {/* Mobile Floating Nav */}
        <MobileFloatingNav />
        
        {/* Mobile Header */}
        <MobileHeader />
        
        {/* Back to Top Button */}
        <BackToTop />
      </body>
    </html>
  );
}

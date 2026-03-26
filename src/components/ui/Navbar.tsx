"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Menu, X, Search } from "lucide-react";
import { NAV_ITEMS, PERSONAL_INFO } from "@/lib/data";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState("Home");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isMounted && (isScrolled || isMenuOpen) ? "bg-dark-bg/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <MagneticButton distance={0.2}>
          <Link href="/" className="flex items-center gap-2 md:gap-4 group">
            <img 
              src="/COD_BOT.png" 
              alt="Logo" 
              className="w-10 h-10 md:w-16 md:h-16 object-contain"
            />
            <img 
              src="/animation/COD_BOT.gif" 
              alt="COD_BOT" 
              className="h-8 md:h-12 object-contain mix-blend-multiply hidden sm:block"
            />
          </Link>
        </MagneticButton>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <MagneticButton key={item.href} distance={0.3}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2 px-4",
                  activeSegment === item.name ? "text-primary" : "text-content-secondary"
                )}
                onClick={() => setActiveSegment(item.name)}
              >
                {item.name}
                {activeSegment === item.name && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </Link>
            </MagneticButton>
          ))}
          
          <button 
            className="p-2 text-content-secondary hover:text-primary transition-colors glass rounded-lg"
            onClick={() => {/* Trigger Command Palette */}}
            title="Search (Ctrl+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          <MagneticButton distance={0.4}>
            <Link href="#contact" className="btn-gradient !px-6 !py-2 !text-sm">
              Hire Me
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
           <button 
            className="p-2 text-content-secondary hover:text-primary transition-colors glass rounded-lg"
            onClick={() => {/* Trigger Command Palette */}}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="text-content-primary p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-dark-bg/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 py-8 px-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-content-secondary hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="#contact" className="btn-gradient text-center mt-4" onClick={() => setIsMenuOpen(false)}>
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

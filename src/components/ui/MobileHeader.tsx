"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Facebook, MessageCircle, Send, Download, Zap, ChevronRight, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";
import ProjectModal from "@/components/ui/ProjectModal";
import { downloadCv } from "@/lib/downloadCv";

export default function MobileHeader() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          window.scrollBy(0, 5);
        }
      }, 16);

      const handleInteraction = () => {
        isPausedRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
          isPausedRef.current = false;
        }, 3000);
      };

      window.addEventListener("wheel", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      window.addEventListener("mousedown", handleInteraction, { passive: true });

      return () => {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        window.removeEventListener("wheel", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("mousedown", handleInteraction);
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      };
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }
  }, [isScrolling]);

  const toggleAutoScroll = () => {
    setIsScrolling(!isScrolling);
  };

  return (
    <>
      {/* Mobile Header Banner - Shows/Hides on scroll */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showMenu ? 0 : -120 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-40"
      >
        {/* Glassmorphism Header */}
        <div className="relative bg-gradient-to-br from-dark-bg/95 via-dark-bg/90 to-surface/30 backdrop-blur-xl border-b border-white/5">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          
          {/* Content */}
          <div className="relative px-4 py-3">
            {/* Top Row: Logo + Auto Scroll */}
            <div className="flex items-center justify-between">
              {/* Logo + Name */}
              <div className="flex items-center gap-3">
                <img
                  src="/COD_BOT.webp"
                  alt="COD BOT"
                  className="w-10 h-10 rounded-xl"
                />
                <img
                  src="/COD_BOT.webp"
                  alt="COD BOT"
                  className="h-6 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Auto Scroll Toggle */}
              <motion.button
                onClick={toggleAutoScroll}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  isScrolling
                    ? "bg-primary/20 border-primary/50 text-primary"
                    : "bg-white/5 border-white/10 text-content-secondary"
                }`}
              >
                <motion.div
                  animate={isScrolling ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: isScrolling ? Infinity : 0, ease: "linear" }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expandable Menu - Below Header */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showMenu ? "auto" : 0,
          opacity: showMenu ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed top-[56px] left-0 right-0 z-30 overflow-hidden"
      >
        <div className="bg-gradient-to-br from-dark-bg/98 via-dark-bg/95 to-surface/40 backdrop-blur-2xl border-b border-white/5">
          <div className="px-4 py-4 space-y-4">
            {/* Name & Tagline */}
            <div className="space-y-1">
              <h1 
                className="text-2xl font-black text-white"
                style={{ fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui" }}
              >
                <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <p className="text-xs text-content-secondary/80">
                Building the future of web interfaces
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <Button size="sm" glow className="flex-1" onClick={() => setIsProjectModalOpen(true)}>
                <span className="text-xs">Get a Design</span>
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={downloadCv}>
                <Download className="w-3 h-3 mr-1" />
                <span className="text-xs">CV</span>
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: "https://github.com/abdullah472-wq", name: "Github" },
                { icon: Facebook, href: "https://www.facebook.com/share/18BSa9YpyK/", name: "Facebook" },
                { icon: MessageCircle, href: "https://wa.me/qr/UISCUDK47N3QL1", name: "WhatsApp" },
                { icon: Send, href: "https://t.me/abdullahbd427", name: "Telegram" },
                { icon: Phone, href: "tel:01581818368", name: "Call" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center border border-white/10 hover:border-primary/50 transition-all"
                >
                  <social.icon className="w-4 h-4 text-content-secondary hover:text-primary" />
                </motion.a>
              ))}
            </div>

            {/* Status + Copyright */}
            <div className="flex items-center justify-between text-xs text-content-secondary/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span>Available for projects</span>
              </div>
              <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
    </>
  );
}

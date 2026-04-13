"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Github, Facebook, MessageCircle, Send, Phone, Download, Zap, ChevronRight } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";
import ProjectModal from "@/components/ui/ProjectModal";
import { downloadCv } from "@/lib/downloadCv";
import { scrollToSectionById } from "@/lib/scrollToSection";

const NAV_ITEMS = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function FixedSidebar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          window.scrollBy(0, 1.5);
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

  const scrollToSection = (href: string) => {
    scrollToSectionById(href.replace("#", ""));
  };

  const toggleAutoScroll = () => {
    setIsScrolling(!isScrolling);
  };

  return (
    <div 
      className="hidden lg:flex fixed left-0 top-0 w-[35%] h-screen z-40"
      style={{ fontFamily: "var(--font-exo2), ui-sans-serif, system-ui" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Panel Background */}
      <div className="relative w-full h-full bg-gradient-to-br from-dark-bg via-dark-bg to-surface/20 backdrop-blur-xl">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-gradient-shift" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Holographic shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient glow orbs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Vertical neon border line */}
        <div className="absolute right-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]" />

        {/* Content Container */}
        <div className="relative w-full h-full flex flex-col justify-between p-10 overflow-hidden">
          {/* Top Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: isHovering ? 1.05 : 1 
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src="/COD_BOT.webp"
                  alt="COD BOT"
                  className="w-12 h-12 rounded-xl"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </motion.div>
              <span className="font-heading text-lg font-bold tracking-wide">
                <img
                  src="/animation/codbot.gif"
                  alt="COD BOT"
                  className="h-12 w-auto"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </span>
            </div>

            {/* Auto Scroll Toggle */}
            <motion.button
              onClick={toggleAutoScroll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative group px-4 py-2 rounded-xl border transition-all duration-300 ${
                isScrolling
                  ? "bg-primary/20 border-primary/50 text-primary"
                  : "bg-white/5 border-white/10 text-content-secondary hover:border-primary/30 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={isScrolling ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
                <span 
                  className="text-xs font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui" }}
                >
                  {isScrolling ? "STOP" : "AUTO"}
                </span>
              </div>
              <div className={`absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10 transition-opacity duration-300 ${isScrolling ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
            </motion.button>
          </motion.div>

          {/* Center Section - Identity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 pt-8"
          >
            {/* Name */}
            <div className="space-y-2">
              <h2 
                className="text-base md:text-lg text-content-secondary/70 tracking-wide"
                style={{ fontFamily: "var(--font-exo2), ui-sans-serif, system-ui" }}
              >
                Hi, I am
              </h2>
              <motion.h1 
                className="text-6xl font-black text-white tracking-tight leading-none"
                style={{ fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui", fontWeight: 900 }}
                animate={{ 
                  textShadow: isHovering 
                    ? "0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(139,92,246,0.3)" 
                    : "0 0 20px rgba(99,102,241,0.3)" 
                }}
              >
                <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
                  {PERSONAL_INFO.name}
                </span>
              </motion.h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="text-xs font-body text-content-secondary">Available for projects</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm font-body text-content-secondary/80 leading-relaxed max-w-[280px]">
              Building the future of web interfaces — one pixel at a time
            </p>

            {/* Role */}
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              <span 
                className="text-xs uppercase tracking-[0.25em] text-primary/90"
                style={{ fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui" }}
              >
                Frontend Developer
              </span>
            </div>


          </motion.div>

          {/* Bottom Section - CTAs & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 pt-12"
          >
            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button size="sm" glow className="flex-1 group" onClick={() => setIsProjectModalOpen(true)}>
                <span>Get a Design</span>
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={downloadCv}>
                <Download className="w-4 h-4 mr-1" />
                <span>Download CV</span>
              </Button>
            </div>

            {/* Project Modal */}
            <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {[{ icon: Github, href: "https://github.com/abdullah472-wq", name: "Github" },
                { icon: Facebook, href: "https://www.facebook.com/share/18BSa9YpyK/", name: "Facebook" },
                { icon: MessageCircle, href: "https://wa.me/qr/UISCUDK47N3QL1", name: "WhatsApp" },
                { icon: Send, href: "https://t.me/abdullahbd427", name: "Telegram" },
                { icon: Phone, href: "tel:01581818368", name: "Call" },
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name === "Call" ? undefined : "_blank"}
                  rel={social.name === "Call" ? undefined : "noopener noreferrer"}
                  title={social.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary/20 flex items-center justify-center border border-white/10 hover:border-primary/50 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-content-secondary group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs font-body text-content-secondary/50">
              <div className="w-1 h-1 rounded-full bg-content-secondary/50" />
              <span>Gazipur, Dhaka, Bangladesh</span>
            </div>

            {/* Copyright */}
            <div className="text-[10px] font-body text-content-secondary/30 text-center pt-4 border-t border-white/5">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </div>
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute top-10 right-10 w-10 h-10 border border-secondary/20 rotate-45 animate-float" />
      </div>
    </div>
  );
}

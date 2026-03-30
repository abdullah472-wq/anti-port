"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "home", name: "Home", label: "Home" },
  { id: "about", name: "About", label: "About" },
  { id: "skills", name: "Skills", label: "Skills" },
  { id: "projects", name: "Projects", label: "Projects" },
  { id: "contact", name: "Contact", label: "Contact" },
];

export default function MobileFloatingNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const { offsetTop } = section;
          if (scrollPosition >= offsetTop) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex items-center lg:right-6"
      >
        <div className="relative flex items-center">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0, x: 20 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="relative ml-4">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/5 blur-xl rounded-2xl" />
                  <div className="relative glass rounded-2xl py-4 px-3 border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)] backdrop-blur-2xl">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                    <div className="space-y-1 relative">
                      {NAV_ITEMS.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all duration-300 group relative"
                          >
                            <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-primary/30 to-secondary/20 opacity-100"
                                : "opacity-0 group-hover:bg-white/5"
                            }`} />
                            <div className={`relative z-10 flex items-center gap-3 w-full`}>
                              <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                isActive ? "text-primary" : "text-content-secondary/60 group-hover:text-content-secondary"
                              }`}>
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                                isActive ? "text-white font-semibold" : "text-content-secondary group-hover:text-white"
                              }`}>
                                {item.label}
                              </span>
                              {isActive && (
                                <motion.div
                                  layoutId="activeGlow"
                                  className="ml-auto w-1.5 h-5 rounded-full bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                                />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-3 bg-gradient-to-b from-primary/20 via-secondary/10 to-accent/20 blur-lg rounded-full opacity-50" />
            
            <div className="relative glass rounded-full p-3 border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <div className="relative z-10 flex flex-col items-center gap-4">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative group"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="dotGlow"
                          className="absolute inset-0 rounded-full"
                        >
                          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                          <div className="absolute -inset-2 rounded-full border border-primary/50 animate-pulse" />
                        </motion.div>
                      )}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.5 : 1,
                          backgroundColor: isActive ? "rgba(99, 102, 241, 1)" : "rgba(255, 255, 255, 0.3)",
                          boxShadow: isActive
                            ? "0 0 15px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4)"
                            : "0 0 0px rgba(255, 255, 255, 0)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-2.5 h-2.5 rounded-full relative z-10"
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-full bg-white/50 blur-sm animate-pulse" />
                        )}
                      </motion.div>
                      <span className="absolute right-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-dark-bg/95 backdrop-blur-sm rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <svg className="absolute -left-1 top-3 bottom-3 w-1" viewBox="0 0 4 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <rect x="1" y="0" width="2" height="200" fill="rgba(255,255,255,0.1)" rx="1" />
                <motion.rect
                  x="1"
                  y="0"
                  width="2"
                  fill="url(#progressGradient)"
                  rx="1"
                  initial={{ height: 0 }}
                  animate={{ height: `${scrollProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </svg>
            </div>

            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                <div className="relative w-4 h-4">
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0, x: isExpanded ? 2 : -2 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full -translate-y-1/2"
                  />
                  <motion.div
                    animate={{ rotate: isExpanded ? -45 : 0, x: isExpanded ? -2 : 2 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 left-1/2 h-full w-0.5 bg-white rounded-full -translate-x-1/2"
                  />
                </div>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

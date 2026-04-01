"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const INTRO_STORAGE_KEY = "portfolioIntroPlayed_v2";

interface IntroScreenProps {
  onComplete?: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [showIntro, setShowIntro] = useState(false);
  const [phase, setPhase] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Check localStorage and initialize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const played = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";
    if (played) {
      onComplete?.();
      return;
    }

    setShowIntro(true);

    // Faster phase transitions for better UX
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 100));   // Show title
    timers.push(window.setTimeout(() => setPhase(2), 400));   // Show subtitle + scan line
    timers.push(window.setTimeout(() => setPhase(3), 800));   // Prepare split
    
    if (!isMobile) {
      // Desktop: split screen transition
      timers.push(window.setTimeout(() => setPhase(4), 1200)); // Execute split
      timers.push(
        window.setTimeout(() => {
          window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
          setShowIntro(false);
          onComplete?.();
        }, 2200)
      );
    } else {
      // Mobile: auto-dismiss after 2.5 seconds
      timers.push(
        window.setTimeout(() => {
          window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
          setShowIntro(false);
          onComplete?.();
        }, 2500)
      );
    }

    return () => timers.forEach(window.clearTimeout);
  }, [isMobile, onComplete]);

  const skipIntro = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    }
    setShowIntro(false);
    onComplete?.();
  }, [onComplete]);

  // Derived state
  const showTitle = phase >= 1;
  const showSubtitle = phase >= 2;
  const showScanLine = phase >= 2;
  const showSplit = phase >= 4 && !isMobile;

  if (!showIntro) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onClick={skipIntro}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050507] text-white cursor-pointer"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Radial gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.1),transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_70%)]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={showScanLine ? { y: "100vh", opacity: [0, 0.6, 0] } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.8)]"
          />
          {/* Secondary scan glow */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={showScanLine ? { y: "100vh", opacity: [0, 0.3, 0] } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.05 }}
            className="absolute inset-x-0 h-[40px] bg-gradient-to-b from-cyan-400/20 via-cyan-400/5 to-transparent blur-xl"
          />
        </div>

        {/* Desktop Split-Screen Layout */}
        {!isMobile && (
          <div className="hidden md:flex w-full h-full max-w-7xl mx-auto">
            {/* Left Panel - Becomes Fixed Sidebar */}
            <motion.div
              initial={{ width: "100%", x: 0 }}
              animate={showSplit ? { width: "30%", x: 0 } : { width: "100%", x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col justify-center items-center relative z-10"
            >
              <div className="w-full max-w-md px-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center justify-between mb-10"
                >
                  <span className="text-[11px] uppercase tracking-[0.4em] text-cyan-300/60">
                    INITIALIZING
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      skipIntro();
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-content-secondary/80 transition hover:border-cyan-300/40 hover:text-white hover:bg-white/10"
                  >
                    Skip
                  </button>
                </motion.div>

                {/* Hologram Name Reveal */}
                <div className="relative">
                  <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={showTitle ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[56px] lg:text-[72px] font-black uppercase tracking-[-0.04em] leading-[0.9]"
                  >
                    <span className="relative inline-flex">
                      {/* Hologram glow behind */}
                      <span className="absolute inset-0 text-cyan-400/30 blur-[3px] animate-pulse">
                        Abdullah
                      </span>
                      <span className="relative bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Abdullah
                      </span>
                    </span>
                  </motion.h1>

                  {/* Scanned line effect on text */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={showScanLine ? { scaleX: 1, opacity: [0, 1, 0] } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-x-0 top-1/2 h-[3px] bg-cyan-400/70 shadow-[0_0_30px_rgba(56,189,248,0.8)]"
                    style={{ transformOrigin: "left" }}
                  />
                </div>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="mt-6"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-cyan-400/60 to-transparent mb-4" />
                  <p className="text-sm tracking-[0.15em] uppercase text-content-secondary/80">
                    Frontend Developer
                  </p>
                </motion.div>

                {/* Status indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={showSplit ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className="mt-12 flex items-center gap-3 text-[11px] text-content-secondary/60"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="uppercase tracking-[0.2em]">System Online</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Panel - Main Content Preview */}
            <motion.div
              initial={{ width: 0, opacity: 0, x: 50 }}
              animate={showSplit ? { width: "70%", opacity: 1, x: 0 } : { width: 0, opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="hidden md:flex flex-col justify-center border-l border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="px-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={showSplit ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-300/70 mb-2">Portfolio</h3>
                  <p className="text-2xl font-light text-white/90">Welcome to my digital space</p>
                </motion.div>

                {/* Preview items */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={showSplit ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {['Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-content-secondary/80"
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Mobile Layout - Simplified */}
        {isMobile && (
          <div className="flex md:hidden flex-col items-center justify-center w-full px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm text-center relative"
            >
              {/* Skip button - subtle */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                  skipIntro();
                }}
                className="absolute -top-20 right-0 text-[10px] uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80"
              >
                Skip
              </motion.button>

              {/* Hologram Name */}
              <div className="relative mb-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={showTitle ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[42px] sm:text-[48px] font-black uppercase tracking-[-0.03em] leading-[0.95]"
                >
                  <span className="relative inline-flex">
                    <span className="absolute inset-0 text-cyan-400/25 blur-[2px]">
                      Abdullah
                    </span>
                    <span className="relative bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                      Abdullah
                    </span>
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mb-4" />
                <p className="text-sm tracking-[0.1em] uppercase text-content-secondary/80">
                  Frontend Developer
                </p>
              </motion.div>

              {/* Loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 flex items-center justify-center gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400/70"
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;

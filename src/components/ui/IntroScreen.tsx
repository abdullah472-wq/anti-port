"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const INTRO_STORAGE_KEY = "portfolioIntroPlayed";

const IntroScreen = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const played = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";
    if (played) {
      return;
    }

    setShowIntro(true);

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 180));
    timers.push(window.setTimeout(() => setPhase(2), 920));
    timers.push(window.setTimeout(() => setPhase(3), 1520));
    timers.push(window.setTimeout(() => setPhase(4), 1980));
    timers.push(
      window.setTimeout(() => {
        window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
        setShowIntro(false);
      }, 2800)
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  const skipIntro = () => {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    setShowIntro(false);
  };

  const showTitle = phase >= 1;
  const showSubtitle = phase >= 2;
  const showSplit = phase >= 3;

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_2px,transparent_3px)] opacity-30 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ y: "-120%" }}
            animate={showTitle ? { y: "110%" } : { y: "-120%" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-[1px] w-full bg-cyan-400/40 blur-sm"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col md:flex-row overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={showSplit ? { width: ["100%", "40%"] } : { width: "100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="flex min-h-screen flex-col justify-center px-6 py-10 md:px-14 md:py-16"
          >
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex items-center justify-between gap-4 mb-8">
                <span className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">
                  INTRO
                </span>
                <button
                  type="button"
                  onClick={skipIntro}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-content-secondary transition hover:border-cyan-300/30 hover:text-white"
                >
                  Skip
                </button>
              </div>

              <div className="relative overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={showTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-[42px] sm:text-[54px] md:text-[72px] lg:text-[84px] font-black uppercase tracking-[-0.05em] leading-[0.88] text-white"
                >
                  <span className="relative inline-flex">
                    <span className="absolute inset-0 text-cyan-300/20 blur-[1.5px]">
                      Abdullah
                    </span>
                    <span className="relative bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                      Abdullah
                    </span>
                  </span>
                </motion.h1>

                <motion.div
                  animate={showTitle ? { opacity: [0, 0.18, 0.08], scale: [1, 1.015, 1] } : {}}
                  transition={{ duration: 0.7, repeat: showSplit ? 0 : 1, repeatType: "mirror", ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-0"
                >
                  <div className="absolute -top-3 left-0 h-1/2 w-2/3 bg-cyan-300/20 blur-sm" />
                  <div className="absolute top-1/2 left-1/4 h-[1px] w-2/3 bg-purple-400/10 blur-sm" />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
                className="mt-5 max-w-2xl text-sm sm:text-base leading-7 text-content-secondary"
              >
                Frontend Developer
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={showSplit ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_rgba(7,12,50,0.16)] backdrop-blur-xl"
              >
                <div className="flex flex-col gap-3 text-content-secondary text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400/80" />
                    <span>Split-screen transition ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-violet-400/80" />
                    <span>Fixed sidebar + content reveal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-white/50" />
                    <span>Quick cinematic launch</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={showSplit ? { width: ["0%", "60%"], opacity: [0, 1] } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="hidden h-full min-h-screen shrink-0 overflow-hidden border-l border-white/10 bg-white/5 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_20%)] backdrop-blur-xl md:flex md:flex-col md:justify-center md:p-10"
          >
            <div className="relative z-10 space-y-6">
              <div className="text-xs uppercase tracking-[0.35em] text-content-secondary/70">
                LAUNCHING
              </div>
              <div className="space-y-4">
                <p className="text-2xl font-bold text-white">
                  Fixed sidebar is locking into place.
                </p>
                <p className="max-w-md text-sm leading-7 text-content-secondary">
                  Smoothly transforming into a split-layout interface with futuristic glass panels and glowing navigation.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.25em] text-content-secondary/70">
                {['NAV', 'PROJECTS', 'SKILLS', 'CONTACT'].map((label) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/10 px-3 py-2">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;

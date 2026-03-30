"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function AutoScrollToggle() {
  const [isAutoScrollOn, setIsAutoScrollOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isPausedRef = useRef(false); // Ref for animation loop
  const isRunningRef = useRef(false); // Track if scroll is running
  
  const scrollSpeed = 1.8; // pixels per frame at 60fps

  // Sync state to ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Check if we've reached the bottom
  const isAtBottom = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    return scrollTop + clientHeight >= scrollHeight - 5;
  };

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!isRunningRef.current) return;

    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Scroll if not paused and not at bottom
    if (!isPausedRef.current && !isAtBottom()) {
      const normalizedSpeed = scrollSpeed * (deltaTime / 16.67);
      window.scrollBy(0, normalizedSpeed);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []); // No dependencies - uses refs

  // Start scrolling
  const startScroll = useCallback(() => {
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    isPausedRef.current = false;
    lastTimeRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // Stop scrolling
  const stopScroll = useCallback(() => {
    isRunningRef.current = false;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    
    lastTimeRef.current = 0;
  }, []);

  // Toggle handler
  const handleToggle = () => {
    if (isAutoScrollOn) {
      stopScroll();
      setIsAutoScrollOn(false);
      setIsPaused(false);
    } else {
      setIsAutoScrollOn(true);
      setIsPaused(false);
      // Small delay to ensure state is set
      setTimeout(() => {
        startScroll();
      }, 50);
    }
  };

  // Pause temporarily on user interaction
  const pauseTemporarily = useCallback(() => {
    if (!isRunningRef.current) return;
    
    isPausedRef.current = true;
    setIsPaused(true);
    
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
      setIsPaused(false);
    }, 2500);
  }, []);

  // Interaction listeners
  useEffect(() => {
    if (!isAutoScrollOn) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 1) {
        pauseTemporarily();
      }
    };

    const handleInteraction = () => pauseTemporarily();

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("mousedown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
    };
  }, [isAutoScrollOn, pauseTemporarily]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScroll();
    };
  }, [stopScroll]);

  const isActive = isAutoScrollOn && !isPaused;

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full glass border transition-all duration-500 ${
        isAutoScrollOn
          ? isPaused
            ? "border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
            : "border-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Pulse animation when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        className="relative z-10"
        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 3,
          repeat: isActive ? Infinity : 0,
          ease: "linear",
        }}
      >
        {isAutoScrollOn ? (
          <Pause
            className={`w-4 h-4 transition-colors duration-300 ${
              isPaused ? "text-yellow-500" : "text-primary"
            }`}
          />
        ) : (
          <Play className="w-4 h-4 text-content-secondary" />
        )}
      </motion.div>

      {/* Text */}
      <span
        className={`relative z-10 text-xs font-body font-medium transition-colors duration-300 ${
          isAutoScrollOn
            ? isPaused
              ? "text-yellow-500"
              : "text-primary"
            : "text-content-secondary"
        }`}
      >
        {isAutoScrollOn ? (isPaused ? "Paused" : "Scrolling") : "Auto Scroll"}
      </span>

      {/* Resume progress bar */}
      {isAutoScrollOn && isPaused && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-yellow-500/50 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 2.5, ease: "linear" }}
        />
      )}
    </motion.button>
  );
}
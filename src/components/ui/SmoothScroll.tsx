"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

const INTRO_STORAGE_KEY = "portfolioIntroPlayed_v2";

export default function SmoothScroll() {
  const [shouldEnable, setShouldEnable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const introPlayed = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";
    if (introPlayed) {
      setShouldEnable(true);
      return;
    }

    const onIntroComplete = () => setShouldEnable(true);
    window.addEventListener("intro:complete", onIntroComplete);

    return () => {
      window.removeEventListener("intro:complete", onIntroComplete);
    };
  }, []);

  useEffect(() => {
    if (!shouldEnable) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [shouldEnable]);

  return null;
}

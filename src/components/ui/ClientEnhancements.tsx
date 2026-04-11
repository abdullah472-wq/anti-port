"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("@/components/ui/SmoothScroll"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"), { ssr: false });
const MagneticCursor = dynamic(() => import("@/components/ui/MagneticCursor"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"), { ssr: false });

export default function ClientEnhancements() {
  const [ready, setReady] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setShowCursor(media.matches);

    const listener = (event: MediaQueryListEvent) => setShowCursor(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (!ready) return null;

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CommandPalette />
      {showCursor && <MagneticCursor />}
      <BackToTop />
    </>
  );
}

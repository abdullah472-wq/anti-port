"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth outer ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Faster inner dot
  const dotSpringConfig = { damping: 20, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-magnetic]")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          marginLeft: "-16px",
          marginTop: "-16px",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible && !isHovered ? 1 : 0,
          marginLeft: "-4px",
          marginTop: "-4px",
        }}
      />
    </>
  );
}

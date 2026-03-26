import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function useCountUp(end: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!trigger) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        // use an easeOutQuad easing for the number counter
        const easeProgress = 1 - Math.pow(1 - progress / duration, 2);
        setCount(Math.min(end, Math.floor(easeProgress * end)));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger, prefersReducedMotion]);

  return count;
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const FadeInStaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
}: FadeInStaggerProps) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInStaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { 
      opacity: prefersReducedMotion ? 1 : 0, 
      y: prefersReducedMotion ? 0 : 50 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any }
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

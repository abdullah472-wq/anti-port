"use client";

import { motion } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { useState, useEffect } from "react";

const TITLES = [
  "Frontend Developer",
  "React & Next.js Expert",
  "UI/UX Enthusiast",
  "Performance Focused",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TITLES[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 lg:pt-0 overflow-hidden">
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
            Crafting <span className="neon-text-primary">Digital</span>
            <br />
            <span className="text-white">Experiences</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-medium text-primary min-h-[32px] font-heading">
            <span className="font-heading">{displayText}</span>
            <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
          </h2>

          <p className="text-lg text-content-secondary max-w-xl leading-relaxed font-body">
            Building pixel-perfect, performant, and accessible web experiences with modern frameworks and clean code.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-8"
        >
          <MagneticButton distance={0.2}>
            <Link href="#projects">
              <Button size="lg" glow className="btn-neon">
                View My Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton distance={0.2}>
            <Link href="#contact">
              <Button variant="outline" size="lg" className="border-primary/50 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                Get in Touch
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-12 pt-12 mt-12 border-t border-white/10"
        >
          {[
            { value: "3+", label: "Years Exp." },
            { value: "50+", label: "Projects" },
            { value: "30+", label: "Clients" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-heading font-bold text-white neon-text-primary">{stat.value}</div>
              <div className="text-xs font-body text-content-secondary uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-content-secondary/60 font-heading">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MousePointer2 className="w-4 h-4 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

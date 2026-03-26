"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Github, Linkedin, Facebook, Phone, ArrowRight, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

// Dynamic imports for 3D components
const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), { ssr: false });
const FloatingIcons = dynamic(() => import("@/components/3d/FloatingIcons"), { ssr: false });
const Avatar3D = dynamic(() => import("@/components/3d/Avatar3D"), { ssr: false });
import HologramPortal from "@/components/3d/HologramPortal";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-fit px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Accessibility First - WCAG Compliant
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I&apos;m <br />
            <span className="text-gradient drop-shadow-sm">{PERSONAL_INFO.name}</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-medium text-primary min-h-[32px]">
            <TypeAnimation
              sequence={[
                "Frontend Developer", 2000,
                "UI/UX Enthusiast", 2000,
                "Performance Optimizer", 2000,
                "React & Next.js Expert", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-content-secondary max-w-lg leading-relaxed min-h-[84px]"
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton distance={0.2}>
              <Link href="#projects">
                <Button size="lg" glow>
                  View My Work
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton distance={0.2}>
              <Link href="#contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </MagneticButton>
          </div>

          <div className="flex items-center gap-6 pt-8">
            {[
              { icon: Github, href: PERSONAL_INFO.github },
              { icon: Linkedin, href: PERSONAL_INFO.linkedin },
              { icon: Facebook, href: PERSONAL_INFO.facebook },
              { icon: Phone, href: PERSONAL_INFO.whatsappLink },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-content-secondary hover:text-primary transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Content - 3D Interactivity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[400px] lg:h-[600px] flex items-center justify-center p-8"
        >
          <HologramPortal />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-widest text-content-secondary font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MousePointer2 className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Rocket, Layers, Award, Sparkles, Code2, Terminal } from "lucide-react";
import { TIMELINE } from "@/lib/data";

const iconMap: Record<string, typeof Rocket> = {
  Rocket,
  Layers,
  Award,
  Sparkles,
  Code2,
  Terminal,
};

const techStack: Record<string, string[]> = {
  "2021": ["HTML", "CSS", "JavaScript"],
  "2022": ["React", "Next.js", "TypeScript"],
  "2023": ["Tailwind", "Framer Motion", "GSAP"],
  "2024": ["Performance", "A11y", "Architecture"],
};

const JourneyStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative overflow-hidden bg-dark-bg/50 py-24 px-6"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">
            Career Progress
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            My Journey
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <p className="text-content-secondary max-w-xl mt-2 text-sm md:text-base">
            Scroll through my evolution as a frontend developer
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative z-10 max-w-3xl mx-auto pb-4 md:pb-12">
          {TIMELINE.map((item, index) => {
            const Icon = iconMap[item.icon] || Rocket;
            const techs = techStack[item.year] || [];
            
            return (
              <JourneyCard
                key={item.id}
                item={item}
                index={index}
                total={TIMELINE.length}
                Icon={Icon}
                techs={techs}
                scrollProgress={smoothProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface JourneyCardProps {
  item: {
    id: string;
    year: string;
    title: string;
    description: string;
    icon: string;
  };
  index: number;
  total: number;
  Icon: typeof Rocket;
  techs: string[];
  scrollProgress: ReturnType<typeof useSpring>;
}

const JourneyCard = ({
  item,
  index,
  total,
  Icon,
  techs,
  scrollProgress,
}: JourneyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate scroll ranges for this card
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;
  const cardMiddle = cardStart + (cardEnd - cardStart) / 2;

  // Transform values based on scroll progress
  const scale = useTransform(
    scrollProgress,
    [cardStart, cardMiddle, cardEnd],
    [1, 1, 0.94]
  );

  const opacity = useTransform(
    scrollProgress,
    [cardStart, cardMiddle, cardEnd],
    [1, 1, 0.55]
  );

  const y = useTransform(
    scrollProgress,
    [cardStart, cardEnd],
    [0, -16]
  );

  const stickyTop = `${96 + index * 16}px`;

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        y,
        ["--journey-card-top" as string]: stickyTop,
      }}
      className={`
        relative mb-6 md:mb-8 lg:sticky lg:top-[var(--journey-card-top)]
      `}
    >
      {/* Card */}
      <div className="group relative">
        {/* Hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glassmorphism card */}
        <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden group-hover:border-white/20 transition-all duration-500">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-500" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors duration-500" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                
                {/* Year badge */}
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-cyan-400">{item.year}</span>
                </div>
              </div>

              {/* Step indicator */}
              <div className="text-xs text-gray-500 font-mono">
                {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Corner decoration */}
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyStack;

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Layers, Sparkles, Award } from "lucide-react";
import { TIMELINE } from "@/lib/data";

const icons: any = { Rocket, Layers, Sparkles, Award };

const HolographicTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <section id="journey" className="py-24 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-4 sm:px-0"
      >
        <span className="text-xs text-primary uppercase tracking-[0.3em] font-medium">
          Professional Evolution
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 leading-tight max-w-2xl mx-auto">
          <span className="block">My Growth as a</span>
          <span className="text-gradient block md:inline">Frontend Dev</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-content-secondary max-w-xl mx-auto">
          A mobile-first timeline that highlights progress, milestones, and the journey of a frontend developer.
        </p>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
      </motion.div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto px-6">
        {/* Glowing Center Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 origin-top"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent blur-sm" />
        </motion.div>

        {/* Timeline Items */}
        {TIMELINE.map((item, index) => {
          const Icon = icons[item.icon];
          const isLeft = index % 2 === 0;

          return (
            <TimelineNode
              key={item.id}
              item={item}
              index={index}
              Icon={Icon}
              isLeft={isLeft}
              isInView={isInView}
            />
          );
        })}
      </div>

      {/* Ambient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
    </section>
  );
};

interface TimelineNodeProps {
  item: any;
  index: number;
  Icon: any;
  isLeft: boolean;
  isInView: boolean;
}

const TimelineNode = ({ item, index, Icon, isLeft, isInView }: TimelineNodeProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <div className={`relative flex items-center mb-24 ${isLeft ? "" : "flex-row-reverse"}`}>
      {/* Empty space for alignment */}
      <div className="w-1/2" />

      {/* Center Node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20">
        {/* Holographic orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-md animate-pulse-glow" />
          
          {/* Inner orb */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Year badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isCardInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider"
          >
            {item.year}
          </motion.div>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isCardInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className={`w-[calc(50%-60px)] ${isLeft ? "pr-12" : "pl-12"}`}
      >
        <div className="group relative">
          {/* Holographic border effect */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/50 via-secondary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Card */}
          <div className="relative glass rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            {/* Holographic shimmer */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
              
              <p className="text-sm text-content-secondary leading-relaxed">
                {item.description}
              </p>

              {/* Tech hint */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary/40"
                    />
                  ))}
                </div>
                <span className="text-[10px] text-content-secondary/60 uppercase tracking-wider">
                  Frontend Journey
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HolographicTimeline;

"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Rocket, Layers, Sparkles, Award } from "lucide-react";
import { TIMELINE } from "@/lib/data";

const icons: Record<string, typeof Rocket> = { Rocket, Layers, Sparkles, Award };

// Animation variants for performance
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 }
  }
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

const HolographicTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <section id="journey" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects - lighter on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/95 to-dark-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)] md:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      
      {/* Grid overlay - reduced opacity on mobile */}
      <div 
        className="absolute inset-0 opacity-[0.02] md:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-20 px-4 relative z-10"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4 md:mb-6"
        />
        <span className="text-[10px] md:text-xs text-primary uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium">
          Professional Evolution
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-3 md:mt-4 leading-tight max-w-2xl mx-auto px-2">
          <span className="block">My Growth as a</span>
          <span className="text-gradient block md:inline">Frontend Dev</span>
        </h2>
        <p className="mt-2 md:mt-3 text-xs md:text-base text-content-secondary max-w-xl mx-auto px-4 md:px-0">
          A timeline highlighting progress, milestones, and the journey.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Vertical Line - Left aligned on mobile, center on desktop */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={lineVariants}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 origin-top"
        >
          {/* Core line */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent" />
          {/* Glow - reduced on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent blur-sm opacity-60 md:opacity-80" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent blur-md opacity-30 md:opacity-50" />
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-0">
          {TIMELINE.map((item, index) => {
            const Icon = icons[item.icon];
            const isLeft = index % 2 === 0;
            
            return (
              <TimelineItem
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
      </div>

      {/* Ambient glow effects at edges */}
      <div className="absolute top-1/4 left-0 w-32 md:w-64 h-32 md:h-64 bg-primary/5 md:bg-primary/10 rounded-full blur-[60px] md:blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-32 md:w-64 h-32 md:h-64 bg-secondary/5 md:bg-secondary/10 rounded-full blur-[60px] md:blur-[100px]" />
    </section>
  );
};

interface TimelineItemProps {
  item: {
    id: string;
    year: string;
    title: string;
    description: string;
    icon: string;
  };
  index: number;
  Icon: typeof Rocket;
  isLeft: boolean;
  isInView: boolean;
}

const TimelineItem = ({ item, index, Icon, isLeft, isInView }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isItemInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <div 
      ref={itemRef}
      className="relative flex items-start md:items-center"
    >
      {/* Desktop Empty Spacer for alternating layout */}
      <div className="hidden md:block md:w-1/2" />

      {/* Timeline Node - Icon Circle */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={nodeVariants}
        transition={{ delay: index * 0.15 }}
        className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10"
      >
        {/* Glow rings - smaller on mobile */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-lg md:blur-xl animate-pulse" />
        <div className="absolute -inset-1 md:-inset-2 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-md md:blur-2xl" style={{ animationDelay: '0.3s' }} />
        
        {/* Main node */}
        <div className="relative w-10 h-10 md:w-14 md:h-14">
          {/* Outer ring with rotating animation - only on desktop */}
          <div className="hidden md:block absolute -inset-3 rounded-full border border-primary/20 border-dashed animate-spin" style={{ animationDuration: '12s' }} />
          
          {/* Glow layer */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-sm" />
          
          {/* Inner container */}
          <div className="relative w-full h-full rounded-full bg-dark-bg flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(99,102,241,0.2)] md:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          
          {/* Highlight */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/3 h-1/4 rounded-full bg-white/40 blur-sm" />
        </div>

        {/* Year badge - positioned differently on mobile vs desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isItemInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <div className="px-2 md:px-3 py-0.5 md:py-1 bg-dark-bg/90 backdrop-blur-sm border border-primary/40 rounded-full">
            <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-wider">
              {item.year}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        animate={isItemInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={`
          w-full pl-14 md:pl-0 md:w-1/2
          ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}
          ${!isLeft ? "md:col-start-2" : ""}
        `}
      >
        <div className="group relative">
          {/* Holographic border effect on hover */}
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Card content */}
          <div className="relative glass rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] md:hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]">
            
            {/* Header */}
            <div className={`flex items-center gap-3 mb-2 md:mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-all duration-300">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <div className={`${isLeft ? 'md:text-right' : ''}`}>
                <h4 className="text-sm md:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-[10px] md:text-xs text-primary/80 uppercase tracking-wider">
                  {item.year}
                </p>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-xs md:text-sm text-content-secondary leading-relaxed">
              {item.description}
            </p>

            {/* Tech indicator */}
            <div className={`flex items-center gap-2 mt-3 pt-3 border-t border-white/5 ${isLeft ? 'md:justify-end' : ''}`}>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/40 group-hover:bg-primary/60 transition-colors duration-300"
                  />
                ))}
              </div>
              <span className="text-[9px] md:text-[10px] text-content-secondary/60 uppercase tracking-wider">
                Frontend
              </span>
            </div>

            {/* Corner decoration - only on desktop */}
            <div className="hidden md:block absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary/20 rounded-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HolographicTimeline;

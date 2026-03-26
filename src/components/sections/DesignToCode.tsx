"use client";

import { motion } from "framer-motion";
import { FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeInStagger";
import { Figma, Code2, ArrowRight } from "lucide-react";

const DesignToCode = () => {
  return (
    <section id="design" className="py-24 px-6 relative overflow-hidden bg-dark-bg/30">
      <FadeInStaggerContainer className="max-w-7xl mx-auto">
        <FadeInStaggerItem className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Design to Code
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <p className="text-content-secondary max-w-xl mt-4">
            Transforming static Figma concepts into pixel-perfect, interactive, and high-performance React components.
          </p>
        </FadeInStaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
          {/* Figma Side */}
          <FadeInStaggerItem className="glass p-8 rounded-3xl border border-white/10 relative group overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <Figma className="w-6 h-6 text-[#F24E1E]" />
              <h3 className="text-xl font-bold text-white">Figma Prototype</h3>
            </div>
            {/* Mock Wireframe */}
            <div className="w-full aspect-video bg-surface rounded-2xl flex flex-col p-4 gap-4 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">
               <div className="w-1/3 h-6 bg-white/20 rounded-md" />
               <div className="w-full h-32 bg-white/10 rounded-xl" />
               <div className="flex gap-4">
                 <div className="w-1/2 h-10 bg-white/10 rounded-lg" />
                 <div className="w-1/2 h-10 bg-[#F24E1E]/20 rounded-lg" />
               </div>
            </div>
          </FadeInStaggerItem>

          {/* Transformation Arrow (Hidden on mobile or points down) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.5)]">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>

          {/* Code Side */}
          <FadeInStaggerItem className="glass p-8 rounded-3xl border border-primary/30 relative overflow-hidden glow-primary mt-8 md:mt-0">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-white">Live Component</h3>
            </div>
            {/* Live Interactive Mock */}
            <div className="w-full aspect-video bg-dark-bg rounded-2xl p-4 gap-4 flex flex-col border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="w-1/3 h-6 bg-gradient-to-r from-white to-white/50 rounded-md" 
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.2 }}
                 className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/30 flex items-center justify-center"
               >
                 <span className="text-primary font-bold tracking-widest text-sm animate-pulse">INTERACTIVE UI</span>
               </motion.div>
               <div className="flex gap-4 mt-auto z-10">
                 <button className="w-1/2 h-10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white transition-colors">Cancel</button>
                 <button className="w-1/2 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg text-xs font-bold text-white hover:scale-105 transition-transform shadow-lg glow-primary">Submit</button>
               </div>
            </div>
          </FadeInStaggerItem>
        </div>
      </FadeInStaggerContainer>
    </section>
  );
};

export default DesignToCode;

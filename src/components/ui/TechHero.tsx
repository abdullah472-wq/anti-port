"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Terminal, Cpu, Globe } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectModal from "@/components/ui/ProjectModal";

const TechTag = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/50 border border-white/10 text-accent font-mono text-xs tracking-tight">
    <Icon className="w-3 h-3" />
    {children}
  </div>
);

export default function TechHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-12 rounded-[2rem] glass relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700" />
        
        <div className="relative z-10 flex flex-col gap-8">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight font-sans"
            >
              Engineering <br />
              <span className="text-gradient">Scalable Solutions</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-content-secondary font-mono text-sm md:text-base leading-relaxed max-w-xl whitespace-pre"
            >
              {`const developer = {
  name: "ABDULLAH",
  focus: "Frontend Developer",
  mission: "Building impact with clean code"
};`}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TechTag icon={Terminal}>nextjs@14.2.x</TechTag>
            <TechTag icon={Cpu}>turbopack_enabled</TechTag>
            <TechTag icon={Globe}>distributed_systems</TechTag>
          </div>

          <MagneticButton distance={0.3}>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-glow-primary transition-all duration-300"
            >
              Initialize Project
            </button>
          </MagneticButton>
        </div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";

const SkillBubbles = dynamic(() => import("@/components/3d/SkillBubbles"), { ssr: false });

const SkillItem = ({ skill, index, color }: { skill: any, index: number, color: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-bold text-white">{skill.name}</span>
        </div>
        <span className={`text-xs font-bold text-${color}-400`}>{skill.percentage}%</span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={cn(
             "h-full rounded-full bg-gradient-to-r",
             color === "blue" && "from-blue-500 to-cyan-500",
             color === "green" && "from-green-500 to-emerald-500",
             color === "purple" && "from-purple-500 to-pink-500",
             color === "orange" && "from-orange-500 to-red-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          )}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ category, index }: { category: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-8 rounded-3xl border border-white/10 group hover:border-primary/30 transition-all duration-300 shadow-xl"
    >
      <h4 className={cn(
        "text-xl font-bold mb-8 flex items-center gap-4 text-gradient bg-gradient-to-r",
        category.gradient
      )}>
        {category.title}
        <div className="h-px flex-1 bg-white/10 group-hover:bg-primary/20 transition-colors" />
      </h4>
      <div className="flex flex-col gap-6">
        {category.skills.map((skill: any, i: number) => (
          <SkillItem key={skill.name} skill={skill} index={i} color={category.color} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden bg-dark-bg/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gradient"
          >
            My Expert Skills
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
          <p className="text-content-secondary max-w-xl mt-4">
            A comprehensive set of technical skills honed through years of practical experience and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Skill Visualization (Hidden on Mobile) */}
            <div className="hidden lg:block h-[500px] w-full relative">
                 {/* This would be integrated better in a real app, 
                     but we'll show it as a focal point here */}
                 <div className="absolute inset-0 z-0 opacity-80">
                    {/* Scene content is handled globally or through a local canvas */}
                    {/* For this demo, we'll assume a local canvas or a placeholder */}
                    <div className="w-full h-full flex items-center justify-center glass rounded-3xl animate-float-slow">
                        <p className="text-primary font-bold uppercase tracking-widest text-sm">Interactive 3D Skill Spheres</p>
                    </div>
                 </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
              {SKILLS.map((category, i) => (
                <SkillCard key={category.id} category={category} index={i} />
              ))}
            </div>
        </div>

        {/* Floating background blur */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />
      </div>
    </section>
  );
};

export default Skills;

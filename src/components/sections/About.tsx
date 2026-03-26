"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Code2, Smartphone, Users, Download, Rocket, Layers, Award, MapPin } from "lucide-react";
import { STATS, TIMELINE, PERSONAL_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";

const StatCard = ({ stat, index }: { stat: any, index: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const icons: any = { Briefcase, Code2, Smartphone, Users };
  const Icon = icons[stat.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass glass-hover p-6 rounded-3xl flex flex-col items-center gap-2 group relative overflow-hidden text-center"
    >
      <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/20 flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}>
        <Icon className={`w-6 h-6 text-${stat.color}-400`} />
      </div>
      <div className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
        {stat.value}
      </div>
      <div className="text-xs font-medium text-content-secondary uppercase tracking-widest">{stat.label}</div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

const TimelineCard = ({ item, index }: { item: any, index: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const icons: any = { Rocket, Smartphone, Layers, Award };
  const Icon = icons[item.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center ${
        index % 2 === 0 ? "" : "md:rtl"
      }`}
    >
      {/* Icon/Year Circle */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent z-0" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-12 rounded-full bg-surface border-4 border-background flex items-center justify-center z-10 hidden md:flex glow-primary">
         <span className="text-[10px] font-bold text-white">{item.year}</span>
      </div>

      <div className={`glass p-8 rounded-3xl relative z-10 transition-all hover:scale-[1.02] ${index % 2 === 0 ? "md:text-left" : "md:text-right md:ltr text-left"}`}>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 ${index % 2 === 0 ? "" : "md:ml-auto"}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.year}</div>
        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
        <p className="text-content-secondary text-sm leading-relaxed">{item.description}</p>
      </div>
      <div />
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gradient"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>

        {/* Bio & Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-3xl font-bold text-white">
              Passionate & Multi-disciplinary <br />
              <span className="text-primary">Developer based in Bangladesh</span>
            </h3>
            <div className="flex flex-col gap-4 text-content-secondary leading-relaxed">
              <p>
                I am a dedicated Full Stack Web & Mobile App Developer with over 3 years of experience in crafting high-quality digital solutions. My journey started with a fascination for how things work on the internet, which quickly evolved into a professional career building complex applications.
              </p>
              <p>
                Specializing in modern frameworks like Next.js and Flutter, I focus on creating seamless user experiences that are both visually stunning and performant. I believe in writing clean, maintainable code and staying ahead of the curve with emerging technologies.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through technical blog posts.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-content-secondary text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Available for remote work worldwide</span>
            </div>

            <Button size="lg" className="w-fit mt-4" glow>
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass border-2 border-primary/20 p-4 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/avatar-placeholder.png" 
                alt="Abdullah" 
                className="w-full h-full object-cover rounded-2xl relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl z-20 border border-white/20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                   <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                   <div className="text-xs text-content-secondary">Clients</div>
                   <div className="font-bold text-white">30+ Global</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
           <div className="flex flex-col items-center text-center gap-4 mb-16">
            <h3 className="text-3xl font-bold text-white tracking-tight">Professional Journey</h3>
            <p className="text-content-secondary max-w-lg">A chronological look at my evolution as a developer and the milestones I&apos;ve achieved.</p>
          </div>
          <div className="relative pt-8">
            {TIMELINE.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

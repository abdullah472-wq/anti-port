"use client";

import { motion, useInView as useFramerInView } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { Briefcase, Code2, Smartphone, Users, Download, Rocket, MapPin, Sparkles, Award, Layers, Globe } from "lucide-react";
import { STATS, TIMELINE } from "@/lib/data";
import Button from "@/components/ui/Button";
import { FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeInStagger";
import { useCountUp } from "@/hooks/useCountUp";

const icons: any = { Rocket, Layers, Sparkles, Award };

const StatCard = ({ stat }: { stat: any }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const statIcons: any = { Briefcase, Code2, Smartphone, Users, Globe };
  const Icon = statIcons[stat.icon];

  const numericEnd = parseInt(stat.value.replace(/[^0-9]/g, "")) || 0;
  const suffix = stat.value.replace(/[0-9]/g, "");
  const count = useCountUp(numericEnd, 2000, inView);
  const displayValue = `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -10 }}
      className="glass glass-hover p-6 rounded-3xl flex flex-col items-center gap-2 group relative overflow-hidden text-center h-full"
    >
      <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/20 flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}>
        <Icon className={`w-6 h-6 text-${stat.color}-400`} />
      </div>
      <div className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
        {displayValue}
      </div>
      <div className="text-xs font-medium text-content-secondary uppercase tracking-widest">{stat.label}</div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

const HolographicTimelineItem = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useFramerInView(cardRef, { once: true, margin: "-50px" });
  const Icon = icons[item.icon];
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center mb-24 ${isLeft ? "" : "flex-row-reverse"}`}>
      <div className="w-1/2" />
      <div className="absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isCardInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-md animate-pulse-glow" />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
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

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isCardInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className={`w-[calc(50%-60px)] ${isLeft ? "pr-12" : "pl-12"}`}
      >
        <div className="group relative">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/50 via-secondary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative glass rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-primary/40" />
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

const TimelineCard = ({ item, index }: { item: any; index: number }) => {
  const icons: any = { Rocket, Smartphone, Layers, Award };
  const Icon = icons[item.icon];

  return (
    <div
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
      
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <FadeInStaggerContainer className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <FadeInStaggerItem className="flex flex-col items-center text-center gap-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Frontend Developer
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </FadeInStaggerItem>

        {/* Bio & Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeInStaggerItem className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-white">
              Crafting Pixel-Perfect <br />
              <span className="text-primary">Web Experiences</span>
            </h3>
            <div className="flex flex-col gap-4 text-content-secondary leading-relaxed">
              <p>
                I am a dedicated Frontend Developer with over 3 years of experience crafting fast, accessible, and beautiful digital solutions. My passion lies in building immersive web experiences that users love to interact with.
              </p>
              <p>
                Specializing in modern frameworks like React and Next.js, I focus on creating pixel-perfect UIs with smooth animations, excellent Core Web Vitals, and 90+ Lighthouse scores. I believe in clean code, component reusability, and building software that feels alive.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new UI trends, experimenting with animations, or contributing to open-source frontend projects.
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
          </FadeInStaggerItem>

          <FadeInStaggerItem className="relative">
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
          </FadeInStaggerItem>
        </div>

        {/* Holographic Timeline */}
        <FadeInStaggerItem className="mt-32">
          <div className="text-center mb-16">
            <span className="text-xs text-primary uppercase tracking-[0.3em] font-medium">
              Professional Evolution
            </span>
            <h3 className="text-3xl font-bold text-white mt-4">
              My Growth as a <span className="text-gradient">Frontend Dev</span>
            </h3>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 origin-top"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent blur-sm" />
            </motion.div>

            {TIMELINE.map((item, i) => (
              <FadeInStaggerItem key={item.id}>
                <HolographicTimelineItem item={item} index={i} />
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeInStaggerItem>
      </FadeInStaggerContainer>
    </section>
  );
};

export default About;

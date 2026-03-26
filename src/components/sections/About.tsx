"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Code2, Smartphone, Users, Download, Rocket, Layers, Award, MapPin } from "lucide-react";
import { STATS, TIMELINE, PERSONAL_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";
import { FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeInStagger";
import { useCountUp } from "@/hooks/useCountUp";

const StatCard = ({ stat }: { stat: any }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const icons: any = { Briefcase, Code2, Smartphone, Users };
  const Icon = icons[stat.icon];

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
      <div />
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
            About Me
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </FadeInStaggerItem>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat) => (
            <FadeInStaggerItem key={stat.id}>
              <StatCard stat={stat} />
            </FadeInStaggerItem>
          ))}
        </div>

        {/* Bio & Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeInStaggerItem className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-white">
              Passionate & Multi-disciplinary <br />
              <span className="text-primary">Developer based in Bangladesh</span>
            </h3>
            <div className="flex flex-col gap-4 text-content-secondary leading-relaxed">
              <p>
                I am a dedicated Frontend Developer with over 3 years of experience crafting fast, accessible, and beautiful digital solutions. My journey started with a fascination for crafting interactive interfaces, which evolved into a professional career specializing in UI/UX engineering.
              </p>
              <p>
                Specializing in modern frameworks like React and Next.js, I focus on creating immersive experiences that consistently score 90+ on Lighthouse and prioritize Core Web Vitals. I believe in clean code, seamless animations, and building software that feels alive to the user.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new UI design trends, optimizing performance bottlenecks, or building open-source frontend components.
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

        {/* Journey Timeline */}
        <div className="relative">
           <FadeInStaggerItem className="flex flex-col items-center text-center gap-4 mb-16">
            <h3 className="text-3xl font-bold text-white tracking-tight">Professional Journey</h3>
            <p className="text-content-secondary max-w-lg">A chronological look at my evolution as a developer and the milestones I&apos;ve achieved.</p>
          </FadeInStaggerItem>
          
          <div className="relative pt-8">
            {TIMELINE.map((item, i) => (
              <FadeInStaggerItem key={item.id}>
                <TimelineCard item={item} index={i} />
              </FadeInStaggerItem>
            ))}
          </div>
        </div>
      </FadeInStaggerContainer>
    </section>
  );
};

export default About;

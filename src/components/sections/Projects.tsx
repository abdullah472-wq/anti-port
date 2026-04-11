"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code2, Smartphone, Layers, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeInStagger";

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const icons: any = { Web: Code2, Mobile: Smartphone, "Full Stack": Layers };
  const CategoryIcon = icons[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <div className="glass rounded-3xl overflow-hidden border border-white/10 group shadow-2xl relative h-full flex flex-col">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {project.featured && (
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-bold text-white uppercase tracking-widest glow-primary">
              Featured
            </div>
          )}
          <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-lg bg-dark-bg/50 backdrop-blur-md flex items-center justify-center border border-white/10">
            <CategoryIcon className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 relative flex-grow">
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h4>
            
            {/* Performance Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-1 mb-1">
              {project.lighthouseScore && (
                <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                   Lighthouse: {project.lighthouseScore}
                </div>
              )}
              {project.loadTime && (
                <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                   <span>⚡ Load: {project.loadTime}</span>
                </div>
              )}
              {project.mobileResponsive && (
                <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                   <Smartphone className="w-3 h-3" /> Responsive
                </div>
              )}
            </div>

            <p className="text-sm text-content-secondary line-clamp-2 leading-relaxed h-10">
              {project.description}
            </p>
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-content-secondary group-hover:border-primary/30 group-hover:text-primary transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="sm" className="w-full" glow>
                   Live Demo <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            )}
            {project.githubUrl && (
              <Link href={project.githubUrl} className={project.liveUrl ? "" : "flex-1"}>
                <Button variant="outline" size="sm" className={project.liveUrl ? "" : "w-full"}>
                  <Github className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
          
          {/* Hover Glow */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web", "Mobile", "Full Stack"];

  const filteredProjects = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <FadeInStaggerContainer className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <FadeInStaggerItem className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            My Featured Projects
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <p className="text-content-secondary max-w-xl mt-4">
            A selection of my best work across web and mobile development, showcasing high performance and user-centric design.
          </p>
        </FadeInStaggerItem>

        {/* Filters */}
        <FadeInStaggerItem className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                filter === cat
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg glow-primary"
                  : "bg-surface/50 text-content-secondary border-white/10 hover:border-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </FadeInStaggerItem>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View All Projects <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </FadeInStaggerContainer>
    </section>
  );
};

export default Projects;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ExternalLink, Github, Code2, Smartphone, Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useProjectsData } from "@/hooks/useContentData";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ProjectsPage = () => {
    const [filter, setFilter] = useState("All");
    const [query, setQuery] = useState("");
    const { projects } = useProjectsData();
    const categories = ["All", "Web", "Mobile", "Full Stack"];

    const filteredProjects = projects.filter((p) => {
        const matchesCategory = filter === "All" || p.category === filter;
        const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || 
                             p.description.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    const icons: any = { Web: Code2, Mobile: Smartphone, "Full Stack": Layers };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center gap-6 mb-16">
                    <Link href="/#projects" className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest group self-start">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-gradient"
                    >
                        Success Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-content-secondary max-w-2xl text-lg leading-relaxed"
                    >
                        Explore my portfolio of projects across mobile and web platforms, built with cutting-edge technologies.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="relative w-full md:max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-content-secondary"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Filter className="w-5 h-5 text-content-secondary mr-2" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-5 py-2 rounded-full text-xs font-bold transition-all border",
                                    filter === cat
                                        ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg glow-primary"
                                        : "bg-surface/50 text-content-secondary border-white/10 hover:border-primary/50"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => {
                            const CategoryIcon = icons[project.category];
                            return (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    whileHover={{ y: -10 }}
                                    className="glass rounded-3xl overflow-hidden border border-white/10 group shadow-2xl relative"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-lg bg-dark-bg/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                                            <CategoryIcon className="w-4 h-4 text-primary" />
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col gap-4 relative">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                                                {project.title}
                                            </h4>
                                            <p className="text-sm text-content-secondary line-clamp-2 leading-relaxed h-10">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-content-secondary group-hover:border-primary/30 group-hover:text-primary transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3 pt-2">
                                            <Button size="sm" className="flex-1" glow>
                                                Live Demo <ExternalLink className="w-3 h-3 ml-1" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Github className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectsPage;

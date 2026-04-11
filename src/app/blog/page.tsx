"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, User, Filter } from "lucide-react";
import Link from "next/link";
import { useBlogPostsData } from "@/hooks/useContentData";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const BlogListing = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { posts } = useBlogPostsData();

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-gradient"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-content-secondary max-w-2xl text-lg leading-relaxed"
          >
            Insights, tutorials and thoughts about web development, mobile apps and the future of technology.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-secondary group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search articles..."
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
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-5 py-2 rounded-full text-xs font-bold transition-all border",
                            activeCategory === cat
                                ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg glow-primary"
                                : "bg-surface/50 text-content-secondary border-white/10 hover:border-primary/50"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass rounded-3xl overflow-hidden border border-white/10 group shadow-xl relative flex flex-col h-full"
                >
                    {/* Blog Card Content (Same as home page but maybe unified in a component) */}
                    <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                        <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
                        {post.category}
                        </div>
                    </Link>

                    <div className="p-8 flex flex-col flex-1 gap-4">
                        <div className="flex items-center gap-4 text-[10px] text-content-secondary uppercase tracking-widest font-bold">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-secondary" />
                                <span>{post.readingTime}</span>
                            </div>
                        </div>

                        <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                            <h4 className="text-xl font-bold text-white leading-tight line-clamp-2 h-14">
                                {post.title}
                            </h4>
                        </Link>
                        <p className="text-sm text-content-secondary line-clamp-3 leading-relaxed mb-4">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-[10px] font-bold text-content-secondary uppercase tracking-widest">By Abdullah</span>
                            </div>
                            <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-all group/btn">
                                Read More
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
              ))
            ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center flex flex-col items-center gap-4">
                     <Search className="w-16 h-16 text-content-secondary opacity-20" />
                     <p className="text-content-secondary text-lg">No articles found matching your criteria.</p>
                     <Button onClick={() => {setQuery(""); setActiveCategory("All")}} variant="outline">Clear Filters</Button>
                </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;

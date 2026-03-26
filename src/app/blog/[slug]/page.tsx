"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS, PERSONAL_INFO } from "@/lib/data";
import Button from "@/components/ui/Button";

const BlogPostDetail = () => {
  const params = useParams();
  const slug = params.slug as string;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-gradient">Post Not Found</h1>
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen pb-24 relative">
      {/* Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-12 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col gap-6 w-full">
            <Link href="/blog" className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3"
            >
              <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-widest">
                {post.category}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              {post.title}
            </motion.h1>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-wrap items-center gap-8 text-[10px] text-content-secondary uppercase tracking-widest font-bold border-t border-white/10 pt-6"
            >
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                     <User className="w-4 h-4 text-primary" />
                  </div>
                  <span>By Abdullah</span>
               </div>
               <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{post.date}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>{post.readingTime}</span>
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 mt-12">
        {/* Post Content */}
        <article className="max-w-4xl mx-auto w-full glass p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden">
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary prose-strong:text-white prose-code:text-accent prose-pre:bg-surface/50 prose-pre:border prose-pre:border-white/10">
            {/* MDX Content Mockup */}
            <h2>{post.title} Overview</h2>
            <p>{post.excerpt}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8">
               <h4 className="text-primary font-bold m-0 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">!</span>
                  Pro Tip: Next.js Optimization
               </h4>
               <p className="m-0 mt-3 text-white/80 text-sm">Always use the Image component for optimized asset loading and layout stability.</p>
            </div>

            <h3>Key Features of {post.category}</h3>
            <ul>
               <li>Dynamic Rendering & SSR support</li>
               <li>Intuitive API structures</li>
               <li>High performance asset management</li>
               <li>Scalable architecture patterns</li>
            </ul>

            <pre className="p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto">
{`const BlogDetail = ({ post }) => {
  return (
    <div className="max-w-4xl">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};`}
            </pre>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Social Share */}
          <div className="mt-20 border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-content-secondary uppercase tracking-widest">Share this post:</span>
                <div className="flex items-center gap-3">
                    {[Twitter, Linkedin, Facebook, LinkIcon].map((Icon, i) => (
                        <button key={i} className="w-10 h-10 rounded-full bg-surface/50 flex items-center justify-center text-content-secondary hover:text-primary hover:bg-primary/10 transition-all border border-white/5">
                            <Icon className="w-4 h-4" />
                        </button>
                    ))}
                </div>
             </div>
             
             <div className="flex items-center gap-2 text-content-secondary text-sm">
                <LinkIcon className="w-4 h-4" />
                <span>abdullah.dev/blog/{post.slug}</span>
             </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="flex flex-col gap-8">
          {/* Author Card */}
          <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 sticky top-32">
             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                <img src="/avatar-placeholder.jpg" alt="Abdullah" className="w-full h-full object-cover rounded-full border-2 border-background" />
             </div>
             <div>
                <h4 className="font-bold text-white uppercase tracking-tighter uppercase">{PERSONAL_INFO.name}</h4>
                <p className="text-[10px] text-content-secondary uppercase tracking-widest">{PERSONAL_INFO.title}</p>
             </div>
             <p className="text-xs text-content-secondary leading-relaxed">
                I build powerful web & mobile experiences. Let&apos;s connect and create something amazing.
             </p>
             <Link href="#contact" className="w-full">
                <Button size="sm" className="w-full" variant="outline">Follow Me</Button>
             </Link>
          </div>

          {/* Table of Contents */}
          <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col gap-4 sticky top-[450px]">
             <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-primary" />
                Table of Contents
             </h4>
             <div className="flex flex-col gap-3">
                {["Overview", "Key Features", "Implementation", "Conclusion"].map((item) => (
                    <button key={item} className="text-left text-xs text-content-secondary hover:text-primary transition-colors flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item}
                    </button>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostDetail;

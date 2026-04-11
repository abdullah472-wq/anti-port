"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import Button from "@/components/ui/Button";

const BlogCard = ({ post, index }: { post: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass rounded-3xl overflow-hidden border border-white/10 group shadow-xl relative flex flex-col h-full"
    >
      {/* Blog Image */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
          {post.category}
        </div>
      </Link>

      {/* Content */}
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
              <span className="text-[10px] font-bold text-content-secondary uppercase tracking-tighter tracking-widest">By Abdullah</span>
           </div>
           <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-all group/btn">
              Read More
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
           </Link>
        </div>
      </div>
      
      {/* Hover Background Glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-24 px-6 relative overflow-hidden bg-dark-bg/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gradient"
          >
            Latest News & Articles
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
          <p className="text-content-secondary max-w-xl mt-4">
            Insights, tutorials and thoughts about web development, mobile apps and the future of technology.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              View All Posts <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

       {/* Suble background effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default Blog;

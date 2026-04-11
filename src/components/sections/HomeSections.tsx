"use client";

import Hero from "@/components/sections/Hero";
import LazySection from "@/components/sections/LazySection";

export default function HomeSections() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LazySection id="about" importSection={() => import("@/components/sections/About")} />
      <LazySection id="skills" importSection={() => import("@/components/sections/Skills")} />
      <LazySection id="journey" importSection={() => import("@/components/sections/JourneyStack")} />
      <LazySection id="projects" importSection={() => import("@/components/sections/Projects")} />
      <LazySection id="blog" importSection={() => import("@/components/sections/Blog")} />
      <LazySection id="contact" importSection={() => import("@/components/sections/Contact")} />
    </div>
  );
}

import Hero from "@/components/sections/Hero";
import TechHero from "@/components/ui/TechHero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <TechHero />
      </div>
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </div>
  );
}

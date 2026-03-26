"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

const HologramPortal = () => {
  const radius = 150; // Radius of the circle

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Portal Background Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden mix-blend-screen opacity-90">
        <Image
          src="/projects/futuristic-hologram-portal.jpg"
          alt="Hologram Portal"
          fill
          className="object-cover animate-pulse"
        />
      </div>

      {/* Rotating Carousel Container */}
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center" style={{ perspective: "1000px" }}>
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {PROJECTS.map((project, index) => {
            const angle = (index / PROJECTS.length) * 360;
            return (
              <motion.div
                key={project.id}
                className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-primary/50 cursor-pointer shadow-[0_0_15px_rgba(var(--primary),0.5)] group bg-background/80 backdrop-blur-sm"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "visible",
                }}
                whileHover={{ scale: 1.3, zIndex: 10, borderColor: "rgba(var(--primary), 1)" }}
              >
                <Link href={project.liveUrl || project.githubUrl || "/#projects"} target="_blank" className="w-full h-full block">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Center glowing orb/hologram effect overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/30 rounded-full blur-[50px] pointer-events-none" />
    </div>
  );
};

export default HologramPortal;

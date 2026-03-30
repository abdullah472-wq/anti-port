"use client";

import { motion } from "framer-motion";
import { Code2, Box, Zap, Shield, GitBranch, Layers } from "lucide-react";
import { FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeInStagger";

const CODE_EXAMPLES = [
  {
    icon: Box,
    title: "Component Architecture",
    code: `// Atomic Design Pattern
components/
├── atoms/      // Button, Input
├── molecules/   // FormGroup
├── organisms/   // Header, Card
└── templates/  // PageLayout`,
    color: "blue",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    code: `// Dynamic Import
const Chart = dynamic(() => 
  import('@/components/Chart'), 
  { ssr: false, loading: () => <Skeleton /> }
);`,
    color: "green",
  },
  {
    icon: Shield,
    title: "Type Safety",
    code: `// TypeScript Best Practices
interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
}`,
    color: "purple",
  },
  {
    icon: GitBranch,
    title: "State Management",
    code: `// Zustand Store Pattern
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  reset: () => set({ user: null }),
}));`,
    color: "orange",
  },
];

const PRINCIPLES = [
  {
    icon: Layers,
    title: "Clean Code",
    description: "Readable, maintainable, and well-documented code structure",
  },
  {
    icon: Code2,
    title: "DRY & SOLID",
    description: "Don't repeat yourself with reusable components and patterns",
  },
    {
    icon: Box,
    title: "Scalable Architecture",
    description: "Built for growth with modular and decoupled systems",
  },
];

const Engineering = () => {
  return (
    <section id="engineering" className="py-24 px-6 relative overflow-hidden">
      <FadeInStaggerContainer className="max-w-7xl mx-auto">
        <FadeInStaggerItem className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Engineering Excellence
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <p className="text-content-secondary max-w-xl mt-4">
            Building robust, scalable, and maintainable solutions through clean architecture and best practices.
          </p>
        </FadeInStaggerItem>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {CODE_EXAMPLES.map((item, index) => (
            <FadeInStaggerItem key={index}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass p-6 rounded-2xl border border-white/10 group relative overflow-hidden h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/20 flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent z-10 pointer-events-none" />
                  <pre className="bg-dark-bg/50 rounded-xl p-4 overflow-x-auto text-sm font-mono">
                    <code className="text-content-secondary">
                      {item.code.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-content-secondary/40 w-8 select-none">{i + 1}</span>
                          <span className={
                            line.includes('//') 
                              ? 'text-content-secondary/60' 
                              : line.includes(':') && !line.includes('//')
                              ? 'text-accent'
                              : 'text-primary'
                          }>
                            {line}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </motion.div>
            </FadeInStaggerItem>
          ))}
        </div>

        <FadeInStaggerItem>
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRINCIPLES.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-content-secondary leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInStaggerItem>
      </FadeInStaggerContainer>
    </section>
  );
};

export default Engineering;

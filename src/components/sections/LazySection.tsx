"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useInView } from "react-intersection-observer";

type SectionModule = {
  default: ComponentType;
};

interface LazySectionProps {
  id: string;
  importSection: () => Promise<SectionModule>;
}

export default function LazySection({ id, importSection }: LazySectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px",
  });
  const [SectionComponent, setSectionComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (inView && !SectionComponent) {
      importSection().then((mod) => {
        if (isMounted) {
          setSectionComponent(() => mod.default);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [inView, SectionComponent, importSection]);

  return (
    <div ref={ref}>
      {SectionComponent ? (
        <SectionComponent />
      ) : (
        <section id={id} className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="h-10 w-56 rounded-xl bg-white/10 animate-pulse mb-6" />
            <div className="h-48 rounded-3xl bg-white/5 animate-pulse" />
          </div>
        </section>
      )}
    </div>
  );
}

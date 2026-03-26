"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, Home, User, Cpu, Briefcase, FileText, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    setIsMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, togglePalette]);

  const items = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Blog", href: "#blog", icon: FileText },
    { name: "Contact", href: "#contact", icon: Send },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    setQuery("");
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-[100]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-surface border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-content-secondary" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-content-primary placeholder:text-content-secondary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-content-secondary">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-content-secondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-content-secondary group-hover:text-primary" />
                    </div>
                    <span className="text-sm font-medium text-content-primary">{item.name}</span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-content-secondary text-sm">
                  No results found for &quot;{query}&quot;
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 bg-white/5 flex justify-end gap-4 text-[10px] text-content-secondary">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">Enter</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), { ssr: false });

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg relative flex items-center justify-center px-6 overflow-hidden">
      <Scene3D />
      
      <div className="max-w-xl w-full glass p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center gap-8 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center glow-primary"
        >
          <Ghost className="w-12 h-12 text-primary animate-bounce" />
        </motion.div>

        <div className="flex flex-col gap-2">
          <h1 className="text-7xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-bold text-gradient uppercase tracking-widest">Page Not Found</h2>
        </div>

        <p className="text-content-secondary leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link href="/" className="flex-1">
            <Button className="w-full" glow>
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()} className="flex-1">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </button>
        </div>
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />
    </div>
  );
}

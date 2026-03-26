import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#6366f1", // Indigo
        secondary: "#8b5cf6", // Purple
        accent: "#06b6d4", // Cyan
        neon: "#00ff88", // Neon Green
        "dark-bg": "#0f172a", // Dark Navy
        surface: "#1e293b", // Slate 800
        "content-primary": "#f1f5f9",
        "content-secondary": "#94a3b8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-accent": "0 0 20px rgba(6, 182, 212, 0.4)",
        "glow-neon": "0 0 20px rgba(0, 255, 136, 0.4)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "reveal-up": "reveal-up 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

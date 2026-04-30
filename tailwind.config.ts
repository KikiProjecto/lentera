import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00F5D4",
          pink: "#FF006E",
          purple: "#8338EC",
          yellow: "#FFBE0B",
          orange: "#FF5400",
        },
        dark: {
          950: "#0A0A0F",
          900: "#12121A",
          800: "#1A1A25",
          700: "#252535",
          600: "#353550",
        },
        light: {
          50: "#FAFAFC",
          100: "#F0F0F5",
          200: "#E0E0EA",
          300: "#C8C8D5",
          400: "#A0A0B0",
        },
        guardian: {
          komodo: "#2DD4BF",
          owl: "#A78BFA",
          orangutan: "#F59E0B",
          prism: "#06B6D4",
          flame: "#EF4444",
        },
        vice: {
          slot: "#DC2626",
          rug: "#7C3AED",
          fomo: "#DB2777",
          greed: "#EA580C",
          greedDark: "#451A03",
        }
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        body: ["var(--font-space)", "system-ui", "sans-serif"],
        game: ["var(--font-pixel)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "shake": "shake 0.5s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "particle-float": "particle-float 4s ease-in-out infinite",
        "screen-shake": "screen-shake 0.3s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,245,212,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0,245,212,0.8)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "particle-float": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(360deg)", opacity: "0" },
        },
        "screen-shake": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5px, -5px)" },
          "20%": { transform: "translate(5px, -5px)" },
          "30%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(5px, 5px)" },
          "50%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, -3px)" },
          "70%": { transform: "translate(-2px, 2px)" },
          "80%": { transform: "translate(2px, 2px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "mesh-gradient": "url('/assets/backgrounds/mesh-gradient.svg')",
        "noise-overlay": "url('/assets/backgrounds/noise.png')",
      },
      backgroundSize: {
        "300%": "300%",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0,245,212,0.5), 0 0 40px rgba(0,245,212,0.3)",
        "neon-pink": "0 0 20px rgba(255,0,110,0.5), 0 0 40px rgba(255,0,110,0.3)",
        "neon-purple": "0 0 20px rgba(131,56,236,0.5), 0 0 40px rgba(131,56,236,0.3)",
        "neon-glow": "0 0 15px var(--neon-color, #00F5D4), 0 0 30px var(--neon-color, #00F5D4), 0 0 45px var(--neon-color, #00F5D4)",
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [],
};
export default config;
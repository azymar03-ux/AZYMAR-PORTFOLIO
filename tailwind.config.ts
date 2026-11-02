import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      colors: {
        azymar: {
          bg: "#FFFFFF",
          subtle: "#FAFAFA",
          darkBg: "#0F0F1A",
          darkSurface: "#171728",
          ink: "#1A1A2E",
          muted: "#6B7280",
          blue: "#4361EE",
          purple: "#7B2FF7",
          coral: "#FF6B6B",
          teal: "#01ACB2",
        },
      },
      keyframes: {
        "dot-drift": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "30px 30px" },
        },
        "particle-burst": {
          "0%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
          "100%": {
            transform: "translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0)",
            opacity: "0",
          },
        },
      },
      animation: {
        "dot-drift": "dot-drift 12s linear infinite",
        "particle-burst": "particle-burst 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;

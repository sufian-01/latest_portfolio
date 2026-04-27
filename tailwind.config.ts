import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050509",
        graphite: "#101116",
        silver: "#b9c0cc",
        royal: "#8d7cff",
        neon: "#70d7ff",
        plasma: "#d9ff6f"
      },
      boxShadow: {
        glow: "0 0 44px rgba(112, 215, 255, 0.22)",
        royal: "0 30px 120px rgba(141, 124, 255, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "royal-gradient":
          "linear-gradient(135deg, rgba(112,215,255,.95), rgba(141,124,255,.94) 48%, rgba(217,255,111,.9))"
      }
    }
  },
  plugins: []
};

export default config;

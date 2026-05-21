import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: "#B2F048",
          2: "#D5FF78",
          dim: "rgba(178,240,72,.15)",
        },
        twitch: {
          DEFAULT: "#9146FF",
          soft: "rgba(145,70,255,.22)",
        },
        navy: "#081F34",
        ink: "#0B1723",
        deep: "#050D15",
        offwhite: "#E1DFD9",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6D28D9",
          hover: "#5B21B6",
          soft: "#EDE9FE",
        },
        sidebar: {
          bg: "#141B2C",
          border: "#1E2840",
          text: "#8B99B5",
          "text-active": "#E8EDF5",
          active: "#1F2E4A",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

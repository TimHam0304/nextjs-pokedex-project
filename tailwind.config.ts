import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDarkColor: "#121212",
      },
      fontSize: {
        responsiveHero: "max(60px, min(8vw, 128px))",
        responsiveHeroSub: "max(24px, min(4vw, 32px))",
      },
    },
  },
  plugins: [],
  darkMode: "media",
};
export default config;

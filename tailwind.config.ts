import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainbg: "#071A24",
        secondarybg: "#0B2A35",
        accent: "#12D9F5",
        accent2: "#00B8A9",
        highlight: "#63F3FF",
        textprimary: "#F2FCFF",
        textsecondary: "#8DA9B3",
        card: "#102F3A",
        borderc: "#1D6675",
      },
    },
  },
  plugins: [],
};
export default config;

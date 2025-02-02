

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes:{
        "hamburger-frames":{
          "0%": {transform:"translateX(-20%)"},
          "50%": {transform:"translateX(-10%)"},
          "100%": {transform:"translateX(0%)"}
        },
        "hamburg-top":{
          "0%":{transform:"translateY(0%)"},
          "100%":{transform:"translateY(1%)"}
        }
      },
      animation:{
        'pulse-fast':"pulse-fast 0.5s inifinite linear",
        'hamburger-menu':'hamburger-frames 0.5s infinite linear',
        'hamburger-top':"hamburg-top 1s infinite linear"
      },
    },
  },
  plugins: [],
} satisfies Config;

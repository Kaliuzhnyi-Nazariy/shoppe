import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        accent: "#A18A68",
        "dark-gray": "#707070",
        gray: "#D8D8D8",
        "light-gray": "#EFEFEF",
        error: "#D82700",
      },
      //   fontSize: {
      //     h1: ["33px"],
      //     h2: ["26px", "35px"],
      //     h3: ["20px", "26px"],
      //     h4: ["20px", "20px"],
      //     h5: ["16px", "27px"],
      //     "body-lg": ["16px"],
      //     "body-md": ["14px"],
      //     "body-sm": ["12px", "20px"],
      //   },
    },
  },
  plugins: [],
} satisfies Config;

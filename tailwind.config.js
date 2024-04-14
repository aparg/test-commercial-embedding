// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/**/*.{js,ts,html}",
    "./app/**/*.{js,ts,html}",
    "./app/**/**/*.{js,ts,html}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.js",
    // "!./components/reso/Filters.js",
  ],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
      },
      colors: {
        "primary-green": "#217955",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  important: true,
};

export default config;

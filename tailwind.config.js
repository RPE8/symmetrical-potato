/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          c0: "#FFFFFF",
          c1: "#FDFCFC",
          "c1.1": "#E0E0E0",
          c2: "#C4C4C4",
          c3: "#9A9A9A",
          c4: "#2C2C2C",
        },
        black: {
          ...colors.black,
          c0: "#000000",
          c1: "#1D1D1F",
          "c1.1": "#3B3B3D",
          c2: "#636363",
          c3: "#646464",
          c4: "#121212",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".stroke-dash-line": {
          "stroke-dasharray": "4",
        },
      });
    },
  ],
};

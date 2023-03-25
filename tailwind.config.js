/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
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
          c1: "#FDFCFC",
          c2: "#C4C4C4",
          c3: "#9A9A9A",
          c4: "#2C2C2C",
        },
      },
    },
  },
  plugins: [],
};

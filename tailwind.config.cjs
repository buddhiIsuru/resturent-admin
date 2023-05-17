/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#3E79F7",
      white: "#ffffff",
      gray: "#72849a",
      darkGray: "#475569",
      borderColor: "#e2e8f0",
      transparent: "transparent",
    },
    extend: {},
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};

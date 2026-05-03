/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        screen1100: { max: "1100px" },
        screen800: { max: "800px" },
        screen700: { max: "700px" },
        screen500: { max: "500px" },
        screen400: { max: "400px" },
      },
    },
  },
  plugins: [],
};

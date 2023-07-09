/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunits: ["Nunito Sans"],
      },
      maxWidth: { notebook: "1440px" },
      colors: { prime: "#6379F4", grey: "#A9A9A9" },
      margin: { "10%": "5%" },
      padding: { "10%": "5%" },
      screens: {
        md: "770px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["cmyk"] },
};

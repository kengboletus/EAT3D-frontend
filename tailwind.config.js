/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#585858",
        secondary: "#A4A4A4",
        tertiary: "#EEF0EF",
        dark: {
          100: "#A4A4A4",
          200: "#8D8D8D",
          300: "#585858"
        },
        light: {
          100: "#FFFFFF",
          200: "#EEF0EF",
          300: "#D9D9D9",
          400: "#D2D2D2",
        },
        orange: "#FE8335",
        green: "#78BE21"

      }
    },
  },
  plugins: [],
}


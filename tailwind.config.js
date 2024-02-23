/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans Variable", "sans-serif"],
      },
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground-color)",
      },
    },
  },
  plugins: [],
};

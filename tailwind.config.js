/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ["var(--font-handwritten)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

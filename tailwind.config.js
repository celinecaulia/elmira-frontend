/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        roseGold: '#D4B5B0',
        softBeige: '#FDFBF7',
        darkBrown: '#4A3B32',
        accentPink: '#E8D3CE',
      }
    },
  },
  plugins: [],
}
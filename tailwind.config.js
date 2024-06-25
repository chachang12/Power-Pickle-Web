/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#CFDEC4',
        'dark-green': '#02261C',
        'matcha-green': '#A0AE9B',
        'off-white': '#eaeadf',
      },
    },
  },
  plugins: [],
}
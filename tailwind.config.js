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
        'dark-blue': '#011C40',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
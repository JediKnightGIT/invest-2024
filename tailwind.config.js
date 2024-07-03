/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: '80px',
    },
    screens: {
      sm: '350px',
      md: '768px',
      lg: '1024px',
      xl: '1360px',
    },
    extend: {
      fontFamily: {
        primary: ['Gilroy', 'sans-serif'],
        secondary: ['Bebas Neue', 'sans-serif'],
        other: ['Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
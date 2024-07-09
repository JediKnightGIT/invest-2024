const plugin = require('tailwindcss/plugin')

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
      lg: '1360px',
      xl: '1920px',
    },
    extend: {
      fontFamily: {
        primary: ['Gilroy', 'sans-serif'],
        secondary: ['Bebas Neue', 'sans-serif'],
        other: ['Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: '#31FF2D',
        gray: '#F5F5F5',
        darkgray: 'rgba(36, 74, 127, 0.08)',
        // accent: {
        //   DEFAULT: '#00FF99',
        //   hover: '#00E187',
        // },
      },
      textShadow: {
        sm: '0 0 6px white',
        DEFAULT: '0 4px 4px rgb(9, 162, 24)',
        lg: '0 8px 16px white',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'signin-pattern': "url('./src/assets/bgSignIn.png')",
      },
    },
  },
  plugins: [],
}

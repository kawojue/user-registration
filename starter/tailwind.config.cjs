/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif'],
        "cabin": ['Cabin', 'sans-serif'],
        "roboto": ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
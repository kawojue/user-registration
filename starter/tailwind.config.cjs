/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif'],
        "cabin": ['Cabin', 'sans-serif'],
        "roboto": ['Roboto', 'sans-serif'],
      },
      colors: {
        'pry-clr-0': "rgb(240, 245, 248)",
        'pry-clr-1': "rgb(16, 16, 16)"
      }
    },
  },
  plugins: [],
}
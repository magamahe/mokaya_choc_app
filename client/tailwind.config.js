/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mokaya-cream': '#FDF5E6',
        'mokaya-brown': '#4B3621',
        'mokaya-gold': '#D4AF37',
      },

      fontFamily: {
        title: ['"Playfair Display"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        billboard: '700px',
      },
      colors:{
        'custom-blue': '#0068FF',
        'navy-blue' : '#09244B',
        'custom-yellow' : '#AB840D'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        istok: ['Istok Web', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


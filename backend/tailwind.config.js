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
        'screen-minus-82': 'calc(100vh - 82px)',
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


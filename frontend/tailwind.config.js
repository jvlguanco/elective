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
        'custom-blue': '#09244B'
      },
    },
  },
  plugins: [],
}


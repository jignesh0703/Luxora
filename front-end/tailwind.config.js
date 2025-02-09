/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'ssm' : '375px',
        '3xl': '1700px',
        '4xl': '1920px',
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    screens: {
      "sm": "487px",
      "md": "667px",
      "lg": "992px",
      "xl": "1220px",
      "2xl": "1576px"
    },
    extend: {
      borderRadius: {
        "50": "50px"
      },
      fontFamily: {
        Jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        Sora: ['Sora', 'sans-serif']
      },
      colors: {
        "primary": "#124E58",
        "primary-hover": "",
        "secondary": "#F2C852",
        "secondary-hover": ""
      }
    },
  },
  plugins: [],
}
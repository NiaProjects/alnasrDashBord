/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin'

export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      Container: {
        center: true
      },
      colors : {
        main : "#F48120"
      }
    },
    darkMode: 'class',
  },
  plugins: [flowbite()],
}


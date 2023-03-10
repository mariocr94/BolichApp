/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
      './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            'blue-fb': '#1877F2',
            'gray-google': '#76797E',
            'mainx-1': '#443737',
            'mainx-2': '#272121',
            'mainx-3': '#C147E9',
            'mainx-4': '#FF4D00',
            'main-1': '#2D033B',
            'main-2': '#810CA8',
            'main-3': '#C147E9',
            'main-4': '#E5B8F4',
         },
         height: {
            'to-fit': 'calc(100vh - 121px)',
         },
      },
      animation: {
         'reverse-spin': 'reverse-spin 1s linear infinite',
      },
      keyframes: {
         'reverse-spin': {
            from: {
               transform: 'rotate(360deg)',
            },
         },
      },
   },
   plugins: [],
});

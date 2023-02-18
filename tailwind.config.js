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
            'main-1': '#FF5B00',
            'main-2': '#F0F0F0',
            'main-3': '#3E497A',
            'main-4': '#21325E',
            'mainx-1': '#2D033B',
            'mainx-2': '#810CA8',
            'mainx-3': '#C147E9',
            'mainx-4': '#E5B8F4',
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

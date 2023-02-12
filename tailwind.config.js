/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'blue-fb': '#1877F2',
            'gray-google': '#76797E',
            'main-1': '#2D033B',
            'main-2': '#810CA8',
            'main-3': '#C147E9',
            'main-4': '#E5B8F4',
         },
         height: {
            'to-fit': 'calc(100vh - 72px)',
         },
      },
   },
   plugins: [],
};

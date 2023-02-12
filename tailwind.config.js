/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'blue-fb': '#1877F2',
            'gray-google': '#76797E',
         },
         height: {
            'to-fit': 'calc(100vh - 72px)',
         },
      },
   },
   plugins: [],
};

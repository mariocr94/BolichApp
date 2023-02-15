module.exports = {
   locales: ['en', 'es'], // Array with the languages that you want to use
   defaultLocale: 'en', // Default language of your website
   pages: {
      '*': ['common'],
      '/profile': ['profile'],
      '/games': ['games'],
   },
};

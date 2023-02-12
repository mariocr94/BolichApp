import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <title>Bowling World</title>
            <link rel="bowling ball icon" href="/favicon.ico" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}

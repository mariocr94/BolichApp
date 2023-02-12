import theme from '@common/styles/theme';
import Layout from '@components/layout/Layout';
import { ThemeProvider } from '@material-tailwind/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { useState } from 'react';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
   const [supabaseClient] = useState(() => createBrowserSupabaseClient());
   return (
      // <Auth.UserContextProvider supabaseClient={supabaseClient}>
      <SessionContextProvider
         supabaseClient={supabaseClient}
         initialSession={pageProps.initialSession}
      >
         <ThemeProvider value={theme}>
            <Layout supabaseClient={supabaseClient}>
               <Component {...pageProps} />
            </Layout>
         </ThemeProvider>
      </SessionContextProvider>
      // </Auth.UserContextProvider>
   );
}

export default MyApp;

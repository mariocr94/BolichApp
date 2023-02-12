import { AppProps } from 'next/app';

import Layout from '@components/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
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
         <Layout supabaseClient={supabaseClient}>
            <Component {...pageProps} />
         </Layout>
      </SessionContextProvider>
      // </Auth.UserContextProvider>
   );
}

export default MyApp;

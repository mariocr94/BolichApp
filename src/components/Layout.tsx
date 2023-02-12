import { SupabaseClient } from '@supabase/supabase-js';
import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';

type Props = {
   children?: ReactNode;
   supabaseClient?: SupabaseClient;
};

const Layout = ({ children, supabaseClient }: Props) => (
   <div>
      <Head>
         <title>Bowling World</title>
         <meta charSet="utf-8" />
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header supabaseClient={supabaseClient} />
      <main>{children}</main>
   </div>
);

export default Layout;

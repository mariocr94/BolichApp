import { SupabaseClient } from '@supabase/supabase-js';
import { ReactNode } from 'react';
import Header from './Header';

type Props = {
   children?: ReactNode;
   supabaseClient?: SupabaseClient;
};

const Layout = ({ children, supabaseClient }: Props) => (
   <div>
      <Header supabaseClient={supabaseClient} />
      <main>{children}</main>
   </div>
);

export default Layout;

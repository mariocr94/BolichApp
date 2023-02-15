import { PAGES } from '@common/constants/pages';
import LoginPage from '@components/pages/LoginPage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const HomePage = () => {
   return <LoginPage />;
};

export default HomePage;

export async function getServerSideProps(ctx) {
   const supabase = createServerSupabaseClient(ctx);
   const {
      data: { session },
   } = await supabase.auth.getSession();
   if (session)
      return {
         redirect: {
            destination: PAGES.DASHBOARD,
            permanent: false,
         },
      };
   return { props: { session } };
}

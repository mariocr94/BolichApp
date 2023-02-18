import { VIEWS } from '@common/constants/tables';
import ArsenalPage, { ArsenalPageProps } from '@components/pages/ArsenalPage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const Arsenal = ({ arsenal }: ArsenalPageProps) => {
   return <ArsenalPage arsenal={arsenal} />;
};

export default Arsenal;

export async function getServerSideProps(ctx) {
   const supabase = createServerSupabaseClient(ctx);
   const {
      data: { session },
   } = await supabase.auth.getSession();
   if (!session)
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };

   const { data: arsenal } = await supabase.from(VIEWS.USER_BALLS).select('*');

   return { props: { session, arsenal } };
}

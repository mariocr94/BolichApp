import { TABLES } from '@common/constants/tables';
import DashboardPage, { DashboardPageProps } from '@components/pages/dashboardPage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const Dashboard = ({ games }: DashboardPageProps) => {
   return <DashboardPage games={games} />;
};

export default Dashboard;

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

   const { data: games } = await supabase.from(TABLES.GAMES).select('*');

   return { props: { session, games } };
}

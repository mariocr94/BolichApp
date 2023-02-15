import { TABLES } from '@common/constants/tables';
import GamesPage, { GamesPageProps } from '@components/pages/GamesPage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const Games = ({ games }: GamesPageProps) => {
   return <GamesPage games={games} />;
};

export default Games;

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
   ctx.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
   return { props: { session, games } };
}

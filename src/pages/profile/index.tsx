import { TABLES } from '@common/constants/tables';
import ProfilePage, { ProfilePageProps } from '@components/pages/ProfilePage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const Profile = ({ profile }: ProfilePageProps) => {
   return <ProfilePage profile={profile} />;
};

export default Profile;

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

   const { data: profile } = await supabase
      .from(TABLES.PROFILE)
      .select('*')
      .eq('id', session.user?.id)
      .single();

   return { props: { session, profile } };
}

import { useUser } from '@supabase/auth-helpers-react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

interface HeaderProps {
   supabaseClient: SupabaseClient;
}
const Header = ({ supabaseClient }: HeaderProps) => {
   const router = useRouter();
   const user = useUser();

   const handleLogoutClick = async () => {
      await supabaseClient.auth.signOut();
      router.push('/');
   };

   const renderUserOptions = () => {
      if (user)
         return (
            <div className="flex w-full items-center justify-between gap-2">
               <img
                  src={user?.user_metadata?.avatar_url}
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
               />
               <button
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-gray-200"
                  onClick={handleLogoutClick}
               >
                  Logout
               </button>
            </div>
         );
      return <div></div>;
   };
   // if (!user) return;

   return (
      <header className="sticky top-0 left-0 right-0">
         <nav className="flex items-center justify-between gap-2 p-4">{renderUserOptions()}</nav>
      </header>
   );
};

export default Header;

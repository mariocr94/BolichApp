import { PAGES } from '@common/constants/pages';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { useUser } from '@supabase/auth-helpers-react';
import { SupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsClipboardData, BsHouseDoorFill, BsList, BsPersonFill, BsPower } from 'react-icons/bs';
import NavItem from './NavItem';

interface HeaderProps {
   supabaseClient: SupabaseClient;
}
const Header = ({ supabaseClient }: HeaderProps) => {
   const user = useUser();
   const router = useRouter();
   const route = router.pathname;

   const handleLogoutClick = async () => {
      await supabaseClient.auth.signOut();
      router.push('/');
   };

   const handleProfileClick = async () => {
      router.push('/profile');
   };

   const renderUserOptions = () => {
      if (user)
         return (
            <div className="flex w-full items-center justify-between">
               <ul className="flex text-main-3">
                  <NavItem link={PAGES.DASHBOARD} label="Home" route={route}>
                     <BsHouseDoorFill className="h-8 w-8 md:h-6 md:w-6" />
                  </NavItem>
                  <NavItem link={PAGES.PROFILE} label="Profile" route={route}>
                     <BsPersonFill className="h-8 w-8 md:h-6 md:w-6" />
                  </NavItem>
                  <NavItem link={PAGES.GAMES} label="Games" route={route}>
                     <BsClipboardData className="h-8 w-8 md:h-6 md:w-6" />
                  </NavItem>
               </ul>
               <Menu>
                  <MenuHandler>
                     <Button className="rounded-full p-2 shadow-none">
                        <BsList className="h-8 w-8 cursor-pointer rounded-full fill-main-1" />
                     </Button>
                  </MenuHandler>
                  <MenuList className="w-32 px-2 py-0">
                     <MenuItem onClick={handleProfileClick} className="hover:bg-main-4">
                        <div className="flex gap-2 border-b py-2 ">
                           <BsPersonFill className="h-6 w-6 fill-main-2" /> Profile
                        </div>
                     </MenuItem>
                     <MenuItem onClick={handleLogoutClick} className="hover:bg-main-4">
                        <div className="flex gap-2 py-2 ">
                           <BsPower className="h-6 w-6 fill-main-2" /> Logout
                        </div>
                     </MenuItem>
                  </MenuList>
               </Menu>
            </div>
         );
      return (
         <Link href="/">
            <div className="text-main-4 md:flex md:flex-col md:items-center md:justify-center">
               <BsHouseDoorFill className="h-8 w-8 md:h-6 md:w-6" />
               <h2 className="hidden md:inline">Home</h2>
            </div>
         </Link>
      );
   };
   // if (!user) return;

   return (
      <header className="sticky top-0 left-0 right-0">
         <nav className="flex items-center justify-between border-b bg-gradient-to-r from-main-1 to-main-4 p-3">
            {renderUserOptions()}
         </nav>
      </header>
   );
};

export default Header;

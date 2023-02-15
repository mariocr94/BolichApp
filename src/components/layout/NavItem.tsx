import Link from 'next/link';

export interface NavItemProps {
   link: string;
   label: string;
   children: React.ReactElement;
   route: string;
}

const NavItem = ({ link, label, children, route }: NavItemProps) => {
   console.log(route);
   console.log(link);
   return (
      <li className={`mx-2 hover:text-main-4 ${route == link && 'text-main-4'}`}>
         <Link href={link}>
            <div className="group md:flex md:flex-col md:items-center md:justify-center ">
               {children}
               <h2
                  className={`hidden text-main-3 group-hover:text-main-4 md:inline ${
                     route == link && 'text-main-4'
                  }`}
               >
                  {label}
               </h2>
            </div>
         </Link>
      </li>
   );
};

export default NavItem;

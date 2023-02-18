import Link from 'next/link';

export interface NavItemProps {
   link: string;
   label: string;
   children: React.ReactElement;
   route: string;
}

const NavItem = ({ link, label, children, route }: NavItemProps) => {
   return (
      <li className={`mx-2 hover:text-main-1 ${route == link && 'text-main-1'}`}>
         <Link href={link}>
            <div className="group md:flex md:flex-col md:items-center md:justify-center ">
               {children}
               <h2
                  className={`hidden text-main-3 group-hover:text-main-1 md:inline ${
                     route == link && '!text-main-1'
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

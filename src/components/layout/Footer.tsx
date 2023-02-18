import { useRouter } from 'next/router';

const Footer = () => {
   const router = useRouter();
   const { pathname } = router;

   const handleEnglish = () => {
      router.push(
         {
            pathname,
         },
         router.asPath,
         { locale: 'en' }
      );
   };

   const handleSpanish = () => {
      router.push(
         {
            pathname,
         },
         router.asPath,
         { locale: 'es' }
      );
   };

   return (
      <div className="flex h-12 justify-end gap-2 bg-main-1 p-2 text-xs">
         <div onClick={handleEnglish} className="cursor-pointer">
            <h2 className="text-main-4">English</h2>
         </div>
         <div onClick={handleSpanish} className="cursor-pointer">
            <h2 className="text-main-4">Español</h2>
         </div>
      </div>
   );
};

export default Footer;

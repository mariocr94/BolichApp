import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signInWithFacebook, signInWithGoogle } from 'utils/signIn';

const LoginPage = () => {
   const { t } = useTranslation('common');
   const supabaseClient = useSupabaseClient();

   return (
      <div className="flex h-full flex-col items-center justify-around gap-4">
         <h1 className="font-mono code text-xl">
            <span className="text-lg font-bold tracking-wide text-purple-700">
               {t('mainTitle')}
            </span>
         </h1>
         <Image
            src="/images/bowling.jpeg"
            alt="bowling"
            width={200}
            height={200}
            className="rounded-md shadow-lg"
         />
         <div className="flex flex-col gap-5 md:flex-row">
            <button
               className="w-80 rounded-lg bg-blue-fb px-5 py-3 font-bold text-white"
               onClick={() => {
                  signInWithFacebook(supabaseClient);
               }}
            >
               <div className="flex items-center justify-center gap-3 ">
                  <BsFacebook className="h-5 w-5" /> {t('login.facebook')}
               </div>
            </button>
            <button
               className="w-80 rounded-lg bg-white px-5 py-3 font-bold text-gray-google shadow-2xl"
               onClick={() => {
                  signInWithGoogle(supabaseClient);
               }}
            >
               <div className="flex items-center justify-center gap-3">
                  <FcGoogle className="h-5 w-5" /> {t('login.google')}
               </div>
            </button>
         </div>
      </div>
   );
};

export default LoginPage;

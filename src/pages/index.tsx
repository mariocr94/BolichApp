import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { Auth } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signInWithFacebook, signInWithGoogle } from 'utils/signIn';
// import supabaseClient from 'utils/supabaseClient';

export default function Home() {
   const supabaseClient = useSupabaseClient();

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center justify-around p-4">
         <h1 className="code font-mono text-xl">
            <span className="text-lg font-bold tracking-wide text-purple-700">
               Welcome to Bowling World
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
                  <BsFacebook className="h-5 w-5" /> Continue with Facebook
               </div>
            </button>
            <button
               className="w-80 rounded-lg bg-white px-5 py-3 font-bold text-gray-google shadow-2xl"
               onClick={() => {
                  signInWithGoogle(supabaseClient);
               }}
            >
               <div className="flex items-center justify-center gap-3">
                  <FcGoogle className="h-5 w-5" /> Continue with Google
               </div>
            </button>
         </div>
      </div>
   );
}

export async function getServerSideProps(ctx) {
   const supabase = createServerSupabaseClient(ctx);
   const {
      data: { session },
   } = await supabase.auth.getSession();
   if (session)
      return {
         redirect: {
            destination: '/dashboard',
            permanent: false,
         },
      };
   return { props: { session } };
}
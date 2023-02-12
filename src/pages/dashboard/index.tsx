import { hourMinuteSecondFormat } from '@common/constants/timeFormat';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import moment from 'moment-timezone';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface DashboardProps {
   session: any;
}
const Dashboard = ({ session }: DashboardProps) => {
   const [localTime, setLocalTime] = useState('');
   useEffect(() => {
      const interval = setInterval(() => {
         setLocalTime(moment().format(hourMinuteSecondFormat));
      }, 1000);

      return () => clearInterval(interval);
   }, []);
   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center justify-around p-4">
         <h1 className="code font-mono text-lg font-bold tracking-wide text-purple-700">
            Bowling!
         </h1>
         <Image
            src="/images/bowling.jpeg"
            alt="bowling"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
         />
         <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold ">Local Time: </h1>
            <p className="text-lg font-bold">{localTime}</p>
         </div>
      </div>
   );
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
   return { props: { session } };
}

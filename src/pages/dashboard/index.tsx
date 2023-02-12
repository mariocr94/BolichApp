import { SCORES } from '@common/constants/endpoints';
import { TABLES } from '@common/constants/tables';
import { MONTH_DAY_YEAR } from '@common/constants/timeFormat';
import { IScore } from '@models/games';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';

interface DashboardProps {
   session: any;
   scores: IScore[];
}
const Dashboard = ({ session, scores: serverScores }: DashboardProps) => {
   const [score, setScore] = useState('');
   const [scores, setScores] = useState(serverScores);

   const supabaseClient = useSupabaseClient();
   const user = useUser();

   const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
         postScore(score);
      }
   };

   const postScore = async (score: string) => {
      const scorebody = { score, userId: user?.id };
      await fetch(SCORES.POST, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(scorebody),
      });

      refetchScores();
   };

   const refetchScores = async () => {
      const { data: scores } = await supabaseClient.from(TABLES.GAMES).select('*');
      setScores(scores);
   };

   const handleScoreChange = (e: React.FormEvent<HTMLInputElement>) => {
      setScore(e.currentTarget.value);
   };

   const handleDeleteClick = async (scoreId: string) => {
      await fetch(SCORES.DELETE(scoreId), {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      refetchScores();
   };

   const averageScore = (
      scores.reduce((sum, score) => {
         return (sum += score.score);
      }, 0) / scores.length
   ).toFixed(2);

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">
         <h1>Current Average: {averageScore}</h1>
         <h1>All previous Scores:</h1>
         <div className="rounded-xl border-2 border-main-4">
            <table className="w-96 divide-y divide-x">
               <thead>
                  <tr className="">
                     <th className="py-2 px-4">Date</th>
                     <th className="py-2 px-4">Score</th>
                     <th className="py-2 px-4">Delete</th>
                  </tr>
               </thead>
               <tbody className="rounded-lg">
                  {scores.map((score) => {
                     return (
                        <tr key={score.id}>
                           <td>{moment(score.inserted_at).format(MONTH_DAY_YEAR)}</td>
                           <td>{score.score}</td>
                           <td className="text-red-500">
                              <button onClick={() => handleDeleteClick(score.id)}>X</button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         <Image
            src="/images/bowling.jpeg"
            alt="bowling"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
            priority
         />
         <div className="mt-4 flex flex-col items-center gap-2 md:flex-row">
            <h1>New Score: </h1>
            <input
               className="rounded-lg py-2 px-4 shadow-md"
               type="number"
               placeholder="Add your score"
               value={score}
               onChange={handleScoreChange}
               onKeyDown={handleKeyDown}
            />
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

   const { data: scores } = await supabase.from(TABLES.GAMES).select('*');

   return { props: { session, scores } };
}

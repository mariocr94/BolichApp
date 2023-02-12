import { GAMES } from '@common/constants/endpoints';
import { TABLES } from '@common/constants/tables';
import { MONTH_DAY_YEAR } from '@common/constants/timeFormat';
import { IGames } from '@models/games';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import moment from 'moment';
import React, { useState } from 'react';

interface DashboardProps {
   session: any;
   games: IGames[];
}
const Dashboard = ({ session, games: serverGames }: DashboardProps) => {
   const [game, setGame] = useState('');
   const [games, setGames] = useState(serverGames);

   const supabaseClient = useSupabaseClient();
   const user = useUser();

   const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
         postGame(game);
      }
   };

   const postGame = async (game: string) => {
      const gameBody = { game, userId: user?.id };
      await fetch(GAMES.POST, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(gameBody),
      });

      refetchGames();
   };

   const refetchGames = async () => {
      const { data: games } = await supabaseClient.from(TABLES.GAMES).select('*');
      setGames(games);
   };

   const handleGameChange = (e: React.FormEvent<HTMLInputElement>) => {
      setGame(e.currentTarget.value);
   };

   const handleDeleteClick = async (gameId: string) => {
      await fetch(GAMES.DELETE(gameId), {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      refetchGames();
   };

   const averageScore = (
      games.reduce((sum, game) => {
         return (sum += game.score);
      }, 0) / games.length
   ).toFixed(2);

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">
         <h1>Current Average: {averageScore}</h1>

         <h1>All previous Scores:</h1>
         <div className="rounded-xl border-2 border-main-3">
            <table className="w-96 divide-y divide-x">
               <thead>
                  <tr className="">
                     <th className="py-2 px-4">Date</th>
                     <th className="py-2 px-4">Score</th>
                     <th className="py-2 px-4">Delete</th>
                  </tr>
               </thead>
               <tbody className="rounded-lg">
                  {games.map((game) => {
                     return (
                        <tr key={game.id}>
                           <td>{moment(game.inserted_at).format(MONTH_DAY_YEAR)}</td>
                           <td>{game.score}</td>
                           <td className="text-red-500">
                              <button onClick={() => handleDeleteClick(game.id)}>X</button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>

         <div className="mt-4 flex flex-col items-center gap-2 md:flex-row">
            <h1>New Score: </h1>
            <input
               className="rounded-lg py-2 px-4 shadow-md"
               type="number"
               placeholder="Add your score"
               value={game}
               onChange={handleGameChange}
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

   const { data: games } = await supabase.from(TABLES.GAMES).select('*');

   return { props: { session, games } };
}

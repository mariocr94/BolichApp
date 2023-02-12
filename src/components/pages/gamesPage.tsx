import { GAMES } from '@common/constants/endpoints';
import { TABLES } from '@common/constants/tables';
import { MONTH_DAY_YEAR } from '@common/constants/timeFormat';
import Pagination from '@components/common/Pagination';
import { IGames } from '@models/games';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import moment from 'moment';
import { useState } from 'react';

export interface GamesPageProps {
   games: IGames[];
}

const PAGE_SIZE = 5;
const GamesPage = ({ games: serverGames }: GamesPageProps) => {
   const [score, setScore] = useState('');
   const [games, setGames] = useState(serverGames);
   const [numberOfRecords, setNumberOfRecords] = useState(serverGames.length);
   const [startIndex, setStartIndex] = useState(0);
   const [endIndex, setEndIndex] = useState(PAGE_SIZE - 1);

   const supabaseClient = useSupabaseClient();
   const user = useUser();

   const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
         if (parseInt(score) > 300) {
            alert('It is not possible to score more than 300.');
            return;
         }
         postGame(score);
      }
   };

   const postGame = async (score: string) => {
      const gameBody = { score, userId: user?.id };
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
      setNumberOfRecords(games.length);
   };

   const handleScoreChange = (e: React.FormEvent<HTMLInputElement>) => {
      setScore(e.currentTarget.value);
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

   const averageScore =
      games.length > 0
         ? (
              games.reduce((sum, game) => {
                 return (sum += game.score);
              }, 0) / games.length
           ).toFixed(2)
         : '';

   return (
      <div className="container mx-auto flex h-to-fit flex-col items-center gap-4 p-4">
         <h1>Current Average: {averageScore}</h1>

         <h1>All previous Scores:</h1>
         <div className="rounded-xl border-2 border-main-3">
            <table className="w-96 divide-x divide-y">
               <thead>
                  <tr className="">
                     <th className="px-4 py-2">Date</th>
                     <th className="px-4 py-2">Score</th>
                     <th className="px-4 py-2">Delete</th>
                  </tr>
               </thead>
               <tbody className="rounded-lg">
                  {games.slice(startIndex, endIndex + 1).map((game) => {
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
         <Pagination
            numberOfRecords={numberOfRecords}
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            pageSize={PAGE_SIZE}
         />

         <div className="mt-4 flex flex-col items-center gap-2 md:flex-row">
            <h1>New Score: </h1>
            <input
               className="rounded-lg px-4 py-2 shadow-md"
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

export default GamesPage;

import { GAMES } from '@common/constants/endpoints';
import { TABLES } from '@common/constants/tables';
import { IGames } from '@models/games';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const useGames = (serverGames: IGames[], PAGE_SIZE: number = 5) => {
   const [games, setGames] = useState(serverGames);
   const [numberOfRecords, setNumberOfRecords] = useState(serverGames.length);
   const [startIndex, setStartIndex] = useState(0);
   const [endIndex, setEndIndex] = useState(PAGE_SIZE - 1);
   const supabaseClient = useSupabaseClient();
   const user = useUser();

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

   const deleteGame = async (gameId: string) => {
      await fetch(GAMES.DELETE(gameId), {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      refetchGames();
   };

   const refetchGames = async () => {
      const { data: games } = await supabaseClient.from(TABLES.GAMES).select('*');
      setGames(games);
      setNumberOfRecords(games.length);
   };

   const averageScore =
      games.length > 0
         ? (
              games.reduce((sum, game) => {
                 return (sum += game.score);
              }, 0) / games.length
           ).toFixed(2)
         : '';

   return {
      postGame,
      deleteGame,
      games,
      startIndex,
      setStartIndex,
      endIndex,
      setEndIndex,
      numberOfRecords,
      averageScore,
   };
};

export default useGames;

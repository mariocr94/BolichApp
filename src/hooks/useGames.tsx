import { GAMES } from '@common/constants/endpoints';
import { TABLES } from '@common/constants/tables';
import { IGames } from '@models/games';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const useGames = (serverGames: IGames[], PAGE_SIZE: number = 5) => {
   const [games, setGames] = useState(serverGames);
   const [isPosting, setIsPosting] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [numberOfRecords, setNumberOfRecords] = useState(games !== null ? games.length : 0);
   const [startIndex, setStartIndex] = useState(0);
   const [endIndex, setEndIndex] = useState(PAGE_SIZE - 1);
   const supabaseClient = useSupabaseClient();
   const user = useUser();

   const postGame = async (score: string) => {
      setIsPosting(true);
      const gameBody = { score, userId: user?.id };
      await fetch(GAMES.POST, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(gameBody),
      });

      refetchGames();
      setIsPosting(false);
   };

   const deleteGame = async (gameId: string) => {
      setIsDeleting(true);
      await fetch(GAMES.DELETE(gameId), {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      refetchGames();
      setIsDeleting(false);
   };

   const refetchGames = async () => {
      const { data: games } = await supabaseClient.from(TABLES.GAMES).select('*');
      console.log(games);
      setGames(games);
      setNumberOfRecords(games.length);
   };
   const averageScore =
      games && games.length > 0
         ? (
              games.reduce((sum, game) => {
                 return (sum += game.score);
              }, 0) / games.length
           ).toFixed(2)
         : '';

   return {
      postGame,
      isPosting,
      deleteGame,
      isDeleting,
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

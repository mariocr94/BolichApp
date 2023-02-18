import { BALLS } from '@common/constants/endpoints';
import { VIEWS } from '@common/constants/tables';
import { IUserBall } from '@models/userBalls';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const useArsenal = (serverUserBalls: IUserBall[], PAGE_SIZE: number = 5) => {
   const [userBalls, setUserBalls] = useState(serverUserBalls);
   const [isPosting, setIsPosting] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const [numberOfRecords, setNumberOfRecords] = useState(
      userBalls !== null ? userBalls.length : 0
   );
   const [startIndex, setStartIndex] = useState(0);
   const [endIndex, setEndIndex] = useState(PAGE_SIZE - 1);
   const supabaseClient = useSupabaseClient();
   const user = useUser();

   const addBall = async (ballId: number) => {
      setIsPosting(true);
      const ballBody = { ball_id: ballId, user_id: user?.id };
      await fetch(BALLS.POST, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(ballBody),
      });

      refetchBalls();
      setIsPosting(false);
   };

   const deleteBall = async (gameId: string) => {
      console.log('is Deleting ball');
      setIsDeleting(true);
      await fetch(BALLS.DELETE(gameId), {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      refetchBalls();
      setIsDeleting(false);
   };

   const refetchBalls = async () => {
      const { data: userBalls } = await supabaseClient
         .from(VIEWS.USER_BALLS)
         .select('*')
         .eq('user_id', user.id);
      setUserBalls(userBalls);
      setNumberOfRecords(userBalls.length);
   };

   return {
      addBall,
      isPosting,
      deleteBall,
      isDeleting,
      userBalls,
      startIndex,
      setStartIndex,
      endIndex,
      setEndIndex,
      numberOfRecords,
   };
};

export default useArsenal;

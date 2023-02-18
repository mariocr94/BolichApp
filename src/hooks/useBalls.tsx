import { TABLES } from '@common/constants/tables';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounceValue';

const useBalls = () => {
   const [balls, setBalls] = useState([]);
   const [query, setQuery] = useState('');
   const deferredQuery = useDebounce(query, 250);
   const supabaseClient = useSupabaseClient();

   const separatedDeferredQuery = deferredQuery.split(' ').join(' & ');

   const refetchBalls = async () => {
      const { data: balls } = await supabaseClient
         .from(TABLES.BALLS)
         .select()
         .textSearch('name', separatedDeferredQuery);
      setBalls(balls);
   };

   useEffect(() => {
      refetchBalls();
   }, [deferredQuery]);

   return {
      query,
      setQuery,
      balls,
   };
};

export default useBalls;

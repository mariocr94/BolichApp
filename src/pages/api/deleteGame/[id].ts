import { TABLES } from '@common/constants/tables';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const supabase = createServerSupabaseClient({ req, res });
   const { query } = req;
   const { id } = query;
   if (typeof id !== 'string') {
      res.status(400).send({ message: 'invalid id' });
   }
   const numberId = parseInt(id as string);
   const response = await supabase.from(TABLES.GAMES).delete().eq('id', numberId);

   if (response.status !== 204) res.status(500).send(response);

   res.status(204).send(response.data);
};

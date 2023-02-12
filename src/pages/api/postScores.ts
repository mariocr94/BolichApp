import { TABLES } from '@common/constants/tables';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const supabase = createServerSupabaseClient({ req, res });
   const { body } = req;
   const { score, userId } = body;

   const response = await supabase.from(TABLES.GAMES).insert({ score, user_id: userId });

   if (response.status !== 201) res.status(500).send(response);

   res.status(201).send(response.data);
};
